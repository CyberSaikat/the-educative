"use client";
import CustomModal from "@/components/custom-ui/customModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import SubCategoryForm from "./SubCategoryForm";
import { useRouter } from "next/navigation";
import { LoaderContext } from "@/context/loaderContext";
import axios from "axios";
import DataTable from "@/components/custom-ui/DataTable";
import toastMsg from "@/utils/toaster";

export default function SubCategories() {
  const [open, setOpen] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [filteredCategories, setFilteredCategories] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/sub-categories")
      .then((res) => {
        setFilteredCategories(res.data.subcategories);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function reloadCategories() {
    setLoading(true);
    axios
      .get("/api/sub-categories")
      .then((res) => {
        setFilteredCategories(res.data.subcategories);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex">
            <h1 className="text-2xl font-bold">Sub Categories</h1>
            <Button
              className="ml-auto"
              onClick={() => {
                setCurrentCategory(null);
                setOpen(true);
              }}
            >
              Add Sub Category
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { label: "Name", render: (r: any) => r.name, name: 'name' },
              { label: "Category", render: (r: any) => r.categoryName, name: 'categoryName' },
              { label: "Slug", render: (r: any) => r.slug, name: 'slug' },
              { label: "Description", render: (r: any) => r.description, name: 'description' },
            ]}
            data={filteredCategories}
            onEdit={function (item: any): void {
              setCurrentCategory(item);
              setOpen(true);
            }}
            onDelete={function (id: string): void {
              setLoading(true);
              axios
                .delete(`/api/sub-categories`, { data: { id } })
                .then((res) => {
                  if (res.status === 200) {
                    toastMsg("success", "Sub Category deleted successfully");
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
        header={`${currentCategory ? "Edit" : "Add"} Sub Category`}
        size="3xl"
      >
        <SubCategoryForm
          subCategory={currentCategory}
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
