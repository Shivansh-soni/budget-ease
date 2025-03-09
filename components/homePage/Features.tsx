import { BarChart3, CreditCard, PiggyBank, TrendingUp } from "lucide-react";

const features = [
  {
    icon: <BarChart3 className="h-10 w-10 text-accent" />,
    title: "Expense Tracking",
    description:
      "Track your expenses in real-time and categorize them for better insights.",
  },
  {
    icon: <PiggyBank className="h-10 w-10 text-accent" />,
    title: "Budget Planning",
    description:
      "Set monthly budgets for different categories and track your progress.",
  },
  {
    icon: <TrendingUp className="h-10 w-10 text-accent" />,
    title: "Financial Insights",
    description:
      "Get detailed reports and analytics to understand your spending habits.",
  },
  {
    icon: <CreditCard className="h-10 w-10 text-accent" />,
    title: "Multiple Accounts",
    description: "Manage multiple bank accounts and credit cards in one place.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10 text-accent"
      >
        <path d="M12 2v8" />
        <path d="m4.93 10.93 1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="m19.07 10.93-1.41 1.41" />
        <path d="M22 22H2" />
        <path d="m16 6-4 4-4-4" />
        <path d="M16 18a4 4 0 0 0-8 0" />
      </svg>
    ),
    title: "Goal Setting",
    description:
      "Set financial goals and track your progress towards achieving them.",
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-10 w-10 text-accent"
      >
        <rect width="18" height="18" x="3" y="3" rx="2" />
        <path d="M7 7h10" />
        <path d="M7 12h10" />
        <path d="M7 17h10" />
      </svg>
    ),
    title: "Data Export",
    description:
      "Export your financial data in various formats for further analysis.",
  },
];

const FeatureList = () => (
  <section id="features" className="py-16 bg-white/50">
    <div className="container px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-primary">
            Powerful Features
          </h2>
          <p className="max-w-[700px] text-dark-moss-green md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Everything you need to manage your finances in one place
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              borderRadius: "10px",
            }}
            className="flex flex-col items-center space-y-2 border border-border p-6 rounded-lg bg-white/80"
          >
            <div className="p-3 rounded-full bg-accent/10">{feature.icon}</div>
            <h3 className="text-xl font-bold text-primary">{feature.title}</h3>
            <p className="text-center text-dark-moss-green">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default FeatureList;
