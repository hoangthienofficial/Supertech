import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import UserTemplate from "../template/user/UserTemplate";
import Search from "../page/Client/Search/Search";
import ListBlog from "../page/Client/Blog/ListBlog/ListBlog";
import Login from "../page/Client/Auth/Login/Login";
import Resigter from "../page/Client/Auth/Resigter/Resigter";
import ForgetPassword from "../page/Client/Auth/Forget/ForgetPassword";
import DetailBlog from "../page/Client/Blog/DetailBlog/DetailBlog";
import Cart from "../page/Client/Cart/Cart";
import Pay from "../page/Client/Pay/Pay";
import Bill from "../page/Client/Bill/Bill";
import CustomerCare from "../page/Client/PagesMore/CustomerCare";
import QuestionAnswer from "../page/Client/PagesMore/QuestionAnswer";
import Introduce from "../page/Client/Introduce/Introduce";
import Contact from "../page/Client/Contact/Contact";
import AuthTemplate from "../page/Client/Auth/Auth";
import FavoriteProduct from "../page/Client/FavoriteProduct/FavoriteProduct";
import AdminTemplate from "../template/admin/AdminTemplate";
import AdminHome from "../page/Admin/Home/AdminHome";
import AdminProduct from "../page/Admin/Product/AdminProduct";
import AdminCatelogry from "../page/Admin/Catelogory/AdminCatelogry";
import AdminUser from "../page/Admin/User/AdminUser";
import AdminCommentProduct from "../page/Admin/Product/Comment/AdminCommentProduct";
import AdminOrderDetail from "../page/Admin/Order/OrderDetail/AdminOrderDetail";
import AdminOrder from "../page/Admin/Order/AdminOrder";
import UserDetail from "../page/Client/User/UserDetail/UserDetail";
import Order from "../page/Client/User/Order/Order";
import User from "../page/Client/User/User";
import OrderDetail from "../page/Client/User/OrderDetail/OrderDetail";

import ChatAdmin from "../page/Admin/Chat/ChatAdmin";
import AdminStaff from "../page/Admin/User/AdminStaff";
import AdminSetting from "../page/Admin/Setting/AdminSetting";
import AdminAddProduct from "../page/Admin/Product/Component/AdminAddProduct";
import AdminEditProduct from "../page/Admin/Product/Component/AdminEditProduct";
import AdminCreateAccount from "../page/Admin/User/Component/AdminCreateAccount";
import AdminCustomerEdit from "../page/Admin/User/Component/AdminCustomerEdit";

import AdminCommentPost from "../page/Admin/Blog/Comment/AdminComment";
import AdminBlog from "../page/Admin/Blog/AdminBlog";
import AdminAddBlog from "../page/Admin/Blog/Component/AdminAddBlog";
import AdminEditBlog from "../page/Admin/Blog/Component/AdminEditBlog";
import ListProduct from "../page/Client/ListProduct/ListProduct";
import DetailProduct from "../page/Client/DetailProduct/DetailProduct";
import AdminProductDetail from "../page/Admin/Product/Component/AdminProductDetail";
import CouponSection from "../page/Client/Voucher/Voucher";
import { AdminRoute, AuthRoute, PrivateRoute } from "./component/RouterPrivate";
// import  RouterLogin from "./component/RouterValues";
import ListOrder from "../page/Admin/Order/ListOrder/ListOrder";

import ChangePasswordUser from "../page/Client/User/UserDetail/Component/ChangePasswordUser";
import { Paths } from "./component/RouterValues";
import AdminCommentDetail from "../page/Admin/Product/Comment/AdminCommentDetail";
import AdminData from "../page/Admin/Data/AdminData";
import FeatureUnderConstructionPage from "../page/Client/PagesMore/PageAll";
// import PrivateRoute from "./component/RouterPrivate";
const Home = lazy(
  () => import("../page/Client/Home/Home"),
);
export const router = createBrowserRouter([
  {
    element: <UserTemplate />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: Paths.Search,
        element: <Search />,
      },
      {
        path: Paths.FavoriteProducts,
        element:  <PrivateRoute element={<FavoriteProduct />} />,
      },

      {
        path: Paths.ListProducts,
        element: <ListProduct />,
      },
      {
        path: Paths.ProductDetail,
        element: <DetailProduct />,
      },
      // Blog
      {
        path: Paths.Blogs,
        element: <ListBlog />,
      },
      {
        path: Paths.BlogDetail,
        element: <DetailBlog />,
      },
      // user
      {
        path: Paths.UserOrderDetail,
        element: (
          <PrivateRoute element={<OrderDetail />} />

        ),

      },

      {

        element: <User />,
        children: [
          {
            path: Paths.Profile,

            element: <PrivateRoute element={<UserDetail />} />,
          },
          {
            path: Paths.ChangePassword,

            element: <PrivateRoute element={<ChangePasswordUser />} />,
          },
          {
            path: Paths.UserOrders,
            element: <PrivateRoute element={<Order />} />,
          },

        ]
      },
      {
        path: Paths.Voucher,
        element: <CouponSection />
      },
      // Mua hàng
      {
        path: Paths.Cart,
        element: <Cart />,
      },

      {
        path: Paths.Checkout,
        element: (
          <PrivateRoute element={  <Pay />}/>
        

        ),
      },

      {
        path: Paths.Bill,
        element: (
          <PrivateRoute element={  <Bill />}/>
          

        ),

      },
      // các trang khác
      {
        path: Paths.Introduce,
        element: <Introduce />,
      },
      {
        path: Paths.Contact,
        element: <Contact />,
      },
      {
        path: Paths.CustomerCare,
        element: <CustomerCare />,
      },

      {
        path: Paths.QuestionAnswer,
        element: <QuestionAnswer />,
      },
    ],
  },
  {

    element: <AuthTemplate />,
    children: [
      {
        path: Paths.Login,
        element: <AuthRoute element={<Login />} />,
      },
      {
        path: Paths.Register,
        element: <AuthRoute element={<Resigter />} />,
      },
      {
        path: Paths.ForgetPassword,
        element: <AuthRoute element={<ForgetPassword />} />,
      },
    ]

  },
  {
    path: Paths.Admin.PathsAdmin,
    element: 
    <AdminRoute element={  <AdminTemplate />}/>
    // <AdminTemplate/>
  ,
    children: [
      {
        path: Paths.Admin.Dashboard,
        element: <AdminHome />
      },
      // Loại sản phẩm
      {
        path: Paths.Admin.Categories,
        element: <AdminCatelogry />
      },
      // sản phẩm
      {
        path: Paths.Admin.Products,
        element: <AdminProduct />
      },
      {
        path: Paths.Admin.ProductDetail,
        element: <AdminProductDetail />
      },
      {
        path: Paths.Admin.AddProduct,
        element: <AdminAddProduct />
      }, {
        path: Paths.Admin.EditProduct,
        element: <AdminEditProduct />
      },


      {
        path: Paths.Admin.ProductComments,
        element: <AdminCommentProduct />
      },
      {
        path: Paths.Admin.ProductCommentsDetail,
        element: <AdminCommentDetail />
      },
      // Blog
      {
        path: Paths.Admin.Blogs,
        element: <AdminBlog />
      },
      {
        path: Paths.Admin.AddBlog,
        element: <AdminAddBlog />
      },
      {
        path: Paths.Admin.Chart,
        element: <AdminData />
      },
      {

        path: Paths.Admin.EditBlog,
        element: <AdminEditBlog />
      },
      {
        path: Paths.Admin.BlogComments,
        element: <AdminCommentPost />
      },

      // Khách hàng
      {
        path: Paths.Admin.Customers,
        element: <AdminUser />
      },
      {
        path: Paths.Admin.Staff,
        element: <AdminStaff />
      }
      , {
        path: Paths.Admin.AddStaff,
        element: <AdminCreateAccount />
      },


      {
        path: Paths.Admin.EditStaff,
        element: <AdminCustomerEdit />
      },


      // đơn hàng
      {
        path: Paths.Admin.Orders, // Không có dấu "/"
        element: <AdminOrder />,
        children: [
          {
            path: '', // Đường dẫn mặc định, tương ứng với "/admin/quản-lí-đơn-hàng"
            element: <PrivateRoute element={<ListOrder />} />,
          },
          {
            path: Paths.Admin.OrderDetail, // Đường dẫn tương đối
            element: <PrivateRoute element={<AdminOrderDetail />} />,
          },
        ],
      },




      {
        path: Paths.Admin.Chat,
        element: <ChatAdmin />
      },
      {
        path: Paths.Admin.Settings,
        element: <AdminSetting />
      }
    ]
  },
  {path:'*', element:<FeatureUnderConstructionPage/>}
  
]);
