"use client";

import { useState } from "react";

const faqs = [
    {
        question: "Do you ship internationally?",
        answer: "Currently, we only ship within the continental United States. We are working hard on the logistics to bring our plants worldwide!"
    },
    {
        question: "What is your return policy?",
        answer: "We guarantee our plants for 14 days after delivery. If your plant arrives damaged or dies within window despite proper care, we will replace it for free."
    },
    {
        question: "How do I know how much to water my plant?",
        answer: "Each plant comes with a detailed care card outlining its specific light and water needs. As a general rule, it's usually better to underwater than overwater!"
    },
    {
        question: "Do you offer pet-safe plants?",
        answer: "Yes! You can browse our 'Pet-Friendly' category to find plants that are 100% non-toxic to cats and dogs."
    },
    {
        question: "Can I cancel or change my order?",
        answer: "We process orders very quickly. If you need to make a change, please contact us within 2 hours of placing the order."
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="bg-slate-50 min-h-[70vh] py-16 px-6">
            <div className="max-w-3xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">Frequently Asked Questions</h1>
                    <p className="text-slate-500 font-medium">Have questions? We're here to help.</p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`bg-white border rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === index ? 'border-green-300 shadow-md ring-1 ring-green-100' : 'border-slate-200 shadow-sm hover:border-slate-300'}`}
                        >
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                            >
                                <span className={`font-bold transition-colors ${openIndex === index ? 'text-green-800' : 'text-slate-800'}`}>
                                    {faq.question}
                                </span>
                                <span className={`text-slate-400 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </span>
                            </button>

                            <div
                                className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}
                            >
                                <p className="text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                                    {faq.answer}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <p className="text-slate-500 mb-4">Still have questions?</p>
                    <a href="/contact" className="inline-block bg-slate-900 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-xl transition shadow-sm">
                        Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
