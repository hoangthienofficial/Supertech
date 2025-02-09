import React, { useRef, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/hooks";
import { changeUploadImage } from "../../../../../redux/user/user.slice";
import { IMG_BACKEND, IMG_BACKEND_USER } from "../../../../../constants";
import useSweetAlert from "../../../../../hooks/Notification.hook";

function ImageUploader() {
  const {showAlert}= useSweetAlert();

  const imageRef = useRef<HTMLInputElement | null>(null); // Ref for file input
  const imgUser=useAppSelector((state)=>state.user.imgUser)
  const dispatch = useAppDispatch(); // To dispatch the upload action
  const user: any = useAppSelector((state) => state.user.user);
  const [imageSrc, setImageSrc] = useState<string | null>(`${IMG_BACKEND}/${imgUser}` || null); // Initialize with existing user image

  // Handle file input change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl); // Set the preview image URL
      uploadImage(file); // Call the upload function directly
    }
  };


  // Handle image upload
  const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("user_image", file); // Append the image file to FormData

    try {
      // Dispatch the thunk action to upload the image
      await dispatch(changeUploadImage(formData));
      showAlert("success","Chỉnh hình thành công");

      console.log("Image uploaded successfully");
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  // Open file input when editing
  const editProfileHandler = () => {
    imageRef.current?.click(); // Open the file input dialog
  };

  return (
    <div>
      <div className="w-[15rem] h-[15rem] rounded-[50%] overflow-hidden">
      <div className="xl:text-[25px] md:text-[2rem]">
                        {  <div
                className={`flex text-[3rem] h-[15rem] w-full items-center justify-center rounded-full ${user?.user_image ? "bg-cover bg-center bg-no-repeat" : "bg-[#F62682] text-[16px] text-white "} `}
                style={{
                  backgroundImage: user?.user_image ? `url(${IMG_BACKEND_USER}/${user.user_image})` : "none",
                }}
              >
                              {(user?.user_image==null||user?.user_image=='' && user?.user_name) ? user.user_name[0].toUpperCase() : null}

              </div>}
                    </div>
       
      </div>
      <div className="mt-[.5rem] cursor-pointer flex justify-center items-center">
        <div
          className="flex text-[1.8rem] mt-[1rem] py-[.6rem] border border-[var(--custom-color)] w-[10rem] items-center justify-center rounded-[4rem]"
          onClick={editProfileHandler}
        >
          Chỉnh sửa
        </div>
        <input
          id="fileInput"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
          ref={imageRef}
        />
      </div>
    </div>
  );
}

export default ImageUploader;
