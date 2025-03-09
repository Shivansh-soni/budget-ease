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
import { createCategory } from "@/utils/actions/category.actions";
import { getClient } from "@/utils/db";
import { Databases, ID } from "appwrite";
import { Category } from "@/app/user/dashboard/categories/page";

interface CreateCategoryFormData {
  name: string;
  type: "expense" | "income";
  description: string;
  color: string;
}

const createCategorySchema: ZodType<CreateCategoryFormData> = z.object({
  name: z.string().min(3).max(50),
  type: z.enum(["expense", "income"]),
  description: z.string().max(100),
  color: z.string(),
});

const CreateCategory = ({
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
  item: Category | null;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { session }: { session: any } = useAppSelector((state) => state.auth);
  const { handleSubmit, control, setValue } = useForm<CreateCategoryFormData>({
    defaultValues: {
      name: "",
      type: "expense" as "expense",
      description: "",
      color: "#606C38",
    },
    resolver: zodResolver(createCategorySchema),
  });

  useEffect(() => {
    if (isEdit && item) {
      setValue("name", item.name);
      setValue("type", item.type as "expense" | "income");
      setValue("description", item.description);
      setValue("color", item.color);
    }
  }, [isEdit, item, setValue]);

  const onSubmit = async (data: CreateCategoryFormData) => {
    setIsLoading(true);
    const loader = toast.loading("Creating category...");
    const payload = {
      name: data.name,
      type: data.type,
      description: data.description,
      color: data.color,
      user: session.id,
    };
    try {
      const db = await getDatabase();
      const id = ID.unique();
      const dbID = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
      const collectionId = process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!;
      await db.createDocument(dbID, collectionId, id, payload);
      toast.success("Category created successfully", { id: loader });
      onOpenChange(false);
      setRefetch(true);
    } catch (error: any) {
      toast.error(error?.message, { id: loader });
    }
    setIsLoading(false);
  };

  const handleEdit = async (data: CreateCategoryFormData) => {
    setIsLoading(true);
    const loader = toast.loading("Editing category...");
    const payload = {
      name: data.name,
      type: data.type,
      description: data.description,
      color: data.color,
      user: session.id,
    };
    try {
      const client = await getClient();
      const db = new Databases(client);
      const dbId = process.env.NEXT_PUBLIC_APPWRITE_DB_ID!;
      const collectionId = process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!;
      await db.updateDocument(dbId, collectionId, item?.$id!, payload);
      toast.success("Category edited successfully", { id: loader });
      onOpenChange(false);
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
                          <SelectItem key="expense">Expense</SelectItem>
                          <SelectItem key="income">Income</SelectItem>
                        </Select>
                      </>
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
                    name="color"
                    control={control}
                    render={({ field, fieldState: { error, invalid } }) => (
                      <div className="flex gap-2 items-center">
                        <Input
                          {...field}
                          variant="faded"
                          id="color"
                          className="w-4/12 p-0"
                          type="color"
                          size="lg"
                          defaultValue="#606C38"
                        />
                        <Input
                          {...field}
                          isInvalid={invalid}
                          color={invalid ? "danger" : "default"}
                          errorMessage={error?.message}
                          label="Color"
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
                    onPress={onOpenChange as any}
                  >
                    Close
                  </Button>
                  <Button isLoading={isLoading} color="primary" type="submit">
                    Add Category
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

export default CreateCategory;
