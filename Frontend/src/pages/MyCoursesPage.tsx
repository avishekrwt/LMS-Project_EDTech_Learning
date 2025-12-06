import { useEffect, useMemo, useState } from "react";
import {
  BookMarked,
  CalendarCheck,
  Loader2,
  Target,
  TimerReset,
  Trophy,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api, CourseListResponse } from "@/services/api";
import { useUserStore } from "@/hooks/useUserStore";

type Course = CourseListResponse["courses"][number];
type CourseFilter = "all" | "in_progress" | "completed" | "wishlist";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "In progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Wishlist", value: "wishlist" },
] satisfies { label: string; value: CourseFilter }[];

export default function MyCoursesPage() {
  const token = useUserStore((state) => state.token);

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<CourseFilter>("all");

  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    api
      .getMyCourses(token)
      .then((payload) => {
        if (isMounted) setCourses(payload.courses ?? []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(
          err instanceof Error ? err.message : "Unable to load courses"
        );
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const stats = useMemo(() => {
    const active = courses.filter((c) => c.status !== "completed").length;
    const completed = courses.filter((c) => c.status === "completed").length;
    const avg =
      courses.length === 0
        ? 0
        : Math.round(
            courses.reduce((a, c) => a + (c.progress ?? 0), 0) / courses.length
          );

    return { active, completed, avg };
  }, [courses]);

  const filtered = useMemo(() => {
    if (filter === "all") return courses;
    return courses.filter((c) => c.status === filter);
  }, [courses, filter]);

  return (
    <div
      className="min-h-screen pb-16 pt-12 bg-gradient-to-b 
      from-gray-50 via-white to-gray-100 
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
      text-gray-900 dark:text-white"
    >
      <div className="mx-auto w-full max-w-6xl space-y-10 px-4 sm:px-6">

        {/* HEADER */}
        <header
          className="rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur 
          bg-gradient-to-r from-sky-600/30 via-indigo-600/20 to-purple-600/30"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
            <div>
              <p className="uppercase text-sm tracking-[0.3em] text-white/70">
                My Courses Hub
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
                Shape your learning momentum
              </h1>
              <p className="text-white/70 mt-3 max-w-2xl">
                Monitor real progress, resume instantly, and celebrate completions —
                all connected to Supabase.
              </p>
            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 px-6 py-4">
              <div>
                <p className="uppercase text-xs tracking-[0.3em] text-white/60">
                  Avg Completion
                </p>
                <p className="text-3xl font-semibold">{stats.avg}%</p>
              </div>

              <div className="w-px h-14 bg-white/20" />

              <div>
                <p className="uppercase text-xs tracking-[0.3em] text-white/60">
                  Completed
                </p>
                <p className="text-3xl font-semibold">{stats.completed}</p>
              </div>
            </div>
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Total Courses",
              icon: BookMarked,
              value: courses.length,
              accent: "bg-sky-500/20 text-sky-300",
            },
            {
              label: "Active Now",
              icon: Target,
              value: stats.active,
              accent: "bg-emerald-500/20 text-emerald-300",
            },
            {
              label: "Last Accessed",
              icon: TimerReset,
              value: courses[0]?.lastAccessedAt
                ? new Date(courses[0].lastAccessedAt).toLocaleDateString()
                : "N/A",
              accent: "bg-amber-500/20 text-amber-300",
            },
          ].map((item) => (
            <Card
              key={item.label}
              className="rounded-2xl border border-gray-200/50 dark:border-white/10 
              bg-gray-50/50 dark:bg-white/5 shadow-lg ring-1 
              ring-gray-300/20 dark:ring-black/10"
            >
              <CardContent className="pt-6 flex items-center gap-4">
                <div className={`rounded-2xl p-3 ${item.accent}`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <p className="uppercase text-xs tracking-[0.3em] text-gray-600 dark:text-white/60">
                    {item.label}
                  </p>
                  <p className="text-3xl font-semibold">{item.value}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* FILTER BAR */}
        <section
          className="rounded-2xl border border-gray-200/50 dark:border-white/10 
          bg-gray-50/50 dark:bg-white/5 shadow-lg ring-1 
          ring-gray-300/20 dark:ring-black/10 p-4"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {FILTERS.map((f) => (
                <Button
                  key={f.value}
                  variant={filter === f.value ? "default" : "outline"}
                  onClick={() => setFilter(f.value)}
                  className={`rounded-full ${
                    filter === f.value
                      ? "bg-white text-black hover:bg-white/90"
                      : "border-gray-300 dark:border-white/30 text-gray-700 dark:text-white hover:bg-gray-200/40 dark:hover:bg-white/10"
                  }`}
                >
                  {f.label}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              className="border-gray-300 dark:border-white/30 text-gray-700 dark:text-white hover:bg-gray-200/40 dark:hover:bg-white/10"
            >
              Export Progress
            </Button>
          </div>
        </section>

        {/* CONTENT */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[30vh]">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500 dark:text-sky-300 mr-3" />
            <span className="text-gray-700 dark:text-white/80">
              Syncing courses…
            </span>
          </div>
        ) : error ? (
          <Card className="border-red-500/40 bg-red-500/10 text-red-100 p-6">
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              Unable to load courses
            </CardTitle>
            <p className="mt-2 text-sm">{error}</p>
          </Card>
        ) : filtered.length === 0 ? (
          <Card
            className="rounded-2xl border border-gray-200/50 dark:border-white/10 
            bg-gray-50/50 dark:bg-white/5 shadow-lg ring-1 
            ring-gray-300/20 dark:ring-black/10 p-16 text-center"
          >
            <p className="text-lg font-semibold">No courses in this view</p>
            <p className="text-sm text-gray-600 dark:text-white/70 mt-2">
              Adjust filters or enroll in new courses.
            </p>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filtered.map((course) => {
              const statusLabel = (course.status ?? "in_progress")
                .split("_")
                .map((x) => x[0].toUpperCase() + x.slice(1))
                .join(" ");

              return (
                <Card
                  key={course.id}
                  className="rounded-2xl border border-gray-200/50 dark:border-white/10 
                  bg-gray-50/50 dark:bg-white/5 shadow-lg ring-1 
                  ring-gray-300/20 dark:ring-black/10"
                >
                  <CardContent className="pt-6 space-y-6">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div>
                        <p className="uppercase text-xs tracking-[0.3em] text-gray-600 dark:text-white/60">
                          {course.category}
                        </p>
                        <h3 className="text-2xl font-semibold">
                          {course.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-white/70">
                          {course.level} • {course.lessonsCount} lessons •{" "}
                          {Math.round(course.durationMinutes / 60)} hrs
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em]">
                        <span className="rounded-full border border-gray-300 dark:border-white/20 px-3 py-1">
                          {statusLabel}
                        </span>
                        <span className="rounded-full border border-gray-300 dark:border-white/20 px-3 py-1">
                          {course.instructor}
                        </span>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-[2fr,1fr] gap-6">
                      <div>
                        <div className="flex justify-between text-xs text-gray-600 dark:text-white/60">
                          <span>Progress</span>
                          <span>{Math.round(course.progress)}%</span>
                        </div>

                        <div className="h-3 mt-2 bg-gray-200/50 dark:bg-white/10 overflow-hidden rounded-full">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-500"
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>

                        <p className="text-xs mt-2 text-gray-600 dark:text-white/60">
                          ETA:{" "}
                          {course.completionEta
                            ? new Date(course.completionEta).toLocaleDateString()
                            : "—"}{" "}
                          • Last accessed:{" "}
                          {course.lastAccessedAt
                            ? new Date(
                                course.lastAccessedAt
                              ).toLocaleString()
                            : "—"}
                        </p>
                      </div>

                      <div
                        className="flex flex-col gap-3 rounded-2xl border 
                        border-gray-200/50 dark:border-white/10 bg-gray-50/50 dark:bg-white/5 p-4"
                      >
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                          <CalendarCheck className="h-4 w-4 text-emerald-300" />
                          Lessons left{" "}
                          {(course.lessonsCount ?? 0) -
                            Math.round(
                              ((course.lessonsCount ?? 0) *
                                course.progress) /
                                100
                            )}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white/70">
                          <Target className="h-4 w-4 text-sky-300" />
                          Rating {course.rating?.toFixed(1) ?? "—"}
                        </div>

                        <div className="flex gap-3">
                          <Button className="flex-1 bg-white text-black hover:bg-white/90">
                            Resume
                          </Button>

                          <Button
                            variant="outline"
                            className="flex-1 border-gray-300 dark:border-white/20 
                            text-gray-700 dark:text-white hover:bg-gray-200/40 dark:hover:bg-white/10"
                          >
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
