import { Button, Form, Input, Spin, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { getInformation, updateInformation } from "../../helpers/helper";
import toast from "react-hot-toast";

const ManageInfomation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [form] = Form.useForm();
  const [refetch, setRefetch] = useState(false);

  const onFinish = async (values) => {
    try {
      const update = await updateInformation(values);

      notification["success"]({ message: "Cập nhật thông tin thành công" });
      setRefetch(!false);
    } catch (error) {
      notification["error"]({
        message:
          error.response.data?.message ||
          error.response.message ||
          "Cập nhật thông tin thành công",
      });
    }
  };

  const onReset = () => {
    form.resetFields();
  };

  const getInfo = async () => {
    try {
      setIsLoading(true);

      const information = await getInformation();
      console.log(information);
      form.setFieldValue("webName", information.information?.webName);
      form.setFieldValue("address", information.information?.address);
      form.setFieldValue("facebook", information.information?.facebook);
      form.setFieldValue("youtube", information.information?.companyName);
      form.setFieldValue("companyName", information.information?.email);
      form.setFieldValue("contact", information.information?.contact);
      form.setFieldValue("information", information.information?.information);
      form.setFieldValue("email", information.information?.email);
      form.setFieldValue("webUrl", information.information?.webUrl);
      form.setFieldValue("zalo", information.information?.zalo);
      form.setFieldValue("telegram", information.information?.telegram);
      form.setFieldValue("linkedin", information.information?.linkedin);
      form.setFieldValue("skype", information.information?.skype);
      form.setFieldValue("twitter", information.information?.twitter);
      form.setFieldValue("tiktok", information.information?.tiktok);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);
  return (
    <React.Fragment>
      <Spin spinning={isLoading} />
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Thông tin" pageTitle="Thông tin" />
          <Form layout="vertical" onFinish={onFinish} form={form}>
            <Form.Item name="webName" label="Tên web:">
              <Input />
            </Form.Item>
            <Form.Item name="address" label="Địa chỉ:">
              <Input />
            </Form.Item>
            <Form.Item name="facebook" label="Facebook:">
              <Input />
            </Form.Item>
            <Form.Item name="youtube" label="Youtube:">
              <Input />
            </Form.Item>
            <Form.Item name="companyName" label="Tên công ty:">
              <Input />
            </Form.Item>
            <Form.Item name="email" label="Email: ">
              <Input />
            </Form.Item>
            <Form.Item name="contact" label="Contact: ">
              <Input />
            </Form.Item>
            <Form.Item name="information" label="Thông tin: ">
              <Input />
            </Form.Item>
            <Form.Item name="webUrl" label="Link website: ">
              <Input />
            </Form.Item>
            <Form.Item name="zalo" label="Zalo: ">
              <Input />
            </Form.Item>
            <Form.Item name="skype" label="Skype: ">
              <Input />
            </Form.Item>
            <Form.Item name="telegram" label="Telegram: ">
              <Input />
            </Form.Item>
            <Form.Item name="tiktok" label="Tiktok: ">
              <Input />
            </Form.Item>
            <Form.Item name="twitter" label="Twitter: ">
              <Input />
            </Form.Item>
            <Form.Item name="linkedin" label="LinkedIn: ">
              <Input />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary">
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default ManageInfomation;
