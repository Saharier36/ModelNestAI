"use client";

import { useRef, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient, useSession } from "@/lib/auth-client";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiArrowLeft,
  FiCamera,
  FiEdit2,
  FiMail,
  FiUser,
  FiX,
} from "react-icons/fi";
import { toast } from "sonner";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending, refetch } = useSession();
  const user = session?.user;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name ?? "");
  const [imagePreview, setImagePreview] = useState<string | null>(
    user?.image ?? null,
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [saving, setSaving] = useState(false);

  const displayName = user?.name || user?.email || "Account";
  const initials = (displayName || "A")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  const startEditing = () => {
    setName(user?.name ?? "");
    setImagePreview(user?.image ?? null);
    setImageFile(null);
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setImageFile(null);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image must be smaller than 5MB.");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    if (!IMGBB_API_KEY) {
      toast.error("Image upload is not configured.");
      return null;
    }
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        { method: "POST", body: formData },
      );
      const data = await res.json();
      if (!data.success) throw new Error("Upload failed");
      return data.data.url as string;
    } catch {
      toast.error("Profile picture upload failed.");
      return null;
    }
  };

  const handleSave = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty.");
      return;
    }

    setSaving(true);
    try {
      let imageUrl = user?.image ?? undefined;

      if (imageFile) {
        const uploadedUrl = await uploadImage(imageFile);
        if (uploadedUrl) imageUrl = uploadedUrl;
      }

      await authClient.updateUser({
        name: name.trim(),
        image: imageUrl,
      });

      await refetch?.();
      toast.success("Profile updated successfully");
      setIsEditing(false);
      setImageFile(null);
    } catch (error) {
      console.error("Failed to update profile:", error);
      toast.error("Could not update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <Loader2 className="h-5 w-5 animate-spin text-orange-500" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 text-center shadow-sm">
          <h1 className="font-heading text-2xl font-semibold">
            You are not signed in
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Please log in to view your profile details.
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <Button onClick={() => router.push("/login")}>Login</Button>
            <Button variant="outline" onClick={() => router.push("/register")}>
              Register
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="w-fit rounded-full"
        >
          <FiArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="overflow-hidden rounded-[2rem] border border-border bg-card shadow-sm">
          <div className="border-b border-border bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-background p-8 sm:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Avatar className="h-20 w-20 rounded-full border-4 border-background">
                    <AvatarImage
                      src={
                        isEditing
                          ? (imagePreview ?? undefined)
                          : (user.image ?? undefined)
                      }
                      alt={displayName}
                    />
                    <AvatarFallback className="bg-linear-to-br from-orange-500 to-amber-500 text-xl font-semibold text-white">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full bg-orange-500 text-white shadow-sm transition-colors hover:bg-orange-600"
                      aria-label="Change profile picture"
                    >
                      <FiCamera className="h-3.5 w-3.5" />
                    </button>
                  ) : null}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.24em] text-orange-500">
                    Profile
                  </p>
                  {isEditing ? (
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="mt-1 h-9 max-w-xs font-heading text-lg font-semibold focus-visible:border-orange-500 focus-visible:ring-orange-500/30"
                    />
                  ) : (
                    <h1 className="font-heading text-3xl font-semibold text-foreground">
                      {displayName}
                    </h1>
                  )}
                  <p className="mt-1 text-sm text-muted-foreground">
                    Personal account details and preferences
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {isEditing ? (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={cancelEditing}
                      disabled={saving}
                    >
                      <FiX className="mr-1.5 h-4 w-4" />
                      Cancel
                    </Button>
                    <Button
                      onClick={handleSave}
                      disabled={saving}
                      className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600"
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-1.5 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={startEditing}
                    >
                      <FiEdit2 className="mr-1.5 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Link href="/manage">
                      <Button className="rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-white">
                        Manage Models
                      </Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="grid gap-6 p-8 sm:p-10 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="space-y-4 rounded-2xl border border-border bg-muted/30 p-6">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-500/10 p-2 text-orange-500">
                  <FiUser className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full name</p>
                  <p className="font-medium text-foreground">{displayName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="rounded-full bg-orange-500/10 p-2 text-orange-500">
                  <FiMail className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email address</p>
                  <p className="font-medium text-foreground">{user.email}</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-background p-6">
              <h2 className="font-heading text-xl font-semibold">
                Account status
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Your account is active and ready to use.
              </p>
              <div className="mt-5 rounded-2xl bg-orange-500/10 p-4 text-sm text-orange-700 dark:text-orange-300">
                Keep your profile updated to make models and conversations
                smoother.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
