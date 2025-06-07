// ======================= How to Start Section (Landing Page) =======================

import React from "react";
import { motion } from "framer-motion";
import styles from "./LandingPage_HowToStart.module.css"; 

// ======================= Step data (icon + title + description) =======================
const steps = [
  {
    icon: "/icons/Step1.svg",
    title: "مرحله اول",
    description: "خیلی راحت حساب کاربری رو بساز.",
  },
  {
    icon: "/icons/Step2.svg",
    title: "مرحله دوم",
    description: "سایت، اپ یا بازیت رو به سایت ما اضافه کن.",
  },
  {
    icon: "/icons/Step3.svg",
    title: "مرحله سوم",
    description: "به سایت، اپ یا بازیت SDK رو اضافه کن.",
  },
  {
    icon: "/icons/Step4.svg",
    title: "مرحله چهارم",
    description: "همه چی آمادست!",
  },
];

// ======================= Component =======================
const LandingPage_HowToStart: React.FC = () => {
  return (
    <div className={styles.startContainer}>
      {/* Section Title */}
      <h2 className={styles.title}>چطور شروع کنم؟</h2>

      {/* Steps List */}
      <div className={styles.stepsWrapper}>
        {steps.map((step, index) => {
          // Alternate entry direction for animation
          const direction = index % 2 === 0 ? -60 : 60;

          return (
            <motion.div
              key={index}
              className={styles.stepItem}
              initial={{ opacity: 0, y: direction }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.25 }}
              viewport={{ once: true, amount: 0.3 }} // ✨ فقط یکبار اجرا شود
              >
              <img src={step.icon} alt={step.title} className={styles.icon} />
              <h3 className={styles.stepTitle}>{step.title}</h3>
              <p className={styles.stepDescription}>{step.description}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default LandingPage_HowToStart;
