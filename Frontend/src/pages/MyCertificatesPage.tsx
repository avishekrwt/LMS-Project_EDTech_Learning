import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Award, Crown, Download, Loader2, Medal } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api, CertificateListResponse } from "@/services/api";
import { useUserStore } from "@/hooks/useUserStore";

type Certificate = CertificateListResponse["certificates"][number];

export default function MyCertificatesPage() {
  const token = useUserStore((state) => state.token);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) return;

    let isMounted = true;
    setLoading(true);
    setError(null);

    api
      .getMyCertificates(token)
      .then((payload) => {
        if (isMounted) setCertificates(payload.certificates ?? []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : "Unable to load certificates");
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const summary = useMemo(() => {
    const totalHours = certificates.reduce((a, c) => a + (c.hours ?? 0), 0);
    const topGrade = certificates.reduce(
      (a, c) => (c.grade && c.grade > a ? c.grade : a),
      ""
    );
    return { totalHours, topGrade };
  }, [certificates]);

  return (
    <div className="min-h-screen pb-16 pt-12 bg-gradient-to-b 
      from-gray-50 via-white to-gray-100 
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 
      text-gray-900 dark:text-white">

      <div className="mx-auto max-w-6xl w-full space-y-10 px-4 sm:px-6">

        {/* HEADER */}
        <header className="rounded-3xl p-8 shadow-2xl ring-1 ring-white/10 backdrop-blur 
          bg-gradient-to-r from-indigo-600/30 via-purple-600/20 to-blue-600/30">

          <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-8">
            <div>
              <p className="uppercase text-sm tracking-[0.3em] text-white/70">
                Credential Wallet
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mt-2">
                Showcase your verified mastery
              </h1>
              <p className="text-white/70 mt-3 max-w-2xl">
                Every certificate is securely stored via Supabase and ready to verify, download,
                and share with confidence.
              </p>
            </div>

            <Button className="rounded-full bg-white text-black hover:bg-white/90"
              onClick={() => window.print()}>
              Download Transcript <Download className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* SUMMARY CARDS */}
        <section className="grid gap-6 md:grid-cols-3">
          {[
            {
              label: "Total Certificates",
              icon: Award,
              value: certificates.length,
              accent: "bg-amber-500/20 text-amber-300",
            },
            {
              label: "Hours Earned",
              icon: Crown,
              value: summary.totalHours,
              accent: "bg-pink-500/20 text-pink-300",
            },
            {
              label: "Top Grade",
              icon: Medal,
              value: summary.topGrade || "—",
              accent: "bg-purple-500/20 text-purple-300",
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
                  <p className="text-3xl font-semibold text-gray-900 dark:text-white">
                    {item.value}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* EMPTY / ERROR / LOADING STATES */}
        {loading ? (
          <div className="flex items-center justify-center min-h-[30vh]">
            <Loader2 className="h-6 w-6 animate-spin text-blue-500 dark:text-sky-300 mr-3" />
            <span className="text-gray-700 dark:text-white/80">
              Fetching credentials…
            </span>
          </div>
        ) : error ? (
          <Card className="border-red-500/40 bg-red-500/10 text-red-100 p-6">
            <p className="font-semibold">Unable to load certificates</p>
            <p className="text-sm mt-1">{error}</p>
          </Card>
        ) : certificates.length === 0 ? (
          <Card className="rounded-2xl border border-gray-200/50 dark:border-white/10 
            bg-gray-50/50 dark:bg-white/5 shadow-lg ring-1 
            ring-gray-300/20 dark:ring-black/10 p-16 text-center">
            <p className="text-lg font-semibold">No certificates yet</p>
            <p className="text-sm text-gray-500 dark:text-white/70 mt-2">
              Complete a course to unlock your first credential.
            </p>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {certificates.map((c) => (
              <Card
                key={c.id}
                className="rounded-2xl border border-gray-200/50 dark:border-white/10 
                  bg-gray-50/50 dark:bg-white/5 shadow-lg ring-1 
                  ring-gray-300/20 dark:ring-black/10"
              >
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {c.course?.title ?? "Course Credential"}
                    </CardTitle>
                    <span className="text-xs flex items-center gap-1 uppercase tracking-[0.3em] text-gray-600 dark:text-white/60">
                      {c.grade ?? "Score"} <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>

                  <p className="text-sm text-gray-600 dark:text-white/70">
                    {c.course?.category ?? "Track"} • {c.course?.level ?? "Level"}
                  </p>
                </CardHeader>

                <CardContent className="space-y-5">
                  <div className="rounded-2xl border border-dashed border-gray-300/50 dark:border-white/20 
                    bg-white/40 dark:bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-600 dark:text-white/60">
                      Credential ID
                    </p>
                    <p className="mt-2 text-xl font-semibold">
                      {c.credentialId}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-white/60">
                      Issued:{" "}
                      {c.issuedOn
                        ? new Date(c.issuedOn).toLocaleDateString()
                        : "—"}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-3 text-xs uppercase tracking-[0.3em] text-gray-700 dark:text-white/70">
                    <span className="px-3 py-1 rounded-full border border-gray-300/50 dark:border-white/20">
                      {c.hours ?? 0} hrs
                    </span>

                    {c.badgeUrl && (
                      <span className="px-3 py-1 rounded-full border border-gray-300/50 dark:border-white/20">
                        Badge Ready
                      </span>
                    )}
                  </div>

                  <div className="flex gap-3">
                    {c.certificateUrl && (
                      <Button className="flex-1 bg-white text-black hover:bg-white/90" asChild>
                        <a href={c.certificateUrl} target="_blank">
                          View Credential
                        </a>
                      </Button>
                    )}

                    {c.badgeUrl && (
                      <Button
                        variant="outline"
                        className="flex-1 border-gray-300 dark:border-white/20 text-gray-700 dark:text-white hover:bg-gray-200/50 dark:hover:bg-white/10"
                        asChild
                      >
                        <a href={c.badgeUrl} target="_blank">
                          Open Badge
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
