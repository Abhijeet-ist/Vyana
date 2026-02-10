"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, MessageCircle, Building2, Wind, Hand, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/use-app-store";
import { crisisResources } from "@/lib/insights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const iconMap: Record<string, typeof Phone> = {
  hotline: Phone,
  campus: Building2,
  breathing: Wind,
  grounding: Hand,
};

interface SupportFormData {
  lookingFor: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  emailAddress: string;
  organization: string;
  role: string;
  helpDescription: string;
  hearAboutUs: string[];
}

function SupportForm({ onBack }: { onBack: () => void }) {
  const [formData, setFormData] = useState<SupportFormData>({
    lookingFor: "counseling",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    emailAddress: "",
    organization: "",
    role: "",
    helpDescription: "",
    hearAboutUs: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support form submitted:", formData);
    // Handle form submission here
    onBack(); // Close the form after submission
  };

  const handleCheckboxChange = (value: string, checked: boolean) => {
    if (checked) {
      setFormData(prev => ({
        ...prev,
        hearAboutUs: [...prev.hearAboutUs, value]
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        hearAboutUs: prev.hearAboutUs.filter(item => item !== value)
      }));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
      className="w-full h-full bg-white rounded-3xl p-7 max-h-screen overflow-hidden"
    >
      <button
        type="button"
        onClick={onBack}
        className="flex items-center gap-2 mb-4 text-sm transition-colors hover:opacity-80"
        style={{ color: "hsl(135 12% 26% / 0.6)" }}
      >
        <ArrowLeft className="h-4 w-4" />
        Back to resources
      </button>

      <h3 className="text-lg font-semibold mb-2" style={{ color: "hsl(135 12% 26%)" }}>
        Request Mental Health Support
      </h3>
      <p className="text-sm mb-6" style={{ color: "hsl(135 12% 26% / 0.55)" }}>
        Fill out this form to connect with our mental health professionals.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4 max-h-80 overflow-y-auto pr-2">
        <div>
          <label className="text-sm font-medium mb-3 block" style={{ color: "hsl(135 12% 26%)" }}>
            What type of support are you looking for?
          </label>
          <RadioGroup 
            value={formData.lookingFor} 
            onValueChange={(value) => setFormData(prev => ({ ...prev, lookingFor: value }))}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="counseling" id="counseling" />
              <Label htmlFor="counseling" className="text-sm" style={{ color: "hsl(135 12% 26% / 0.7)" }}>Individual Counseling</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="therapy" id="therapy" />
              <Label htmlFor="therapy" className="text-sm" style={{ color: "hsl(135 12% 26% / 0.7)" }}>Therapy Session</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="crisis" id="crisis" />
              <Label htmlFor="crisis" className="text-sm" style={{ color: "hsl(135 12% 26% / 0.7)" }}>Crisis Support</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" />
              <Label htmlFor="other" className="text-sm" style={{ color: "hsl(135 12% 26% / 0.7)" }}>Other Support</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="First Name *"
              value={formData.firstName}
              onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
              className="text-sm"
              style={{ 
                backgroundColor: "hsl(36 33% 93%)", 
                borderColor: "hsl(135 12% 26% / 0.2)",
                color: "hsl(135 12% 26%)"
              }}
            />
          </div>
          <div>
            <Input
              placeholder="Last Name *"
              value={formData.lastName}
              onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
              className="text-sm"
              style={{ 
                backgroundColor: "hsl(36 33% 93%)", 
                borderColor: "hsl(135 12% 26% / 0.2)",
                color: "hsl(135 12% 26%)"
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="Phone Number *"
              value={formData.phoneNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
              className="text-sm"
              style={{ 
                backgroundColor: "hsl(36 33% 93%)", 
                borderColor: "hsl(135 12% 26% / 0.2)",
                color: "hsl(135 12% 26%)"
              }}
            />
          </div>
          <div>
            <Input
              placeholder="Email Address *"
              type="email"
              value={formData.emailAddress}
              onChange={(e) => setFormData(prev => ({ ...prev, emailAddress: e.target.value }))}
              className="text-sm"
              style={{ 
                backgroundColor: "hsl(36 33% 93%)", 
                borderColor: "hsl(135 12% 26% / 0.2)",
                color: "hsl(135 12% 26%)"
              }}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <Input
              placeholder="School/Organization *"
              value={formData.organization}
              onChange={(e) => setFormData(prev => ({ ...prev, organization: e.target.value }))}
              className="text-sm"
              style={{ 
                backgroundColor: "hsl(36 33% 93%)", 
                borderColor: "hsl(135 12% 26% / 0.2)",
                color: "hsl(135 12% 26%)"
              }}
            />
          </div>
          <div>
            <Input
              placeholder="Your Role/Status *"
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              className="text-sm"
              style={{ 
                backgroundColor: "hsl(36 33% 93%)", 
                borderColor: "hsl(135 12% 26% / 0.2)",
                color: "hsl(135 12% 26%)"
              }}
            />
          </div>
        </div>

        <div>
          <Textarea
            placeholder="How can we support you? Please describe what you're going through... (Optional)"
            value={formData.helpDescription}
            onChange={(e) => setFormData(prev => ({ ...prev, helpDescription: e.target.value }))}
            className="text-sm min-h-[80px]"
            style={{ 
              backgroundColor: "hsl(36 33% 93%)", 
              borderColor: "hsl(135 12% 26% / 0.2)",
              color: "hsl(135 12% 26%)"
            }}
          />
        </div>

        <div>
          <label className="text-sm font-medium mb-3 block" style={{ color: "hsl(135 12% 26%)" }}>
            How did you hear about us? (Optional)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Word of mouth",
              "Social Media", 
              "Campus Referral",
              "Counselor Referral",
              "Online Search",
              "Mental Health Event",
              "Friend/Family",
              "Others"
            ].map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={formData.hearAboutUs.includes(option)}
                  onCheckedChange={(checked) => handleCheckboxChange(option, !!checked)}
                />
                <Label htmlFor={option} className="text-xs" style={{ color: "hsl(135 12% 26% / 0.7)" }}>
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full text-sm font-medium py-3 rounded-2xl"
          style={{ 
            backgroundColor: "hsl(105 15% 43%)", 
            color: "white",
          }}
        >
          REQUEST SUPPORT
        </Button>
      </form>
    </motion.div>
  );
}

export function CrisisModal() {
  const router = useRouter();
  const { crisisModalOpen, setCrisisModalOpen } = useAppStore();
  const [showSupportForm, setShowSupportForm] = useState(false);

  const handleGroundingClick = () => {
    setShowSupportForm(true);
  };

  const handleBreathingClick = () => {
    setCrisisModalOpen(false);
    setShowSupportForm(false);
    router.push("/breathing");
  };

  return (
    <AnimatePresence>
      {crisisModalOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-[60]"
            style={{ backgroundColor: "hsl(135 12% 26% / 0.4)", backdropFilter: "blur(4px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setCrisisModalOpen(false);
              setShowSupportForm(false);
            }}
          />

          <motion.div
            className="fixed inset-x-4 top-[8%] z-[70] mx-auto max-w-md rounded-3xl shadow-2xl sm:inset-x-auto"
            style={{ backgroundColor: "hsl(0 0% 100%)", color: "hsl(135 12% 26%)", minHeight: "400px" }}
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Crisis support resources"
          >
            <div className="relative w-full h-full">
              <button
                type="button"
                onClick={() => {
                  setCrisisModalOpen(false);
                  setShowSupportForm(false);
                }}
                className="absolute right-4 top-4 z-10 rounded-full p-2 transition-colors"
                style={{ color: "hsl(135 12% 26% / 0.4)" }}
                aria-label="Close crisis resources"
              >
                <X className="h-5 w-5" strokeWidth={1.75} />
              </button>

              <AnimatePresence mode="wait">
                {!showSupportForm ? (
                  <motion.div
                    key="resources"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, x: -300 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    className="p-7 w-full h-full"
                  >
                    <h2 className="mb-2 text-xl font-semibold tracking-tight" style={{ color: "hsl(135 12% 26%)" }}>
                      You are not alone
                    </h2>
                    <p className="mb-6 text-sm leading-relaxed" style={{ color: "hsl(135 12% 26% / 0.55)" }}>
                      Here are some resources available to you right now.
                    </p>

                    <div className="flex flex-col gap-3">
                      {crisisResources.map((resource) => {
                        const Icon = iconMap[resource.type] || MessageCircle;
                        const isGrounding = resource.type === 'grounding';
                        const isBreathing = resource.type === 'breathing';
                        const isClickable = isGrounding || isBreathing;
                        
                        const handleResourceClick = () => {
                          if (isGrounding) {
                            handleGroundingClick();
                          } else if (isBreathing) {
                            handleBreathingClick();
                          }
                        };
                        
                        return (
                          <div
                            key={resource.name}
                            className={`flex items-start gap-3 rounded-2xl p-4 transition-all ${isClickable ? 'cursor-pointer hover:shadow-md hover:scale-[1.02]' : ''}`}
                            style={{ backgroundColor: "hsl(36 33% 93%)" }}
                            onClick={isClickable ? handleResourceClick : undefined}
                          >
                            <div
                              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                              style={{ backgroundColor: "hsl(105 15% 43% / 0.12)" }}
                            >
                              <Icon className="h-5 w-5" strokeWidth={1.75} style={{ color: "hsl(105 15% 43%)" }} />
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className="text-sm font-medium" style={{ color: "hsl(135 12% 26%)" }}>
                                {resource.name}
                              </span>
                              <span className="text-xs" style={{ color: "hsl(135 12% 26% / 0.5)" }}>
                                {resource.description}
                              </span>
                              <span className="mt-1 text-xs font-medium" style={{ color: "hsl(105 15% 43%)" }}>
                                {isGrounding ? "Click to access support form" : 
                                 isBreathing ? "Click to start breathing exercise" : 
                                 resource.contact}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ) : (
                  <SupportForm key="form" onBack={() => setShowSupportForm(false)} />
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
