"use client";

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { LoaderContext } from "@/context/loaderContext";
import toastMsg from "@/utils/toaster";
import Image from "next/image";
import IconPicker, { IconPreview } from "@/components/custom-ui/IconPicker";
import {
  AnimatedFileInput,
  AnimatedInput,
} from "@/components/custom-ui/animatedInput";
import CustomModal from "@/components/custom-ui/customModal";
import { Button } from "@/components/ui/button";
import Tiptap from "@/components/custom-ui/TipTap/TipTapEditor";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CropImage } from "@/utils/imageCropper";
import { FaArrowDown, FaArrowUp, FaTrash } from "react-icons/fa6";

interface Feature {
  icon: string;
  title: string;
  description: string;
  link: string;
}

interface AddContentFormProps {
  url: string;
  data: {
    title: string;
    description: string;
    features: Feature[];
    callToAction: string;
    imageSrc: string;
    imageCredit: string;
  };
  blogs?: any[];
  customFunction?: () => void;
}

export default function NewAddContentForm(props: AddContentFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState<number | null>(
    null
  );
  const [submitting, setSubmitting] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [features, setFeatures] = useState<Feature[]>([]);
  const [callToAction, setCallToAction] = useState<string>("");
  const [image, setImage] = useState<File | string | null>(null);
  const [previewImageSrc, setPreviewImageSrc] = useState<string | null>(null);
  const [imageCredit, setImageCredit] = useState<string>("");
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [cropModal, setCropModal] = useState(false);
  const [selectBlogModal, setSelectBlogModal] = useState(false);

  const { setLoading } = useContext(LoaderContext);
  const { url, data } = props;

  useEffect(() => {
    if (data) {
      setTitle(data.title);
      setDescription(data.description);
      setFeatures(data.features || []); // Initialize with empty array if no features
      setCallToAction(data.callToAction);
      setImage(data.imageSrc);
      setImageCredit(data.imageCredit);
    }
  }, [data]);

  useEffect(() => {
    if (image) {
      // Generate a preview URL when the image state changes
      if (typeof image === "string") {
        setPreviewImageSrc(image);
      } else {
        const previewUrl = URL.createObjectURL(image);
        setPreviewImageSrc(previewUrl);

        // Clean up the URL after unmounting or image change
        return () => URL.revokeObjectURL(previewUrl);
      }
    }
  }, [image]);

  const handleFeatureChange = (
    index: number,
    field: keyof Feature,
    value: string
  ) => {
    const updatedFeatures = [...features];
    updatedFeatures[index] = { ...updatedFeatures[index], [field]: value };
    setFeatures(updatedFeatures);
  };

  const openIconPicker = (index: number) => {
    setCurrentFeatureIndex(index);
    setIsModalOpen(true);
  };

  const handleIconSelection = (icon: string) => {
    if (currentFeatureIndex !== null) {
      handleFeatureChange(currentFeatureIndex, "icon", icon);
      setIsModalOpen(false);
    }
  };

  const addFeature = () => {
    setFeatures([
      ...features,
      { icon: "", title: "", description: "", link: "" },
    ]);
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("url", url);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("features", JSON.stringify(features));
      formData.append("callToAction", callToAction);
      formData.append("image", image as File);
      formData.append("imageCredit", imageCredit);
      const response = await axios.post("/api/resources/content", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toastMsg("success", "Content added successfully");
        if (props.customFunction) {
          props.customFunction();
        }
      } else {
        toastMsg("error", response.data.message);
      }
    } catch (error) {
      console.error("Error adding content:", error);
      toastMsg("error", "Failed to add content");
    } finally {
      setLoading(false);
    }
  };

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

  const moveFeatureUp = (index: number) => {
    const newFeatures = [...features];
    const featureToMove = newFeatures.splice(index, 1)[0];
    newFeatures.splice(index - 1, 0, featureToMove);
    setFeatures(newFeatures);
  };

  const moveFeatureDown = (index: number) => {
    const newFeatures = [...features];
    const featureToMove = newFeatures.splice(index, 1)[0];
    newFeatures.splice(index + 1, 0, featureToMove);
    setFeatures(newFeatures);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-2 gap-4 pt-2 px-2">
        <div className="col-span-2">
          <AnimatedInput
            label="Title"
            type="text"
            placeholder="Enter title"
            name="title"
            id="title"
            onchange={(e) => setTitle(e)}
            value={title}
            required
            className="w-full"
          />
        </div>
        <div className="col-span-2">
          <Tiptap
            content={description}
            setContent={setDescription}
            className="col-span-full"
          />
        </div>
        <div className="col-span-2">
          <AnimatedInput
            label="Call to Action"
            type="text"
            placeholder="Enter call to action"
            name="callToAction"
            id="callToAction"
            onchange={(e) => setCallToAction(e)}
            value={callToAction}
            required
            className="w-full"
          />
        </div>

        <div
          className={`col-span-2 sm:col-span-2 text-sm ${
            previewImageSrc ? "flex flex-col" : ""
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
          {previewImageSrc ? (
            <div className="mt-4">
              <Image
                src={previewImageSrc}
                alt={"Resource Image"}
                className="w-full object-cover rounded-md"
                priority={true}
                width={600}
                height={300}
              />
            </div>
          ) : null}
        </div>
        <div className="col-span-2 sm:col-span-2">
          <div className={`flex gap-2 justify-center items-center`}>
            <AnimatedInput
              type="text"
              label={"Image Credit"}
              required={false}
              name={"image_credit"}
              id={"image_credit"}
              className={""}
              onchange={(e) => setImageCredit(e)}
              placeholder={"Add Image Credit"}
              value={imageCredit}
            />
            <Button
              type={`button`}
              onClick={() => {
                setImageCredit("Image by www.freepik.com");
              }}
            >
              Use Freepik
            </Button>
          </div>
        </div>
        {features.map((feature, index) => (
          <div
            className="bg-white p-4 rounded-lg shadow-md col-span-2"
            key={index}
          >
            <Accordion type="single" collapsible>
              <AccordionItem value={`feature-${index}`}>
                <AccordionTrigger>
                  Feature {index + 1} ({feature.title || "Untitled"})
                </AccordionTrigger>
                <AccordionContent>
                  <div className="col-span-1 grid grid-cols-2 gap-3">
                    <AnimatedInput
                      label={`Feature ${index + 1} Title`}
                      type="text"
                      placeholder={`Feature ${index + 1} Title`}
                      name={`feature_${index}_title`}
                      id={`feature_${index}_title`}
                      onchange={(e) => handleFeatureChange(index, "title", e)}
                      value={feature.title}
                      required
                      className={"col-span-2 sm:col-span-1"}
                      parentClass="col-span-2 sm:col-span-1"
                    />
                    <div className="flex gap-3 items-center col-span-2 sm:col-span-1">
                      <label className="text-sm font-medium text-gray-700 inline-block mb-1 ml-3">
                        Feature {index + 1} Icon
                      </label>
                      <Button
                        type="button"
                        className="btn-icon-picker"
                        onClick={() => openIconPicker(index)}
                      >
                        Select Icon
                      </Button>
                      <IconPreview icon={feature.icon} />
                    </div>
                    <div className="col-span-2 flex gap-2 items-center">
                      <AnimatedInput
                        label={`Feature ${index + 1} Link`}
                        type="text"
                        placeholder={`Feature ${index + 1} Link`}
                        name={`feature_${index}_link`}
                        id={`feature_${index}_link`}
                        onchange={(e) => handleFeatureChange(index, "link", e)}
                        value={feature.link}
                        required
                        parentClass=""
                      />
                      <Button
                        type="button"
                        className="btn-select-blog"
                        onClick={() => {
                          setCurrentFeatureIndex(index);
                          setSelectBlogModal(true);
                        }}
                      >
                        Select Blog
                      </Button>
                    </div>
                    <Tiptap
                      content={feature.description}
                      setContent={(value) =>
                        handleFeatureChange(
                          index,
                          "description",
                          value as string
                        )
                      }
                      className="col-span-full"
                    />
                    <div className="flex justify-between col-span-full gap-3">
                      <Button
                        type="button"
                        className="btn-move-up"
                        onClick={() => moveFeatureUp(index)}
                        disabled={index === 0}
                      >
                        <FaArrowUp />
                      </Button>
                      <Button
                        type="button"
                        className="btn-move-down"
                        onClick={() => moveFeatureDown(index)}
                        disabled={index === features.length - 1}
                      >
                        <FaArrowDown />
                      </Button>
                      <Button
                        type="button"
                        className="btn-remove-feature"
                        onClick={() => removeFeature(index)}
                      >
                        <FaTrash />
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
        <Button
          type="button"
          className="btn-add-feature inline-block"
          onClick={addFeature}
        >
          Add Feature
        </Button>
      </div>
      <div className="flex justify-center items-center mt-3">
        <Button
          type="submit"
          className="btn-submit w-full sm:w-1/3"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Update Content"}
        </Button>
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onOpenChange={() => setIsModalOpen(!isModalOpen)}
        header="Choose an Icon"
        size="2xl"
      >
        <IconPicker
          selectedIcon={
            currentFeatureIndex !== null
              ? features[currentFeatureIndex].icon
              : ""
          }
          setSelectedIcon={handleIconSelection}
        />
      </CustomModal>
      <CustomModal
        isOpen={cropModal}
        onOpenChange={() => setCropModal(!cropModal)}
        header={"Image Cropper"}
      >
        <>
          <CropImage
            aspectRatio={"2"}
            imgSrc={`${imgSrc}`}
            customFunction={(file) => {
              setImage(file);
              setCropModal(false);
            }}
            customText="Upload Image"
            circularCrop={false}
          />
        </>
      </CustomModal>
      <CustomModal
        isOpen={selectBlogModal}
        onOpenChange={() => setSelectBlogModal(!selectBlogModal)}
        header={"Select Blog"}
      >
        <div className="grid grid-cols-2 gap-4 overflow-y-auto px-3">
          {props.blogs?.map((blog) => (
            <div
              key={blog.slug}
              className="bg-white p-4 rounded-lg shadow-md col-span-2"
            >
              <h3 className="text-lg font-semibold">{blog.title}</h3>
              <p className="text-sm text-gray-700">{blog.slug}</p>
              <Button
                type="button"
                className="btn-select-blog mt-1"
                onClick={() => {
                  setSelectBlogModal(false);
                  handleFeatureChange(currentFeatureIndex!, "link", `/blog/${blog.slug}`);
                }}
              >
                Select Blog
              </Button>
            </div>
          ))}
        </div>
      </CustomModal>
    </form>
  );
}
