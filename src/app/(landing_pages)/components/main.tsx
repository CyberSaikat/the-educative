import LogoCarousel from "@/components/logos/LogoCarousel";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function MainSec() {
  return (
    <>
      <main className="container">
        <div className="gap-8 p-0 xl:p-8 mt-[140px] md:pb-0 xl:mt-[200px] md:flex md:justify-center md:items-center">
          <div className="w-full h-auto flex flex-col items-center justify-center p-4">
            <h1 className="text-2xl md:text-6xl xl:text-7xl font-bold mb-3 xl:mb-8 text-center">
              Welcome to <span className="text-accent"> The Educative</span>.
            </h1>
            <span
              className={`text-justify block xl:text-[20px] w-full md:w-[80%] text-[14px]`}
            >
              Your one-stop resource for all things computer science! At The
              Educative. we provide the best courses for you to learn and grow.
            </span>
            <div className="flex mt-3">
              <Link
                className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 ml-4 rounded-sm bg-accent ring-1 ring-accent shadow-md shadow-accent hover:bg-[var(--primary)!important] transition-all duration-500 ease-in-out text-[16px] px-4"
                href={"/register"}
              >
                Get Started
              </Link>
              <Button className="ml-4 bg-primary ring-1 ring-accent shadow-md shadow-accent hover:bg-accent transition-all duration-500 ease-in-out text-[16px] xl:text-[20px] p-4">
                Learn More
              </Button>
            </div>
            <div className="md:w-[70%] w-full">
              <LogoCarousel />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
