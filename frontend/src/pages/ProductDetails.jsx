import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext.jsx";

function ProductDetails() {
    const { id } = useParams();
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const { addToCart } = useCart();

    useEffect(() => {
        fetch(`${BASEURL}/api/products/${id}/`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch product details");
                }

                return response.json();
            })
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }, [id, BASEURL]);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#C0E9ED] flex items-center justify-center">
                <p className="text-slate-600 text-lg font-medium">
                    Loading product...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-[#C0E9ED] flex items-center justify-center">
                <p className="text-[#C45B75] font-medium">
                    Error: {error}
                </p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-[#C0E9ED] flex items-center justify-center">
                <p className="text-slate-600">
                    No product found.
                </p>
            </div>
        );
    }

    const imageUrl = product.image?.startsWith("http")
        ? product.image
        : `${BASEURL}${product.image}`;

    const handleAddToCart = () => {
        if (!localStorage.getItem("access_token")) {
            window.location.href = "/login";
            return;
        }

        addToCart(product.id);
    };

    return (
        <div className="min-h-screen bg-[#C0E9ED] px-4 py-28">

            <div className="max-w-6xl mx-auto">

                {/* Product Card */}
                <div className="bg-[#FFFDF8] rounded-3xl shadow-xl overflow-hidden">

                    <div className="grid grid-cols-1 md:grid-cols-2">

                        {/* Product Image */}
                        <div className="bg-[#FCE6D3] p-6 md:p-10 flex items-center justify-center">

                            <div className="w-full overflow-hidden rounded-2xl shadow-md bg-white">

                                <img
                                    src={imageUrl}
                                    alt={product.name}
                                    className="w-full h-96 object-cover hover:scale-105 transition-transform duration-500"
                                />

                            </div>

                        </div>

                        {/* Product Information */}
                        <div className="flex flex-col justify-center p-8 md:p-12">

                            {/* Small Label */}
                            <p className="text-sm font-semibold tracking-[0.25em] uppercase text-[#C45B75] mb-4">
                                Featured Product
                            </p>

                            {/* Product Name */}
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                                {product.name}
                            </h1>

                            {/* Description */}
                            <p className="text-slate-600 leading-relaxed mb-6">
                                {product.description}
                            </p>

                            {/* Price */}
                            <p className="text-3xl font-bold text-[#C45B75] mb-8">
                                ₹{product.price}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-wrap gap-3">

                                <button
                                    onClick={handleAddToCart}
                                    className="bg-[#FB87C7] text-white px-7 py-3 rounded-xl font-semibold shadow-md hover:bg-[#C45B75] hover:shadow-lg transition-all duration-300"
                                >
                                    🛒 Add to Cart
                                </button>

                                <Link
                                    to="/"
                                    className="border border-[#C45B75] text-[#C45B75] px-7 py-3 rounded-xl font-semibold hover:bg-[#FAD9D5] transition-all duration-300"
                                >
                                    ← Back to Home
                                </Link>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default ProductDetails;