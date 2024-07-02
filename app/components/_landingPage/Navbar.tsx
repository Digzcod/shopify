"use client";
import React, { memo } from "react";
import { AiTwotoneHome } from "react-icons/ai";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Link from "next/link";
import classnames from "classnames";
import { BiMenu } from "react-icons/bi";
import useNavbar from "@/app/hooks/_navbar/useNavbar";
import MobileDrawer from "./MobileDrawer";
import { PiTestTubeFill, PiCodepenLogoLight } from "react-icons/pi";

const Navbar = () => {
const {
  theme,
  themeMenu,
  currentPath,
  handleThemeChange,
  handleOpen,
  lightMode,
  darkMode,
  isDrawerOpen,
  handleDrawer
} = useNavbar()

  return (
    <nav className="navbar shadow-md h-[5rem] font-medium flex sm:justify-evenly sm:space-x-3 sm:py-4 z-30 w-auto px-[1.5erm] sm:px-0">
      <BiMenu
        className={classnames({
          "text-[2.7rem] sm:hidden": true,
          "text-bg-zinc-800 font-semibold": theme === lightMode,
          "text-bg-zinc-50 font-semibold": theme === darkMode,
        })}
        onClick={handleDrawer}
      />

      <ul className="space-x-[1.5rem] capitalize hidden sm:flex mr-auto ">
        {links.map(({ name, path, icon }) => (
          <Link
            href={path}
            key={name}
            className={classnames({
              "text-green-500": currentPath === path,
              "transition-colors flex items-center px-[1rem] space-x-2": true,
              "hover:font-[500]": true,
            })}
          >
            <span>{icon}</span>
            <span className="text-[1.3rem]">{name}</span>
          </Link>
        ))}
      </ul>

      {isDrawerOpen && <MobileDrawer/>}

      <span className="cursor-default flex ml-2 text-[1rem] md:text-lg" onClick={handleOpen}>
        {theme === "corporate" ? (
          <LightModeRoundedIcon className="mr-2" />
        ) : (
          <DarkModeIcon className="mr-2" />
        )}
        Appearance
      </span>
      {themeMenu && (
        <div className="absolute sm:right-10 md:right-[15%] lg:right-[25%] top-[5rem] mt-2 w-auto rounded-md shadow-lg ring-1 ring-black ring-opacity-5 cursor-default">
          <div
            className="px-5 py-3"
          >
            <div className="flex items-center pb-3">
              <input
                type="radio"
                id="lightTheme"
                name="themes"
                value="corporate"
                checked={theme === "corporate"}
                onChange={handleThemeChange}
                className="mr-2"
              />
              <p>Light</p>
            </div>

            <div className="flex items-center pb-2">
              <input
                type="radio"
                id="darkTheme"
                name="themes"
                value="dark"
                checked={theme === "dark"}
                onChange={handleThemeChange}
                className="mr-2"
              />
              <p>Dark</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default memo(Navbar);

export const links = [
  {
    name: "home",
    path: "/",
    icon: <AiTwotoneHome className="text-2xl font-semibold" />,
  },
  {
    name: "components",
    path: "/components",
    icon: <PiCodepenLogoLight className=" text-2xl font-semibold " />,
  },
  {
    name: "lab",
    path: "/lab",
    icon: <PiTestTubeFill className=" text-2xl font-semibold" />,
  },
];
