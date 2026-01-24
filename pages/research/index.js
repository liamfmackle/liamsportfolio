import Head from "next/head";
import Router, { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { stagger } from "../../animations";
import Button from "../../components/Button";
import Header from "../../components/Header";
import data from "../../data/portfolio.json";
import { ISOToDate, useIsomorphicLayoutEffect } from "../../utils";
import { getAllPosts } from "../../utils/api";
import { parseSubstackFeed } from "../../utils/parseSubstackFeed";

const Research = ({ posts, substackFeed }) => {
  const showBlog = useRef(data.showBlog);
  const text = useRef();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useIsomorphicLayoutEffect(() => {
    stagger(
      [text.current],
      { y: 30, x: 0, transform: "scale(0.98)" },
      { y: 0, x: 0, transform: "scale(1)" }
    );
    if (showBlog.current) stagger([text.current], { y: 30 }, { y: 0 });
    else router.push("/");
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  const createBlog = () => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  const deleteBlog = (slug) => {
    if (process.env.NODE_ENV === "development") {
      fetch("/api/blog", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug,
        }),
      }).then(() => {
        router.reload(window.location.pathname);
      });
    } else {
      alert("This thing only works in development mode.");
    }
  };

  return (
    showBlog.current && (
      <>
        <Head>
          <title>Posts | {data.name}</title>
          <meta name="description" content="Essays, research notes, and policy commentary on central banking, markets, and investment analysis." />
          <meta property="og:title" content={`Posts | ${data.name}`} />
          <meta property="og:description" content="Essays, research notes, and policy commentary." />
        </Head>
        <div className="relative container mx-auto mb-10">
          {/* Subtle top gradient */}
          <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-navy-50/60 to-transparent dark:from-navy-800/40 dark:to-transparent pointer-events-none" />
          <Header></Header>
          <div className="mt-10 laptop:mt-16 p-2 laptop:p-0">
            <h1
              ref={text}
              className="text-lg font-semibold uppercase tracking-wide border-l-2 border-teal-400 pl-3"
            >
              Posts
            </h1>
            <p className="mt-2 text-sm text-navy-500 dark:text-navy-300 max-w-2xl">
              Essays, research notes, and commentary on policy, markets, and technology.
            </p>
            {/* Substack Newsletter Card */}
            {substackFeed && (
              <a
                href={data.socials.find(s => s.title === "Substack")?.link || "https://liamfmackle.substack.com"}
                target="_blank"
                rel="noopener noreferrer"
                className="group block mt-8 max-w-sm rounded-lg border border-navy-200 dark:border-navy-700 overflow-hidden hover:border-teal-400 dark:hover:border-teal-500 transition-colors duration-200"
              >
                <div className="px-4 py-3 bg-navy-50 dark:bg-navy-800 flex items-center justify-between">
                  <span className="text-sm font-semibold text-navy-800 dark:text-navy-100">
                    {substackFeed.title}
                  </span>
                  <span className="text-xs text-teal-500 dark:text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    Subscribe &rarr;
                  </span>
                </div>
                <div className="px-4 py-3 bg-white dark:bg-navy-900">
                  {substackFeed.posts.length > 0 ? (
                    <ul className="space-y-2">
                      {substackFeed.posts.map((item, i) => (
                        <li key={i} className="flex items-baseline justify-between gap-3">
                          <span className="text-sm text-navy-700 dark:text-navy-200 truncate">
                            {item.title}
                          </span>
                          {item.date && (
                            <span className="text-xs text-navy-400 dark:text-navy-500 whitespace-nowrap">
                              {new Date(item.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-sm text-navy-400 dark:text-navy-500 text-center py-1">
                      Coming soon
                    </p>
                  )}
                </div>
                <div className="px-4 py-2 bg-navy-50 dark:bg-navy-800 flex items-center justify-between border-t border-navy-100 dark:border-navy-700">
                  <span className="text-xs text-navy-400 dark:text-navy-500">Substack</span>
                  <span className="text-xs text-teal-500 dark:text-teal-400 group-hover:translate-x-0.5 transition-transform">
                    &rarr;
                  </span>
                </div>
              </a>
            )}

            <div className="mt-10 grid grid-cols-1 mob:grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 justify-between gap-10">
              {posts &&
                posts.map((post) => (
                  <div
                    className="cursor-pointer relative"
                    key={post.slug}
                    onClick={() => Router.push(`/research/${post.slug}`)}
                  >
                    <img
                      className="w-full h-60 rounded-lg shadow-lg object-cover"
                      src={post.image}
                      alt={post.title}
                    ></img>
                    <h2 className="mt-5 text-4xl">{post.title}</h2>
                    <p className="mt-2 opacity-50 text-lg">{post.preview}</p>
                    <span className="text-sm mt-5 opacity-25">
                      {ISOToDate(post.date)}
                    </span>
                    {process.env.NODE_ENV === "development" && mounted && (
                      <div className="absolute top-0 right-0">
                        <Button
                          onClick={(e) => {
                            deleteBlog(post.slug);
                            e.stopPropagation();
                          }}
                          type={"primary"}
                        >
                          Delete
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && mounted && (
          <div className="fixed bottom-6 right-6">
            <Button onClick={createBlog} type={"primary"}>
              Add New Post +{" "}
            </Button>
          </div>
        )}
      </>
    )
  );
};

export async function getStaticProps() {
  const posts = getAllPosts([
    "slug",
    "title",
    "image",
    "preview",
    "author",
    "date",
  ]);

  const substackFeed = await parseSubstackFeed();

  return {
    props: {
      posts: [...posts],
      substackFeed,
    },
    revalidate: 3600,
  };
}

export default Research;
