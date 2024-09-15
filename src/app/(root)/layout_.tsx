"use client";

import React, { useContext, useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import NavBar from "@/components/Header/navbar";
import SideBarMenu from "@/components/custom-ui/sidebar";
import { LoaderContext, LoaderProvider } from "@/context/loaderContext";
import "@/assets/css/preloader.css";
import { CustomUser } from "@/abstract/type";
import useMediaQuery from "@/hooks/MediaQuery";
import Loader from "@/components/custom-ui/loader";

export default function RootLayoutCode({
  children,
  userdata,
}: Readonly<{
  children: React.ReactNode;
  userdata?: CustomUser;
}>) {
  const [state, setState] = useState({
    isLoggedIn: false,
    isMenuOpen: false,
    profileCard: false,
    loader: false,
    userdata: {},
    permit: false,
    dataFetched: false,
    isLoading: false,
    isSideBarRendered: false,
  });
  const { setLoading } = useContext(LoaderContext);
  const isMobile = useMediaQuery("(max-width: 640px)");
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      setState((prevState) => ({ ...prevState, userdata: userdata! }));
    };

    fetchUserData().then(() => {});
  }, [router, userdata]);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      isMenuOpen: !isMobile,
    }));
  }, [isMobile]);

  useEffect(() => {
    document.querySelectorAll(".menu-link").forEach((element) => {
      element.addEventListener("click", () => {
        setLoading(true);
      });
    });
  });

  const memoizedSideBarMenu = useMemo(
    () => (
      <SideBarMenu
        isMenuOpen={state.isMenuOpen}
        userdata={state.userdata}
        setIsMenuOpen={(value) =>
          setState((prevState) => ({
            ...prevState,
            isMenuOpen: value === true,
          }))
        }
      />
    ),
    [state.isMenuOpen, state.userdata]
  );

  return (
    <LoaderProvider
      value={{
        loader: state.loader,
        setLoading: (value) =>
          setState((prevState) => ({ ...prevState, loader: value })),
      }}
    >
      <Loader />
      <div className="bg-white">
        <NavBar
          isMenuOpen={state.isMenuOpen}
          setIsMenuOpen={(value) =>
            setState((prevState) => ({
              ...prevState,
              isMenuOpen: value === true,
            }))
          }
          profileCard={state.profileCard}
          setProfileCard={(value) =>
            setState((prevState) => ({
              ...prevState,
              profileCard: value === true,
            }))
          }
          userdata={state.userdata}
        />
        {memoizedSideBarMenu}
        <div
          className={`text-primary transition-all duration-300 p-6 relative h-[calc(100vh-4rem)] overflow-auto ${
            state.isMenuOpen && !isMobile
              ? "ms-64 w-[calc(100%-16rem)]"
              : "ms-0"
          }`}
        >
          <>{children}</>
        </div>
      </div>
    </LoaderProvider>
  );
}
