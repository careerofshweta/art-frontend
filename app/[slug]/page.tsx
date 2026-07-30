import { AdminApp } from "@/components/admin-app";
import { notFound } from "next/navigation";

const pageSlugs = [
  "dashboard","tenants","subscriptions","billing","analytics","platform-settings","storage","smtp",
  "payment-gateways","backups","audit-logs","branding","security","users-roles","integrations","reports",
  "system-health","support-tickets","settings","arr-dashboard","global-configuration","file-storage",
  "email-templates","backup-history","restore-wizard","activity-logs","security-dashboard",
  "login-monitoring","roles-permissions","custom-domains","api-keys","system-updates","notifications",
  "preferences","database-schedules","database-recovery","user-sessions","webhooks","multi-language",
  "tax-billing","maintenance","open-meters","shutdown-mode","admin-profile",
];

export function generateStaticParams() {
  return pageSlugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!pageSlugs.includes(slug)) notFound();
  return <AdminApp slug={slug} />;
}
