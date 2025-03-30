import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import { Cell } from "recharts";
import { Legend, Pie, Tooltip } from "recharts";
import { PieChart } from "recharts";
import { ResponsiveContainer } from "recharts";
import { getBudget } from "@/utils/db/Budget";
import { Spinner } from "@heroui/spinner";

const COLORS = ["#606C38", "#DDA15E", "#BC6C25", "#283618", "#FEFAE0"];

const BudgetAllocation = () => {
  const [loading, setLoading] = useState(true);
  const [pieData, setPieData] = useState<any[]>([]);
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        setLoading(true);
        const response = await getBudget();
        const budgetData = response.documents as unknown as any[];
        const pieData = budgetData.map((item) => ({
          name: item.category.name,
          value: item.spent,
        }));
        setPieData(pieData);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, []);
  return (
    <Card className=''>
      <CardHeader>
        <CardTitle>Budget Allocation</CardTitle>
        <CardDescription>
          How your budget is distributed across categories
        </CardDescription>
      </CardHeader>
      <CardContent className='sm:pl-2 '>
        <div className='h-[300px] w-full relative -left-5 sm:left-0'>
          {loading ? (
            <Spinner className='h-full w-full' />
          ) : (
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart className=''>
                <Pie
                  data={pieData}
                  cx='50%'
                  cy='50%'
                  labelLine={false}
                  outerRadius={80}
                  fill='#8884d8'
                  dataKey='value'
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
            </ResponsiveContainer>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetAllocation;
