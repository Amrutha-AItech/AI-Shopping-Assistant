import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

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

            {/* Hero / Heading */}
            <div className="text-center px-4 mb-10">

                <p className="text-sm font-semibold tracking-[0.25em] text-[#C45B75] uppercase">
                    Discover something you love
                </p>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mt-3">
                    Our Products
                </h1>

                <p className="text-slate-600 mt-3 text-base md:text-lg">
                    Explore our collection of products
                </p>

            </div>

            {/* Product Grid */}
            <div className="max-w-7xl mx-auto px-6">

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