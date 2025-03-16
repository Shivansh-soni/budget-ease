import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { getBudget } from "@/utils/db/Budget";
import { Progress } from "@heroui/progress";
import { formatIndianCurrency } from "@/lib/utils";

const BudgetStatus = () => {
  const [budget, setBudget] = useState<any[]>([]);
  useEffect(() => {
    const fetchBudget = async () => {
      const response = await getBudget();

      setBudget(response.documents as unknown as any[]);
    };
    fetchBudget();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget Status</CardTitle>
        <CardDescription>Your budget progress this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {budget.map((item, i) => {
            const percentage = (item.spent / item.budget) * 100;
            return (
              <div key={i} className="space-y-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-primary">
                    {item.category?.name}
                  </p>
                  <p className="text-sm text-dark-moss-green">
                    {formatIndianCurrency(item.spent)} /{" "}
                    {formatIndianCurrency(item.budget)}
                  </p>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <Progress
                    aria-label="Loading..."
                    classNames={{
                      indicator: `${
                        percentage > 90
                          ? "bg-red-500"
                          : percentage > 75
                            ? "bg-amber-500"
                            : "bg-green-500"
                      }`,
                    }}
                    value={percentage}
                  />
                  {/* <Progress
                    value={percentage}
                    className={`h-2 rounded-full text-red-500 ${
                      percentage > 90
                        ? "bg-red-500"
                        : percentage > 75
                          ? "bg-amber-500"
                          : "bg-green-500"
                    }`}
                  /> */}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetStatus;
