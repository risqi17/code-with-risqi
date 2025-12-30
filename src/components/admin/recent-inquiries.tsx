export function RecentInquiries() {
    return (
        <div className="bg-white dark:bg-surface-dark rounded-xl border border-gray-100 dark:border-gray-800 p-2 shadow-sm flex flex-col gap-1">
            {/* Inquiry Item */}
            <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer relative group">
                <div className="absolute right-3 top-3 size-2 bg-primary rounded-full"></div>
                <div className="size-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-sm shrink-0">
                    JD
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            John Doe
                        </p>
                        <span className="text-xs text-gray-400 pr-3">2h ago</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Project Collaboration
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        Hi, I'd like to discuss a potential branding project for my...
                    </p>
                </div>
            </div>
            {/* Inquiry Item */}
            <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer relative group">
                <div className="absolute right-3 top-3 size-2 bg-primary rounded-full"></div>
                <div
                    className="size-10 rounded-full bg-cover bg-center shrink-0"
                    style={{
                        backgroundImage:
                            "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCwOiV_cUr_XaPqwFDts8dZa4igrLGD70JRMDysMa8iIknh1BJAqG2v9JXvKn-1jECp5WE7KK01_Y_5lpuN8pg9rXncCPnX-ivNi8x9qtiVB5Je9XWZ0HrgDRPp2SiLLIITN0HjTUBs69SwFBeEetOdHA-_FjFJ5kGg56ONc2MxUd3AB0dAZwA1QypsTKTv7NONkDzfjwEWaBT4dpHXbVmfo7QDASA9MieJavgDNgKP1tU5d14TpfNI0cHB95LhkONL9LhAfy-3B3uk')",
                    }}
                ></div>
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                            Sarah Smith
                        </p>
                        <span className="text-xs text-gray-400 pr-3">5h ago</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Job Opportunity
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        We are looking for a senior designer to join our team in...
                    </p>
                </div>
            </div>
            {/* Inquiry Item (Read) */}
            <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer group">
                <div className="size-10 rounded-full bg-pink-100 dark:bg-pink-900/50 text-pink-600 dark:text-pink-400 flex items-center justify-center font-bold text-sm shrink-0">
                    MP
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                            Mike Peters
                        </p>
                        <span className="text-xs text-gray-400">1d ago</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Quote Request
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        Could you send over your rates for a standard 5-page...
                    </p>
                </div>
            </div>
            {/* Inquiry Item */}
            <div className="flex gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors cursor-pointer group">
                <div className="size-10 rounded-full bg-teal-100 dark:bg-teal-900/50 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
                    AC
                </div>
                <div className="flex flex-col gap-1 min-w-0">
                    <div className="flex justify-between items-center">
                        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300 truncate">
                            Agency Contact
                        </p>
                        <span className="text-xs text-gray-400">2d ago</span>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                        Hello
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 truncate">
                        Just checking in on the proposal we sent last week...
                    </p>
                </div>
            </div>
        </div>
    );
}
