import React, { useEffect, useRef, useState } from 'react';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getAllDealerPromotion, getAllFaqs, getDealerById, getAllDealers } from '../../helpers/helper';
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
import { createDealerPromotion, updateDealerPromotion, getAllDealerService, getDealerPromotionDetail} from '../../helpers/helper';
import { useHistory, useParams } from 'react-router-dom';
import TagComp from './tag/TagComp';
import { Editor } from '@tinymce/tinymce-react';

const { Option } = Select;

const CreateEditDealerPromotion = () => {
    const history = useHistory();
   
    const editorDetailRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [dealerList, setDealerList] = useState([]);
    const [dpDetail, setDpDetail] = useState([]);
    const [formVal, setFormVal] = useState({
        "id" : "",
        "dp_name": "",
        "dp_detail": "",
        "dp_link": "",
        "dealer_id": ""
      });
      const { id } = useParams();
      useEffect(() => {
        if (id) {
        getDealerPromotionDetail(id)
            .then((res) => {
            // console.log('res: ', res);
            const dealerID = res.dealer_id?.map(item => item._id);
                setFormVal({
                    ...res,
                    dealer_id:  dealerID?.map(item => item),
                });
                const detail = res?.dp_detail?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
                setDpDetail(detail)
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
    const [dealers, setDealers] = useState([]);
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
    const onBack = () => {
        history.goBack();
    }
    //on Detail
    const onPressDetail = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDpDetail([...dpDetail, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dpDetail.map(item => item.text);
            setFormVal({
                ...formVal,
                dp_detail: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }

    }
    //on remove Detail
    const onRemoveDetail = (id) => {
        const details = dpDetail.filter(item => item.id !== id);
        setDpDetail(details);
        const txtValues = details.map(item => item.text);
        setFormVal({
            ...formVal,
            dp_detail: txtValues
        });
    }

    const onSave = () => {
        if (id) {
            setIsLoading(true);
            const data = {
                "id": formVal._id,
                "dp_name": formVal.dp_name,
                "dp_detail": formVal.dp_detail.toString(),
                "dp_link": formVal.dp_link,
                "dealer_id": formVal.dealer_id.toString()
            } 
            updateDealerPromotion(data)
                .then((res) => {
                notification["success"]({
                    message: "Notification",
                    description: "Update dealer promotion successfully!",
                });
                setIsLoading(false);
                history.push("/dealers-promotion");
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
            const data = {
                "dp_name": formVal.dp_name,
                "dp_detail": formVal.dp_detail,
                "dp_link": formVal.dp_link,
                "dealer_id": formVal.dealer_id.toString()
            } 
            createDealerPromotion(data).then(res => {
                setIsLoading(false);
                notification['success']({
                    message: 'Notification',
                    description:
                    'Create dealer promotion successfully!',
                });
                getDealers();
                history.push("/dealers-promotion");
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
    const breadCrumbTitle = id ? "Sửa" : "Thêm mới";
    return (
        <>
            <div className="page-content">
                <BreadCrumb title={breadCrumbTitle} pageTitle="Dealer Promotion" slug='dealer-promotion' />
                <div style={{ marginLeft: '10px' }}>
                <Form >
                    <Row>
                        <Col lg={9}>
                            <FormGroup>
                                <Label className="mb-1" for="dealer_name">
                                Tên khuyến mãi
                                </Label>
                                <Input
                                    id="dp_name"
                                    name="dp_name"
                                    placeholder="Name"
                                    type="dp_name"
                                    defaultValue={formVal.dp_name}
                                    onChange={onInputChange}
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={9}>
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
                                    mode="multiple"
                                    size="large"
                                    style={{ width: "100%" }}
                                    placeholder="Please select"
                                    onChange={handleChange}
                                    value={formVal.dealer_id || []}
                                    >
                                    {dealers?.map((item, index) => (
                                        <Option key={item._id}>{item?.dealer_name}</Option>
                                    ))}
                                </Select>
                            </FormGroup>
                        </Col>
                        <Col lg={9}>
                            <FormGroup>
                                <Label className="mb-1" for="page_category_name">
                                    Chi tiết:
                                </Label>
                                <Input
                                        id="dp_detail"
                                        name="dp_detail"
                                        placeholder="Detail"
                                        type="dp_detail"
                                        defaultValue={formVal.dp_detail}
                                        onKeyPress={onPressDetail}
                                    />
                            </FormGroup>
                                {
                                    dpDetail.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveDetail}
                                            id={item.id} />
                                    ))
                                }
                        </Col>
                        <Col lg={9}>
                            <FormGroup>
                                <Label className="mb-1" for="dp_link">
                                    Link
                                </Label>
                                <Input
                                id="dp_link"
                                name="dp_link"
                                placeholder="Link"
                                type="dp_link"
                                defaultValue={formVal.dp_link}
                                onChange={onInputChange}
                                />
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

export default CreateEditDealerPromotion;