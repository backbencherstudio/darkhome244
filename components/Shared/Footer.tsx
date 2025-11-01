"use client"
import React, { useState } from 'react';
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import FacebookIcon from '../Icons/FacebookIcon';
import InstaIcon from '../Icons/InstaIcon';
import TwitterIcon from '../Icons/TwiterIcon';
import LinkedinIcon from '../Icons/LinkedinIcon';

export default function Footer() {
    const [email, setEmail] = useState('');

    const navigationItems = [
        { title: 'Home', href: '#' },
        { title: 'Forecast', href: '#' },
        { title: 'Radar & Maps', href: '#' }
    ];

    const weatherItems = [
        { title: 'Severe Weather', href: '#' },
        { title: 'Health & Activities', href: '#' },
        { title: 'News & Media', href: '#' }
    ];

    const legalItems = [
        { title: 'Terms of Use', href: '#' },
        { title: 'Privacy Policy', href: '#' },
        { title: 'Legal Notice', href: '#' }
    ];

    const socialLinks = [
        { icon: <FacebookIcon />, href: '#', name: 'Facebook' },
        { icon: <InstaIcon />, href: '#', name: 'Instagram' },
        { icon: <TwitterIcon />, href: '#', name: 'Twitter' },
        { icon: <LinkedinIcon />, href: '#', name: 'LinkedIn' }
    ];

    const handleSubscribe = () => {
        if (email.trim()) {
            // console.log('Subscribed with email:', email);
            setEmail('');
        }
    };

    return (
        <div className='lg:py-10 py-8 bg-black '>
            <div className='maxContainer relative'>
                {/* Newsletter Section */}
                <div className=''>
                    <div className='flex flex-col lg:flex-row lg:items-center lg:justify-between py-8  gap-4 lg:gap-0 shadow-[0 20px 60px -6px rgba(77, 101, 137, 0.20)] rounded-[4px] border-b-[.5px] border-b-[#FFFFFF33]'>
                        <h2 className='text-white md:text-[32px] text-[28px] font-bold leading-[130%] py-[3px]'>
                            Join to Our Newsletter
                        </h2>
                        <div className='relative'>
                            <input
                                type="email"
                                placeholder="Enter Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className='flex-1 md:py-[21.5px] py-4 md:pl-6 pl-4 rounded-[4px] shadow-md  bg-white text-[#777980] md:text-base text-xs font-light leading-[130%] placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 lg:w-[474px] w-full'
                            />
                            <button
                                onClick={handleSubscribe}
                                className='absolute text-white right-3  top-1/2 -translate-y-1/2  md:px-6 px-4 py-2 md:py-3 rounded-[2px] leading-[100%] font-semibold md:text-base text-sm bg-[#0080C4] '
                            >
                                Subscribe
                            </button>
                        </div>
                    </div>


                </div>

                {/* Main Footer Content */}
                <div className='grid grid-cols-1 md:grid-cols-3 border-b-[.5px] border-b-[#FFFFFF33] pb-6 md:pb-0'>
                    {/* Brand Section */}
                    <div className='lg:col-span-1 flex flex-col py-[32px] md:max-w-[298px]'>
                        <div className='flex items-center '>
                            <img src="/weather-logo.png" alt="Logo" className='w-[62] h-[62px]' />
                        </div>
                        <p className='text-[#f2f2f2] md:text-base text-sm leading-[162%] '>
                            Stay Informed with Real-Time Tides & Weather Updates
                        </p>

                        {/* Social Links */}
                        <div className='flex gap-6 mt-4'>
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    className='  rounded-full flex items-center justify-center transition-colors duration-200'
                                    aria-label={social.name}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Navigation Links */}
                    <div className='flex md:justify-center'>
                        <ul className='flex flex-col gap-4  justify-center h-full'>
                            {navigationItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className='text-[#f2f2f2] md:text-xl text-base hover:text-white transition-colors duration-200 leading-[100%]'
                                    >
                                        {item.title}
                                    </a>
                            ))}
                        </ul>
                    </div>

                    {/* Weather Links */}
                    <div className='flex md:justify-center mt-6 md:mt-0'>
                        <ul className='flex flex-col gap-4  justify-center h-full'>
                            {weatherItems.map((item, index) => (
                                    <a key={index}
                                        href={item.href}
                                        className='text-[#f2f2f2] md:text-xl text-base hover:text-white transition-colors duration-200 leading-[100%]'
                                    >
                                        {item.title}
                                    </a>
                            ))}
                        </ul>
                    </div>


                </div>

                {/* Bottom Section */}
                <div className='mt-6 '>
                    <div className='flex flex-col gap-4 md:flex-row md:items-center md:justify-between'>
                        <p className='text-[#F2F2F2] md:text-base text-sm leading-[100%] '>
                            Copyright © 2021 ar-shakir.com
                        </p>

                        <div className='flex flex-wrap gap-4 '>
                            {legalItems.map((item, index) => (
                                <a
                                    key={index}
                                    href={item.href}
                                    className='text-[#F2F2F2] md:text-base text-sm hover:text-gray-300 transition-colors duration-200 leading-[100%]'
                                >
                                    {item.title}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            <div className='absolute top-0 left-0 '>
                <img src="/footer-bg-shadow-left.png" alt="Decoration" className='w-full h-full' />
            </div>
            <div className='absolute top-0 right-0  '>
                <img src="/footer-bg-shadow-right.png" alt="Decoration" className='w-full h-full' />
            </div>
            </div>
        </div>
    );
}