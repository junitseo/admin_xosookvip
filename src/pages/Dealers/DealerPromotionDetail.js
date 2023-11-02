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
import { getDealerPromotionDetail } from "../../helpers/helper";
import { useParams } from "react-router-dom";

const data = [
  {
    id: "5eb12e197e06a76ccdefc121",
    dp_name: "Jason",
    dp_detail: "Watmore",
    dp_link: "jason",
    dealer_id: "jason",
  },
];

function DealerPromotionDetail() {
  const { id } = useParams();
  const [promotion, setPromotion] = useState({});
  useEffect(() => {
    getDealerPromotionDetail(id).then((res) => {
      // console.log("res: ", res);
      setPromotion({
        ...res,
        dp_detail: ["Thưởng 100% lên đến", "1.500.000"],
      });
    });
  }, []);
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Dealer Promotion Detail" pageTitle="Dealers" slug='dealers-promotion' />
          <Row className="mb-2 ">
            <Col lg="12">
              
            <h5>Tổng quan</h5>
              <Card className="border">
                <CardBody>
                  <h5 className="mb-2">{promotion?.dp_name}</h5>
                  <div className="row">
                    <div className="col">
                      <span className="font-medium text-grey"> Tên:</span>
                    </div>
                    <div className="col">{promotion?.dp_name}</div>
                  </div>

                  <div className="row">
                    <div className="col">
                      <span className="font-medium text-grey"> Link:</span>
                    </div>
                    <div className="col">{promotion?.dp_link}</div>
                  </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <h5>Chi tiết</h5>
              <Card className="border">
                <CardBody>
                  <ul>
                    {promotion?.dp_detail?.map((item, index) => {
                      return <li key={index}>{item}</li>;
                    })}
                  </ul>
                </CardBody>
              </Card>
            </Col>
            <Col lg={12}>
              <h5>Nhà cái</h5>
              <Row>
                <Col lg={4}>
                  <Card className="border">
                    <CardBody>
                      {promotion?.dealer_id && promotion?.dealer_id?.map((item, index) => {
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

export default DealerPromotionDetail;
