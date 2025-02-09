import React from "react";
import { Link } from "react-router-dom";
import { getMedia_post } from "../../../../service/Blog/blog.service";
import { FaArrowRightLong } from "react-icons/fa6";
import DOMPurify from 'dompurify';
import dayjs from "dayjs";

function BlogCard(props) {
  const sanitizedContent = DOMPurify.sanitize(props.props.post_content);
  console.log(props.props.media_posts);
  
  return (
    <div className="flex flex-col w-[32%] max-md:w-full">
      <Link to={`/bai-viet-chi-tiet/${props.props.post_id}`}>
        <div className="flex flex-col pt-10 pb-8 w-full border-4 border-slate-200 text-neutral-500 rounded-lg max-md:px-5 text-[18px] min-h-[400px]">
          <img  
            loading="lazy"
            src={`https://res.cloudinary.com/dcvkmhlhw/image/upload/v1732821311/Blog/${props.props.media_posts[0].media_url}`}
            alt={""}
            className="object-contain w-full aspect-[2.11] rounded-lg"
          />
          <div className="flex gap-6 items-start mt-6 px-10">
            <div className="flex items-center gap-2 text-[12px] font-medium">
              <span>💬</span>
              <span>{} Bình luận</span>
            </div>
            <div className="flex items-center gap-2 text-[12px] font-medium">
              <span>🕒</span>
              <span> {dayjs(props.props.post_date).format('YYYY-MM-DD HH:mm:ss')}</span>
            </div>
          </div>
          <div className="mt-3 text-[18px] font-bold text-neutral-900 px-10 leading-[1.2]">
            {props.props.post_title?.length > 70
              ? `${props.props.post_title.substring(0, 70)}...`
              : props.props.post_title}
          </div>
          <div
            className="mt-3 text-[14px] text-neutral-700 font-light line-clamp-3 px-10 leading-[1.3] flex-1"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
          <button className="flex gap-5 mt-5 px-10 py-2 text-zinc-500 rounded hover:text-zinc-700 flex-initial">
            Đọc ngay {<FaArrowRightLong />}
          </button>
        </div>
      </Link>
    </div>
  );
}

export default BlogCard;