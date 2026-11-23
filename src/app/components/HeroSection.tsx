"use client"
import { useEffect, useState } from 'react';

const HeroSection = () => {
    const [dateTime, setDateTime] = useState('');

    // Current date
    useEffect(() => {
        setDateTime(
            new Date().toLocaleDateString('bn-BD', {
                dateStyle: 'full',
            })
        );
    }, []);

    return (
        <div className="w-full max-w-7xl mx-auto px-4 py-6">
            <div className="bg-white/60 backdrop-blur-sm border border-emerald-100 
            rounded-3xl pl-6 flex flex-col-reverse md:flex-row items-center justify-between 
            gap-8 shadow-sm">
                <div className="flex-1 text-left space-y-4">
                    <span className="inline-block bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full">
                        {dateTime}
                    </span>
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
                        আজকের বাজারের দাম এক নজরে
                    </h1>
                    <p className="text-gray-600 text-sm md:text-md leading-relaxed max-w-xl">
                        চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
                    </p>
                    <div className="pt-2 pb-4">
                        <button className="btn bg-emerald-600 hover:bg-emerald-700 text-white border-none rounded-xl px-6 font-medium text-base shadow-sm">
                            সব পণ্য দেখুন
                        </button>
                    </div>
                </div>

                <div className="w-full md:w-80 lg:w-96 flex justify-center">
                    <img
                        src="/bazar-hero.png"
                        alt="Bazar Hero Illustration"
                        className="w-full max-w-xs md:max-w-full h-auto object-contain"
                    />
                </div>
            </div>
        </div>
    );
};

export default HeroSection;