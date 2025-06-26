import React from 'react'
import Link from 'next/link'
import { ArrowLeft, Receipt } from 'lucide-react'

const plans = [
    {
        name: "Free",
        price: "₹0",
        period: "/month",
        tokens: "100,000 tokens",
        features: [
            "Basic AI content generation",
            "Community support",
            "Limited to 100,000 tokens/month",
            "Standard queue"
        ],
        highlight: false
    },
    {
        name: "Pro",
        price: "₹10",
        period: "/month",
        tokens: "1,000,000 tokens",
        features: [
            "All Free features",
            "Priority AI processing",
            "1,000,000 tokens/month",
            "Priority support",
            "Early access to new features"
        ],
        highlight: true
    }
];

const Billing = () => {
    return (
        <div>
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
                                    <Receipt size={20} className="text-green-600" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900">
                                        Billing
                                    </h1>
                                    <p className="text-sm text-gray-600">
                                        Manage your subscription and usage
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Plans */}
            <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
                <h1 className="text-3xl font-bold mb-8 text-gray-800">Choose Your Plan</h1>
                <div className="flex flex-col md:flex-row gap-8">
                    {plans.map((plan) => (
                        <div
                            key={plan.name}
                            className={`bg-white rounded-xl shadow-md border ${plan.highlight ? 'border-green-500 ring-2 ring-green-200' : 'border-gray-200'} p-8 flex-1 max-w-xs flex flex-col items-center`}
                        >
                            <h2 className={`text-xl font-semibold mb-2 ${plan.highlight ? 'text-green-600' : 'text-gray-800'}`}>{plan.name}</h2>
                            <div className="text-4xl font-bold mb-1">{plan.price}<span className="text-base font-medium text-gray-500">{plan.period}</span></div>
                            <div className="text-sm text-gray-600 mb-4">{plan.tokens}</div>
                            <ul className="mb-6 space-y-2 text-gray-700 text-sm text-left w-full">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-center">
                                        <span className="mr-2 text-green-500">✔</span>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                            <button
                                className={`w-full py-2 rounded-lg font-semibold transition-colors ${plan.highlight
                                    ? 'bg-green-600 text-white hover:bg-green-700'
                                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                    }`}
                                disabled={!plan.highlight}
                            >
                                {plan.highlight ? 'Upgrade to Pro' : 'Current Plan'}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Billing