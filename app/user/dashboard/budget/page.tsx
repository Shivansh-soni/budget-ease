"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Button } from "@heroui/button";
import CreateEditBudget from "@/components/modals/CreateEditBudget";
import { useEffect, useState } from "react";
import { getDatabase } from "@/utils/db";

const COLORS = ["#606C38", "#DDA15E", "#BC6C25", "#283618", "#FEFAE0"];
export interface Budget {
  $id: string;
  category: {
    $id: string;
    name: string;
    type: string;
    description: string;
    color: string;
  };
  budget: number;
  spent: number;
  remaining: number;
}
const budgetData = [
  { category: "Housing", budget: 1200, spent: 950, remaining: 250 },
  { category: "Food", budget: 450, spent: 380, remaining: 70 },
  { category: "Transportation", budget: 350, spent: 220, remaining: 130 },
  { category: "Entertainment", budget: 200, spent: 180, remaining: 20 },
  { category: "Utilities", budget: 180, spent: 150, remaining: 30 },
  { category: "Healthcare", budget: 150, spent: 50, remaining: 100 },
  { category: "Shopping", budget: 200, spent: 190, remaining: 10 },
  { category: "Education", budget: 100, spent: 80, remaining: 20 },
];

const pieData = [
  { name: "Housing", value: 1200 },
  { name: "Food", value: 450 },
  { name: "Transportation", value: 350 },
  { name: "Entertainment", value: 200 },
  { name: "Utilities", value: 180 },
];

export default function BudgetPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState<Budget | null>(null);
  const [budgetData, setBudgetData] = useState<Budget[]>([]);
  const onOpenChange = () => setIsOpen(!isOpen);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const fetchBudgets = async () => {
      const db = await getDatabase();
      const budgets = await db.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_DB_BUDGET_ID!
      );
      console.log("budgets", budgets);
      setBudgetData(budgets.documents as any);
    };
    if (refetch) {
      fetchBudgets();
      setRefetch(false);
    }
  }, [refetch]);
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Budget
          </h2>
          <p className="text-dark-moss-green">
            Manage and track your monthly budget allocations.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-accent text-white hover:bg-accent-secondary"
            onPress={onOpenChange}
          >
            <Plus className="mr-2 h-4 w-4" />
            Create Budget
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="details">Budget Details</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Budget
                </CardTitle>
                <DollarSign className="h-4 w-4 text-accent" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$2,830.00</div>
                <p className="text-xs text-dark-moss-green">
                  For current month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Spent</CardTitle>
                <DollarSign className="h-4 w-4 text-red-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$2,200.00</div>
                <p className="text-xs text-dark-moss-green">
                  77.7% of total budget
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Remaining</CardTitle>
                <DollarSign className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">$630.00</div>
                <p className="text-xs text-dark-moss-green">
                  22.3% of total budget
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Budget Health
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-accent"
                >
                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">Good</div>
                <p className="text-xs text-dark-moss-green">
                  On track with your plan
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Budget Allocation</CardTitle>
                <CardDescription>
                  How your budget is distributed across categories
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px]">
                  {/* <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {pieData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Legend />
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer> */}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Budget vs Spent</CardTitle>
                <CardDescription>
                  Comparison of budget allocation and actual spending
                </CardDescription>
              </CardHeader>
              {/* <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    budget: {
                      label: "Budget",
                      color: "hsl(var(--secondary))",
                    },
                    spent: {
                      label: "Spent",
                      color: "hsl(var(--accent))",
                    },
                  }}
                  className="min-h-[300px]"
                >
                  <BarChart
                    accessibilityLayer
                    data={budgetData.slice(0, 5)}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="budget" fill="hsl(var(--secondary))" />
                    <Bar dataKey="spent" fill="hsl(var(--accent))" />
                  </BarChart>
                </ChartContainer>
              </CardContent> */}
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="details" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>
                Detailed breakdown of your budget categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {budgetData.map((item, i) => {
                  const percentage = Math.round(
                    (item.spent / item.budget) * 100
                  );
                  return (
                    <div key={i} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-primary">
                            {item.category?.name}
                          </p>
                          <p className="text-xs text-dark-moss-green">
                            ${item.spent.toFixed(2)} of $
                            {item.budget.toFixed(2)}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-medium ${
                              percentage > 90
                                ? "text-red-500"
                                : percentage > 75
                                  ? "text-amber-500"
                                  : "text-green-500"
                            }`}
                          >
                            {percentage}%
                          </span>
                          <Button
                            variant="ghost"
                            // size="icon"
                            className="h-8 w-8 text-dark-moss-green hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <Progress
                        value={percentage}
                        className="h-2"
                        // indicatorClassName={
                        //   percentage > 90
                        //     ? "bg-red-500"
                        //     : percentage > 75
                        //       ? "bg-amber-500"
                        //       : "bg-green-500"
                        // }
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Budget History</CardTitle>
              <CardDescription>
                View your budget history and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-dark-moss-green">
                Budget history will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateEditBudget
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setRefetch={setRefetch}
        isEdit={isEdit}
        item={item}
      />
    </div>
  );
}
