import React from "react";
import Link from "next/link";
import { Drawer, useMediaQuery } from "@mui/material";
import { VscChromeClose } from "react-icons/vsc";
import { AiTwotoneHome } from "react-icons/ai";
import { usePathname } from "next/navigation";
import styles from "classnames";
import { PiTestTubeFill, PiCodepenLogoLight } from "react-icons/pi";
import useNavbar from "@/app/hooks/_navbar/useNavbar";



const links = [
  {
    name: "home",
    path: "/",
    icon: <AiTwotoneHome className="text-2xl font-semibold" />,
  },
  {
    name: "components",
    path: "/components",
    icon: <PiCodepenLogoLight className=" text-2xl font-semibold" />,
  },
  {
    name: "lab",
    path: "/lab",
    icon: <PiTestTubeFill className=" text-2xl font-semibold " />,
  },
];

export default function MobileDrawer() {
  const currentPath = usePathname();
  const forBigScreen = useMediaQuery("(min-width: 640px)");
  const {theme, darkMode, lightMode , isDrawerOpen, handleDrawer} = useNavbar()

  if (forBigScreen) {
    return null;
  }

  return (
    <Drawer anchor="left" open={isDrawerOpen} onClose={handleDrawer} variant="permanent">
      <section
        className={styles({
          "h-screen": true,
          "bg-slate-100 text-zinc-700": theme === lightMode,
          "bg-black text-gray-50": theme === darkMode,
          "sm:hidden": true,
        })}
      >
        <div className="flex items-center justify-end w-screen px-[1rem] py-[2rem] border-b-2 shadow-lg">
          <button onClick={handleDrawer}>
            <VscChromeClose className="text-[2.5rem] font-[900]/" />
          </button>
        </div>

        <div className="px-2">
          {links.map((link, index) => (
            <Link href={link.path} key={index}>
              <div
                onClick={handleDrawer}
                className={styles({
                  "flex justify-start py-3 md:py-[2rem] capitalize w-full items-center transition-colors pl-[1rem]":
                    true,
                  "border-b-[1px] w-full space-x-3 ": true,

                  "bg-green-300 hover:bg-green-300 text-black":
                    currentPath === link.path && theme === "corporate",
                  "  hover:text-zinc-600":
                    currentPath === link.path && theme === "dracula",
                  "hover:bg-green-200": true && theme === "corporate",
                  "hover:bg-slate-100  hover:text-black":
                    true && theme === "dracula",
                })}
              >
                <span>{link.icon}</span>
                <span className=" text-[1.2rem]">{link.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Drawer>
  );
}
