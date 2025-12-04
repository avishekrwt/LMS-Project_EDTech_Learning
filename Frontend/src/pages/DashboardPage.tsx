import { useEffect, useMemo, useState } from 'react';
import {
  Activity,
  Award,
  BookOpen,
  Clock3,
  GraduationCap,
  Loader2,
  ShieldCheck,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api, DashboardOverview } from '@/services/api';
import { useUserStore } from '@/hooks/useUserStore';

export default function DashboardPage() {
  const token = useUserStore((state) => state.token);
  const persistedProfile = useUserStore((state) => state.profile);
  const [overview, setOverview] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;
    let isMounted = true;
    setLoading(true);
    setError(null);

    api
      .getDashboardOverview(token)
      .then((data) => {
        if (!isMounted) return;
        setOverview(data);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load dashboard');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const displayName = useMemo(() => {
    const fromOverview = overview?.profile;
    if (fromOverview?.firstName || fromOverview?.lastName) {
      return `${fromOverview.firstName ?? ''} ${fromOverview.lastName ?? ''}`.trim();
    }
    if (persistedProfile?.firstName || persistedProfile?.lastName) {
      return `${persistedProfile.firstName ?? ''} ${persistedProfile.lastName ?? ''}`.trim();
    }
    return 'Learner';
  }, [overview, persistedProfile]);

  const statsConfig = [
    {
      label: 'Enrolled Courses',
      value: overview?.stats.enrolledCourses ?? 0,
      icon: BookOpen,
      accent: 'from-blue-500/80 to-cyan-500/80',
      insight: 'Active right now',
    },
    {
      label: 'Completed Courses',
      value: overview?.stats.completedCourses ?? 0,
      icon: GraduationCap,
      accent: 'from-emerald-500/80 to-lime-500/80',
      insight: 'Congrats! Keep going',
    },
    {
      label: 'Certificates Earned',
      value: overview?.stats.certificatesEarned ?? 0,
      icon: Award,
      accent: 'from-violet-500/80 to-fuchsia-500/80',
      insight: 'Share your wins',
    },
    {
      label: 'Learning Hours',
      value: overview?.stats.learningHours ?? 0,
      icon: Clock3,
      accent: 'from-amber-500/80 to-orange-500/80',
      insight: 'Last 30 days',
    },
  ];

  const activeCourses = overview?.activeCourses ?? [];
  const certificates = overview?.certificates ?? [];
  const recommendations = overview?.recommendations ?? [];
  const badges = overview?.profile.badges ?? [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 pb-16 pt-10 text-white">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 sm:px-6 lg:px-0">
        <header className="flex flex-col gap-6 rounded-3xl bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-blue-600/30 p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">Personalized dashboard</p>
              <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
                Welcome back, <span className="text-sky-300">{displayName}</span>
              </h1>
              <p className="mt-2 max-w-2xl text-base text-white/70">
                Continue your learning journey with curated insights, real-time progress, and fresh recommendations powered by Supabase.
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-4 text-left shadow-xl">
              <div className="rounded-full bg-indigo-500/20 p-3">
                <Activity className="h-6 w-6 text-sky-300" />
              </div>
              <div>
                <p className="text-sm uppercase tracking-wide text-white/60">Streak</p>
                <p className="text-2xl font-semibold text-white">7 days 🔥</p>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex min-h-[40vh] items-center justify-center">
            <div className="flex items-center gap-3 rounded-2xl bg-white/5 px-6 py-4 text-white">
              <Loader2 className="h-6 w-6 animate-spin text-sky-300" />
              <span className="text-lg font-semibold tracking-wide">Loading your learning graph…</span>
            </div>
          </div>
        ) : error ? (
          <Card className="border-red-500/40 bg-red-500/10 text-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-100">
                <ShieldCheck className="h-5 w-5" />
                Unable to load dashboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
              <p className="mt-2 text-sm text-red-200/80">Please verify your Supabase credentials and try again.</p>
            </CardContent>
          </Card>
        ) : (
          <>
            <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              {statsConfig.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-5 shadow-lg ring-1 ring-black/10"
                >
                  <div className="flex items-center justify-between">
                    <div className={`rounded-2xl bg-gradient-to-r ${stat.accent} p-3 text-white shadow-lg`}>
                      <stat.icon className="h-5 w-5" />
                    </div>
                    <TrendingUp className="h-4 w-4 text-emerald-300/80" />
                  </div>
                  <p className="mt-6 text-sm font-medium uppercase tracking-widest text-white/70">{stat.label}</p>
                  <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/60">{stat.insight}</p>
                </div>
              ))}
            </section>

            <section className="grid gap-6 lg:grid-cols-[2fr,1fr]">
              <Card className="border-white/10 bg-white/5 text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-semibold">Active learning paths</CardTitle>
                    <p className="text-sm text-white/70">Pick up exactly where you left off.</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-white/30 text-white hover:bg-white/10"
                    onClick={() => window.location.href = '/my-courses'}
                  >
                    View all
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeCourses.length === 0 && <p className="text-sm text-white/60">You have no active courses right now.</p>}

                  {activeCourses.map((course) => (
                    <div key={course.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-sm">
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{course.category}</p>
                          <h3 className="mt-1 text-lg font-semibold">{course.title}</h3>
                          <p className="text-sm text-white/70">
                            {course.level} • Last lesson: <span className="text-white">{course.lastLesson}</span>
                          </p>
                        </div>
                        {course.thumbnail ? (
                          <img src={course.thumbnail} alt={course.title} className="h-16 w-24 rounded-xl object-cover ring-2 ring-white/20" />
                        ) : (
                          <div className="flex h-16 w-24 items-center justify-center rounded-xl bg-white/10 text-white/40">No cover</div>
                        )}
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>Progress</span>
                          <span>{Math.round(course.progress)}%</span>
                        </div>
                        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap items-center gap-3 text-xs text-white/70">
                        <span className="inline-flex items-center gap-1 rounded-full border border-white/15 px-3 py-1">
                          <Clock3 className="h-3 w-3" />
                          Last accessed {course.lastLesson}
                        </span>
                        <Button size="sm" className="rounded-full bg-white/20 px-4 text-white hover:bg-white/30">
                          Continue
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <div className="space-y-6">
                <Card className="border-white/10 bg-white/5 text-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Sparkles className="h-5 w-5 text-sky-300" />
                      Skill highlights
                    </CardTitle>
                    <p className="text-sm text-white/70">Top badges you&apos;ve earned recently.</p>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-3">
                    {badges.length === 0 && <span className="text-sm text-white/60">No badges yet — complete a course to earn your first!</span>}
                    {badges.map((badge) => (
                      <span key={badge} className="inline-flex items-center gap-2 rounded-2xl bg-white/10 px-4 py-2 text-sm text-white">
                        <Award className="h-4 w-4 text-amber-300" />
                        {badge}
                      </span>
                    ))}
                  </CardContent>
                </Card>

                <Card className="border-white/10 bg-gradient-to-br from-emerald-500/10 to-sky-500/10 text-white">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShieldCheck className="h-5 w-5 text-emerald-300" />
                      Certificates
                    </CardTitle>
                    <p className="text-sm text-white/70">Latest verified achievements.</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {certificates.length === 0 && <p className="text-sm text-white/70">Complete courses to earn verifiable certificates.</p>}
                    {certificates.slice(0, 3).map((certificate) => {
                      const credentialLabel = certificate.credential_id ?? (certificate as any).credentialId ?? 'Verified credential';
                      const issuedDate = certificate.issued_on ?? (certificate as any).issuedOn ?? null;
                      return (
                        <div key={certificate.id} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{certificate.course?.title}</p>
                          <p className="mt-2 text-lg font-semibold">{credentialLabel}</p>
                          {issuedDate && (
                            <p className="text-xs text-white/60">Issued on {new Date(issuedDate).toLocaleDateString()}</p>
                          )}
                        </div>
                      );
                    })}
                    {certificates.length > 0 && (
                      <Button variant="ghost" className="w-full border border-white/20 text-sm text-white hover:bg-white/10" onClick={() => (window.location.href = '/certificates')}>
                        View certificate wallet
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <Card className="border-white/10 bg-white/5 text-white">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg font-semibold">Recommended next</CardTitle>
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    See all
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.length === 0 && <p className="text-sm text-white/60">Add courses to your wishlist to see recommendations.</p>}
                  {recommendations.map((rec) => (
                    <div key={rec.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.3em] text-white/60">{rec.category}</p>
                          <h3 className="mt-1 text-lg font-semibold">{rec.title}</h3>
                          <p className="text-sm text-white/70">{rec.level}</p>
                        </div>
                        <Button size="sm" className="rounded-full bg-white/20 px-4 text-white hover:bg-white/30">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5 text-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-sky-300" />
                    Weekly focus report
                  </CardTitle>
                  <p className="text-sm text-white/70">Stay on track with personalized focus time.</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                      <div key={day} className="flex items-center gap-4">
                        <span className="w-10 text-sm text-white/60">{day}</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400"
                            style={{ width: `${Math.max(10, (overview?.stats.learningHours ?? 0) * 5 - index * 3)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </section>
          </>
        )}
      </div>
    </div>
  );
}

