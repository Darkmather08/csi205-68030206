"use client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/tailgrids/core/badge";
import "./globals.css";
import Link from "next/link";
import human from "Myphoto.png";
import { usePathname, useRouter } from "next/navigation";
import { Button, buttonStyles } from "@/components/tailgrids/core/button";
import { fetchProducts, Product } from "@/data/products";
import { createContext, useEffect, useState } from "react";
import { doLogout } from "@/utils/login";

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data as Product[]))
      .catch((error) => setProducts([] as Product[]));
  }, []);

  const handleLogout = () => {
    doLogout(router, '/login');
  };

  return (
    <globalDataContext.Provider
      value={{ products, setProducts, carts, setCarts }}
    >
      <html>
        <body>
          <Header />
          <nav className="flex justify-center gap-4 mt-8">
            <Link
              href={"/"}
              className={buttonStyles({
                className: "!no-underline !rounded-lg",
                appearance: pathname === "/" ? "fill" : "outline",
                variant: "primary",
              })}
            >
              Home
            </Link>
            <Link
              href={"/animation"}
              className={buttonStyles({
                className: "!no-underline !rounded-lg",
                appearance: pathname === "/animation" ? "fill" : "outline",
                variant: "primary",
              })}
            >
              Animation
            </Link>
            <Link
              href={"/calculator"}
              className={buttonStyles({
                className: "!no-underline !rounded-lg",
                appearance: pathname === "/calculator" ? "fill" : "outline",
                variant: "primary",
              })}
            >
              Calculator
            </Link>
            <Link
              href={"/todos"}
              className={buttonStyles({
                className: "!no-underline !rounded-lg",
                appearance: pathname === "/todos" ? "fill" : "outline",
                variant: "primary",
              })}
            >
              Todo
            </Link>
            <Link
              href={"/products"}
              className={buttonStyles({
                className: "!no-underline !rounded-lg",
                appearance: pathname === "/products" ? "fill" : "outline",
                variant: "primary",
              })}
            >
              Products ({products.length})
            </Link>
            <div className="relative">
              <Link
                href={"/carts"}
                className={buttonStyles({
                  className: "!no-underline !rounded-lg",
                  appearance: pathname === "/carts" ? "fill" : "outline",
                  variant: "primary",
                })}
              >
                Carts
              </Link>
              <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">
                {" "}
                {carts.length}{" "}
              </Badge>
            </div>
            <Button
              appearance="outline"
              variant="danger"
              size="sm"
              className="ml-1"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </nav>
          <main className="max-w-4xl mx-auto p-4">{children}</main>

          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>
  );
}
