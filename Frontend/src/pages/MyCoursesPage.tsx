import { useEffect, useMemo, useState } from 'react';
import { BookMarked, CalendarCheck, Loader2, Target, TimerReset, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api, CourseListResponse } from '@/services/api';
import { useUserStore } from '@/hooks/useUserStore';

type Course = CourseListResponse['courses'][number];
type CourseFilter = 'all' | 'in_progress' | 'completed' | 'wishlist';

const FILTERS: { label: string; value: CourseFilter }[] = [
  { label: 'All', value: 'all' },
  { label: 'In progress', value: 'in_progress' },
  { label: 'Completed', value: 'completed' },
  { label: 'Wishlist', value: 'wishlist' },
];

export default function MyCoursesPage() {
  const token = useUserStore((state) => state.token);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CourseFilter>('all');

  useEffect(() => {
    if (!token) return;
    let isMounted = true;
    setLoading(true);
    setError(null);

    api
      .getMyCourses(token)
      .then((payload) => {
        if (!isMounted) return;
        setCourses(payload.courses ?? []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load courses');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const stats = useMemo(() => {
    const activeCount = courses.filter((course) => course.status !== 'completed').length;
    const completedCount = courses.filter((course) => course.status === 'completed').length;
    const averageProgress =
      courses.length === 0 ? 0 : Math.round(courses.reduce((acc, course) => acc + (course.progress ?? 0), 0) / courses.length);

    return {
      activeCount,
      completedCount,
      averageProgress,
    };
  }, [courses]);

  const filteredCourses = useMemo(() => {
    if (filter === 'all') return courses;
    return courses.filter((course) => course.status === filter);
  }, [courses, filter]);

  return (
    <div className="min-h-screen bg-slate-950 pb-16 pt-12 text-white">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 sm:px-6 lg:px-0">
        <header className="rounded-3xl bg-gradient-to-r from-sky-600/30 via-indigo-600/20 to-purple-600/30 p-8 shadow-2xl ring-1 ring-white/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/60">My courses hub</p>
              <h1 className="mt-2 text-4xl font-bold leading-tight tracking-tight md:text-5xl">Shape your learning momentum</h1>
              <p className="mt-3 max-w-2xl text-base text-white/70">
                Beautifully organized overview of every course connected to Supabase. Monitor real progress, jump back in instantly, and celebrate
                completions.
              </p>
            </div>
            <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Avg completion</p>
                <p className="text-3xl font-semibold">{stats.averageProgress}%</p>
              </div>
              <div className="h-16 w-px bg-white/20" />
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Completed</p>
                <p className="text-3xl font-semibold">{stats.completedCount}</p>
              </div>
            </div>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-sky-500/20 p-3">
                <BookMarked className="h-6 w-6 text-sky-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Total courses</p>
                <p className="text-3xl font-semibold">{courses.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-emerald-500/20 p-3">
                <Target className="h-6 w-6 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Active now</p>
                <p className="text-3xl font-semibold">{stats.activeCount}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-amber-500/20 p-3">
                <TimerReset className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Last accessed</p>
                <p className="text-3xl font-semibold">
                  {courses[0]?.lastAccessedAt ? new Date(courses[0].lastAccessedAt).toLocaleDateString() : 'N/A'}
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <section className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-lg">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((item) => (
                <Button
                  key={item.value}
                  variant={filter === item.value ? 'default' : 'outline'}
                  className={`rounded-full ${filter === item.value ? 'bg-white text-black hover:bg-white/90' : 'border-white/30 text-white hover:bg-white/10'}`}
                  onClick={() => setFilter(item.value)}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
              Export progress
            </Button>
          </div>
        </section>

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center text-white/80">
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Syncing courses with Supabase…
          </div>
        ) : error ? (
          <Card className="border-red-500/40 bg-red-500/10 text-red-100">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Unable to load courses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
              <p className="mt-2 text-sm text-red-200/80">Verify that your Supabase tables contain data for this user.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-5">
            {filteredCourses.length === 0 ? (
              <Card className="border-white/10 bg-white/5 text-white">
                <CardContent className="py-12 text-center">
                  <p className="text-lg font-semibold">No courses in this view</p>
                  <p className="mt-2 text-sm text-white/70">Adjust filters or enroll in a new course to see it here.</p>
                </CardContent>
              </Card>
            ) : (
              filteredCourses.map((course) => {
                const statusLabel =
                  (course.status ?? 'in_progress')
                    .split('_')
                    .map((chunk) => chunk.charAt(0).toUpperCase() + chunk.slice(1))
                    .join(' ') || 'In progress';
                return (
                <Card key={course.id} className="border-white/10 bg-gradient-to-r from-white/5 to-transparent text-white">
                  <CardContent className="space-y-4 pt-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.3em] text-white/60">{course.category}</p>
                        <h3 className="mt-1 text-2xl font-semibold">{course.title}</h3>
                        <p className="text-sm text-white/70">
                          {course.level} • {course.lessonsCount} lessons • {Math.round(course.durationMinutes / 60)} hrs
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em]">
                        <span className="rounded-full border border-white/20 px-3 py-1">{statusLabel}</span>
                        <span className="rounded-full border border-white/20 px-3 py-1">{course.instructor}</span>
                      </div>
                    </div>

                    <div className="grid gap-4 md:grid-cols-[2fr,1fr]">
                      <div>
                        <div className="flex items-center justify-between text-xs text-white/60">
                          <span>Progress</span>
                          <span>{Math.round(course.progress)}%</span>
                        </div>
                        <div className="mt-2 h-3 overflow-hidden rounded-full bg-white/10">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500"
                            style={{ width: `${course.progress}%` }}
                          />
                        </div>
                        <p className="mt-2 text-xs text-white/60">
                          ETA {course.completionEta ? new Date(course.completionEta).toLocaleDateString() : '—'} • Last accessed{' '}
                          {course.lastAccessedAt ? new Date(course.lastAccessedAt).toLocaleString() : '—'}
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <CalendarCheck className="h-4 w-4 text-emerald-300" />
                          Lessons left {(course.lessonsCount ?? 0) - Math.round(((course.lessonsCount ?? 0) * course.progress) / 100)}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-white/70">
                          <Target className="h-4 w-4 text-sky-300" />
                          Rating {course.rating?.toFixed(1) ?? '—'}
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1 bg-white text-black hover:bg-white/90">Resume</Button>
                          <Button variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}

