import Image from "next/image";

export function Footer() {
    return (
        <footer className="bg-surface-light dark:bg-surface-dark border-t border-gray-200 dark:border-gray-800 pt-10 pb-6">
            <div className="site-container">
                <div className="flex flex-col md:flex-row justify-between items-center mb-8">
                    <div className="flex space-x-6 text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-6 md:mb-0">
                        <a className="hover:text-primary dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" href="https://linkedin.com/in/risqiahmad">LinkedIn</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" target="_blank" rel="noopener noreferrer" href="https://www.threads.com/@codewithrisqi?igshid=NTc4MTIwNjQ2YQ==">Threads</a>
                    </div>
                    <div className="mb-6 md:mb-0 flex items-center gap-2">
                        <Image
                            src="/images/logo-risqi.png"
                            alt="Code with Risqi Logo"
                            width={48}
                            height={48}
                            className="w-9 h-9 object-contain"
                        />
                        <span className="text-xl font-bold text-primary dark:text-white">Code with Risqi</span>
                    </div>
                    {/* <div className="flex space-x-6 text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Log Perubahan</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">S&amp;K</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Kebijakan Privasi</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Lisensi</a>
                    </div> */}
                </div>
                <div className="bg-primary dark:bg-background-dark text-white text-center py-3 rounded-lg text-xs font-medium">
                    &copy; 2026 Code with Risqi. Hak cipta dilindungi undang-undang.
                </div>
            </div>
        </footer>
    );
}
