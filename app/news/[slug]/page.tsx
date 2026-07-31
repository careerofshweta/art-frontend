import { BlogDetails } from "@/components/public-site";
import { news } from "@/lib/public-data";

export function generateStaticParams() {
  return news.map((post) => ({ slug: post.slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogDetails slug={slug} />;
}
