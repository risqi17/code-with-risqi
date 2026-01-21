
export function Footer() {
    return (
        <footer className="bg-background-light dark:bg-background-dark border-t border-gray-200 dark:border-gray-800 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                    <div className="flex space-x-6 text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark mb-6 md:mb-0">
                        <a className="hover:text-primary dark:hover:text-white transition-colors" target="_blank" href="https://linkedin.com/in/risqiahmad">LinkedIn</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" target="_blank" href="https://www.threads.com/@codewithrisqi?igshid=NTc4MTIwNjQ2YQ==">Threads</a>
                    </div>
                    <div className="mb-6 md:mb-0 flex items-center gap-2">
                        <span className="material-symbols-outlined text-5xl text-primary dark:text-white">
                            terminal
                        </span>
                        <span className="text-2xl font-bold text-primary dark:text-white">Code with Risqi</span>
                    </div>
                    {/* <div className="flex space-x-6 text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Log Perubahan</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">S&amp;K</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Kebijakan Privasi</a>
                        <a className="hover:text-primary dark:hover:text-white transition-colors" href="#">Lisensi</a>
                    </div> */}
                </div>
                <div className="bg-primary dark:bg-black text-white text-center py-4 rounded-full text-xs font-medium opacity-90">
                    &copy; 2026 Code with Risqi. Hak cipta dilindungi undang-undang.
                </div>
            </div>
        </footer>
    );
}
