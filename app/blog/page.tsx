import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts } from "@/lib/blog";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Thoughts from the Pixley team on screen time, parental controls, and building a calmer, parent-approved place for kids to watch.",
  alternates: { canonical: "https://usepixley.com/blog" },
  openGraph: {
    title: "Blog | Pixley",
    description:
      "Thoughts on screen time, parental controls, and parent-approved content for kids.",
    url: "https://usepixley.com/blog",
    type: "website",
  },
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-page px-6 py-16">
        <header className="max-w-2xl">
          <h1 className="text-4xl font-bold text-cocoa md:text-5xl">Blog</h1>
          <p className="mt-3 text-lg text-warmbrown">
            Thoughts on screen time, parental controls, and building a calmer
            place for kids to watch.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mt-12 text-warmbrown">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="mt-12 space-y-12">
            {featured && (
              <Link
                href={`/blog/${featured.slug}`}
                className="group block overflow-hidden rounded-card border border-sand bg-white/40 transition-shadow hover:shadow-lg md:flex"
              >
                {featured.coverImage && (
                  <div className="md:w-1/2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={featured.coverImage}
                      alt=""
                      className="h-56 w-full object-cover md:h-full"
                    />
                  </div>
                )}
                <div
                  className={`p-8 ${featured.coverImage ? "md:w-1/2" : ""}`}
                >
                  <p className="text-sm font-medium text-coral">
                    {formatDate(featured.date)}
                  </p>
                  <h2 className="mt-2 text-2xl font-bold text-cocoa group-hover:text-coral md:text-3xl">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-warmbrown">{featured.excerpt}</p>
                  <span className="mt-4 inline-block font-medium text-coral">
                    Read more →
                  </span>
                </div>
              </Link>
            )}

            {rest.length > 0 && (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {rest.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="group flex flex-col overflow-hidden rounded-card border border-sand bg-white/40 transition-shadow hover:shadow-lg"
                  >
                    {post.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImage}
                        alt=""
                        className="h-44 w-full object-cover"
                      />
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <p className="text-sm font-medium text-coral">
                        {formatDate(post.date)}
                      </p>
                      <h3 className="mt-2 text-xl font-bold text-cocoa group-hover:text-coral">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm text-warmbrown">
                        {post.excerpt}
                      </p>
                      <span className="mt-4 text-sm font-medium text-coral">
                        Read more →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
