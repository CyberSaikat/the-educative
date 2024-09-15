"use client";

import { LoaderContext } from "@/context/loaderContext";
import { CropImage } from "@/utils/imageCropper";
import toastMsg from "@/utils/toaster";
import React, { useContext, useRef, useState } from "react";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import UserAvatar from "@/assets/images/user.png";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CustomUser } from "@/abstract/type";
import CustomModal from "@/components/custom-ui/customModal";

export default function ProfileCardBody(userdata: CustomUser) {
  const { setLoading } = useContext(LoaderContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const router = useRouter();
  userdata = userdata.userdata;

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setImgSrc(reader.result as string);
        setUpdateModalOpen(true);
      };
    }
  };

  const uploadImage = async (file: File) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);

    await fetch("/api/user/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          toastMsg("success", "Profile picture updated successfully");
          router.refresh();
          setUpdateModalOpen(false);
        } else {
          toastMsg("error", data.message);
        }
        setLoading(false);
      })
      .catch((error) => {
        toastMsg("error", "Error updating profile picture");
        console.error("Error:", error);
        setLoading(false);
      });
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="col-span-2 sm:col-span-1 flex flex-col justify-center items-center">
          <div className="img_box relative">
            {userdata.avatar ? (
              <Image
                src={"/uploads/avatars/" + userdata.avatar.filename}
                alt={"Profile"}
                width={180}
                height={180}
                priority={true}
                className="rounded-full border-4 border-primary cursor-pointer p-1"
                onClick={handleButtonClick}
              />
            ) : (
              <>
                <Image
                  src={UserAvatar.src}
                  alt={"Profile"}
                  width={180}
                  height={180}
                  priority={true}
                  className="rounded-full border-4 border-primary cursor-pointer p-1"
                  onClick={handleButtonClick}
                />
              </>
            )}
            <Button
              className="p-2 h-auto rounded-full absolute bottom-3 right-3"
              onClick={handleButtonClick}
            >
              <FaEdit size={16} />
            </Button>
            <Input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>
          <div className="flex">
            <p className="text-xl font-semibold">{userdata.name}</p>
          </div>
        </div>
      </div>
      <CustomModal
        isOpen={updateModalOpen}
        onOpenChange={() => setUpdateModalOpen(!updateModalOpen)}
        header={"Crop Image"}
      >
        <CropImage
          aspectRatio={"1"}
          imgSrc={`${imgSrc}`}
          customFunction={uploadImage}
          customText="Upload Image"
          circularCrop={true}
        />
      </CustomModal>
    </>
  );
}
