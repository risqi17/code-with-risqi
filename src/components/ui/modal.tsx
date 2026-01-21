"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children?: React.ReactNode;
    type?: "default" | "danger" | "success" | "warning";
    confirmText?: string;
    cancelText?: string;
    onConfirm?: () => void;
    isLoading?: boolean;
    showCancel?: boolean;
}

export function Modal({
    isOpen,
    onClose,
    title,
    description,
    children,
    type = "default",
    confirmText = "Confirm",
    cancelText = "Cancel",
    onConfirm,
    isLoading = false,
    showCancel = true,
}: ModalProps) {
    // Add effect to lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    // Use createPortal to render outside the parent DOM hierarchy
    // We assume there's a body to render into (Next.js always has body)
    if (typeof window === "undefined") return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all"
                    />

                    {/* Modal Panel */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white dark:bg-surface-dark p-6 shadow-2xl transition-all border border-gray-100 dark:border-gray-800"
                    >
                        <div className="flex flex-col gap-4">
                            {/* Icon & Title */}
                            <div className="flex items-start gap-4">
                                {type === "danger" && (
                                    <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400">
                                        <span className="material-symbols-outlined">warning</span>
                                    </div>
                                )}
                                {type === "success" && (
                                    <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400">
                                        <span className="material-symbols-outlined">check_circle</span>
                                    </div>
                                )}
                                {type === "warning" && (
                                    <div className="flex-shrink-0 flex items-center justify-center size-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400">
                                        <span className="material-symbols-outlined">info</span>
                                    </div>
                                )}

                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">
                                        {title}
                                    </h3>
                                    {description && (
                                        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                            {description}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Custom Content */}
                            {children && <div className="mt-2">{children}</div>}

                            {/* Actions */}
                            <div className="mt-6 flex justify-end gap-3">
                                {showCancel && (
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        disabled={isLoading}
                                        className="inline-flex justify-center rounded-lg px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-colors disabled:opacity-50"
                                    >
                                        {cancelText}
                                    </button>
                                )}
                                {onConfirm && (
                                    <button
                                        type="button"
                                        onClick={onConfirm}
                                        disabled={isLoading}
                                        className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${type === "danger"
                                                ? "bg-red-600 hover:bg-red-700 focus:ring-red-500 shadow-red-500/20"
                                                : type === "success"
                                                    ? "bg-green-600 hover:bg-green-700 focus:ring-green-500 shadow-green-500/20"
                                                    : "bg-primary hover:bg-primary/90 focus:ring-primary shadow-primary/20"
                                            }`}
                                    >
                                        {isLoading && (
                                            <span className="material-symbols-outlined text-sm animate-spin">refresh</span>
                                        )}
                                        {confirmText}
                                    </button>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
