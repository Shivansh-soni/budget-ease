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
import CreateEditIncomeExpense from "@/components/modals/CreateEditIncomeExpense";
import { useState } from "react";
import AmountCard from "@/components/dashboard/AmountCard";
import RecentTransactions from "@/components/dashboard/RecentTransactions";
import BudgetStatus from "@/components/dashboard/Budget/BudgetStatus";
import Savings from "@/components/dashboard/Savings";
const data = [
  { name: "Jan", income: 4000, expenses: 2400 },
  { name: "Feb", income: 3000, expenses: 1398 },
  { name: "Mar", income: 2000, expenses: 9800 },
  { name: "Apr", income: 2780, expenses: 3908 },
  { name: "May", income: 1890, expenses: 4800 },
  { name: "Jun", income: 2390, expenses: 3800 },
  { name: "Jul", income: 3490, expenses: 4300 },
];
const COLORS = ["#606C38", "#DDA15E", "#BC6C25", "#283618", "#FEFAE0"];
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
  const [isOpen, setIsOpen] = useState(false);
  const [refetch, setRefetch] = useState(false);
  const [type, setType] = useState<"Income" | "Expense">("Expense");
  const onOpenChange = () => {
    setIsOpen(!isOpen);
    setRefetch(!refetch);
  };
  return (
    <div className='space-y-6'>
      {/* Greetings */}
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight text-primary dark:text-white'>
            Dashboard
          </h2>
          <p className='text-dark-moss-green dark:text-white'>
            Welcome back, {session?.name.split(" ")[0]}! Here's an overview of
            your finances.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            className='bg-accent hover:bg-accent-secondary'
            onClick={() => {
              onOpenChange();
              setType("Income");
            }}
          >
            <DollarSign className='mr-2 h-4 w-4' />
            Add Income
          </Button>
          <Button
            onClick={() => {
              onOpenChange();
              setType("Expense");
            }}
            variant='outline'
            className='border-secondary text-secondary hover:bg-secondary hover:text-primary-foreground dark:text-white dark:hover:bg-secondary dark:hover:text-primary-foreground'
          >
            <CreditCard className='mr-2 h-4 w-4' />
            Add Expense
          </Button>
        </div>
      </div>
      {/* Amount Card */}
      <AmountCard />
      {/* Tabs */}
      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='analytics'>Analytics</TabsTrigger>
          <TabsTrigger value='reports'>Reports</TabsTrigger>
        </TabsList>
        <TabsContent
          value='overview'
          className='space-y-4 w-full flex flex-col gap-4'
        >
          <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7'>
            <Card className='lg:col-span-4'>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>
                  Your financial flow for the past 7 months
                </CardDescription>
              </CardHeader>
              <CardContent className='sm:pl-2 '>
                <ChartContainer
                  config={{
                    income: {
                      label: "Income",
                      color: COLORS[0],
                    },
                    expenses: {
                      label: "Expenses",
                      color: COLORS[1],
                    },
                  }}
                  className='min-h-[300px] w-full'
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
                    <CartesianGrid strokeDasharray='3 3' vertical={false} />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent className='bg-black/80 text-white rounded-md p-2 shadow-lg border border-gray-700' />
                      }
                    />
                    <Bar dataKey='income' fill={COLORS[0]} />
                    <Bar dataKey='expenses' fill={COLORS[1]} />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className='lg:col-span-3'>
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
                      color: COLORS[1],
                    },
                  }}
                  className='min-h-[300px]'
                >
                  <BarChart
                    accessibilityLayer
                    data={categoryData}
                    layout='vertical'
                    margin={{
                      top: 5,
                      right: 30,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray='3 3' />
                    <XAxis type='number' />
                    <YAxis type='category' dataKey='category' />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey='amount' fill={COLORS[1]} />
                  </BarChart>
                </ChartContainer> */}
              </CardContent>
            </Card>
          </div>
          <div className='grid gap-4 md:grid-cols-2  w-full'>
            <RecentTransactions />
            <BudgetStatus />
            {/* <Savings /> */}
          </div>
        </TabsContent>
        <TabsContent value='analytics' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
              <CardDescription>
                In-depth analysis of your financial data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-dark-moss-green'>
                Analytics content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value='reports' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Financial Reports</CardTitle>
              <CardDescription>
                Generate and view your financial reports
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-dark-moss-green'>
                Reports content will be displayed here.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateEditIncomeExpense
        isOpen={isOpen}
        type={type}
        onOpenChange={onOpenChange}
        setRefetch={setRefetch}
        isEdit={false}
        item={null}
      />
    </div>
  );
}
