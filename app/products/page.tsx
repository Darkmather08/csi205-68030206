"use client";

import { useContext, useEffect } from "react";
import { globalDataContext } from "../layout";
import { Product } from "@/data/products";
import Image from "next/image";
import { checkLogin } from "@/utils/login";
import { useRouter } from "next/dist/client/components/navigation";

export default function Page() {
    const router = useRouter();
      useEffect(() => checkLogin(router, "/products"), [router]);
  const { products, setProducts, setCarts, carts } = useContext(globalDataContext);
  const addToCart = (product: Product) => {
    // remove product from produts
    setProducts(products.filter((p: Product) => p.id !== product.id));
    // append product to carts
    setCarts([...carts, product]);
  }
  return (
    <div className="mx-auto mt-4 h-[70vh] w-full max-w-5xl overflow-y-auto overflow-x-hidden rounded-lg border border-gray-400 bg-gray-300 p-2">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((product: Product) => (
          <div key={product.id} className="overflow-hidden rounded-lg border border-green-300 bg-green-50 shadow-sm">
            <div className="relative aspect-square w-full">
              <Image
                src={product.thumbnailUrl}
                alt={product.title}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
                className="object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 line-clamp-2 bg-black/65 px-1 py-1 text-[10px] leading-tight text-white">
                {product.title}
              </div>
              <div className="absolute right-1 top-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-bold text-white">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <button
              type="button"
              className="w-full bg-green-200 px-2 py-1.5 text-sm text-green-900 transition hover:bg-green-700 hover:text-green-100"
              onClick={() => addToCart(product)}
            >
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
