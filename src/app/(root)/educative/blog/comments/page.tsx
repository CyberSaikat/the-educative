"use client";

import CustomModal from "@/components/custom-ui/customModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoaderContext } from "@/context/loaderContext";
import axios from "axios";
import DataTable from "@/components/custom-ui/DataTable";
import toastMsg from "@/utils/toaster";
import type { IComment } from "@/abstract/interface";
import Link from "next/link";

export default function Comments() {
  const [open, setOpen] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const [currentComment, setCurrentComment] = useState<IComment | null>(null);
  const [filteredComments, setFilteredComments] = useState<IComment[]>([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/comments")
      .then((res) => {
        setFilteredComments(res.data.comments);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex">
            <h1 className="text-2xl font-bold">Comments</h1>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              {
                label: "Post Title",
                render: (r: IComment) => <span>{r.postId}</span>,
                name: "postId",
              },
              {
                label: "View Post",
                render: (r: IComment) => (
                  <Link href={`/blog/${r.postSlug}`} target="_blank">
                    <span className="text-blue-500">View Post</span>
                  </Link>
                ),
                name: "postSlug",
              },
              {
                label: "User",
                render: (r: IComment) => <span>{r.userId}</span>,
                name: "userId",
              },
              {
                label: "Text",
                render: (r: IComment) => <span>{r.text}</span>,
                name: "text",
              },
              {
                label: "Likes",
                render: (r: IComment) => <span>{r.likes}</span>,
                name: "likes",
              },
            ]}
            data={filteredComments}
            onEdit={(item: IComment) => {
              setCurrentComment(item);
              setOpen(true);
            }}
            onDelete={(id: string) => {
              setLoading(true);
              axios
                .delete(`/api/comments`, { data: { id } })
                .then((res) => {
                  if (res.status === 200) {
                    toastMsg("success", "Comment deleted successfully");
                    setFilteredComments(
                      filteredComments.filter((c) => c._id !== id)
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
    </>
  );
}
