
import Image from "next/image";
import Link from "next/link";
import { getProjects, getBlogs, getTestimonials } from "@/lib/db";
import { Faq } from "@/components/faq";
import { BlogList } from "@/components/blog-list";
import { ProjectList } from "@/components/project-list";
import { TestimonialList } from "@/components/testimonial-list";
import { motion } from "framer-motion";
import { FadeIn } from "@/components/fade-in";

export const revalidate = 0; // Ensure fresh data from DB

export default function Home() {
  const projects = getProjects();
  const blogs = getBlogs();
  const testimonials = getTestimonials();
  // We only want to show the first 3 projects on home page, but the design shows them specifically.
  // The seed data has 3 projects matching the design.

  return (
    <main>
      {/* Hero Section */}
      <section id="hero" className="relative pt-20 pb-32 overflow-hidden dark:bg-background-dark">
        <div className="absolute inset-0 grid-pattern pointer-events-none"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-accent opacity-10 blur-[120px] rounded-full pointer-events-none -z-10 dark:block hidden"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <FadeIn className="space-y-8">
              <div className="inline-flex items-center px-3 py-1 rounded-xl border border-gray-200 dark:border-white/10 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse"></span>
                <span className="text-xs font-semibold uppercase tracking-wide text-text-muted-light dark:text-text-muted-dark">
                  Open for new opportunities
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-text-light dark:text-white leading-tight font-display">
                Bangun Citra Digital <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500 dark:from-accent dark:to-teal-200">
                  Yang Memukau
                </span>{" "}
                <br />
                Dan Berkelas
              </h1>
              <p className="text-lg text-text-muted-light dark:text-text-muted-dark max-w-xl leading-relaxed">
                Kami membantu bisnis Anda tampil profesional dan terpercaya di era digital.
                Solusi website modern yang tidak hanya indah dipandang, tetapi juga
                efektif untuk meningkatkan konversi.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="https://wa.me/6285159120300?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20jasa%20Anda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-gray-900 text-white dark:bg-accent dark:text-black dark:hover:bg-white px-8 py-4 rounded-xl font-medium transition-all shadow-xl hover:shadow-2xl dark:shadow-accent/10 transform hover:-translate-y-1 inline-block"
                >
                  Konsultasi Gratis
                </a>
                <Link
                  href="/#works"
                  className="flex items-center text-text-light dark:text-white font-medium hover:text-accent dark:hover:text-accent transition-colors group"
                >
                  Lihat karya
                  <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <div className="flex items-center space-x-6 pt-4 text-sm font-medium text-text-muted-light dark:text-text-muted-dark border-t border-gray-100 dark:border-white/10 mt-8">
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-lg mr-2 text-accent">
                    check_circle
                  </span>{" "}
                  7+ Tahun Pengalaman
                </span>
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-lg mr-2 text-accent">
                    check_circle
                  </span>{" "}
                  Penilaian Bintang 5
                </span>
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-lg mr-2 text-accent">
                    check_circle
                  </span>{" "}
                  Tepat Waktu
                </span>
              </div>
            </FadeIn>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-accent/30 transition-colors group">
                    <h3 className="text-4xl font-bold text-accent group-hover:text-amber-300 dark:group-hover:text-accent transition-colors">239+</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mt-1">
                      Proyek Selesai
                    </p>
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 hover:border-accent/30 transition-colors group">
                    <h3 className="text-4xl font-bold text-accent group-hover:text-amber-300 dark:group-hover:text-accent transition-colors">100+</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mt-1">
                      Total Klien
                    </p>
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-white/10 relative h-48 group">
                    <Image
                      alt="Web Dashboard UI"
                      src="/images/hero-dashboard.png"
                      fill
                      className="object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 h-64 relative">
                    <Image
                      alt="Modern Code Editor"
                      src="/images/hero-code.png"
                      fill
                      className="object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="rounded-2xl overflow-hidden shadow-lg border-4 border-white dark:border-gray-700 h-48 relative">
                    <Image
                      alt="Web Design Workflow"
                      src="/images/hero-design.png"
                      fill
                      className="object-cover transform hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex items-center text-2xl font-bold font-display text-text-light dark:text-white">
                    <span className="material-symbols-outlined mr-2">
                      terminal
                    </span>
                    Code with Risqi
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Trusted By */}
      {/* <section className="py-10 border-y border-gray-200 dark:border-white/5 bg-white/50 backdrop-blur-sm dark:bg-background-dark">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-xs font-bold tracking-[0.2em] text-text-muted-light dark:text-text-muted-dark mb-8 uppercase opacity-60">
            Mendukung desain untuk pemimpin industri
          </p>
          <div className="flex flex-wrap justify-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center text-2xl font-bold font-display text-text-light dark:text-white">
              <span className="material-symbols-outlined mr-2">rocket_launch</span>RocketLab
            </div>
            <div className="flex items-center text-2xl font-bold font-display text-text-light dark:text-white">
              <span className="material-symbols-outlined mr-2">deployed_code</span>CodeFlow
            </div>
            <div className="flex items-center text-2xl font-bold font-display text-text-light dark:text-white">
              <span className="material-symbols-outlined mr-2">all_inclusive</span>Infinite
            </div>
            <div className="flex items-center text-2xl font-bold font-display text-text-light dark:text-white">
              <span className="material-symbols-outlined mr-2">bolt</span>BoltShift
            </div>
            <div className="flex items-center text-2xl font-bold font-display text-text-light dark:text-white">
              <span className="material-symbols-outlined mr-2">cruelty_free</span>Naturals
            </div>
          </div>
        </FadeIn>
      </section> */}

      {/* Recent Projects (Dynamic) */}
      <section id="works" className="py-24 bg-gray-50 dark:bg-background-dark">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">
              Proyek Terbaru
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white font-display">
              Memadukan fungsionalitas dengan estetika
            </h2>
          </div>

          <ProjectList projects={projects} />
        </FadeIn>
      </section>

      {/* Services */}
      <section id="services" className="py-16 bg-background-light dark:bg-background-dark">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <span className="text-xs font-bold tracking-widest text-accent uppercase mb-2 block">Layanan</span>
              <h2 className="text-3xl font-bold text-text-light dark:text-white font-display">Solusi Digital</h2>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark max-w-md mt-4 md:mt-0 text-right md:text-left">
                Kami menyediakan layanan lengkap untuk kebutuhan transformasi digital Anda.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(160px,auto)]">
            {[
              { icon: "web", title: "Pembuatan Landing Page", desc: "Halaman web profesional untuk konversi tinggi." },
              { icon: "shopping_cart", title: "Ecommerce", desc: "Toko online canggih dengan fitur lengkap." },
              { icon: "domain", title: "System Internal Perusahaan", desc: "ERP, HRIS, LEGAL, dan sistem manajemen lainnya." },
              { icon: "smartphone", title: "Mobile Apps", desc: "Aplikasi Android & iOS yang responsif." },
              { icon: "smart_toy", title: "AI Automation", desc: "Otomatisasi cerdas untuk efisiensi bisnis." },
              { icon: "monitoring", title: "Dashboard Bisnis", desc: "Visualisasi data untuk pengambilan keputusan." },
            ].map((service, index) => (
              <div
                key={index}
                className={`group bg-surface-light dark:bg-surface-dark p-6 rounded-2xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-accent/30 transition-all duration-300 flex flex-col justify-between ${index === 0 ? 'md:col-span-2 md:row-span-2 bg-gradient-to-br from-white to-blue-50/50 dark:from-surface-dark dark:to-blue-900/10' : ''
                  }`}
              >
                <div>
                  <div className={`${index === 0 ? 'w-12 h-12 mb-5' : 'w-10 h-10 mb-3'} bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-accent group-hover:scale-110 transition-transform`}>
                    <span className={`material-symbols-outlined ${index === 0 ? 'text-2xl' : 'text-xl'}`}>{service.icon}</span>
                  </div>
                  <h3 className={`font-bold text-text-light dark:text-white mb-2 font-display ${index === 0 ? 'text-2xl' : 'text-lg'}`}>{service.title}</h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-xs leading-relaxed">{service.desc}</p>
                </div>
                {index === 0 && (
                  <div className="mt-6 flex items-center text-accent font-bold text-xs uppercase tracking-wide group-hover:translate-x-1 transition-transform cursor-pointer">
                    Mulai Sekarang <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section id="faqs" className="py-24 bg-background-light dark:bg-background-dark">
        <FadeIn className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">Punya pertanyaan?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white font-display">Ini beberapa FAQ</h2>
          </div>
          <Faq />
        </FadeIn>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50 dark:bg-background-dark">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">Masih Ragu?</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white font-display">Lihat apa kata klien</h2>
          </div>
          <TestimonialList testimonials={testimonials} />
        </FadeIn>
      </section>

      {/* Blog/Journal */}
      <section id="blogs" className="py-24 bg-background-light dark:bg-background-dark">
        <FadeIn className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">Wawasan & Tren Digital</span>
            <h2 className="text-3xl md:text-4xl font-bold text-text-light dark:text-white font-display">Strategi desain untuk pertumbuhan bisnis</h2>
          </div>
          <BlogList blogs={blogs} />
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 dark:bg-background-dark">
        <FadeIn className="max-w-5xl mx-auto bg-gray-900 dark:bg-gray-800 border border-gray-800 dark:border-gray-700 rounded-xl p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          {/* Background Effects */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)", backgroundSize: "24px 24px" }}></div>
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-accent/30 blur-[80px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-accent/30 blur-[80px] rounded-full pointer-events-none"></div>

          <div className="relative z-10 px-4">
            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-6 block">Siap Bertransformasi?</span>

            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-display leading-tight">
              Wujudkan Ide Anda, <br />
              <span className="text-gray-400">Dapatkan konsultasi gratis</span>
            </h2>

            <p className="text-gray-300 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Jangan biarkan ide hebat Anda hanya menjadi angan-angan. Mari berdiskusi dan bangun solusi digital terbaik untuk bisnis Anda.
            </p>

            <a
              href="https://wa.me/6285159120300?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20jasa%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold transition-all transform hover:scale-105 shadow-xl inline-flex items-center gap-2 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:animate-bounce">chat</span>
              Hubungi Kami Sekarang
            </a>
          </div>
        </FadeIn>
      </section>
    </main >
  );
}
