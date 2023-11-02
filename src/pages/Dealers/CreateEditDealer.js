import React, { useEffect, useRef, useState } from 'react';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getAllDealerPromotion, getAllFaqs, getDealerById } from '../../helpers/helper';
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
import { Button, Select, notification, Input as InputAntd, Button as BtnAntd } from 'antd';
import { createDealer, updateDealer } from '../../helpers/helper';
import { useHistory, useParams } from 'react-router-dom';
import TagComp from './tag/TagComp';
import { Editor } from '@tinymce/tinymce-react';
import {
    uploadFileToBunny
  } from "../../helpers/api_bunny";
  import {
    URL_IMAGE_BUNNY
  } from "../../helpers/url_helper";
const { Option } = Select;

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
    "faq_id": "",
    "dealer_rank": ""
};
const { TextArea } = InputAntd;
const CreateEditDealer = () => {
    const [formVal, setFormVal] = useState(mockDeal);
    const [promotions, setPromotions] = useState([]);
    const [faqList, setFaqList] = useState([]);
    const [dlTagRates, setDlTagRates] = useState([]);
    const [dlStarRates, setDlStarRates] = useState([]);
    const [dlRatings, setDlRatings] = useState([]);
    const [dlLinks, setDlLinks] = useState([]);
    const [singDealer, setSingleDealer] = useState(null);
    const editorDescriptionRef = useRef(null);

    const history = useHistory();
    const { id } = useParams();

    const getDealDetail = (id) => {
        getDealerById(id).then(res => {
            let image = res.dealer_image.toString().split('\\');
                if(res.dealer_image && image[1] === 'fakepath'){
                    res.dealer_image = URL_IMAGE_BUNNY + res.dealer_image.substr(12)
                }
           
            setSingleDealer(res);
            setFormVal({
                ...res,
                faq_id: res.faq_id && res.faq_id.length > 0 ? res?.faq_id[0]._id : null,
                dealer_promotion_id: res.dealer_promotion && res.dealer_promotion.length > 0 ? res?.dealer_promotion[0]._id : null,
                dealer_tag_rate: '',
                dealer_star_rate: '',
                dealer_rating: '',
                dealer_link: '',
                id: res?._id,
                dealer_name: res.dealer_name,
                dealer_rank : res.dealer_rank
            });
            const tagRates = res?.dealer_tag_rate?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const starRates = res?.dealer_star_rate?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const dealerRatings = res?.dealer_rating?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const dealerLinks = res?.dealer_link?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            setDlTagRates(tagRates);
            setDlStarRates(starRates);
            setDlRatings(dealerRatings);
            setDlLinks(dealerLinks);
        }).catch(error => {
            notification['error']({
                message: 'System error',
                description:
                    error,
            });
        })
    }

    useEffect(() => {
        if (id) {
            getDealDetail(id);
        }
        getAllDealerPromotion().then(res => {
            const formatRes = res.map(dealer => ({
                ...dealer,
                key: dealer._id,
            }))
            setPromotions(formatRes);
        }).catch(error => {
            notification['error']({
                message: 'System error',
                description:
                    error,
            });
        });
        getAllFaqs().then(res => {
            const formatRes = res.map(dealer => ({
                ...dealer,
                key: dealer._id,
            }))
            setFaqList(formatRes)
        }).catch(error => {
            notification['error']({
                message: 'System error',
                description:
                    error,
            });
        });

    }, []);
    const onInputChange = (e) => {
        setFormVal({
            ...formVal,
            [e.target.name]: e.target.value
        });
        
        let file = e.target.files ? e.target.files[0] : null;
        if(file){
            uploadFileToBunny(file)
            setFormVal({...formVal, [e.target.name]: "https://cdn.baovietnam.com/" + file.name});
        }
    }
    const onPressTagRate = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlTagRates([...dlTagRates, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlTagRates.map(item => item.text);
            setFormVal({
                ...formVal,
                dealer_tag_rate: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }

    }
    const onPressStarRate = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlStarRates([...dlStarRates, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlStarRates.map(item => item.text);
            setFormVal({
                ...formVal,
                dealer_star_rate: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }
    const onPressDealerRating = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlRatings([...dlRatings, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlRatings.map(item => item.text);
            setFormVal({
                ...formVal,
                dealer_rating: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }
    const onPressDealerLink = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlLinks([...dlLinks, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlLinks.map(item => item.text);
            setFormVal({
                ...formVal,
                dealer_link: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagRate = (id) => {
        const rates = dlTagRates.filter(item => item.id !== id);
        setDlTagRates(rates);
        const txtValues = rates.map(item => item.text);
        setFormVal({
            ...formVal,
            dealer_tag_rate: txtValues
        });
    }
    const onRemoveStarRate = (id) => {
        const rates = dlStarRates.filter(item => item.id !== id);
        setDlStarRates(rates);
        const txtValues = rates.map(item => item.text);
        setFormVal({
            ...formVal,
            dealer_star_rate: txtValues
        });
    }
    const onRemoveDealerRating = (id) => {
        const rates = dlRatings.filter(item => item.id !== id);
        setDlRatings(rates);
        const txtValues = rates.map(item => item.text);
        setFormVal({
            ...formVal,
            dealer_rating: txtValues
        });
    }
    const onRemoveDealerLink = (id) => {
        const rates = dlLinks.filter(item => item.id !== id);
        setDlLinks(rates);
        const txtValues = rates.map(item => item.text);
        setFormVal({
            ...formVal,
            dealer_link: txtValues
        });
    }

    const onSave = () => {
        let des = '';
        if (editorDescriptionRef.current) {
            des = editorDescriptionRef.current.getContent() || '';
        }
        const txtValuesTagRate = dlTagRates.map(item => item.text);
        const txtValuesStarRate = dlStarRates.map(item => item.text);
        const txtValuesDealerRating = dlRatings.map(item => item.text);
        const txtValuesDealerLink = dlLinks.map(item => item.text);
        const payload = new FormData();
        payload.append('dealer_name', formVal.dealer_name);
        payload.append('id', formVal.id);
        // payload.append('dealer_promotion', formVal.dealer_promotion);
        payload.append('dealer_promotion', formVal.dealer_promotion_id);
        payload.append('dealer_tag_rate', txtValuesTagRate);
        payload.append('dealer_star_rate', txtValuesStarRate);
        payload.append('dealer_rating', txtValuesDealerRating);
        payload.append('dealer_link', txtValuesDealerLink);
        payload.append('dealer_image', formVal.dealer_image);
        payload.append('dealer_description', des);
        payload.append('dealer_video', formVal.dealer_video);
        payload.append('dealer_interview', formVal.dealer_interview);
        payload.append('dealer_slug', formVal.dealer_slug);
        payload.append('faq_id', formVal.faq_id);
        payload.append('dealer_rank', formVal.dealer_rank);
        if (id) {
            updateDealer(payload).then(res => {
                notification['success']({
                    message: 'Notification',
                    description:
                        'Edit dealer successfully!',
                });
                history.push('/dealers');

            }).catch(error => {
                notification['error']({
                    message: 'System error',
                    description:
                        error,
                });
            })
        } else {
            createDealer(payload).then(res => {
                notification['success']({
                    message: 'Notification',
                    description:
                        'Create dealer successfully!',
                });
                history.push('/dealers');
            }).catch(error => {
                notification['error']({
                    message: 'System error',
                    description:
                        error,
                });
            })
        }
    }
    const onFaqChange = (value) => {
        setFormVal({
            ...formVal,
            faq_id: value
        });
    }
    const onPromotionChange = (value) => {
        console.log(value)
        setFormVal({
            ...formVal,
            dealer_promotion_id: value
        });
    }
    const onBack = () => {
        history.goBack();
    }
    const breadCrumbTitle = id ? 'Sửa' : 'Thêm mới';
    return (
        <>
            <div className="page-content">
                <BreadCrumb title={breadCrumbTitle} pageTitle="Dealers" slug='dealers' />
                <div style={{ marginLeft: '10px' }}>
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
                                        defaultValue={formVal.dealer_name}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_promotion">
                                        Khuyến mãi
                                    </Label>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={onPromotionChange}
                                        value={formVal.dealer_promotion_id}
                                    >
                                        {
                                            promotions?.map(item => (
                                                <Option key={item._id}>{item?.dp_name}</Option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="Faqs">
                                        FAQs
                                    </Label>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Please select"
                                        onChange={onFaqChange}
                                        value={formVal.faq_id}
                                    >
                                        {
                                            faqList?.map(item => (
                                                <Option key={item._id}>{item?.faq_name}</Option>
                                            ))
                                        }
                                    </Select>
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_tag_rate">
                                        Thẻ đánh giá
                                    </Label>
                                    <Input
                                        id="dealer_tag_rate"
                                        name="dealer_tag_rate"
                                        placeholder="Type and press Enter to add dealer tag rate"
                                        type="dealer_tag_rate"
                                        defaultValue={formVal.dealer_tag_rate}
                                        // onChange={onInputChange}
                                        onKeyPress={onPressTagRate}
                                    />
                                </FormGroup>
                                {
                                    dlTagRates.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagRate}
                                            id={item.id} />
                                    ))
                                }
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_star_rate">
                                        Sao đánh giá
                                    </Label>
                                    <Input
                                        id="dealer_star_rate"
                                        name="dealer_star_rate"
                                        placeholder="Type and press Enter to add dealer star rate"
                                        type="dealer_star_rate"
                                        defaultValue={formVal.dealer_star_rate}
                                        // onChange={onInputChange}
                                        onKeyPress={onPressStarRate}
                                    />
                                </FormGroup>
                                {
                                    dlStarRates.map((item, i) => (
                                        <TagComp key={i} content={item}
                                            onRemove={onRemoveStarRate}
                                            id={item.id}
                                        />
                                    ))
                                }
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_rating">
                                        Đánh giá
                                    </Label>
                                    <Input
                                        id="dealer_rating"
                                        name="dealer_rating"
                                        placeholder="Type and press Enter to add dealer rating"
                                        type="dealer_rating"
                                        defaultValue={formVal.dealer_rating}
                                        // onChange={onInputChange}
                                        onKeyPress={onPressDealerRating}
                                    />
                                </FormGroup>
                                {
                                    dlRatings.map((item, i) => (
                                        <TagComp key={i} content={item}
                                            onRemove={onRemoveDealerRating}
                                            id={item.id}
                                        />
                                    ))
                                }
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_link">
                                        Link
                                    </Label>
                                    <Input
                                        id="dealer_link"
                                        name="dealer_link"
                                        placeholder="Type and press Enter to add dealer link"
                                        type="dealer_link"
                                        defaultValue={formVal.dealer_link}
                                        // onChange={onInputChange}
                                        onKeyPress={onPressDealerLink}
                                    />
                                </FormGroup>
                                {
                                    dlLinks.map((item, i) => (
                                        <TagComp key={i} content={item}
                                            onRemove={onRemoveDealerLink}
                                            id={item.id}
                                        />
                                    ))
                                }
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_image">
                                        Hình ảnh
                                    </Label>
                                    <div>
                                        <label className="custom-file-upload">
                                            <Input
                                                id="add_image"
                                                name="dealer_image"
                                                placeholder="Dealer image"
                                                type="file"
                                                defaultValue={formVal.dealer_image}
                                                onChange={onInputChange}
                                             />
                                             Thêm ảnh
                                        </label>
                                    </div>
                                   {formVal.dealer_image && formVal.dealer_image !== "" && 
                                        <Col lg={6}>
                                            <img
                                                src={formVal.dealer_image}
                                                alt="pro_image"
                                                style={{ width: "70%" }}
                                            />
                                        </Col>
                                   }
                                    
                                </FormGroup>
                            </Col>

                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_video">
                                        Video
                                    </Label>
                                    <div>
                                        <label className="custom-file-upload">
                                            <Input
                                                id="dealer_video"
                                                name="dealer_video"
                                                placeholder="Dealer video"
                                                type="file"
                                                defaultValue={formVal.dealer_video}
                                                onChange={onInputChange}
                                            />
                                            Thêm Video
                                        </label>
                                    </div>
                                    {formVal.dealer_video && formVal.dealer_video !== "" && 
                                        <Col lg={6}>
                                            <img
                                                src={formVal.dealer_video}
                                                alt="pro_image"
                                                style={{ width: "70%" }}
                                            />
                                        </Col>
                                   }
                                </FormGroup>
                            </Col>
                            <Col lg={3}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_interview">
                                        Interview
                                    </Label>
                                    <Input
                                        id="dealer_interview"
                                        name="dealer_interview"
                                        placeholder="Dealer interview"
                                        type="dealer_interview"
                                        defaultValue={formVal.dealer_interview}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={3}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_rank">
                                        Thứ hạng
                                    </Label>
                                    <Input
                                        id="dealer_rank"
                                        name="dealer_rank"
                                        placeholder="Dealer rank"
                                        type="dealer_rank"
                                        defaultValue={formVal.dealer_rank}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={6}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_slug">
                                        Đường dẫn tĩnh
                                    </Label>
                                    <Input
                                        id="dealer_slug"
                                        name="dealer_slug"
                                        placeholder="Dealer slug"
                                        type="dealer_slug"
                                        defaultValue={formVal.dealer_slug}
                                        onChange={onInputChange}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_description">
                                        Mô tả
                                    </Label>
                                    {/* <Input
                                        id="dealer_description"
                                        name="dealer_description"
                                        placeholder="Dealer description"
                                        type="textarea"
                                        defaultValue={formVal.dealer_description}
                                        onChange={onInputChange}
                                        rows={5}
                                    /> */}
                                    <Editor
                                        apiKey={"w17lpon88s3owkb87t8wnmyrb7dnvziqf3mrghzfk7ft8cpl"}
                                        onInit={(evt, editor) => editorDescriptionRef.current = editor}
                                        initialValue={formVal.dealer_description}
                                        // value={formVal?.dealer_description}
                                        init={{
                                            height: 200,
                                            menubar: false,
                                            file_picker_callback: function (cb, value, meta) {
                                              var input = document.createElement("input");
                                              input.setAttribute("type", "file");
                                              input.setAttribute("accept", "image/*");
                                              input.onchange = function () {
                                                var file = this.files[0];
                                
                                                var reader = new FileReader();
                                                reader.onload = function () {
                                                  var id = "blobid" + new Date().getTime();
                                                  var blobCache = editorDescriptionRef.current.editorUpload.blobCache;
                                                  var base64 = reader.result.split(",")[1];
                                                  var blobInfo = blobCache.create(id, file, base64);
                                                  blobCache.add(blobInfo);
                                
                                                  /* call the callback and populate the Title field with the file name */
                                                  cb(blobInfo.blobUri(), { title: file.name });
                                                };
                                                reader.readAsDataURL(file);
                                              };
                                              input.click();
                                            },
                                            paste_data_images: true,
                                            image_title: true,
                                            automatic_uploads: true,
                                            file_picker_types: 'image',
                                            plugins: [
                                              "advlist",
                                              "autolink",
                                              "lists",
                                              "link",
                                              "image",
                                              "charmap",
                                              "preview",
                                              "anchor",
                                              "searchreplace",
                                              "visualblocks",
                                              "code",
                                              "fullscreen",
                                              "insertdatetime",
                                              "media",
                                              "table",
                                              "code",
                                              "help",
                                              "wordcount",
                                              "image"
                                            ],
                                            toolbar:
                                              "undo redo | blocks | " +
                                              "bold italic forecolor | alignleft aligncenter " +
                                              "alignright alignjustify | bullist numlist outdent indent | " +
                                              "removeformat | link image | code",
                                            content_style:
                                              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                          }}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <TextArea/> */}
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
                <Row>
                    <Col style={{ marginLeft: '10px' }}>
                        <Button style={{ marginRight: '10px' }} onClick={onBack}>Quay lại</Button>
                        <Button type="primary" onClick={onSave}>Lưu</Button>
                    </Col>
                </Row>

            </div>
        </>
    )
};

export default CreateEditDealer;
