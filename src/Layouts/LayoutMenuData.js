import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Navdata = () => {
  const history = useHistory();
  //state data
  const [isDashboard, setIsDashboard] = useState(false);
  const [isUsers, setIsUsers] = useState(false);
  const [isFAQs, setIsFAQs] = useState(false);
  const [isDealers, setIsDealers] = useState(false);
  const [isSchemas, setIsSchemas] = useState(false);
  const [isTaxonomy, setIsTaxonomy] = useState(false);
  const [isRoles, setIsRoles] = useState(false);
  const [isPages, setIsPages] = useState(false);
  const [isPosts, setIsPosts] = useState(false);
  const [isLinks, setIsLinks] = useState(false);
  const [isMedia, setIsMedia] = useState(false);
  const [isBanners, setIsBanners] = useState(false);
  const [isStatistics, setIsStatistics] = useState(false);
  const [iscurrentState, setIscurrentState] = useState("Dashboard");
  const [isInformation, setIsInformation] = useState(false);
  const [isSeo, setIsSeo] = useState(false);

  function updateIconSidebar(e) {
    if (e && e.target && e.target.getAttribute("subitems")) {
      const ul = document.getElementById("two-column-menu");
      const iconItems = ul.querySelectorAll(".nav-icon.active");
      let activeIconItems = [...iconItems];
      activeIconItems.forEach((item) => {
        item.classList.remove("active");
        var id = item.getAttribute("subitems");
        if (document.getElementById(id))
          document.getElementById(id).classList.remove("show");
      });
    }
  }

  useEffect(() => {
    document.body.classList.remove("twocolumn-panel");
    if (iscurrentState !== "Dashboard") {
      setIsDashboard(false);
    }
    if (iscurrentState !== "Users") {
      setIsUsers(false);
    }
    if (iscurrentState !== "FAQs") {
      setIsFAQs(false);
    }
    if (iscurrentState !== "Dealers") {
      setIsDealers(false);
    }
    if (iscurrentState !== "Schemas") {
      setIsSchemas(false);
    }
    if (iscurrentState !== "Taxonomy") {
      setIsTaxonomy(false);
    }
    if (iscurrentState !== "Pages") {
      setIsPages(false);
    }
    if (iscurrentState !== "Posts") {
      setIsPosts(false);
    }
    if (iscurrentState !== "Links") {
      setIsLinks(false);
    }
    if (iscurrentState !== "Media") {
      setIsMedia(false);
    }
    if (iscurrentState !== "Banners") {
      setIsBanners(false);
    }
    if (iscurrentState !== "Statistics") {
      setIsStatistics(false);
    }
    if (iscurrentState !== "Seo") {
      setIsSeo(false);
    }
  }, [
    history,
    iscurrentState,
    isDashboard,
    isUsers,
    isFAQs,
    isDealers,
    isSchemas,
    isTaxonomy,
    isPages,
    isLinks,
    isMedia,
    isBanners,
    isStatistics,
    isSeo,
  ]);

  const menuItems = [
    {
      label: "Menu",
      isHeader: true,
    },
    // {
    //     id: "dashboard",
    //     label: "BẢNG ĐIỀU KHIỂN",
    //     icon: "ri-dashboard-2-line",
    //     link: "/#",
    //     stateVariables: isDashboard,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsDashboard(!isDashboard);
    //         setIscurrentState('Dashboard');
    //         updateIconSidebar(e);
    //     },
    //     subItems: [
    //         {
    //             id: "analytics",
    //             label: "Analytics",
    //             link: "/dashboard-analytics",
    //             parentId: "dashboard",
    //         },
    //     ],
    // },
    // {
    //     id: "users",
    //     label: "QUẢN LÝ THÀNH VIÊN",
    //     icon: " ri-user-2-line",
    //     link: "/#",
    //     stateVariables: isUsers,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsUsers(!isUsers);
    //         setIscurrentState('Users');
    //         updateIconSidebar(e);
    //     },
    //     subItems: [
    //         {
    //             id: "user-management",
    //             label: "Thành Viên",
    //             link: "/users",
    //             parentId: "users",
    //         },
    //         {
    //             id: "user-permission",
    //             label: "Phân Quyền",
    //             link: "/permission",
    //             parentId: "users",
    //         },
    //     ],
    // },
    // {
    //     id: "schema-management",
    //     label: "QUẢN LÝ SCHEMA",
    //     icon: "ri-bookmark-line",
    //     link: "/#",
    //     stateVariables: isSchemas,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsSchemas(!isSchemas);
    //         setIscurrentState('Schemas');
    //         updateIconSidebar(e);
    //     },
    //     subItems: [
    //         {
    //             id: "schemas",
    //             label: "Schemas",
    //             link: "/schemas",
    //             parentId: "schema-management",
    //         },
    //     ],
    // },
    // {
    //     id: "roles",
    //     label: "QUẢN LÝ PHÂN QUYỀN",
    //     icon: "ri-user-2-line",
    //     link: "/#",
    //     stateVariables: isRoles,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsRoles(!isRoles);
    //         setIscurrentState('Roles');
    //     },
    //     subItems:[
    //         {
    //             id: 'roles-management',
    //             label: 'QUYỀN HẠN',
    //             link: "/roles",
    //             parentId: 'roles'
    //         }
    //     ]
    // },
    // {
    //     id: "taxonomy-management",
    //     label: "CHUYÊN MỤC",
    //     icon: "ri-price-tag-3-line",
    //     link: "/#",
    //     stateVariables: isTaxonomy,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsTaxonomy(!isTaxonomy);
    //         setIscurrentState('Taxonomy');
    //     },
    //     subItems: [{
    //         id: "taxonomy",
    //         label: "Danh mục & Thẻ",
    //         link: "/taxonomy",
    //         parentId: "taxonomy-management",
    //     }]
    // },
    // {
    //     id: "page-management",
    //     label: "QUẢN LÝ TRANG",
    //     icon: " ri-pages-line",
    //     link: "/#",
    //     stateVariables: isPages,
    //     click: function (e) {
    //         e.preventDefault();
    //         setIsPages(!isPages);
    //         setIscurrentState('Pages');
    //         updateIconSidebar(e);
    //     },
    //     subItems: [
    //         {
    //             id: "pages",
    //             label: "Trang",
    //             link: "/pages-management",
    //             parentId: "page-management",
    //         },
    //     ],
    // },
    {
      id: "post-management",
      label: "QUẢN LÝ BÀI VIẾT",
      icon: "ri-archive-line",
      link: "/posts",
      stateVariables: isPosts,
      click: function (e) {
        e.preventDefault();
        setIsPosts(!isPosts);
        setIscurrentState("Posts");
        updateIconSidebar(e);
      },
      // subItems: [
      //     {
      //         id: "posts",
      //         label: "Bài Viết",
      //         link: "/posts",
      //         parentId: "post-management",
      //     },
      // ],
    },
    {
      id: "information-management",
      label: "QUẢN LÝ THÔNG TIN",
      icon: "ri-archive-line",
      link: "/manage-information",
      stateVariables: isInformation,
      click: function (e) {
        e.preventDefault();
        setIsInformation(!isInformation);
        setIscurrentState("Information");
        updateIconSidebar(e);
      },
      // subItems: [
      //     {
      //         id: "posts",
      //         label: "Bài Viết",
      //         link: "/posts",
      //         parentId: "post-management",
      //     },
      // ],
    },
    {
      id: "manage-banner",
      label: "QUẢN LÝ BANNER",
      icon: "ri-archive-line",
      link: "/manage-banner",
      stateVariables: isBanners,
      click: function (e) {
        e.preventDefault();
        setIsPosts(!isBanners);
        setIscurrentState("Banner");
        updateIconSidebar(e);
      },
    },
    {
      id: "manage-seo",
      label: "QUẢN LÝ SEO",
      icon: "ri-archive-line",
      link: "/seo",
      stateVariables: isSeo,
      click: function (e) {
        e.preventDefault();
        setIsPosts(!isBanners);
        setIscurrentState("Seo");
        updateIconSidebar(e);
      },
    },
  ];
  return <React.Fragment>{menuItems}</React.Fragment>;
};
export default Navdata;
