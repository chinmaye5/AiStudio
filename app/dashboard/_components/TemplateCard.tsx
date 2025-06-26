import React from 'react'
import Image from 'next/image'
import { TEMPLATE } from './TemplateListSection'
import Link from 'next/link'

const TemplateCard = (item: TEMPLATE) => {
    return (
        <Link href={'/dashboard/content/' + item.slug} >
            <div className="group bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md hover:border-green-200 transition-all duration-300 cursor-pointer overflow-hidden">
                {/* Card Header */}
                <div className="p-6 pb-4">
                    <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-xl mb-4 group-hover:from-green-100 group-hover:to-green-200 transition-all duration-300">
                        <Image
                            src={item.icon}
                            alt={item.name}
                            width={32}
                            height={32}
                            className="object-contain"
                        />
                    </div>

                    {/* Category Badge */}
                    <div className="mb-3">
                        <span className="inline-block px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-full">
                            {item.category}
                        </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-800 transition-colors duration-200">
                        {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                        {item.desc}
                    </p>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6">
                    <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                        <div className="flex items-center space-x-2">
                            {item.form && item.form.length > 0 && (
                                <span className="text-xs text-gray-500">
                                    {item.form.length} field{item.form.length > 1 ? 's' : ''}
                                </span>
                            )}
                        </div>
                        <div className="w-2 h-2 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                    </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            </div>
        </Link>
    )
}

export default TemplateCard