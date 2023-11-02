import {
  Container,
  InputGroup,
  Row,
  Col,
  Input,
  InputGroupText,
  Button,
  Form,
  FormGroup,
  Label,
} from "reactstrap";
import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Badge,
  Space,
  Table,
  Modal,
  Select,
  notification,
  Popconfirm,
} from "antd";
import { Link, useHistory } from "react-router-dom";
import {
  getAllDealers,
  getDealerById,
  createDealer,
  deleteDealer,
  searchDealer,
} from "../../helpers/helper";
import ModalDealer from "./ModalDealer/ModalDealer";
import {
  URL_IMAGE_BUNNY
} from "../../helpers/url_helper";
const { Column } = Table;
const { Option } = Select;

const confirmDeleteText = "Are you sure to delete this dealer";

function DealerList() {
  const [isModalAddDealerVisible, setModalAddDealerVisible] = useState(false);
  const [dealerList, setDealerList] = useState([]);
  const [modalAction, setModalAction] = useState("");
  const [singleDealer, setSingleDealer] = useState(null);
  const [visible, setVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [deleteItem, setDeleteItem] = useState(null);
  const history = useHistory();

  const getDealers = () => {
    getAllDealers()
      .then((res) => {
        res.map((item, i) => {
          let image = item.dealer_image.toString().split('\\');
          if(item.dealer_image && image[1] === 'fakepath'){
            item.dealer_image = URL_IMAGE_BUNNY + item.dealer_image.substr(12)
          }
        })
        const formatRes = res.map((dealer) => ({
          ...dealer,
          key: dealer._id,
        }));
        setDealerList(formatRes);
      })
      .catch((error) => {
        notification["error"]({
          message: "System error",
          description: error,
        });
      });
  };

  useEffect(() => {
    getDealers();
  }, []);

  const addDealer = () => {
    setModalAction("CREATE");
    // setModalAddDealerVisible(true);
    history.push("/dealers/create");
  };
  const convertHtmlText = (htmlText) => {
    if (htmlText && htmlText.length > 0) {
        let strText = new DOMParser().parseFromString(htmlText, 'text/html').documentElement.textContent || '';
        if (strText && strText.length > 20) {
            strText = strText.slice(0, 20) + '...';
        }
        return strText;
    }
    return '';
  }

  const handleOk = (data) => {
    setModalAddDealerVisible(false);
    // onDelete(data);
    if (deleteItem._id) {
      deleteDealer(deleteItem._id).then(res => {
        notification['success']({
          message: 'Notification',
          description:
            'Delete dealer sucessfully!',
        });
        getDealers();
      }).catch(error => {
        notification['error']({
          message: 'System error',
          description:
            error,
        });
      })

    }
    // if (modalAction === 'CREATE') {
    //   createDealer(data).then(res => {
    //     getDealers();
    //   }).catch(error => {
    //     notification['error']({
    //       message: 'System error',
    //       description:
    //         error,
    //     });
    //   })
    // }

  };

  const onView = (record) => {
    setModalAction("VIEW");
    getDealerById(record._id)
      .then((res) => {
        setSingleDealer(res);
        setModalAddDealerVisible(true);
      })
      .catch((error) => {
        notification["error"]({
          message: "System error",
          description: error,
        });
      });

    // const mockDealer = dealerList[0];
    // setSingleDealer(mockDealer);
  };

  const onEdit = (record) => {
    setModalAction("EDIT");
    getDealerById(record._id)
      .then((res) => {
        setSingleDealer(res);
        setModalAddDealerVisible(true);
      })
      .catch((error) => {
        notification["error"]({
          message: "System error",
          description: error,
        });
      });
  };

  const onDelete = (record) => {
    deleteDealer(record._id)
      .then((res) => {
        getDealers();
      })
      .catch((error) => {
        notification["error"]({
          message: "System error",
          description: error,
        });
      });
  };
  const onCancel = () => {
    setModalAddDealerVisible(false);
  };
  const hideModal = () => {
    setVisible(false);
  };

  const onInputChange = (e) => {
    setSearchText(e.target.value);
    searchDealer({ q: e.target.value })
      .then((res) => {
        const formatRes = res.map((dealer) => ({
          ...dealer,
          key: dealer._id,
        }));
        setDealerList(formatRes);
      })
      .catch((error) => {
        notification["error"]({
          message: "System error",
          description: error,
        });
      });
  };
  const onSearch = () => {
    if (!searchText) {
      getDealers();
    }
    searchDealer({ q: searchText })
      .then((res) => {
        const formatRes = res.map((dealer) => ({
          ...dealer,
          key: dealer._id,
        }));
        setDealerList(formatRes);
      })
      .catch((error) => {
        notification["error"]({
          message: "System error",
          description: error,
        });
      });
  };
  const showDeleteModal = (record) => {
    setModalAddDealerVisible(true);
    setDeleteItem(record)
  }
  const modalTitle = modalAction === 'CREATE' ? 'Add Dealer' :
    modalAction === 'VIEW' ? 'View Dealer' :
      modalAction === 'EDIT' ? 'Edit Dealer' : '';
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Danh sách nhà cái" pageTitle="Nhà cái" />
          <Row className="mb-3">
            <Col lg="5">
              <div>
                <InputGroup>
                  <Input
                    value={searchText}
                    onChange={(e) => {
                      onInputChange(e);
                    }}
                    placeholder="Search nhà cái..."
                  />
                  <InputGroupText>
                    <i className="ri-search-line" onClick={onSearch}></i>
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>

            <Col lg="7">
              <div className="text-right">
                <Button onClick={addDealer}>Thêm mới</Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col>
              <Table dataSource={dealerList} scroll={{ x: "max-content" }}>
                <Column
                  title="#"
                  render={(val, rec, index) => {
                    return index + 1;
                  }}
                />
                <Column
                  title="Tên"
                  dataIndex="dealer_name"
                  key="dealer_name"
                />
                <Column
                  title="Hình ảnh"
                  dataIndex="dealer_image"
                  key="dealer_image"
                  width={100}
                  render={(image) => (
                    <img
                      src={image}
                      alt="pro_image"
                      style={{ width: "50%" }}
                    />
                  )}
                />
                <Column
                  title="Thứ hạng"
                  dataIndex="dealer_rank"
                  key="dealer_rank"
                />
                <Column title="Khuyến mãi" dataIndex="dealer_promotion" key="dealer_promotion"
                  render={val => {
                    return <div>{val && val?.length ? (
                      <ul>
                        {val.map((item, index) => {
                          return <li key={index}>{item.dp_name}</li>
                        })}
                      </ul>
                    ) : '---'}
                    </div>
                  }} />
                <Column
                  title="Thẻ đánh giá"
                  dataIndex="dealer_tag_rate"
                  key="dealer_tag_rate"
                  render={val => {
                    return <div>{val && val?.length ? (
                      <ul>
                        {val.map((item, index) => {
                          return <li key={index}>{item}</li>
                        })}
                      </ul>
                    ) : '---'}
                    </div>
                  }} />
                <Column
                  title="Sao đánh giá"
                  dataIndex="dealer_star_rate"
                  key="dealer_star_rate"
                  render={val => {
                    return <div>{val && val?.length ? (
                      <ul>
                        {val.map((item, index) => {
                          return <li key={index}>{item}</li>
                        })}
                      </ul>
                    ) : '---'}
                    </div>
                  }} />
                <Column title="" dataIndex="dealer_" key="dealer_" />

                <Column title="Link" dataIndex="dealer_link" key="dealer_link"
                  render={(link) => (
                    <a href={link}>{link}</a>
                  )}
                />

                
                <Column
                  title="Mô tả"
                  dataIndex="dealer_description"
                  key="dealer_description"
                  render={(des) => (<>{convertHtmlText(des)}</>)}
                />

                <Column
                  title="Video"
                  dataIndex="dealer_video"
                  key="dealer_video"
                />
                <Column
                  title="Interview"
                  dataIndex="dealer_interview"
                  key="dealer_interview"
                />
                <Column
                  title="Slug"
                  dataIndex="dealer_slug"
                  key="dealer_slug"
                />

                <Column
                  title="Hoạt động"
                  key="action"
                  fixed="right"
                  render={(val, record) => (
                    <Space size="middle">
                      <Link to={{ pathname: "/dealers/" + val._id }}><i className="ri-eye-line action-icon"></i></Link>
                      <Link to={{ pathname: "/dealers/edit/" + val._id }}><i className="ri-pencil-line action-icon"></i></Link>
                      <i className="ri-delete-bin-line action-icon" onClick={() => showDeleteModal(record)}></i>
                    </Space>
                  )}
                />
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
      {/* <ModalDealer
        title={modalTitle}
        visible={isModalAddDealerVisible}
        handleOk={handleOk}
        handleCancel={onCancel}
        action={modalAction}
        singleDealer={singleDealer}
      /> */}
      <Modal
        title="Modal"
        visible={visible}
        onOk={hideModal}
        onCancel={hideModal}
        okText="Ok"
        cancelText="Cancel"
        width={"50%"}
      >
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
        <p>Bla bla ...</p>
      </Modal>
      <Modal
        title="Confirm to delete"
        visible={isModalAddDealerVisible}
        onOk={handleOk}
        onCancel={() => setModalAddDealerVisible(false)}
      >
        <p>Are you sure to delete this record?</p>
      </Modal>
    </React.Fragment>
  );
}

export default DealerList;
