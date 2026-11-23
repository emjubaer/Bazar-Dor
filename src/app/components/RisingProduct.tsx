"use client";

import React from "react";
import Link from "next/link";
import { useProducts } from "@/app/context/ProductContext";
import FallingProduct from "./FallingProduct";

const toBanglaNumber = (num:number) => {
    if (num === undefined || num === null || Number.isNaN(Number(num))) return "";
    return Number(num).toLocaleString("bn-BD");
};

const RisingProduct = () => {
    const { risingProducts, loading } = useProducts();

    if (loading) {
        return (
            <section className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-red-500 text-xs">▲</span>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        আজ দাম বেড়েছে
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className="h-32 bg-white rounded-2xl border border-gray-100 animate-pulse p-5"
                        />
                    ))}
                </div>
            </section>
        );
    }

    if (!risingProducts || risingProducts.length === 0) {
        return (
            <section className="w-full max-w-7xl mx-auto px-4 py-6">
                <div className="flex items-center gap-2 mb-4">
                    <span className="text-red-500 text-xs">▲</span>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                        আজ দাম বেড়েছে
                    </h2>
                </div>
                <p className="text-sm text-gray-500 bg-white rounded-2xl p-6 border border-gray-100">
                    আজ কোনো পণ্যের দাম বাড়েনি।
                </p>
            </section>
        );
    }

    return (
        <section className="w-full max-w-7xl mx-auto px-4 py-6">

            <div className="flex items-center gap-2 mb-4">
                <span className="text-red-500 text-xs">▲</span>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800">
                    আজ দাম বেড়েছে
                </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {risingProducts.map((product) => {
                    const pctValue = Math.abs(Number(product.change?.pct ?? 0));

                    return (
                        <Link
                            key={product.id}
                            href={`/products/${product.slug}`}
                            className="card bg-white rounded-2xl border border-gray-200/80 shadow-xs hover:shadow-md hover:border-emerald-200 transition-all p-4 sm:p-5 flex flex-col justify-between gap-4"
                        >  
                            <div className="flex items-center gap-3.5">
                                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0 overflow-hidden">
                                    <span className="text-4xl">
                                        {product.categoryIcon}
                                    </span>
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-gray-900 text-base truncate">
                                        {product.nameBn}
                                    </h3>
                                    <p className="text-xs text-gray-500 mt-0.5 truncate">
                                        {product.unit}
                                    </p>
                                </div>
                            </div>


                            <div className="flex items-end justify-between gap-2">
                                <div>
                                    <p className="text-[11px] text-gray-400 leading-tight">
                                        আজকের দাম
                                    </p>
                                    <p className="text-lg sm:text-xl font-bold text-gray-900 mt-0.5">
                                        {toBanglaNumber(product.today)}{" "}
                                        <span className="text-sm font-semibold text-gray-700">
                                            টাকা
                                        </span>
                                    </p>
                                </div>

                                <span className="badge bg-red-50 text-red-500 border-red-100 font-semibold text-xs px-2.5 py-3 rounded-full shrink-0">
                                    ▲ {toBanglaNumber(pctValue)}%
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
    
};

export default RisingProduct;