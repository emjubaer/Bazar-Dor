"use client";

import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from "react";
import { IProduct } from "@/app/types/ProductTypes";

interface IProductContext {
    products: IProduct[];
    loading: boolean;
    risingProducts: IProduct[];
    fallingProducts: IProduct[];
}

const ProductContext = createContext<IProductContext | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(
                    "https://openapi.programming-hero.com/api/bazardor/products"
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await response.json();
                const productList: IProduct[] = Array.isArray(data)
                    ? data
                    : data.products ?? data.data ?? [];

                setProducts(productList);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const risingProducts = useMemo(() => {
        return products
            .filter((product) => product.change?.dir === "up")
            .slice(0, 6);
    }, [products]);

    const fallingProducts = useMemo(() => {
        return products
            .filter((product) => product.change?.dir === "down")
            .slice(0, 6);
    }, [products]);

    return (
        <ProductContext.Provider
            value={{ products, loading, risingProducts, fallingProducts }}
        >
            {children}
        </ProductContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProducts must be used within a ProductProvider");
    }
    return context;
}