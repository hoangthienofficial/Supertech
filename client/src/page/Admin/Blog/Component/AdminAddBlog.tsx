import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useAppDispatch } from "../../../../redux/hooks";
import { createBlogThunk } from "../../../../redux/blogredux/blog.slice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

function AdminAddBlog() {
  const AppDispatch = useAppDispatch();
  const Navigate = useNavigate();
  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image", "video", "formula"],
    [{ header: 1 }, { header: 2 }],
    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ size: ["small", false, "large", "huge"] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ["clean"],
  ];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Tiêu đề bài viết là bắt buộc"),
    content: Yup.string().required("Nội dung bài viết là bắt buộc"),
    media_url: Yup.mixed().required("Ảnh là bắt buộc").nullable(),
  });

  return (
    <Formik
      initialValues={{
        title: "",
        media_url: null,
        content: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        const data = {
          post_title: values.title,
          media_url: values.media_url,
          post_content: values.content,
          post_date: new Date(),
        };

        const payload = await AppDispatch(createBlogThunk(data));
        console.log("Payload", payload.payload.post_id);
        Navigate("/admin/quan-li-bai-viet");
        Swal.fire({
          icon: "success",
          title: "Thêm bài viết thành công",
          showConfirmButton: false,
        });
      }}
    >
      {({ setFieldValue }) => (
        <Form className="flex-1 grid grid-cols-1 p-[24px] bg-[#f2edf3]">
          <div className="bg-white min-h-[1500px] shadow-lg rounded-xl row-span-2 leading-[2] box-border p-[24px] gap-6 flex flex-col">
            <div className="flex justify-between">
              <span className="text-[30px] font-medium text-[#ffd700]">Bài Viết</span>
              <button type="submit">
                <span className="text-[20px] bg-violet-600 rounded-xl px-7 py-4 hover:bg-violet-700 font-medium text-[#ffffff]">
                  Thêm Bài Viết
                </span>
              </button>
            </div>

            <div className="flex h-auto flex-col gap-4">
              <label htmlFor="title" className="text-[13px] text-[#81818177] font-medium">Tiêu đề bài viết</label>
              <Field
                type="text"
                className="h-[48px] bg-[#81818113] focus:text-[#050101] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none"
                id="title"
                name="title"
              />
              <ErrorMessage name="title" component="div" className="text-[15px] text-[red] font-semibold" />
            </div>

            <div className="flex h-auto flex-col gap-4">
              <label htmlFor="file" className="text-[13px] text-[#81818177] font-medium">Ảnh</label>
              <input
                type="file"
                onChange={(e) => setFieldValue("media_url", e.currentTarget.files[0])}
                className="h-[48px] bg-[#81818113] focus:text-[#000000] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-[13px] p-[12px] outline-none"
                id="file"
                name="media_url"
              />
              <ErrorMessage name="media_url" component="div" className="text-[15px] text-[red] font-semibold" />
            </div>

            <div className="flex flex-col h-full w-full gap-4">
              <label htmlFor="content" className="text-[14px] text-[#81818177] font-medium">Nội dung bài viết</label>
              <Field name="content">
                {({ field }) => (
                  <ReactQuill
                    id="content"
                    value={field.value}
                    onChange={(value) => setFieldValue("content", value)}
                    modules={{ toolbar: toolbarOptions }}
                    className="bg-white flex-1 shadow-lg rounded-xl row-span-2 gap-3 flex flex-col"
                  />
                )}
              </Field>
              <ErrorMessage name="content" component="div" className="text-[15px] text-[red] font-semibold" />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

export default AdminAddBlog;
