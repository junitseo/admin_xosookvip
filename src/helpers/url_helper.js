//permission

export const GET_ALL_PERMISSION = "/api/v1/permission/getPermissions";

//Roles
export const GET_ALL_ROLES = "/api/v1/roles/getRoles";
export const EDIT_ROLE_PERMISSION = "/api/v1/roles/editRolePermission";
export const ADD_NEW_ROLES = "/api/v1/roles/addNewRole";
export const DELETE_ROLES = "/api/v1/roles/deleteRole";
export const UPDATE_ROLES = "/api/v1/roles/editRole";

//REGISTER
export const POST_FAKE_REGISTER = "/auth/signup";

//LOGIN
export const POST_FAKE_LOGIN = "/auth/signin";
export const POST_FAKE_JWT_LOGIN = "/post-jwt-login";
export const POST_FAKE_PASSWORD_FORGET = "/auth/forgot-password";
export const POST_FAKE_JWT_PASSWORD_FORGET = "/jwt-forget-pwd";
export const SOCIAL_LOGIN = "/social-login";

//login
export const POST_AUTHENTICATE = "/api/v1/users/authenticate";

//BUNNY
export const URL_IMAGE_BUNNY = "https://cdn.baovietnam.com/";

//PROFILE
export const POST_EDIT_JWT_PROFILE = "/post-jwt-profile";
export const POST_EDIT_PROFILE = "/api/v1/user";

//user
export const GET_USERS = "/api/v1/users";
// export const ADD_USERS = "/signup";
// export const DELETE_USER = "/api/users/delete";
export const SEARCH_USER = "/api/v1/users/user/search";

export const GET_USER_PERMISSION = "/api/v1/users/user/permission";
// faqs
export const GET_FAQS = "/api/v1/faqs";

// dealers
export const GET_DEALERS = "/api/dealers";

// dealer info
export const GET_DEALER_INFO = "/api/dealerInfor";

export const GET_DEALER_PAYMENT = "/api/dealerPayment";

export const GET_DEALER_PROMOTION = "/api/dealerPromotion";

export const GET_DEALER_SERVICE = "/api/dealerService";

export const GET_POSTS = "/api/v1/posts";

export const GET_SCHEMAS = "/api/v1/schemas";
export const GET_TAXONOMYS = "/api/v1/taxonomy";

export const GET_PAGES = "/api/v1/pages";

export const GET_TAXANOMY = "/api/v1/taxanomy";

//Links
export const GET_LINKS = "/api/linkFooters";

//Google index
export const GOOGLEINDEX = "api/google/index"; //param
export const GOOGLEBATCHINDEX = "api/google/batchIndex"; // body

//Banner
export const BANNER = "api/banners";

//Bing index
export const BINGINDEX = "api/bing/index";

//Google Analytics
export const GGANALYTICS = "api/ggAnalytics";

export const UPDATE_HOME_BANNER = "/api/v1/home-banner/update";

export const API_SEO = "/api/v1/seo";
export const GET_HOME_BANNER = "/api/v1/home-banner";
//recruit
export const API_RECRUIT = "/api/v1/recruits";
