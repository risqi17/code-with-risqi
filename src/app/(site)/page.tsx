
import Image from "next/image";
import Link from "next/link";
import { getPaginatedProjects, getProjectsCount, getBlogs, getTestimonials } from "@/lib/db";
import { Faq } from "@/components/faq";
import { BlogList } from "@/components/blog-list";
import { ProjectList } from "@/components/project-list";
import { TestimonialList } from "@/components/testimonial-list";
import { FadeIn } from "@/components/fade-in";

export const revalidate = 0; // Ensure fresh data from DB

export default function Home() {
  const projects = getPaginatedProjects(6, 0);
  const totalProjects = getProjectsCount();
  const blogs = getBlogs();
  const testimonials = getTestimonials();
  // We only want to show the first 3 projects on home page, but the design shows them specifically.
  // The seed data has 3 projects matching the design.

  return (
    <main>
      {/* Hero Section */}
      <section id="hero" className="relative site-section bg-background-light dark:bg-background-dark">
        <div className="site-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <FadeIn className="space-y-6">
              <div className="inline-flex items-center px-3 py-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-surface-light dark:bg-surface-dark">
                <span className="w-2 h-2 rounded-full bg-accent mr-2"></span>
                <span className="text-xs font-semibold uppercase tracking-wide text-text-muted-light dark:text-text-muted-dark">
                  Menerima proyek baru
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-light dark:text-white leading-tight font-display">
                Website yang rapi, cepat, <br />
                <span className="text-accent">
                  dan siap menjual
                </span>{" "}
                <br />
                untuk bisnis Anda
              </h1>
              <p className="text-base text-text-muted-light dark:text-text-muted-dark max-w-xl leading-relaxed">
                Saya membantu bisnis membangun website, toko online, dashboard, dan sistem internal
                yang enak digunakan, mudah dipahami, dan siap berkembang bersama kebutuhan tim.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <a
                  href="https://wa.me/6285159120300?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20jasa%20Anda"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-primary hover:bg-gray-800 text-white dark:bg-accent dark:text-gray-950 dark:hover:bg-teal-200 px-6 py-3 rounded-lg font-medium transition-colors inline-block"
                >
                  Diskusi Proyek
                </a>
                <Link
                  href="/#works"
                  className="flex items-center text-text-light dark:text-white font-medium hover:text-accent dark:hover:text-accent transition-colors group"
                >
                  Lihat studi kasus
                  <span className="material-symbols-outlined ml-2 transform group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-4 text-sm font-medium text-text-muted-light dark:text-text-muted-dark border-t border-gray-200 dark:border-gray-800 mt-8">
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-lg mr-2 text-accent">
                    check_circle
                  </span>{" "}
                  7+ Tahun membangun produk
                </span>
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-lg mr-2 text-accent">
                    check_circle
                  </span>{" "}
                  Desain responsif & aksesibel
                </span>
                <span className="flex items-center">
                  <span className="material-symbols-outlined text-lg mr-2 text-accent">
                    check_circle
                  </span>{" "}
                  Estimasi jelas sejak awal
                </span>
              </div>
            </FadeIn>
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-12">
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-accent transition-colors group">
                    <h3 className="text-3xl font-bold text-accent">239+</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mt-1">
                      Proyek dikirim
                    </p>
                  </div>
                  <div className="bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-accent transition-colors group">
                    <h3 className="text-3xl font-bold text-accent">100+</h3>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mt-1">
                      Bisnis terbantu
                    </p>
                  </div>
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 relative h-40 group">
                    <Image
                      alt="Web Dashboard UI"
                      src="/images/hero-dashboard.png"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 h-52 relative">
                    <Image
                      alt="Modern Code Editor"
                      src="/images/hero-code.png"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 h-40 relative">
                    <Image
                      alt="Web Design Workflow"
                      src="/images/hero-design.png"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-center text-xl font-bold font-display text-text-light dark:text-white">
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
      <section id="works" className="site-section bg-surface-light dark:bg-background-dark border-y border-gray-200 dark:border-gray-800">
        <FadeIn className="site-container">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">
              Studi Kasus
            </span>
            <h2 className="text-3xl font-bold text-text-light dark:text-white font-display">
              Pekerjaan nyata, bukan sekadar tampilan cantik
            </h2>
          </div>

          <ProjectList initialProjects={projects} totalCount={totalProjects} />
        </FadeIn>
      </section>

      {/* Services */}
      <section id="services" className="site-section bg-background-light dark:bg-background-dark">
        <FadeIn className="site-container">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
            <div>
              <span className="text-xs font-bold tracking-widest text-accent uppercase mb-2 block">Apa yang bisa dibangun</span>
              <h2 className="text-3xl font-bold text-text-light dark:text-white font-display">Website dan sistem yang benar-benar dipakai</h2>
              <p className="text-sm text-text-muted-light dark:text-text-muted-dark max-w-md mt-4 md:mt-0 text-right md:text-left">
                Dari halaman penjualan sampai aplikasi operasional, setiap proyek dibuat dengan alur yang jelas dan fondasi teknis yang rapi.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[minmax(140px,auto)]">
            {[
              { icon: "web", title: "Landing Page Bisnis", desc: "Halaman yang menjelaskan penawaran dengan tajam dan mengarahkan pengunjung untuk bertindak." },
              { icon: "shopping_cart", title: "Toko Online", desc: "Pengalaman belanja yang sederhana, cepat, dan mudah dikelola oleh tim Anda." },
              { icon: "domain", title: "Sistem Internal", desc: "ERP, HRIS, legal workflow, dan alat kerja lain yang mengikuti proses perusahaan." },
              { icon: "smartphone", title: "Mobile Apps", desc: "Aplikasi mobile yang ringan, responsif, dan nyaman digunakan setiap hari." },
              { icon: "automation", title: "Otomasi Workflow", desc: "Kurangi pekerjaan repetitif dengan alur otomatis yang tetap mudah dipantau." },
              { icon: "monitoring", title: "Dashboard Bisnis", desc: "Data penting disusun menjadi tampilan yang cepat dibaca dan mudah ditindaklanjuti." },
            ].map((service, index) => (
              <div
                key={index}
                className={`group bg-surface-light dark:bg-surface-dark p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-accent transition-colors duration-300 flex flex-col justify-between ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                  }`}
              >
                <div>
                  <div className={`${index === 0 ? 'w-12 h-12 mb-5' : 'w-10 h-10 mb-3'} bg-teal-50 dark:bg-gray-800 rounded-lg flex items-center justify-center text-accent`}>
                    <span className={`material-symbols-outlined ${index === 0 ? 'text-2xl' : 'text-xl'}`}>{service.icon}</span>
                  </div>
                  <h3 className={`font-bold text-text-light dark:text-white mb-2 font-display ${index === 0 ? 'text-2xl' : 'text-lg'}`}>{service.title}</h3>
                  <p className="text-text-muted-light dark:text-text-muted-dark text-xs leading-relaxed">{service.desc}</p>
                </div>
                {index === 0 && (
                  <div className="mt-6 flex items-center text-accent font-bold text-xs uppercase tracking-wide cursor-pointer">
                    Diskusikan kebutuhan <span className="material-symbols-outlined ml-1 text-lg">arrow_forward</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <section id="faqs" className="site-section bg-background-light dark:bg-background-dark">
        <FadeIn className="site-container-narrow">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">Sebelum mulai</span>
            <h2 className="text-3xl font-bold text-text-light dark:text-white font-display">Pertanyaan yang sering muncul</h2>
          </div>
          <Faq />
        </FadeIn>
      </section>

      {/* Testimonials */}
      <section className="site-section bg-surface-light dark:bg-background-dark border-y border-gray-200 dark:border-gray-800">
        <FadeIn className="site-container">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">Bukti dari klien</span>
            <h2 className="text-3xl font-bold text-text-light dark:text-white font-display">Kepercayaan dibangun dari hasil kerja yang jelas</h2>
          </div>
          <TestimonialList testimonials={testimonials} />
        </FadeIn>
      </section>

      {/* Blog/Journal */}
      <section id="blogs" className="site-section bg-background-light dark:bg-background-dark">
        <FadeIn className="site-container">
          <div className="text-center mb-10">
            <span className="text-xs font-bold tracking-widest text-text-muted-light dark:text-text-muted-dark uppercase mb-4 block">Catatan Praktis</span>
            <h2 className="text-3xl font-bold text-text-light dark:text-white font-display">Ide sederhana untuk membuat produk digital lebih kuat</h2>
          </div>
          <BlogList blogs={blogs} />
        </FadeIn>
      </section>

      {/* CTA */}
      <section className="site-section dark:bg-background-dark">
        <FadeIn className="site-container-narrow bg-primary dark:bg-surface-dark border border-gray-800 dark:border-gray-700 rounded-xl p-8 md:p-10 text-center relative overflow-hidden">
          <div className="relative z-10 px-4">
            <span className="text-xs font-bold tracking-widest text-accent uppercase mb-6 block">Mulai dari brief singkat</span>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 font-display leading-tight">
              Punya ide yang perlu dibuat rapi? <br />
              <span className="text-gray-300 dark:text-text-muted-dark">Mari ubah jadi produk yang bisa dipakai</span>
            </h2>

            <p className="text-gray-300 mb-8 max-w-2xl mx-auto text-base leading-relaxed">
              Ceritakan tujuan, kendala, dan prioritas bisnis Anda. Dari sana saya bantu susun arah teknis, estimasi, dan langkah pertama yang masuk akal.
            </p>

            <a
              href="https://wa.me/6285159120300?text=Halo%2C%20saya%20tertarik%20untuk%20konsultasi%20mengenai%20jasa%20Anda"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-100 text-gray-900 px-6 py-3 rounded-lg font-bold transition-colors inline-flex items-center gap-2 group"
            >
              <span className="material-symbols-outlined text-xl">chat</span>
              Mulai Diskusi
            </a>
          </div>
        </FadeIn>
      </section>
    </main >
  );
}
