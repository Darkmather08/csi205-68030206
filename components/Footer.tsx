'use client';
import Link from "next/link";
import { Facebook, Linkedin, Twitter } from "@tailgrids/icons";
import { Badge } from "./tailgrids/core/badge";
import "bootstrap-icons/font/bootstrap-icons.css";
export default function Footer() {
  return (
    // footer container
    <div className='text-center mt-4'>
      {/* student */}
      <div>
        <Badge className='text-xl text-black rounded-lg'>68030206 นาย ธนภูมิ พุฒทอง</Badge>
      </div>
      {/* contacts */}
      <div className='flex justify-center gap-4 mt-4'>
        <Link href='https://www.facebook.com'>
          <Facebook className='text-blue-500' />
        </Link>
        <div className='border-l-1'></div>
        <Link href='https://www.tiktok.com'>
          <i className="bi bi-tiktok text-black"></i>
        </Link>
        <div className='border-l-1'></div>
        <Link href='https://www.twitter.com'>
          <Twitter className='text-black' />
        </Link>
        <div className='border-l-1'></div>
        <Link href='https://www.youtube.com'>
          <i className="bi bi-youtube text-red-500 text-[1.2rem]"></i>
        </Link>
        <div className='border-l-1'></div>
        <Link href='https://www.linkedin.com'>
          <Linkedin className='text-blue-800' />
        </Link>
      </div>
    </div>
  );
}
