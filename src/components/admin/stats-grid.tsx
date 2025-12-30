export function StatsGrid({ totalProjects }: { totalProjects: number }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1 */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                        <span className="material-symbols-outlined">folder</span>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full">
                        +2 this week
                    </span>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Total Projects
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {totalProjects}
                    </h3>
                </div>
            </div>
            {/* Stat Card 2 */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 rounded-lg">
                        <span className="material-symbols-outlined">mail</span>
                    </div>
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-primary text-xs font-bold px-2 py-1 rounded-full">
                        4 New
                    </span>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Unread Inquiries
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        4
                    </h3>
                </div>
            </div>
            {/* Stat Card 3 */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500 rounded-lg">
                        <span className="material-symbols-outlined">visibility</span>
                    </div>
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm font-bold">
                            trending_up
                        </span>{" "}
                        12%
                    </span>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Monthly Views
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        3.2k
                    </h3>
                </div>
            </div>
            {/* Stat Card 4 */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-500 rounded-lg">
                        <span className="material-symbols-outlined">group</span>
                    </div>
                    <span className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 text-xs font-bold px-2 py-1 rounded-full">
                        Stable
                    </span>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Active Clients
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        8
                    </h3>
                </div>
            </div>
        </div>
    );
}
