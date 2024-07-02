'use client'
import LandingPage from "./components/_landingPage/LandingPage";
import CarouselContainer from "./components/_carousel/CarouselContainer";
import useNavbar from "./hooks/_navbar/useNavbar";


export default function Home() {
const {initialLoad} = useNavbar()

  return initialLoad ? null : (
    <>
      <main className="py-[3rem] px-[3rem] w-auto">
        <LandingPage />
        <CarouselContainer />
      </main>
    </>
  );
}


