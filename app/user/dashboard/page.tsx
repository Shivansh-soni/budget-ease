"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ArrowDown,
  ArrowUp,
  CreditCard,
  DollarSign,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useAppSelector } from "@/redux/hooks";

const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
  { name: "Jul", income: 3490, expenses: 4300 },
];

const categoryData = [
  { category: "Housing", amount: 1200 },
  { category: "Food", amount: 450 },
  { category: "Transportation", amount: 350 },
  { category: "Entertainment", amount: 200 },
  { category: "Utilities", amount: 180 },
  { category: "Healthcare", amount: 150 },
];

export default function DashboardPage() {
  const { session }: { session: any } = useAppSelector((state) => state.auth);
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Dashboard
          </h2>
          <p className="text-dark-moss-green">
            Welcome back, {session?.name.split(" ")[0]}! Here's an overview of
            your finances.
          </p>
        </div>
        <div className="flex gap-2">
          <Button className="bg-accent hover:bg-accent-secondary">
            <DollarSign className="mr-2 h-4 w-4" />
            Add Income
          </Button>
          <Button
            variant="outline"
            className="border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground"
          >
            <CreditCard className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$12,580.00</div>
            <p className="text-xs text-dark-moss-green">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Income</CardTitle>
            <ArrowUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$4,395.00</div>
            <p className="text-xs text-dark-moss-green">
              +10.5% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expenses</CardTitle>
            <ArrowDown className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">$2,530.00</div>
            <p className="text-xs text-dark-moss-green">
              -5.2% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">42.5%</div>
            <p className="text-xs text-dark-moss-green">
              +8.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>
                  Your financial flow for the past 7 months
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                {/* <ChartContainer
                  config={{
                    income: {
                      label: "Income",
                      color: "hsl(var(--secondary))",
                    },
                    expenses: {
                      label: "Expenses",
                      color: "hsl(var(--accent))",
                    },
                  }}
                  className="min-h-[300px]"
                >
                  <BarChart
                    accessibilityLayer
                    data={data}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="hsl(var(--secondary))" />
                    <Bar dataKey="expenses" fill="hsl(var(--accent))" />
                  </BarChart>
                </ChartContainer> */}
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
                <CardDescription>
                  Your spending by category this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* <ChartContainer
                  config={{
                    amount: {
                      label: "Amount",
                      color: "hsl(var(--accent))",
                    },
                  }}
                  className="min-h-[300px]"
                >
                  <BarChart
                    accessibilityLayer
                    data={categoryData}
                    layout="vertical"
                    margin={{
                      top: 5,
                      right: 30,
                      left: 80,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis type="category" dataKey="category" />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="amount" fill="hsl(var(--accent))" />
                  </BarChart>
                </ChartContainer> */}
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>
                  Your latest financial activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Grocery Store",
                      amount: -120.5,
                      date: "Today",
                      icon: CreditCard,
                      type: "expense",
                    },
                    {
                      name: "Salary Deposit",
                      amount: 3500.0,
                      date: "Yesterday",
                      icon: DollarSign,
                      type: "income",
                    },
                    {
                      name: "Electric Bill",
                      amount: -85.2,
                      date: "3 days ago",
                      icon: CreditCard,
                      type: "expense",
                    },
                    {
                      name: "Freelance Work",
                      amount: 750.0,
                      date: "1 week ago",
                      icon: DollarSign,
                      type: "income",
                    },
                  ].map((transaction, i) => (
                    <div key={i} className="flex items-center">
                      <div
                        className={`mr-4 rounded-full p-2 ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                      >
                        <transaction.icon
                          className={`h-4 w-4 ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none text-primary">
                          {transaction.name}
                        </p>
                        <p className="text-xs text-dark-moss-green">
                          {transaction.date}
                        </p>
                      </div>
                      <div
                        className={`font-medium ${transaction.type === "income" ? "text-green-500" : "text-red-500"}`}
                      >
                        {transaction.type === "income" ? "+" : ""}
                        {transaction.amount.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Budget Status</CardTitle>
                <CardDescription>
                  Your budget progress this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      category: "Housing",
                      spent: 950,
                      budget: 1200,
                      percentage: 79,
                    },
                    {
                      category: "Food",
                      spent: 380,
                      budget: 450,
                      percentage: 84,
                    },
                    {
                      category: "Transportation",
                      spent: 220,
                      budget: 350,
                      percentage: 63,
                    },
                    {
                      category: "Entertainment",
                      spent: 180,
                      budget: 200,
                      percentage: 90,
                    },
                  ].map((item, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-primary">
                          {item.category}
                        </p>
                        <p className="text-sm text-dark-moss-green">
                          ${item.spent} / ${item.budget}
                        </p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className={`h-2 rounded-full ${
                            item.percentage > 90
                              ? "bg-red-500"
                              : item.percentage > 75
                                ? "bg-amber-500"
                                : "bg-green-500"
                          }`}
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Savings Goals</CardTitle>
                <CardDescription>
                  Track your progress towards financial goals
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Emergency Fund",
                      current: 8500,
                      target: 10000,
                      percentage: 85,
                    },
                    {
                      name: "Vacation",
                      current: 2200,
                      target: 3000,
                      percentage: 73,
                    },
                    {
                      name: "New Car",
                      current: 5500,
                      target: 15000,
                      percentage: 37,
                    },
                    {
                      name: "Home Down Payment",
                      current: 12000,
                      target: 50000,
                      percentage: 24,
                    },
                  ].map((goal, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-primary">
                          {goal.name}
                        </p>
                        <p className="text-sm text-dark-moss-green">
                          ${goal.current} / ${goal.target}
                        </p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div
                          className="h-2 rounded-full bg-accent"
                          style={{ width: `${goal.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>
                In-depth analysis of your financial data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-dark-moss-green">
                Analytics content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Generate and view your financial reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-dark-moss-green">
                Reports content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
