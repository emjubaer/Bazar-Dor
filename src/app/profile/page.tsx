
"use client";

import React, { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

const Profile = () => {
    const router = useRouter();

    const { data: session, isPending } = authClient.useSession();
    const user = session?.user ?? null;

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    // Set current user information
    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setImage(user.image || "");
        }
    }, [user]);

    // Sign Out
    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি");
                return;
            }

            toast.success("সফলভাবে সাইন আউট হয়েছে!");

            router.push("/sign-in");
            router.refresh();

        } catch {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        }
    };

    // Update Profile
    const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!name.trim()) {
            toast.error("নাম লিখুন");
            return;
        }

        // Validate image URL
        if (image.trim()) {
            try {
                const url = new URL(image);

                if (!["http:", "https:"].includes(url.protocol)) {
                    toast.error("সঠিক Image URL দিন");
                    return;
                }
            } catch {
                toast.error("সঠিক Image URL দিন");
                return;
            }
        }

        try {
            setIsUpdating(true);

            const { error } = await authClient.updateUser({
                name: name.trim(),
                image: image.trim() || null,
            });

            if (error) {
                toast.error(error.message || "Profile update করা যায়নি");
                return;
            }

            toast.success("Profile সফলভাবে আপডেট হয়েছে!");

        } catch {
            toast.error("Profile update করতে সমস্যা হয়েছে");
        } finally {
            setIsUpdating(false);
        }
    };

    if (isPending) {
        return (
            <div className="min-h-screen flex items-center justify-center ">
                <p className="text-gray-500">Loading profile...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-gray-700 mb-4">
                        Profile দেখতে Sign In করুন।
                    </p>

                    <button
                        onClick={() => router.push("/sign-in")}
                        className="bg-emerald-600 text-white px-5 py-2 rounded-lg"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#f3f6f3] p-4 md:p-8 flex flex-col items-center">
            <div className="w-full max-w-2xl space-y-6">

                {/* Header */}
                <div className="text-left">
                    <h1 className="text-3xl font-bold text-gray-800">
                        আমার প্রোফাইল
                    </h1>

                    <p className="text-gray-500 text-sm mt-1">
                        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
                    </p>
                </div>

                {/* Profile Card */}
                <div className="card bg-white shadow-sm border border-gray-100 rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">

                    <div className="flex items-center gap-4">

                        {/* Avatar */}
                        <div className="avatar">
                            <div className="w-16 h-16 rounded-2xl overflow-hidden bg-gray-200">
                                <img
                                    src={
                                        image ||
                                        "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                    }
                                    alt="Profile picture"
                                    className="object-cover w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Name & Email */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">
                                {user.name}
                            </h2>

                            <p className="text-gray-500 text-sm">
                                {user.email}
                            </p>
                        </div>
                    </div>

                    {/* Sign Out */}
                    <button
                        type="button"
                        onClick={handleSignOut}
                        className="btn btn-outline border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 normal-case rounded-xl self-start sm:self-center"
                    >
                        সাইন আউট
                    </button>
                </div>

                {/* Edit Form */}
                <div className="card bg-white shadow-sm border border-gray-100 rounded-2xl p-6 sm:p-8">

                    <h3 className="text-lg font-bold text-gray-800 mb-4">
                        তথ্য পরিবর্তন করুন
                    </h3>

                    <form onSubmit={handleUpdate} className="space-y-6">

                        {/* Name */}
                        <div className="form-control w-full">

                            <label className="label pt-0">
                                <span className="label-text text-xs text-gray-500">
                                    নাম
                                </span>
                            </label>

                            <input
                                type="text"
                                name="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="আপনার নাম লিখুন"
                                required
                                className="input input-bordered w-full bg-white focus:outline-none focus:border-emerald-600 rounded-lg text-gray-800"
                            />
                        </div>

                        {/* Image URL */}
                        <div className="form-control w-full">

                            <label className="label pt-0">
                                <span className="label-text text-xs text-gray-500">
                                    Profile Image URL
                                </span>
                            </label>

                            <input
                                type="url"
                                name="image"
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                                placeholder="https://example.com/image.jpg"
                                className="input input-bordered w-full bg-white focus:outline-none focus:border-emerald-600 rounded-lg text-gray-800"
                            />

                            <p className="text-xs text-gray-400 mt-2">
                                আপনার ছবির সরাসরি URL এখানে দিন।
                            </p>
                        </div>

                        {/* Image Preview */}
                        {image.trim() && (
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-600">
                                    Image Preview
                                </p>

                                <img
                                    src={image}
                                    alt="Preview"
                                    className="w-24 h-24 rounded-xl object-cover border border-gray-200"
                                />
                            </div>
                        )}

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={isUpdating}
                            className="btn bg-emerald-600 hover:bg-emerald-700 text-white w-full border-none normal-case text-base rounded-xl disabled:opacity-60"
                        >
                            {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট করুন"}
                        </button>

                    </form>
                </div>

            </div>
        </div>
    );
};

export default Profile;
