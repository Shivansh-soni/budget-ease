import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

const Savings = () => {
  return (
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
                <p className="text-sm font-medium text-primary">{goal.name}</p>
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
  );
};

export default Savings;
