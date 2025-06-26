"use client";
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { TEMPLATE } from '../../_components/TemplateListSection';
import { Textarea } from '@/components/ui/textarea';
import { Loader2Icon } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { db } from '@/utils/db';
import { AIOutput } from '@/utils/schema';
import { eq } from 'drizzle-orm';

interface PROPS {
    selectedTemplate?: TEMPLATE;
    userFormInput: any,
    loading: boolean
}

const CHAR_LIMIT = 100000; // Matching the limit from UsageTrack

const FormSection = ({ selectedTemplate, userFormInput, loading }: PROPS) => {
    const [formData, setFormData] = useState<{ [key: string]: string }>({});
    const [totalChars, setTotalChars] = useState(0);
    const [limitReached, setLimitReached] = useState(false);
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
                setLimitReached(total >= CHAR_LIMIT);
            } catch (error) {
                console.error('Error fetching usage data:', error);
            }
        };

        if (user) {
            fetchUsageData(); // Initial fetch
            // Poll every 3 seconds like in UsageTrack
            intervalId = setInterval(fetchUsageData, 3000);
        }

        return () => {
            if (intervalId) clearInterval(intervalId);
        };
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, fieldName: string) => {
        if (limitReached) return;
        setFormData({
            ...formData,
            [fieldName]: e.target.value,
        });
    };

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (limitReached || loading) return;
        userFormInput(formData);
    };

    if (!selectedTemplate) {
        return <div className="text-red-500">Template not found.</div>;
    }

    const usagePercentage = Math.min(Math.round((totalChars / CHAR_LIMIT) * 100), 100);

    return (
        <div className="p-4 bg-white rounded shadow mb-6">
            <div className="flex items-center gap-3 mb-3">
                <Image src={selectedTemplate.icon} alt={selectedTemplate.name} width={48} height={48} />
                <div>
                    <h2 className="text-lg font-semibold">{selectedTemplate.name}</h2>
                    <p className="text-sm text-gray-600">{selectedTemplate.desc}</p>
                </div>
            </div>



            <form onSubmit={onSubmit} className="space-y-4">
                {selectedTemplate.form && selectedTemplate.form.length > 0 ? (
                    selectedTemplate.form.map((field, index) => (
                        <div key={index}>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                {field.label}
                                {field.required && <span className="text-red-500">*</span>}
                            </label>
                            {field.field === 'textarea' ? (
                                <Textarea
                                    required={field.required && !limitReached}
                                    name={field.name}
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(e, field.name)}
                                    className="w-full"
                                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                                    disabled={limitReached || loading}
                                />
                            ) : (
                                <input
                                    required={field.required && !limitReached}
                                    name={field.name}
                                    type="text"
                                    value={formData[field.name] || ''}
                                    onChange={(e) => handleChange(e, field.name)}
                                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                                    disabled={limitReached || loading}
                                />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No form fields available for this template.</p>
                )}

                {/* Only show submit button if limit not reached */}
                {!limitReached ? (
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded-md transition-colors w-full ${loading
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-green-600 text-white hover:bg-green-700'
                            }`}
                        disabled={loading}
                    >
                        <div className="flex items-center justify-center gap-2">
                            {loading && <Loader2Icon className='animate-spin' />}
                            Generate Content
                        </div>
                    </button>
                ) : (
                    <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200 text-center">
                        <h3 className="font-bold text-red-600">Character Limit Reached</h3>
                        <p className="text-sm text-red-500 mt-1">
                            You've used all {CHAR_LIMIT.toLocaleString()} characters in your plan.
                        </p>
                        <button
                            type="button"
                            className="mt-3 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                            onClick={() => {
                                // Add your upgrade logic here
                                alert('Redirect to upgrade page');
                            }}
                        >
                            Upgrade Plan
                        </button>
                    </div>
                )}
            </form>
        </div>
    );
};

export default FormSection;