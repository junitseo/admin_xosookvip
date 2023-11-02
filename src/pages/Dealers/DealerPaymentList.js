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
import { getAllDealersPayment, deleteDealerPayment, searchDealerPayment, getAllDealers, creatDealerPayment, updateDealerPayment } from '../../helpers/helper';
import { success } from "../../Components/Common/message";


const confirmDeleteText = 'Are you sure to delete this dealer';

const { Column } = Table;
const { Option } = Select;
function DealerPaymentList() {
  const [isModalAddDealerVisible, setModalAddDealerVisible] = useState(false);
  const [paymentSelected, setPaymentSelected] = useState(null)
  const [dealerPaymentList, setDealerPaymentList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [dealer, setDealer] = useState([]);
  const [formVal, setFormVal] = useState({
    dp_deposit_min : "",
    dp_deposit_max : "",
    dp_deposit_max_day : "",
    dp_deposit_processing_time : "",
    dp_deposit_payments : "",
    dp_deposit_banks : "",
    dp_withdrawal_min : "",
    dp_withdrawal_max : "",
    dp_withdrawal_max_day : "",
    dp_withdrawal_prc_time : "",
    dp_withdrawal_payments : "",
    dp_withdrawal_banks : "",
    dealer_id : "",
  })
  const history = useHistory();

  const getDealers = () => {
    getAllDealersPayment().then(res => {
      const formatRes = res.map(dealer => ({
        ...dealer,
        key: dealer._id,
      }))
      setDealerPaymentList(formatRes);
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
      setDealer(res);
    })
  }, []);

  const onDelete = (record) => {
    deleteDealerPayment(record._id).then(res => {
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
      searchDealerPayment({ q: searchText }).then(res => {
        const formatRes = res.map(dealer => ({
          ...dealer,
          key: dealer._id,
        }))
        setDealerPaymentList(formatRes);
      }).catch(error => {
        notification['error']({
          message: 'System error',
          description:
            error,
        });
      })
    }
  };
  const openPopupEditDealerPayment = (item, check) =>{
    if (check) {
      setPaymentSelected(item);
      setFormVal({
        dp_deposit_min : item.dp_deposit_min,
        dp_deposit_max : item.dp_deposit_max,
        dp_deposit_max_day : item.dp_deposit_max_day,
        dp_deposit_processing_time : item.dp_deposit_processing_time,
        dp_deposit_payments : item.dp_deposit_payments,
        dp_deposit_banks : item.dp_deposit_banks,
        dp_withdrawal_min : item.dp_withdrawal_min,
        dp_withdrawal_max : item.dp_withdrawal_max,
        dp_withdrawal_max_day : item.dp_withdrawal_max_day,
        dp_withdrawal_prc_time : item.dp_withdrawal_prc_time,
        dp_withdrawal_payments : item.dp_withdrawal_payments,
        dp_withdrawal_banks : item.dp_withdrawal_banks,
        dealer_id : item.dealer_id?._id,
      });
    }else{
      setFormVal({
        dp_deposit_min : "",
        dp_deposit_max : "",
        dp_deposit_max_day : "",
        dp_deposit_processing_time : "",
        dp_deposit_payments : "",
        dp_deposit_banks : "",
        dp_withdrawal_min : "",
        dp_withdrawal_max : "",
        dp_withdrawal_max_day : "",
        dp_withdrawal_prc_time : "",
        dp_withdrawal_payments : "",
        dp_withdrawal_banks : "",
        dealer_id : "",
      })
    }
    setModalAddDealerVisible(true);
  }
  const onDealerChange = (e) => {
    setFormVal({...formVal, dealer_id: e})
  }

  const onInputChange = (e) => {
    setFormVal({
      ...formVal,
      [e.target.name]: e.target.value,
    });
  }

  const editPayment = () => {
    updateDealerPayment(paymentSelected._id, formVal).then(res => {
      success();
      setModalAddDealerVisible(false);
      getDealers();
      setFormVal({
        dp_deposit_min : "",
        dp_deposit_max : "",
        dp_deposit_max_day : "",
        dp_deposit_processing_time : "",
        dp_deposit_payments : "",
        dp_deposit_banks : "",
        dp_withdrawal_min : "",
        dp_withdrawal_max : "",
        dp_withdrawal_max_day : "",
        dp_withdrawal_prc_time : "",
        dp_withdrawal_payments : "",
        dp_withdrawal_banks : "",
        dealer_id : "",
      })
    })
  }

  const addPayment =() => {
    setPaymentSelected(null);
    creatDealerPayment({...formVal}).then(res => {
      success();
      setModalAddDealerVisible(false);
      getDealers();
      setFormVal({
        dp_deposit_min : "",
        dp_deposit_max : "",
        dp_deposit_max_day : "",
        dp_deposit_processing_time : "",
        dp_deposit_payments : "",
        dp_deposit_banks : "",
        dp_withdrawal_min : "",
        dp_withdrawal_max : "",
        dp_withdrawal_max_day : "",
        dp_withdrawal_prc_time : "",
        dp_withdrawal_payments : "",
        dp_withdrawal_banks : "",
        dealer_id : "",
      })
    })
  }
  const onInputSearchChange = (e) => {
    setSearchText(e.target.value);
    searchDealerPayment({q : e.target.value })
      .then((res) => {
        const formatRes = res.map((dealer) => ({
          ...dealer,
          key: dealer._id,
        }));
        setDealerPaymentList(formatRes);
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
          <BreadCrumb title="Thanh toán" pageTitle="Nhà cái" />
          <Row className="mb-3">
            <Col lg="5">
              <div>
                {/* <InputGroup>
                  <Input
                    value={searchText}
                    onChange={(e) => { onInputSearchChange(e) }}
                    placeholder="Search..."
                  />
                  <InputGroupText  onClick={onSearch}>
                    <i className="ri-search-line"></i>
                  </InputGroupText>
                </InputGroup> */}
              </div>
            </Col>

            <Col lg="7">
              <div className="text-right">
                <Button onClick={() => openPopupEditDealerPayment()}>Thêm mới</Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Table rowKey='_id' dataSource={dealerPaymentList} scroll={{ x: 'max-content' }}>
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
                <Column title="Nạp tối thiểu" dataIndex="dp_deposit_min" key="dp_deposit_min" />
                <Column title="Nạp tối đa" dataIndex="dp_deposit_max" key="dp_deposit_max" />
                <Column title="Nạp tối đa/ngày" dataIndex="dp_deposit_max_day" key="dp_deposit_max_day" />
                <Column title="Thời gian xử lý" dataIndex="dp_deposit_processing_time" key="dp_deposit_processing_time" />
                <Column title="Cổng nạp" dataIndex="dp_deposit_payments" key="dp_deposit_payments" />

                <Column title="Ngân hàng" dataIndex="dp_deposit_banks" key="dp_deposit_banks"
                  render={(items) => {
                    let array = Array.isArray(items) ? JSON.parse(items) : items && typeof (items) === 'string' ? items.split(',') : items || [];
                      if (array.length > 2) {
                        array = [array[0], array[1]];
                      }
                    return (
                      <ul>
                        {array.map((tag, i) => (
                          <li key={i}>{tag}</li>
                        ))}
                        <li>...</li>
                      </ul>
                    )
                  }}
                />

                <Column title="Rút tối thiểu" dataIndex="dp_withdrawal_min" key="dp_withdrawal_min" />
                <Column title="Rút tối đa" dataIndex="dp_withdrawal_max" key="dp_withdrawal_max" />
                <Column title="Rút tối đa/ngày" dataIndex="dp_withdrawal_prc_time" key="dp_withdrawal_prc_time" />
                <Column title="Thời gian xử lý" dataIndex="dp_withdrawal_payments" key="dp_withdrawal_payments" />
                <Column title="Ngân hàng hỗ trợ rút" dataIndex="dp_withdrawal_banks" key="dp_withdrawal_banks"
                  render={(items) => {
                    let array = Array.isArray(items) ? JSON.parse(items) : items && typeof (items) === 'string' ? items.split(',') : items || [];
                    if (array.length > 2) {
                      array = [array[0], array[1]];
                    }
                    return (
                      <ul>
                        {array.map((tag, i) => (
                          <li key={i}>{tag}</li>
                        ))}
                        <li>...</li>
                      </ul>
                    )
                  }}
                />

                <Column
                  title="Hoạt động"
                  key="action"
                  fixed="right"
                  render={(val, record) => (
                    <Space size="middle">
                      <Link to={{ pathname: "/dealers-payment/" + val._id }}><i className="ri-eye-line action-icon"></i></Link> 
                      <i className="ri-pencil-line action-icon" onClick={() => openPopupEditDealerPayment(val, "edit")}></i>
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
        title={formVal._id ? "Sửa" : "Thêm mới"}
        okText="Lưu"
        visible={isModalAddDealerVisible}
        onOk={formVal._id ?  editPayment : addPayment}
        onCancel={() => setModalAddDealerVisible(false)}
        width="900px"
      >
        <div>
          <Form>
            <Row>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_deposit_min">
                    Nạp tối thiểu
                  </Label>
                  <Input
                    id="dp_deposit_min"
                    value={formVal.dp_deposit_min}
                    name="dp_deposit_min"
                    placeholder="Deposit min"
                    type="dp_deposit_min"
                    onChange={onInputChange}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_deposit_max">
                    Nạp tối đa
                  </Label>
                  <Input
                    id="dp_deposit_max"
                    name="dp_deposit_max"
                    placeholder="Deposit max"
                    type="dp_deposit_max"
                    onChange={onInputChange}
                    value={formVal.dp_deposit_max}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_deposit_max_day">
                    Nạp tối đa/ Ngày
                  </Label>
                  <Input
                    id="dp_deposit_max_day"
                    name="dp_deposit_max_day"
                    placeholder="Deposit max day"
                    type="dp_deposit_max_day"
                    onChange={onInputChange}
                    value={formVal.dp_deposit_max_day}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_deposit_processing_time">
                    Thời gian xử lý
                  </Label>
                  <Input
                    id="dp_deposit_processing_time"
                    name="dp_deposit_processing_time"
                    placeholder="Deposit Processing time"
                    type="dp_deposit_processing_time"
                    onChange={onInputChange}
                    value={formVal.dp_deposit_processing_time}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_deposit_payments">
                    Cổng nạp
                  </Label>
                  <Input
                    id="dp_deposit_payments"
                    name="dp_deposit_payments"
                    placeholder="Deposit payments"
                    type="dp_deposit_payments"
                    onChange={onInputChange}
                    value={formVal.dp_deposit_payments}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_deposit_banks">
                    Ngân hàng nạp tiền
                  </Label>
                  <Input
                    id="dp_deposit_banks"
                    name="dp_deposit_banks"
                    placeholder="Deposit banks"
                    onChange={onInputChange}
                    type="textarea"
                    value={formVal.dp_deposit_banks}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_withdrawal_min">
                    Rút tối thiểu
                  </Label>
                  <Input
                    id="dp_withdrawal_min"
                    name="dp_withdrawal_min"
                    placeholder="Withdrawal min"
                    type="dp_withdrawal_min"
                    onChange={onInputChange}
                    value={formVal.dp_withdrawal_min}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_withdrawal_max">
                    Rút tối đa
                  </Label>
                  <Input
                    id="dp_withdrawal_max"
                    name="dp_withdrawal_max"
                    placeholder="Withdrawal max"
                    type="dp_withdrawal_max"
                    onChange={onInputChange}
                    value={formVal.dp_withdrawal_max}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_withdrawal_max_day">
                    Rút tối đa/Ngày
                  </Label>
                  <Input
                    id="dp_withdrawal_max_day"
                    name="dp_withdrawal_max_day"
                    placeholder="Withdrawal max day"
                    type="dp_withdrawal_max_day"
                    onChange={onInputChange}
                    value={formVal.dp_withdrawal_max_day}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_withdrawal_prc_time">
                    Thời gian xử lý rút
                  </Label>
                  <Input
                    id="dp_withdrawal_prc_time"
                    name="dp_withdrawal_prc_time"
                    placeholder="Withdrawal prc time"
                    type="dp_withdrawal_prc_time"
                    onChange={onInputChange}
                    value={formVal.dp_withdrawal_prc_time}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_withdrawal_payments">
                    Cổng thanh toán rút
                  </Label>
                  <Input
                    id="dp_withdrawal_payments"
                    name="dp_withdrawal_payments"
                    placeholder="Withdrawal payments"
                    type="dp_withdrawal_payments"
                    onChange={onInputChange}
                    value={formVal.dp_withdrawal_payments}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dp_withdrawal_banks">
                    Ngân hàng rút tiền
                  </Label>
                  <Input
                    id="dp_withdrawal_banks"
                    name="dp_withdrawal_banks"
                    placeholder="Withdrawal banks"
                    type="textarea"
                    onChange={onInputChange}
                    value={formVal.dp_withdrawal_banks}
                  />
                </FormGroup>
              </Col>

              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_slug">
                    Nhà cái
                  </Label>
                  <Select
                    allowClear
                    style={{ width: '100%' }}
                    placeholder="Please select"
                    onChange={onDealerChange}
                    id="dealer_id"
                    name="dealer_id"
                    value={formVal.dealer_id}
                  >
                    {
                      dealer?.map(item => (
                        <Option key={item._id} value={item._id}>{item?.dealer_name}</Option>
                      ))
                    }
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

export default DealerPaymentList;
