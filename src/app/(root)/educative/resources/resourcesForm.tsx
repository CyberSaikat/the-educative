import {
  AnimatedFileInput,
  AnimatedInput,
} from "@/components/custom-ui/animatedInput";
import { stringToUrl } from "@/utils/functions";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import React, { useContext, useState } from "react";
import { ResourcesError } from "@/abstract/type";
import { LoaderContext } from "@/context/loaderContext";
import axios from "axios";
import toastMsg from "@/utils/toaster";
import CustomModal from "@/components/custom-ui/customModal";
import { CropImage } from "@/utils/imageCropper";
import { ResourcesInterface } from "@/abstract/interface";

export default function ResourcesForm({
  resource,
  customFunc,
}: {
  resource?: ResourcesInterface;
  customFunc?: () => void;
}) {
  const [cropModal, setCropModal] = useState(false);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [errors, setErrors] = useState<ResourcesError>({});
  const { setLoading } = useContext(LoaderContext);

  const [state, setState] = useState<{
    resourceName: string;
    description: string;
    image: File | string;
    url: string;
    imageCredit: string;
    _method?: string;
    _id?: string;
  }>({
    resourceName: resource?.name || "",
    description: resource?.description || "",
    image: resource?.image || "",
    url: resource?.url || "",
    imageCredit: resource?.credit || "",
    _method: resource ? "UPDATE" : "INSERT",
    _id: resource?._id || "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData = new FormData();
    formData.append("_method", state._method!);
    formData.append("_id", state._id!);
    formData.append("resource_name", state.resourceName);
    formData.append("description", state.description);
    formData.append("image", state.image);
    formData.append("url", state.url);
    formData.append("image_credit", state.imageCredit);

    setLoading(true);

    try {
      const res = await axios
        .post(`/api/resources/${resource?._id ?? "new"}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .finally(() => {
          setLoading(false);
        });

      if (res.status === 200) {
        if (res.data.status === "success") {
          customFunc && customFunc();
          if (state._method === "INSERT") {
            setState({
              resourceName: "",
              description: "",
              image: "",
              url: "",
              imageCredit: "",
              _method: "INSERT",
              _id: "",
            });
          }
          toastMsg("success", res.data.message);
        } else {
          toastMsg("error", res.data.message);
        }
      } else {
        if (res.data.errors) {
          setErrors(res.data.errors);
        } else {
          toastMsg("error", "Something went wrong");
        }
      }
    } catch (err) {
      console.error("Error updating resource:", err);
      toastMsg("error", "An error occurred while updating the resource");
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={`flex flex-col gap-4`}>
          <div className={`flex flex-col col-span-2 sm:col-span-1`}>
            <AnimatedInput
              label={"Name"}
              type={"text"}
              placeholder={"Enter Resource Name"}
              required={true}
              name={"resource_name"}
              id={"resource_name"}
              className={"col-span-1"}
              onchange={(e) => {
                setState({ ...state, resourceName: e });
              }}
              value={state.resourceName}
              onBlur={(e) => {
                setState({ ...state, url: stringToUrl(e.currentTarget.value) });
              }}
            />
            <p className="text-red-500 text-sm mt-2">
              {errors.resourceName?.replace("resourceName", "name")}
            </p>
          </div>
          <div className="flex flex-col col-span-2 sm:col-span-1">
            <AnimatedInput
              label={"URL"}
              type={"text"}
              placeholder={"Enter Resource URL"}
              required={true}
              name={"url"}
              id={"url"}
              className={""}
              onchange={(e) => {
                setState({ ...state, url: e });
              }}
              value={state.url}
            />
            <p className="text-red-500 text-sm mt-2">{errors.url}</p>
          </div>
          <div className="col-span-2 flex flex-col">
            <AnimatedInput
              label={"Description"}
              type={"text"}
              placeholder={"Enter Resource Description"}
              required={true}
              name={"description"}
              id={"description"}
              className={""}
              onchange={(e) => {
                setState({ ...state, description: e });
              }}
              value={state.description}
            />
            <p className="text-red-500 text-sm mt-2">{errors.description}</p>
          </div>
          <div
            className={`col-span-2 sm:col-span-1 text-sm ${
              state.image ? "flex flex-col" : ""
            }`}
          >
            <AnimatedFileInput
              label={"Resource Image (600 * 300 px)"}
              required={false}
              name={"resource_image"}
              id={"resource_image"}
              className={"col-span-1"}
              onchange={(e) => {
                handleFileChange(e).then(() => {});
              }}
            />
            <p className="text-red-500 text-sm mt-2">{errors.image}</p>
            {state.image ? (
              <div className="mt-4">
                <Image
                  src={
                    typeof state.image === "string"
                      ? state.image
                      : URL.createObjectURL(state.image as File)
                  }
                  alt={"Resource Image"}
                  className="w-full object-cover rounded-md"
                  priority={true}
                  width={600}
                  height={300}
                />
              </div>
            ) : null}
          </div>
          <div className="col-span-2 sm:col-span-1">
            <div className={`flex gap-2 justify-center items-center`}>
              <AnimatedInput
                type="text"
                label={"Image Credit"}
                required={false}
                name={"image_credit"}
                id={"image_credit"}
                className={""}
                onchange={(e) => {
                  setState({ ...state, imageCredit: e });
                }}
                placeholder={"Add Image Credit"}
                value={state.imageCredit}
              />
              <Button
                type={`button`}
                onClick={() => {
                  setState({
                    ...state,
                    imageCredit: "Image by www.freepik.com",
                  });
                }}
              >
                Use Freepik
              </Button>
            </div>
            <p className="text-red-500 text-sm mt-2">
              {errors.imageCredit?.replace("imageCredit", "image credit")}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <Button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
            onClick={(e) => {
              handleSubmit(e).then(() => {});
            }}
          >
            {state._method === "UPDATE" ? "Update Resource" : "Add Resource"}
          </Button>
        </div>
      </form>
      <CustomModal
        isOpen={cropModal}
        onOpenChange={() => setCropModal(!cropModal)}
        header={"Image Cropper"}
        size={"xs"}
      >
        <>
          <CropImage
            aspectRatio={"2"}
            imgSrc={`${imgSrc}`}
            customFunction={(file) => {
              setState({ ...state, image: file });
              setCropModal(false);
            }}
            customText="Upload Image"
            circularCrop={false}
          />
        </>
      </CustomModal>
    </>
  );
}
