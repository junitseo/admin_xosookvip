import React, { useEffect, useState } from "react";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Container,
  Row,
  Col,
  Card,
  CardText,
  CardTitle,
  Button,
  CardBody,
} from "reactstrap";
import { useParams } from "react-router-dom";
import { getDealerById } from '../../helpers/helper';
import { Badge, Space, Table, Modal, Select, notification, Popconfirm } from "antd";
import {
  URL_IMAGE_BUNNY
} from "../../helpers/url_helper";
function DealerDetail() {
  const [singDealer, setSingleDealer] = useState(null);
  const { id } = useParams();
  const getDealDetail = (id) => {
    getDealerById(id).then(res => {
      let image = res.dealer_image.toString().split('\\');
        if(res.dealer_image && image[1] === 'fakepath'){
            res.dealer_image = URL_IMAGE_BUNNY + res.dealer_image.substr(12)
        }
      setSingleDealer(res);
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
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Chi tiết nhà cái" pageTitle="Nhà cái"  slug='dealers' />
          <Row className="mb-2 ">
            <Col lg="12">
              <Card className="border">
                <Row>
                  <Col lg={3}>
                    <img
                      src={singDealer?.dealer_image}
                      height="250px"
                      width="100%"
                      alt=""
                    />
                  </Col>
                  <Col lg={9} className="pt-3">
                    <h5 className="mb-3">Tên</h5>
                    <div className="row gy-3">
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Tên nhà cái
                            </span>
                          </div>
                          <div className="col">{singDealer?.dealer_name}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Khuyến mãi
                            </span>
                          </div>
                          <div className="col">{singDealer?.dealer_promotion.map(item => item.dp_name)}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Interview
                            </span>
                          </div>
                          <div className="col">{singDealer?.dealer_interview}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Links
                            </span>
                          </div>
                          <div className="col">{singDealer?.dealer_link}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Đánh giá
                            </span>
                          </div>
                          <div className="col">{singDealer?.dealer_rating}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Đường dẫn tĩnh
                            </span>
                          </div>
                          <div className="col">{singDealer?.dealer_slug}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Sao đánh giá
                            </span>
                          </div>
                          <div className="col">{singDealer?.dealer_star_rate}</div>
                        </div>
                      </div>
                      <div className="col-6">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Thẻ đánh giá
                            </span>
                          </div>
                          <div className="col">
                            <ul>
                              {
                                singDealer?.dealer_tag_rate && singDealer?.dealer_tag_rate.map((rate, i) => (
                                  <li key={i}>{rate}</li>
                                ))
                              }
                            </ul>

                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <Card className="border">
                      <CardBody>
                        <CardText>
                          <div className="row gy-3">
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row">
                                <div className="col">
                                  <span className="font-medium text-grey">
                                    First Name
                                  </span>
                                </div>
                                <div className="col">aaaa</div>
                              </div>
                            </div>
                          </div>
                        </CardText>
                      </CardBody>
                    </Card> */}
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col lg="12">
              <h5>Mô tả</h5>
              <Card className="border">
                <CardBody>
                  <CardText>{singDealer?.dealer_description}</CardText>
                </CardBody>
              </Card>
            </Col>

            <Col lg="12">
              <h5>Video</h5>
              <Card className="border">
                <CardBody>
                  <CardText>{singDealer?.dealer_video}</CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default DealerDetail;
