import React from 'react';
import SideNav from './_components/SideNav';
import Header from './_components/Header';

const layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="flex h-screen">
                {/* Sidebar */}
                <aside className="w-64 hidden md:block">
                    <SideNav />
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Header */}
                    <Header />

                    {/* Page Content */}
                    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
                        <div className="max-w-7xl mx-auto">
                            {children}
                        </div>
                    </main>
                </div>
            </div>

            {/* Mobile Sidebar (you can add a mobile menu toggle later) */}
            <div className="md:hidden">
                {/* Mobile navigation can be added here */}
            </div>
        </div>
    );
};

export default layout;