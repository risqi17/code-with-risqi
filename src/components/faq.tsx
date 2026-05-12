"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "Bisa bantu dari tahap ide, atau harus sudah ada brief lengkap?",
        answer:
            "Bisa mulai dari dua-duanya. Kalau brief belum lengkap, saya bantu rapikan kebutuhan, prioritas fitur, dan alur pengguna dulu sebelum masuk ke desain atau pengembangan.",
    },
    {
        question: "Jenis proyek apa yang paling cocok dikerjakan?",
        answer:
            "Paling cocok untuk landing page bisnis, website company profile, toko online, dashboard, sistem internal, dan aplikasi mobile yang butuh tampilan rapi sekaligus struktur teknis yang siap dikembangkan.",
    },
    {
        question: "Berapa lama proses pengerjaannya?",
        answer:
            "Landing page biasanya 1-2 minggu. Website bisnis atau toko online bisa 2-6 minggu. Sistem yang lebih kompleks akan dibuat bertahap agar progresnya tetap terlihat dan mudah dievaluasi.",
    },
    {
        question: "Apakah setelah rilis masih dibantu?",
        answer:
            "Ya. Setiap proyek mendapat masa support untuk perbaikan bug setelah rilis. Untuk kebutuhan jangka panjang, bisa dilanjutkan dengan maintenance, pengembangan fitur, atau optimasi performa.",
    },
    {
        question: "Apakah website akan cepat, responsif, dan ramah SEO?",
        answer:
            "Ya. Struktur halaman, performa, tampilan mobile, metadata dasar, dan aksesibilitas menjadi bagian dari pekerjaan sejak awal, bukan tambahan di akhir proyek.",
    },
];

export function Faq() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div
                    key={index}
                    className={cn(
                        "rounded-xl p-4 border transition-colors duration-300 group",
                        openIndex === index
                            ? "bg-surface-light dark:bg-surface-dark border-gray-200 dark:border-gray-800"
                            : "bg-transparent border-gray-200 dark:border-gray-800 hover:bg-surface-light dark:hover:bg-surface-dark hover:border-accent"
                    )}
                >
                    <button
                        onClick={() => setOpenIndex(openIndex === index ? null : index)}
                        className="flex justify-between items-center w-full text-left"
                    >
                        <span
                            className={cn(
                                "font-bold transition-colors",
                                openIndex === index
                                    ? "text-text-light dark:text-white"
                                    : "text-text-light dark:text-white group-hover:text-accent"
                            )}
                        >
                            {faq.question}
                        </span>
                        <span
                            className={cn(
                                "material-symbols-outlined transition-colors",
                                openIndex === index
                                    ? "text-text-muted-light dark:text-text-muted-dark"
                                    : "text-text-muted-light dark:text-text-muted-dark group-hover:text-accent"
                            )}
                        >
                            {openIndex === index ? "remove" : "add"}
                        </span>
                    </button>
                    <div
                        className={cn(
                            "grid transition-all duration-300 ease-in-out",
                            openIndex === index ? "grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-gray-100 dark:border-white/5" : "grid-rows-[0fr] opacity-0"
                        )}
                    >
                        <div className="overflow-hidden">
                            <p className="text-text-muted-light dark:text-text-muted-dark text-sm leading-relaxed">
                                {faq.answer}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
