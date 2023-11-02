import React, { useEffect, useState, useRef } from "react";
import TagComp from "./tag";
import {
  Container,
  InputGroup,
  // Row,
  // Col,
  // Input,
  InputGroupText,
  // Form,
  FormGroup,
  Label,
} from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";
import {
  Select,
  notification,
  // Input as InputAntd,
  Button,
  Spin,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Upload,
  Space,
  message,
} from "antd";
import {
  UploadOutlined,
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useHistory, useParams, useLocation } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getAllSchemas,
  getAllTaxonomies,
  createPost,
  getPostById,
  editPost,
  addSchema,
  getAllPosts,
  deleteSchema,
  searchPost,
  getPostXML,
} from "../../helpers/helper";
import { deleteImageBunny, uploadFileToBunny } from "../../helpers/api_bunny";
import { Editor } from "@tinymce/tinymce-react";
import { error, success } from "../../Components/Common/message";
import { URL_IMAGE_BUNNY } from "../../helpers/url_helper";
import toSlug from "./../../common/function";
const { Option } = Select;
const initialData = {
  id: "",
  post_title: "",
  post_taxid: "",
  post_tags: [],
  post_views: 0,
  post_status: "",
  post_userid: "",
  post_image: "",
  post_content: "",
  post_slug: "",
  keyword: [],
  post_description: "",
  // post_schemaid: [],
};

function CreateEditPost() {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  console.log("fileList: ", fileList);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [keyword, setFocusKeyword] = useState([]);
  const [schemaList, setSchemaList] = useState([]);
  const [taxList, setTaxList] = useState([]);
  const [schemas, setSchemas] = useState([]);
  const [posts, setPosts] = useState([]);
  const [formTax, setFormTax] = useState([]);
  const [previewOpen, setPreviewOpen] = useState(false);

  const [formAdd, setFormAdd] = useState(initialData);
  // console.log("formAdd: ", formAdd);
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  // console.log("formAdd: ", formAdd);
  const editorDescriptionRef = useRef(null);
  const editorContentRef = useRef(null);
  const [isModalAddSchemaVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setConfirmModalVisible] = useState(false);
  // const { id } = useParams();
  const location = useLocation();
  const id = location?.state?.id || "";
  const authUser = sessionStorage.getItem("authUser")
    ? JSON.parse(sessionStorage.getItem("authUser"))
    : null;
  const { slug } = useParams();
  const history = useHistory();
  const handleCancel = () => setPreviewVisible(false);
  // const propsUpload = {
  //   onRemove: async (file) => {
  //     const index = fileList.indexOf(file);
  //     const newFileList = fileList.slice();
  //     newFileList.splice(index, 1);
  //     setFileList(newFileList);
  //     const resDelete = await deleteImageBunny(file.name);
  //     if (resDelete.HttpCode === 200) {
  //       message.success("Delete file to Bunny successfully!");
  //       setPreviewImage("");
  //     } else {
  //       message.error("Delete file to Bunny failed!");
  //     }
  //   },
  //   beforeUpload: async (file) => {
  //     setFileList([file]);
  //     const resUpload = await uploadFileToBunny(file);
  //     if (resUpload.HttpCode === 201) {
  //       message.success("Upload file to Bunny successfully!");
  //       setPreviewImage("https://bongdathethao.b-cdn.net/" + file.name);
  //       setPreviewTitle(file.name);
  //       return false;
  //     } else {
  //       message.error("Upload file to Bunny failed!");
  //       deleteImageBunny(file.name);
  //       setPreviewImage("");
  //       setFileList([]);
  //       return false;
  //     }
  //   },
  // };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  // const handleChangFile = (files) => {
  //   console.log(`vao day nha`);
  //   // console.log(files);
  //   setFileList(files);
  // };
  // const handleRemoveFile = ()=>{
  //   console.log(`xoa`);
  //   setFileList("")
  // }
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result);

      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    console.log("file: ", file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setPreviewImage(file.url || file.preview);
    setPreviewVisible(true);
    setPreviewTitle(
      // file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      file.name || "Hình ảnh"

    );
  };
  const [formSchema, setFormSchema] = useState({
    schema_type: "",
    schema_script: "",
    post_id: [],
    page_id: [],
  });
  const handleChangeEditorContent = (value, editor) => {
    const p = document.createElement("p");
    p.innerHTML = value;
    const content = p.innerText;

    // console.log('content: ', content);
    setContent(content);
  };
  const onPressKeyfocus = (e) => {
    console.log(`vao day ne`, e);
    // return
    if (e.key === "Enter" && e.target.value) {
      const checkExits = keyword.findIndex(
        (item) => item.text === e.target.value
      );
      if (checkExits === -1) {
        setFocusKeyword([
          ...keyword,
          { id: new Date().getTime(), text: e.target.value },
        ]);
      }

      // const txtValues = keyword.map((item) => item.text);
      // setFormAdd({
      //   ...formAdd,
      //   keyword: [...txtValues, e.target.value],
      // });
      // e.target.value = "";
      // console.log(formAdd.keyword);
    }
  };
  const onRemoveKeyfocus = (id) => {
    const rates = keyword.filter((item) => item.id !== id);
    setFocusKeyword(rates);
    const txtValues = rates.map((item) => item.text);
    setFormAdd({
      ...formAdd,
      keyword: txtValues,
    });
  };

  // const KeyFocus = res?.keyword?.map((item, i) => ({
  //   id: new Date().getTime() + i,
  //   text: item,
  // }));
  const handleChangeEditorDescription = (value, editor) => {
    const p = document.createElement("p");
    p.innerHTML = value;
    const content = p.innerText;

    // console.log('content: ', content);
    setDescription(content);
  };
  const getSchemas = () => {
    getAllSchemas().then((res) => {
      setSchemas(res);
    });
  };
  const convertHtmlText = (htmlText) => {
    if (htmlText && htmlText.length > 0) {
      let strText =
        new DOMParser().parseFromString(htmlText, "text/html").documentElement
          .textContent || "";
      return strText;
    }
    return "";
  };
  useEffect(() => {
    setIsLoading(true);
    if (!authUser) {
      notification["error"]({
        message: "System error",
        description: "Vui lòng đăng nhập lại",
      });
      setIsLoading(false);
    }
    if (slug) {
      getPostById(slug)
        .then((res) => {
          console.log("res: ", res);
          setFileList([{ url: res.post_image, thumbUrl: res.post_image }]);
          // let image = res.post_image.toString().split("\\");
          // if (res.post_image && image[1] === "fakepath") {
          //   res.post_image = URL_IMAGE_BUNNY + res.post_image.substr(12);
          // }
          setFocusKeyword(res.focus_keyword);
          form.setFieldsValue({
            id: res._id || "",
            post_title: res.post_title,
            post_slug: res.post_slug,
            post_status: res.post_status || null,
            post_taxid: res.post_taxid,
            post_tags: res.post_tags,
            thumb: res.post_image,
            srcthumb: res.post_src_thumb,
            // // category: post.category._id,
            // tags: res.post_tags.map((item) => item._id),
            // // thumb: post.thumb,
            // status: res.post_status,
            // numberOfReader: post.numberOfReader,
          });
          // console.log('res:', res.post_image);
          // form.setFieldsValue({
          //   id: post._id,
          //   title: post.title,
          //   slug: post.slug,
          //   menu: post.menu._id || null,
          //   // category: post.category._id,
          //   tags: post.tags.map((item) => item._id),
          //   thumb: post.thumb,
          //   status: post.status,
          //   numberOfReader: post.numberOfReader,
          // });

          setFormAdd({
            ...res,
            id: res?._id,
            slug: res.post_slug,
            post_title: res.post_title,
            post_image: res.post_image,
            post_taxid: res.post_taxid?.map((i) => i._id),
            post_schemaid: res.post_schemaid?.map((i) => i._id),
          });
          setIsLoading(false);
        })
        .catch((error) => {
          notification["error"]({
            message: "System error",
            description: error,
          });
          setIsLoading(false);
        });
    }
    getPostXML().then((res) => {
      if (res && res.length > 0) {
        setPosts(res);
      }
    });
    getAllSchemas()
      .then((res) => {
        const formatRes = res.map((item) => {
          item.schema_script = convertHtmlText(item.schema_script);
          return item;
        });
        setSchemaList(formatRes);
        setIsLoading(false);
        //return getAllTaxonomies();
      })
      // .then((res) => {
      //   setTaxList(res);
      //   //setIsLoading(false);
      // })
      .catch((error) => {
        setIsLoading(false);
        notification["error"]({
          message: "System error",
          description: error,
        });
      });
    getAllTaxonomies()
      .then((res) => {
        if (res) {
          setTaxList(res);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        notification["error"]({
          message: "System error",
          description: error,
        });
      });
  }, []);

  //xử lý title thay đổi thì gán vào slug
  const handleOnChangeTitle = (e) => {
    form.setFieldsValue({ post_slug: toSlug(e.target.value) });
  };
  //end

  const onSave = (value) => {
    // console.log('value: ', value);
    // return
    // console.log("value: ", value.thumb);
    // console.log(`fileList`, fileList.file.thumbUrl);
    // return
    // console.log('value: ', value);
    setIsLoading(true);
    let des = "";
    let content = "";
    if (editorDescriptionRef.current) {
      des = editorDescriptionRef.current.getContent() || "";
    }
    if (editorContentRef.current) {
      content = editorContentRef.current.getContent() || "";
    }
    // const form = new FormData();

    // form.append("post_image", fileList.file.thumbUrl);
    // form.append("id", value.id);
    // form.append("post_title", value.post_title);
    // form.append("post_slug", value.post_slug);
    // form.append("post_taxid", value.post_taxid);
    // form.append("post_status", value.post_status);
    // form.append("post_tags", value.post_tags);
    // form.append("post_description", des);
    // form.append("post_content", content)
    // form.append("keyword", JSON.stringify(keyword));
    // form.append("post_userid", authUser.id);
    // form.append("post_views", formAdd.post_views);
    // console.log('form: ', form.append());
    const payload = {
      id: value.id || "",
      post_image: fileList[0].thumbUrl,
      post_title: value.post_title,
      post_slug: value.post_slug,
      post_taxid: value.post_taxid,
      post_status: value.post_status,
      post_tags: value.post_tags,
      post_src_thumb: value.srcthumb,
      // post_image: fileList,
      post_description: des,
      post_content: content,
      keyword: keyword,
      post_userid: authUser.id,
      post_views: formAdd.post_views,
    };
    console.log("payload: ", payload);
    // return
    // const payload = new FormData();
    // payload.append("post_content", content);
    // payload.append("id", formAdd._id || formAdd.id);
    // payload.append("post_description", des);
    // payload.append("post_image", formAdd.post_image);
    // payload.append("post_schemaid", formAdd.post_schemaid);
    // payload.append("post_slug", formAdd.post_slug);
    // payload.append("post_status", formAdd.post_status);
    // payload.append("post_tags", formAdd.post_tags);
    // payload.append("post_taxid", formAdd.post_taxid);
    // payload.append("post_title", formAdd.post_title);
    // payload.append("post_views", formAdd.post_views);
    // payload.append("post_userid", authUser.id);
    if (id) {
      console.log(`co id`);

      editPost(payload.id, payload)
        .then((res) => {
          notification["success"]({
            message: "Chỉnh sửa bài viết",
            description: "Chỉnh sửa bài viết thành công!",
          });
          setIsLoading(false);
          history.push("/posts");
        })
        .catch((error) => {
          setIsLoading(false);
          notification["error"]({
            message: "Chỉnh sửa bài viết",
            description: error,
          });
        });
    } else {
      console.log(`ko co id`);
      setIsLoading(true);
      createPost(payload)
        .then((res) => {
          console.log("res: ", res);
          if (res.error) {
            setIsLoading(false);
            throw new Error(res.error);
          }
          setIsLoading(false);
          notification["success"]({
            message: "Notification",
            description: "Create post successfully!",
          });
          history.push("/posts");
        })
        .catch((error) => {
          console.log("error: ", error);
          console.log(`vao day`);

          setIsLoading(false);
          notification["error"]({
            message: "System error",
            description: error,
          });
        });
    }
  };
  const onBack = () => {
    history.goBack();
  };
  const onInputChange = (e) => {
    setFormAdd({
      ...formAdd,
      [e.target.name]: e.target.value,
    });

    let file = e.target.files ? e.target.files[0] : null;
    if (file) {
      uploadFileToBunny(file);
      setFormAdd({
        ...formAdd,
        [e.target.name]: "https://cdn.baovietnam.com/" + file.name,
      });
    }
  };

  const onSchemaInputChange = (e) => {
    setFormSchema({
      ...formSchema,
      [e.target.name]: e.target.value,
    });
  };
  const onChangeStatus = (e) => {
    setFormAdd({
      ...formAdd,
      post_status: e,
    });
  };

  const onDescriptionChange = (value) => {
    setFormAdd({
      ...formAdd,
      post_description: value,
    });
  };

  const onSchemaChange = (value) => {
    // console.log("schema value: ", value);
    setFormAdd({
      ...formAdd,
      post_schemaid: value,
    });
  };
  const onTaxChange = (value) => {
    setFormAdd({
      ...formAdd,
      post_taxid: value,
    });
  };
  const onTagChange = (value) => {
    setFormAdd({
      ...formAdd,
      post_tags: value,
    });
  };
  const onPostChange = (e) => {
    // console.log(e);
    setFormSchema({
      ...formSchema,
      post_id: e,
    });
  };
  const addNewSchema = () => {
    addSchema({ ...formSchema, post_id: formSchema.post_id.join(",") })
      .then((res) => {
        success();
        setIsModalVisible(false);
        getSchemas();
        setFormSchema({
          schema_type: "",
          schema_script: "",
          post_id: [],
        });
      })
      .catch((err) => {
        error();
      });
  };

  const removeSchema = () => {
    // console.log('formSchema.post_schemaid: ', formAdd.post_schemaid);
    if (formAdd.post_schemaid && formAdd.post_schemaid.length) {
      formAdd.post_schemaid.split(",").forEach((id) => {
        deleteSchema(id)
          .then((res) => {
            getSchemas();
            success();
          })
          .catch((er) => {
            error();
          });
      });
      setTimeout(() => {
        setFormAdd({
          ...formAdd,
          post_schemaid: "",
        });
      }, 1000);
      setConfirmModalVisible(false);
    }
  };

  const breadCrumbTitle = id ? "Sửa" : "Thêm mới";
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Spin spinning={isLoading}>
        <div className="page-content" style={{ overflow: "hidden" }}>
          <BreadCrumb
            title={breadCrumbTitle}
            pageTitle="Bài viết"
            slug="posts"
          />
          <div style={{ marginLeft: "10px" }}>
            <Form
              form={form}
              layout="vertical"
              onFinish={onSave}
              onKeyDown={(e) => {
                if (e.key === "Enter") e.preventDefault();
              }}
              // onFinishFailed={onFinishFailed}
              // autoComplete="off"
            >
              <Row gutter={15}>
                <Col md={18}>
                  <Row>
                    <Col hidden={true}>
                      <Form.Item name="id" label="Id">
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col md={24}>
                      <Form.Item
                        label="Title"
                        name="post_title"
                        rules={[
                          {
                            required: true,
                            message: "Tiêu đề không được bỏ trống!",
                          },
                        ]}
                      >
                        <Input onChange={handleOnChangeTitle} />
                      </Form.Item>
                    </Col>
                    <Col md={24}>
                      <Form.Item
                        label="Đường dẫn tĩnh"
                        name="post_slug"
                        rules={[
                          {
                            required: true,
                            message: "Đường dẫn tĩnh không được bỏ trống!",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                    </Col>

                    <Col md={24}>
                      <Form.Item name="post_description">
                        <div className="ant-col ant-form-item-label">
                          <label
                            htmlFor="content"
                            className="ant-form-item-required"
                            title="Post Content"
                          >
                            Mô tả
                          </label>
                        </div>
                        <Editor
                          apiKey={
                            "5s5cq0qxphgwr8wjxmjp4m3hjywrm9czcx1h2dj8pj4tvq3l"
                          }
                          onInit={(evt, editor) =>
                            (editorDescriptionRef.current = editor)
                          }
                          initialValue={formAdd?.post_description || ""}
                          onEditorChange={handleChangeEditorDescription}
                          // value={formVal?.post_description}
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
                                  var id = "blobid1" + new Date().getTime();
                                  var blobCache =
                                    editorDescriptionRef.current.editorUpload
                                      .blobCache;
                                  var base64 = reader.result.split(",")[1];
                                  var blobInfo = blobCache.create(
                                    id,
                                    file,
                                    base64
                                  );
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
                            file_picker_types: "image",
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
                              "image",
                            ],
                            rel_list: [
                              { title: "None", value: "" },
                              { title: "No Follow", value: "nofollow" },
                              {
                                title: "No Follow No Opener No Referrer",
                                value: "nofollow noopener noreferrer",
                              },
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
                      </Form.Item>
                    </Col>

                    <Col md={24}>
                      <div className="ant-col ant-form-item-label">
                        <label
                          htmlFor="content"
                          className="ant-form-item-required"
                          title="Post Content"
                        >
                          Nội dung
                        </label>
                      </div>
                      <Editor
                        apiKey={
                          "5s5cq0qxphgwr8wjxmjp4m3hjywrm9czcx1h2dj8pj4tvq3l"
                        }
                        onInit={(evt, editor) => {
                          editorContentRef.current = editor;
                        }}
                        initialValue={formAdd?.post_content || ""}
                        // initialValue={formAdd?.post_description}
                        // value={formVal?.post_description}
                        onEditorChange={handleChangeEditorContent}
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
                                var id = "blobid1" + new Date().getTime();
                                var blobCache =
                                  editorContentRef.current.editorUpload
                                    .blobCache;
                                var base64 = reader.result.split(",")[1];
                                var blobInfo = blobCache.create(
                                  id,
                                  file,
                                  base64
                                );
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
                          file_picker_types: "image",
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
                            "image",
                          ],
                          rel_list: [
                            { title: "None", value: "" },
                            { title: "No Follow", value: "nofollow" },
                            {
                              title: "No Follow No Opener No Referrer",
                              value: "nofollow noopener noreferrer",
                            },
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
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={24}>
                      <Form.Item label={" "}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          style={{ marginRight: "1rem" }}
                        >
                          Lưu
                        </Button>
                        <Button
                          htmlType="button"
                          // onClick={onReset}
                          onClick={onBack}
                        >
                          Quay lại
                        </Button>
                      </Form.Item>
                    </Col>
                    <Col md={24}>
                      <Form.Item
                        label="Trạng thái"
                        name="post_status"
                        // initialValue={{value:'quaay',label:'quyaaa'}}

                        rules={[
                          {
                            required: true,
                            message: "Trạng thái không được bỏ trống!",
                          },
                        ]}
                      >
                        <Select
                          style={{ width: "100%" }}
                          onChange={onChangeStatus}
                        >
                          <Option value="public">Đăng</Option>
                          <Option value="draft">Nháp</Option>
                          <Option value="pending">Chờ xét duyệt</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={24}>
                      <Form.Item
                        label="Chuyên mục"
                        name="post_taxid"
                        rules={[
                          {
                            required: true,
                            message: "Trạng thái không được bỏ trống!",
                          },
                        ]}
                      >
                        <Select
                          // mode="multiple"
                          style={{ width: "100%" }}
                          placeholder="Please select"
                          onChange={onTaxChange}
                          // defaultValue={"6337d650b9c1bedfe3c99920"}
                          // value={formAdd.post_taxid || []}
                        >
                          {taxList &&
                            taxList?.map((item) => (
                              <Option key={item._id}>{item?.tax_name}</Option>
                            ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col md={24}>
                      <Form.Item
                        label="Tags"
                        name="post_tags"
                        rules={[
                          {
                            required: true,
                            message: "Trạng thái không được bỏ trống!",
                          },
                        ]}
                      >
                        <Select
                          mode="tags"
                          style={{ width: "100%" }}
                          // placeholder="Please select"
                          onChange={onTagChange}
                          // value={formAdd.post_taxid || []}
                        >
                          {/* {taxList &&
              taxList?.map((item) => (
                <Option key={item._id}>{item?.tax_name}</Option>
              ))} */}
                        </Select>
                      </Form.Item>
                    </Col>
                    {/* <Col md={24}>
                      <Form.Item
                        name="thumb"
                        label="Post Thumb"
                        className=""
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "Please select post thumb!",
                        //   },
                        // ]}
                      >
                        <div>
                          <label>
                            <Input
                              id="post_image"
                              name="post_image"
                              placeholder="Image"
                              type="file"
                              defaultValue={formAdd.post_image || ""}
                              onChange={onInputChange}
                            />
                            Thêm hình ảnh
                          </label>
                        </div>
                        {formAdd.post_image && formAdd.post_image !== "" && (
                          <Col lg={2}>
                            <img
                              src={formAdd.post_image}
                              alt={formAdd.post_image}
                              style={{ width: "100%" }}
                            />
                          </Col>
                        )}
                      </Form.Item>
                    </Col> */}

                    <Col sm={24}>
                      <Form.Item
                        name="thumb"
                        label="Post Thumb"
                        className=""
                        rules={[
                          {
                            required: true,
                            message: "Please select post thumb!",
                          },
                        ]}
                      >
                        <Space align="start">
                          <Upload
                            listType="picture-card"
                            // fileList={fileList}
                            fileList={fileList}
                            // onChange={handleChangFile}
                            // onRemove={handleRemoveFile}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            beforeUpload={() => false}
                          >
                            {/* {fileList.length >= 1 ? null : uploadButton} */}
                            {fileList.length >= 1 ? null : (
                              <div>
                                <PlusOutlined />
                                <div
                                  style={{
                                    marginTop: 8,
                                  }}
                                >
                                  Upload
                                </div>
                              </div>
                            )}
                          </Upload>
                          {previewImage && (
                            <>
                              <Modal
                                open={previewVisible}
                                title={previewTitle}
                                footer={null}
                                onCancel={handleCancel}
                              >
                                <img
                                  alt={previewTitle}
                                  style={{ width: "100%" }}
                                  src={previewImage}
                                />
                              </Modal>
                              {/* <Modal
                                // open={previewOpen}
                                title={previewTitle}
                                footer={null}
                                // onCancel={handleCancel}
                              >
                                <img
                                  alt={previewImage}
                                  style={{ width: "100%" }}
                                  src={previewImage}
                                />
                              </Modal> */}
                            </>
                          )}
                        </Space>
                      </Form.Item>
                    </Col>
                    <Col md={24}>
                      <Form.Item label="Src thumb" name="srcthumb">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Form>
            <Col
              md={9}
              style={{
                marginTop: "1rem",
              }}
            >
              <Label className="mb-1" for="dealer_link">
                Focus keyword
              </Label>
              <Input
                style={{
                  marginBottom: "1rem",
                }}
                // size={15}
                id="keyword"
                name="keyword"
                placeholder="Nhập xong nhấp enter"
                type="keyword"
                onKeyPress={onPressKeyfocus}
              />

              {keyword.map((item, i) => (
                <TagComp
                  key={i}
                  content={item}
                  onRemove={onRemoveKeyfocus}
                  id={item.id}
                />
              ))}
            </Col>
          </div>
          {/* <Row>
            <Col style={{ marginLeft: "10px", marginTop: "10px" }}>
              <Button style={{ marginRight: "10px" }} onClick={onBack}>
                {" "}
                Quay lại
              </Button>
              <Button type="primary" onClick={onSave}>
                Lưu
              </Button>
            </Col>
          </Row> */}
        </div>
      </Spin>

      {/* <Modal
        title="Thêm mới schema"
        okText="Save"
        visible={isModalAddSchemaVisible}
        onOk={addNewSchema}
        onCancel={() => setIsModalVisible(false)}
        width="680px"
      >
        <div>
          <Form>
            <Row>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="schema_type">
                    Loại
                  </Label>
                  <Input
                    id="schema_type"
                    name="schema_type"
                    placeholder="Schema type"
                    type="text"
                    value={formSchema.schema_type}
                    onChange={onSchemaInputChange}
                  />
                </FormGroup>
              </Col>
              <Col lg={6}>
                <FormGroup>
                  <Label className="mb-1" for="schema_script">
                    Đoạn mã
                  </Label>
                  <Input
                    id="schema_script"
                    name="schema_script"
                    placeholder="Schema script"
                    type="text"
                    value={formSchema.schema_script}
                    onChange={onSchemaInputChange}
                  />
                </FormGroup>
              </Col>
              <Col lg={12}>
                <FormGroup>
                  <Label className="mb-1" for="post_id">
                    Bài viết
                  </Label>
                  <Select
                    mode="multiple"
                    size="large"
                    name="post_id"
                    id="post_id"
                    value={formSchema.post_id}
                    onChange={onPostChange}
                    placeholder="Posts"
                    style={{ width: "100%" }}
                  >
                    {posts && posts.length > 0 && posts?.map((post) => {
                      return (
                        <Option key={post._id} value={post._id}>{post.post_title}</Option>
                      );
                    })}
                  </Select>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </div>
      </Modal> */}

      <Modal
        title="Confirm to delete"
        open={isConfirmModalVisible}
        onOk={removeSchema}
        onCancel={() => setConfirmModalVisible(false)}
      >
        <p>Are you sure to delete this faq?</p>
      </Modal>
    </>
  );
}

export default CreateEditPost;
