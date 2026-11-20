
"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "../lib/auth-client";
import { toast } from "react-hot-toast";

const UserInfo = () => {
    const router = useRouter();
    const menuRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const { data: session, isPending } = authClient.useSession();

    const user = session?.user ?? null;

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Sign Out
    const handleSignOut = async () => {
        try {
            const { error } = await authClient.signOut();

            if (error) {
                toast.error(error.message || "সাইন আউট করা যায়নি");
                return;
            }

            setIsOpen(false);
            toast.success("সফলভাবে সাইন আউট হয়েছে");

            router.push("/");
            router.refresh();

        } catch {
            toast.error("সাইন আউট করতে সমস্যা হয়েছে");
        }
    };

    if (isPending) {
        return <div className="h-10 w-24 animate-pulse rounded-lg bg-gray-100" />;
    }

    return (
        <div>
            {!user ? (
                <div className="flex items-center gap-2">
                    <Link
                        href="/sign-in"
                        className="rounded-lg px-3 py-2 text-sm font-semibold text-gray-700 transition hover:bg-green-50 hover:text-green-700 sm:px-4"
                    >
                        সাইন ইন
                    </Link>

                    <Link
                        href="/sign-up"
                        className="rounded-lg bg-green-700 px-3 py-2 text-sm font-semibold text-white transition hover:bg-green-800 sm:px-5"
                    >
                        সাইন আপ
                    </Link>
                </div>
            ) : (
                <div className="relative" ref={menuRef}>
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="flex items-center gap-2 rounded-full p-1.5 transition hover:bg-green-50 sm:gap-3 sm:pr-3"
                        aria-expanded={isOpen}
                        aria-label="User profile"
                    >
                        {user.image ? (
                            <Image
                                src={user.image}
                                alt={user.name}
                                width={40}
                                height={40}
                                unoptimized
                                className="h-9 w-9 rounded-full border object-cover sm:h-10 sm:w-10"
                            />
                        ) : (
                            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                                {user.name?.charAt(0).toUpperCase() || "U"}
                            </div>
                        )}

                        <span className="hidden text-sm font-semibold text-gray-800 sm:block">
                            {user.name}
                        </span>

                        <svg
                            className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? "rotate-180" : ""
                                }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="m19 9-7 7-7-7"
                            />
                        </svg>
                    </button>

                    {isOpen && (
                        <div className="absolute right-0 top-full z-50 mt-3 w-64 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-xl">
                            <div className="border-b border-gray-100 bg-green-50 p-4">
                                <div className="flex items-center gap-3">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name}
                                            width={44}
                                            height={44}
                                            unoptimized
                                            className="h-11 w-11 rounded-full object-cover"
                                        />
                                    ) : (
                                        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-100 font-bold text-green-700">
                                            {user.name?.charAt(0).toUpperCase() || "U"}
                                        </div>
                                    )}

                                    <div className="min-w-0">
                                        <p className="truncate text-sm font-bold text-gray-900">
                                            {user.name}
                                        </p>

                                        <p className="truncate text-xs text-gray-500">
                                            {user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="p-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setIsOpen(false)}
                                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
                                >
                                    <span>👤</span>
                                    আমার প্রোফাইল
                                </Link>

                                <button
                                    onClick={handleSignOut}
                                    className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                                >
                                    <span>↪</span>
                                    সাইন আউট
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserInfo;
