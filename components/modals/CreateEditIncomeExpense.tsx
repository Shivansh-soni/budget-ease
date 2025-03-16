import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";
import { getCategories } from "@/utils/db/Categories";
import { getClient } from "@/utils/db";
import { Databases, ID, Query } from "appwrite";
import { IndianRupee } from "lucide-react";

interface createExpenseForm {
  name: string;
  type: "Expense";
  description: string;
  amount: number;
  category: string;
}
interface createIncomeForm {
  name: string;
  type: "Income";
  description: string;
  amount: number;
}
interface Transaction {
  $id: string;
  name: string;
  type: "Expense" | "Income";
  description: string;
  amount: number;
}
const createExpenseSchema: ZodType<createExpenseForm> = z.object({
  name: z.string().min(3).max(50),
  type: z.enum(["Expense"]),
  description: z.string().max(100),
  amount: z.number(),
  category: z.string().min(3).max(50),
});
const createIncomeSchema: ZodType<createIncomeForm> = z.object({
  name: z.string().min(3).max(50),
  type: z.enum(["Income"]),
  description: z.string().max(100),
  amount: z.number(),
});

const IncomeDefaultValues: createIncomeForm = {
  name: "",
  type: "Income",
  description: "",
  amount: 0,
};

const ExpenseDefaultValues: createExpenseForm = {
  name: "",
  type: "Expense",
  description: "",
  amount: 0,
  category: "",
};

// Define a union type for both form types
type TransactionFormData = createExpenseForm | createIncomeForm;

const CreateIncomeExpense = ({
  isOpen,
  onOpenChange,
  setRefetch,
  isEdit,
  item,
  type,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  setRefetch: (refetch: boolean) => void;
  isEdit: boolean;
  item: Transaction | null;
  type: "Expense" | "Income";
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const { session }: { session: any } = useAppSelector((state) => state.auth);

  const { handleSubmit, control, setValue, reset } = useForm<any>({
    defaultValues:
      type === "Expense" ? ExpenseDefaultValues : IncomeDefaultValues,
    resolver:
      type === "Expense"
        ? zodResolver(createExpenseSchema)
        : zodResolver(createIncomeSchema),
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories.documents as []);
    };
    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);
  useEffect(() => {
    if (isEdit && item) {
      setValue("name", item.name);
      setValue("type", item.type as "Expense" | "Income");
      setValue("description", item.description);
      setValue("amount", item.amount);
    }
  }, [isEdit, item, setValue]);

  const onSubmit = async (data: any) => {
    setIsLoading(true);
    const loader = toast.loading("Creating transaction...");
    const payload: any = {
      name: data.name,
      type: data.type,
      description: data.description,
      amount: data.amount,

      createdAt: new Date().toISOString(),
      user: session.id,
    };
    if (data.type === "Expense") {
      payload.category = data.category;
    }
    console.log("payload", payload);
    try {
      const client = await getClient();
      const db = new Databases(client);
      const dbId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
      const transactionCollectionId =
        process.env.NEXT_PUBLIC_APPWRITE_DB_TRANSACTIONS_ID!;

      await db.createDocument(
        dbId,
        transactionCollectionId,
        ID.unique(),
        payload
      );

      if (data.type === "Expense") {
        const budgetCollectionId =
          process.env.NEXT_PUBLIC_APPWRITE_DB_BUDGET_ID!;
        const budgets = await db.listDocuments(dbId, budgetCollectionId, [
          Query.equal("category", data.category as string),
        ]);

        if (budgets.documents.length > 0) {
          const budget = budgets.documents[0];
          const currentSpent = budget.spent || 0;
          const currentRemaining = budget.remaining || 0;

          await db.updateDocument(dbId, budgetCollectionId, budget.$id, {
            spent: currentSpent + data.amount,
            remaining: currentRemaining - data.amount,
          });
        }
      }

      toast.success("Transaction created successfully", { id: loader });
      onOpenChange();
      setRefetch(true);
    } catch (error: any) {
      toast.error(error?.message, { id: loader });
    }
    reset();
    setIsLoading(false);
  };

  const handleEdit = async (data: any) => {
    setIsLoading(true);
    const loader = toast.loading("Editing transaction...");
    const payload: any = {
      name: data.name,
      type: data.type,
      description: data.description,
      amount: data.amount,
      user: session.id,
    };
    if (data.type === "Expense") {
      payload.category = data.category;
    }
    try {
      const client = await getClient();
      const db = new Databases(client);
      const dbId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
      const collectionId = process.env.NEXT_PUBLIC_APPWRITE_DB_TRANSACTIONS_ID!;
      await db.updateDocument(dbId, collectionId, item?.$id!, payload);
      toast.success("Transaction edited successfully", { id: loader });
      onOpenChange();
      setRefetch(true);
    } catch (error: any) {
      toast.error(error?.message, { id: loader });
    }
    setIsLoading(false);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Category
              </ModalHeader>
              <Form
                onSubmit={handleSubmit(isEdit ? handleEdit : onSubmit, onError)}
              >
                <ModalBody className="w-full">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <Input
                        isInvalid={invalid}
                        color={invalid ? "danger" : "default"}
                        errorMessage={error?.message}
                        {...field}
                        label="Name"
                      />
                    )}
                  />
                  <Controller
                    name="type"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <>
                        <Select
                          defaultSelectedKeys={[field.value]}
                          isInvalid={invalid}
                          color={invalid ? "danger" : "default"}
                          errorMessage={error?.message}
                          onSelectionChange={(e: any) => {
                            const data = Array.from(e);
                            field.onChange(data[0]);
                          }}
                          label="Type"
                        >
                          <SelectItem key="Expense">Expense</SelectItem>
                          <SelectItem key="Income">Income</SelectItem>
                        </Select>
                      </>
                    )}
                  />
                  <Controller
                    name="category"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <Select
                        {...field}
                        isInvalid={invalid}
                        defaultSelectedKeys={[field.value]}
                        label="Category"
                        color={invalid ? "danger" : "default"}
                        errorMessage={error?.message}
                      >
                        {categories.map((category) => (
                          <SelectItem key={category.$id}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </Select>
                    )}
                  />
                  <Controller
                    name="description"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <Input
                        {...field}
                        isInvalid={invalid}
                        color={invalid ? "danger" : "default"}
                        errorMessage={error?.message}
                        label="Description"
                      />
                    )}
                  />
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <div className="flex gap-2 items-center">
                        <Input
                          startContent={<IndianRupee size={16} />}
                          {...field}
                          type="number"
                          value={field.value.toString()}
                          onChange={(e: any) => {
                            field.onChange(Number(e.target.value));
                          }}
                          isInvalid={invalid}
                          color={invalid ? "danger" : "default"}
                          errorMessage={error?.message}
                          label="Amount"
                        />
                      </div>
                    )}
                  />
                </ModalBody>
                <ModalFooter className="flex justify-end gap-2 w-full">
                  <Button
                    color="danger"
                    variant="light"
                    type="button"
                    onPress={() => {
                      onOpenChange();
                      reset();
                    }}
                  >
                    Close
                  </Button>
                  <Button isLoading={isLoading} color="primary" type="submit">
                    Add Transaction
                  </Button>
                </ModalFooter>
              </Form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateIncomeExpense;
