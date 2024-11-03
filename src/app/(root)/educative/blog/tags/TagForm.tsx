import React, { useContext, useEffect, useState } from "react";
import { AnimatedInput } from "@/components/custom-ui/animatedInput";
import { Button } from "@/components/ui/button";
import { LoaderContext } from "@/context/loaderContext";
import toastMsg from "@/utils/toaster";
import axios from "axios";
import { Tag } from "@/abstract/interface";


interface TagFormProps {
  tag?: Tag;
  onComplete?: () => void;
}

const TagForm: React.FC<TagFormProps> = ({ tag, onComplete }) => {
  const [form, setForm] = useState({
    name: tag?.name || "",
    slug: tag?.slug || "",
    action: tag ? "update" : "add",
    id: tag?._id,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { setLoading } = useContext(LoaderContext);

  useEffect(() => {
    setForm({
      name: tag?.name || "",
      slug: tag?.slug || "",
      action: tag ? "update" : "add",
      id: tag?._id,
    });
  }, [tag]);

  useEffect(() => {
    if (form.name) {
      const slug = form.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .replace(/\//g, "-")
        .replace(/--/g, "-")
        .replace(/-$/g, "")
        .replace(/^-/g, "")
        .replace(/-$/g, "")
        .replace(/[^\w-]+/g, "");
      setForm({ ...form, slug });
    }
  }, [form.name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const apiCall =
      form.action === "update"
        ? axios.put(`/api/tags`, form)
        : axios.post("/api/tags", form);

    apiCall
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          toastMsg(
            "success",
            form.action === "update"
              ? "Tag updated successfully"
              : "Tag added successfully"
          );
          setForm({
            name: "",
            slug: "",
            action: "add",
            id: undefined,
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
        if (err.response?.status === 400) {
          setErrors(err.response.data.errors);
          toastMsg("error", err.response.data.message);
        } else {
          toastMsg(
            "error",
            err.response?.data.message ||
              "Something went wrong! Please try again later"
          );
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-3">
        <div className="col-span-2">
          <AnimatedInput
            label={"Name"}
            type={"text"}
            placeholder={"Enter Tag Name"}
            name={"TagName"}
            id={"TagName"}
            onchange={(e: string) => {
              const name = e.split(" ").map((n) => n.charAt(0).toUpperCase() + n.slice(1)).join(" ");
              setForm({ ...form, name });
            }}
            value={form.name}
            required
            autoComplete="off"
          />
          {errors?.name && (
            <span className="text-red-500 text-sm">{errors.name}</span>
          )}
        </div>
        <div className="col-span-2">
          <AnimatedInput
            label={"Slug"}
            type={"text"}
            placeholder={"Enter Tag Slug"}
            name={"TagSlug"}
            id={"TagSlug"}
            onchange={() => {}}
            value={form.slug}
            required
            autoComplete="off"
          />
          {errors?.slug && (
            <span className="text-red-500 text-sm">{errors.slug}</span>
          )}
        </div>
        <div className="col-span-2">
          <Button
            type="submit"
            className="w-full bg-primary text-white hover:bg-accent transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-white"
          >
            {tag ? "Update" : "Add"} Tag
          </Button>
        </div>
      </div>
    </form>
  );
};

export default TagForm;
