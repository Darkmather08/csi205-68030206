"use client"
import { useEffect } from "react";
import { checkLogin } from "@/utils/login";
import { useRouter } from "next/dist/client/components/navigation";

export default function NotFound() {
    const router = useRouter();
      useEffect(() => checkLogin(router, "/"), [router]);
}