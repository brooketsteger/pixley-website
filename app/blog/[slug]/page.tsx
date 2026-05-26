import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export const revalidate = 3600;

type Params = { params: { slug: string } };

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: Params): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post) return { title: "Post not found" };

  const url = `https://usepixley.com/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: post.canonicalUrl || url },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({ params }: Params) {
  const post = await getPostBySlug(params.slug);
  if (!post) notFound();

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Pixley",
      logo: {
        "@type": "ImageObject",
        url: "https://usepixley.com/logo.png",
      },
    },
    image: post.coverImage ? [post.coverImage] : undefined,
    mainEntityOfPage: `https://usepixley.com/blog/${post.slug}`,
  };

  return (
    <>
      <Header />
      <main className="mx-auto max-w-3xl px-6 py-16">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
        />

        <Link
          href="/blog"
          className="text-sm font-medium text-coral hover:underline"
        >
          ← All posts
        </Link>

        <article className="mt-6">
          <p className="text-sm font-medium text-coral">
            {formatDate(post.date)}
          </p>
          <h1 className="mt-2 text-4xl font-bold text-cocoa md:text-5xl">
            {post.title}
          </h1>

          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt=""
              className="mt-8 max-h-[28rem] w-full rounded-card object-cover"
            />
          )}

          <div
            className="prose-pixley mt-10 text-cocoa"
            // Content is authored by Pixley (sample posts) or pulled from the
            // Pixley-owned Substack feed — a trusted, first-party source.
            // eslint-disable-next-line react/no-danger
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />

          {post.canonicalUrl && (
            <p className="mt-12 border-t border-sand pt-6 text-sm text-warmbrown">
              Originally published on{" "}
              <a
                href={post.canonicalUrl}
                className="text-coral hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                our Substack
              </a>
              .
            </p>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
