import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Loader2,
  Save,
  Lock,
  Mail,
  Eye,
  EyeOff,
  Bell,
  Download,
  Trash2,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { api } from "@/services/api";
import { useUserStore } from "@/hooks/useUserStore";

export default function SettingsPage() {
  const navigate = useNavigate();
  const token = useUserStore((state) => state.token);
  const user = useUserStore((state) => state.user);
  const clearUser = useUserStore((state) => state.clearUser);

  // ------------------------------
  // Email + Password forms
  // ------------------------------
  const [emailForm, setEmailForm] = useState({
    email: user?.email || "",
    confirmEmail: "",
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [show, setShow] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const [emailSaving, setEmailSaving] = useState(false);
  const [passwordSaving, setPasswordSaving] = useState(false);

  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const [emailSuccess, setEmailSuccess] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);

  // ------------------------------
  // Notifications
  // ------------------------------
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    courseUpdates: true,
    certificateAlerts: true,
    weeklyReports: false,
  });

  useEffect(() => {
    const saved = localStorage.getItem("tz-notifications");
    if (saved) setNotifications(JSON.parse(saved));
  }, []);

  const updateNotifications = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    localStorage.setItem("tz-notifications", JSON.stringify(updated));
  };

  // ------------------------------
  // Handlers — Email
  // ------------------------------
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailForm({ ...emailForm, [e.target.name]: e.target.value });
    setEmailError(null);
    setEmailSuccess(null);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (emailForm.email !== emailForm.confirmEmail) {
      setEmailError("Emails do not match");
      return;
    }

    if (emailForm.email === user?.email) {
      setEmailError("New email must be different");
      return;
    }

    setEmailSaving(true);
    setEmailError(null);

    try {
      await api.updateSettings(token, { email: emailForm.email });
      setEmailSuccess("Email updated successfully. Verify via your inbox.");
      setEmailForm({ email: emailForm.email, confirmEmail: "" });
    } catch (err) {
      setEmailError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setEmailSaving(false);
    }
  };

  // ------------------------------
  // Handlers — Password
  // ------------------------------
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
    setPasswordError(null);
    setPasswordSuccess(null);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      setPasswordError("Password must be minimum 8 characters");
      return;
    }

    setPasswordSaving(true);

    try {
      await api.updateSettings(token, { password: passwordForm.newPassword });
      setPasswordSuccess("Password updated successfully");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(err instanceof Error ? err.message : "Update failed");
    } finally {
      setPasswordSaving(false);
    }
  };

  // ------------------------------
  // Data Management
  // ------------------------------
  const exportData = () => alert("Data export coming soon.");
  const deleteAccount = () => {
    if (confirm("This action is irreversible. Proceed?")) {
      alert("Deletion feature coming soon.");
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-b from-background via-background/95 to-background text-foreground">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Back Button */}
        <div>
          <Button variant="ghost" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-4 w-4 mr-2" /> Back
          </Button>
        </div>

        {/* Page Heading */}
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent mb-3">
            Settings
          </h1>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Manage your account, notifications, and data preferences.
          </p>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* -------------------------------------------------- */}
          {/* LEFT COLUMN — ACCOUNT SECURITY */}
          {/* -------------------------------------------------- */}
          <Card className="shadow-lg hover:shadow-xl transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-xl">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                Account Security
              </CardTitle>
              <CardDescription>Manage email & password</CardDescription>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Email */}
              <form onSubmit={handleEmailSubmit} className="space-y-4">
                <div>
                  <Label>Current Email</Label>
                  <Input disabled value={user?.email || ""} className="bg-muted" />
                </div>

                <div>
                  <Label>New Email</Label>
                  <Input
                    name="email"
                    type="email"
                    value={emailForm.email}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                <div>
                  <Label>Confirm New Email</Label>
                  <Input
                    name="confirmEmail"
                    type="email"
                    value={emailForm.confirmEmail}
                    onChange={handleEmailChange}
                    required
                  />
                </div>

                {emailError && <p className="text-destructive text-sm">{emailError}</p>}
                {emailSuccess && <p className="text-green-600 text-sm">{emailSuccess}</p>}

                <Button type="submit" className="w-full" disabled={emailSaving}>
                  {emailSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Email
                    </>
                  )}
                </Button>
              </form>

              {/* Password */}
              <form onSubmit={handlePasswordSubmit} className="space-y-4 border-t pt-6">
                <div className="space-y-2">
                  <Label>Current Password</Label>
                  <div className="relative">
                    <Input
                      name="currentPassword"
                      type={show.current ? "text" : "password"}
                      value={passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShow({ ...show, current: !show.current })}
                    >
                      {show.current ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>New Password</Label>
                  <div className="relative">
                    <Input
                      name="newPassword"
                      type={show.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShow({ ...show, new: !show.new })}
                    >
                      {show.new ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Confirm Password</Label>
                  <div className="relative">
                    <Input
                      name="confirmPassword"
                      type={show.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                      minLength={8}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2"
                      onClick={() => setShow({ ...show, confirm: !show.confirm })}
                    >
                      {show.confirm ? <EyeOff /> : <Eye />}
                    </button>
                  </div>
                </div>

                {passwordError && (
                  <p className="text-destructive text-sm">{passwordError}</p>
                )}
                {passwordSuccess && (
                  <p className="text-green-600 text-sm">{passwordSuccess}</p>
                )}

                <Button type="submit" className="w-full" disabled={passwordSaving}>
                  {passwordSaving ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* -------------------------------------------------- */}
          {/* RIGHT COLUMN — Notifications + Data Management */}
          {/* -------------------------------------------------- */}
          <div className="space-y-8">
            {/* Notifications */}
            <Card className="shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Bell className="h-6 w-6 text-primary" />
                  </div>
                  Notifications
                </CardTitle>
                <CardDescription>Control how you receive updates</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* No reusable component (your request). Repeated blocks kept inline. */}
                {[
                  {
                    key: "emailNotifications",
                    title: "Email Notifications",
                    desc: "Receive email updates",
                  },
                  {
                    key: "courseUpdates",
                    title: "Course Updates",
                    desc: "New lessons & announcements",
                  },
                  {
                    key: "certificateAlerts",
                    title: "Certificate Alerts",
                    desc: "Get notified when certificates are earned",
                  },
                  {
                    key: "weeklyReports",
                    title: "Weekly Reports",
                    desc: "Learning progress summaries",
                  },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between p-4 rounded-lg hover:bg-accent/50 transition"
                  >
                    <div>
                      <Label className="font-medium">{item.title}</Label>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>

                    <button
                      onClick={() =>
                        updateNotifications(item.key as keyof typeof notifications)
                      }
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications[item.key as keyof typeof notifications]
                          ? "bg-primary"
                          : "bg-muted"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-background transition-transform ${
                          notifications[item.key as keyof typeof notifications]
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Data Management */}
            <Card className="shadow-lg hover:shadow-xl transition">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Download className="h-6 w-6 text-primary" />
                  </div>
                  Data Management
                </CardTitle>
                <CardDescription>Manage your account data</CardDescription>
              </CardHeader>

              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  onClick={exportData}
                  className="w-full h-12 text-base"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export My Data
                </Button>

                <Button
                  variant="outline"
                  onClick={deleteAccount}
                  className="w-full h-12 text-base border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
