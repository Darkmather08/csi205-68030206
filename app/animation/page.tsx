"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./animation.module.css";
import basketball from "./assets/bas.png";
import football from "./assets/foot.png";
import human from "./assets/Myphoto.png";
import volleyball from "./assets/vol.png";
import wood from "./assets/wood.png";
import { checkLogin } from "@/utils/login";
import { useRouter } from "next/dist/client/components/navigation";

type BallType = "basketball" | "football" | "volleyball" | "human" | "none";
type ActiveBallType = Exclude<BallType, "none">;

const ballImages: Record<ActiveBallType, typeof basketball> = {
  basketball,
  football,
  volleyball,
  human,
};

export default function Animation() {
  const router = useRouter();
    useEffect(() => checkLogin(router, "/animation"), [router]);
  const [running, setRunning] = useState(false);
  const [ballType, setBallType] = useState<BallType>("none");
  const fieldRef = useRef<HTMLDivElement>(null);
  const ballRef = useRef<HTMLDivElement>(null);
  const motionRef = useRef({
    x: 100,
    y: 100,
    velocityX: 190,
    velocityY: 145,
    rotation: 0,
    initialized: false,
  });

  useEffect(() => {
    const ballTypes: Record<string, BallType> = {
      "0": "none",
      "1": "basketball",
      "2": "football",
      "3": "volleyball",
      "4": "human",
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        if (
          event.repeat ||
          (event.target instanceof HTMLElement &&
            event.target.closest(
              "button, input, textarea, select, a, [contenteditable='true']",
            ))
        ) {
          return;
        }
        event.preventDefault();
        setRunning((isRunning) => !isRunning);
        return;
      }

      const selectedBall = ballTypes[event.key];
      if (selectedBall) setBallType(selectedBall);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const field = fieldRef.current;
    const ball = ballRef.current;
    if (!running || ballType === "none" || !field || !ball) return;

    let frameId = 0;
    let previousTime: number | undefined;
    const motion = motionRef.current;

    const animate = (time: number) => {
      const maxX = Math.max(0, field.clientWidth - ball.offsetWidth);
      const maxY = Math.max(0, field.clientHeight - ball.offsetHeight);

      if (!motion.initialized) {
        motion.x = Math.min(motion.x, maxX);
        motion.y = Math.min(motion.y, maxY);
        motion.initialized = true;
      }

      const elapsed = previousTime === undefined
        ? 0
        : Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      motion.x += motion.velocityX * elapsed;
      motion.y += motion.velocityY * elapsed;

      if (motion.x <= 0 || motion.x >= maxX) {
        motion.x = Math.min(Math.max(motion.x, 0), maxX);
        motion.velocityX *= -1;
      }
      if (motion.y <= 0 || motion.y >= maxY) {
        motion.y = Math.min(Math.max(motion.y, 0), maxY);
        motion.velocityY *= -1;
      }

      motion.rotation +=
        (Math.hypot(motion.velocityX, motion.velocityY) *
          elapsed *
          360) /
        (Math.PI * ball.offsetWidth);
      ball.style.left = `${motion.x}px`;
      ball.style.top = `${motion.y}px`;
      ball.style.transform = `rotate(${motion.rotation}deg)`;

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [ballType, running]);

  return (
    <section className={styles.animation}>
      <h1 className="text-center">68030206 นาย ธนภูมิ พุฒทอง</h1>
      <div className={styles.animationContainer}>
        <div
          className={styles.field}
          aria-label="สนามสำหรับแสดงภาพเคลื่อนไหว"
          ref={fieldRef}
        >
          <Image
            src={wood}
            alt=""
            fill
            sizes="(max-width: 540px) 100vw, 540px"
            className={styles.floorImage}
          />
          {ballType !== "none" && (
            <div
              className={styles.ball}
              aria-label={ballType}
              ref={ballRef}
            >
              <Image
                src={ballImages[ballType]}
                alt=""
                fill
                sizes="(max-width: 540px) 15vw, 80px"
                className={styles.ballImage}
              />
            </div>
          )}
        </div>

        <div className={styles.controls}>
          <button
            className={`${styles.button} ${running ? styles.runningButton : styles.playButton}`}
            onClick={() => setRunning((isRunning) => !isRunning)}
            aria-pressed={running}
          >
            <span aria-hidden="true">{running ? "Ⅱ" : "▶"}</span>
            {running ? "Pause" : "Play"}
          </button>
          <div className={styles.ballButtons}>
            <button
              className={`${styles.button} ${styles.secondaryButton}`}
              onClick={() => setBallType("none")}
            >
              None
            </button>
            <button
              className={`${styles.button} ${styles.choiceButton}`}
              onClick={() => setBallType("basketball")}
            >
              Basketball
            </button>
            <button
              className={`${styles.button} ${styles.choiceButton}`}
              onClick={() => setBallType("football")}
            >
              Football
            </button>
            <button
              className={`${styles.button} ${styles.choiceButton}`}
              onClick={() => setBallType("volleyball")}
            >
              Volleyball
            </button>
            <button
              className={`${styles.button} ${styles.choiceButton}`}
              onClick={() => setBallType("human")}
            >
              Human
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
