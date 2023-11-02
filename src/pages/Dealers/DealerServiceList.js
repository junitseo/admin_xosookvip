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
  Label
} from "reactstrap";
import React, { useState, useEffect } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Space, Table, Modal, Select, notification, Popconfirm } from "antd";
import { Link } from "react-router-dom";
import {
  getAllDealerService, deleteDealerService,
  searchDealerService, getAllDealers,
  createDealerService,
} from '../../helpers/helper';
import { useHistory } from "react-router-dom";


const confirmDeleteText = 'Are you sure to delete this dealer';

const { Column } = Table;
const { Option } = Select;
function DealerServiceList() {
  const [isModalAddDealerVisible, setModalAddDealerVisible] = useState(false);
  const [dealerList, setDealerList] = useState([]);
  const [dealers, setDealers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [formVal, setFormVal] = useState({
    "ds_zalo": "",
    "ds_skype": "",
    "ds_viber": "",
    "ds_email": "",
    "ds_hotline": "",
    "ds_telegram": "",
    "dealer_id": "",
    "ds_time" : "",
  });
  const history = useHistory();
  const addDealer = () => {
    createDealerService(formVal).then(res => {
      notification['success']({
        message: 'Notification',
        description:
          'Create dealer service successfully!',
      });
      getDealers();
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    });
  }
  const getDealers = () => {
    getAllDealerService().then(res => {
      const formatRes = res.map(dealer => ({
        ...dealer,
        key: dealer._id,
      }))
      setDealerList(formatRes);
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    });
  }
  useEffect(() => {
    getDealers();
    getAllDealers().then(res => {
      const formatRes = res.map(dealer => ({
        ...dealer,
        key: dealer._id,
      }))
      setDealers(formatRes);
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    });
  }, []);
  const onDelete = (record) => {
    deleteDealerService(record._id).then(res => {
      getDealers();
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    })
  }
  const addPromotion = () => {
    history.push('/dealer-service/create');
  }
  const onSearch = () => {
    if (!searchText) {
      getDealers();
    }
    else {
      searchDealerService({ q: searchText }).then(res => {
        const formatRes = res.map(dealer => ({
          ...dealer,
          key: dealer._id,
        }))
        setDealerList(formatRes);
      }).catch(error => {
        notification['error']({
          message: 'System error',
          description:
            error,
        });
      })
    }
  };
  const handleChange = (value) => {
    setFormVal({
      ...formVal,
      dealer_id: value
    })
  };

  const onInputChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value
    });
  }
  const onInputSearchChange = (e) => {
    setSearchText(e.target.value);
    searchDealerService({ q: e.target.value })
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
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Services" pageTitle="Dealers" />
          <Row className="mb-3">
            <Col lg="5">
              <div>
                <InputGroup>
                  <Input
                    value={searchText}
                    onChange={(e) => { onInputSearchChange(e) }}
                    placeholder="Search..."
                  />
                  <InputGroupText onClick={onSearch}>
                    <i className="ri-search-line"></i>
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>

            <Col lg="7">
              <div className="text-right">
                <Button onClick={ addPromotion}>Thêm mới</Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Table rowKey='_id' dataSource={dealerList} scroll={{ x: 'max-content' }}>
                <Column
                  title="#"
                  render={(val, rec, index) => {
                    return index + 1;
                  }}
                />
                <Column title="Zalo" dataIndex="ds_zalo" key="ds_zalo" />
                <Column title="Skype" dataIndex="ds_skype" key="ds_skype" />
                <Column title="Viber" dataIndex="ds_viber" key="ds_viber" />
                <Column title="Email" dataIndex="ds_email" key="ds_email" />
                <Column title="Hotline" dataIndex="ds_hotline" key="ds_hotline" />
                <Column title="Telegram" dataIndex="ds_telegram" key="ds_telegram" />
                <Column title="Thời gian hoạt động" dataIndex="ds_time" key="ds_time" />
                <Column
                  title="Hoạt động"
                  key="action"
                  render={(val, record) => (
                    <Space size="middle">
                      <Link to={{ pathname: "/dealers-service/" + val._id }}><i className="ri-eye-line action-icon"></i></Link>
                      <Link to={{ pathname: "/dealer-service/edit/" + val._id }}><i className="ri-pencil-line action-icon"></i></Link>
                      <Popconfirm placement="topLeft" title={confirmDeleteText} onConfirm={() => onDelete(record)} okText="Yes" cancelText="No">
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
        title="Add Dealer Service"
        okText="Save"
        visible={isModalAddDealerVisible}
        onOk={() => addDealer()}
        onCancel={() => setModalAddDealerVisible(false)}
        width="50%"
      >
        <div>
          <Form>
            <Row>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="ds_zalo">
                    Zalo
                  </Label>
                  <Input
                    id="ds_zalo"
                    name="ds_zalo"
                    placeholder="zalo"
                    type="ds_zalo"
                    onChange={onInputChange}

                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="ds_skype">
                    {" "}
                    Skype
                  </Label>
                  <Input
                    id="ds_skype"
                    name="ds_skype"
                    placeholder="skype"
                    type="ds_skype"
                    onChange={onInputChange}

                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="ds_viber">
                    Viber
                  </Label>
                  <Input
                    id="ds_viber"
                    name="ds_viber"
                    placeholder="viber"
                    type="ds_viber"
                    onChange={onInputChange}

                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="ds_email">
                    Email
                  </Label>
                  <Input
                    id="ds_email"
                    name="ds_email"
                    placeholder="email"
                    type="ds_email"
                    onChange={onInputChange}

                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="ds_hotline">
                    Hotline
                  </Label>
                  <Input
                    id="ds_hotline"
                    name="ds_hotline"
                    placeholder="hotline"
                    type="ds_hotline"
                    onChange={onInputChange}

                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="ds_telegram">
                    Telegram
                  </Label>
                  <Input
                    id="ds_telegram"
                    name="ds_telegram"
                    placeholder="telegram"
                    type="ds_telegram"
                    onChange={onInputChange}

                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="ds_time">
                    Thời gian hoạt động
                  </Label>
                  <Input
                    id="ds_time"
                    name="ds_time"
                    placeholder="time"
                    type="ds_time"
                    onChange={onInputChange}

                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_id">
                    Nhà cái
                  </Label>
                  {/* <Input
                    id="dealer_id"
                    name="dealer_id"
                    placeholder="dealer"
                    type="dealer_id"
                  /> */}
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={handleChange}>
                    {
                      dealers?.map(item => (
                        <Option key={item._id}>{item?.dealer_name}</Option>
                      ))
                    }
                    {/* <Option key={1}>FAQ1</Option>
                    <Option key={2}>FAQ2</Option> */}
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

export default DealerServiceList;
