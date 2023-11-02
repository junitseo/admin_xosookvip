/* eslint-disable react/jsx-no-undef */
import React, { useState } from "react";
import "antd/dist/antd.css";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Col,
  Container,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import {
  Table,
  Space,
  Popconfirm,
  notification,
  Pagination,
  PaginationProps,
  Spin,
  Select,
} from "antd";
import { Link, Switch } from "react-router-dom";
import { useEffect } from "react";
import {
  getAllPosts,
  searchPost,
  deletePost,
  getByType,
  getAllByTax,
  googleBatchIndex,
  bingIndex,
  getPostXML,
} from "../../helpers/helper";
import { URL_IMAGE_BUNNY } from "../../helpers/url_helper";
import { Icon } from "@iconify/react";
import { string } from "prop-types";
const { Column } = Table;
function PostList() {
  const [posts, setPosts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [current, setCurrent] = useState(0);
  const [res, setRes] = useState({});
  const [pageSize, setPageSize] = React.useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [postSearch, setPostSearch] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [valueCate, setValueCate] = useState("");
  const [valueStatus, setValueStatus] = useState("");
  const url = "https://kqxs.com.vn/";
  const getPosts = async (limit, skip, search, tax_id, status) => {
    setIsLoading(true);
    limit = typeof limit !== undefined ? limit : pageSize;
    skip = typeof skip !== undefined ? skip : current;
    tax_id = tax_id !== undefined && tax_id !== "" ? tax_id : valueCate;
    search = typeof search == string && search !== "" ? search : searchInput;
    status = typeof status == string && search !== "" ? status : valueStatus;
    await getAllPosts(limit, skip, searchInput, valueCate, valueStatus).then(
      (res) => {
        if (res) {
          res.datas &&
            res.datas.map((item, i) => {
              let image = item.post_image.toString().split("\\");
              if (item.post_image && image[1] === "fakepath") {
                item.post_image = URL_IMAGE_BUNNY + item.post_image.substr(12);
              }
            });
          setRes(res);
          setPosts(res.datas);
        }
        setIsLoading(false);
      }
    );
  };

  const getListCategory = () => {
    getByType("category").then((res) => {
      if (res) {
        setCategories(res);
      }
    });
  };

  useEffect(() => {
    getPosts(pageSize, current, searchInput, valueCate, valueStatus);
    getListCategory();
  }, []);

  const confirm = (user) => {
    if (user.post_slug) {
      deletePost(user.post_slug)
        .then((res) => {
          notification["success"]({
            message: "Notification",
            description: "Delete post successfully!",
          });
          getPosts(pageSize, current, searchInput, valueCate, valueStatus);
        })
        .catch((error) => {
          notification["error"]({
            message: "System error",
            description: error,
          });
        });
    }
  };
  const convertHtmlText = (htmlText) => {
    if (htmlText && htmlText.length > 0) {
      let strText =
        new DOMParser().parseFromString(htmlText, "text/html").documentElement
          .textContent || "";
      if (strText && strText.length > 50) {
        strText = strText.slice(0, 50) + "...";
      }
      return strText;
    }
    return "";
  };

  const onSearchPost = (e) => {
    setSearchInput(e.target.value);
    setCurrent(0);
    setPageSize(10);
  };

  const onChangeCategory = (value) => {
    setValueCate(value);
    setCurrent(0);
    setPageSize(10);
  };
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRows(selectedRowKeys);
    },
  };
  const indexGG = () => {
    setIsLoading(true);
    if (selectedRows.length > 0) {
      let listData = [];
      posts.filter((x) => {
        for (let index = 0; index < selectedRows.length; index++) {
          const element = selectedRows[index];
          if (x._id === element) {
            let urlSlug = url + x.post_slug;
            listData.push(urlSlug);
          }
        }
      });
      var data = {
        links: listData,
      };
      googleBatchIndex(data).then((res) => {
        if (res.code === 200) {
          notification["success"]({
            message: "Notification",
            description: res.message,
          });
          setSelectedRows([]);
          setIsLoading(false);
        } else {
          notification["error"]({
            message: "System error",
            description: res.message,
          });
          setIsLoading(false);
        }
      });
    } else {
      notification["error"]({
        message: "System error",
        description: "Vui lòng chọn dòng muốn sử dụng index Google",
      });
      setIsLoading(false);
    }
  };
  const indexBing = () => {
    setIsLoading(true);
    if (selectedRows.length > 0) {
      let listData = [];
      posts.filter((x) => {
        for (let index = 0; index < selectedRows.length; index++) {
          const element = selectedRows[index];
          if (x._id === element) {
            let urlSlug = url + x.post_slug;
            listData.push(urlSlug);
          }
        }
      });
      var data = {
        links: listData,
      };
      bingIndex(data).then((res) => {
        if (res.code === 200) {
          setSelectedRows([]);
          notification["success"]({
            message: "Notification",
            description: res.message,
          });
          setIsLoading(false);
        } else {
          notification["error"]({
            message: "System error",
            description: res.message,
          });
          setIsLoading(false);
        }
      });
    } else {
      notification["error"]({
        message: "System error",
        description: "Vui lòng chọn dòng muốn sử dụng index Bing",
      });
      setIsLoading(false);
    }
  };
  const searchPost = () => {
    getPosts(pageSize, current, searchInput, valueCate, valueStatus);
  };
  const onChangeStatus = (value) => {
    setValueStatus(value);
    setCurrent(0);
    setPageSize(10);
  };
  const exportExcel = () => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    setIsLoading(true);
    getPostXML().then((res) => {
      if (res) {
        const posts_slug = res.map((post, index) => {
          return {
            STT: index + 1,
            "Tiêu đề": post.post_title,
            Url: process.env.REACT_APP_DOMAIN + post.post_slug,
          };
        });
        const ws = XLSX.utils.json_to_sheet(posts_slug);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, "posts" + fileExtension);
        setIsLoading(false);
      } else {
        notification["error"]({
          message: "System error",
          description: res.message,
        });
        setIsLoading(false);
      }
    });
  };
  return (
    <React.Fragment>
      <Spin spinning={isLoading}>
        <div className="page-content">
          <Container fluid>
            <BreadCrumb title="Bài viết" pageTitle="Quản lý bài viết" />
            <Row className="mb-3">
              <Col lg="2">
                <div>
                  <InputGroup>
                    <Input
                      value={searchInput}
                      onChange={(e) => onSearchPost(e)}
                      placeholder="Tìm kiếm..."
                    />
                  </InputGroup>
                </div>
              </Col>
              <Col lg="2">
                <div>
                  <Select
                    allowClear={true}
                    style={{ width: "100%" }}
                    placeholder="Danh mục"
                    onChange={onChangeCategory}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children.includes(input)
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                  >
                    {categories &&
                      categories?.map((item) => (
                        <Option label={item.tax_name} key={item._id}>
                          {item?.tax_name}
                        </Option>
                      ))}
                  </Select>
                </div>
              </Col>
              <Col lg="2">
                <div>
                  <Select
                    allowClear={true}
                    style={{ width: "100%" }}
                    onChange={onChangeStatus}
                    placeholder="Trạng thái"
                  >
                    <Option value="public">Đã đăng</Option>
                    <Option value="draft">Nháp</Option>
                    <Option value="pending">Chờ xét duyệt</Option>
                  </Select>
                </div>
              </Col>
              <Col lg="3">
                <Row>
                  <Col style={{ width: "130px" }} lg="6">
                    <div>
                      <Button onClick={() => searchPost()}>Tìm kiếm</Button>
                    </div>
                  </Col>
                  {/* <Col style={{ width: "130px" }} lg="6">
                    <div>
                      <Button
                        style={{ backgroundColor: "#026e39", border: "none" }}
                        onClick={() => exportExcel()}
                      >
                        Xuất excel
                      </Button>
                    </div>
                  </Col> */}
                </Row>
              </Col>
              <Col lg="2" style={{ width: "125px" }}>
                 {/* <div className="">
                  <Button
                    style={{ backgroundColor: "white" }}
                    onClick={() => indexGG()}
                  > 
                    <i className="icons8-google"></i>
                  </Button>
                  <Button
                    style={{
                      backgroundColor: "white",
                      marginLeft: "2px",
                      height: "40px ",
                    }}
                    onClick={() => indexBing()}
                  >
                    <Icon
                      icon="mdi:microsoft-bing"
                      style={{ color: "black" }}
                    />
                  </Button>
                </div> */}
              </Col>
              <Col style={{ width: "130px" }} lg="2">
                <div className="text-right">
                  <Link to="/posts/create">
                    <Button>Thêm mới</Button>
                  </Link>
                </div>
              </Col>
            </Row>

            <Row>
              <Col lg={12}>
                <Table
                  rowKey="_id"
                  dataSource={posts}
                  pagination={false}
                  // rowSelection={{
                  //   type: "checkbox",
                  //   selectedRowKeys: selectedRows,
                  //   ...rowSelection,
                  // }}
                >
                  {/* <Column scope="col" style={{ width: "50px" }} /> */}
                  <Column
                    title="#"
                    render={(val, rec, index) => {
                      return index + 1;
                    }}
                  />
                  <Column
                    title="Tiêu đề"
                    dataIndex="post_title"
                    key="post_title"
                    width={'20%'}
                  />
                  <Column
                    title="Trạng thái"
                    width={'15%'}
                    dataIndex="post_status"
                    key="post_status"
                    render={(value)=>value==='public'?"Đã đăng":value==='draft'?"Nháp":"Chờ xét duyệt"}
                    
                  />
                  {/* <Column
                    title="Lượt xem"
                    dataIndex="post_views"
                    key="post_views"
                  /> */}
                  <Column
                    title="Mô tả"
                    dataIndex="post_description"
                    key="post_description"
                    render={(item) => <>{convertHtmlText(item)}</>}
                  />
                  <Column
                    title="Hình ảnh"
                    dataIndex="post_image"
                    key="post_image"
                    render={(image) => (
                      <img
                        src={image}
                        alt="pro_image"
                        height={60}
                        width={60}
                      />
                    )}
                  />
                  <Column
                    title="Đường dẫn tĩnh"
                    dataIndex="post_slug"
                    key="post_slug"
                  />
                  <Column
                    title="Hành động"
                    key="action"
                    render={(val, record) => {
                      console.log(record,'truong ga')
                      return<Space size="middle">
                      {/* <Link to={{ pathname: "/posts/" + val.post_slug }}>
                      View
                    </Link> */}
                 

                      <Link
                        to={{
                          pathname: "/posts/edit/" + val.post_slug,
                          state: { id: val._id || val.id },
                        }}
                      >
                        <i className="ri-pencil-line action-icon"></i>
                      </Link>

                      {/* <Link to={{ pathname: "/posts/edit/" + val.post_slug, state: { id: val._id || val.id } }}>
                      Edit
                    </Link> */}
                      <Popconfirm
                        title="Bạn có chắc chắn muốn xóa bài viết?"
                        onConfirm={() => confirm(val)}
                        okText="Xóa"
                        cancelText="Trở về"
                      >
                        <i className="ri-delete-bin-line action-icon"></i>
                      </Popconfirm>
                    </Space>
                    }
                     
                      
                    }
                  />
                </Table>
                <div className="text-right">
                  <Pagination
                    onChange={(page, newPageSize) => {
                      let pageTmp = page - 1;
                      setPageSize(newPageSize);
                      setCurrent(pageSize !== newPageSize ? 0 : pageTmp);
                      getPosts(
                        newPageSize,
                        pageTmp,
                        searchInput,
                        valueCate,
                        valueStatus
                      );
                    }}
                    showSizeChanger={true}
                    total={res.total}
                    current={current + 1}
                    pageSize={pageSize}
                    showTotal={(total) => `Tổng ${total} bài viết`}
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </Spin>
    </React.Fragment>
  );
}

export default PostList;
