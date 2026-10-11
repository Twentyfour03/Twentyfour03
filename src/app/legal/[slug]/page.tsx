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

type Block =
  | { kind: "heading" | "paragraph"; text: string }
  | { kind: "list"; items: string[] };

/** content.ts marks a heading with "## " and a bullet with "- "; runs of bullets become one list. */
function blocks(lines: string[]): Block[] {
  const out: Block[] = [];
  for (const line of lines) {
    if (line.startsWith("## ")) {
      out.push({ kind: "heading", text: line.slice(3) });
    } else if (line.startsWith("- ")) {
      const last = out[out.length - 1];
      if (last?.kind === "list") last.items.push(line.slice(2));
      else out.push({ kind: "list", items: [line.slice(2)] });
    } else {
      out.push({ kind: "paragraph", text: line });
    }
  }
  return out;
}

export default async function LegalPage({ params }: PageProps<"/legal/[slug]">) {
  const { slug } = await params;
  const page = await getLegalPage(slug);
  if (!page) notFound();

  return (
    <section className="mx-auto max-w-[900px] px-5 py-12 sm:py-20 sm:px-8 lg:py-28">
      <h1 className="display display-xl">{page.title}.</h1>
      <div className="prose-legal mt-10 space-y-5 text-[1.0625rem] text-ink">
        {page.body ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          <PortableText value={page.body as any} />
        ) : page.paragraphs.length > 0 ? (
          blocks(page.paragraphs).map((block, i) =>
            block.kind === "heading" ? (
              <h2 key={i}>{block.text}</h2>
            ) : block.kind === "list" ? (
              <ul key={i}>
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p key={i}>{block.text}</p>
            ),
          )
        ) : (
          <p>This page is being prepared and will be published here shortly.</p>
        )}
      </div>
    </section>
  );
}
