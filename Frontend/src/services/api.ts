const API_BASE = import.meta.env.VITE_API_URL;

async function request<T>(path: string, options: RequestInit = {}, token?: string): Promise<T> {
  if (!API_BASE) {
    throw new Error('VITE_API_URL is not defined');
  }

  const headers = new Headers(options.headers);
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }
  if (token && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  let payload: any = null;
  try {
    payload = await response.json();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    const message = payload?.error || `Request failed (${response.status})`;
    throw new Error(message);
  }

  return payload as T;
}

export interface AuthResponse {
  session: {
    access_token: string;
  };
  user: {
    id: string;
    email?: string;
  };
  profile?: {
    first_name?: string;
    last_name?: string;
    avatar_url?: string | null;
    role?: string;
    organization?: string;
  } | null;
}

export interface DashboardOverview {
  profile: {
    id: string;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
    role: string;
    organization: string;
    xp: number;
    badges: string[];
  };
  stats: {
    enrolledCourses: number;
    completedCourses: number;
    certificatesEarned: number;
    learningHours: number;
    streak: number;
    weeklyFocus: number[];
  };
  activeCourses: Array<{
    id: string | number;
    title: string;
    category: string;
    level: string;
    progress: number;
    lastLesson: string;
    thumbnail: string | null;
  }>;
  certificates: Array<{
    id: string;
    credential_id?: string;
    credentialId?: string;
    issued_on?: string;
    issuedOn?: string;
    courses?: {
      title?: string;
    };
  }>;
  recommendations: Array<{
    id: string | number;
    title: string;
    level: string;
    category: string;
  }>;
}

export interface CourseListResponse {
  courses: Array<{
    id: string | number;
    title: string;
    category: string;
    level: string;
    status: string;
    progress: number;
    durationMinutes: number;
    lessonsCount: number;
    thumbnail: string | null;
    instructor: string;
    rating: number;
    lastAccessedAt: string | null;
    completionEta: string | null;
  }>;
}

export interface CertificateListResponse {
  certificates: Array<{
    id: string;
    credentialId: string;
    issuedOn: string;
    badgeUrl: string | null;
    certificateUrl: string | null;
    hours: number;
    grade: string;
    course: {
      title: string;
      level: string;
      category: string;
    };
  }>;
}

export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatarUrl: string | null;
  role: string;
  organization: string;
  xp: number;
  badges: string[];
  createdAt: string | null;
}

export const api = {
  login: (payload: { email: string; password: string }) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  signup: (payload: { email: string; password: string; firstName: string; lastName: string }) =>
    request<{ user: { id: string } }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
  getDashboardOverview: (token: string) => request<DashboardOverview>('/users/me/overview', {}, token),
  getMyCourses: (token: string) => request<CourseListResponse>('/users/me/courses', {}, token),
  getMyCertificates: (token: string) => request<CertificateListResponse>('/users/me/certificates', {}, token),
  getProfile: (token: string) => request<UserProfile>('/users/me/profile', {}, token),
  updateProfile: (token: string, payload: { firstName?: string; lastName?: string; role?: string; organization?: string; avatarUrl?: string }) =>
    request<UserProfile>('/users/me/profile', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, token),
  updateSettings: (token: string, payload: { email?: string; password?: string }) =>
    request<{ message: string }>('/users/me/settings', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }, token),
};

