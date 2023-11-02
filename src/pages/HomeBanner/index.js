import { Button, Input, Spin, Upload, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { getHomeBanner, updateHomeBanner } from "../../helpers/helper";
import config from "../../config";

const HomeBanner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState();
  const [imageUrlBannerLeft, setImageUrlBannerLeft] = useState("");
  const [imageUrlBannerLeftPreview, setImageUrlBannerLeftPreview] = useState();
  const [linkBannerLeft, setLinkBannerLeft] = useState("");
  const [imageUrlBannerRight1Preview, setImageUrlBannerRight1Preview] =
    useState();
  const [imageUrlBannerRight1, setImageUrlBannerRight1] = useState("");
  const [linkBannerRight1, setLinkBannerRight1] = useState("");
  const [imageUrlBannerRight2Preview, setImageUrlBannerRight2Preview] =
    useState();
  const [imageUrlBannerRight2, setImageUrlBannerRight2] = useState("");
  const [linkBannerRight2, setLinkBannerRight2] = useState("");
  const [imageUrlBannerTopCenterPreview, setImageUrlBannerTopCenterPreview] =
    useState();
  const [imageUrlBannerTopCenter, setImageUrlBannerTopCenter] = useState("");
  const [linkBannerTopCenter, setLinkBannerTopCenter] = useState("");
  const [
    imageUrlBannerBottomCenterPreview,
    setImageUrlBannerBottomCenterPreview,
  ] = useState();
  const [imageUrlBannerBottomCenter, setImageUrlBannerBottomCenter] =
    useState("");
  const [linkBannerBottomCenter, setLinkBannerBottomCenter] = useState("");

  const getBanner = async () => {
    try {
      const banner = await getHomeBanner();
      banner.banner?.bannerLeft &&
        setImageUrlBannerLeft(
          `${config.api.CDN_LINK}/${banner.banner?.bannerLeft}`
        );
      banner.banner?.bannerRight1 &&
        setImageUrlBannerRight1(
          `${config.api.CDN_LINK}/${banner.banner?.bannerRight1}`
        );
      banner.banner?.bannerTopCenter &&
        setImageUrlBannerTopCenter(
          `${config.api.CDN_LINK}/${banner.banner?.bannerTopCenter}`
        );
      banner.banner?.bannerBottomCenter &&
        setImageUrlBannerBottomCenter(
          `${config.api.CDN_LINK}/${banner.banner?.bannerBottomCenter}`
        );
      setLinkBannerLeft(banner.banner?.linkBannerLeft);
      setLinkBannerRight1(banner.banner.linkBannerRight1);
      setLinkBannerRight2(banner.banner.linkBannerRight2);
      setLinkBannerTopCenter(banner.banner.linkBannerTopCenter);
      setLinkBannerBottomCenter(banner.banner?.linkBannerBottomCenter);
      console.log(banner);
    } catch (error) {
      console.log(error);
    }
  };

  const updateBanner = async () => {
    try {
      const formData = new FormData();
      formData.append("bannerLeft", imageUrlBannerLeft || "");
      formData.append("bannerRight1", imageUrlBannerRight1 || "");
      formData.append("bannerRight2", imageUrlBannerRight2 || "");
      formData.append("bannerTopCenter", imageUrlBannerTopCenter || "");
      formData.append("bannerBottomCenter", imageUrlBannerBottomCenter || "");
      formData.append("linkBannerLeft", linkBannerLeft || "");
      formData.append("linkBannerRight1", linkBannerRight1 || "");
      formData.append("linkBannerRight2", linkBannerRight2 || "");
      formData.append("linkBannerTopCenter", linkBannerTopCenter || "");
      formData.append("linkBannerBottomCenter", linkBannerBottomCenter || "");

      console.log(imageUrlBannerRight1);
      const update = await updateHomeBanner(formData);
      if (update.status == 1)
        notification["success"]({
          message: "Chỉnh sửa hình ảnh",
          description: "Chỉnh sửa hình ảnh thành công",
        });
      else
        notification["error"]({
          message: "Chỉnh sửa hình ảnh",
          description: "Chỉnh sửa hình ảnh thất bại",
        });
    } catch (error) {
      console.log(error);
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const beforeUpload = (file) => {
    return true;
  };

  const handleChangeBannerLeft = (info) => {
    setImageUrlBannerLeft(info.file.originFileObj);
    getBase64(info.file.originFileObj, (url) => {
      setImageUrlBannerLeftPreview(url);
    });
  };

  const handleChangeBannerRight1 = (info) => {
    setImageUrlBannerRight1(info.file.originFileObj);
    getBase64(info.file.originFileObj, (url) => {
      setImageUrlBannerRight1Preview(url);
    });
  };
  const handleChangeBannerRight2 = (info) => {
    getBase64(info.file.originFileObj, (url) => {
      setImageUrlBannerRight2Preview(url);
    });
  };

  const handleChangeBannerTopCenter = (info) => {
    setImageUrlBannerTopCenter(info.file.originFileObj);
    getBase64(info.file.originFileObj, (url) => {
      setImageUrlBannerTopCenterPreview(url);
    });
  };

  const handleChangeBannerBottomCenter = (info) => {
    setImageUrlBannerBottomCenter(info.file.originFileObj);
    getBase64(info.file, (url) => {
      getBase64(info.file.originFileObj, (url) => {
        setImageUrlBannerBottomCenterPreview(url);
      });
    });
  };

  const uploadButton = (
    <div>
      {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  useEffect(() => {
    getBanner();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <BreadCrumb title="Banner" pageTitle="Quản lý banner" />
          <div style={{ display: "flex", columnGap: "10px", flexWrap: "wrap" }}>
            <div className="banner-left">
              <label>Banner bên trái (220 x 300)</label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChangeBannerLeft}
              >
                {imageUrlBannerLeft || imageUrlBannerLeftPreview ? (
                  <img
                    src={imageUrlBannerLeftPreview || imageUrlBannerLeft}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <Input
                value={linkBannerLeft}
                placeholder="Nhập Link"
                onChange={(e) => setLinkBannerLeft(e.target.value)}
              />
            </div>
            <div className="banner-right-1">
              <label>Banner bên phải (300 x 600)</label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChangeBannerRight1}
              >
                {imageUrlBannerRight1Preview || imageUrlBannerRight1 ? (
                  <img
                    src={imageUrlBannerRight1Preview || imageUrlBannerRight1}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <Input
                value={linkBannerRight1}
                placeholder="Nhập Link"
                onChange={(e) => setLinkBannerRight1(e.target.value)}
              />
            </div>
            <div className="banner-top-center">
              <label>Banner bên trên ở giữa (500 x 70)</label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChangeBannerTopCenter}
              >
                {imageUrlBannerTopCenter ||
                imageUrlBannerBottomCenterPreview ? (
                  <img
                    src={
                      imageUrlBannerBottomCenterPreview ||
                      imageUrlBannerTopCenter
                    }
                    alt="avatar"
                    className="h-70i"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <Input
                value={linkBannerTopCenter}
                placeholder="Nhập Link"
                onChange={(e) => setLinkBannerTopCenter(e.target.value)}
              />
            </div>
            <div className="banner-top-center">
              <label>Banner bên dưới ở giữa (500 x 70)</label>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleChangeBannerBottomCenter}
              >
                {imageUrlBannerBottomCenter ||
                imageUrlBannerBottomCenterPreview ? (
                  <img
                    src={
                      imageUrlBannerBottomCenterPreview ||
                      imageUrlBannerBottomCenter
                    }
                    className="h-70i"
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
              <Input
                value={linkBannerBottomCenter}
                placeholder="Nhập Link"
                onChange={(e) => setLinkBannerBottomCenter(e.target.value)}
              />
            </div>
          </div>
          <Button
            onClick={() => updateBanner()}
            style={{ marginTop: "10px" }}
            type="primary"
          >
            Lưu
          </Button>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default HomeBanner;
