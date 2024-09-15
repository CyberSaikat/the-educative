"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import BlogForm from "../BlogForm";

export default function NewBlogPage() {
  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex">
            <h3 className="text-2xl font-bold">Blog Entry</h3>
          </div>
        </CardHeader>
        <CardContent className="relative">
          <BlogForm
            fetchCategories={false}
            fetchTags={false}
            onComplete={() => {
              console.log("Blog added");
            }}
            categories={[]}
          />
        </CardContent>
      </Card>
    </>
  );
}
