"use client";
import Link from "next/link";
import { FaLightbulb, FaChartLine, FaShieldAlt, FaMagic, FaStar, FaRegSmile } from "react-icons/fa";
import { FiZap, FiClock, FiLock } from "react-icons/fi";
import { ArrowLeft } from "lucide-react";

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

function Header() {
  return (
    <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">AI Studio</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="#features" className="text-gray-700 hover:text-green-600 transition">Features</Link>
          <Link href="#pricing" className="text-gray-700 hover:text-green-600 transition">Pricing</Link>
          <Link href="#testimonials" className="text-gray-700 hover:text-green-600 transition">Testimonials</Link>
        </nav>
        <div className="flex gap-4">
          <Link
            href="/dashboard"
            className="px-4 py-2 text-gray-700 hover:text-green-600 transition"
          >
            Sign In
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="py-24 bg-gradient-to-br from-green-50 to-green-100">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Supercharge Your Content <span className="text-green-600">with AI</span>
        </h1>
        <p className="text-xl text-gray-700 mb-10 max-w-2xl mx-auto">
          Create high-quality content in seconds with our powerful AI tools. Perfect for marketers, writers, and businesses of all sizes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-lg hover:bg-green-700 transition transform hover:scale-105"
          >
            Start Generating Now
          </Link>
          <Link
            href="#pricing"
            className="px-8 py-4 bg-white text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-50 transition"
          >
            View Pricing
          </Link>
        </div>

      </div>
    </section>
  );
}

function Feature({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-start text-left gap-4 hover:shadow-md transition">
      <div className="text-green-600 text-3xl p-3 bg-green-50 rounded-full">{icon}</div>
      <h3 className="font-bold text-xl">{title}</h3>
      <p className="text-gray-600">{desc}</p>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Everything you need to create amazing content with AI
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Feature
            icon={<FaLightbulb />}
            title="Content Generation"
            desc="Generate blog posts, social media content, product descriptions and more with just a few clicks."
          />
          <Feature
            icon={<FaChartLine />}
            title="Performance Analytics"
            desc="Track how your generated content performs with built-in analytics."
          />
          <Feature
            icon={<FaShieldAlt />}
            title="Secure Storage"
            desc="All your generated content is securely stored and always accessible."
          />
          <Feature
            icon={<FaMagic />}
            title="Multiple Templates"
            desc="Choose from dozens of professionally designed content templates."
          />
          <Feature
            icon={<FiClock />}
            title="History Tracking"
            desc="Keep track of all your generated content with version history."
          />
          <Feature
            icon={<FiLock />}
            title="Private & Secure"
            desc="Your data remains yours alone with enterprise-grade security."
          />
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your needs. No hidden fees, cancel anytime.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-8 justify-center">
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
    </section>
  );
}

function Testimonial({ quote, name, role, avatar }: {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="flex gap-1 mb-4 text-yellow-400">
        {[...Array(5)].map((_, i) => <FaStar key={i} />)}
      </div>
      <p className="text-gray-700 italic mb-6">"{quote}"</p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
          <FaRegSmile className="text-gray-500 text-xl" />
        </div>
        <div>
          <h4 className="font-bold">{name}</h4>
          <p className="text-gray-600 text-sm">{role}</p>
        </div>
      </div>
    </div>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our satisfied users
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Testimonial
            quote="This tool has saved me countless hours of writing. The quality of the generated content is amazing."
            name="Chidurala Manikanta"
            role="Content Marketer"
            avatar="sarah"
          />
          <Testimonial
            quote="As a business owner, I can now create professional content without hiring expensive writers."
            name="Sarvolla Druva"
            role="Business Owner"
            avatar="michael"
          />
          <Testimonial
            quote="The analytics feature helped me understand what content works best for my audience. Game changer!"
            name="Raja Likhith"
            role="Social Media Manager"
            avatar="emma"
          />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">AI Studio</h3>
            <p className="text-gray-400">
              The ultimate AI content generation platform for businesses and creators.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2">
              <li><Link href="#features" className="text-gray-400 hover:text-white transition">Features</Link></li>
              <li><Link href="#pricing" className="text-gray-400 hover:text-white transition">Pricing</Link></li>
              <li><Link href="/dashboard" className="text-gray-400 hover:text-white transition">Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">About Us</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Blog</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Careers</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Privacy</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Terms</Link></li>
              <li><Link href="/" className="text-gray-400 hover:text-white transition">Security</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p className="text-sm text-center text-gray-500 mt-8">
            &copy; {new Date().getFullYear()} <span className="font-semibold">AI Studio</span>. All rights reserved. <span className="italic">(Chinmaye HG)</span>
          </p>

        </div>
      </div>
    </footer>
  );
}

function CTA() {
  return (
    <section className="py-16 bg-green-600 text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Content?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Join thousands of creators and businesses already using AI Studio.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-white text-green-700 font-semibold rounded-lg shadow-lg hover:bg-gray-100 transition transform hover:scale-105"
          >
            Start Free Trial
          </Link>

        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}