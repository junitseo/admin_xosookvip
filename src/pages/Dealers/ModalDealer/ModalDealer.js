import React, { useEffect, useRef, useState } from 'react';
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
import { Modal } from "antd";
const mockDeal = {
    "id": "",
    "dealer_name": "",
    "dealer_promotion": "",
    "dealer_tag_rate": "",
    "dealer_star_rate": "",
    "dealer_rating": "",
    "dealer_link": "",
    "dealer_image": "",
    "dealer_description": "",
    "dealer_video": "",
    "dealer_interview": "",
    "dealer_slug": "",
    "faq_id": ""
};
function ModalDealer({ title, visible, handleCancel, handleOk, singleDealer, action }) {
    const [formVal, setFormVal] = useState(mockDeal);
    const [isReadOnly, setIsReadOnly] = useState(false);
    useEffect(() => {
        setIsReadOnly(action === 'VIEW');
        if (['VIEW', 'EDIT'].includes(action) && singleDealer) {
            setFormVal(singleDealer);
            // setFormVal(obj);
        }
        else {
            setFormVal(mockDeal);
        }
    }, [action, singleDealer]);

    const onInputChange = (e) => {
        setFormVal({
            ...formVal,
            [e.target.name]: e.target.value
        });
    }
    return (
        <div>
            <Modal
                title={title}
                okText="Ok"
                visible={visible}
                onOk={() => handleOk(formVal)}
                onCancel={handleCancel}
                width="50%"
            >
                <div>
                    <Form>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_name">
                                        Dealer Name
                                    </Label>
                                    <Input
                                        id="dealer_name"
                                        name="dealer_name"
                                        placeholder="Dealer name"
                                        type="dealer_name"
                                        defaultValue={formVal.dealer_name}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_promotion}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_tag_rate}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_star_rate}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_rating">
                                        Đánh giá
                                    </Label>
                                    <Input
                                        id="dealer_rating"
                                        name="dealer_rating"
                                        placeholder="Dealer rating"
                                        type="dealer_rating"
                                        defaultValue={formVal.dealer_rating}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_link}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_image}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_description}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_video}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_interview}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
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
                                        defaultValue={formVal.dealer_slug}
                                        onChange={onInputChange}
                                        readOnly={isReadOnly}
                                    />
                                </FormGroup>
                            </Col>

                            {/* <Col lg={4}>
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
                            </Col> */}
                        </Row>
                    </Form>
                </div>
            </Modal>
        </div>
    );
}

export default ModalDealer;