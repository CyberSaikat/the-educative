"use client";

import {
  AnimatedFileInput,
  AnimatedInput,
  AnimatedMultiSelect,
  AnimatedSelect,
} from "@/components/custom-ui/animatedInput";
import { useContext, useEffect, useState } from "react";
import { IPost } from "@/abstract/interface";
import Tiptap from "@/components/custom-ui/TipTap/TipTapEditor";
import { LoaderContext } from "@/context/loaderContext";
import axios from "axios";
import toastMsg from "@/utils/toaster";
import Image from "next/image";
import CustomModal from "@/components/custom-ui/customModal";
import { CropImage } from "@/utils/imageCropper";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa6";
import TagForm from "./tags/TagForm";

export default function BlogForm({
  fetchCategories,
  fetchTags,
  blog,
  isEditing,
  onComplete,
  categories,
}: {
  fetchCategories: boolean;
  fetchTags: boolean;
  blog?: IPost;
  isEditing?: boolean;
  onComplete: () => void;
  categories: any[];
}) {
  const { setLoading } = useContext(LoaderContext);
  const [open, setOpen] = useState(false);
  const [iPost, setIPost] = useState<IPost>({
    _id: blog?._id ?? "",
    title: blog?.title ?? "",
    slug: blog?.slug ?? "",
    content: blog?.content ?? "",
    excerpt: blog?.excerpt ?? "",
    author: blog?.author ?? "",
    publish_date: blog?.publish_date ?? new Date(),
    updated_date: blog?.updated_date ?? new Date(),
    status: blog?.status ?? "draft",
    category: blog?.category ?? "",
    subcategory: blog?.subcategory ?? "",
    tags: blog?.tags ?? [],
    metaTitle: blog?.metaTitle ?? "",
    metaDescription: blog?.metaDescription ?? "",
    metaKeywords: blog?.metaKeywords ?? "",
    featuredImage: blog?.featuredImage ?? "",
    imageCredit: blog?.imageCredit ?? "",
  });
  const [tags, setTags] = useState<any[]>([]);
  const [subcategories, setSubcategories] = useState<any[]>([]);
  const [cropModal, setCropModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (blog) {
      setIPost(blog);
    }
  }, [blog]);

  useEffect(() => {
    fetchInitials();
  }, [iPost?.category]);

  function fetchInitials() {
    if (!iPost?.category) return;

    setLoading(true);
    axios
      .get(`/api/categories/${iPost.category}`)
      .then((res) => {
        setSubcategories(res.data.subcategories);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        toastMsg("error", e.message);
      });

    fetchTagsData();
  }

  function fetchTagsData() {
    axios
      .get(`/api/tags`)
      .then((res) => {
        setTags(res.data.tags);
      })
      .catch((e) => {
        toastMsg("error", e.message);
      });
  }

  useEffect(() => {
    if (iPost?.title) {
      const slug = iPost.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/&/g, "and")
        .replace(/\//g, "-")
        .replace(/--/g, "-")
        .replace(/-$/g, "")
        .replace(/^-/g, "")
        .replace(/[^\w-]+/g, "");
      setIPost((prev) => ({ ...prev, slug }));
    }
  }, [iPost?.title]);

  const handleFileChange = async (files: FileList | null) => {
    const file = files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
        setCropModal(true);
      };
    }
  };

  const handleForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!iPost) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("_id", iPost._id);
    formData.append("title", iPost.title);
    formData.append("slug", iPost.slug);
    formData.append("author", iPost.author);
    formData.append("status", iPost.status);
    formData.append("category", iPost.category);
    formData.append("subcategory", iPost.subcategory);
    formData.append("metaTitle", iPost.metaTitle);
    formData.append("metaDescription", iPost.metaDescription);
    formData.append("metaKeywords", iPost.metaKeywords);
    formData.append("content", iPost.content);
    formData.append("excerpt", iPost.excerpt);
    if (iPost.featuredImage instanceof File) {
      formData.append("featuredImage", iPost.featuredImage);
    } else {
      formData.append("featuredImage", iPost.featuredImage);
    }
    formData.append("tags", iPost.tags.join(","));
    formData.append("imageCredit", iPost.imageCredit);

    const request = blog
      ? axios.put(`/api/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      : axios.post(`/api/posts`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

    request
      .then((res) => {
        if ((blog && res.status === 200) || (!blog && res.status === 201)) {
          toastMsg(
            "success",
            `Post ${blog ? "updated" : "added"} successfully`
          );
          if (onComplete) {
            onComplete();
          }
        } else {
          toastMsg("error", `Failed to ${blog ? "update" : "add"} blog`);
        }
      })
      .catch((e) => {
        toastMsg("error", e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      <form onSubmit={handleForm}>
        <div className="flex flex-col gap-5 sm:grid grid-cols-4">
          <div className="col-span-1">
            <AnimatedInput
              label={"Title"}
              type={"text"}
              placeholder={"Enter Title"}
              name={"title"}
              id={"title"}
              required={true}
              value={iPost?.title}
              onchange={(e) => {
                setIPost((prev) => ({ ...prev, title: e }));
              }}
              onBlur={(e) => {
                setIPost((prev) => ({ ...prev, title: e.target.value }));
              }}
            />
          </div>
          <div className="col-span-1">
            <AnimatedInput
              label={"Slug"}
              type={"text"}
              placeholder={"Enter Slug"}
              name={"slug"}
              id={"slug"}
              required={true}
              value={iPost?.slug}
              onchange={() => { }}
            />
          </div>
          <div className="col-span-1">
            <AnimatedInput
              label={"Author"}
              type={"text"}
              placeholder={"Enter Author"}
              name={"author"}
              id={"author"}
              required={true}
              value={iPost?.author}
              onchange={(e) => {
                setIPost((prev) => ({ ...prev, author: e }));
              }}
            />
          </div>
          <div className="col-span-1">
            <AnimatedSelect
              label={"Status"}
              options={[
                { name: "Draft", value: "draft" },
                { name: "Published", value: "published" },
                { name: "Archived", value: "archived" },
              ]}
              required={true}
              name={"status"}
              id={"status"}
              value={iPost?.status}
              onChange={(e) => {
                setIPost((prev) => ({
                  ...prev,
                  status: e as "draft" | "published" | "archived",
                }));
              }}
            />
          </div>
          <div className="col-span-1">
            <AnimatedSelect
              label={"Category"}
              options={categories.map((cat) => ({
                name: cat.name,
                value: cat._id,
              }))}
              required={false}
              name={"category"}
              id={"category"}
              onChange={(value) => {
                setIPost((prev) => ({ ...prev, category: value }));
              }}
              value={iPost?.category}
            />
          </div>
          <div className="col-span-1">
            <AnimatedSelect
              label={"Sub Category"}
              options={subcategories.map((cat) => ({
                name: cat.name,
                value: cat._id,
              }))}
              required={false}
              name={"subcategory"}
              id={"subcategory"}
              onChange={(value) => {
                setIPost((prev) => ({ ...prev, subcategory: value }));
              }}
              value={iPost?.subcategory}
            />
          </div>
          <div className="col-span-2 flex gap-2 items-center">
            <AnimatedMultiSelect
              label={"Tags"}
              options={tags.map((tag) => ({
                name: tag.name,
                value: tag._id,
              }))}
              required={false}
              name={"tags"}
              id={"tags"}
              value={iPost?.tags}
              onChange={(values) => {
                setIPost((prev) => ({ ...prev, tags: values }));
              }}
            />
            <Button
              type="button"
              onClick={() => {
                setOpen(true);
              }}
            >
              <FaPlus />
            </Button>
          </div>
          <div className="col-span-1">
            <AnimatedInput
              label={"Meta Title"}
              type={"text"}
              placeholder={"Enter Meta Title"}
              name={"metaTitle"}
              id={"metaTitle"}
              required={true}
              value={iPost?.metaTitle}
              onchange={(e) => {
                setIPost((prev) => ({ ...prev, metaTitle: e }));
              }}
            />
          </div>
          <div className="col-span-1">
            <AnimatedInput
              label={"Meta Description"}
              type={"text"}
              placeholder={"Enter Meta Description"}
              name={"metaDescription"}
              id={"metaDescription"}
              required={true}
              value={iPost?.metaDescription}
              onchange={(e) => {
                setIPost((prev) => ({ ...prev, metaDescription: e }));
              }}
            />
          </div>
          <div className="col-span-2">
            <AnimatedInput
              label={"Meta Keywords"}
              type={"text"}
              placeholder={"Enter Meta Keywords"}
              name={"metaKeywords"}
              id={"metaKeywords"}
              required={true}
              value={iPost?.metaKeywords}
              onchange={(e) => {
                setIPost((prev) => ({ ...prev, metaKeywords: e }));
              }}
            />
          </div>
          <div className="col-span-full">
            <AnimatedInput
              label={"Excerpt"}
              type={"text"}
              placeholder={"Enter Excerpt"}
              name={"excerpt"}
              id={"excerpt"}
              required={true}
              value={iPost?.excerpt}
              onchange={(e) => {
                setIPost((prev) => ({ ...prev, excerpt: e }));
              }}
            />
          </div>
          <div className="col-span-4">
            <Tiptap
              content={iPost?.content ?? ""}
              setContent={(content) => {
                setIPost((prev) => ({ ...prev, content: content.toString() }));
              }}
            />
          </div>
          <div className="col-span-2">
            <AnimatedFileInput
              label={"Featured Image (600x300)"}
              name={"featuredImage"}
              id={"featuredImage"}
              onchange={handleFileChange}
              required={false}
              className={""}
            />
            {iPost?.featuredImage &&
              typeof iPost.featuredImage === "string" && (
                <div className="relative w-full mt-4">
                  <Image
                    src={iPost.featuredImage}
                    alt="Selected Image"
                    width={600}
                    height={300}
                  />
                </div>
              )}
            {iPost?.featuredImage instanceof File && (
              <div className="relative w-full mt-4">
                <Image
                  src={URL.createObjectURL(iPost.featuredImage)}
                  alt="Selected Image"
                  width={600}
                  height={300}
                />
              </div>
            )}
          </div>
          <div className="col-span-2">
            <div className={`flex gap-2 justify-center items-center`}>
              <AnimatedInput
                type="text"
                label={"Image Credit"}
                required={true}
                name={"imageCredit"}
                id={"imageCredit"}
                placeholder={"Add Image Credit"}
                value={iPost?.imageCredit}
                onchange={(e) => {
                  setIPost((prev) => ({ ...prev, imageCredit: e }));
                }}
              />
              <Button
                type={`button`}
                onClick={() => {
                  setIPost((prev) => ({
                    ...prev,
                    imageCredit: "Image by www.freepik.com",
                  }));
                }}
              >
                Use Freepik
              </Button>
            </div>
          </div>
        </div>
        <Button type="submit" className="mt-4">
          {blog ? "Update" : "Add"} Blog
        </Button>
      </form>
      {cropModal && (
        <CustomModal
          isOpen={cropModal}
          onOpenChange={() => setCropModal(false)}
          header="Crop Image"
        >
          <CropImage
            imgSrc={imgSrc ?? ""}
            customFunction={(croppedImage) => {
              if (iPost) {
                setIPost({
                  ...iPost,
                  featuredImage: croppedImage as File,
                });
              }
              setCropModal(false);
            }}
            aspectRatio={"2"}
            customText="Crop Image"
          />
        </CustomModal>
      )}

      <CustomModal
        isOpen={open}
        onOpenChange={() => setOpen(!open)}
        header={`Add Tag`}
        size="3xl"
      >
        <TagForm
          tag={undefined}
          onComplete={() => {
            fetchInitials();
          }}
        />
      </CustomModal>
    </>
  );
}
