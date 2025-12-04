import express from 'express';
import { authenticate, AuthenticatedRequest } from '../middleware/authenticate';
import { supabaseService } from '../supabaseClient';

const router = express.Router();

router.use(authenticate);

router.get('/me/overview', async (req: AuthenticatedRequest, res) => {
  const userId = req.supabaseUser?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const [profileResult, enrollmentsResult, certificatesResult] = await Promise.all([
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
        `,
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
          courses (
            id,
            title
          )
        `,
        )
        .eq('user_id', userId)
        .order('issued_on', { ascending: false })
        .limit(5),
    ]);

    if (profileResult.error) throw profileResult.error;
    if (enrollmentsResult.error) throw enrollmentsResult.error;
    if (certificatesResult.error) throw certificatesResult.error;

    const enrollments = enrollmentsResult.data ?? [];
    const certificates = certificatesResult.data ?? [];

    const completedCourses = enrollments.filter((enrollment) => enrollment.status === 'completed');
    const learningHours = enrollments.reduce((hours, enrollment) => {
      const duration = enrollment.courses?.duration_minutes ?? 0;
      const progress = enrollment.progress ?? 0;
      return hours + (duration * progress) / 6000;
    }, 0);

    const overview = {
      profile: {
        id: profileResult.data?.id ?? userId,
        firstName: profileResult.data?.first_name ?? 'Learner',
        lastName: profileResult.data?.last_name ?? '',
        avatarUrl: profileResult.data?.avatar_url ?? null,
        role: profileResult.data?.role ?? 'Student',
        organization: profileResult.data?.organization ?? 'TechZone LMS',
        xp: profileResult.data?.xp ?? 0,
        badges: profileResult.data?.badges ?? [],
      },
      stats: {
        enrolledCourses: enrollments.length,
        completedCourses: completedCourses.length,
        certificatesEarned: certificates.length,
        learningHours: Number(learningHours.toFixed(1)),
      },
      activeCourses: enrollments
        .filter((enrollment) => enrollment.status !== 'completed')
        .slice(0, 3)
        .map((enrollment) => ({
          id: enrollment.courses?.id ?? enrollment.id,
          title: enrollment.courses?.title ?? 'Untitled course',
          category: enrollment.courses?.category ?? 'General',
          level: enrollment.courses?.level ?? 'Beginner',
          progress: enrollment.progress ?? 0,
          lastLesson: enrollment.last_lesson ?? 'Introduction',
          thumbnail: enrollment.courses?.thumbnail_url ?? null,
        })),
      certificates,
      recommendations: enrollments
        .filter((enrollment) => enrollment.status === 'wishlist')
        .map((enrollment) => ({
          id: enrollment.courses?.id ?? enrollment.id,
          title: enrollment.courses?.title ?? 'Untitled course',
          level: enrollment.courses?.level ?? 'Intermediate',
          category: enrollment.courses?.category ?? 'General',
        })),
    };

    return res.json(overview);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Overview fetch failed', error);
    return res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

router.get('/me/courses', async (req: AuthenticatedRequest, res) => {
  const userId = req.supabaseUser?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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
      `,
      )
      .eq('user_id', userId)
      .order('last_accessed_at', { ascending: false });

    if (error) throw error;

    const courses = (data ?? []).map((enrollment) => ({
      id: enrollment.courses?.id ?? enrollment.id,
      title: enrollment.courses?.title ?? 'Untitled course',
      category: enrollment.courses?.category ?? 'General',
      level: enrollment.courses?.level ?? 'Beginner',
      status: enrollment.status ?? 'in_progress',
      progress: enrollment.progress ?? 0,
      durationMinutes: enrollment.courses?.duration_minutes ?? 0,
      lessonsCount: enrollment.courses?.lessons_count ?? 0,
      thumbnail: enrollment.courses?.thumbnail_url ?? null,
      instructor: enrollment.courses?.instructor ?? 'TechZone Mentor',
      rating: enrollment.courses?.rating ?? 4.8,
      lastAccessedAt: enrollment.last_accessed_at ?? null,
      completionEta: enrollment.completion_eta ?? null,
    }));

    return res.json({ courses });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Courses fetch failed', error);
    return res.status(500).json({ error: 'Failed to load courses' });
  }
});

router.get('/me/certificates', async (req: AuthenticatedRequest, res) => {
  const userId = req.supabaseUser?.id;
  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

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
      `,
      )
      .eq('user_id', userId)
      .order('issued_on', { ascending: false });

    if (error) throw error;

    const certificates = (data ?? []).map((certificate) => ({
      id: certificate.id,
      credentialId: certificate.credential_id,
      issuedOn: certificate.issued_on,
      badgeUrl: certificate.badge_url,
      certificateUrl: certificate.certificate_url,
      hours: certificate.hours,
      grade: certificate.grade,
      course: {
        id: certificate.courses?.id ?? null,
        title: certificate.courses?.title ?? 'Course',
        level: certificate.courses?.level ?? 'Intermediate',
        category: certificate.courses?.category ?? 'General',
      },
    }));

    return res.json({ certificates });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Certificates fetch failed', error);
    return res.status(500).json({ error: 'Failed to load certificates' });
  }
});

export default router;

