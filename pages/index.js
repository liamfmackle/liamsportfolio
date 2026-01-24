import { useRef } from "react";
import NavCard from "../components/NavCard";
import Socials from "../components/Socials";
import { useIsomorphicLayoutEffect } from "../utils";
import { stagger } from "../animations";
import Head from "next/head";

// Local Data
import data from "../data/portfolio.json";

export default function Home() {
  const nameRef = useRef();
  const taglineRef = useRef();

  useIsomorphicLayoutEffect(() => {
    stagger(
      [nameRef.current, taglineRef.current],
      { y: 15, transform: "scale(0.98)" },
      { y: 0, transform: "scale(1)" }
    );
  }, []);

  const navItems = [
    {
      title: "Projects",
      description: "Technical builds in policy tools, market analysis, and AI research",
      href: "/projects",
    },
    {
      title: "About",
      description: "Background, expertise, and focus areas",
      href: "/about",
    },
    {
      title: "Posts",
      description: "Essays and commentary on policy, markets, and technology",
      href: "/research",
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <Head>
        <title>{data.name} | Policy, Markets & Technology</title>
        <meta name="description" content="Portfolio of Liam Mackle - Central banking, investment analysis, and technical innovation." />
        <meta property="og:title" content={`${data.name} | Policy, Markets & Technology`} />
        <meta property="og:description" content="Central banking expertise meets technical innovation. Projects in policy analysis, markets modeling, and AI-assisted research." />
      </Head>

      {/* Atmospheric diagonal gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-navy-50 via-white to-teal-50/30 dark:from-navy-900 dark:via-navy-800 dark:to-teal-900/20 pointer-events-none" />

      <div className="relative flex flex-col items-center justify-center min-h-screen text-center px-4">
        <h1
          ref={nameRef}
          className="text-3xl laptop:text-4xl font-semibold tracking-tight bg-gradient-to-r from-navy-900 to-teal-700 dark:from-white dark:to-teal-400 bg-clip-text text-transparent"
        >
          {data.heroName}
        </h1>
        <p
          ref={taglineRef}
          className="text-base laptop:text-lg text-navy-600 dark:text-navy-300 mt-3 max-w-lg"
        >
          {data.heroTagline}
        </p>
        <Socials className="mt-5" />

        <div className="mt-12 laptop:mt-16 w-full max-w-3xl flex flex-col gap-5">
          {/* Primary cards */}
          <div className="grid grid-cols-1 tablet:grid-cols-2 gap-5">
            <NavCard
              title={navItems[0].title}
              description={navItems[0].description}
              href={navItems[0].href}
              delay={0}
            />
            <NavCard
              title={navItems[2].title}
              description={navItems[2].description}
              href={navItems[2].href}
              delay={0.15}
            />
          </div>
          {/* Secondary card */}
          <NavCard
            title={navItems[1].title}
            description={navItems[1].description}
            href={navItems[1].href}
            delay={0.3}
            secondary
          />
        </div>
      </div>
    </div>
  );
}
