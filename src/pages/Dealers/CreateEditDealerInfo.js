/* eslint-disable no-debugger */
import React, { useEffect, useRef, useState } from 'react';
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getAllDealers, getDealerInfoById } from '../../helpers/helper';
import {
    Row,
    Col,
    Input,
    Form,
    FormGroup,
    Label
} from "reactstrap";
import { Button, Select, notification, Input as InputAntd, Button as BtnAntd } from 'antd';
import { createDealerInfo, updateDealerInfo } from '../../helpers/helper';
import { useHistory, useParams } from 'react-router-dom';
import TagComp from './tag/TagComp';
import { Editor } from '@tinymce/tinymce-react';

const { Option } = Select;

const mockDeal = {
    "id": "",
    "di_name": "",
    "di_slug": "",
    "di_score1": "",
    "di_score2": "",
    "di_score3": "",
    "di_score4": "",
    "di_score5": "",
    "di_reason": "",
    "di_advantages": "",
    "di_weakness": "",
    "di_eveluate": "",
    "di_host": "",
    "di_headquarters": "",
    "di_license": "",
    "di_founded_year": "",
    "di_partner": "",
    "di_languages": "",
    "di_mobile_applications": "",
    "di_web_applications": "",
    "di_live_soccer": "",
    "di_odds": "",
    "di_bets": "",
    "di_currency": "",
    "di_lowest_bet": "",
    "di_highest_bet": "",
    "dealer_id": "",
    "di_game_system": ""
};
const CreateEditDealerInfo = () => {
    const history = useHistory();
    const { id } = useParams();

    const [formVal, setFormVal] = useState(mockDeal);
    const [dlAdvantages, setDlAdvantages] = useState([]);
    const [dlWeakness, setDlWeakness] = useState([]);
    const [dlPartner, setDlPartner] = useState([]);
    const [dlLanguages, setDlLanguages] = useState([]);
    const [dlMobileApplications, setDlMobileApplications] = useState([]);
    const [dlGameSystem, setDlGameSystem] = useState([]);
    const [dlCurrency, setDlCurrency] = useState([]);

    const [dealers, setDealers] = useState([]);

    useEffect(() => {
        if (id) {
            getDealerInfoDetail(id);
        }
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

    const getDealerInfoDetail = (id) => {
        getDealerInfoById(id).then(res => {
            setFormVal({
                ...res,
                id: res?._id,
                dealer_id: res.dealer_id ? res?.dealer_id._id : '',
                di_advantages: '',
                di_weakness: '',
                di_partner: '',
                di_languages: '',
                di_mobile_applications: '',
                di_game_system: '',
                di_currency: '',
            });

            const advantages = res?.di_advantages?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const weakness = res?.di_weakness?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const partner = res?.di_partner?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const languages = res?.di_languages?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const mobile_applications = res?.di_mobile_applications?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const game_system = res?.di_game_system?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));
            const currency = res?.di_currency?.map((item, i) => ({ id: new Date().getTime() + i, text: item }));


            setDlAdvantages(advantages);
            setDlWeakness(weakness);
            setDlPartner(partner);
            setDlLanguages(languages);
            setDlMobileApplications(mobile_applications);
            setDlGameSystem(game_system);
            setDlCurrency(currency);

        }).catch(error => {
            notification['error']({
                message: 'System error',
                description:
                    error,
            });
        })
    }

    const onInputChange = (e) => {
        setFormVal({
            ...formVal,
            [e.target.name]: e.target.value
        });
    }

    const onPressTagAdvantages = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlAdvantages([...dlAdvantages, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlAdvantages.map(item => item.text);
            setFormVal({
                ...formVal,
                di_advantages: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagAdvantages = (id) => {
        const advantages = dlAdvantages.filter(item => item.id !== id);
        setDlAdvantages(advantages);
        const txtValues = advantages.map(item => item.text);
        setFormVal({
            ...formVal,
            di_advantages: txtValues
        });
    }

    const onPressTagGameSystem = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlGameSystem([...dlGameSystem, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlGameSystem.map(item => item.text);
            setFormVal({
                ...formVal,
                di_game_system: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagGameSystem = (id) => {
        const game_system = dlGameSystem.filter(item => item.id !== id);
        setDlGameSystem(game_system);
        const txtValues = game_system.map(item => item.text);
        setFormVal({
            ...formVal,
            di_game_system: txtValues
        });
    }

    const onPressTagWeakness = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlWeakness([...dlWeakness, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlWeakness.map(item => item.text);
            setFormVal({
                ...formVal,
                di_weakness: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagWeakness = (id) => {
        const weakness = dlWeakness.filter(item => item.id !== id);
        setDlWeakness(weakness);
        const txtValues = weakness.map(item => item.text);
        setFormVal({
            ...formVal,
            di_weakness: txtValues
        });
    }

    const onPressTagPartner = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlPartner([...dlPartner, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlPartner.map(item => item.text);
            setFormVal({
                ...formVal,
                di_partner: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagPartner = (id) => {
        const partner = dlPartner.filter(item => item.id !== id);
        setDlPartner(partner);
        const txtValues = partner.map(item => item.text);
        setFormVal({
            ...formVal,
            di_partner: txtValues
        });
    }

    const onPressTagLanguages = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlLanguages([...dlLanguages, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlLanguages.map(item => item.text);
            setFormVal({
                ...formVal,
                di_languages: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagLanguages = (id) => {
        const languages = dlLanguages.filter(item => item.id !== id);
        setDlLanguages(languages);
        const txtValues = languages.map(item => item.text);
        setFormVal({
            ...formVal,
            di_languages: txtValues
        });
    }

    const onPressTagApplications = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlMobileApplications([...dlMobileApplications, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlMobileApplications.map(item => item.text);
            setFormVal({
                ...formVal,
                di_mobile_applications: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagApplications = (id) => {
        const applications = dlMobileApplications.filter(item => item.id !== id);
        setDlMobileApplications(applications);
        const txtValues = applications.map(item => item.text);
        setFormVal({
            ...formVal,
            di_mobile_applications: txtValues
        });
    }

    const onPressTagCurrency = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setDlCurrency([...dlCurrency, { id: new Date().getTime(), text: e.target.value }]);
            const txtValues = dlCurrency.map(item => item.text);
            setFormVal({
                ...formVal,
                di_currency: [...txtValues, e.target.value].toString()
            });
            e.target.value = '';
        }
    }

    const onRemoveTagCurrency = (id) => {
        const currency = dlCurrency.filter(item => item.id !== id);
        setDlCurrency(currency);
        const txtValues = currency.map(item => item.text);
        setFormVal({
            ...formVal,
            di_currency: txtValues
        });
    }

    const onDealerChange = (value) => {
        setFormVal({
            ...formVal,
            dealer_id: value
        });
    }

    const onSave = () => {
        const txtValuesAdvantages = dlAdvantages.map(item => item.text);
        const txtValuesWeakness = dlWeakness.map(item => item.text);
        const txtValuesPartner = dlPartner.map(item => item.text);
        const txtValuesLanguages = dlLanguages.map(item => item.text);
        const txtValuesMobileApplications = dlMobileApplications.map(item => item.text);
        const txtValuesGameSystem = dlGameSystem.map(item => item.text);
        const txtValuesCurrency = dlCurrency.map(item => item.text);
        const data = {
            'id': formVal.id,
            'di_name': formVal.di_name,
            'di_slug': formVal.di_slug,
            'di_score1': formVal.di_score1,
            'di_score2': formVal.di_score2,
            'di_score3': formVal.di_score3,
            'di_score4': formVal.di_score4,
            'di_score5': formVal.di_score5,
            'di_reason': formVal.di_reason,
            'di_advantages': txtValuesAdvantages,
            'di_weakness': txtValuesWeakness,
            'di_eveluate': formVal.di_eveluate,
            'di_host': formVal.di_host,
            'di_headquarters': formVal.di_headquarters,
            'di_license': formVal.di_license,
            'di_founded_year': formVal.di_founded_year,
            'di_partner': txtValuesPartner,
            'di_languages': txtValuesLanguages,
            'di_mobile_applications': txtValuesMobileApplications,
            'di_game_system': txtValuesGameSystem,
            'di_web_applications': formVal.di_web_applications,
            'di_live_soccer': formVal.di_live_soccer,
            'di_odds': formVal.di_odds,
            'di_bets': formVal.di_bets,
            'di_currency': txtValuesCurrency,
            'di_lowest_bet': formVal.di_lowest_bet,
            'di_highest_bet': formVal.di_highest_bet,
            'dealer_id': formVal.dealer_id
        };
        if (id) {
            updateDealerInfo(data).then(res => {
                notification['success']({
                    message: 'Notification',
                    description:
                        'Edit dealer successfully!',
                });
                history.push('/dealers-info');

            }).catch(error => {
                notification['error']({
                    message: 'System error',
                    description:
                        error,
                });
            })
        } else {
            createDealerInfo(data).then(res => {
                notification['success']({
                    message: 'Notification',
                    description:
                        'Create dealer successfully!',
                });
                history.push('/dealers-info');
            }).catch(error => {
                notification['error']({
                    message: 'System error',
                    description:
                        error,
                });
            })
        }
    }

    const onBack = () => {
        history.goBack();
    }

    const breadCrumbTitle = id ? 'Sửa' : 'Thêm mới';

    return (
        <>
            <div className="page-content">
                <BreadCrumb title={breadCrumbTitle} pageTitle="Nhà cái" slug='dealers' />
                <div style={{ marginLeft: '10px' }}>
                    <Form>
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_name">
                                        Tên
                                    </Label>
                                    <Input
                                        id="di_name"
                                        name="di_name"
                                        placeholder="Nhập tên"
                                        type="di_name"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_name}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_slug">
                                        Đường dẫn tĩnh
                                    </Label>
                                    <Input
                                        id="di_slug"
                                        name="di_slug"
                                        placeholder="Nhập hoặc không nhập tự động phát sinh"
                                        type="di_slug"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_slug}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_score1">
                                        Điểm Uy tín & Bảo mật
                                    </Label>
                                    <Input
                                        id="di_score1"
                                        name="di_score1"
                                        placeholder="Nhập điểm uy tín và bảo mật"
                                        type="di_score1"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_score1}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_score2">
                                        Điểm Nạp/Rút Tiền
                                    </Label>
                                    <Input
                                        id="di_score2"
                                        name="di_score2"
                                        placeholder="Nhập điểm nạp/rút tiền"
                                        type="di_score2"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_score2}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_score3">
                                        Điểm Hỗ trợ khách hàng
                                    </Label>
                                    <Input
                                        id="di_score3"
                                        name="di_score3"
                                        placeholder="Nhập điểm hỗ trợ khách hàng"
                                        type="di_score3"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_score3}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_score4">
                                        Điểm tỉ lệ cược
                                    </Label>
                                    <Input
                                        id="di_score4"
                                        name="di_score4"
                                        placeholder="Nhập điểm tỉ lệ cược"
                                        type="di_score4"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_score4}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_score5">
                                        Điểm Tiền thưởng/khuyến mãi
                                    </Label>
                                    <Input
                                        id="di_score5"
                                        name="di_score5"
                                        placeholder="Nhập điểm tiền thường/khuyến mãi"
                                        type="di_score5"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_score5}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={8}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_reason">
                                        Lý do
                                    </Label>
                                    <Input
                                        id="di_reason"
                                        name="di_reason"
                                        placeholder="Nhập lý do"
                                        type="textarea"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_reason}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_advantages">
                                        Ưu điểm
                                    </Label>
                                    <Input
                                        id="di_advantages"
                                        name="di_advantages"
                                        placeholder="Nhập xong nhấn enter để hoàn thành"
                                        type="di_advantages"
                                        defaultValue={formVal.di_advantages}
                                        onKeyPress={onPressTagAdvantages}
                                    />
                                </FormGroup>
                                {
                                    dlAdvantages.map((item, i) => (
                                        < TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagAdvantages}
                                            id={item.id} />
                                    ))
                                }
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_game_system">
                                        Hệ thống trò chơi
                                    </Label>
                                    <Input
                                        id="di_game_system"
                                        name="di_game_system"
                                        placeholder="Nhập xong nhấn enter để hoàn thành"
                                        type="di_game_system"
                                        defaultValue={formVal.di_game_system}
                                        onKeyPress={onPressTagGameSystem}
                                    />
                                </FormGroup>
                                {
                                    dlGameSystem.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagGameSystem}
                                            id={item.id} />
                                    ))
                                }
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_weakness">
                                        Nhược điểm
                                    </Label>
                                    <Input
                                        id="di_weakness"
                                        name="di_weakness"
                                        placeholder="Nhập xong nhấn enter để hoàn thành"
                                        type="di_weakness"
                                        defaultValue={formVal.di_weakness}
                                        onKeyPress={onPressTagWeakness}
                                    />
                                </FormGroup>
                                {
                                    dlWeakness.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagWeakness}
                                            id={item.id} />
                                    ))
                                }
                            </Col>
                            {/* <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_host">
                                        Chủ quản
                                    </Label>
                                    <Input
                                        id="di_host"
                                        name="di_host"
                                        placeholder="Dealer Info Host"
                                        type="di_host"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_host}
                                    />
                                </FormGroup>
                            </Col> */}
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_headquarters">
                                        Trụ sở chính
                                    </Label>
                                    <Input
                                        id="di_headquarters"
                                        name="di_headquarters"
                                        placeholder="Nhập trụ sở chính"
                                        type="di_headquarters"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_headquarters}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_license">
                                        Giấy phép
                                    </Label>
                                    <Input
                                        id="di_license"
                                        name="di_license"
                                        placeholder="Nhập giấy phép"
                                        type="di_license"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_license}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_founded_year">
                                        Năm thành lập
                                    </Label>
                                    <Input
                                        id="di_founded_year"
                                        name="di_founded_year"
                                        placeholder="Nhập năm thành lập"
                                        type="di_founded_year"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_founded_year}
                                    />
                                </FormGroup>
                            </Col>
                            {/* <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_partner">
                                        Đối tác và tài trợ
                                    </Label>
                                    <Input
                                        id="di_partner"
                                        name="di_partner"
                                        placeholder="Type and press Enter to add dealer info partner"
                                        type="di_partner"
                                        onKeyPress={onPressTagPartner}
                                        defaultValue={formVal.di_partner}
                                    />
                                </FormGroup>
                                {
                                    dlPartner.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagPartner}
                                            id={item.id} />
                                    ))
                                }
                            </Col> */}
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_languages">
                                        Ngôn ngữ
                                    </Label>
                                    <Input
                                        id="di_languages"
                                        name="di_languages"
                                        placeholder="Nhập xong nhấn enter để hoàn thành"
                                        type="di_languages"
                                        defaultValue={formVal.di_languages}
                                        onKeyPress={onPressTagLanguages}
                                    />
                                </FormGroup>
                                {
                                    dlLanguages.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagLanguages}
                                            id={item.id} />
                                    ))
                                }
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_mobile_applications">
                                        Ứng dụng di động
                                    </Label>
                                    <Input
                                        id="di_mobile_applications"
                                        name="di_mobile_applications"
                                        placeholder="Nhập xong nhấn enter để hoàn thành"
                                        type="di_mobile_applications"
                                        defaultValue={formVal.di_mobile_applications}
                                        onKeyPress={onPressTagApplications}
                                    />
                                </FormGroup>
                                {
                                    dlMobileApplications.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagApplications}
                                            id={item.id} />
                                    ))
                                }
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_web_applications">
                                       Ứng dụng máy tính
                                    </Label>
                                    <Input
                                        id="di_web_applications"
                                        name="di_web_applications"
                                        placeholder="Ứng dụng máy tính"
                                        type="di_web_applications"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_web_applications}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_live_soccer">
                                        Xem bóng đá trực tuyến
                                    </Label>
                                    <Input
                                        id="di_live_soccer"
                                        name="di_live_soccer"
                                        placeholder="Xem bóng đá trực tuyến"
                                        type="di_live_soccer"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_live_soccer}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_odds">
                                        Tỉ lệ cược
                                    </Label>
                                    <Input
                                        id="di_odds"
                                        name="di_odds"
                                        placeholder="Tỉ lệ cược"
                                        type="di_odds"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_odds}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_bets">
                                        Loại kèo
                                    </Label>
                                    <Input
                                        id="di_bets"
                                        name="di_bets"
                                        placeholder="Loại kèo"
                                        type="di_bets"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_bets}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={12}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_currency">
                                        Tiền tệ
                                    </Label>
                                    <Input
                                        id="di_currency"
                                        name="di_currency"
                                        placeholder="Nhập xong nhấn enter để hoàn thành"
                                        type="di_currency"
                                        defaultValue={formVal.di_currency}
                                        onKeyPress={onPressTagCurrency}
                                    />
                                </FormGroup>
                                {
                                    dlCurrency.map((item, i) => (
                                        <TagComp key={i}
                                            content={item}
                                            onRemove={onRemoveTagCurrency}
                                            id={item.id} />
                                    ))
                                }
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_lowest_bet">
                                        Mức cược thấp nhất
                                    </Label>
                                    <Input
                                        id="di_lowest_bet"
                                        name="di_lowest_bet"
                                        placeholder="Mức cược thấp nhất"
                                        type="di_lowest_bet"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_lowest_bet}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="di_highest_bet">
                                        Mức cược cao nhất
                                    </Label>
                                    <Input
                                        id="di_highest_bet"
                                        name="di_highest_bet"
                                        placeholder="Mức cược cao nhất"
                                        type="di_highest_bet"
                                        onChange={onInputChange}
                                        defaultValue={formVal.di_highest_bet}
                                    />
                                </FormGroup>
                            </Col>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label className="mb-1" for="dealer_promotion">
                                        Nhà cái
                                    </Label>
                                    <Select
                                        style={{ width: '100%' }}
                                        placeholder="Vui lòng chọn"
                                        onChange={onDealerChange}
                                        value={formVal.dealer_id}
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
};

export default CreateEditDealerInfo;
