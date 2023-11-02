import React, { useEffect, useState } from "react";
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
import { Space, Table, Modal, Select, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import { addSchema, deleteSchema, getAllPosts, getAllSchemas, updateSchema, getSchema, searchSchema, getAllPages } from "../../helpers/helper";
import { error, success } from "../../Components/Common/message";
const { Column } = Table;
const { Option } = Select;
function SchemaList() {
  const [schemas, setSchemas] = useState([]);
  const [posts, setPosts] = useState([]);
  const [pages, setPages] = useState([]);
  const [isModalAddSchemaVisible, setIsModalVisible] = useState(false);
  const [searchInput, setSearchInput] = useState(undefined);
  const [schemaSelected, setSchemaSelected] = useState(null);
  const [formVal, setFormVal] = useState({
    schema_type: "",
    schema_script: "",
    post_id: [],
    page_id : ""
  });

  const getSchemas = () => {
    getAllSchemas().then((res) => {
      setSchemas(res);
    });
  }

  useEffect(() => {
    getSchemas();
    getAllPosts().then((res) => {
      if(res){
        setPosts(res.datas);
      }
      
    });
    getAllPages().then((res) => {
      if(res){
        setPages(res);
      }
      
    })
  }, []);
  const addNewSchema = () => {
    setSchemaSelected(null);
    addSchema({ ...formVal, post_id: formVal.post_id.join(',') }).then(res => {
      success();
      setIsModalVisible(false);
      getSchemas();
      setFormVal({
        schema_type: "",
        schema_script: "",
        post_id: [],
        page_id : ""
      });
    }).catch(err => {
      error()
    })
  };

  const openPopupEditSchema = (item) => {
    setSchemaSelected(item);
    setFormVal({
      schema_type: item.schema_type,
      schema_script: item.schema_script,
      post_id : item.post_id?.map(i => i._id),
      page_id : item.page_id?._id,
    });
    setIsModalVisible(true);
  }

  const editSchema = () => {
    formVal.post_id = formVal.post_id.length > 0 ? formVal.post_id.join(',') : "";
    updateSchema(schemaSelected._id, formVal).then(res => {
      success();
      setIsModalVisible(false);
      getSchemas();
      setSchemaSelected(null);
      setFormVal({...formVal, schema_type: "", schema_script: "", post_id: [], page_id: ""})
    }).catch(err => {
      error();
    })
  }

  const onInputChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value,
    });
  };

  const onPostChange = (e) => {
    setFormVal({
      ...formVal,
      post_id: e,
    });
  }
  const onPageChange = (e) => {
    setFormVal({
      ...formVal, 
      page_id: e
    })
  }

  const onSearchSchema = (e) => {
    setSearchInput(e.target.value);
    searchSchema(e.target.value).then((res) => {
      setSchemas(res);
    });
  };

  const removeSchema = (id) => {
    if (id) {
      deleteSchema(id).then(res => {
        getSchemas();
        success();

      }).catch(er => {
        error()
      })
    }
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Schemas" pageTitle="Schemas Management" />
          <Row className="mb-3">
            <Col lg="5">
              <div>
                <InputGroup>
                  <Input
                    value={searchInput}
                    onChange={(e) => onSearchSchema(e)}
                    placeholder="Search schema..."
                  />
                  <InputGroupText>
                    <i className="ri-search-line"></i>
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>

            <Col lg="7">
              <div className="text-right">
                <Button onClick={() => setIsModalVisible(true)}>
                  Thêm mới
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={12}> 
              <Table rowKey='_id' dataSource={schemas}>
                <Column
                  title="#"
                  key='index'
                  render={(val, rec, index) => {
                    return index + 1;
                  }}
                />
                <Column
                  title="Tên"
                  dataIndex="schema_type"
                  key="schema_type"
                  render={val => {
                    return val ?? '---'
                  }}
                />
                <Column
                  title="Đoạn mã"
                  dataIndex="schema_script"
                  key="schema_script"
                  render={val => {
                    return val ?? "---"
                  }}
                />
                <Column
                  title="Bài viết"
                  dataIndex="post_id"
                  key="post_id"
                  render={(val) => {
                    return <ul>
                      {val?.length ? (
                            <ul>
                              {val.map((item, index) => {
                                if(index < 2){
                                  return <li key={index}>{item.post_title}</li> 
                                }
                              })}
                            </ul>
                          ) : '---'}
                    </ul>
                  }}
                />
                <Column
                  title="Trang"
                  dataIndex="page_id"
                  key="page_id"
                  render={val => {
                    return val?.page_title ?? "---"
                  }}
                />
                <Column
                  title="Hoạt động"
                  key="action"
                  render={(val, record) => (
                    <Space size="middle">
                      <Link to={{ pathname: "/schemas/" + val._id }}><i className="ri-eye-line action-icon"></i></Link>
                      <i className="ri-pencil-line action-icon" onClick={() => openPopupEditSchema(val)}></i>
                      <Popconfirm
                        title="Are you sure to delete this user?"
                        onConfirm={() => removeSchema(val._id)}
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

      <Modal
        title={schemaSelected ? "Sửa" : "Thêm mới"}
        okText="Save"
        visible={isModalAddSchemaVisible}
        onOk={schemaSelected ? editSchema : addNewSchema}
        onCancel={() => setIsModalVisible(false)}
        width="680px"
      >
        <div>
          <Form>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="schema_type">
                    Tên
                  </Label>
                  <Input
                    id="schema_type"
                    name="schema_type"
                    placeholder="Schema type"
                    type="text"
                    value={formVal.schema_type}
                    onChange={onInputChange}
                  />
                </FormGroup>
                
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="schema_script">
                    Đoạn mã
                  </Label>
                  <Input
                    id="schema_script"
                    name="schema_script"
                    placeholder="Schema script"
                    type="text"
                    value={formVal.schema_script}
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col lg={12}>
                <FormGroup>
                  <Label className="mb-1" for="schema_script">
                    Trang
                  </Label>
                  <Select
                    size="large"
                    name="page_id"
                    id="page_id"
                    value={formVal.page_id}
                    onChange={onPageChange}
                    placeholder="Pages"
                    style={{ width: "100%" }}
                  >
                    {pages && pages.map((page) => {
                      return (
                        <Option key={page._id} value={page._id}>{page.page_title}</Option>
                      );
                    })}
                  </Select>
                </FormGroup>
              </Col>
              <Col lg={12}>
                <FormGroup>
                  <Label className="mb-1" for="post_id">
                    Bài viết
                  </Label>
                  <Select
                    mode="multiple"
                    size="large"
                    name="post_id"
                    id="post_id"
                    value={formVal.post_id}
                    onChange={onPostChange}
                    placeholder="Posts"
                    style={{ width: "100%" }}
                  >
                    {posts && posts.map((post) => {
                      return (
                        <Option key={post._id} value={post._id}>{post.post_title}</Option>
                      );
                    })}
                  </Select>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal>
    </React.Fragment>
  );
}

export default SchemaList;
