'use client';

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { eq, desc } from 'drizzle-orm';
import { Button } from '@/components/ui/button';// Assuming you have a Progress component

const UsageTrack = () => {
    const { user } = useUser();
    const [usageData, setUsageData] = useState<any[]>([]);
    const [totalChars, setTotalChars] = useState(0);
    const [loading, setLoading] = useState(true);
    const CHAR_LIMIT = 100000;

    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        if (user) {
            GetData(); // Initial fetch

            // Poll every 3 seconds
            intervalId = setInterval(() => {
                GetData();
            }, 3000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [user]);

    const GetData = async () => {
        try {
            setLoading(true);
            const email = user?.primaryEmailAddress?.emailAddress;
            if (!email) return;

            const result = await db.select()
                .from(AIOutput)
                .where(eq(AIOutput.createdBy, email))
                .orderBy(desc(AIOutput.createdAt));

            setUsageData(result);
            calculateTotalUsage(result);
        } catch (error) {
            console.error('Error fetching usage data:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateTotalUsage = (data: any[]) => {
        let total = 0;
        data.forEach(element => {
            if (element.aiResponse) {
                total += element.aiResponse.length;
            }
        });
        setTotalChars(total);
    };

    const usagePercentage = Math.min(Math.round((totalChars / CHAR_LIMIT) * 100), 100);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-md transition-all hover:shadow-lg">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-gray-800 tracking-tight">📊 Usage Tracking</h2>
            </div>


            <>
                <div className="mb-4">
                    <div className="flex justify-between text-sm text-gray-600 mb-2 font-medium">
                        <span>Used: {totalChars.toLocaleString()} chars</span>
                        <span>Limit: {CHAR_LIMIT.toLocaleString()}</span>
                    </div>

                    <div className="w-full bg-gray-100 rounded-full h-3">
                        <div
                            className={`h-3 rounded-full ${usagePercentage > 90 ? 'bg-red-500' : usagePercentage > 60 ? 'bg-yellow-400' : 'bg-green-500'}`}
                            style={{ width: `${Math.min(usagePercentage, 100)}%` }}
                        ></div>
                    </div>

                    <div className="text-right text-xs text-gray-500 mt-2">
                        {usagePercentage.toFixed(1)}% of limit used
                    </div>
                </div>

                <div className="text-sm text-gray-700 leading-relaxed">
                    {totalChars >= CHAR_LIMIT ? (
                        <div className="text-red-600 font-semibold">
                            ⚠️ You've reached your character limit. Please upgrade to continue.
                        </div>
                    ) : (
                        <div>
                            ✅ You have <span className="font-medium text-green-600">{(CHAR_LIMIT - totalChars).toLocaleString()}</span> characters remaining.
                        </div>
                    )}
                </div>
            </>

        </div>

    );
};

export default UsageTrack;