import type { Metadata } from "next";
import { PortableText } from "next-sanity";
import { notFound } from "next/navigation";

import { getLegalPage, getLegalPages } from "@/lib/data";

export async function generateStaticParams() {
  return (await getLegalPages()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/legal/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  return { title: page?.title ?? "Policy" };
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) notFound();

  return (
    <section className="mx-auto max-w-[900px] px-5 py-20 sm:px-8 lg:py-28">
      <h1 className="display display-xl">{page.title}.</h1>
      <div className="prose-legal mt-10 space-y-5 text-[1.0625rem] text-ink">
        {page.body ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <PortableText value={page.body as any} />
        ) : page.paragraphs.length > 0 ? (
          page.paragraphs.map((para, i) => <p key={i}>{para}</p>)
        ) : (
          <p>This page is being prepared and will be published here shortly.</p>
        )}
      </div>
    </section>
  );
}
