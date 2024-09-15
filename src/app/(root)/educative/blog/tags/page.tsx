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
import TagForm from "./TagForm";
import type { Tag } from "@/abstract/interface";

export default function Tag() {
  const [open, setOpen] = useState(false);
  const { setLoading } = useContext(LoaderContext);
  const [currentTag, setCurrentTag] = useState<Tag | null>({
    name: "",
    slug: "",
  });
  const [filteredTag, setFilteredTag] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/tags")
      .then((res) => {
        setFilteredTag(res.data.tags);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  function reloadTag() {
    setLoading(true);
    axios
      .get("/api/tags")
      .then((res) => {
        setFilteredTag(res.data.tags);
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
            <h1 className="text-2xl font-bold">Tag</h1>
            <Button
              className="ml-auto"
              onClick={() => {
                setCurrentTag(null);
                setOpen(true);
              }}
            >
              Add Tag
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={[
              { label: "Name", render: (r: any) => r.name ,name: 'name'},
              { label: "Slug", render: (r: any) => r.slug ,name: 'slug'},
            ]}
            data={filteredTag}
            onEdit={function (item: any): void {
              setCurrentTag(item);
              setOpen(true);
            }}
            onDelete={function (id: string): void {
              setLoading(true);
              axios
                .delete(`/api/tags`, { data: { id } })
                .then((res) => {
                  if (res.status === 200) {
                    toastMsg("success", "Tag deleted successfully");
                    setFilteredTag(filteredTag.filter((c) => c._id !== id));
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
        header={`${currentTag ? "Edit" : "Add"} Tag`}
        size="3xl"
      >
        <TagForm
          tag={currentTag!}
          onComplete={() => {
            if (currentTag) {
              setOpen(false);
            }
            setCurrentTag(null);
            reloadTag();
          }}
        />
      </CustomModal>
    </>
  );
}
