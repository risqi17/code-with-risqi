"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        setMounted(true);
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        // Scrollspy logic with IntersectionObserver
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -60% 0px", // Trigger when section is near top
            threshold: 0,
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Sections to observe
        const sections = document.querySelectorAll("section[id], header[id]");
        sections.forEach((section) => observer.observe(section));

        return () => {
            window.removeEventListener("scroll", handleScroll);
            sections.forEach((section) => observer.unobserve(section));
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        if (window.location.pathname !== "/") {
            return;
        }

        e.preventDefault();

        if (id === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" });
            setActiveSection("home");
        } else {
            const element = document.getElementById(id);
            if (element) {
                const offset = 80; // Navbar height
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth",
                });
                setActiveSection(id);
            }
        }
        setIsOpen(false);
    };

    const navLinks = [
        { id: "home", label: "Home", href: "/" },
        { id: "works", label: "Projects", href: "/#works" },
        { id: "services", label: "Services", href: "/#services" },
        { id: "faqs", label: "FAQ", href: "/#faqs" },
        { id: "blogs", label: "Blogs", href: "/#blogs" },
    ];

    return (
        <header
            id="home"
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled && !isOpen
                ? "bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm"
                : "bg-transparent border-transparent"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="material-symbols-outlined text-3xl text-primary dark:text-white">
                            terminal
                        </span>
                        <span className="font-bold text-xl tracking-tight text-primary dark:text-white">Code with Risqi</span>
                    </Link>

                    <nav className="hidden md:flex space-x-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.id)}
                                className={`text-sm font-medium transition-colors ${activeSection === link.id
                                    ? "text-primary dark:text-accent font-bold"
                                    : "text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </nav>

                    <div className="flex items-center space-x-4">
                        {mounted && (
                            <button
                                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle Dark Mode"
                            >
                                <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                                    {theme === "dark" ? "light_mode" : "dark_mode"}
                                </span>
                            </button>
                        )}

                        <Link
                            href="https://wa.me/6285159120300?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20jasa%20Anda"
                            target="_blank"
                            className="hidden sm:block bg-primary hover:bg-black text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-transform hover:scale-105 shadow-lg"
                        >
                            Konsultasi Gratis
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 z-50"
                            onClick={toggleMenu}
                        >
                            <span className="material-symbols-outlined text-text-light dark:text-text-dark">
                                {isOpen ? "close" : "menu"}
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden fixed inset-0 z-40 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl flex flex-col pt-24 px-6 h-screen"
                    >
                        <nav className="flex flex-col space-y-6">
                            {navLinks.map((link, i) => (
                                <motion.div
                                    key={link.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.1 + i * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={(e) => scrollToSection(e, link.id)}
                                        className={`text-2xl font-bold tracking-tight ${activeSection === link.id
                                            ? "text-primary dark:text-accent"
                                            : "text-gray-900 dark:text-white"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="pt-8"
                            >
                                <a
                                    href="https://wa.me/6285159120300?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20jasa%20Anda"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-primary hover:bg-blue-600 text-white text-center py-4 rounded-2xl text-lg font-bold shadow-lg shadow-primary/25 transition-all active:scale-95"
                                >
                                    Konsultasi Gratis
                                </a>
                            </motion.div>
                        </nav>

                        {/* Social / Contact Info */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-auto pb-8 border-t border-gray-200 dark:border-gray-800/50 pt-6"
                        >
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Connect with me</p>
                            <div className="flex gap-4">
                                <a href="#" className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                    <span className="material-symbols-outlined">mail</span>
                                </a>
                                <a href="#" className="size-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300">
                                    <span className="material-symbols-outlined">alternate_email</span>
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
