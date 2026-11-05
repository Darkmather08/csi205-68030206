"use client";

import Image from "next/image";
import { useContext, useEffect } from "react";
import { Product } from "@/data/products";
import { globalDataContext } from "../layout";
import { buttonStyles } from "@/components/tailgrids/core/button";
import { checkLogin } from "@/utils/login";
import { useRouter } from "next/dist/client/components/navigation";

export default function Page() {
    const router = useRouter();
      useEffect(() => checkLogin(router, "/carts"), [router]);
  const { carts, setCarts, products, setProducts } = useContext(globalDataContext);

  const removeFromCart = (product: Product) => {
    setCarts(carts.filter((item: Product) => item.id !== product.id));
    setProducts(
      [...products, product].sort((first: Product, second: Product) => first.id - second.id),
    );
  };

  return (
    <div className="mx-auto mt-4 h-[70vh] w-full max-w-5xl overflow-y-auto overflow-x-hidden rounded-lg border border-gray-400 bg-gray-300 p-2">
      {carts.length === 0 ? (
        <p className="py-10 text-center text-gray-700">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {carts.map((product: Product) => (
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
              <div
                
                className={buttonStyles({
                  variant: "danger",
                  size: "sm",
                  className: "w-full !bg-red-200 !text-red-900 hover:!bg-red-700 hover:!text-red-100",
                })}
                onClick={() => removeFromCart(product)}
              >
                Remove from cart
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
