import React from "react";
import { Redirect } from "react-router-dom";

//pages
import DashboardAnalytics from "../pages/DashboardAnalytics";
import Starter from "../pages/Pages/Starter/Starter";

//login
import Login from "../pages/Authentication/Login";
import Logout from "../pages/Authentication/Logout";

//users management
import UsersManagement from "../pages/Users/UsersManagement";
import UsersPermission from "../pages/Users/UsersPermission";
import FaqsList from "../pages/Faqs/FaqsList";
import FaqsDetail from "../pages/Faqs/FaqsDetail";
import UserDetail from "../pages/Users/UserDetail";
import DealerList from "../pages/Dealers/DealerList";
import CreateEditDealer from "../pages/Dealers/CreateEditDealer";
import DealerDetail from "../pages/Dealers/DealerDetail";
import DealerInfoList from "../pages/Dealers/DealerInfoList";
import DealerPaymentList from "../pages/Dealers/DealerPaymentList";
import DealerPromotionList from "../pages/Dealers/DealerPromotionList";
import DealerServiceList from "../pages/Dealers/DealerServiceList";
import DealerInfoDetail from "../pages/Dealers/DealerInfoDetail";
import CreateEditDealerInfo from "../pages/Dealers/CreateEditDealerInfo";
import DealerPaymentDetail from "../pages/Dealers/DealerPaymentDetail";
import DealerServiceDetail from "../pages/Dealers/DealerServiceDetail";
import DealerPromotionDetail from "../pages/Dealers/DealerPromotionDetail";
import SchemaList from "../pages/Schema/SchemaList";
import PageList from "../pages/pagesManagement/PageList";
import PageDetail from "../pages/pagesManagement/PageDetail";
import CreateEditPage from "../pages/pagesManagement/CreateEditPage";
import SchemaDetail from "../pages/Schema/SchemaDetail";
import AddUser from "../pages/Users/AddUser";
import TaxonomyList from "../pages/Taxanomy/TaxonomyList";
import TaxonomyDetail from "../pages/Taxanomy/TaxonomyDetail";
import AddTaxonomy from "../pages/Taxanomy/AddTaxonomy";
import PostList from "../pages/Posts/PostList";
import CreateEditPost from "../pages/Posts/CreateEditPost";
import PostDetail from "../pages/Posts/PostDetail";
import CreateEditDealerPromotion from "../pages/Dealers/CreateEditDealerPromotion";
import CreateEditDealerService from "../pages/Dealers/CreateEditDealerService";
import LinksList from "../pages/Links/LinksList";
import LinksDetail from "../pages/Links/LinksDetail";
import MediaList from "../pages/Media/MediaList";
import BannersList from "../pages/Banners/BannersList";
import PostStatisitcs from "../pages/Statistics/PostStatistics";
import UserStatistics from "../pages/Statistics/UserStatistics";
import UserProfile from "../pages/Authentication/user-profile";
import Roles from "../pages/Roles/Roles";
import HomeBanner from "../pages/HomeBanner";
import ManageInfomation from "../pages/ManageInformation";
import SeoList from "../pages/Seo/SeoList";
const authProtectedRoutes = [
  { path: "/manage-banner", component: HomeBanner },
  { path: "/pages-starter", component: Starter },
  { path: "/dashboard-analytics", component: DashboardAnalytics },
  { path: "/users", component: UsersManagement },
  { path: "/permission", component: UsersPermission },
  { path: "/user/add/:id", component: AddUser },
  { path: "/users/:id", component: UserDetail },
  { path: "/profile", component: UserProfile },
  { path: "/faqs", component: FaqsList },
  { path: "/faqs/:id", component: FaqsDetail },
  { path: "/taxonomy", component: TaxonomyList },
  { path: "/taxonomy/add/:id", component: AddTaxonomy },
  { path: "/taxonomy/:id", component: TaxonomyDetail },
  { path: "/dealers", component: DealerList },
  { path: "/dealers/create", component: CreateEditDealer },
  { path: "/dealers/edit/:id", component: CreateEditDealer },
  { path: "/dealers/:id", component: DealerDetail },
  { path: "/dealers-info", component: DealerInfoList },
  { path: "/dealers-info/:id", component: DealerInfoDetail },
  { path: "/dealers-info/new/create", component: CreateEditDealerInfo },
  { path: "/dealers-info/edit/:id", component: CreateEditDealerInfo },
  { path: "/dealers-payment", component: DealerPaymentList },
  { path: "/dealers-payment/:id", component: DealerPaymentDetail },
  { path: "/dealers-promotion", component: DealerPromotionList },
  { path: "/dealers-promotion/:id", component: DealerPromotionDetail },
  { path: "/dealers-service", component: DealerServiceList },
  { path: "/dealers-service/:id", component: DealerServiceDetail },
  { path: "/schemas", component: SchemaList },
  { path: "/schemas/:id", component: SchemaDetail },
  {
    path: "/pages-management",
    component: PageList,
  },
  {
    path: "/roles",
    component: Roles,
  },
  {
    path: "/pages-management/create",
    component: CreateEditPage,
  },
  {
    path: "/pages-management/:id",
    component: PageDetail,
  },
  {
    path: "/pages-management/edit/:id",
    component: CreateEditPage,
  },
  {
    path: "/posts",
    component: PostList,
  },
  {
    path: "/posts/create",
    component: CreateEditPost,
  },
  {
    path: "/posts/:id",
    component: PostDetail,
  },
  {
    path: "/posts/edit/:slug",
    component: CreateEditPost,
  },
  {
    path: "/dealer-promotion/create",
    component: CreateEditDealerPromotion,
  },
  {
    path: "/dealer-promotion/edit/:id",
    component: CreateEditDealerPromotion,
  },
  {
    path: "/dealer-service/create",
    component: CreateEditDealerService,
  },
  {
    path: "/dealer-service/edit/:id",
    component: CreateEditDealerService,
  },
  {
    path: "/links",
    component: LinksList,
  },
  {
    path: "/links/:id",
    component: LinksDetail,
  },
  {
    path: "/media-management",
    component: MediaList,
  },
  {
    path: "/banners-management",
    component: BannersList,
  },
  {
    path: "/post-statistics",
    component: PostStatisitcs,
  },
  {
    path: "/user-statistics",
    component: UserStatistics,
  },
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/dashboard" />,
  },
  {
    path: "/manage-information",
    component: () => <ManageInfomation />,
  },
  {
    path: "/seo",
    component: SeoList,
  },
];

const publicRoutes = [
  // Authentication Page
  { path: "/login", component: Login },
  { path: "/logout", component: Logout },
  // {
  //   path: "/pages-management",
  //   component: PageList
  // },
  // {
  //   path: "/pages-management/create",
  //   component: CreateEditPage
  // },
  // {
  //   path: "/pages-management/edit/:id",
  //   component: CreateEditPage
  // },
  // {
  //   path: "/pages-management/:id",
  //   component: PageDetail
  // },
  // Users management
];

export { authProtectedRoutes, publicRoutes };
