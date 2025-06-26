'use client'

import { UserProfile } from '@clerk/nextjs'
import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Sparkles, Settings as SettingsIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'

const Settings = () => {
    const { user } = useUser()
    const email = user?.emailAddresses?.[0]?.emailAddress || 'Not available'

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-all duration-200 group"
                            >
                                <ArrowLeft
                                    size={18}
                                    className="mr-2 group-hover:-translate-x-1 transition-transform duration-200"
                                />
                                Back to Dashboard
                            </Link>
                            <div className="h-6 w-px bg-gray-300"></div>
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                                    <SettingsIcon size={20} className="text-blue-600" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">
                                        Settings
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Manage your account preferences
                                    </p>
                                    <p className="text-sm text-gray-400 italic">
                                        Logged in as: {email}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* UserProfile Container */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="p-6">
                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-gray-900 mb-2">
                                Account Settings
                            </h2>
                            <p className="text-sm text-gray-600">
                                Update your profile information and manage your account preferences.
                            </p>
                        </div>

                        {/* Centered UserProfile with custom styling */}
                        <div className="clerk-user-profile flex justify-center">
                            <UserProfile
                                appearance={{
                                    elements: {
                                        rootBox: "w-full",
                                        card: "shadow-none border-0 bg-transparent",
                                        navbar: "rounded-lg bg-gray-50 border border-gray-200",
                                        navbarButton: "text-gray-700 hover:bg-white hover:text-gray-900 rounded-md transition-colors duration-200",
                                        navbarButtonActive: "bg-white text-gray-900 shadow-sm",
                                        pageScrollBox: "px-0",
                                        page: "bg-transparent",
                                        profileSection: "bg-gray-50 rounded-lg border border-gray-200 p-4 mb-4",
                                        profileSectionTitle: "text-gray-900 font-semibold text-base",
                                        profileSectionContent: "text-gray-700",
                                        formButtonPrimary: "bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors duration-200",
                                        formFieldInput: "border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg",
                                        formFieldLabel: "text-gray-700 font-medium text-sm",
                                        headerTitle: "text-gray-900 font-semibold",
                                        headerSubtitle: "text-gray-600",
                                    },
                                    variables: {
                                        colorPrimary: "#2563eb",
                                        colorBackground: "#ffffff",
                                        colorInputBackground: "#ffffff",
                                        colorInputText: "#374151",
                                        colorText: "#374151",
                                        colorTextSecondary: "#6b7280",
                                        fontFamily: "system-ui, -apple-system, sans-serif",
                                        borderRadius: "8px",
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings