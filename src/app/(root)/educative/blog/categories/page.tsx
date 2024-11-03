"use client";
import CustomModal from "@/components/custom-ui/customModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import CategoryForm from "./CategoryForm";
import axios from "axios";
import { LoaderContext } from "@/context/loaderContext";
import DataTable from "@/components/custom-ui/DataTable";
import { useRouter } from "next/navigation";
import toastMsg from "@/utils/toaster";

export default function Categories() {
  const [open, setOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  const { setLoading } = useContext(LoaderContext);
  const [categories, setCategories] = useState<any[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.categories);
        setFilteredCategories(res.data.categories);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const reloadCategories = () => {
    setLoading(true);
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.categories);
        setFilteredCategories(res.data.categories);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex">
            <h1 className="text-2xl font-bold">Categories</h1>
            <Button
              className="ml-auto"
              onClick={() => {
                setCurrentCategory(null);
                setOpen(true);
              }}
            >
              Add Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { label: "Name", render: (r: any) => r.name, name: "name" },
              { label: "Slug", render: (r: any) => r.slug, name: "slug" },
              {
                label: "Description",
                render: (r: any) => r.description,
                name: "description",
              },
            ]}
            data={filteredCategories}
            onEdit={function (item: any): void {
              setCurrentCategory(item);
              setOpen(true);
            }}
            onDelete={function (id: string): void {
              setLoading(true);
              axios
                .post(`/api/categories`, { id, action: "delete" })
                .then((res) => {
                  if (res.status === 200) {
                    toastMsg("success", "Category deleted successfully");
                    setCategories(categories.filter((c) => c._id !== id));
                    setFilteredCategories(
                      filteredCategories.filter((c) => c._id !== id)
                    );
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
          />
        </CardContent>
      </Card>
      <CustomModal
        isOpen={open}
        onOpenChange={() => setOpen(!open)}
        header={`${currentCategory ? "Edit" : "Add"} Category`}
        size="3xl"
      >
        <CategoryForm
          category={currentCategory}
          onComplete={() => {
            if (currentCategory) {
              setOpen(false);
            }
            setCurrentCategory(null);
            reloadCategories();
          }}
        />
      </CustomModal>
    </>
  );
}
