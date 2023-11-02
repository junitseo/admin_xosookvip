import React, { useCallback, useEffect, useState } from "react";

//import Components
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

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Badge, message, Space, Table, Modal, Select, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { addUser, deleteUser, getAllUsers, searchUser } from "../../helpers/helper";
const { Option } = Select;
const { Column } = Table;

const success = () => {
  message.success("Thành công");
};

const error = () => {
  message.error("Có lỗi xảy ra. Vui lòng thử lại!");
};
const UsersManagement = () => {
  document.title = "Users Management";

  // const validation = useFormik({
  //   // enableReinitialize : use this flag when initial values needs to be changed
  //   enableReinitialize: true,

  //   initialValues: {
  //     user_name: infoUser.user_name || "",
  //     first_name: infoUser.first_name || "",
  //     last_name: infoUser.last_name || "",
  //     role: infoUser.role || "admin",
  //   },
  //   validationSchema: Yup.object({
  //     user_name: Yup.string().required("Please Enter  User Name"),
  //     first_name: Yup.string().required("Please Enter  First Name"),
  //     last_name: Yup.string().required("Please Enter  Last Name"),
  //     role: Yup.string().required("Please Select Role"),
  //   }),
  //   onSubmit: (values) => {
  //     console.log(
  //       "🚀 ~ file: UsersManagement.js ~ line 49 ~ UsersManagement ~ values",
  //       values
  //     );
  //   },
  // });

  const [isModalAddUserVisible, setIsModalVisible] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchInput, setSearchInput] = useState(undefined);

  // const [formVal, setFormVal] = useState({
  //   username: "",
  //   firstName: "",
  //   lastName: "",
  //   password: "",
  //   role: "",
  // });

  // const onInputChange = (e) => {
  //   setFormVal({
  //     ...formVal,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const onRoleChange = (e) => {
  //   setFormVal({...formVal, role: e})
  // }

  const confirm = (user) => {
    console.log('user: ', user);
    if (user.id) {
      deleteUser(user.id).then(res => {
        getUsers()
        success();
        
      }).catch(er => {
        error()
      })
    } 
  };

  const cancel = (e) => {
    console.log(e);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  // const addNewUser = () => {
  //   console.log("form val: ", formVal);
  //   addUser(formVal).then((res) => {
  //     console.log("add user: ", res);
  //     setIsModalVisible(false);
  //   });
  // };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearchUser = (e) => {
    setSearchInput(e.target.value);
    searchUser(e.target.value).then((res) => {
      setUsers(res);
    });
  };
  useEffect(() => {
    getUsers()
  }, []);

  const getUsers = () => {
    getAllUsers().then((res) => {
      setUsers(res);
    });
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Thành Viên" pageTitle="Quản lý thành viên" />
          <Row className="mb-3">
            <Col lg="5">
              <div>
                <InputGroup>
                  <Input
                    value={searchInput}
                    onChange={(e) => onSearchUser(e)}
                    placeholder="Tìm kiếm thành viên..."
                  />
                  <InputGroupText>
                    <i className="ri-search-line"></i>
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>

            <Col lg="7">
              <div className="text-right">
                <Link to="/user/add/new">
                  <Button>Thêm mới</Button>
                </Link>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}>
              <Table rowKey='id' dataSource={users}>
                <Column
                  title="#"
                  render={(val, rec, index) => {
                    return index + 1;
                  }}
                />
                <Column
                  title="Tên"
                  dataIndex="firstName"
                  key="firstName"
                />
                <Column title="Họ" dataIndex="lastName" key="lastName" />
                <Column title="Tên đăng nhập" dataIndex="username" key="username" />
                <Column title="Phân quyền" dataIndex="role" key="role" />
                <Column
                  title="Tình trạng"
                  dataIndex="status"
                  key="status"
                  render={() => {
                    return (
                      <span>
                        <Badge status="success" />
                        Active
                      </span>
                    );
                  }}
                />
                <Column
                  title="Hoạt động"
                  key="action"
                  render={(val, record) => (
                    <Space size="middle">
                      {/* <Link to={{ pathname: "/users/" + val.id }}>View</Link> */}
                      <Link to={{ pathname: "/users/" + val.id }}><i className="ri-eye-line action-icon"></i></Link>
                      <Link to={{ pathname: "/user/add/" + val.id }}><i className="ri-pencil-line action-icon"></i></Link>

                      {/* <Link to={{ pathname: "/user/add/" + val.id }}>Edit</Link> */}
                      {/* <a>Add</a>
                      <a>Edit</a> */}
                      <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => confirm(val)}
                        onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                      >
                        <i className="ri-delete-bin-line action-icon"></i>
                      </Popconfirm>
                    </Space>
                  )}
                />
              </Table>
            </Col>
          </Row>
        </Container>
      </div>

      {/* <Modal
        title="Add User"
        okText="Save"
        visible={isModalAddUserVisible}
        onOk={addNewUser}
        onCancel={handleCancel}
        width="680px"
      >
        <div>
          <Form>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="username">
                    Username
                  </Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Username"
                    type="text"
                    defaultValue={formVal.username}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="firstName">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="First name"
                    defaultValue={formVal.firstName}
                    onChange={onInputChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="lastname">
                    {" "}
                    Last Name
                  </Label>
                  <Input
                    id="lastname"
                    name="lastname"
                    placeholder="Last name"
                    defaultValue={formVal.lastname}
                    onChange={onInputChange}
                    type="text"
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="password">
                    {" "}
                    Password
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    placeholder="password"
                    defaultValue={formVal.password}
                    onChange={onInputChange}
                    type="password"
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="role">
                    Role
                  </Label>
                  <Select size="large" name="role" id="role" defaultValue={formVal.role} onChange={onRoleChange} placeholder="Role" style={{width: '100%'}}>
                    <Option value="Admin">Admin</Option>
                    <Option value="Editor">Biên tập viên </Option>
                    <Option value="Collaborators">Cộng tác viên</Option>
                  </Select>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal> */}
    </React.Fragment>
  );
};

export default UsersManagement;
