import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";

import ProductCard from "../components/ProductCard";
import ShoppingHero3D from "../components/ShoppingHero3D";

function ProductList() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    useEffect(() => {
        fetch(`${BASEURL}/api/products/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }

                return response.json();
            })
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [BASEURL]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#C0E9ED]">
                <p className="text-slate-700 text-lg font-medium">
                    Loading products...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#C0E9ED]">
                <p className="text-red-600 font-medium">
                    Error: {error}
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#C0E9ED] pt-24 pb-12">

            {/* =================================================
                HERO / 3D SECTION
            ================================================= */}

            <div className="max-w-7xl mx-auto px-6 mb-12">

                <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center gap-8 bg-[#2A1B3D] rounded-3xl overflow-hidden shadow-2xl min-h-[520px]">

                    {/* =================================================
                        FULL HERO THREE.JS UNIVERSE BACKGROUND
                    ================================================= */}

                    <div className="absolute inset-0 z-0 pointer-events-none">

                        <Canvas
                            camera={{
                                position: [0, 0, 5],
                                fov: 50,
                            }}
                            dpr={[1, 1.5]}
                            gl={{
                                alpha: true,
                                antialias: true,
                                powerPreference: "high-performance",
                            }}
                        >

                            {/* Soft purple glow */}
                            <pointLight
                                position={[-4, 2, 2]}
                                intensity={1.5}
                                color="#44318D"
                            />

                            {/* Pink glow */}
                            <pointLight
                                position={[4, -1, 2]}
                                intensity={1.2}
                                color="#D83F87"
                            />

                            {/* Main universe */}
                            <Sparkles
                                count={320}
                                scale={[14, 7, 4]}
                                size={2}
                                speed={0.18}
                                opacity={0.75}
                                color="#FAD9D5"
                            />

                            {/* Pink particles */}
                            <Sparkles
                                count={100}
                                scale={[14, 7, 4]}
                                size={2.5}
                                speed={0.3}
                                opacity={0.5}
                                color="#D83F87"
                            />

                            {/* Coral particles */}
                            <Sparkles
                                count={60}
                                scale={[14, 7, 4]}
                                size={2}
                                speed={0.4}
                                opacity={0.4}
                                color="#E98074"
                            />

                        </Canvas>

                    </div>


                    {/* =================================================
                        HERO TEXT
                    ================================================= */}

                    <div className="relative z-10 px-8 py-12 lg:px-12 text-center lg:text-left">

                        <p className="text-sm font-semibold tracking-[0.25em] text-[#E98074] uppercase">
                            AI-Powered Shopping
                        </p>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 leading-tight">
                            Shop smarter.
                            <br />
                            Discover better.
                        </h1>

                        <p className="text-[#A4B3B6] mt-5 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                            Discover products, get intelligent recommendations,
                            and shop with your personal AI assistant.
                        </p>

                        <div className="flex flex-wrap gap-4 mt-8 justify-center lg:justify-start">

                            <a
                                href="#products"
                                className="bg-[#D83F87] text-white px-7 py-3 rounded-xl font-semibold shadow-lg hover:bg-[#E98074] hover:scale-105 transition-all duration-300"
                            >
                                Explore Products →
                            </a>

                            <button
                                onClick={() =>
                                    window.dispatchEvent(
                                        new Event("open-ai-assistant")
                                    )
                                }
                                className="border border-[#44318D] text-white px-7 py-3 rounded-xl font-semibold hover:bg-[#44318D] hover:scale-105 transition-all duration-300"
                            >
                                Ask AI Assistant
                            </button>

                        </div>

                    </div>


                    {/* =================================================
                        3D VISUAL
                    ================================================= */}

                    <div className="relative z-10 flex items-center justify-center min-h-[460px] lg:min-h-[520px]">

                        <ShoppingHero3D />

                    </div>

                </div>
            </div>


            {/* =================================================
                PRODUCT GRID
            ================================================= */}

            <div
                id="products"
                className="max-w-7xl mx-auto px-6"
            >

                {products.length > 0 ? (

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                        {products.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))}

                    </div>

                ) : (

                    <div className="text-center">

                        <p className="text-slate-600">
                            No products available.
                        </p>

                    </div>

                )}

            </div>

        </div>
    );
}

export default ProductList;