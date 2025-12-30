"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
    {
        question: "Layanan pengembangan apa saja yang Anda tawarkan?",
        answer:
            "Saya spesialis dalam pengembangan Website dan Mobile App. Mulai dari landing page perusahaan, toko online (e-commerce), sistem informasi berbasis web, hingga aplikasi mobile untuk Android dan iOS menggunakan teknologi terbaru.",
    },
    {
        question: "Teknologi apa yang Anda gunakan?",
        answer:
            "Untuk frontend, saya menggunakan Next.js, React, dan Tailwind CSS. Untuk backend dan CMS, saya menggunakan Laravel dan WordPress yang fleksibel. Sedangkan untuk aplikasi mobile, saya menggunakan React Native atau Flutter untuk efisiensi tinggi.",
    },
    {
        question: "Berapa lama waktu yang dibutuhkan untuk membuat website atau aplikasi?",
        answer:
            "Durasi proyek sangat bergantung pada kompleksitas fitur. Website landing page biasanya memakan waktu 1-2 minggu. Aplikasi web atau mobile yang kompleks bisa memakan waktu 1-3 bulan. Saya akan memberikan estimasi waktu yang lebih akurat setelah diskusi detail kebutuhan Anda.",
    },
    {
        question: "Apakah aplikasi yang dibuat sudah termasuk maintenance?",
        answer:
            "Ya, setiap proyek pengembangan sudah termasuk garansi perbaikan bug (maintenance) gratis selama 1-3 bulan setelah peluncuran. Saya juga menawarkan paket maintenance jangka panjang jika Anda membutuhkan update fitur atau pemeliharaan server rutin.",
    },
    {
        question: "Apakah website/aplikasi saya akan SEO friendly dan responsif?",
        answer:
            "Tentu saja. Semua website yang saya bangun dioptimalkan untuk SEO (Search Engine Optimization) agar mudah ditemukan di Google. Selain itu, tampilan responsif (mobile-friendly) adalah standar wajib dalam setiap proyek saya untuk memastikan pengalaman pengguna yang baik di semua perangkat.",
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
                        "rounded-2xl p-6 border transition-all duration-300 group",
                        openIndex === index
                            ? "bg-surface-light dark:bg-surface-dark border-gray-100 dark:border-white/5 shadow-sm"
                            : "bg-transparent border-transparent hover:bg-surface-light dark:hover:bg-surface-dark hover:border-gray-100 dark:hover:border-white/5"
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
                                    : "text-text-muted-light dark:text-text-muted-dark group-hover:text-white"
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
