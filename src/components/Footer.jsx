import React from 'react';
import QantasLogo from '../assets/logos/qantas.svg';

const socialIcons = {
    facebook: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
        </svg>
    ),
    x: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
    ),
    linkedin: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a2.7 2.7 0 0 0-2.7-2.7c-1.5 0-2.7 1.2-2.7 2.7v5.3H10.4v-8.4h2.7v1.1c.4-.7 1.2-1.1 2.1-1.1s3.7 1.4 3.7 4.2v4.2h-2.7M7.2 9.4c.9 0 1.6-.7 1.6-1.6s-.7-1.6-1.6-1.6-1.6.7-1.6 1.6.7 1.6 1.6 1.6m1.4 9.1v-8.4H5.8v8.4h2.8z" />
        </svg>
    ),
    tiktok: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.6-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.02-2.86-.31-4.13-1.03-2.28-1.29-3.6-3.89-3.34-6.5.12-1.17.52-2.32 1.22-3.28 1.18-1.58 3.1-2.56 5.06-2.53.35 0 .69.05 1.03.12.01-1.31 0-2.62.01-3.93-.84-.15-1.7-.16-2.54.02-2.47.53-4.5 2.45-5.22 4.9-.32 1.08-.34 2.22-.11 3.32.4 1.96 1.61 3.73 3.34 4.72 1.14.65 2.45.91 3.76.81 1.68-.13 3.28-.97 4.31-2.32.61-.8.96-1.78.99-2.77.01-2.18.01-4.36 0-6.55z" />
        </svg>
    ),
    instagram: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8A3.6 3.6 0 0 0 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6A3.6 3.6 0 0 0 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
        </svg>
    ),
    youtube: (
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 15V9l5.2 3L10 15m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
        </svg>
    )
};

export default function Footer() {
    return (
        <footer className="w-full bg-[#f3f3f3] text-[#323232] pt-12 font-sans border-t border-gray-200">
            <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
                    <div className="lg:col-span-1">
                        <img src={QantasLogo} alt="Qantas" className="h-8 mb-6" />
                    </div>

                    <div>
                        <h4 className="font-bold text-[15px] mb-5 tracking-tight">About us</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">About Qantas</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">oneworld</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">News Room</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Qantas Group Pilot Academy</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[15px] mb-5 tracking-tight">Qantas Group</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">About Qantas Group</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Careers</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[15px] mb-5 tracking-tight">Support</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Help & support</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Contact us</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Travel credits</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Specific needs</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-[15px] mb-5 tracking-tight">Qantas App</h4>
                        <ul className="space-y-4 text-[#666] text-[14px]">
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Qantas App iOS</li>
                            <li className="hover:text-[#E40000] cursor-pointer transition-colors">Qantas App Android</li>
                        </ul>
                    </div>
                </div>

                <div className="mb-12">
                    <h4 className="font-bold text-[15px] mb-5 tracking-tight">Connect with us</h4>
                    <div className="flex space-x-4 text-[#323232]">
                        {Object.entries(socialIcons).map(([key, icon]) => (
                            <button key={key} className="hover:text-[#E40000] transition-colors p-1 -ml-1">
                                {icon}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="border-t border-gray-300 pt-8 pb-12 flex flex-col lg:flex-row justify-between items-start lg:items-center text-[#666] text-[13px]">
                    <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4 lg:mb-0">
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Privacy & security</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Terms of Use</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Conditions of Carriage</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Modern Slavery Act Statement (PDF)</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Reconciliation Action Plan</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Access & Inclusion Plan</span>
                        <span className="hover:text-[#E40000] hover:underline cursor-pointer">Fare types</span>
                    </div>
                    <div className="text-right whitespace-nowrap">
                        © Qantas Airways Limited ABN 16 009 661 901
                    </div>
                </div>
            </div>

            <div className="bg-[#e6e6e6] py-6 border-t border-gray-300">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 xl:px-8">
                    <p className="text-[13px] text-[#323232] font-semibold">
                        Qantas would like to acknowledge the Traditional Custodians of the local lands and waterways on which we live, work and fly. We pay our respects to Elders past and present.
                    </p>
                </div>
            </div>
        </footer>
    );
}
