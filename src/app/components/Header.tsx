
'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import NavLinks from './NavLink';


interface User {
    name: string;
    email: string;
    image?: string | null;
}

interface HeaderProps {
    user: User | null;
    onSignOut?: () => void;
}

const Header = ({ user, onSignOut }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dateTime, setDateTime] = useState('');
    const menuRef = useRef<HTMLDivElement>(null);

    // Current date
    useEffect(() => {
        setDateTime(
            new Date().toLocaleDateString('bn-BD', {
                dateStyle: 'full',
            })
        );
    }, []);

    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                menuRef.current &&
                !menuRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-700 sm:h-12 sm:w-12">
                        <Image
                            src="/logo-icon.png"
                            alt="Bazar Dor Logo"
                            width={36}
                            height={36}
                            priority
                        />
                    </div>

                    <div>
                        <h1 className="text-lg font-bold text-gray-900 sm:text-xl">
                            বাজার দর
                        </h1>

                        <p className="text-[10px] text-gray-500 sm:text-xs">
                            {dateTime}
                        </p>
                    </div>
                </Link>

                {/* Authentication */}
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
                    /* User Profile */
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
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            )}

                            <span className="hidden text-sm font-semibold text-gray-800 sm:block">
                                {user.name}
                            </span>

                            <svg
                                className={`h-4 w-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''
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

                        {/* Dropdown */}
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
                                                {user.name.charAt(0).toUpperCase()}
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
                                        onClick={() => {
                                            setIsOpen(false);
                                            onSignOut?.();
                                        }}
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

            {/* Category Navigation */}
            <div className="mx-auto max-w-7xl">
                <NavLinks />
            </div>

        </header>
    );
};

export default Header;
