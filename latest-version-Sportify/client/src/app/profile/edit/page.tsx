"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Camera, Save, X } from "lucide-react";
import Image from "next/image";

export default function EditProfilePage() {
    const { user, updateProfile } = useAuth();
    const router = useRouter();
    const [name, setName] = useState(user?.name || "");
    const [email, setEmail] = useState(user?.email || "");
    const [profileImage, setProfileImage] = useState(user?.profileImage || "");
    const [imagePreview, setImagePreview] = useState(user?.profileImage || "");
    const [loading, setLoading] = useState(false);

    if (!user) {
        router.push("/login");
        return null;
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setImagePreview(base64String);
                setProfileImage(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Update profile in context
            updateProfile({
                name,
                email,
                profileImage
            });

            // Show success and redirect
            alert("Profile updated successfully!");
            router.push("/profile");
        } catch (error) {
            alert("Failed to update profile");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8">
                    <div className="flex items-center justify-between mb-8">
                        <h1 className="text-3xl font-bold">Edit Profile</h1>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => router.push("/profile")}
                        >
                            <X className="w-5 h-5" />
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Profile Picture */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="relative">
                                {imagePreview ? (
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary">
                                        <Image
                                            src={imagePreview}
                                            alt="Profile"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ) : (
                                    <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold">
                                        {name.charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <label
                                    htmlFor="profile-image"
                                    className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full cursor-pointer hover:bg-primary/90 transition-colors"
                                >
                                    <Camera className="w-5 h-5" />
                                </label>
                                <input
                                    id="profile-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="hidden"
                                />
                            </div>
                            <p className="text-sm text-gray-500">Click the camera icon to upload a photo</p>
                        </div>

                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                                required
                            />
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4 pt-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                isLoading={loading}
                            >
                                <Save className="w-5 h-5 mr-2" />
                                Save Changes
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.push("/profile")}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
