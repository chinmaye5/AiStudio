"use client";
import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import React from 'react';
import { UserButton } from '@clerk/nextjs';

const Header = () => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="bg-white border-b border-gray-100 shadow-sm px-6 py-4">
            <div className="flex items-center justify-between">
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search size={18} className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500"
                        />
                    </div>
                </div>
                <div className="ml-6 flex items-center gap-4">
                    <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-md transition-transform duration-200 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2">
                        Join Membership
                    </button>
                    <div className="flex items-center">
                        <UserButton afterSignOutUrl="/" />
                    </div>
                </div>


            </div>
        </div>
    );
};

export default Header;
