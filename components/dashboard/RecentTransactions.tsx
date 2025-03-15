import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreditCard, DollarSign, IndianRupee } from "lucide-react";
import { Transaction } from "@/types";
import { getLatestTransactions } from "@/utils/db/Transactions";
import { formatRelativeTime, formatIndianCurrency } from "@/lib/utils";
const backup = [
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
];
const RecentTransactions = () => {
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>(
    []
  );
  useEffect(() => {
    const fetchLatestTransactions = async () => {
      const latestTransactions = await getLatestTransactions();
      setLatestTransactions(
        latestTransactions.documents as unknown as Transaction[]
      );
    };
    fetchLatestTransactions();
  }, []);
  return (
    <div className="">
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {latestTransactions.map((transaction, i) => {
              return (
                <div key={i} className="flex items-center">
                  <div
                    className={`mr-4 rounded-full p-2 ${transaction.type === "income" ? "bg-green-100" : "bg-red-100"}`}
                  >
                    {transaction.type === "Income" ? (
                      <IndianRupee className={`h-4 w-4 text-green-500`} />
                    ) : (
                      <CreditCard className={`h-4 w-4 text-red-500 `} />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none text-primary">
                      {transaction.name}
                    </p>
                    <p className="text-xs text-dark-moss-green">
                      {formatRelativeTime(transaction.createdAt)}
                    </p>
                  </div>
                  <div
                    className={`font-medium flex items-center ${transaction.type === "Income" ? "text-green-500" : "text-red-500"}`}
                  >
                    {transaction.type === "Income" ? "+" : "-"}
                    <div className="ml-2">
                      {formatIndianCurrency(transaction.amount)}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RecentTransactions;
