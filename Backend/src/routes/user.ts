import express from 'express';
import { authenticate, AuthenticatedRequest } from '../middleware/authenticate';
import { supabaseService } from '../supabaseClient';

const router = express.Router();

// -------------------------
// Utility: consistent error wrapper
// -------------------------
const sendError = (res: express.Response, message: string, status = 500) =>
  res.status(status).json({ error: message });

// -------------------------
// Utility: ensure userId exists
// -------------------------
const getUserId = (req: AuthenticatedRequest, res: express.Response): string | null => {
  const userId = req.supabaseUser?.id;
  if (!userId) {
    sendError(res, 'Unauthorized', 401);
    return null;
  }
  return userId;
};

router.use(authenticate);

// ----------------------------------------------------------------------
// GET /me/overview
// ----------------------------------------------------------------------
router.get('/me/overview', async (req: AuthenticatedRequest, res) => {
  const userId = getUserId(req, res);
  if (!userId) return;

  try {
    const [
      profileResult,
      enrollmentsResult,
      certificatesResult
    ] = await Promise.all([
      supabaseService
        .from('profiles')
        .select('id, first_name, last_name, avatar_url, role, organization, xp, badges')
        .eq('id', userId)
        .single(),

      supabaseService
        .from('enrollments')
        .select(
          `
            id,
            progress,
            status,
            last_accessed_at,
            last_lesson,
            courses (
              id,
              title,
              category,
              level,
              duration_minutes,
              thumbnail_url,
              lessons_count
            )
          `
        )
        .eq('user_id', userId),

      supabaseService
        .from('certificates')
        .select(
          `
            id,
            credential_id,
            issued_on,
            badge_url,
            certificate_url,
            hours,
            courses ( id, title )
          `
        )
        .eq('user_id', userId)
        .order('issued_on', { ascending: false })
        .limit(5)
    ]);

    if (profileResult.error) throw profileResult.error;
    if (enrollmentsResult.error) throw enrollmentsResult.error;
    if (certificatesResult.error) throw certificatesResult.error;

    const enrollments = enrollmentsResult.data || [];
    const certificates = certificatesResult.data || [];

    // Completed courses
    const completedCourses = enrollments.filter(e => e.status === 'completed');

    // Compute learning hours (stronger and cleaner calculation)
    const learningHours = enrollments.reduce((acc, e) => {
      const course = e.courses as any;
      const duration = (course?.duration_minutes) || 0;
      const progress = e.progress || 0;
      return acc + (duration * progress) / 6000;
    }, 0);

    const overview = {
      profile: {
        id: profileResult.data?.id || userId,
        firstName: profileResult.data?.first_name || 'Learner',
        lastName: profileResult.data?.last_name || '',
        avatarUrl: profileResult.data?.avatar_url || null,
        role: profileResult.data?.role || 'Student',
        organization: profileResult.data?.organization || 'TechZone LMS',
        xp: profileResult.data?.xp || 0,
        badges: profileResult.data?.badges || []
      },

      stats: {
        enrolledCourses: enrollments.length,
        completedCourses: completedCourses.length,
        certificatesEarned: certificates.length,
        learningHours: Number(learningHours.toFixed(1))
      },

      activeCourses: enrollments
        .filter(e => e.status !== 'completed')
        .slice(0, 3)
        .map(e => {
          const course = e.courses as any;
          return {
            id: course?.id || e.id,
            title: course?.title || 'Untitled course',
            category: course?.category || 'General',
            level: course?.level || 'Beginner',
            progress: e.progress || 0,
            lastLesson: e.last_lesson || 'Introduction',
            thumbnail: course?.thumbnail_url || null
          };
        }),

      certificates,

      recommendations: enrollments
        .filter(e => e.status === 'wishlist')
        .map(e => {
          const course = e.courses as any;
          return {
            id: course?.id || e.id,
            title: course?.title || 'Untitled course',
            level: course?.level || 'Intermediate',
            category: course?.category || 'General'
          };
        })
    };

    return res.json(overview);
  } catch (err) {
    console.error('Overview fetch failed', err);
    return sendError(res, 'Failed to load dashboard data');
  }
});

// ----------------------------------------------------------------------
// GET /me/courses
// ----------------------------------------------------------------------
router.get('/me/courses', async (req: AuthenticatedRequest, res) => {
  const userId = getUserId(req, res);
  if (!userId) return;

  try {
    const { data, error } = await supabaseService
      .from('enrollments')
      .select(
        `
          id,
          status,
          progress,
          last_accessed_at,
          completion_eta,
          courses (
            id,
            title,
            category,
            level,
            duration_minutes,
            lessons_count,
            thumbnail_url,
            instructor,
            rating
          )
        `
      )
      .eq('user_id', userId)
      .order('last_accessed_at', { ascending: false });

    if (error) throw error;

    const courses = (data || []).map(e => {
      const course = e.courses as any;
      const courseObj = course && typeof course === 'object' && !Array.isArray(course) ? course : null;
      return {
        id: courseObj?.id || e.id,
        title: courseObj?.title || 'Untitled course',
        category: courseObj?.category || 'General',
        level: courseObj?.level || 'Beginner',
        status: e.status || 'in_progress',
        progress: e.progress || 0,
        durationMinutes: courseObj?.duration_minutes || 0,
        lessonsCount: courseObj?.lessons_count || 0,
        thumbnail: courseObj?.thumbnail_url || null,
        instructor: courseObj?.instructor || 'TechZone Mentor',
        rating: courseObj?.rating || 4.8,
        lastAccessedAt: e.last_accessed_at || null,
        completionEta: e.completion_eta || null
      };
    });

    return res.json({ courses });
  } catch (err) {
    console.error('Courses fetch failed', err);
    return sendError(res, 'Failed to load courses');
  }
});

// ----------------------------------------------------------------------
// GET /me/certificates
// ----------------------------------------------------------------------
router.get('/me/certificates', async (req: AuthenticatedRequest, res) => {
  const userId = getUserId(req, res);
  if (!userId) return;

  try {
    const { data, error } = await supabaseService
      .from('certificates')
      .select(
        `
          id,
          credential_id,
          issued_on,
          badge_url,
          certificate_url,
          hours,
          grade,
          courses (
            id,
            title,
            level,
            category
          )
        `
      )
      .eq('user_id', userId)
      .order('issued_on', { ascending: false });

    if (error) throw error;

    const certificates = (data || []).map(c => {
      const course = c.courses as any;
      const courseObj = course && typeof course === 'object' && !Array.isArray(course) ? course : null;
      return {
        id: c.id,
        credentialId: c.credential_id,
        issuedOn: c.issued_on,
        badgeUrl: c.badge_url,
        certificateUrl: c.certificate_url,
        hours: c.hours,
        grade: c.grade,
        course: {
          id: courseObj?.id || null,
          title: courseObj?.title || 'Course',
          level: courseObj?.level || 'Intermediate',
          category: courseObj?.category || 'General'
        }
      };
    });

    return res.json({ certificates });
  } catch (err) {
    console.error('Certificates fetch failed', err);
    return sendError(res, 'Failed to load certificates');
  }
});

// ----------------------------------------------------------------------
// GET /me/profile
// ----------------------------------------------------------------------
router.get('/me/profile', async (req: AuthenticatedRequest, res) => {
  const userId = getUserId(req, res);
  if (!userId) return;

  try {
    const { data, error } = await supabaseService
      .from('profiles')
      .select('id, first_name, last_name, email, avatar_url, role, organization, xp, badges, created_at')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return res.json({
      id: data?.id || userId,
      firstName: data?.first_name || '',
      lastName: data?.last_name || '',
      email: data?.email || req.supabaseUser?.email || '',
      avatarUrl: data?.avatar_url || null,
      role: data?.role || 'Student',
      organization: data?.organization || 'TechZone LMS',
      xp: data?.xp || 0,
      badges: data?.badges || [],
      createdAt: data?.created_at || null
    });
  } catch (err) {
    console.error('Profile fetch failed', err);
    return sendError(res, 'Failed to load profile');
  }
});

// ----------------------------------------------------------------------
// PATCH /me/profile
// ----------------------------------------------------------------------
router.patch('/me/profile', async (req: AuthenticatedRequest, res) => {
  const userId = getUserId(req, res);
  if (!userId) return;

  const { firstName, lastName, role, organization, avatarUrl } = req.body;

  try {
    const updateData: any = {};
    if (firstName !== undefined) updateData.first_name = firstName;
    if (lastName !== undefined) updateData.last_name = lastName;
    if (role !== undefined) updateData.role = role;
    if (organization !== undefined) updateData.organization = organization;
    if (avatarUrl !== undefined) updateData.avatar_url = avatarUrl;

    const { data, error } = await supabaseService
      .from('profiles')
      .update(updateData)
      .eq('id', userId)
      .select('id, first_name, last_name, avatar_url, role, organization')
      .single();

    if (error) throw error;

    return res.json({
      id: data?.id || userId,
      firstName: data?.first_name || '',
      lastName: data?.last_name || '',
      avatarUrl: data?.avatar_url || null,
      role: data?.role || 'Student',
      organization: data?.organization || 'TechZone LMS'
    });
  } catch (err) {
    console.error('Profile update failed', err);
    return sendError(res, 'Failed to update profile');
  }
});

// ----------------------------------------------------------------------
// PATCH /me/settings
// ----------------------------------------------------------------------
router.patch('/me/settings', async (req: AuthenticatedRequest, res) => {
  const userId = getUserId(req, res);
  if (!userId) return;

  const { email, password } = req.body;

  try {
    const updates: any = {};
    
    if (email) {
      const { error: emailError } = await supabaseService.auth.admin.updateUserById(userId, {
        email
      });
      if (emailError) throw emailError;
    }

    if (password) {
      const { error: passwordError } = await supabaseService.auth.admin.updateUserById(userId, {
        password
      });
      if (passwordError) throw passwordError;
    }

    return res.json({ message: 'Settings updated successfully' });
  } catch (err: any) {
    console.error('Settings update failed', err);
    return sendError(res, err.message || 'Failed to update settings', 400);
  }
});

export default router;
