import { getBudget } from "@/utils/db/Budget";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../../ui/chart";
import { Spinner } from "@heroui/spinner";
const COLORS = ["#606C38", "#DDA15E", "#BC6C25", "#283618", "#FEFAE0"];

const BudgetVsSpend = () => {
  const [budgetData, setBudgetData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchBudget = async () => {
      try {
        setLoading(true);
        const response = await getBudget();
        const data = response.documents as unknown as any[];
        const budgetData = data.map((item) => ({
          category: item.category.name,
          budget: item.budget,
          spent: item.spent,
          remaining: item.remaining,
        }));
        setBudgetData(budgetData);
      } catch (error) {
        console.error("Error fetching budget data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBudget();
  }, []);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Budget vs Spent</CardTitle>
        <CardDescription>
          Comparison of budget allocation and actual spending
        </CardDescription>
      </CardHeader>
      <CardContent
        className={`pl-2 ${loading && " flex justify-center items-center"} h-full`}
      >
        {loading ? (
          <Spinner className='h-full w-full ' />
        ) : (
          <ChartContainer
            config={{
              budget: {
                label: "Budget",
                color: COLORS[0],
              },
              spent: {
                label: "Spent",
                color: COLORS[1],
              },
            }}
            className='min-h-[300px] w-full'
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
              <CartesianGrid strokeDasharray='3 3' />
              <XAxis dataKey='category' />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey='budget' fill={COLORS[0]} />
              <Bar dataKey='spent' fill={COLORS[1]} />
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default BudgetVsSpend;
