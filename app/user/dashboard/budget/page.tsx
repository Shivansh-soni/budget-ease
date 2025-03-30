"use client";
import BudgetCard from "@/components/dashboard/Budget/BudgetCard";
import CreateEditBudget from "@/components/modals/CreateEditBudget";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getBudget } from "@/utils/db/Budget";
import { Button } from "@heroui/button";
import { DollarSign, Plus, Trash2 } from "lucide-react";
import dynamic from "next/dynamic";
import { Suspense, useEffect, useState } from "react";
const BudgetAllocation = dynamic(
  () => import("@/components/dashboard/Budget/BudgetAllocation"),
  {
    ssr: false,
  }
);
const BudgetVsSpend = dynamic(
  () => import("@/components/dashboard/Budget/BudgetVsSpend"),
  { ssr: false }
);
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

export default function BudgetPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState<Budget | null>(null);
  const [budgetData, setBudgetData] = useState<Budget[]>([]);
  const onOpenChange = () => setIsOpen(!isOpen);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const fetchBudgets = async () => {
      const budgets = await getBudget();
      setBudgetData(budgets.documents as any);
    };
    if (refetch) {
      fetchBudgets();
      setRefetch(false);
    }
  }, [refetch]);
  return (
    <div className='space-y-6'>
      <div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4'>
        <div>
          <h2 className='text-3xl font-bold tracking-tight text-primary'>
            Budget
          </h2>
          <p className='text-dark-moss-green'>
            Manage and track your monthly budget allocations.
          </p>
        </div>
        <div className='flex gap-2'>
          <Button
            className='bg-accent text-white hover:bg-accent-secondary'
            onPress={onOpenChange}
          >
            <Plus className='mr-2 h-4 w-4' />
            Create Budget
          </Button>
        </div>
      </div>

      <Tabs defaultValue='overview' className='space-y-4'>
        <TabsList>
          <TabsTrigger value='overview'>Overview</TabsTrigger>
          <TabsTrigger value='details'>Budget Details</TabsTrigger>
          <TabsTrigger value='history'>History</TabsTrigger>
        </TabsList>
        <TabsContent value='overview' className='space-y-4'>
          <BudgetCard />
          <div className='grid gap-4 grid-cols-1 md:grid-cols-2 '>
            <Suspense fallback={<div>Loading...</div>}>
              <BudgetAllocation />
              <BudgetVsSpend />
            </Suspense>
          </div>
        </TabsContent>
        <TabsContent value='details' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Budget Categories</CardTitle>
              <CardDescription>
                Detailed breakdown of your budget categories
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className='space-y-6'>
                {budgetData.map((item, i) => {
                  const percentage = Math.round(
                    (item.spent / item.budget) * 100
                  );
                  return (
                    <div key={i} className='space-y-2'>
                      <div className='flex items-center justify-between'>
                        <div>
                          <p className='text-sm font-medium text-primary'>
                            {item.category?.name}
                          </p>
                          <p className='text-xs text-dark-moss-green'>
                            ${item.spent.toFixed(2)} of $
                            {item.budget.toFixed(2)}
                          </p>
                        </div>
                        <div className='flex items-center gap-2'>
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
                            variant='flat'
                            size='sm'
                            className='text-dark-moss-green hover:text-red-500 bg-transparent border'
                          >
                            <Trash2 className='h-4 w-4' />
                          </Button>
                        </div>
                      </div>
                      <Progress
                        value={percentage}
                        className='h-2'
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
        <TabsContent value='history' className='space-y-4'>
          <Card>
            <CardHeader>
              <CardTitle>Budget History</CardTitle>
              <CardDescription>
                View your budget history and trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className='text-dark-moss-green'>
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
