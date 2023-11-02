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
import { Link, useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getDealerServiceDetail } from "../../helpers/helper";

const mock = 
  {
    id: "",
    ds_zalo: "",
    ds_skype: "",
    ds_viber: "",
    ds_email: "",
    ds_hotline: "",
    ds_telegram: "",
    dealer_id: "",
  }
;

function DealerServiceDetail() {
  const { id } = useParams();
  const history = useHistory();
  const [service, setService] = useState(mock);
  useEffect(() => {
    if(id){
      getDealerServiceDetail(id).then((res) => {
        setService({
          ...res,
        });
      });
    }
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dịch vụ" pageTitle="Nhà cái" slug='dealers-service' />
          <Row className="mb-2 gy-3">
            <Col lg="10">
            <h5>Tổng quan</h5>
              <Card className="border">
                <CardBody>
                  <div className="row gy-4">
                    <div className="col-4">
                      <div className="row">
                        <div className="col">
                          <span className="font-medium text-grey"> Zalo:</span>
                        </div>
                        <div className="col">{service.ds_zalo}</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="row">
                        <div className="col">
                          <span className="font-medium text-grey"> Skype:</span>
                        </div>
                        <div className="col">{service.ds_skype}</div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col">
                          <span className="font-medium text-grey"> Viber:</span>
                        </div>
                        <div className="col">{service.ds_viber}</div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col">
                          <span className="font-medium text-grey"> Email:</span>
                        </div>
                        <div className="col">{service.ds_email}</div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col">
                          <span className="font-medium text-grey">
                            {" "}
                            Telegram:
                          </span>
                        </div>
                        <div className="col">{service.ds_telegram}</div>
                      </div>
                    </div>

                    <div className="col-4">
                      <div className="row">
                        <div className="col">
                          <span className="font-medium text-grey">
                            {" "}
                            Hotline:
                          </span>
                        </div>
                        <div className="col">{service.ds_hotline}</div>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="row">
                        <div className="col">
                          <span className="font-medium text-grey">
                            {" "}
                            Thời gian hoạt động:
                          </span>
                        </div>
                        <div className="col">{service.ds_hotline}</div>
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>

            <Col lg={12}>
              <h5>Nhà cái</h5>
              <Row>
                <Col lg={4}>
                  <Card className="border">
                    <CardBody>
                      {service?.dealer_id && service?.dealer_id?.map((item, index) => {
                        return (
                          <div key={index}>
                            <h6>{item.dealer_name}</h6>
                            <div className="row">
                              <div className="col">Mô tả</div>
                              <div className="col">{item.dealer_description}</div>
                            </div>
                            <div className="row">
                              <div className="col">Đánh giá</div>
                              <div className="col">
                                {item.dealer_rating?.join(", ")}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">Sao đánh giá</div>
                              <div className="col">
                                {item.dealer_star_rate?.join(", ")}
                              </div>
                            </div>
                            <div className="row">
                              <div className="col">Thẻ đánh giá</div>
                              <div className="col">
                                {item.dealer_tag_rate?.join(", ")}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default DealerServiceDetail;
