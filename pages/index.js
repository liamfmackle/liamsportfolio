import { useRef } from "react";
import Header from "../components/Header";
import NavCard from "../components/NavCard";
import Socials from "../components/Socials";
import Footer from "../components/Footer";
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
    <div className="relative">
      <Head>
        <title>{data.name} | Policy, Markets & Technology</title>
        <meta name="description" content="Portfolio of Liam Mackle - Central banking, investment analysis, and technical innovation." />
        <meta property="og:title" content={`${data.name} | Policy, Markets & Technology`} />
        <meta property="og:description" content="Central banking expertise meets technical innovation. Projects in policy analysis, markets modeling, and AI-assisted research." />
      </Head>

      <div className="container mx-auto mb-10">
        <Header />

        <div className="laptop:mt-32 mt-16 flex flex-col items-start">
          <h1
            ref={nameRef}
            className="text-2xl laptop:text-3xl font-semibold tracking-tight"
          >
            {data.heroName}
          </h1>
          <p
            ref={taglineRef}
            className="text-base laptop:text-lg text-navy-600 dark:text-navy-300 mt-2 max-w-xl"
          >
            {data.heroTagline}
          </p>
          <Socials className="mt-4" />
        </div>

        <div className="mt-16 laptop:mt-24 grid grid-cols-1 tablet:grid-cols-3 gap-6">
          {navItems.map((item, index) => (
            <NavCard
              key={item.title}
              title={item.title}
              description={item.description}
              href={item.href}
              delay={index * 0.15}
            />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}
