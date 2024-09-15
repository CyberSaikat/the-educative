import {
  AnimatedInput,
  AnimatedSelect,
} from "@/components/custom-ui/animatedInput";
import { Button } from "@/components/ui/button";
import { LoaderContext } from "@/context/loaderContext";
import toastMsg from "@/utils/toaster";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function SubCategoryForm({
  subCategory,
  onComplete,
}: {
  subCategory: any;
  onComplete?: () => void;
}) {
  const [form, setForm] = useState({
    name: subCategory?.name || "",
    slug: subCategory?.slug || "",
    description: subCategory?.description || "",
    category: subCategory?.categoryId || "",
    categoryId: subCategory?.categoryId || "",
    action: subCategory ? "update" : "add",
  });
  const [errors, setErrors] = useState<any>({});
  const { setLoading } = useContext(LoaderContext);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setForm({
      name: subCategory?.name || "",
      slug: subCategory?.slug || "",
      description: subCategory?.description || "",
      category: subCategory?.categoryId || "",
      categoryId: subCategory?.categoryId || "",
      action: subCategory ? "update" : "add",
    });
  }, [subCategory]);

  useEffect(() => {
    if (form.name) {
      const slug = form.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .replace(/[^\w-]+/g, "")
        .replace(/--/g, "-")
        .replace(/-$/g, "")
        .replace(/^-/g, "")
        .replace(/-$/g, "");
      setForm({ ...form, slug });
    }
  }, [form.name]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);
    axios
      .post("/api/sub-categories", form)
      .then((res) => {
        if (res.status === 201) {
          toastMsg("success", "Category added successfully");
          setForm({
            name: "",
            slug: "",
            description: "",
            category: form.category,
            categoryId: form.categoryId,
            action: "add",
          });
          setErrors({});
          if (onComplete) {
            onComplete();
          }
        } else if(res.status === 200){
          toastMsg("success", "Category updated successfully");
          setForm({
            name: "",
            slug: "",
            description: "",
            category: form.category,
            categoryId: form.categoryId,
            action: "add",
          });
          setErrors({});
          if (onComplete) {
            onComplete();
          }
        } else {
          toastMsg("error", "Something went wrong! Please try again later");
        }
      })
      .catch((err) => {
        if (err.response.status === 400) {
          setErrors(err.response.data.errors);
          toastMsg("error", "Please fill all required fields");
        } else {
          if (err.response.data.message) {
            toastMsg("error", err.response.data.message);
          } else {
            toastMsg("error", "Something went wrong! Please try again later");
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 gap-y-5">
        <div className={`col-span-2 sm:col-span-1`}>
          <AnimatedInput
            label={"Name"}
            type={"text"}
            placeholder={"Enter Category Name"}
            name={"subCategoryName"}
            id={"subCategoryName"}
            onchange={(e) => {
              setForm({ ...form, name: e });
            }}
            value={form.name}
            required
            autoComplete="off"
          />
          {errors?.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        <div className={`col-span-2 sm:col-span-1`}>
          <AnimatedInput
            label={"Slug"}
            type={"text"}
            placeholder={"Enter Category Slug"}
            name={"subCategorySlug"}
            id={"subCategorySlug"}
            onchange={(e) => {}}
            value={form.slug}
            required
            autoComplete="off"
          />
          {errors?.slug && (
            <span className="text-red-500 text-sm">{errors.slug}</span>
          )}
        </div>

        <div className={`col-span-2`}>
          <AnimatedInput
            label={"Description"}
            type={"text"}
            placeholder={"Enter Category Description"}
            name={"subCategoryDescription"}
            id={"subCategoryDescription"}
            onchange={(e) => {
              setForm({ ...form, description: e });
            }}
            value={form.description}
            required
            autoComplete="off"
          />
          {errors?.description && (
            <span className="text-red-500 text-sm">{errors.description}</span>
          )}
        </div>
        <div className="col-span-2">
          <AnimatedSelect
            label={"Category"}
            options={categories.map((cat) => ({
              name: cat.name,
              value: cat._id,
            }))}
            required={false}
            name={"category"}
            id={"category"}
            className={""}
            onChange={function (value: string): void {
              setForm({ ...form, categoryId: value, category: value });
              console.log(form);
            }}
            value={form.categoryId}
          />
        </div>
        <div className="col-span-2">
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-accent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white"
          >
            {subCategory ? "Update" : "Add"} Category
          </Button>
        </div>
      </div>
    </form>
  );
}
