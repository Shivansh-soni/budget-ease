import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  getExpenses,
  getIncome,
  getLatestTransactions,
} from "@/utils/db/Transactions";
import { ArrowDown, ArrowUp, DollarSign, TrendingUp } from "lucide-react";
import { Transaction } from "@/types";
import { formatIndianCurrency } from "@/lib/utils";
const AmountCard = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [income, setIncome] = useState(0);
  const [expenses, setExpenses] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [latestTransactions, setLatestTransactions] = useState<Transaction[]>(
    []
  );
  const [expensesDate, setExpensesDate] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      //   const totalBalance = await getTotalBalance();
      const income = await getIncome();
      const expenses = await getExpenses();
      const latestTransactions = await getLatestTransactions();
      console.log(latestTransactions);
      //   setTotalBalance(totalBalance);
      setIncome(income.documents.reduce((acc, curr) => acc + curr.amount, 0));
      setExpenses(
        expenses.documents.reduce((acc, curr) => acc + curr.amount, 0)
      );
      setLatestTransactions(
        latestTransactions.documents as unknown as Transaction[]
      );
    };
    fetchData();
  }, []);
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
          <DollarSign className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatIndianCurrency(totalBalance)}
          </div>
          <p className="text-xs text-dark-moss-green">+20.1% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Income</CardTitle>
          <ArrowUp className="h-4 w-4 text-green-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatIndianCurrency(income)}
          </div>
          <p className="text-xs text-dark-moss-green">+10.5% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Expenses</CardTitle>
          <ArrowDown className="h-4 w-4 text-red-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">
            {formatIndianCurrency(expenses)}
          </div>
          <p className="text-xs text-dark-moss-green">-5.2% from last month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Savings Rate</CardTitle>
          <TrendingUp className="h-4 w-4 text-accent" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-primary">42.5%</div>
          <p className="text-xs text-dark-moss-green">+8.2% from last month</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AmountCard;
