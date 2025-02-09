import React, { useEffect } from 'react';
import ReactQuill from 'react-quill';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { editBlogThunk, getBlogByIdThunk } from '../../../../redux/blogredux/blog.slice';
import { Formik, Field, ErrorMessage, Form } from 'formik';
import { Button, message } from 'antd';

function AdminEditBlog() {
  const { id } = useParams(); // Blog ID from URL
  const AppDispatch = useAppDispatch();
  const blogDetail = useAppSelector((state) => state.blog.detailBlog);
  const navigate = useNavigate(); // Khởi tạo useNavigate

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],
    [{ header: 1 }, { header: 2 }],
    [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
    [{ script: 'sub' }, { script: 'super' }],
    [{ indent: '-1' }, { indent: '+1' }],
    [{ direction: 'rtl' }],
    [{ size: ['small', false, 'large', 'huge'] }],
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ color: [] }, { background: [] }],
    [{ font: [] }],
    [{ align: [] }],
    ['clean'],
  ];

  // Fetch blog details on component load
  useEffect(() => {
    if (id != null) {
      AppDispatch(getBlogByIdThunk(parseInt(id)));
    }
  }, [AppDispatch, id]);

  return (
    <div className="flex-1 grid grid-cols-1 p-[24px] bg-[#f2edf3]">
      <Formik
        enableReinitialize={true}
        initialValues={{
          moTa: blogDetail?.post_content || '',
          title: blogDetail?.post_title || '',
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newBlog = {
              post_title: values.title,
              post_content: values.moTa,
              post_id: id,
            };
            console.log(newBlog);
            
            await AppDispatch(editBlogThunk(newBlog));
            message.success('Cập nhật bài viết thành công!');
            navigate('/admin/quan-li-bai-viet'); // Chuyển hướng về AdminBlog
          } catch (error) {
            message.error('Đã xảy ra lỗi khi cập nhật bài viết.');
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="flex flex-col gap-6">
            {/* Blog Title */}
            <div className="flex w-[100%] flex-col gap-1">
              <label htmlFor="title" className="text-[14px] font-medium text-[#4A4A4A] tracking-wide">
                Tên bài viết
              </label>
              <Field
                type="text"
                name="title"
                className="h-[48px] bg-[#f7f7f7] focus:bg-white focus:shadow-md border border-[#ddd] rounded-lg text-[14px] p-3 outline-none focus:border-[#4A90E2]"
                placeholder="Nhập tên bài viết"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />
            </div>

            {/* Blog Content */}
            <div className="bg-white shadow-lg rounded-xl p-[12px]">
              <label htmlFor="moTa" className="text-[13px] text-[#81818177] font-medium">
                Mô tả
              </label>
              <ReactQuill
                theme="snow"
                value={values.moTa}
                onChange={(value) => setFieldValue('moTa', value)}
                modules={{ toolbar: toolbarOptions }}
                className="bg-[#81818113] focus:bg-[#81818149] transition-all ease-in-out duration-500 rounded-lg text-sm p-2 h-[500px] overflow-y-auto"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Button
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
                style={{
                  height: '48px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  padding: '0 16px',
                }}
              >
                Lưu bài viết
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AdminEditBlog;
