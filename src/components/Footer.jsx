import React from 'react';
import QantasLogo from '../assets/logos/qantas.svg';
import fbIcon from '../assets/icons/fb.svg';
import xIcon from '../assets/icons/x.svg';
import inIcon from '../assets/icons/in.svg';
import tiktokIcon from '../assets/icons/tiktok.svg';
import instaIcon from '../assets/icons/insta.svg';
import youtubeIcon from '../assets/icons/youtube.svg';

const socialIcons = {
    facebook: <img src={fbIcon} alt="Facebook" className="w-12 h-12" />,
    x: <img src={xIcon} alt="X" className="w-12 h-12" />,
    linkedin: <img src={inIcon} alt="LinkedIn" className="w-12 h-12" />,
    tiktok: <img src={tiktokIcon} alt="TikTok" className="w-12 h-12" />,
    instagram: <img src={instaIcon} alt="Instagram" className="w-12 h-12" />,
    youtube: <img src={youtubeIcon} alt="YouTube" className="w-12 h-12" />
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
