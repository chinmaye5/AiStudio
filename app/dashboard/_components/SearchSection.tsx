// SearchSection.tsx
'use client';
import { Search } from 'lucide-react';
import React from 'react';

export const SearchSection = ({
    searchQuery,
    setSearchQuery,
}: {
    searchQuery: string;
    setSearchQuery: (val: string) => void;
}) => {
    return (
        <div className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-xl shadow-md border border-green-600 p-10 mb-12">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-3 text-white">Browse All Templates</h2>
                <p className="text-white/80 text-lg max-w-2xl mx-auto">
                    Find the perfect template for your needs and boost your productivity.
                </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-xl mx-auto">
                <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Search size={20} className="text-white/70" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search templates..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 rounded-lg bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-300 transition-all shadow-sm"
                    />
                </div>
            </div>
        </div>
    );
};
