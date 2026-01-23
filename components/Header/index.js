import { Popover } from "@headlessui/react";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Button from "../Button";
// Local Data
import data from "../../data/portfolio.json";

const Header = () => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const { name, showBlog, showResume, socials } = data;

  // Find email from socials
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
                {showResume && (
                  <Button onClick={() => router.push("/resume")}>Resume</Button>
                )}
                <Button
                  onClick={() => window.open(emailLink)}
                >
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
        <div className="flex items-center gap-1 text-navy-800 dark:text-navy-100">
          <span
            onClick={() => router.push("/")}
            className="font-semibold cursor-pointer mr-4 text-navy-900 dark:text-white"
          >
            {name}
          </span>
          <Button onClick={() => router.push("/projects")}>Projects</Button>
          <Button onClick={() => router.push("/about")}>About</Button>
          {showBlog && (
            <Button onClick={() => router.push("/research")}>Posts</Button>
          )}
          {showResume && (
            <Button onClick={() => router.push("/resume")}>
              Resume
            </Button>
          )}
          <Button onClick={() => window.open(emailLink)}>
            Contact
          </Button>
          {mounted && theme && data.darkMode && (
            <Button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <img
                className="h-6"
                src={`/images/${theme === "dark" ? "moon.svg" : "sun.svg"}`}
              ></img>
            </Button>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
