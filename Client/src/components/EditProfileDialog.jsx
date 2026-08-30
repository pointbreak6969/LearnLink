"use client";

import { useCharacterLimit } from "@/components/hooks/use-character-limit";
import { useImageUpload } from "@/components/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Check, ImagePlus, X, Loader2 } from "lucide-react";
import { useId, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import profileService from "@/services/profile";
import { fetchProfileDetails } from "@/store/profileReducer";
import { toast } from "sonner";

export function EditProfileDialog({ open, onOpenChange, trigger }) {
  const id = useId();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.auth.userData);
  const profileDetails = useSelector((state) => state.profile.profileDetails);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form field states
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [university, setUniversity] = useState("");
  const [college, setCollege] = useState("");

  const [avatarUploadedFile, setAvatarUploadedFile] = useState(null);

  const maxLength = 180;
  const {
    value: bioValue,
    characterCount,
    handleChange: handleBioChange,
    maxLength: limit,
  } = useCharacterLimit({
    maxLength,
    initialValue: "Passionate learner & collaborator on LearnLink.",
  });

  useEffect(() => {
    const name = currentUser?.fullName || profileDetails?.user_details?.fullName || "";
    setFullName(name);
    setPhone(profileDetails?.contactInfo?.phone || "");
    setLocation(profileDetails?.contactInfo?.location || "");
    setUniversity(profileDetails?.contactInfo?.university || "");
    setCollege(profileDetails?.contactInfo?.college || "");
  }, [currentUser, profileDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const payload = {
        phone,
        location,
        university,
        college,
      };

      if (avatarUploadedFile) {
        payload.profilePicture = avatarUploadedFile;
        payload.newProfilePicture = avatarUploadedFile;
      }

      if (!profileDetails) {
        await profileService.completeProfile(payload);
        toast.success("Profile created successfully!");
      } else {
        await profileService.updateProfile(payload);
        toast.success("Profile updated successfully!");
      }

      dispatch(fetchProfileDetails());
      if (onOpenChange) onOpenChange(false);
    } catch (err) {
      console.error(err);
      toast.error(err.message || "Failed to update profile");
    } finally {
      setIsSubmitting(false);
    }
  };

  const defaultAvatar =
    profileDetails?.profilePicture?.url ||
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop";
  const defaultBg =
    "https://images.unsplash.com/photo-1707343843437-caacff5cfa74?q=80&w=1200&auto=format&fit=crop";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5 bg-white rounded-2xl shadow-2xl border border-slate-200">
        <DialogHeader className="contents space-y-0 text-left">
          <DialogTitle className="border-b border-slate-200 px-6 py-4 text-base font-bold text-ink-900">
            Edit profile
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="sr-only">
          Make changes to your profile here. You can change your photo, contact info, and bio.
        </DialogDescription>
        <div className="overflow-y-auto max-h-[75vh]">
          <ProfileBg defaultImage={defaultBg} />
          <Avatar
            defaultImage={defaultAvatar}
            onFileSelect={(file) => setAvatarUploadedFile(file)}
          />
          <div className="px-6 pb-6 pt-4">
            <form id="edit-profile-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor={`${id}-full-name`} className="text-xs font-semibold text-ink-700">
                  Full name
                </Label>
                <Input
                  id={`${id}-full-name`}
                  placeholder="Your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  required
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-phone`} className="text-xs font-semibold text-ink-700">
                    Phone Number
                  </Label>
                  <Input
                    id={`${id}-phone`}
                    placeholder="+977 9800000000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="tel"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-location`} className="text-xs font-semibold text-ink-700">
                    Location / City
                  </Label>
                  <Input
                    id={`${id}-location`}
                    placeholder="Kathmandu, Nepal"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    type="text"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-university`} className="text-xs font-semibold text-ink-700">
                    University
                  </Label>
                  <Input
                    id={`${id}-university`}
                    placeholder="Tribhuvan University"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    type="text"
                  />
                </div>
                <div className="flex-1 space-y-2">
                  <Label htmlFor={`${id}-college`} className="text-xs font-semibold text-ink-700">
                    College / Campus
                  </Label>
                  <Input
                    id={`${id}-college`}
                    placeholder="Pulchowk / St. Xavier's"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    type="text"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${id}-email`} className="text-xs font-semibold text-ink-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id={`${id}-email`}
                    className="peer pe-9 bg-slate-50 text-ink-600 font-mono text-xs"
                    defaultValue={currentUser?.email || profileDetails?.user_details?.email || ""}
                    readOnly
                    type="email"
                  />
                  <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-emerald-600">
                    <Check size={16} strokeWidth={2} aria-hidden="true" />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`${id}-bio`} className="text-xs font-semibold text-ink-700">
                  Biography
                </Label>
                <Textarea
                  id={`${id}-bio`}
                  placeholder="Write a few sentences about yourself and what you're learning"
                  value={bioValue}
                  maxLength={maxLength}
                  onChange={handleBioChange}
                  aria-describedby={`${id}-description`}
                />
                <p
                  id={`${id}-description`}
                  className="mt-1 text-right text-xs text-ink-400"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums font-semibold">{limit - characterCount}</span> characters left
                </p>
              </div>
            </form>
          </div>
        </div>
        <DialogFooter className="border-t border-slate-200 px-6 py-4 flex flex-row justify-end gap-2 bg-slate-50 rounded-b-2xl">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isSubmitting} className="rounded-xl">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            form="edit-profile-form"
            disabled={isSubmitting}
            className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl font-semibold"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> Saving...
              </>
            ) : (
              "Save changes"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ProfileBg({ defaultImage }) {
  const [hideDefault, setHideDefault] = useState(false);
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange, handleRemove } =
    useImageUpload();

  const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

  const handleImageRemove = () => {
    handleRemove();
    setHideDefault(true);
  };

  return (
    <div className="h-32">
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-slate-100">
        {currentImage && (
          <img
            className="h-full w-full object-cover"
            src={currentImage}
            alt={previewUrl ? "Preview of uploaded image" : "Profile background"}
            width={512}
            height={96}
          />
        )}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/20 backdrop-blur-[2px]">
          <button
            type="button"
            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
            onClick={handleThumbnailClick}
            aria-label={currentImage ? "Change banner image" : "Upload banner image"}
          >
            <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
          </button>
          {currentImage && (
            <button
              type="button"
              className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
              onClick={handleImageRemove}
              aria-label="Remove banner image"
            >
              <X size={16} strokeWidth={2} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
        aria-label="Upload banner image file"
      />
    </div>
  );
}

function Avatar({ defaultImage, onFileSelect }) {
  const { previewUrl, fileInputRef, handleThumbnailClick, handleFileChange } = useImageUpload({
    onUpload: (_url, file) => {
      if (onFileSelect) onFileSelect(file);
    },
  });

  const currentImage = previewUrl || defaultImage;

  return (
    <div className="-mt-10 px-6">
      <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
        {currentImage && (
          <img
            src={currentImage}
            className="h-full w-full object-cover"
            width={80}
            height={80}
            alt="Profile avatar"
          />
        )}
        <button
          type="button"
          className="absolute flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white outline-offset-2 transition-colors hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-brand-500"
          onClick={handleThumbnailClick}
          aria-label="Change profile picture"
        >
          <ImagePlus size={16} strokeWidth={2} aria-hidden="true" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/*"
          aria-label="Upload profile picture"
        />
      </div>
    </div>
  );
}

export { EditProfileDialog as Component };
export default EditProfileDialog;
