"use client";

import Link from "next/link";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

export function Navbar() {
    const { theme, setTheme } = useTheme();
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const mountedFrame = window.requestAnimationFrame(() => setMounted(true));
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
            window.cancelAnimationFrame(mountedFrame);
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
        if (id === "shop") {
            setIsOpen(false);
            return;
        }

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
        { id: "home", label: "Beranda", href: "/" },
        { id: "works", label: "Karya", href: "/#works" },
        { id: "shop", label: "Shop", href: "/shop" },
        { id: "services", label: "Layanan", href: "/#services" },
        { id: "faqs", label: "FAQ", href: "/#faqs" },
        { id: "blogs", label: "Artikel", href: "/#blogs" },
    ];

    const isNavLinkActive = (id: string) => {
        if (id === "shop") {
            return pathname.startsWith("/shop");
        }

        return pathname === "/" && activeSection === id;
    };

    return (
        <header
            id="home"
            className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled && !isOpen
                ? "bg-background-light dark:bg-background-dark border-b border-gray-200 dark:border-gray-800"
                : "bg-background-light dark:bg-background-dark border-b border-transparent"
                }`}
        >
            <div className="site-container">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <Image
                            src="/images/logo-risqi.png"
                            alt="Code with Risqi Logo"
                            width={32}
                            height={32}
                            className="w-7 h-7 object-contain"
                        />
                        <span className="font-bold text-lg tracking-tight text-primary dark:text-white">Code with Risqi</span>
                    </Link>

                    <nav className="hidden md:flex space-x-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.id}
                                href={link.href}
                                onClick={(e) => scrollToSection(e, link.id)}
                                className={`text-sm font-medium transition-colors ${isNavLinkActive(link.id)
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
                                className="p-2 rounded-lg text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                aria-label="Toggle Dark Mode"
                            >
                                <span className="material-symbols-outlined">
                                    {theme === "dark" ? "light_mode" : "dark_mode"}
                                </span>
                            </button>
                        )}

                        <Link
                            href="https://wa.me/6285159120300?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20jasa%20Anda"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:block bg-primary hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors dark:bg-accent dark:text-gray-950 dark:hover:bg-teal-200"
                        >
                            Diskusi Proyek
                        </Link>

                        {/* Mobile menu button */}
                        <button
                            className="md:hidden p-2 rounded-lg z-50 text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-gray-800"
                            onClick={toggleMenu}
                            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                            aria-expanded={isOpen}
                        >
                            <span className="material-symbols-outlined">
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
                        className="md:hidden fixed inset-0 z-40 bg-background-light dark:bg-background-dark flex flex-col pt-20 px-6 h-screen"
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
                                    className={`text-2xl font-bold tracking-tight ${isNavLinkActive(link.id)
                                            ? "text-primary dark:text-accent"
                                            : "text-text-light dark:text-white"
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
                                    className="block w-full bg-primary hover:bg-gray-800 text-white text-center py-4 rounded-lg text-lg font-bold transition-colors dark:bg-accent dark:text-gray-950 dark:hover:bg-teal-200"
                                >
                                    Diskusi Proyek
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
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Hubungi saya</p>
                            <div className="flex gap-4">
                                <a href="#" aria-label="Email Code with Risqi" className="size-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent">
                                    <span className="material-symbols-outlined">mail</span>
                                </a>
                                <a href="#" aria-label="Code with Risqi social profile" className="size-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-accent">
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
