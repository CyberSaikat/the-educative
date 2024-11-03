import conn from "@/database/config";
import { Resources } from "@/models/resources";
import NotFound from "@/app/not-found";
import { ResourcesInterface } from "@/abstract/interface";
import MainResource from "./MainResource";
import { Metadata } from "next";
import TheResources from "../TheResources";
import { AnimatedTitle } from "@/components/custom-ui/TitleComponents";

// Function to generate dynamic metadata

export async function generateMetadata({
  params,
}: {
  params: { url: string };
}): Promise<Metadata> {
  const { url } = params;

  await conn();
  const data = JSON.parse(
    JSON.stringify(await Resources.findOne({ url }))
  ) as ResourcesInterface;

  if (!data) {
    return {
      metadataBase: new URL("https://localhost:3000"), // Default value for missing data
      title: "Not Found",
      description: "Resource not found",
    };
  }

  const host = process.env.NEXT_PUBLIC_HOST || "localhost:3000"; // Fallback to a default value
  const baseUrl = `https://${host}`;
  const metaUrl = new URL(`/resource/${data.url}`, baseUrl);
  const metaTitle = `${data.name} - Resource`;
  const metaDescription = data.description || "Resource page";
  const metaImage = data.image
    ? new URL(data.image, baseUrl).toString()
    : new URL("public/images/resources/placeholder.png", baseUrl).toString();

  return {
    metadataBase: new URL(baseUrl), // Set metadataBase to ensure absolute URLs are generated
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: metaUrl,
      images: [
        {
          url: metaImage,
          alt: data.name || "Resource Image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [metaImage],
    },
  };
}

export default async function Page({ params }: { params: { url: string } }) {
  const { url } = params;

  await conn();
  const data = JSON.parse(
    JSON.stringify(await Resources.findOne({ url }))
  ) as ResourcesInterface;

  if (!data) {
    return <NotFound />;
  }

  const contents = data.contents;
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Resource", href: "/resource" },
    { label: data.name, href: `/resource/${data.url}` },
  ];

  const other = await Resources.aggregate([
    {
      $match: { visible: true, url: { $ne: url } },
    },
    {
      $sample: { size: 3 },
    },
  ]);
  const otherResources = JSON.parse(
    JSON.stringify(other)
  ) as ResourcesInterface[];

  return (
    <>
      <MainResource
        data={data}
        contents={contents}
        breadcrumbItems={breadcrumbItems}
      />
      <div className="container">
        <div className="text-center">
          <div className="inline-flex">
            <AnimatedTitle
              title="Other Resources"
              className="mb-8 text-center w-full"
            />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {otherResources.map((resource, index) => (
            <TheResources
              key={resource._id}
              resource={resource}
              index={index}
            />
          ))}
        </div>
      </div>
      <hr className="horizontal_rule" />
    </>
  );
}
