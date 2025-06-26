import Templates from '@/app/(data)/Templates'
import React from 'react'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
    name: string,
    desc: string,
    icon: string,
    category: string,
    slug: string,
    aiPrompt: string,
    form?: form[]
}

export interface form {
    label: string,
    field: string,
    name: string,
    required?: boolean
}

const TemplateListSection = ({ searchQuery }: { searchQuery: string }) => {
    const filteredTemplates = Templates.filter((template: TEMPLATE) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template, index) => (
                    <TemplateCard key={index} {...template} />
                ))
            ) : (
                <p className="text-center text-gray-500 col-span-full">No templates found.</p>
            )}
        </div>
    );
};

export default TemplateListSection