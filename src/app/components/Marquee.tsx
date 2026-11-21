
"use client";

import { useEffect, useState } from "react";
import MarqueeText from "react-marquee-text";
import { IProduct } from "@/app/types/ProductTypes";

const Marquee = () => {
    const [marqueeData, setMarqueeData] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    const getBanglaUnit = (unit: string) => {
        const units: Record<string, string> = {
            kg: "কেজি",
            litre: "লিটার",
            dozen: "ডজন",
            piece: "পিস",
            gram: "গ্রাম",
            packet: "প্যাকেট",
            bottle: "বোতল",
            pound: "পাউন্ড",
        };

        return units[unit.toLowerCase()] || unit;
    };

    useEffect(() => {
        const fetchMarqueeData = async () => {
            try {
                const response = await fetch(
                    "https://openapi.programming-hero.com/api/bazardor/products"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch marquee data");
                }

                const data = await response.json();
                setMarqueeData(data);
            } catch (error) {
                console.error("Error fetching marquee data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchMarqueeData();
    }, []);

    if (loading) {
        return (
            <div className="border-b px-4 py-3 text-sm text-gray-400 flex mx-auto items-center justify-center">
                লোড হচ্ছে...
            </div>
        );
    }

    return (
        <div className="border-b border-gray-100 bg-white shadow-sm">
            <MarqueeText direction="right" duration="15">
                <div className="flex w-max items-center gap-8 px-4 py-2">
                    {marqueeData.map((item) => (
                        <div
                            key={item.id}
                            className="flex shrink-0 items-center gap-2"
                        >
                            <span className="text-lg">
                                {item.categoryIcon}
                            </span>

                            <span className="text-sm font-semibold text-gray-700">
                                {item.nameBn}
                            </span>

                            <span className="text-sm text-gray-900">
                                {item.today.toLocaleString('bn-BD')} টাকা/{getBanglaUnit(item.unit)}
                            </span>

                            <span className={`text-sm ${item.change.dir === "up" ? "text-green-600" : "text-red-600"}`}>
                                {item.change.dir === "up" ? "▲" : "▼"} {item.change.pct.toLocaleString('bn-BD')}%
                            </span>
                        </div>
                    ))}
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;
