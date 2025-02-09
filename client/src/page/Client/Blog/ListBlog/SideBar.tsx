import dayjs from "dayjs";
import React from "react";
import { Link } from "react-router-dom";

function Sidebar(props) {
  return (
    <Link to={`/bai-viet-chi-tiet/${props.props.post_id}`}>
      <div className="flex gap-4 items-start pt-2 pb-4">
        <img
          loading="lazy"
          src={`https://res.cloudinary.com/dcvkmhlhw/image/upload/v1732821311/Blog/${props.props.media_posts?.length > 0 ? props.props.media_posts[0].media_url : ''}`}
          alt={props.props.post_title}
          className="object-cover w-20 h-20 rounded"
        />
        <div className="flex flex-col">
          <h3 className="text-[15px] font-medium text-zinc-800 py-3 ">
            {props.props.post_title?.length > 70
              ? `${props.props.post_title.substring(0, 70)}...`
              : props.props.post_title}
          </h3>
          <div className="text-[12px] text-neutral-500 line-clamp-2">
            <span>📅 {dayjs(props.props.post_date).format('YYYY-MM-DD HH:mm:ss')}</span>
            {/* <span>✆ {props.props.post_content}</span> */}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default Sidebar;