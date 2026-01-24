import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../utils";
import { slideInUp, staggerChildren } from "../animations";
import data from "../data/portfolio.json";

const About = () => {
  const { theme } = useTheme();
  const [mount, setMount] = useState(false);
  const titleRef = useRef();
  const pillarsRef = useRef();

  useEffect(() => {
    setMount(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (mount && titleRef.current) {
      slideInUp(titleRef.current, 0.5, 0.1);
    }
    if (mount && pillarsRef.current) {
      staggerChildren(pillarsRef.current, 0.15);
    }
  }, [mount]);

  const pillars = [
    {
      label: "Finance",
      text: "ECB policy and supervision, rates and collateral frameworks, CFA Level 1. Deep understanding of how monetary policy transmits through markets.",
    },
    {
      label: "Technical",
      text: "Python, React, data pipelines, and AI-assisted research. I build tools that turn complex data into clear, actionable insight.",
    },
    {
      label: "Drive",
      text: "First Class Honours, top of cohort. I work at the intersection of policy and markets because the problems there demand both rigour and creativity.",
    },
  ];

  return (
    <>
      <Head>
        <title>About | {data.name}</title>
        <meta name="description" content={`${data.name} — finance, technology, and policy.`} />
      </Head>

      <div className="relative container mx-auto mb-10">
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/20 to-white dark:from-teal-900/10 dark:to-navy-900 pointer-events-none" />
        <Header />
        {mount && (
          <div className="relative mt-10 laptop:mt-16 w-full flex flex-col items-center">
            <div
              className={`w-full max-w-3xl p-10 mob:p-5 rounded-lg shadow-sm ${
                theme === "dark" ? "bg-navy-800" : "bg-navy-50"
              }`}
            >
              <h1 ref={titleRef} className="text-3xl font-bold">
                About
              </h1>

              <p className="mt-6 text-base leading-relaxed text-navy-600 dark:text-navy-300">
                I bridge central banking and investment analysis with technical tools.
                My background spans ECB prudential supervision, monetary policy operations,
                and quantitative research — and I build software to sharpen every edge of that work.
              </p>

              <div ref={pillarsRef} className="mt-10 grid grid-cols-1 tablet:grid-cols-3 gap-6">
                {pillars.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="border-t-2 border-teal-400 pt-4"
                  >
                    <h2 className="text-sm font-semibold uppercase tracking-wide text-teal-600 dark:text-teal-400">
                      {pillar.label}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-navy-600 dark:text-navy-300">
                      {pillar.text}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-6 border-t border-navy-200 dark:border-navy-700">
                <a
                  href="/cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-navy-500 dark:text-navy-400 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
                >
                  View CV &rarr;
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
