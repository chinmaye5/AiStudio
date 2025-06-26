'use client';
import React from 'react'
import { useState } from 'react'

import { SearchSection } from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'

const Dashboard = () => {
    const [searchQuery, setSearchQuery] = useState('');

    return (
        <div className="p-6">
            <SearchSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <TemplateListSection searchQuery={searchQuery} />
        </div>
    );
}

export default Dashboard
