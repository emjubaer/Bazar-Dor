
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ICategory } from '../types/categoryTypes';

const NavLinks = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await fetch(
                    'https://openapi.programming-hero.com/api/bazardor/categories'
                );

                if (!res.ok) {
                    throw new Error('Failed to fetch categories');
                }

                const data = await res.json();
                setCategories(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    if (loading) {
        return (
            <div className="border-t px-4 py-3 text-sm text-gray-400">
                ক্যাটাগরি লোড হচ্ছে...
            </div>
        );
    }

    return (
        <nav className="border-t border-gray-100">
            <ul className="flex items-center gap-2 overflow-x-auto px-4 py-3 scrollbar-hide">

                {categories.map((category) => (
                    <li key={category.id} className="shrink-0">
                        <Link
                            href={`/category/${category.id}`}
                            className="flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-green-50 hover:text-green-700"
                        >
                            <span className="text-lg">
                                {category.icon}
                            </span>

                            <span>{category.nameBn}</span>
                        </Link>
                    </li>
                ))}

            </ul>
        </nav>
    );
};

export default NavLinks;
