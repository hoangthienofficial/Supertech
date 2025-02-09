import { FaStar } from "react-icons/fa";

export const StarRating = ({ comments }) => {
    // Đếm số lượt đánh giá cho từng sao
    const starCounts = Array(6).fill(0); // Mảng để lưu số lượng từ 0 đến 5 sao
    comments?.forEach(comment => {
      if (comment.comment_star >= 1 && comment.comment_star <= 5) {
        starCounts[comment.comment_star]++;
      }
    });
  console.log(comments);
  const totalStars = comments?.reduce((total, comment) => total + comment?.comment_star, 0);

  // Tính trung bình sao

    // Tính tổng số lượt đánh giá
    const totalComments = comments?.length;
    const averageStar = totalComments ? (totalStars / totalComments).toFixed(2) : 0; // Làm tròn đến 2 chữ số thập phân

    return (
      <div>
           <div className="mt-4 w-[50%]">
          <div className="text-[2.4rem] font-semibold text-red-500 flex items-center gap-[.5rem]">
            {averageStar}<FaStar className="text-[1.5rem]" />{" "}
            <span className="text-[1.8rem] text-blue-600">{totalComments} đánh giá</span>
          </div>
          {/* Rating bars for each star */}
       
        </div>
        {[5, 4, 3, 2, 1].map(star => {
          const count = starCounts[star];
          const percentage = totalComments ? (count / totalComments) * 100 : 0; // Tính phần trăm
          const width = `${percentage}%`; // Độ rộng của thanh tiến trình
  
          return (
            <div className="flex items-center" key={star}>
              <span className="text-[2rem]">{star}★</span>
              <div className="w-3/4 h-2 bg-gray-200 ml-2 rounded">
                <div className="bg-orange-400 h-2" style={{ width }} />
              </div>
              <span className="text-[2rem] ml-2">{percentage.toFixed(2)}%</span>
            </div>
          );
        })}
      </div>
    );
}