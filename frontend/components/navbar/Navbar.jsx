import React from "react";
import { useState } from "react";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import "flowbite";
import Musicpng from "../../public/assets/music logo.png";
import Image from "next/image";
import ProfileImage from "../../public/assets/2.png";
import SearchModal from "./SearchModal";

const Navbar = () => {
  return (
    <div className="full_nav_body">
      <nav className="fixed top-0 z-50 w-full border-b border-gray-200 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center justify-start flex-grow">
              <a href="https://mixtape.luvnft.com" className="flex ml-2 md:mr-24">
                <Image
                  src={Musicpng}
                  className="AudioAlley_logo"
                  alt="AudioAlley Logo"
                />
                <span className="self-center text-sm font-semibold AudioAlley sm:text-base whitespace-nowrap dark:text-white">
                  MIXTAPE.ATL5D
                </span>
              </a>
            </div>
            <div className="flex items-center nav_ConnectButton_show">
              <ConnectButton
                accountStatus={{
                  smallScreen: "full",
                  largeScreen: "full",
                }}
              />
              <div className="flex items-center ml-3 nav_profile_image">
                <button
                  type="button"
                  className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                  aria-expanded="false"
                >
                  <span className="sr-only">Open user menu</span>
                  <a href="/profile">
                    <Image
                      className="w-8 h-8 rounded-full"
                      src={ProfileImage}
                      alt="user photo"
                    />
                  </a>
                </button>
                <SearchModal />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full border-r border-gray-200 nav_dropdown_bg sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
        suppressHydrationWarning
      >
        <div className="h-full px-8 pb-4 overflow-y-auto bg-black ">
          <ul className="space-y-5 nav_ul">
            <li>
              <a
                href="/"
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white "
              >
                <span className="ml-3"> Home</span>
              </a>
            </li>
            <li>
              <a
                href="/my-items"
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Dashboard
                </span>
              </a>
            </li>
            <li>
              <a
                href="/marketplace"
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Marketplace
                </span>
              </a>
            </li>
            <li>
              <a
                href="/upload"
                className="flex items-center p-2 text-base font-normal rounded-lg dark:text-white "
              >
                <span className="flex-1 ml-3 whitespace-nowrap">
                  Upload Music
                </span>
              </a>
            </li>
            <li className="nav_SearchModal_li">
              <SearchModal />
            </li>
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
