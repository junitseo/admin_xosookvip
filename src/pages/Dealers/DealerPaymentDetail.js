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
import { getDealerPaymentDetail } from "../../helpers/helper";
import { useParams } from "react-router-dom";

function DealerPaymentDetail() {
  const { id } = useParams();
  const [payment, setPayment] = useState({});
  useEffect(() => {
    getDealerPaymentDetail(id).then(res => {
      // console.log('res: ', res);
      setPayment(res);
    })
  }, [])
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Chi tiết thanh toán" pageTitle="Nhà cái"  slug='dealers-payment'/>
          <Row className="mb-2 ">
            <Col lg="12">
              
            <h5>Tổng quan</h5>
              <Card className="border">
              <CardBody>
                  <div >
                    {/* <h5 className="mb-3">Name</h5> */}
                    <div className="row gy-3">
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                              Nạp tối thiểu
                            </span>
                          </div>
                          <div className="col">{payment.dp_deposit_min}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Nạp tối đa
                            </span>
                          </div>
                          <div className="col">{payment.dp_deposit_max}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Nạp tối đa/ Ngày
                            </span>
                          </div>
                          <div className="col">{payment.dp_deposit_max_day}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Thời gian xử lý
                            </span>
                          </div>
                          <div className="col">{payment.dp_deposit_processing_time}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Cổng nạp
                            </span>
                          </div>
                          <div className="col">{payment.dp_deposit_payments}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Rút tiền tối thiểu
                            </span>
                          </div>
                          <div className="col">{payment.dp_withdrawal_min}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Rút tiền tối đa
                            </span>
                          </div>
                          <div className="col">{payment.dp_withdrawal_max}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Rút tối đa/Ngày
                            </span>
                          </div>
                          <div className="col">{payment.dp_withdrawal_max_day}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Thời gian xử lý rút
                            </span>
                          </div>
                          <div className="col">{payment.dp_withdrawal_prc_time}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Cổng thanh toán rút
                            </span>
                          </div>
                          <div className="col">{payment.dp_withdrawal_payments}</div>
                        </div>
                      </div>
                      
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Ngân hàng nạp
                            </span>
                          </div>
                          <div className="col">{payment.dp_deposit_banks}</div>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="row">
                          <div className="col">
                            <span className="font-medium text-grey">
                            Ngân hàng rút 
                            </span>
                          </div>
                          <div className="col">{payment.dp_withdrawal_banks}</div>
                        </div>
                      </div>
                    </div>
                  </div>
              </CardBody>
              </Card>
            </Col>

            {/* <Col lg="12">
              <h5>Description</h5>
              <Card className="border">
                <CardBody>
                  <CardText>Description</CardText>
                </CardBody>
              </Card>
            </Col> */}

          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default DealerPaymentDetail;
