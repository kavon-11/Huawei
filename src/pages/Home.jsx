import React from "react";
import { Link } from "react-router-dom";
import { FaRobot, FaChartLine, FaHeadphones, FaCalendarCheck } from "react-icons/fa";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-gray-900 dark:text-gray-100 font-sans">
      {/* Hero Section */}
      <section className="relative px-6 py-20 overflow-hidden lg:py-32">
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl mb-6">
            <span className="block text-gray-900 dark:text-white">Never Miss a Call.</span>
            <span className="block text-blue-600">Your AI Receptionist is Here.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300 mb-10">
            Automate appointments, answer FAQs, and manage customer interactions 24/7 with a human-like AI voice assistant tailored for your business.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/auth"
              className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors shadow-lg text-center"
            >
              Get Started
            </Link>
            <Link
              to="/dashboard"
              className="px-8 py-3 text-lg font-semibold text-blue-600 bg-white dark:bg-slate-800 border border-blue-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors shadow-sm text-center"
            >
              View Demo
            </Link>
          </div>
        </div>
        
        {/* Abstract Background Shapes */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 opacity-30 pointer-events-none overflow-hidden">
            <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
            <div className="absolute top-20 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose Our AI?</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
              Powerful features designed to streamline your operations and enhance customer satisfaction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<FaRobot className="w-8 h-8 text-blue-500" />}
              title="Human-like Voice"
              description="Natural sounding AI that understands context, tone, and intent."
            />
            <FeatureCard
              icon={<FaCalendarCheck className="w-8 h-8 text-green-500" />}
              title="Smart Scheduling"
              description="Integrates seamlessly with Google Calendar to book appointments instantly."
            />
            <FeatureCard
              icon={<FaHeadphones className="w-8 h-8 text-purple-500" />}
              title="Live Monitoring"
              description="Listen in on active calls and take over whenever you need to."
            />
            <FeatureCard
              icon={<FaChartLine className="w-8 h-8 text-orange-500" />}
              title="Deep Analytics"
              description="Gain insights into call volume, peak times, and customer sentiment."
            />
          </div>
        </div>
      </section>

      {/* How It Works / CTA */}
      <section className="py-20 bg-gray-50 dark:bg-slate-900">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12">Ready to transform your business?</h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-12">
             <Step number="1" title="Sign Up" desc="Create your account in seconds." />
             <div className="hidden md:block w-16 h-1 bg-gray-300 dark:bg-slate-700"></div>
             <Step number="2" title="Configure" desc="Set up your business hours and FAQs." />
             <div className="hidden md:block w-16 h-1 bg-gray-300 dark:bg-slate-700"></div>
             <Step number="3" title="Go Live" desc="Forward your calls and let AI handle the rest." />
          </div>
          <Link
            to="/onBoarding"
            className="inline-block px-10 py-4 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-full hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
          >
            Start Your Free Trial
          </Link>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 bg-gray-50 dark:bg-slate-700 rounded-xl border border-gray-100 dark:border-slate-600 hover:shadow-xl transition-shadow duration-300">
      <div className="mb-4 bg-white dark:bg-slate-800 w-16 h-16 rounded-lg flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{description}</p>
    </div>
  );
}

function Step({ number, title, desc }) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center text-xl font-bold mb-4 shadow-lg">
                {number}
            </div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">{desc}</p>
        </div>
    )
}
