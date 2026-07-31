import { notFound } from "next/navigation";
import { PublicPageView } from "@/components/public-site";

const pages = [
  "competitions",
  "gallery",
  "downloads",
  "contact",
  "verify-certificate",
  "track-registration",
  "news",
  "about",
  "terms",
  "privacy",
] as const;

export function generateStaticParams() {
  return pages.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pages.includes(slug as (typeof pages)[number])) notFound();
  return <PublicPageView page={slug as (typeof pages)[number]} />;
}
