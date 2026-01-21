export function StatsGrid({
    totalProjects,
    totalBlogs,
    totalTestimonials
}: {
    totalProjects: number;
    totalBlogs: number;
    totalTestimonials: number;
}) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Stat Card 1: Projects */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-primary rounded-lg">
                        <span className="material-symbols-outlined">folder</span>
                    </div>
                    {/* <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-xs font-bold px-2 py-1 rounded-full">
                        +2 this week
                    </span> */}
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

            {/* Stat Card 2: Blogs */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-500 rounded-lg">
                        <span className="material-symbols-outlined">article</span>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Total Blogs
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {totalBlogs}
                    </h3>
                </div>
            </div>

            {/* Stat Card 3: Testimonials */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-500 rounded-lg">
                        <span className="material-symbols-outlined">star</span>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Testimonials
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        {totalTestimonials}
                    </h3>
                </div>
            </div>

            {/* Stat Card 4: Views (Still Mock) */}
            <div className="bg-white dark:bg-surface-dark p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4">
                <div className="flex justify-between items-start">
                    <div className="p-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-lg">
                        <span className="material-symbols-outlined">visibility</span>
                    </div>
                </div>
                <div>
                    <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Portfolio Views
                    </p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        --
                    </h3>
                </div>
            </div>
        </div>
    );
}
