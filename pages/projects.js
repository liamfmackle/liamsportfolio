import { useRef, useEffect } from "react";
import Header from "../components/Header";
import WorkCard from "../components/WorkCard";
import Footer from "../components/Footer";
import Head from "next/head";
import { useIsomorphicLayoutEffect } from "../utils";
import { scrollReveal, slideInUp } from "../animations";
import data from "../data/portfolio.json";

export default function Projects() {
  const titleRef = useRef();
  const gridRef = useRef();

  useIsomorphicLayoutEffect(() => {
    if (titleRef.current) {
      slideInUp(titleRef.current, 0.5, 0.1);
    }
  }, []);

  useEffect(() => {
    if (gridRef.current) {
      const cards = gridRef.current.querySelectorAll(".project-card");
      if (cards.length > 0) {
        scrollReveal(cards, { stagger: 0.12 });
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Projects | {data.name}</title>
        <meta name="description" content="Technical projects in policy tools, market analysis, automation, and AI research." />
      </Head>

      <div className="container mx-auto mb-10">
        <Header />

        <div className="mt-10 laptop:mt-16 p-2 laptop:p-0">
          <div ref={titleRef} className="opacity-0">
            <h1 className="text-lg font-semibold uppercase tracking-wide">
              Projects
            </h1>
            <p className="mt-2 text-sm text-navy-500 dark:text-navy-300 max-w-2xl">
              Technical builds spanning policy analysis, market modeling, and AI-assisted research workflows.
            </p>
          </div>

          <div
            ref={gridRef}
            className="mt-8 laptop:mt-12 grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-6"
          >
            {data.projects.map((project) => (
              <div key={project.id} className="project-card opacity-0">
                <WorkCard
                  img={project.imageSrc}
                  name={project.title}
                  description={project.description}
                  techStack={project.techStack}
                  onClick={() => window.open(project.url)}
                />
              </div>
            ))}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
