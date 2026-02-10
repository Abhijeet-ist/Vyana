"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/use-app-store";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { 
  User, 
  Mail, 
  Shield, 
  Bell, 
  Palette, 
  Download, 
  Trash2, 
  Camera, 
  Edit3,
  ChevronRight,
  Globe,
  Lock,
  Key,
  AlertTriangle,
  ArrowLeft
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AccountSettingsPage() {
  const { user, logout } = useAppStore();
  const router = useRouter();
  const [editingProfile, setEditingProfile] = useState(false);
  const [notifications, setNotifications] = useState({
    assessmentReminders: true,
    weeklyInsights: true,
    emergencyAlerts: true,
  });
  const [privacy, setPrivacy] = useState({
    dataCollection: false,
    analytics: false,
    personalizedAds: false,
  });

  const handleNotificationToggle = (setting: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handlePrivacyToggle = (setting: keyof typeof privacy) => {
    setPrivacy(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="flex flex-col gap-6 pb-20"
    >
      {/* Header */}
      <motion.div variants={fadeInUp} className="pt-2">
        <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => router.back()}
            className="flex items-center justify-center w-8 h-8 rounded-xl transition-colors duration-200 group"
            style={{
              backgroundColor: "hsl(255 255% 255% / 0.7)",
              border: "1px solid hsl(var(--warm-beige) / 0.3)"
            }}
          >
            <ArrowLeft 
              className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-0.5" 
              style={{ color: "hsl(135 12% 26% / 0.7)" }} 
            />
          </button>
          <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
            Account
          </p>
        </div>
        <h1
          className="text-[26px] font-semibold leading-tight tracking-tight"
          style={{ color: "hsl(135 12% 26%)" }}
        >
          Manage your <span className="font-bold">account</span>
        </h1>
      </motion.div>

      {/* Profile Section */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Profile
        </p>

        {/* Profile Info Card */}
        <div
          className="rounded-2xl p-5"
          style={{ 
            backgroundColor: "hsl(0 0% 100% / 0.7)",
            background: `
              linear-gradient(135deg,
                hsl(255 255% 255% / 0.8) 0%,
                hsl(var(--bg-calm) / 0.4) 100%
              )
            `,
            backdropFilter: 'blur(10px)',
            boxShadow: `
              0 8px 16px hsl(var(--seaweed) / 0.06),
              inset 0 1px 0 hsl(255 255% 255% / 0.3)
            `
          }}
        >
          <div className="flex items-start gap-4">
            {/* Avatar */}
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-medium"
                style={{
                  background: `
                    linear-gradient(135deg,
                      hsl(var(--seaweed)) 0%,
                      hsl(var(--sage)) 100%
                    )
                  `,
                  color: 'hsl(var(--wheat))',
                  boxShadow: `
                    0 8px 16px hsl(var(--seaweed) / 0.2),
                    inset 0 2px 8px hsl(var(--seaweed) / 0.2)
                  `
                }}
              >
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <button
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "hsl(var(--wheat))",
                  boxShadow: "0 2px 8px hsl(var(--seaweed) / 0.2)"
                }}
              >
                <Camera className="w-3 h-3" style={{ color: "hsl(var(--seaweed))" }} />
              </button>
            </div>

            {/* Profile Details */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
                    {user?.name || 'Your Name'}
                  </h3>
                  <p className="text-sm mt-1" style={{ color: "hsl(135 12% 26% / 0.65)" }}>
                    {user?.email || 'your.email@example.com'}
                  </p>
                  <p className="text-xs mt-2" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                    Member since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                  </p>
                </div>
                <button
                  onClick={() => setEditingProfile(!editingProfile)}
                  className="p-2 rounded-xl transition-colors duration-200"
                  style={{
                    backgroundColor: editingProfile ? "hsl(var(--sage) / 0.2)" : "hsl(var(--warm-beige) / 0.3)",
                    color: "hsl(var(--seaweed))"
                  }}
                >
                  <Edit3 className="w-4 h-4" strokeWidth={1.75} />
                </button>
              </div>

              {editingProfile && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 space-y-3"
                >
                  <div>
                    <label className="text-xs font-medium" style={{ color: "hsl(135 12% 26% / 0.7)" }}>
                      Display Name
                    </label>
                    <Input
                      defaultValue={user?.name}
                      className="mt-1"
                      style={{
                        backgroundColor: "hsl(255 255% 255% / 0.8)",
                        border: "1px solid hsl(var(--warm-beige) / 0.4)"
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="bg-[hsl(var(--seaweed))] text-[hsl(var(--wheat))] hover:bg-[hsl(var(--seaweed)/0.9)]"
                    >
                      Save Changes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingProfile(false)}
                      className="border-[hsl(var(--warm-beige)/0.4)]"
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Notifications Section */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Notifications
        </p>

        {/* Assessment Reminders */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(260 18% 84% / 0.35)" }}
            >
              <Bell className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(260 18% 64%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Assessment reminders
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Daily check-in notifications
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.assessmentReminders}
            onCheckedChange={() => handleNotificationToggle('assessmentReminders')}
            className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
          />
        </div>

        {/* Weekly Insights */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(108 22% 80% / 0.4)" }}
            >
              <Globe className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Weekly insights
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Summary of your mental health journey
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.weeklyInsights}
            onCheckedChange={() => handleNotificationToggle('weeklyInsights')}
            className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
          />
        </div>

        {/* Emergency Alerts */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(17 55% 62% / 0.15)" }}
            >
              <AlertTriangle className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(17 55% 52%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Emergency alerts
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Critical mental health support notifications
              </p>
            </div>
          </div>
          <Switch
            checked={notifications.emergencyAlerts}
            onCheckedChange={() => handleNotificationToggle('emergencyAlerts')}
            className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
          />
        </div>
      </motion.div>

      {/* Privacy & Security Section */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Privacy & Security
        </p>

        {/* Change Password */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(260 18% 84% / 0.35)" }}
            >
              <Key className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(260 18% 64%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Change password
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Update your account security
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4" style={{ color: "hsl(135 12% 26% / 0.45)" }} />
        </div>

        {/* Privacy Settings */}
        <div
          className="rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(108 22% 80% / 0.4)" }}
            >
              <Shield className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Data & Privacy
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Control how your data is used
              </p>
            </div>
          </div>

          <div className="space-y-4 ml-12">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                  Data collection
                </p>
                <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                  Allow anonymous usage analytics
                </p>
              </div>
              <Switch
                checked={privacy.dataCollection}
                onCheckedChange={() => handlePrivacyToggle('dataCollection')}
                className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                  Performance analytics
                </p>
                <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                  Help improve app performance
                </p>
              </div>
              <Switch
                checked={privacy.analytics}
                onCheckedChange={() => handlePrivacyToggle('analytics')}
                className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                  Personalized content
                </p>
                <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                  Tailored recommendations
                </p>
              </div>
              <Switch
                checked={privacy.personalizedAds}
                onCheckedChange={() => handlePrivacyToggle('personalizedAds')}
                className="data-[state=checked]:bg-[hsl(var(--seaweed))] data-[state=unchecked]:bg-[hsl(var(--warm-beige))]"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Data Management Section */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Data Management
        </p>

        {/* Export Data */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(108 22% 80% / 0.4)" }}
            >
              <Download className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Export your data
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Download all your information
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300"
            style={{
              backgroundColor: "hsl(108 22% 80% / 0.3)",
              color: "hsl(105 15% 43%)",
            }}
          >
            Export
          </button>
        </div>

        {/* Delete Account */}
        <div
          className="flex items-center justify-between rounded-2xl p-5"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(17 55% 62% / 0.15)" }}
            >
              <Trash2 className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(17 55% 52%)" }} />
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Delete account
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Permanently remove your account
              </p>
            </div>
          </div>
          <button
            type="button"
            className="rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300"
            style={{
              backgroundColor: "hsl(17 55% 62% / 0.15)",
              color: "hsl(17 55% 52%)",
            }}
          >
            Delete
          </button>
        </div>
      </motion.div>

      {/* Account Actions */}
      <motion.div variants={fadeInUp} className="flex flex-col gap-3">
        <p
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: "hsl(135 12% 26% / 0.35)" }}
        >
          Account Actions
        </p>

        {/* Sign Out */}
        <button
          onClick={logout}
          className="flex items-center justify-between rounded-2xl p-5 w-full transition-all duration-300 hover:scale-[1.02]"
          style={{ 
            backgroundColor: "hsl(0 0% 100% / 0.7)",
            border: "1px solid hsl(var(--melon) / 0.2)"
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(17 55% 62% / 0.15)" }}
            >
              <User className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(17 55% 52%)" }} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium" style={{ color: "hsl(17 55% 52%)" }}>
                Sign out of account
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                You'll be redirected to the login page
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4" style={{ color: "hsl(17 55% 52%)" }} />
        </button>
      </motion.div>
    </motion.div>
  );
}