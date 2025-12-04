import { useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, Award, Crown, Download, Loader2, Medal } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api, CertificateListResponse } from '@/services/api';
import { useUserStore } from '@/hooks/useUserStore';

type Certificate = CertificateListResponse['certificates'][number];

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
        if (!isMounted) return;
        setCertificates(payload.certificates ?? []);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err instanceof Error ? err.message : 'Unable to load certificates');
      })
      .finally(() => {
        if (!isMounted) return;
        setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [token]);

  const summary = useMemo(() => {
    const totalHours = certificates.reduce((acc, cert) => acc + (cert.hours ?? 0), 0);
    const topGrade = certificates.reduce((acc, cert) => (cert.grade && cert.grade > acc ? cert.grade : acc), '');
    return { totalHours, topGrade };
  }, [certificates]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black pb-16 pt-12 text-white">
      <div className="mx-auto w-full max-w-6xl space-y-8 px-4 sm:px-6 lg:px-0">
        <header className="rounded-3xl bg-gradient-to-r from-amber-500/20 via-pink-500/10 to-purple-600/20 p-8 shadow-2xl ring-1 ring-white/10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-white/70">Credential wallet</p>
              <h1 className="mt-2 text-4xl font-bold leading-tight md:text-5xl">Showcase your verified mastery</h1>
              <p className="mt-3 max-w-2xl text-base text-white/70">
                Every certificate is securely stored via Supabase and ready to download, verify, and share with one click.
              </p>
            </div>
            <Button className="rounded-full bg-white text-black hover:bg-white/90" onClick={() => window.print()}>
              Download transcript
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-3">
          <Card className="border-white/10 bg-white/5 text-white">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-amber-500/20 p-3">
                <Award className="h-6 w-6 text-amber-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Total certificates</p>
                <p className="text-3xl font-semibold">{certificates.length}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-pink-500/20 p-3">
                <Crown className="h-6 w-6 text-pink-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Hours earned</p>
                <p className="text-3xl font-semibold">{summary.totalHours}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="border-white/10 bg-white/5 text-white">
            <CardContent className="flex items-center gap-4 pt-6">
              <div className="rounded-2xl bg-purple-500/20 p-3">
                <Medal className="h-6 w-6 text-purple-300" />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/60">Top grade</p>
                <p className="text-3xl font-semibold">{summary.topGrade || '—'}</p>
              </div>
            </CardContent>
          </Card>
        </section>

        {loading ? (
          <div className="flex min-h-[30vh] items-center justify-center text-white/80">
            <Loader2 className="mr-3 h-6 w-6 animate-spin" />
            Fetching verified credentials…
          </div>
        ) : error ? (
          <Card className="border-red-500/40 bg-red-500/10 text-red-100">
            <CardHeader>
              <CardTitle>Unable to load certificates</CardTitle>
            </CardHeader>
            <CardContent>
              <p>{error}</p>
              <p className="mt-2 text-sm text-red-200/80">Ensure the Supabase `certificates` table contains records for this user.</p>
            </CardContent>
          </Card>
        ) : certificates.length === 0 ? (
          <Card className="border-white/10 bg-white/5 text-white">
            <CardContent className="py-16 text-center">
              <p className="text-lg font-semibold">No certificates yet</p>
              <p className="mt-2 text-sm text-white/70">Complete a course to unlock your first credential.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {certificates.map((certificate) => (
              <Card key={certificate.id} className="border-white/10 bg-gradient-to-br from-white/5 to-transparent text-white">
                <CardHeader className="space-y-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold">{certificate.course?.title ?? 'Course credential'}</CardTitle>
                    <span className="inline-flex items-center gap-1 text-xs uppercase tracking-[0.3em] text-white/70">
                      {certificate.grade ?? 'Score'}
                      <ArrowUpRight className="h-3 w-3" />
                    </span>
                  </div>
                  <p className="text-sm text-white/60">
                    {certificate.course?.category ?? 'Track'} • {certificate.course?.level ?? 'Level'}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-4">
                    <p className="text-xs uppercase tracking-[0.3em] text-white/60">Credential ID</p>
                    <p className="mt-2 text-xl font-semibold">{certificate.credentialId}</p>
                    <p className="text-xs text-white/60">Issued {certificate.issuedOn ? new Date(certificate.issuedOn).toLocaleDateString() : '—'}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
                    <span className="rounded-full border border-white/20 px-3 py-1">{certificate.hours ?? 0} hrs</span>
                    {certificate.badgeUrl && (
                      <span className="rounded-full border border-white/20 px-3 py-1">Badge ready</span>
                    )}
                  </div>
                  <div className="flex gap-3">
                    {certificate.certificateUrl && (
                      <Button asChild className="flex-1 bg-white text-black hover:bg-white/90">
                        <a href={certificate.certificateUrl} target="_blank" rel="noreferrer">
                          View credential
                        </a>
                      </Button>
                    )}
                    {certificate.badgeUrl && (
                      <Button asChild variant="outline" className="flex-1 border-white/30 text-white hover:bg-white/10">
                        <a href={certificate.badgeUrl} target="_blank" rel="noreferrer">
                          Open badge
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

