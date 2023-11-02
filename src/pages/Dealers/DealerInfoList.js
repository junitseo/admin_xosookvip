import {
  Container,
  InputGroup,
  Row,
  Col,
  Input,
  InputGroupText,
  Button
} from "reactstrap";
import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { Space, Table, Select, notification, Popconfirm } from "antd";
import { getAllDealersInfo, deleteDealerInfo, searchDealerInfo } from '../../helpers/helper';

const { Column } = Table;
const { Option } = Select;
const confirmDeleteText = 'Are you sure to delete this dealer';

function DealerInfoList() {

  const history = useHistory();


  const [dealerListInfo, setDealerListInfo] = useState([]);
  const [searchText, setSearchText] = useState('');

  const getAllDealerInfo = () => {
    getAllDealersInfo().then(res => {
      // console.log("🚀 ~ file: DealerInfoList.js ~ line 30 ~ getAllDealersInfo ~ res", res)
      const formatRes = res.map(dealer => ({
        ...dealer,
        key: dealer._id,
      }));
      setDealerListInfo(formatRes);
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    });
  }
  useEffect(() => {
    getAllDealerInfo();
  }, []);

  const addDealerInfo = () => {
    history.push("/dealers-info/new/create");
  }

  const onDelete = (record) => {
    deleteDealerInfo(record._id).then(res => {
      getAllDealerInfo();
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    })
  }

  const onSearch = () => {
    if (!searchText) {
      getAllDealerInfo();
    }
    searchDealerInfo({ q: searchText }).then(res => {
      const formatRes = res.map(dealer => ({
        ...dealer,
        key: dealer._id,
      }))
      setDealerListInfo(formatRes);
    }).catch(error => {
      notification['error']({
        message: 'System error',
        description:
          error,
      });
    })
  };

  const onInputChange = (e) => {
    setSearchText(e.target.value);
    console.log('e' , e.target.value);
    searchDealerInfo({q : e.target.value })
      .then((res) => {
        const formatRes = res.map((dealer) => ({
          ...dealer,
          key : dealer._id,
        }))
        setDealerListInfo(formatRes);
      })
      .catch((error) => {
        notification['error']({
          message: 'System error',
          description:
            error,
        });
      })
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Infos" pageTitle="Dealers" />
          <Row className="mb-3">
            <Col lg="5">
              <div>
                <InputGroup>
                  <Input
                    value={searchText}
                    onChange={(e) => {
                      onInputChange(e);
                    }}
                    placeholder="Search..."
                  />
                  <InputGroupText>
                    <i className="ri-search-line" onClick={onSearch}></i>
                  </InputGroupText>
                </InputGroup>
              </div>
            </Col>
            <Col lg="7">
              <div className="text-right">
                <Button onClick={addDealerInfo}>Thêm mới</Button>
              </div>
            </Col>
          </Row>

          <Row>
            <Col lg={12}>
              <Table rowKey='_id' dataSource={dealerListInfo} scroll={{ x: 'max-content' }}>
                <Column
                  title="#"
                  render={(val, rec, index) => {
                    return index + 1;
                  }}
                />
                <Column
                  title="Tên "
                  dataIndex="di_name"
                  key="di_name"
                />
                {/* <Column title="Chủ quản" dataIndex="di_host" key="di_host" /> */}
                <Column title="Trụ sở chính" dataIndex="di_headquarters" key="di_headquarters" />
                <Column title="Giấy phép" dataIndex="di_license" key="di_license" />
                <Column title="Năm thành lập" dataIndex="di_founded_year" key="di_founded_year" />
                {/* <Column title="Đối tác" dataIndex="di_partner" key="di_partner"
                  render={(items) => {
                    return (
                      <ul>
                        {items?.map((tag, i) => (
                          <li key={i}>{tag}</li>
                        ))}
                      </ul>
                    )
                  }}
                /> */}
                <Column title="Ngôn ngữ" dataIndex="di_languages" key="di_languages"
                  render={(items) => {
                    return (
                      <ul>
                        {items?.map((tag, i) => (
                          <li key={i}>{tag}</li>
                        ))}
                      </ul>
                    )
                  }}
                />
                <Column
                  title="Hoạt động"
                  key="action"
                  fixed="right"
                  render={(val, record) => (
                    <Space size="middle">
                      <Link to={{ pathname: "/dealers-info/" + val._id }}><i className="ri-eye-line action-icon"></i></Link>
                      <Link to={{ pathname: "/dealers-info/edit/" + val._id }}><i className="ri-pencil-line action-icon"></i></Link>
                      <Popconfirm placement="topLeft" title={confirmDeleteText} onConfirm={() => onDelete(record)} okText="Yes" cancelText="No">
                        <i className="ri-delete-bin-line action-icon"></i>
                      </Popconfirm>
                    </Space>
                  )}
                />
              </Table>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}

export default DealerInfoList;
