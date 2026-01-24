import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import Button from "../Button";
import gsap from "gsap";
import data from "../../data/portfolio.json";

const NavLink = ({ href, label, isActive, onClick }) => {
  const linkRef = useRef(null);
  const underlineRef = useRef(null);

  const handleMouseEnter = () => {
    if (linkRef.current) {
      gsap.to(linkRef.current, {
        y: -2,
        scale: 1.05,
        duration: 0.25,
        ease: "power2.out",
      });
    }
    if (underlineRef.current && !isActive) {
      gsap.to(underlineRef.current, {
        scaleX: 1,
        opacity: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
  };

  const handleMouseLeave = () => {
    if (linkRef.current) {
      gsap.to(linkRef.current, {
        y: 0,
        scale: 1,
        duration: 0.25,
        ease: "power2.out",
      });
    }
    if (underlineRef.current && !isActive) {
      gsap.to(underlineRef.current, {
        scaleX: 0,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
      });
    }
  };

  const handleMouseDown = () => {
    if (linkRef.current) {
      gsap.to(linkRef.current, {
        scale: 0.92,
        y: 1,
        duration: 0.1,
        ease: "power2.in",
      });
    }
  };

  const handleMouseUp = () => {
    if (linkRef.current) {
      gsap.to(linkRef.current, {
        scale: 1.05,
        y: -2,
        duration: 0.2,
        ease: "back.out(2)",
      });
    }
  };

  return (
    <button
      ref={linkRef}
      type="button"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      className="relative text-sm tablet:text-base px-3 py-2 mx-0.5 rounded-lg cursor-pointer"
      style={{ willChange: "transform" }}
    >
      <span
        className={
          isActive
            ? "bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent font-semibold"
            : "text-navy-700 dark:text-navy-200 font-medium"
        }
      >
        {label}
      </span>
      <span
        ref={underlineRef}
        className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full origin-left"
        style={{ transform: "scaleX(0)", opacity: 0 }}
      />
      {isActive && (
        <span className="absolute bottom-1 left-3 right-3 h-0.5 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full" />
      )}
    </button>
  );
};

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, socials } = data;

  const emailSocial = socials.find(s => s.title === "Email");
  const emailLink = emailSocial ? emailSocial.link : "mailto:hello@example.com";

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      <Popover className="block tablet:hidden mt-5">
        {({ open }) => (
          <>
            <div className="flex items-center justify-between p-2 laptop:p-0">
              <h1
                onClick={() => router.push("/")}
                className="font-semibold p-2 laptop:p-0 link text-navy-900 dark:text-white"
              >
                {name}
              </h1>

              <div className="flex items-center">
                {data.darkMode && (
                  <Button
                    onClick={() =>
                      setTheme(theme === "dark" ? "light" : "dark")
                    }
                  >
                    <img
                      className="h-6"
                      src={`/images/${
                        theme === "dark" ? "moon.svg" : "sun.svg"
                      }`}
                    ></img>
                  </Button>
                )}

                <Popover.Button>
                  <img
                    className="h-5"
                    src={`/images/${
                      !open
                        ? theme === "dark"
                          ? "menu-white.svg"
                          : "menu.svg"
                        : theme === "light"
                        ? "cancel.svg"
                        : "cancel-white.svg"
                    }`}
                  ></img>
                </Popover.Button>
              </div>
            </div>
            <Popover.Panel
              className={`absolute right-0 z-10 w-11/12 p-4 ${
                theme === "dark" ? "bg-navy-800" : "bg-white"
              } shadow-md rounded-md`}
            >
              <div className="grid grid-cols-1">
                <Button onClick={() => router.push("/projects")}>Projects</Button>
                <Button onClick={() => router.push("/about")}>About</Button>
                {showBlog && (
                  <Button onClick={() => router.push("/research")}>Posts</Button>
                )}
                <Button onClick={() => window.open(emailLink)}>
                  Contact
                </Button>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>
      <div
        className="mt-10 hidden items-center justify-center sticky top-0 z-10 tablet:flex py-3 border-b border-navy-200/60 dark:border-navy-700/60 backdrop-blur-sm bg-white/80 dark:bg-navy-900/80"
      >
        <div className="flex items-center gap-0.5 text-navy-800 dark:text-navy-100">
          <span
            onClick={() => router.push("/")}
            className="font-semibold cursor-pointer mr-4 text-navy-900 dark:text-white hover:opacity-80 transition-opacity duration-200"
          >
            {name}
          </span>
          <NavLink
            href="/projects"
            label="Projects"
            isActive={router.pathname === "/projects"}
            onClick={() => router.push("/projects")}
          />
          <NavLink
            href="/about"
            label="About"
            isActive={router.pathname === "/about"}
            onClick={() => router.push("/about")}
          />
          {showBlog && (
            <NavLink
              href="/research"
              label="Posts"
              isActive={router.pathname === "/research"}
              onClick={() => router.push("/research")}
            />
          )}
          <NavLink
            label="Contact"
            isActive={false}
            onClick={() => window.open(emailLink)}
          />
          {mounted && theme && data.darkMode && (
            <button
              type="button"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 ml-1 rounded-lg hover:bg-navy-100 dark:hover:bg-navy-700 transition-colors duration-200"
            >
              <img
                className="h-5"
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
              ></img>
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
