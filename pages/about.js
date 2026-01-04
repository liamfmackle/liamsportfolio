import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Header from "../components/Header";
import Socials from "../components/Socials";
import Button from "../components/Button";
import { useTheme } from "next-themes";
import Head from "next/head";
// Data
import data from "../data/portfolio.json";

const About = () => {
  const router = useRouter();
  const { theme } = useTheme();
  const [mount, setMount] = useState(false);

  useEffect(() => {
    setMount(true);
  }, []);

  const skillCategories = [
    {
      title: "Policy & Supervision",
      skills: ["Central Bank Operations", "Prudential Supervision", "Regulatory Frameworks", "Risk Assessment", "Policy Analysis"]
    },
    {
      title: "Markets & Investment",
      skills: ["Rates Analysis", "Collateral Frameworks", "Fixed Income", "Market Operations", "Macro Research"]
    },
    {
      title: "Technical & Data",
      skills: data.resume.languages.concat(data.resume.frameworks)
    },
    {
      title: "Tools & Platforms",
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

      <div className="container mx-auto mb-10">
        <Header isBlog />
        {mount && (
          <div className="mt-10 w-full flex flex-col items-center">
            <div
              className={`w-full ${
                mount && theme === "dark" ? "bg-slate-800" : "bg-gray-50"
              } max-w-4xl p-20 mob:p-5 desktop:p-20 rounded-lg shadow-sm`}
            >
              <h1 className="text-4xl font-bold">About Me</h1>

              {/* Bio Section */}
              <div className="mt-8">
                <p className="text-lg leading-relaxed opacity-80">
                  {data.aboutpara}
                </p>
                <p className="text-lg leading-relaxed opacity-80 mt-4">
                  My work sits at the intersection of policy analysis, financial markets, and technology.
                  I leverage programming and automation to enhance research workflows, build analytical tools,
                  and develop insights into policy transmission mechanisms and market dynamics.
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-6">
                <Socials />
              </div>

              {/* Skills Matrix */}
              <div className="mt-10">
                <h2 className="text-2xl font-bold mb-6">Skills & Expertise</h2>
                <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6">
                  {skillCategories.map((category, index) => (
                    <div key={index} className="mb-4">
                      <h3 className="text-lg font-semibold mb-3">{category.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill, skillIndex) => (
                          <span
                            key={skillIndex}
                            className="px-3 py-1 text-sm rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200"
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
                  <p className="text-sm opacity-75">{data.resume.education.universityDate}</p>
                  <p className="text-base mt-2 opacity-70">{data.resume.education.universityPara}</p>
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
