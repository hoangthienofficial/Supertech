import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _bankauto from  "./bankauto.js";
import _banner from  "./banner.js";
import _categories from  "./categories.js";
import _chat from  "./chat.js";
import _chatRoom from  "./chatRoom.js";
import _code from  "./code.js";
import _comment_posts from  "./comment_posts.js";
import _comment_product from  "./comment_product.js";
import _detail_order from  "./detail_order.js";
import _discount from  "./discount.js";
import _favorite_product from  "./favorite_product.js";
import _history_bank from  "./history_bank.js";
import _image_product from  "./image_product.js";
import _infor_product from  "./infor_product.js";
import _likes from  "./likes.js";
import _media_post from  "./media_post.js";
import _order from  "./order.js";
import _order_status from  "./order_status.js";
import _posts from  "./posts.js";
import _product_colors from  "./product_colors.js";
import _product_quality from  "./product_quality.js";
import _product_storage from  "./product_storage.js";
import _products from  "./products.js";
import _replies_comment_product from  "./replies_comment_product.js";
import _setting from  "./setting.js";
import _user from  "./user.js";
import _user_discounts from  "./user_discounts.js";

export default function initModels(sequelize) {
  const bankauto = _bankauto.init(sequelize, DataTypes);
  const banner = _banner.init(sequelize, DataTypes);
  const categories = _categories.init(sequelize, DataTypes);
  const chat = _chat.init(sequelize, DataTypes);
  const chatRoom = _chatRoom.init(sequelize, DataTypes);
  const code = _code.init(sequelize, DataTypes);
  const comment_posts = _comment_posts.init(sequelize, DataTypes);
  const comment_product = _comment_product.init(sequelize, DataTypes);
  const detail_order = _detail_order.init(sequelize, DataTypes);
  const discount = _discount.init(sequelize, DataTypes);
  const favorite_product = _favorite_product.init(sequelize, DataTypes);
  const history_bank = _history_bank.init(sequelize, DataTypes);
  const image_product = _image_product.init(sequelize, DataTypes);
  const infor_product = _infor_product.init(sequelize, DataTypes);
  const likes = _likes.init(sequelize, DataTypes);
  const media_post = _media_post.init(sequelize, DataTypes);
  const order = _order.init(sequelize, DataTypes);
  const order_status = _order_status.init(sequelize, DataTypes);
  const posts = _posts.init(sequelize, DataTypes);
  const product_colors = _product_colors.init(sequelize, DataTypes);
  const product_quality = _product_quality.init(sequelize, DataTypes);
  const product_storage = _product_storage.init(sequelize, DataTypes);
  const products = _products.init(sequelize, DataTypes);
  const replies_comment_product = _replies_comment_product.init(sequelize, DataTypes);
  const setting = _setting.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);
  const user_discounts = _user_discounts.init(sequelize, DataTypes);

  products.belongsTo(categories, { as: "category", foreignKey: "category_id"});
  categories.hasMany(products, { as: "products", foreignKey: "category_id"});
  likes.belongsTo(comment_product, { as: "comment", foreignKey: "comment_id"});
  comment_product.hasMany(likes, { as: "likes", foreignKey: "comment_id"});
  replies_comment_product.belongsTo(comment_product, { as: "parent_comment", foreignKey: "comment_id"});
  comment_product.hasMany(replies_comment_product, { as: "replies_comment_products", foreignKey: "comment_id"});
  order.belongsTo(discount, { as: "discount_discount", foreignKey: "discount"});
  discount.hasMany(order, { as: "orders", foreignKey: "discount"});
  user_discounts.belongsTo(discount, { as: "discount", foreignKey: "discount_id"});
  discount.hasMany(user_discounts, { as: "user_discounts", foreignKey: "discount_id"});
  product_colors.belongsTo(image_product, { as: "image", foreignKey: "image_id"});
  image_product.hasMany(product_colors, { as: "product_colors", foreignKey: "image_id"});
  products.belongsTo(infor_product, { as: "infor_product_infor_product", foreignKey: "infor_product"});
  infor_product.hasMany(products, { as: "products", foreignKey: "infor_product"});
  detail_order.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(detail_order, { as: "detail_orders", foreignKey: "order_id"});
  history_bank.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(history_bank, { as: "history_banks", foreignKey: "order_id"});
  order_status.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(order_status, { as: "order_statuses", foreignKey: "order_id"});
  likes.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(likes, { as: "likes", foreignKey: "post_id"});
  media_post.belongsTo(posts, { as: "post", foreignKey: "post_id"});
  posts.hasMany(media_post, { as: "media_posts", foreignKey: "post_id"});
  product_quality.belongsTo(product_colors, { as: "color", foreignKey: "color_id"});
  product_colors.hasMany(product_quality, { as: "product_qualities", foreignKey: "color_id"});
  product_storage.belongsTo(product_colors, { as: "color", foreignKey: "color_id"});
  product_colors.hasMany(product_storage, { as: "product_storages", foreignKey: "color_id"});
  product_quality.belongsTo(product_storage, { as: "storage", foreignKey: "storage_id"});
  product_storage.hasMany(product_quality, { as: "product_qualities", foreignKey: "storage_id"});
  comment_product.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(comment_product, { as: "comment_products", foreignKey: "product_id"});
  detail_order.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(detail_order, { as: "detail_orders", foreignKey: "product_id"});
  favorite_product.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(favorite_product, { as: "favorite_products", foreignKey: "product_id"});
  product_colors.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_colors, { as: "product_colors", foreignKey: "product_id"});
  product_quality.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_quality, { as: "product_qualities", foreignKey: "product_id"});
  product_storage.belongsTo(products, { as: "product", foreignKey: "product_id"});
  products.hasMany(product_storage, { as: "product_storages", foreignKey: "product_id"});
  likes.belongsTo(replies_comment_product, { as: "reply", foreignKey: "replies_id"});
  replies_comment_product.hasMany(likes, { as: "likes", foreignKey: "replies_id"});
  chat.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(chat, { as: "chats", foreignKey: "user_id"});
  code.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(code, { as: "codes", foreignKey: "user_id"});
  comment_posts.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment_posts, { as: "comment_posts", foreignKey: "user_id"});
  comment_product.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(comment_product, { as: "comment_products", foreignKey: "user_id"});
  favorite_product.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(favorite_product, { as: "favorite_products", foreignKey: "user_id"});
  history_bank.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(history_bank, { as: "history_banks", foreignKey: "user_id"});
  likes.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(likes, { as: "likes", foreignKey: "user_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});
  replies_comment_product.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(replies_comment_product, { as: "replies_comment_products", foreignKey: "user_id"});
  user_discounts.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(user_discounts, { as: "user_discounts", foreignKey: "user_id"});

  return {
    bankauto,
    banner,
    categories,
    chat,
    chatRoom,
    code,
    comment_posts,
    comment_product,
    detail_order,
    discount,
    favorite_product,
    history_bank,
    image_product,
    infor_product,
    likes,
    media_post,
    order,
    order_status,
    posts,
    product_colors,
    product_quality,
    product_storage,
    products,
    replies_comment_product,
    setting,
    user,
    user_discounts,
  };
}
