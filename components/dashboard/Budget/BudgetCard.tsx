import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IndianRupee } from "lucide-react";
import React, { useEffect, useState } from "react";
import { getBudget } from "@/utils/db/Budget";
import { formatIndianCurrency } from "@/lib/utils";
import { Skeleton } from "@heroui/skeleton";

const BudgetCard = () => {
  const [budget, setBudget] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        setLoading(true);
        const response = await getBudget();
        const budgetData = response.documents as unknown as any[];
        setBudget(budgetData);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, []);

  //   if (loading) {
  //     return (
  //       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  //         {[...Array(4)].map((_, index) => (
  //           <Skeleton key={index} className="rounded-lg">
  //             <div className="h-[140px] rounded-lg bg-default-300" />
  //           </Skeleton>
  //         ))}
  //       </div>
  //     );
  //   }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
          <IndianRupee className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {loading ? (
              <Skeleton className="h-6 w-28" />
            ) : (
              formatIndianCurrency(
                budget.reduce((acc, curr) => acc + curr.budget, 0)
              )
            )}
          </div>
          <p className="text-xs text-dark-moss-green">For current month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Spent</CardTitle>
          <IndianRupee className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {loading ? (
              <Skeleton className="h-6 w-28" />
            ) : (
              formatIndianCurrency(
                budget.reduce((acc, curr) => acc + curr.spent, 0)
              )
            )}
          </div>
          <div className="text-xs text-dark-moss-green">
            {loading ? (
              <Skeleton className="h-6 w-28" />
            ) : (
              (
                (budget.reduce((acc, curr) => acc + curr.spent, 0) /
                  budget.reduce((acc, curr) => acc + curr.budget, 0)) *
                100
              ).toFixed(2)
            )}
            % of total budget
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Remaining</CardTitle>
          <IndianRupee className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {loading ? (
              <Skeleton className="h-6 w-28" />
            ) : (
              formatIndianCurrency(
                budget.reduce((acc, curr) => acc + curr.remaining, 0)
              )
            )}
          </div>
          <div className="text-xs text-dark-moss-green">
            {loading ? (
              <Skeleton className="h-6 w-28" />
            ) : (
              (
                (budget.reduce((acc, curr) => acc + curr.remaining, 0) /
                  budget.reduce((acc, curr) => acc + curr.budget, 0)) *
                100
              ).toFixed(2)
            )}
            % of total budget
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Health</CardTitle>
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
          <div className="text-2xl font-bold text-primary">
            {loading ? (
              <Skeleton className="h-6 w-28" />
            ) : budget.reduce((acc, curr) => acc + curr.remaining, 0) > 0 ? (
              "Good"
            ) : (
              "Bad"
            )}
          </div>
          <p className="text-xs text-dark-moss-green">
            On track with your plan
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default BudgetCard;
