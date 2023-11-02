<Form onSubmit={onSave}>
<Row>
  <Col lg={9}>
    <Row>
      <Col lg={12}>
        <FormGroup check={true}>
          <Label className="mb-1" for="post_title">
            Tiêu đề000
          </Label>
          <Input
            // id="post_title"
            name="post_title"
            placeholder="Title"
            type="post_title"
            defaultValue={formAdd.post_title || ""}
            onChange={onInputChange}
          />
        </FormGroup>
      </Col>
      <Col lg={12}>
        <FormGroup>
          <Label className="mb-1" for="post_slug">
            Đường dẫn tĩnh
          </Label>
          <Input
            id="post_slug"
            name="post_slug"
            placeholder="Slug"
            type="dealer_name"
            defaultValue={formAdd.post_slug || ""}
            onChange={onInputChange}
          />
        </FormGroup>
      </Col>
      <Col lg={12}>
        <FormGroup check={true}>
          <Label className="mb-1" for="post_description">
            Mô tả
          </Label>
          {/* <ReactQuill
        defaultValue={formVal.post_description}
        onChange={(onDescriptionChange)}
      /> */}
          <Editor
            apiKey={
              "w17lpon88s3owkb87t8wnmyrb7dnvziqf3mrghzfk7ft8cpl"
            }
            onInit={(evt, editor) =>
              (editorDescriptionRef.current = editor)
            }
            initialValue={formAdd?.post_description || ""}
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
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | link image | code",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </FormGroup>
      </Col>
      <Col lg={12}>
        <FormGroup>
          <Label className="mb-1" for="post_content">
            Nội dung
          </Label>
          <Editor
            apiKey={
              "w17lpon88s3owkb87t8wnmyrb7dnvziqf3mrghzfk7ft8cpl"
            }
            onInit={(evt, editor) =>
              (editorContentRef.current = editor)
            }
            initialValue={formAdd?.post_content || ""}
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
                    var id = "blobid" + new Date().getTime();
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
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | link image | code",
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
          {/* <Input
        id="post_content"
        name="post_content"
        placeholder="Content"
        type="textarea"
        defaultValue={formAdd.post_content || ""}
        onChange={onInputChange}
      /> */}
        </FormGroup>
      </Col>
    </Row>
  </Col>
  <Col lg={3}>
    <Row>
      <Col lg={12}>
        <FormGroup>
          <Label
            className="mb-1"
            for="post_status"
            style={{ display: "block" }}
          >
            {/* Trạng thái */} <br />
          </Label>
          <Button
            style={{ marginRight: "10px" }}
            onClick={onBack}
          >
            {" "}
            Quay lại
          </Button>
          <Button type="primary" onClick={onSave}>
            Lưu
          </Button>
        </FormGroup>
      </Col>
      <Col lg={12}>
        <FormGroup>
          <Label className="mb-1" for="post_status">
            Trạng thái
          </Label>
          <Select
            value={formAdd.post_status}
            style={{ width: "100%" }}
            onChange={onChangeStatus}
          >
            <Option value="public">Đăng</Option>
            <Option value="draft">Nháp</Option>
            <Option value="pending">Chờ xét duyệt</Option>
          </Select>
          {/* <Input
        id="post_status"
        name="post_status"
        placeholder="Status"
        type="text"
        defaultValue={formAdd.post_status || ""}
        onChange={onInputChange}
      /> */}
        </FormGroup>
      </Col>
      <Col lg={12}>
        <FormGroup>
          <Label className="mb-1">Chuyên mục:</Label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            onChange={onTaxChange}
            value={formAdd.post_taxid || []}
          >
            {taxList &&
              taxList?.map((item) => (
                <Option key={item._id}>{item?.tax_name}</Option>
              ))}
          </Select>
        </FormGroup>
      </Col>
      <Col lg={12}>
        <FormGroup>
          <Label className="mb-1">Tags:</Label>
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
        </FormGroup>
      </Col>
      <Col lg={12}>
        <FormGroup>
          <Label className="mb-1" for="post_image">
            Hình ảnh
          </Label>
          <div>
            <label className="custom-file-upload">
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
        </FormGroup>
      </Col>
    </Row>
  </Col>
</Row>
</Form>