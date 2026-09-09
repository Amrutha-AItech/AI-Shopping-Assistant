import { Link } from "react-router-dom";

function ProductCard({ product }) {
    const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

    return (
        <Link to={`/product/${product.id}`} className="block">
            <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-4 cursor-pointer border border-white">

                {/* Product Image */}
                <div className="overflow-hidden rounded-xl bg-[#FCE6D3]">
                    <img
                        src={
                            product.image?.startsWith("http")
                                ? product.image
                                : `${BASEURL}${product.image}`
                        }
                        alt={product.name}
                        className="w-full h-56 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Product Information */}
                <div className="pt-4">

                    <h2 className="text-lg font-semibold text-slate-800 truncate">
                        {product.name}
                    </h2>

                    <div className="flex items-center justify-between mt-2">
                        <p className="text-lg font-bold text-[#C45B75]">
                            ₹{product.price}
                        </p>

                        <span className="text-sm text-slate-500">
                            View details →
                        </span>
                    </div>

                </div>
            </div>
        </Link>
    );
}

export default ProductCard;