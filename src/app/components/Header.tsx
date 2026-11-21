
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import NavLinks from './NavLink';
import UserInfo from './UserInfo';


interface User {
    name: string;
    email: string;
    image?: string | null;
}

interface HeaderProps {
    user: User | null;
    // onSignOut?: () => void;
}

const Header = () => {
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

                <UserInfo/>
                
            </div>

            {/* Category Navigation */}
            <div className="mx-auto max-w-7xl">
                <NavLinks />
            </div>

        </header>
    );
};

export default Header;
