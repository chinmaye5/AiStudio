"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Clock, Receipt, Settings } from 'lucide-react';
import UsageTrack from './UsageTrack';

const SideNav = () => {
    const pathname = usePathname();

    const menuList = [
        {
            name: 'Dashboard',
            icon: LayoutDashboard,
            path: '/dashboard',
        },
        {
            name: 'History',
            icon: Clock,
            path: '/dashboard/history',
        },
        {
            name: 'Billing',
            icon: Receipt,
            path: '/dashboard/billing',
        },
        {
            name: 'Profile settings',
            icon: Settings,
            path: '/dashboard/settings',
        },
    ];

    return (
        <div className="h-full flex flex-col p-6 bg-white border-r border-gray-100 shadow-sm">
            {/* Logo */}
            <div className="flex justify-center mb-8">
                <Link href="/" className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-600">AI Studio</span>
                </Link>
            </div>

            {/* Navigation */}
            <nav className="space-y-2 flex-1">
                {menuList.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = pathname === item.path;

                    return (
                        <Link href={item.path} key={index}>
                            <div
                                className={`group flex items-center p-3 rounded-xl transition-all duration-300 cursor-pointer border ${isActive
                                    ? 'bg-green-100 border-green-300 shadow-sm'
                                    : 'border-transparent hover:bg-gradient-to-r hover:from-green-50 hover:to-green-100 hover:border-green-200 hover:shadow-sm'
                                    }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 mr-4 ${isActive ? 'bg-green-500' : 'bg-gray-50 group-hover:bg-green-500'
                                        }`}
                                >
                                    <IconComponent
                                        size={20}
                                        className={`transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-white'
                                            }`}
                                    />
                                </div>
                                <span
                                    className={`text-sm font-medium transition-colors duration-300 ${isActive ? 'text-green-800' : 'text-gray-700 group-hover:text-green-800'
                                        }`}
                                >
                                    {item.name}
                                </span>
                            </div>
                        </Link>
                    );
                })}
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t border-gray-100">
                <div className="text-center">
                    <UsageTrack />
                </div>
            </div>
        </div>
    );
};

export default SideNav;
