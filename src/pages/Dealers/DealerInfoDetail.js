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
import { getDealerInfoDetail } from "../../helpers/helper";
import { useParams } from "react-router-dom";

// const data = {
//   di_game_system: [],
//   _id: "62c01e8908cb637173b2c5bc",
//   di_name: " Nhà cái w88",
//   di_slug: " nha_cai_w88",
//   di_score1: "9.4 ",
//   di_score2: "9.6 ",
//   di_score3: "9.6 ",
//   di_score4: "9.5",
//   di_score5: "9.5",
//   di_reason:
//     "W88 hiện đang là trang cá cược uy tín hàng đầu châu Á hiện nay. Luôn nằm trong top 3 nhà cái lớn nhất Việt Nam được cộng đồng người chơi cá cược bình chọn. ",
//   di_advantages: [
//     "Thương hiệu hoạt động lâu năm",
//     "Trải nghiệm website tuyệt vời",
//     "Đa dạng sản phẩm cá độ thể thao",
//     "Hỗ trợ đa dạng phương thức nạp/trả tiền",
//     "Tiền thưởng chào mừng lớn",
//   ],
//   di_weakness:["Chưa có hoàn trả áp dụng cho trò chơi Poker","Người chơi có thể nhập sai địa chỉ như: W88, WWW.88…"],
//   di_eveluate: " Marquee Holdings Ltd.",
//   di_host: " Marquee Holdings Ltd.",
//   di_headquarters: " Philipines",
//   di_license: " PAGCOR, FCLRC, CEZA",
//   di_founded_year: " 2010",
//   di_partner:["Đại sứ thương hiệu: Emile Heskey", "Đối tác CLB Leicester City", "Tài trợ “vàng” cho CLB Aston Villa"],
//   di_languages: ["VN","EN","TL","KR","FR"],
//   di_mobile_applications: '["iOS", "iPadOS", "Android"] ',
//   di_web_applications: "không",
//   di_live_soccer: " không",
//   di_odds: " US (Mỹ), CN (China), DEC (Decimal), MY (Myanmar), IND (Indonesia)",
//   di_bets:
//     " Châu Á (Handicap), Châu Âu (1x2), Tài xỉu (Over/Under), Xiên (BTTS), ...",
//   di_currency: ["RMB", "INR", "IDR", "KRW", "MYR", "THB", "USD", "VNĐ"],
//   di_lowest_bet: " 100.000",
//   di_highest_bet: " 200.000.000",
//   dealer_id: null,
// };

function DealerInfoDetail() {
  const { id } = useParams();
  const [data, setInforDealer] = useState(null);
  useEffect(() => {
    getDealerInfoDetail(id).then((res) => {
      console.log("res: ", res);
      if(res){
        setInforDealer(res);
      }
      
    });
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Thông tin chi tiết" pageTitle="Thông tin"  slug='dealers-info' />
          {data && 
            <Row className="mb-2 ">
              <Col lg="12">
                <Card className="border">
                  <CardBody>
                    <div>
                      <h3>{data.di_name}</h3>
                      <h5 className="mb-3">{data.di_reason}</h5>
                      <div className="row gy-3">
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Trụ sở chính
                              </span>
                            </div>
                            <div className="col">{data.di_headquarters}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Chủ quản
                              </span>
                            </div>
                            <div className="col">{data.di_host}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Giấy phép
                              </span>
                            </div>
                            <div className="col">{data.di_license}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Năm thành lập
                              </span>
                            </div>
                            <div className="col">{data.di_founded_year}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">Loại kèo</span>
                            </div>
                            <div className="col">{data.di_bets}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">Tỉ lệ cược</span>
                            </div>
                            <div className="col">{data.di_odds}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Tiền cược thấp nhất
                              </span>
                            </div>
                            <div className="col">{data.di_lowest_bet}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Tiền cược cao nhất
                              </span>
                            </div>
                            <div className="col">{data.di_highest_bet}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Score 1
                              </span>
                            </div>
                            <div className="col">{data.di_score1}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Score 2
                              </span>
                            </div>
                            <div className="col">{data.di_score2}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Score 3
                              </span>
                            </div>
                            <div className="col">{data.di_score3}</div>
                          </div>
                        </div>
                        <div className="col-4">
                          <div className="row">
                            <div className="col">
                              <span className="font-medium text-grey">
                                Score 4
                              </span>
                            </div>
                            <div className="col">{data.di_score4}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Col>

              <Col lg="12">
                <h5>Ưu điểm</h5>
                <Card className="border">
                  <CardBody>
                    <CardText>
                      <ul>
                        {data.di_advantages.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="12">
                <h5>Nhược điểm</h5>
                <Card className="border">
                  <CardBody>
                    <CardText>
                      <ul>
                        {data.di_weakness.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="12">
                <h5>Đối tác và tài trợ</h5>
                <Card className="border">
                  <CardBody>
                    <CardText>
                      <ul>
                        {data.di_partner.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
              <Col lg="12">
                <h5>Tiền tệ</h5>
                <Card className="border">
                  <CardBody>
                    <CardText>
                      <ul>
                        {data.di_currency.map((item, index) => {
                          return <li key={index}>{item}</li>;
                        })}
                      </ul>
                    </CardText>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          }
        </Container>
      </div>
    </React.Fragment>
  );
}

export default DealerInfoDetail;
