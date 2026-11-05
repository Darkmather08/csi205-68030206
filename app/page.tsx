"use client";

import Image from "next/image";
import myPhoto from "./Myphoto.png";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { checkLogin } from "@/utils/login";

export default function Home() {
  const router = useRouter();
  useEffect(() => checkLogin(router, "/"), [router]);
  return (
    <section
      aria-labelledby="profile-name"
      className="grid gap-8 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 md:grid-cols-[minmax(200px,0.8fr)_1.7fr] md:items-start"
    >
      <div className="mx-auto w-full max-w-64 overflow-hidden rounded-2xl bg-slate-100 shadow-sm">
        <Image
          src={myPhoto}
          alt="รูปถ่ายของธนภูมิ พุฒทอง"
          priority
          className="h-auto w-full"
          sizes="(max-width: 767px) 256px, 280px"
        />
      </div>

      <div className="space-y-5">
        <header className="space-y-2 border-b border-slate-200 pb-5">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
            แนะนำตัว
          </p>
          <h1
            id="profile-name"
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl"
          >
            ธนภูมิ พุฒทอง
          </h1>
          <p className="text-base leading-7 text-slate-600">
            กำลังศึกษาชั้นปีที่ 2 สาขาวิทยาการคอมพิวเตอร์ (Full Stack
            Development) มหาวิทยาลัยศรีปทุม
          </p>
        </header>

        <div className="space-y-4 text-[0.95rem] leading-7 text-slate-700">
          <p>
            ความตั้งใจสูงสุดในสายอาชีพของผม คือการเติบโตไปเป็น{" "}
            <span className="font-semibold text-slate-900">
              IT Solutions Implementation Specialist
            </span>{" "}
            หรือผู้เชี่ยวชาญด้านการประยุกต์และติดตั้งระบบไอทีเพื่อแก้ปัญหาให้ธุรกิจ
            ผมเชื่อว่าการจะเป็นผู้เชี่ยวชาญระบบที่ดีได้นั้น
            ไม่ได้เริ่มจากการเขียนโค้ดในห้องเรียนเพียงอย่างเดียว
            แต่ต้องเริ่มจากการเข้าใจปัญหาจริงหน้างานและความต้องการของผู้ใช้งานจริง
          </p>
          <p>
            การสมัครงานตำแหน่ง IT Support Part-Time
            จึงเป็นก้าวสำคัญที่ผมตั้งใจนำความรู้พื้นฐานด้านการพัฒนาซอฟต์แวร์
            (HTML/CSS/JS, TSX), ประสบการณ์บริหารงานและทดสอบระบบ QA Tester 4
            โครงการ รวมถึงกระบวนการคิดแบบ Empathy Map และ Design Thinking
            มาใช้รับฟัง สรุปปัญหา และแก้ไขเหตุขัดข้องทางเทคนิคให้ผู้ใช้งานอย่างมีประสิทธิภาพ
          </p>
          <p>
            นอกจากนี้โดยส่วนตัวผมมีความชื่นชอบในเกมแนววางระบบและบริหารจัดการทรัพยากร
            (เช่น Factorio, Oxygen Not Included)
            ช่วยหล่อหลอมให้ผมมีทักษะการมองปัญหาเชิงระบบ (Systems Thinking)
            ค้นหาจุดคอขวด (Bottleneck Analysis)
            และแก้ปัญหาเฉพาะหน้าอย่างอดทน
            ผมพร้อมที่จะนำพลังงาน ความตั้งใจ และทักษะการเรียนรู้ไว
            มาช่วยแบ่งเบาภาระงานดูแลระบบไอทีในองค์กรอย่างเต็มที่ครับ
          </p>
        </div>
      </div>
    </section>
  );
}
