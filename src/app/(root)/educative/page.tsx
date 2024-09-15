"use client";

import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  router.push("educative/dashboard");
  return (
    <>
      <h1>Page</h1>
    </>
  );
}
