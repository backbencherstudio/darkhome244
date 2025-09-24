"use client";
import React, { useState } from "react";
import { Menu, X, Search, User, SearchIcon, UserIcon } from "lucide-react";

import Link from "next/link";

import Image from "next/image";
import { usePathname } from "next/navigation";


const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const pathName = usePathname();


    const navigationLinks = [
        {
            label: "Home",
            href: "/",
        },
        {
            label: "Forecast",
            href: "/forecast",
            hasDropdown: false,
            //   hasDropdown: true,
            //   dropdownContent: [
            //     { category: "Bridles", href: "/tack/bridles" },
            //     { category: "Reins", href: "/tack/reins" },
            //     { category: "Martingales", href: "/tack/breastplates" },
            //     { category: "Girths", href: "/tack/girths" },
            //     { category: "Halters & Ropes", href: "/tack/halters-and-ropes" },
            //     { category: "Boots", href: "/tack/boots" },
            //     { category: "Leather Care", href: "/tack/leather-care" },
            //     { category: "Accessories", href: "/tack/accessories" },
            //   ],
        },
        {
            label: "Radar & Maps",
            href: "#",
        },
        { label: "Severe Weather", href: "#" },
        { label: "Marine", href: "/find-us" },
        { label: "Health & Activities", href: "/find-us" },
        { label: "News & Media", href: "/find-us" },
    ];

    // Left side options

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <nav className="bg-white lg:py-[10px]">
            <div className="maxContainer">
                <div className="flex justify-between lg:gap-6 gap-0 items-center ">
                    {/* Logo */}
                    <div className="">
                        <div className="w-[72px] h-[72px]">
                            <Link href="/">
                                <Image
                                    src="/weather-logo.png"
                                    alt="Logo"
                                    width={156}
                                    height={56}
                                />
                            </Link>
                        </div>
                    </div>
                    <div className="hidden lg:flex items-center lg:gap-3 gap-2">
                        {navigationLinks?.map((link, index) => {
                            const isActive = pathName === link.href;

                            return (
                                <div key={index}>
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className={`py-1 px-3 ${isActive ? "text-[#0080C4]" : "text-[#4A4C56] hover:text-[#0080C4] hover:font-semibold"}  leading-[130%] lg:text-base text-sm font-normal`}
                                    >
                                        {link.label}
                                    </Link>
                                    {/* Mobile Logo (visible on mobile/tablet) */}
                                    <div className="lg:hidden">
                                        <div className="">
                                            <div className="w-[72px] h-[72px]">
                                                <Link href="/">
                                                    <Image
                                                        src="/weather-logo.png"
                                                        alt="Logo"
                                                        width={156}
                                                        height={56}
                                                    />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="lg:hidden flex items-center md:space-x-4 space-x-2">
                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMenu}
                            className=" p-2 hover:bg-gray-100 rounded-full transition-colors"
                        >
                            {isMenuOpen ? (
                                <X className="w-5 h-5 text-gray-600" />
                            ) : (
                                <Menu className="w-5 h-5 text-gray-600" />
                            )}
                        </button>
                    </div>




                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 py-4">
                        <div className="flex flex-col space-y-4">

                            {/* Mobile navigation links */}
                            <div className="flex flex-col space-y-4 ">
                                {navigationLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        href={link.href}
                                        className="textPrimary hover:font-semibold leading-[100%]  text-sm font-normal"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;
