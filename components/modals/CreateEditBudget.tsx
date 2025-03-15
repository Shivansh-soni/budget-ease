import { useAppSelector } from "@/redux/hooks";
import { getClient, getDatabase } from "@/utils/db";
import { zodResolver } from "@hookform/resolvers/zod";
import { Databases, ID } from "appwrite";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z, ZodType } from "zod";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import { Form } from "@heroui/form";
import { Select, SelectItem } from "@heroui/select";
import { Budget } from "@/app/user/dashboard/budget/page";
import { Category } from "@/app/user/dashboard/categories/page";
import { createBudget, updateBudget } from "@/utils/db/Budget";
import { getCategories } from "@/utils/db/Categories";
interface BudgetFormData {
  amount: number;
  category: string;
}
const createBudgetSchema: ZodType<BudgetFormData> = z.object({
  amount: z.number().min(1),
  category: z.string(),
});

const CreateEditBudget = ({
  isOpen,
  onOpenChange,
  setRefetch,
  isEdit,
  item,
}: {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  setRefetch: (refetch: boolean) => void;
  isEdit: boolean;
  item: Budget | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  const { session }: { session: any } = useAppSelector((state) => state.auth);
  const { handleSubmit, control, setValue, reset } = useForm<BudgetFormData>({
    defaultValues: {
      amount: 0,
      category: "",
    },
    resolver: zodResolver(createBudgetSchema),
  });
  useEffect(() => {
    if (isEdit && item) {
      setValue("amount", item.budget);
      setValue("category", item.category.name);
    }
  }, [isEdit, item, setValue]);
  const onSubmit = async (data: BudgetFormData) => {
    setIsLoading(true);
    const loader = toast.loading("Creating budget...");
    const payload = {
      budget: data.amount,
      category: data.category,
      spent: 0,
      remaining: data.amount,
      user: session.id,
    };

    try {
      await createBudget(payload as unknown as Budget);
      toast.success("Budget created successfully", { id: loader });
      onOpenChange(false);
      setRefetch(true);
      reset();
    } catch (error: any) {
      toast.error(error?.message, { id: loader });
    }
    setIsLoading(false);
  };

  const handleEdit = async (data: BudgetFormData) => {
    setIsLoading(true);
    const loader = toast.loading("Editing budget...");
    const payload = {
      amount: data.amount,
      category: data.category,
      user: session.id,
    };
    try {
      await updateBudget(item?.$id!, payload as unknown as Budget);
      toast.success("Budget edited successfully", { id: loader });
      onOpenChange(false);
      setRefetch(true);
      reset();
    } catch (error: any) {
      toast.error(error?.message, { id: loader });
    }
    setIsLoading(false);
  };

  const onError = (error: any) => {
    console.log(error);
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      const documents = categories.documents as any;
      const expenses = documents.filter((c: any) => c.type === "expense");
      setCategories(expenses);
    };
    fetchCategories();
  }, []);
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {isEdit ? "Edit Budget" : "Create Budget"}
              </ModalHeader>
              <Form
                onSubmit={handleSubmit(isEdit ? handleEdit : onSubmit, onError)}
              >
                <ModalBody className="w-full">
                  <Controller
                    name="category"
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
                          label="Category"
                        >
                          {categories.map((category) => (
                            <SelectItem key={category.$id}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </>
                    )}
                  />
                  <Controller
                    name="amount"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      //@ts-ignore
                      <Input
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        value={
                          field.value === 0 ? "" : JSON.stringify(field.value)
                        }
                        type="number"
                        isInvalid={invalid}
                        color={invalid ? "danger" : "default"}
                        errorMessage={error?.message}
                        label="Amount"
                      />
                    )}
                  />
                </ModalBody>
                <ModalFooter className="flex justify-end gap-2 w-full">
                  <Button
                    color="danger"
                    variant="light"
                    type="button"
                    onPress={onOpenChange as any}
                  >
                    Close
                  </Button>
                  <Button isLoading={isLoading} color="primary" type="submit">
                    {isEdit ? "Edit" : "Add" + " " + "Budget"}
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

export default CreateEditBudget;
