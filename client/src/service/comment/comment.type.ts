type User = {
    user_id: number;
    user_name: string;
    user_email: string;
    user_password: string;
    user_address: string | null;
    user_phone: string | null;
    user_image: string;
    user_role: number;
    level: number | null;
    user_gender: string | null;
    user_birth: string | null;
    user_time: string | null;
};

type Like = {
    like_id: number;
    user_id: number;
    post_id: number | null;
    comment_id: number | null;
    replies_id: number | null;
};

type ReplyToComment = {
    id: number;
    comment: string;
    user_id: number;
    comment_id: number;
    repiles_date: string | null;
    user: User;
    likes: Like[];
};

type Comment = {
    comment_id: number;
    comment_date: string;
    comment_content: string;
    comment_star: number;
    isPurchase: boolean;
    product_id: number;
    user_id: number;
    user: User;
    likes: Like[];
    replies_comment_products: ReplyToComment[];
};

type CommentList = Comment[];