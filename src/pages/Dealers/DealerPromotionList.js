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
import { Link, useHistory } from "react-router-dom";
import { getAllDealerPromotion, deleteDealerPromotion, searchDealerPromotion } from '../../helpers/helper';

const confirmDeleteText = 'Are you sure to delete this dealer';

const { Column } = Table;
const { Option } = Select;
function DealerPromotionList() {
  const [isModalAddDealerVisible, setModalAddDealerVisible] = useState(false);
  const [dealerList, setDealerList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const history = useHistory();
  const addDealer = () => {

  }

  const getDealers = () => {
    getAllDealerPromotion().then(res => {
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
  }, []);
  const addPromotion = () => {
    history.push('/dealer-promotion/create');
  }
  const onDelete = (record) => {
    deleteDealerPromotion(record._id).then(res => {
      getDealers();
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    })
  }
  const onSearch = () => {
    if (!searchText) {
      getDealers();
    }
    else {
      searchDealerPromotion({ q: searchText }).then(res => {
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
  const onInputSearchChange = (e) => {
    setSearchText(e.target.value);
    searchDealerPromotion({q : e.target.value })
      .then((res) => {
        // console.log('res', res)
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

  const renderListItems = (items) => {
      if (items) {
        return items.map((item, i) => (<li key={i}>{item}</li>))
      }
      return '';
  }
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Khuyến mãi" pageTitle="Nhà cái" />
          <Row className="mb-3">
            <Col lg="5">
              <div>
                <InputGroup>
                  <Input
                    value={searchText}
                    onChange={(e) => { onInputSearchChange(e) }}
                    placeholder="Tìm kiếm..."
                  />
                  <InputGroupText  onClick={onSearch}>
                    <i className="ri-search-line"></i>
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>
            <Col lg="7">
                <div className="text-right">
                    <Button onClick={addPromotion}>Thêm mới</Button>
                </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Table rowKey='_id' dataSource={dealerList}>
                <Column
                  title="#"
                  render={(val, rec, index) => {
                    return index + 1;
                  }}
                />
                <Column
                  title="Tên"
                  dataIndex="dp_name"
                  key="dp_name"
                />
                <Column title="Chi tiết" dataIndex="dp_detail" key="dp_detail" 
                  render={(items) => (renderListItems(items))}
                />
                <Column title="Link" dataIndex="dp_link" key="dp_link" />
                <Column
                  title="Hoạt động"
                  key="action"
                  render={(val, record) => (
                    <Space size="middle">
                      <Link to={{ pathname: "/dealers-promotion/" + val._id }}><i className="ri-eye-line action-icon"></i></Link> 
                      <Link to={{ pathname: "/dealer-promotion/edit/" + val._id }}><i className="ri-pencil-line action-icon"></i></Link>
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
        title="Add Dealer Promotion"
        okText="Save"
        visible={isModalAddDealerVisible}
        onOk={() => addDealer()}
        onCancel={() => setModalAddDealerVisible(false)}
        width="900px"
      >
        <div>
          <Form>
            <Row>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_name">
                    Tên
                  </Label>
                  <Input
                    id="dealer_name"
                    name="dealer_name"
                    placeholder="Dealer name"
                    type="dealer_name"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_promotion">
                    {" "}
                    Dealer promotion
                  </Label>
                  <Input
                    id="dealer_promotion"
                    name="dealer_promotion"
                    placeholder="Dealer promotion"
                    type="dealer_promotion"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_tag_rate">
                    Dealer tag rate
                  </Label>
                  <Input
                    id="dealer_tag_rate"
                    name="dealer_tag_rate"
                    placeholder="Dealer tag rate"
                    type="dealer_tag_rate"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_star_rate">
                    Dealer star rate
                  </Label>
                  <Input
                    id="dealer_star_rate"
                    name="dealer_star_rate"
                    placeholder="Dealer star rate"
                    type="dealer_star_rate"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_rating">
                    Dealer rating
                  </Label>
                  <Input
                    id="dealer_rating"
                    name="dealer_rating"
                    placeholder="Dealer rating"
                    type="dealer_rating"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_link">
                    Dealer link
                  </Label>
                  <Input
                    id="dealer_link"
                    name="dealer_link"
                    placeholder="Dealer link"
                    type="dealer_link"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_image">
                    Dealer image
                  </Label>
                  <Input
                    id="dealer_image"
                    name="dealer_image"
                    placeholder="Dealer image"
                    type="dealer_image"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_description">
                    Dealer description
                  </Label>
                  <Input
                    id="dealer_description"
                    name="dealer_description"
                    placeholder="Dealer description"
                    type="dealer_description"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_video">
                    Dealer video
                  </Label>
                  <Input
                    id="dealer_video"
                    name="dealer_video"
                    placeholder="Dealer video"
                    type="dealer_video"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_interview">
                    Dealer interview
                  </Label>
                  <Input
                    id="dealer_interview"
                    name="dealer_interview"
                    placeholder="Dealer interview"
                    type="dealer_interview"
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_slug">
                    Dealer slug
                  </Label>
                  <Input
                    id="dealer_slug"
                    name="dealer_slug"
                    placeholder="Dealer slug"
                    type="dealer_slug"
                  />
                </FormGroup>
              </Col>

              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_slug">
                    FAQs
                  </Label>
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={() => { }}
                  >
                    <Option key={1}>FAQ1</Option>
                    <Option key={2}>FAQ2</Option>
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

export default DealerPromotionList;
