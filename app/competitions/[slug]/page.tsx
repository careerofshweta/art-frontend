import { CompetitionDetails } from "@/components/public-site";
import { competitions } from "@/lib/public-data";

export function generateStaticParams() {
  return competitions.map((competition) => ({ slug: competition.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <CompetitionDetails slug={slug} />;
}
