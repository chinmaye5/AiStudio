'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Copy, ArrowLeft, History, Loader } from 'lucide-react';
import Link from 'next/link';
import Loaderfan from '../_components/loader';
import Loadercube from '../_components/loader';


const HistoryPage = () => {
    const { user, isLoaded } = useUser();
    const [history, setHistory] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!isLoaded || !user) return;
            const email = user.primaryEmailAddress?.emailAddress;
            if (!email) return;

            const res = await fetch('/api/history', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            setHistory(data);
            setLoading(false);
        };
        fetchHistory();
    }, [user, isLoaded]);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        alert('Copied to clipboard!');
    };

    const email = user?.primaryEmailAddress?.emailAddress;

    if (!isLoaded) {
        return (
            <div className="flex flex-col items-center justify-center h-40 text-gray-600 font-medium gap-3">
                <Loadercube />
            </div>
        );
    }
    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-40 text-gray-600 font-medium gap-3">
                <Loadercube />
            </div>
        );
    }


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
                                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                                    <History size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">
                                        History
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        View your past AI-generated content
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

            {/* History Content */}
            <div className="max-w-8xl mx-auto py-12 px-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-3">📜 Your History</h1>

                {history.length === 0 ? (
                    <div className="text-center text-gray-500 text-lg bg-white border border-gray-200 rounded-lg py-12 shadow-sm">
                        No history found. Start generating something awesome!
                    </div>
                ) : (
                    <div className="space-y-6">
                        {history.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <div className="text-base font-semibold text-green-600 capitalize">
                                        🔖 {item.templateSlug.replace(/-/g, ' ')}
                                    </div>
                                    <div className="text-xs text-gray-400">
                                        {new Date(item.createdAt).toLocaleString()}
                                    </div>
                                </div>

                                <div className="bg-gray-50 rounded-md p-4 text-sm text-gray-700 whitespace-pre-wrap border border-dashed border-gray-200">
                                    {item.aiResponse}
                                </div>

                                <div className="mt-4 text-right">
                                    <button
                                        onClick={() => handleCopy(item.aiResponse)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-sm font-medium rounded-md transition-all duration-200 shadow-sm hover:shadow"
                                    >
                                        <Copy size={16} />
                                        Copy
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;
