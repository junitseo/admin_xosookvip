import React, { useEffect, useRef, useState } from 'react';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
    Container,
    InputGroup,
    Row,
    Col,
    Input,
    InputGroupText,
    Form,
    FormGroup,
    Label
} from "reactstrap";
import { Space, Table, Modal, Select, notification,Button, Popconfirm } from "antd";
import {
    getAllDealerService, getAllDealers,
    createDealerService, updateDealerService,
    getDealerServiceDetail
  } from '../../helpers/helper';
  import { useHistory, useParams } from "react-router-dom";
const { Option } = Select;

const CreateEditDealerService = () => {
    const [dealerList, setDealerList] = useState([]);
    const [dealers, setDealers] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const { id } = useParams();
    const [formVal, setFormVal] = useState({
      "id": "",
      "ds_zalo": "",
      "ds_skype": "",
      "ds_viber": "",
      "ds_email": "",
      "ds_hotline": "",
      "ds_telegram": "",
      "dealer_id": "",
      "ds_time" : ""
    });
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
        if (id) {
            getDealerServiceDetail(id)
                .then((res) => {
                // console.log('res: ', res);
                    setFormVal({
                        ...res,
                        dealer_id:  res.dealer_id[0] ? res.dealer_id[0]._id : null ,
                    });
                })
                .catch((error) => {
                notification["error"]({
                    message: "System error",
                    description: error,
                });
                });
            }
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
      const onSave = () => {
        if (id) {
            setIsLoading(true);
            updateDealerService(formVal)
                .then((res) => {
                notification["success"]({
                    message: "Notification",
                    description: "Update dealer promotion successfully!",
                });
                setIsLoading(false);
                history.push("/dealers-service");
                })
                .catch((error) => {
                setIsLoading(false);
                notification["error"]({
                    message: "System error",
                    description: error,
                });
            });
        }else{
            setIsLoading(true);
            createDealerService(formVal).then(res => {
                setIsLoading(false);
                notification['success']({
                    message: 'Notification',
                    description:
                    'Create dealer service successfully!',
                });
                getDealers();
                history.push("/dealers-service");
                }).catch(error => {
                setIsLoading(false);
                notification['error']({
                    message: 'System error',
                    description:
                    error,
                });
            });
        }
    }
    const onBack = () => {
      history.goBack();
    }
    const breadCrumbTitle = id ? "Sửa" : "Thêm mới";
    return (
        <>
               <div className="page-content">
                <BreadCrumb title={breadCrumbTitle} pageTitle="Dealer Service" slug='dealer-service' />
                <div style={{ marginLeft: '10px' }}>
                <Form >
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
                            defaultValue={formVal.ds_zalo}
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
                    defaultValue={formVal.ds_skype}
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
                    defaultValue={formVal.ds_viber}
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
                    defaultValue={formVal.ds_email}
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
                    defaultValue={formVal.ds_hotline}
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
                    defaultValue={formVal.ds_telegram}
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
                    defaultValue={formVal.ds_time}
                  />
                </FormGroup>
              </Col>
              <Col lg={4}>
                <FormGroup>
                  <Label className="mb-1" for="dealer_id">
                    Nhà cái 
                  </Label>
    
                  <Select
                     style={{ width: '100%' }}
                     placeholder="Please select"
                     onChange={handleChange}
                     value={formVal.dealer_id || ""}
                    >
                    {
                        dealers?.map(item => (
                        <Option key={item._id}>{item?.dealer_name}</Option>
                      ))
                    }
                    
                  </Select>
                </FormGroup>
              </Col>
                    </Row>
                </Form>
                </div>
                <Row>
                    <Col style={{ marginLeft: '10px' }}>
                        <Button style={{ marginRight: '10px' }} onClick={onBack}>Quay lại</Button>
                        <Button type="primary" onClick={onSave}>Lưu</Button>
                    </Col>
                </Row>

            </div>
        </>
    )
}

export default CreateEditDealerService;