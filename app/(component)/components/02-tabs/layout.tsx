import Navbar from "@/app/components/_landingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digz | 02-Tabs",
  description: "Choose your favorite tours",
};

export default function TabsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {children}
    </section>
  );
}
