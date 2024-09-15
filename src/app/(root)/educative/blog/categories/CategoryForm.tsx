import { AnimatedInput } from "@/components/custom-ui/animatedInput";
import { Button } from "@/components/ui/button";
import { LoaderContext } from "@/context/loaderContext";
import toastMsg from "@/utils/toaster";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

export default function CategoryForm({
  category,
  onComplete,
}: {
  category: any;
  onComplete?: () => void;
}) {
  const [form, setForm] = useState({
    name: category?.name || "",
    slug: category?.slug || "",
    description: category?.description || "",
    action: category ? "update" : "add",
  });
  const [errors, setErrors] = useState<any>({});
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setForm({
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      action: category ? "update" : "add",
    });
  }, [category]);

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
      .post("/api/categories", form)
      .then((res) => {
        if (res.status === 201) {
          toastMsg("success", "Category added successfully");
          setForm({
            name: "",
            slug: "",
            description: "",
            action: "add",
          });
          setErrors({});
          if (onComplete) {
            onComplete();
          }
        } else if (res.status === 200) {
          toastMsg("success", "Category updated successfully");
          setForm({
            name: "",
            slug: "",
            description: "",
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
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 gap-y-6">
        <div className={`col-span-2 sm:col-span-1`}>
          <AnimatedInput
            label={"Name"}
            type={"text"}
            placeholder={"Enter Category Name"}
            name={"categoryName"}
            id={"categoryName"}
            onchange={(e) => {
              if (!category) {
                setForm({ ...form, name: e });
              }
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
            name={"categorySlug"}
            id={"categorySlug"}
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
            name={"categoryDescription"}
            id={"categoryDescription"}
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
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-accent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white"
          >
            {category ? "Update" : "Add"} Category
          </Button>
        </div>
      </div>
    </form>
  );
}
