import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatIndianCurrency, formatRelativeTime } from "@/lib/utils";
import { Transaction } from "@/types";
import { getLatestTransactions } from "@/utils/db/Transactions";
import { CreditCard, IndianRupee } from "lucide-react";
import { useEffect, useState } from "react";

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
                    className={`mr-4 rounded-full p-2 ${transaction.type === "Income" ? "bg-green-100" : "bg-red-100"}`}
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
