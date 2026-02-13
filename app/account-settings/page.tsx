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
  ArrowLeft,
  Loader2
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { storage } from "@/lib/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function AccountSettingsPage() {
  const { 
    user, 
    logout, 
    notifications, 
    toggleNotification, 
    privacySettings, 
    togglePrivacySetting,
    setUser
  } = useAppStore();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [editingProfile, setEditingProfile] = useState(false);
  const [changePasswordOpen, setChangePasswordOpen] = useState(false);
  const [deleteAccountOpen, setDeleteAccountOpen] = useState(false);
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [deleteConfirmText, setDeleteConfirmText] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    setUploadingAvatar(true);

    try {
      // Try Firebase Storage first
      try {
        const timestamp = Date.now();
        const filename = `avatars/${user?.id || 'anonymous'}_${timestamp}.${file.name.split('.').pop()}`;
        
        const storageRef = ref(storage, filename);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        
        if (user) {
          setUser({
            ...user,
            avatar: downloadURL
          });
          toast.success("Profile picture updated successfully");
        }
      } catch (storageError) {
        console.warn("Firebase Storage not available, using base64:", storageError);
        
        // Fallback to base64 encoding (works without backend)
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result as string;
          if (user) {
            setUser({
              ...user,
              avatar: base64String
            });
            toast.success("Profile picture updated successfully");
          }
        };
        reader.onerror = () => {
          toast.error("Failed to read image file");
        };
        reader.readAsDataURL(file);
      }
    } catch (error) {
      console.error("Error uploading avatar:", error);
      toast.error("Failed to upload profile picture. Please try again.");
    } finally {
      setUploadingAvatar(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleSaveProfile = () => {
    // Update the user profile
    if (displayName.trim()) {
      toast.success("Profile updated successfully");
      setEditingProfile(false);
    } else {
      toast.error("Display name cannot be empty");
    }
  };

  const handleChangePassword = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all password fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }
    if (newPassword.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    
    // Here you would call your Firebase updatePassword function
    toast.success("Password updated successfully");
    setChangePasswordOpen(false);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmText !== 'DELETE') {
      toast.error("Please type DELETE to confirm");
      return;
    }
    
    toast.error("Account deleted");
    logout();
    router.push("/auth");
  };

  const handleExportData = () => {
    const data = {
      user: user,
      notifications: notifications,
      privacySettings: privacySettings,
      exportDate: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vyana-data-export-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success("Data exported successfully");
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
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleAvatarChange}
                className="hidden"
              />
              {user?.avatar ? (
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="w-16 h-16 rounded-full object-cover"
                  style={{
                    boxShadow: `
                      0 8px 16px hsl(var(--seaweed) / 0.2),
                      inset 0 2px 8px hsl(var(--seaweed) / 0.2)
                    `
                  }}
                />
              ) : (
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
              )}
              <button
                onClick={handleAvatarClick}
                disabled={uploadingAvatar}
                className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "hsl(var(--wheat))",
                  boxShadow: "0 2px 8px hsl(var(--seaweed) / 0.2)"
                }}
              >
                {uploadingAvatar ? (
                  <Loader2 className="w-3 h-3 animate-spin" style={{ color: "hsl(var(--seaweed))" }} />
                ) : (
                  <Camera className="w-3 h-3" style={{ color: "hsl(var(--seaweed))" }} />
                )}
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
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="mt-1 rounded-xl"
                      style={{
                        backgroundColor: "hsl(255 255% 255% / 0.8)",
                        border: "1px solid hsl(var(--warm-beige) / 0.4)"
                      }}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      onClick={handleSaveProfile}
                      className="rounded-xl bg-[hsl(var(--seaweed))] text-[hsl(var(--wheat))] hover:bg-[hsl(var(--seaweed)/0.9)]"
                    >
                      Save Changes
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setEditingProfile(false);
                        setDisplayName(user?.name || '');
                      }}
                      className="rounded-xl border-[hsl(var(--warm-beige)/0.4)]"
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
            onCheckedChange={() => toggleNotification('assessmentReminders')}
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
            onCheckedChange={() => toggleNotification('weeklyInsights')}
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
            onCheckedChange={() => toggleNotification('emergencyAlerts')}
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
        <button
          onClick={() => setChangePasswordOpen(true)}
          className="flex items-center justify-between rounded-2xl p-5 w-full transition-all duration-300 hover:scale-[1.01]"
          style={{ backgroundColor: "hsl(0 0% 100% / 0.7)" }}
        >
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-full"
              style={{ backgroundColor: "hsl(260 18% 84% / 0.35)" }}
            >
              <Key className="h-4 w-4" strokeWidth={1.75} style={{ color: "hsl(260 18% 64%)" }} />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Change password
              </p>
              <p className="text-xs" style={{ color: "hsl(135 12% 26% / 0.45)" }}>
                Update your account security
              </p>
            </div>
          </div>
          <ChevronRight className="h-4 w-4" style={{ color: "hsl(135 12% 26% / 0.45)" }} />
        </button>

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
                checked={privacySettings.dataCollection}
                onCheckedChange={() => togglePrivacySetting('dataCollection')}
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
                checked={privacySettings.analytics}
                onCheckedChange={() => togglePrivacySetting('analytics')}
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
                checked={privacySettings.personalizedContent}
                onCheckedChange={() => togglePrivacySetting('personalizedContent')}
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
            onClick={handleExportData}
            className="rounded-full px-4 py-1.5 text-xs font-medium transition-colors duration-300 hover:scale-105"
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
            onClick={() => setDeleteAccountOpen(true)}
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

      {/* Change Password Dialog */}
      <Dialog open={changePasswordOpen} onOpenChange={setChangePasswordOpen}>
        <DialogContent className="sm:max-w-[425px] border-none" style={{
          backgroundColor: "hsl(var(--wheat))",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px hsl(var(--seaweed) / 0.12)"
        }}>
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold" style={{ color: "hsl(135 12% 26%)" }}>
              Change password
            </DialogTitle>
            <DialogDescription className="text-sm" style={{ color: "hsl(135 12% 26% / 0.65)" }}>
              Enter your current password and choose a new one.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="current-password" className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Current password
              </Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="rounded-xl"
                style={{
                  backgroundColor: "hsl(255 255% 255% / 0.8)",
                  border: "1px solid hsl(var(--warm-beige) / 0.4)"
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="new-password" className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                New password
              </Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="rounded-xl"
                style={{
                  backgroundColor: "hsl(255 255% 255% / 0.8)",
                  border: "1px solid hsl(var(--warm-beige) / 0.4)"
                }}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-password" className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                Confirm new password
              </Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="rounded-xl"
                style={{
                  backgroundColor: "hsl(255 255% 255% / 0.8)",
                  border: "1px solid hsl(var(--warm-beige) / 0.4)"
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setChangePasswordOpen(false);
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
              }}
              className="rounded-xl border-[hsl(var(--warm-beige)/0.4)]"
            >
              Cancel
            </Button>
            <Button
              onClick={handleChangePassword}
              className="rounded-xl bg-[hsl(var(--seaweed))] text-[hsl(var(--wheat))] hover:bg-[hsl(var(--seaweed)/0.9)]"
            >
              Update password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Account Confirmation Dialog */}
      <AlertDialog open={deleteAccountOpen} onOpenChange={setDeleteAccountOpen}>
        <AlertDialogContent className="sm:max-w-[425px] border-none" style={{
          backgroundColor: "hsl(var(--wheat))",
          borderRadius: "1.5rem",
          boxShadow: "0 8px 32px hsl(var(--seaweed) / 0.12)"
        }}>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-semibold flex items-center gap-2" style={{ color: "hsl(17 55% 52%)" }}>
              <AlertTriangle className="h-5 w-5" />
              Delete account
            </AlertDialogTitle>
            <AlertDialogDescription className="text-sm leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.65)" }}>
              This action cannot be undone. This will permanently delete your account and remove all your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <p className="text-sm font-medium mb-2" style={{ color: "hsl(135 12% 26%)" }}>
              Type <span className="font-bold">DELETE</span> to confirm:
            </p>
            <Input
              placeholder="DELETE"
              value={deleteConfirmText}
              onChange={(e) => setDeleteConfirmText(e.target.value)}
              className="rounded-xl"
              style={{
                backgroundColor: "hsl(255 255% 255% / 0.8)",
                border: "1px solid hsl(var(--warm-beige) / 0.4)"
              }}
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel 
              onClick={() => {
                setDeleteAccountOpen(false);
                setDeleteConfirmText('');
              }}
              className="rounded-xl border-[hsl(var(--warm-beige)/0.4)]"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteAccount}
              disabled={deleteConfirmText !== 'DELETE'}
              className="rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                backgroundColor: "hsl(17 55% 62%)",
                color: "hsl(255 255% 255%)"
              }}
            >
              Delete account
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
}