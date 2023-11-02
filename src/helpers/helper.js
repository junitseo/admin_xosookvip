import { APIClient } from "./api_helper";
import * as url from "./url_helper";
import axios from "axios";

const api = new APIClient();

export const getLoggedInUser = () => {
  const user = sessionStorage.getItem("user");
  if (user) return JSON.parse(user);
  return null;
};

export const isUserAuthenticated = () => {
  return getLoggedInUser() !== null;
};

//permission
export const getAllPermissions = () => api.get(url.GET_ALL_PERMISSION);
//roles
export const getAllRole = () => api.get(url.GET_ALL_ROLES);
export const editRolePermission = (permission, roleId) =>
  axios.patch(url.EDIT_ROLE_PERMISSION, {
    permission: permission,
    roleId: roleId,
  });

export const addNewRole = (roleName) =>
  axios.post(url.ADD_NEW_ROLES, { role: roleName });
export const deleteRole = (roleId) =>
  axios.post(url.DELETE_ROLES, { id: roleId });
//login
export const postLogin = (data) => api.create(url.POST_AUTHENTICATE, data);

// get all faqs
export const getAllFaqs = () => api.get(url.GET_FAQS);
export const getFaqByID = (id) => api.get(url.GET_FAQS + "/" + id);
export const addFaq = (body) => api.create(`${url.GET_FAQS}`, body);
export const updateFaq = (id, body) =>
  api.update(`${url.GET_FAQS}/${id}`, body);
export const deleteFaqs = (id) => api.delete(`${url.GET_FAQS}/remove/${id}`);
export const searchFAQ = (q) => api.get(`${url.GET_FAQS}/faq/search/?q=${q}`);
export const formatFaqData = (data) => {
  if (data) {
    return data.map((item) => ({ ...item, key: item._id }));
  }
  return [];
};

export const getAllUsers = () => api.get(url.GET_USERS);
export const getUser = (id) => api.get(`${url.GET_USERS}/${id}`);
export const addUser = (body) => api.create(`${url.GET_USERS}/signup`, body);
export const updateUser = (id, body) =>
  api.update(`${url.GET_USERS}/${id}`, body);
export const deleteUser = (id) => api.delete(`${url.GET_USERS}/delete/${id}`);
export const searchUser = (q) => api.get(`${url.SEARCH_USER}?q=${q}`);

export const createUserPermission = (body) =>
  api.create(url.GET_USER_PERMISSION, body);
export const getUserPermission = (id) =>
  api.get(`${url.GET_USER_PERMISSION}/${id}`);
export const updateUserPermission = (id, body) =>
  api.update(`${url.GET_USER_PERMISSION}/${id}`, body);
export const deleteUserPermission = (id) =>
  api.delete(`${url.GET_USER_PERMISSION}/delete/${id}`);
// schema
export const getAllSchemas = () => api.get(url.GET_SCHEMAS);
export const getSchema = (id) => api.get(`${url.GET_SCHEMAS}/${id}`);
export const addSchema = (body) => api.create(`${url.GET_SCHEMAS}`, body);
export const updateSchema = (id, body) =>
  api.update(`${url.GET_SCHEMAS}/${id}`, body);
export const deleteSchema = (id) =>
  api.delete(`${url.GET_SCHEMAS}/remove/${id}`);
export const searchSchema = (q) =>
  api.get(`${url.GET_SCHEMAS}/schema/search?q=${q}`);

// Taxonomy
export const getAllTaxonomies = () => api.get(url.GET_TAXONOMYS);
export const getTaxonomy = (id) => api.get(`${url.GET_TAXONOMYS}/${id}`);
export const addTaxonomy = (body) =>
  api.createWithFormData(`${url.GET_TAXONOMYS}`, body);
export const updateTaxonomy = (id, body) =>
  api.updateWithFormData(`${url.GET_TAXONOMYS}/${id}`, body);
export const deleteTaxonomy = (slug) =>
  api.delete(`${url.GET_TAXONOMYS}/remove/${slug}`);
export const deleteAllChildTaxonomy = (slug) =>
  api.delete(`${url.GET_TAXONOMYS}/removeTax/${slug}`);
export const searchTaxonomy = (q) =>
  api.get(`${url.GET_TAXONOMYS}/tax/search?q=${q}`);
export const getByType = (type) =>
  api.get(`${url.GET_TAXONOMYS}/getByType/${type}`);

export const getDealerInfoDetail = (id) => api.get(`api/dealerInfor/${id}`);
export const getDealerPaymentDetail = (id) =>
  api.get(`api/dealerPayment/${id}`);
export const getDealerPromotionDetail = (id) =>
  api.get(`api/dealerPromotion/${id}`);
export const getDealerServiceDetail = (id) =>
  api.get(`api/dealerService/${id}`);

// dealers
export const getAllDealers = () => api.get(`${url.GET_DEALERS}`);
export const getDealerById = (id) => api.get(`${url.GET_DEALERS}/${id}`);
export const createDealer = (data) => api.create(`${url.GET_DEALERS}`, data);
export const updateDealer = (data) =>
  api.update(`${url.GET_DEALERS}/${data.get("id")}`, data);
export const deleteDealer = (id) =>
  api.delete(`${url.GET_DEALERS}/remove/${id}`);
export const searchDealer = (text) =>
  api.get(`${url.GET_DEALERS}/dealer/search`, text);

// dealer info
export const getAllDealersInfo = () => api.get(`${url.GET_DEALER_INFO}`);
export const getDealerInfoById = (id) =>
  api.get(`${url.GET_DEALER_INFO}/${id}`);
export const deleteDealerInfo = (id) =>
  api.delete(`${url.GET_DEALER_INFO}/remove/${id}`);
export const searchDealerInfo = (text) =>
  api.get(`${url.GET_DEALER_INFO}/dealer/search`, text);
export const createDealerInfo = (data) =>
  api.create(`${url.GET_DEALER_INFO}`, data);
export const updateDealerInfo = (data) =>
  api.update(`${url.GET_DEALER_INFO}/${data.id}`, data);

// dealer payment
export const getAllDealersPayment = () => api.get(`${url.GET_DEALER_PAYMENT}`);
export const deleteDealerPayment = (id) =>
  api.delete(`${url.GET_DEALER_PAYMENT}/remove/${id}`);
export const searchDealerPayment = (text) =>
  api.get(`${url.GET_DEALER_PAYMENT}/dealer/search`, text);
export const creatDealerPayment = (data) =>
  api.create(`${url.GET_DEALER_PAYMENT}`, data);
export const updateDealerPayment = (id, data) =>
  api.update(`${url.GET_DEALER_PAYMENT}/${id}`, data);
// dealer promotion
export const getAllDealerPromotion = () =>
  api.get(`${url.GET_DEALER_PROMOTION}`);
export const deleteDealerPromotion = (id) =>
  api.delete(`${url.GET_DEALER_PROMOTION}/remove/${id}`);
export const searchDealerPromotion = (text) =>
  api.get(`${url.GET_DEALER_PROMOTION}/dealer/search`, text);
export const createDealerPromotion = (data) =>
  api.create(`${url.GET_DEALER_PROMOTION}`, data);
export const updateDealerPromotion = (data) =>
  api.update(`${url.GET_DEALER_PROMOTION}/${data.id}`, data);

// dealer service
export const getAllDealerService = () => api.get(`${url.GET_DEALER_SERVICE}`);
export const deleteDealerService = (id) =>
  api.delete(`${url.GET_DEALER_SERVICE}/remove/${id}`);
export const searchDealerService = (text) =>
  api.get(`${url.GET_DEALER_SERVICE}/dealer/search`, text);
export const createDealerService = (data) =>
  api.create(`${url.GET_DEALER_SERVICE}`, data);
export const updateDealerService = (data) =>
  api.update(`${url.GET_DEALER_SERVICE}/${data._id}`, data);

// posts
export const getAllPosts = (limit, skip, search, tax_id, status) =>
  api.get(
    `${url.GET_POSTS}?limit=${limit}&skip=${skip}&search=${search}&tax_id=${tax_id}&status=${status}`
  );
export const getPostById = (id) => api.get(`${url.GET_POSTS}/${id}`);
export const getPostByStatus = (data) =>
  api.get(`${url.GET_POSTS}/getByStatus`, data);
export const getPostByStatusSlug = (data) =>
  api.get(`${url.GET_POSTS}/getBy/StatusAndSlug`, data);
export const getPostByTax = (data) =>
  api.get(`${url.GET_POSTS}/getPostByTax`, data);
export const searchPost = (limit, skip, q) =>
  api.get(`${url.GET_POSTS}/post/search?q=${q}&limit=${limit}&skip=${skip}`);
export const getRelatedPosts = () => api.get(`${url.GET_POSTS}/related`);
export const createPost = (data) => api.create(`${url.GET_POSTS}`, data);
export const editPost = (id, data) =>
  api.update(`${url.GET_POSTS}/${id}`, data);
export const deletePost = (id) => api.delete(`${url.GET_POSTS}/remove/${id}`);
export const getAllByTax = (id, limit, skip) =>
  api.get(`${url.GET_POSTS}/getAllByTax?limit=${limit}&skip=${skip}&tax=${id}`);
export const getPostXML = () => api.get(`${url.GET_POSTS}/getPosts/sitemap`);
// pages

export const updateHomeBanner = (data) =>
  api.update(url.UPDATE_HOME_BANNER, data);

export const getHomeBanner = () => api.get(url.GET_HOME_BANNER);

export const getAllPages = () => api.get(`${url.GET_PAGES}`);
export const searchPages = (data) =>
  api.get(`${url.GET_PAGES}/page/search`, data);
export const getPageById = (id) => api.get(`${url.GET_PAGES}/${id}`);
export const createPage = (data) => api.create(`${url.GET_PAGES}`, data);
export const updatePage = (data) =>
  api.update(`${url.GET_PAGES}/${data.get("id")}`, data);
export const deletePage = (id) => api.delete(`${url.GET_PAGES}/remove/${id}`);

//links
export const getAllLinks = () => api.get(`${url.GET_LINKS}/getAll`);
export const getLinkSearch = (text) =>
  api.get(`${url.GET_LINKS}/search/?q=${text}`);
export const getLinkByName = (name) =>
  api.get(`${url.GET_LINKS}/getByName/${name}`);
export const getLinkById = (id) => api.get(`${url.GET_LINKS}/getById/${id}`);
export const createLink = (data) => api.create(`${url.GET_LINKS}`, data);
export const updateLink = (id, data) =>
  api.update(`${url.GET_LINKS}/${id}`, data);
export const removeLink = (id) => api.delete(`${url.GET_LINKS}/remove/${id}`);

//google index
export const googleIndex = (link) => api.create(`${url.GOOGLEINDEX}/${link}`);
export const googleBatchIndex = (data) =>
  api.create(`${url.GOOGLEBATCHINDEX}`, data);

//banners
export const getAllBanner = (limit, skip, slug) =>
  api.get(`${url.BANNER}?limit=${limit}&skip=${skip}&slug=${slug}`);
export const getById = (id) => api.get(`${url.BANNER}/getById/${id}`);
export const getByPosition = (position) =>
  api.get(`${api.BANNER}/getByPosition/${position}`);
export const createBanner = (data) => api.create(`${url.BANNER}`, data);
export const updateBanner = (id, data) =>
  api.update(`${url.BANNER}/${id}`, data);
export const removeBanner = (id) => api.delete(`${url.BANNER}/remove/${id}`);
export const getByPage = (slug) => api.get(`${url.BANNER}/getByPage/${slug}`);

// bing index
export const bingIndex = (data) => api.create(`${url.BINGINDEX}`, data);

//statistics
export const getAllByTaxDate = (id, start, end) =>
  api.get(
    `${url.GET_POSTS}/getAllByTaxDate?tax=${id}&start=${start}&end=${end}`
  );
export const getAllByDate = (start, end, limit, skip) =>
  api.get(
    `${url.GET_POSTS}/getAllByDate?start=${start}&end=${end}&limit=${limit}&skip=${skip}`
  );
export const getMaxPosts = () => api.get(`${url.GET_POSTS}/getMax`);
export const getMinPosts = () => api.get(`${url.GET_POSTS}/getMin`);
export const getMaxUsers = () => api.get(`${url.GET_POSTS}/getMax/user`);
export const getMinUsers = () => api.get(`${url.GET_POSTS}/getMin/user`);
export const userStatistics = (start, end, limit, skip, q) =>
  api.get(
    `${url.GET_POSTS}/getStatictis/staff?start=${start}&end=${end}&limit=${limit}&skip=${skip}&q=${q}`
  );

//google analytics
export const ggAnalytics = (metrics, startDate, endDate, dimensions) =>
  api.get(
    `${url.GGANALYTICS}?metrics=${metrics}&startDate=${startDate}&endDate=${endDate}&dimensions=${dimensions}`
  );
export const ggAnalyticsGraph = (metric) =>
  api.get(`${url.GGANALYTICS}/graph?metric=${metric}`);

export const getInformation = () => {
  return api.get("/api/v1/information");
};

export const updateInformation = (data) => {
  return api.update("/api/v1/information", data);
};

//Seo
//Seo
export const addSeo = (body) => api.create(`${url.API_SEO}`, body);
export const getSeoById = (id) => api.get(`${url.API_RECRUIT}/${id}`);

export const getAllSeo = (
  pageSize = 10,
  pageIndex = 1,
  search = "",
  domain = ""
) =>
  api.get(
    `${url.API_SEO}/getAllSeo?search=${search}&pageSize=${pageSize}&pageIndex=${pageIndex}&domain=${domain}`
  );

export const deleteSeo = (id) => api.delete(`${url.API_SEO}/${id}`);
export const updateSeo = (id, data) =>
  api.update(`${url.API_SEO}/update/${id}`, data);
