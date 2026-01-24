import React, { useEffect, useState, useRef } from "react";
import Header from "../components/Header";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../utils";
import { slideInUp, staggerChildren, scrollReveal } from "../animations";
// Data
import data from "../data/portfolio.json";

const About = () => {
  const { theme } = useTheme();
  const [mount, setMount] = useState(false);
  const titleRef = useRef();
  const contentRef = useRef();
  const focusRef = useRef();
  const skillsRef = useRef();

  useEffect(() => {
    setMount(true);
  }, []);

  useIsomorphicLayoutEffect(() => {
    if (mount && titleRef.current) {
      slideInUp(titleRef.current, 0.5, 0.1);
    }
    if (mount && contentRef.current) {
      staggerChildren(contentRef.current, 0.2);
    }
    if (mount && skillsRef.current) {
      staggerChildren(skillsRef.current, 0.3);
    }
  }, [mount]);

  useEffect(() => {
    if (mount && focusRef.current) {
      const cards = focusRef.current.querySelectorAll(".focus-area-card");
      if (cards.length > 0) {
        scrollReveal(cards, { stagger: 0.1 });
      }
    }
  }, [mount]);

  const skillCategories = [
    {
      title: "Policy & Supervision",
      skills: ["ECB Policy Frameworks", "Monetary Policy Operations", "Funds Supervision", "Capital Adequacy", "Operational Risk", "Enforcement"]
    },
    {
      title: "Markets & Investment",
      skills: ["CFA Level 1", "Financial Ratio Analysis", "DCF Modelling", "Collateral Frameworks", "Payments Infrastructure"]
    },
    {
      title: "Technical & Data",
      skills: data.resume.languages.concat(data.resume.frameworks)
    },
    {
      title: "Tools & Methods",
      skills: data.resume.others
    }
  ];

  return (
    <>
      <Head>
        <title>About | {data.name}</title>
        <meta name="description" content={`About ${data.name} - Central banking professional with expertise in policy analysis, markets, and technical development.`} />
        <meta property="og:title" content={`About | ${data.name}`} />
        <meta property="og:description" content="Professional background in central banking, markets, and technical development." />
      </Head>

      <div className="relative container mx-auto mb-10">
        {/* Page-level teal gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-teal-50/20 to-white dark:from-teal-900/10 dark:to-navy-900 pointer-events-none" />
        <Header />
        {mount && (
          <div className="relative mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme === "dark" ? "bg-navy-800" : "bg-navy-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 ref={titleRef} className="text-4xl font-bold">About Me</h1>

              {/* Bio Section */}
              <div ref={contentRef} className="mt-8">
                <p className="text-lg leading-relaxed text-navy-600 dark:text-navy-300">
                  {data.aboutpara}
                </p>
                <p className="text-lg leading-relaxed text-navy-600 dark:text-navy-300 mt-4">
                  I hold an MSc and BSc in Economics from Queen&apos;s University Belfast (First Class Honours, Top 3 in cohort)
                  and have passed CFA Level 1. I use Python, advanced Excel, and AI tools to build
                  analytical workflows and enhance research output.
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <Socials />
              </div>

              {/* Focus Areas */}
              <div className="mt-10" ref={focusRef}>
                <h2 className="text-2xl font-bold mb-6">Focus Areas</h2>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
                  {data.services.map((service, index) => (
                    <div
                      key={index}
                      className="focus-area-card p-4 rounded-lg bg-white dark:bg-navy-800/80 border-l-2 border-teal-400 opacity-0"
                    >
                      <h3 className="text-base font-semibold">{service.title}</h3>
                      <p className="mt-2 text-sm text-navy-500 dark:text-navy-300">
                        {service.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
                <div ref={skillsRef} className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                  {skillCategories.map((category, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 text-sm rounded-full bg-navy-100 dark:bg-navy-700 text-navy-700 dark:text-navy-200"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Education</h2>
                <div>
                  <h3 className="text-lg font-medium">{data.resume.education.universityName}</h3>
                  <p className="text-sm text-navy-500 dark:text-navy-400">{data.resume.education.universityDate}</p>
                  <p className="text-base mt-2 text-navy-600 dark:text-navy-300">{data.resume.education.universityPara}</p>
                </div>
              </div>

              {/* CV Download */}
              <div className="mt-10">
                <Button
                  onClick={() => window.open("/cv.pdf")}
                  type="primary"
                >
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default About;
