import DashboardCard from "@/components/ui/dashboard-card";

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:grid-cols-3 mt-6">
      <DashboardCard
        title="Free Plan"
        description="Limited Tab completions and Agent requests."
        features={[
          "Basic tab completions",
          "Community support",
          "Limited agent requests",
        ]}
        plan="Free"
      />
      <DashboardCard
        title="Pro Plan"
        description="Extended limits on Agent, unlimited Tab completions, max context windows, and more."
        features={[
          "Unlimited tab completions",
          "Priority support",
          "Extended agent requests",
          "Max context windows",
        ]}
        cta={{ label: "Upgrade to Pro", url: "/upgrade/pro" }}
        plan="Pro"
        highlight
      />
      <DashboardCard
        title="Ultra Plan"
        description="20x higher limits for advanced models and early access to features."
        features={[
          "20x higher limits",
          "Early access to new features",
          "Enterprise-grade security",
        ]}
        cta={{ label: "Upgrade to Ultra", url: "/upgrade/ultra" }}
        plan="Ultra"
      />
    </div>
  );
          }
