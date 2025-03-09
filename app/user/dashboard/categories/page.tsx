"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import CreateEditCategory from "@/components/modals/CreateEditCategory";
import { Button } from "@heroui/button";
import { getClient, getDatabase } from "@/utils/db";
import { Databases } from "appwrite";
import toast from "react-hot-toast";

const categories = [
  {
    id: 1,
    name: "Housing",
    type: "expense",
    description: "Rent, mortgage, property taxes, repairs",
    color: "#606C38",
  },
  {
    id: 2,
    name: "Food",
    type: "expense",
    description: "Groceries, restaurants, takeout",
    color: "#DDA15E",
  },
  {
    id: 3,
    name: "Transportation",
    type: "expense",
    description: "Gas, public transit, car maintenance",
    color: "#BC6C25",
  },
  {
    id: 4,
    name: "Entertainment",
    type: "expense",
    description: "Movies, concerts, subscriptions",
    color: "#283618",
  },
  {
    id: 5,
    name: "Utilities",
    type: "expense",
    description: "Electricity, water, internet, phone",
    color: "#606C38",
  },
  {
    id: 6,
    name: "Healthcare",
    type: "expense",
    description: "Insurance, medications, doctor visits",
    color: "#DDA15E",
  },
  {
    id: 7,
    name: "Salary",
    type: "income",
    description: "Regular employment income",
    color: "#283618",
  },
  {
    id: 8,
    name: "Freelance",
    type: "income",
    description: "Contract work and side gigs",
    color: "#BC6C25",
  },
  {
    id: 9,
    name: "Investments",
    type: "income",
    description: "Dividends, interest, capital gains",
    color: "#606C38",
  },
  {
    id: 10,
    name: "Gifts",
    type: "income",
    description: "Money received as gifts",
    color: "#DDA15E",
  },
];

export interface Category {
  $id: string;
  name: string;
  type: string;
  description: string;
  color: string;
}

export default function CategoriesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [item, setItem] = useState<Category | null>(null);
  const onOpenChange = () => setIsOpen(!isOpen);
  const [categories, setCategories] = useState<Category[]>([]);
  const [refetch, setRefetch] = useState(true);
  useEffect(() => {
    const fetchCategories = async () => {
      const db = await getDatabase();
      const categories = await db.listDocuments(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!
      );
      console.log("categories", categories);
      setCategories(categories.documents as any);
    };
    if (refetch) {
      fetchCategories();
      setRefetch(false);
    }
  }, [refetch]);

  const handleDeleteCategory = async (id: string) => {
    const loader = toast.loading("Deleting category...");
    const db = await getDatabase();
    try {
      await db.deleteDocument(
        process.env.NEXT_PUBLIC_APPWRITE_DB_ID!,
        process.env.NEXT_PUBLIC_APPWRITE_DB_CATEGORIES_ID!,
        id
      );
      const updatedCategories = categories.filter((c) => c.$id !== id);
      setCategories(updatedCategories);
      toast.success("Category deleted successfully");
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      toast.dismiss(loader);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-primary">
            Categories
          </h2>
          <p className="text-dark-moss-green">
            Manage your income and expense categories.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            className="bg-accent text-primary hover:bg-accent-secondary"
            onPress={onOpenChange}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Category
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Categories</TabsTrigger>
          <TabsTrigger value="expense">Expense</TabsTrigger>
          <TabsTrigger value="income">Income</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>All Categories</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search categories..."
                  className="w-full bg-background pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.map((category: any) => (
                    <TableRow key={category.$id}>
                      <TableCell className="font-medium">
                        {category.name}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            category.type === "income" ? "outline" : "secondary"
                          }
                        >
                          {category.type}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {category.description}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div
                            className="h-4 w-4 rounded-full"
                            style={{ backgroundColor: category.color }}
                          />
                          <span className="text-xs">{category.color}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            onPress={() => {
                              setIsEdit(true);
                              onOpenChange();
                              setItem(category);
                            }}
                            className="h-8 w-8"
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <Button
                            onPress={() => handleDeleteCategory(category.$id)}
                            variant="ghost"
                            className="h-8 w-8 text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expense" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Expense Categories</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search expense categories..."
                  className="w-full bg-background pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories
                    .filter((c) => c.type === "expense")
                    .map((category) => (
                      <TableRow key={category.$id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {category.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-xs">{category.color}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              className="h-8 w-8"
                              // onPress={() => handleEditCategory(category)}
                            >
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              onPress={() => handleDeleteCategory(category.$id)}
                              variant="ghost"
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="income" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle>Income Categories</CardTitle>
              <div className="relative w-full max-w-sm">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search income categories..."
                  className="w-full bg-background pl-8"
                />
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead className="hidden md:table-cell">
                      Description
                    </TableHead>
                    <TableHead>Color</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories
                    .filter((c) => c.type === "income")
                    .map((category) => (
                      <TableRow key={category.$id}>
                        <TableCell className="font-medium">
                          {category.name}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {category.description}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 w-4 rounded-full"
                              style={{ backgroundColor: category.color }}
                            />
                            <span className="text-xs">{category.color}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" className="h-8 w-8">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                            <Button
                              variant="ghost"
                              className="h-8 w-8 text-red-500"
                            >
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <CreateEditCategory
        item={item}
        isEdit={isEdit}
        setRefetch={setRefetch}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      />
    </div>
  );
}
