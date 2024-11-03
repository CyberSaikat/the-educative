"use client";

import { useState, useEffect, useContext } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaTrash, FaEdit } from "react-icons/fa";
import { NewResourcesContent, ResourcesInterface } from "@/abstract/interface";
import CustomLightGallery from "@/components/custom-ui/CustomLightGallery";
import CustomModal from "@/components/custom-ui/customModal";
import axios from "axios";
import toastMsg from "@/utils/toaster";
import { LoaderContext } from "@/context/loaderContext";
import ResourceVisibilitySwitch from "@/app/(root)/educative/resources/Visibility";
import { useRouter } from "next/navigation";
import ResourcesForm from "./resourcesForm";
import { AnimatedInput } from "@/components/custom-ui/animatedInput";
import NewAddContentForm from "./newAddContentForm";

const ITEMS_PER_PAGE = 5;

interface ResourcesPageProps {
  mockResources: any[];
  blogs: any[];
}

export default function ResourcesPage({ mockResources,blogs }: ResourcesPageProps) {
  const { setLoading } = useContext(LoaderContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [resources, setResources] = useState<ResourcesInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [editResource, setEditResource] = useState<ResourcesInterface | null>(
    null
  );
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [currentResource, setCurrentResource] =
    useState<ResourcesInterface | null>(null);

  useEffect(() => {
    setResources(mockResources);
  }, [mockResources]);

  useEffect(() => {
    if (search) {
      const filteredResources = mockResources.filter((resource) =>
        resource.name.toLowerCase().includes(search.toLowerCase())
      );
      setResources(filteredResources);
    } else {
      setResources(mockResources);
    }
  }, [search]);

  const totalPages = Math.ceil(resources.length / ITEMS_PER_PAGE);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const currentResources = resources.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const columns = [
    {
      key: "index",
      label: "S.No",
      sortable: false,
      width: 5,
      mobileScreen: true,
    },
    {
      key: "name",
      label: "Name",
      sortable: false,
      width: 10,
      mobileScreen: true,
    },
    {
      key: "description",
      label: "Description",
      sortable: false,
      width: 30,
      mobileScreen: false,
    },
    {
      key: "image",
      label: "Image",
      sortable: false,
      width: 10,
      mobileScreen: false,
    },
    {
      key: "url",
      label: "URL",
      sortable: false,
      width: 10,
      mobileScreen: true,
    },
    {
      key: "created_at",
      label: "Created On",
      sortable: false,
      width: 10,
      mobileScreen: true,
    },
    {
      key: "visible",
      label: "Visible",
      sortable: false,
      width: 10,
      mobileScreen: true,
    },
    {
      key: "action",
      label: "Action",
      sortable: false,
      width: 10,
      mobileScreen: true,
    },
  ];
  return (
    <>
      <Card className="border rounded-b-lg shadow-lg">
        <CardHeader className="bg-primary">
          <div className="flex justify-between w-full">
            <CardTitle className="text-lg font-semibold text-white ps-1 sm:ps-4">
              Resources List
            </CardTitle>
            <Button
              className="ml-auto mr-2 sm:mr-4 bg-accent text-primary-foreground shadow hover:bg-primary/90 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 px-2 sm:px-4 py-2"
              onClick={() => {
                setEditResource(null);
                setIsModalOpen(true);
              }}
            >
              Add Resources
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-8">
          <div className="flex mb-3">
            <div className="col-span-3">
              <AnimatedInput
                type="text"
                placeholder="Search Resources"
                label={"Search Resources"}
                required={false}
                name={"searchResources"}
                id={"searchResources"}
                className={""}
                value={search}
                onchange={(e) => {
                  setSearch(e);
                }}
              />
            </div>
          </div>
          <div className="overflow-auto">
            <table className="min-w-full table-auto text-center border">
              <thead className="text-xs text-accent uppercase bg-gray-300 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column.label}
                      className={`py-3 px-4 border-r relative text-nowrap ${
                        column.sortable ? "cursor-pointer" : ""
                      } ${
                        column.mobileScreen
                          ? "table-cell"
                          : "hidden sm:table-cell"
                      }`}
                      style={{ width: `${column.width}%` }}
                    >
                      {column.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentResources.map((resource, index) => {
                  let date = new Date(resource.created_at!);
                  let formattedDate = `${date.getDate()}-${date.toLocaleString(
                    "default",
                    { month: "long" }
                  )}-${date.getFullYear()}`;
                  return (
                    <tr key={resource.name} className={`border-t`}>
                      <td className="px-4 py-2">{index + 1}</td>
                      <td className="px-4 py-2">
                        <p className="text-sm sm:text-[16px]">
                          {resource.name}
                        </p>
                      </td>
                      <td className="px-4 py-2 w-[20%] hidden sm:table-cell">
                        <p className="text-sm sm:text-[16px] text-start">
                          {resource.description}
                        </p>
                      </td>
                      <td className="px-4 py-2 hidden sm:table-cell">
                        <CustomLightGallery
                          images={[
                            {
                              id: 1,
                              src:
                                resource.image ??
                                "/images/resources/placeholder.png",
                              alt: resource.name,
                            },
                          ]}
                          width={600}
                          height={300}
                          className="rounded-lg w-96"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <a
                          href={`/resources/${resource.url}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500"
                        >
                          Visit
                        </a>
                      </td>
                      <td className="px-4 py-2">{formattedDate}</td>
                      <td>
                        <ResourceVisibilitySwitch
                          resource={resource}
                          resources={resources}
                          setResources={setResources}
                          setLoading={setLoading}
                        />
                      </td>
                      <td className="px-4 py-2 flex space-x-2">
                        <div className="flex items-center gap-2 max-h-full">
                          <Button
                            size={`sm`}
                            className={`transition-all duration-300`}
                            onClick={(e) => {
                              e.preventDefault();
                              setCurrentResource(resource);
                              setIsContentModalOpen(true);
                            }}
                          >
                            {resource.content == null
                              ? "Add Content"
                              : "Edit Content"}
                          </Button>
                          <Button
                            size="sm"
                            className="bg-blue-600 hover:bg-blue-800 transition-all duration-300"
                            onClick={(e) => {
                              setEditResource(resource);
                              setIsModalOpen(true);
                            }}
                          >
                            <FaEdit />
                          </Button>
                          <Button
                            size="sm"
                            className="bg-red-500 hover:bg-red-800 transition-all duration-300"
                            onClick={() => {
                              setLoading(true);
                              const formData = new FormData();
                              formData.append("_method", "DELETE");
                              formData.append("_id", resource._id!);
                              axios
                                .post(
                                  `/api/resources/${resource._id}`,
                                  formData
                                )
                                .then((res) => {
                                  if (res.status == 200) {
                                    toastMsg(
                                      "success",
                                      "Resource deleted successfully"
                                    );
                                    setResources(
                                      resources.filter(
                                        (r) => r._id != resource._id
                                      )
                                    );
                                  } else {
                                    toastMsg(
                                      "error",
                                      "Failed to delete resource"
                                    );
                                  }
                                })
                                .catch(() => {
                                  toastMsg(
                                    "error",
                                    "Failed to delete resource"
                                  );
                                })
                                .finally(() => {
                                  setLoading(false);
                                });
                            }}
                          >
                            <FaTrash />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CardContent>
      </Card>
      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        header={"Edit Resource"}
        size="2xl"
      >
        <ResourcesForm
          resource={editResource!}
          customFunc={() => {
            setIsModalOpen(false);
            router.refresh();
          }}
        />
      </CustomModal>
      <CustomModal
        isOpen={isContentModalOpen}
        onOpenChange={() => setIsContentModalOpen(!isContentModalOpen)}
        header={"Resource Content"}
        size="2xl"
      >
        <div className="overflow-y-auto">
          <NewAddContentForm
            url={currentResource?.url!}
            data={currentResource?.content as NewResourcesContent}
            customFunction={() => {
              setIsContentModalOpen(false);
              router.refresh();
            }}
            blogs={blogs}
          />
        </div>
      </CustomModal>
    </>
  );
}

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="flex justify-end mt-4">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <Button
          key={pageNumber}
          className={`mx-1 hover:bg-blue-800 ${
            pageNumber === currentPage ? "text-white" : "bg-primary"
          }`}
          size="sm"
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </Button>
      ))}
    </div>
  );
};
