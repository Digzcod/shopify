import Navbar from "@/app/components/_landingPage/Navbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digz | 01-Tours",
  description: "Choose your favorite tours",
};

export default function ToursLayout({
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
