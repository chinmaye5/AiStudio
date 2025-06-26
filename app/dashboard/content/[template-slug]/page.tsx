'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { generateAiContent } from '@/utils/AiModel';
import templates from '@/app/(data)/Templates';
import FormSection from '../_components/FormSection';
import OutputSection from '../_components/OutputSection';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import moment from 'moment';
import { useUser } from '@clerk/nextjs';

const CHAR_LIMIT = 100000;

const CreateNewContent = () => {
    const params = useParams();
    const slug = params?.['template-slug'];

    const selectedTemplate = templates.find((t) => t.slug === slug);

    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string | null>(null);
    const [totalChars, setTotalChars] = useState(0);
    const { user } = useUser();

    // Fetch character usage data
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        const fetchUsageData = async () => {
            try {
                const email = user?.primaryEmailAddress?.emailAddress;
                if (!email) return;

                const result = await db.select()
                    .from(AIOutput)
                    .where(eq(AIOutput.createdBy, email));

                let total = 0;
                result.forEach(element => {
                    if (element.aiResponse) {
                        total += element.aiResponse.length;
                    }
                });

                setTotalChars(total);
            } catch (error) {
                console.error('Error fetching usage data:', error);
            }
        };

        if (user) {
            fetchUsageData(); // Initial fetch
            intervalId = setInterval(fetchUsageData, 3000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [user]);

    const handleGenerate = async (formData: Record<string, any>) => {
        if (!selectedTemplate || !slug) return;

        // Prevent generation if limit reached
        if (totalChars >= CHAR_LIMIT) return;

        setLoading(true);

        try {
            const prompt = `${JSON.stringify(formData)}, ${selectedTemplate.aiPrompt}`;
            const output = await generateAiContent(prompt);
            setAiOutput(output);

            const email = user?.primaryEmailAddress?.emailAddress || 'unknown';
            const templateSlug = Array.isArray(slug) ? slug[0] : slug;

            await db.insert(AIOutput).values({
                formData: JSON.stringify(formData),
                templateSlug: templateSlug,
                aiResponse: output,
                createdBy: email,
                createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
            });

            // Update totalChars immediately after generation
            setTotalChars(prev => prev + (output ? output.length : 0));
        } catch (err) {
            console.error('❌ Error during AI generation or DB insert:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200 shadow-sm">
                    <div className="max-w-7xl mx-auto px-6 py-4">
                        <div className="flex items-center justify-between">
                            {/* Back Button & Title */}
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
                                        <Sparkles size={20} className="text-green-600" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900">
                                            {selectedTemplate?.name || 'AI Content Generator'}
                                        </h1>
                                        <p className="text-sm text-gray-600">
                                            {selectedTemplate?.category || 'Template'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Status Badge */}
                            <div className="hidden sm:flex items-center space-x-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm text-gray-600">Ready to generate</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Input Form */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Enter Your Details</h2>
                            <FormSection
                                selectedTemplate={selectedTemplate}
                                userFormInput={handleGenerate}
                                loading={loading}
                            />
                        </div>
                    </div>

                    {/* Right: Output Display */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Generated Output</h2>
                            <OutputSection aiOutput={aiOutput} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateNewContent;