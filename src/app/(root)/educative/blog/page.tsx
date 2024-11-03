"use client";

import { IPost } from "@/abstract/interface";
import DataTable from "@/components/custom-ui/DataTable";
import { LoaderContext } from "@/context/loaderContext";
import toastMsg from "@/utils/toaster";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import CustomModal from "@/components/custom-ui/customModal";
import { Button } from "@/components/ui/button";
import BlogForm from "./BlogForm";
import Link from "next/link";

export default function Blog() {
  const { setLoading } = useContext(LoaderContext);
  const [posts, setPosts] = useState<IPost[]>([]);
  const [open, setOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState<IPost | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        toastMsg("error", err.response.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
    axios
      .get("/api/categories")
      .then((res) => {
        setCategories(res.data.categories);
      })
      .finally(() => {
        setLoading(false);
      })
      .catch((e) => {
        toastMsg("error", e.message);
      });
  }, []);

  function reloadPosts() {
    setLoading(true);
    axios
      .get("/api/posts")
      .then((res) => {
        setPosts(res.data.posts);
      })
      .catch((err) => {
        toastMsg("error", err.response.data.message);
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
            <h1 className="text-2xl font-bold">Posts</h1>
            <Button
              className="ml-auto"
              onClick={() => {
                setCurrentPost(null);
                setOpen(true);
              }}
            >
              Add Posts
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { label: "Name", render: (r: any) => r.title, name: "title" },
              {
                label: "Category",
                render: (r: any) => r.categoryName,
                name: "categoryName",
              },
              {
                label: "Publish Date",
                render: (r: any) => r.publish_date,
                name: "publish_date",
              },
              {
                label: "Status",
                render: (r: any) =>
                  r.status.split("")[0].toUpperCase() + r.status.slice(1),
                name: "status",
              },
              {
                label: "View",
                render: (r: any) => (
                  <Link
                    href={`/blog/${r.slug}`}
                    target="_blank"
                    className="text-blue-500"
                  >
                    View
                  </Link>
                ),
                name: "view",
              },
            ]}
            data={posts}
            onEdit={function (item: any): void {
              setCurrentPost(item);
              setOpen(true);
            }}
            onDelete={function (id: string): void {
              setLoading(true);
              axios
                .delete(`/api/posts`, { data: { id } })
                .then((res) => {
                  if (res.status === 200) {
                    toastMsg("success", "Sub Category deleted successfully");
                    setPosts(posts.filter((c) => c._id !== id));
                  }
                })
                .finally(() => {
                  setLoading(false);
                });
            }}
            visibilitySwitch={function (item) {
              setLoading(true);
              axios
                .put(`/api/posts/${item._id}`, {
                  status: item.status === "published" ? "draft" : "published",
                })
                .then((res) => {
                  if (res.status === 200) {
                    toastMsg("success", "Post status updated successfully");
                    reloadPosts();
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
        header={`${currentPost ? "Edit" : "Add"} Blog`}
        size="5xl"
      >
        <div className="overflow-y-auto pt-3 px-2">
          <BlogForm
            blog={currentPost!}
            onComplete={() => {
              setOpen(false);
              setCurrentPost(null);
              reloadPosts();
            }}
            fetchCategories={false}
            fetchTags={false}
            categories={categories}
          />
        </div>
      </CustomModal>
    </>
  );
}
