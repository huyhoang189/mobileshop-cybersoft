import {
  Table,
  Row,
  Typography,
  Button,
  Modal,
  Input,
  Form,
  Select,
  Col,
  Upload,
  Image,
} from "antd";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import manufactureSlice from "../../redux/manufacture/manufactureSlice";
import { UploadOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Option } = Select;

export default function Manufactures() {
  const dispatch = useDispatch();
  const { manufactures, selectedManufacture, modalActive } = useSelector(
    (state) => state.manufacture
  );

  React.useEffect(() => {
    document.title = "Hãng điện thoại - mShop";
    dispatch(manufactureSlice.actions.getManufactures());
  }, [dispatch]);

  const dataSource = [];
  Object.keys(manufactures).map((manufacture, index) => {
    return dataSource.push({
      ...manufactures[manufacture],
      key: manufacture,
    });
  });

  const handleModal = (manufacture = null) => {
    if (manufacture) delete manufacture.key;
    dispatch(manufactureSlice.actions.toggleModal(manufacture));
  };

  const handleRecord = (actionName, manufacture) => {
    dispatch(
      manufactureSlice.actions.handManufacture({
        manufacture: manufacture,
        actionName: actionName,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    let manufacture = Object.assign({}, selectedManufacture);
    if (key) manufacture[key] = event.target.value;
    dispatch(manufactureSlice.actions.updateManufactureInput(manufacture));
  };

  const onChangeUploadFile = (info) => {
    let file = info.file.originFileObj;
    var reader = new FileReader();
    reader.onloadend = function () {
      let manufacture = Object.assign({}, selectedManufacture);
      manufacture["thumbail"] = reader.result;
      dispatch(manufactureSlice.actions.updateManufactureInput(manufacture));
    };
    reader.readAsDataURL(file);
  };

  //init column
  const manufactureColumns = [
    {
      title: "STT",
      dataIndex: "key",
      key: "key",
      width: 50,

      render: (text, row, index) => {
        return index + 1;
      },
    },
    {
      title: "Tên hãng",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ghi chú",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbail",
      key: "thumbail",
      align: "center",
      render: (text, row, index) => {
        return <Image width={100} src={row.thumbail} />;
      },
    },

    {
      title: "Công cụ",
      key: "tool",
      align: "center",

      width: 200,
      render: (text, row, index) => (
        <Row justify="center" gutter={16}>
          <Col span={12}>
            <Button
              value="small"
              type="primary"
              onClick={() => handleModal(row)}
            >
              Cập nhật
            </Button>
          </Col>
          <Col span={12}>
            <Button
              value="small"
              type="danger"
              onClick={() => handleRecord("DELETE", row)}
            >
              Xoá
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <div>
      <Row>
        <Title level={3}>Quản lý hãng điện thoại</Title>
        <Button
          type="primary"
          style={{ marginLeft: "auto" }}
          onClick={() => handleModal(null)}
        >
          Thêm mới
        </Button>
      </Row>
      <Table
        dataSource={dataSource}
        columns={manufactureColumns}
        bordered
        pagination={{
          // defaultPageSize: 1,
          hideOnSinglePage: true,
          total: dataSource.length,
          showTotal: (total, range) => {
            return `Showing ${range[0]}-${range[1]} of ${dataSource.length} Results`;
          },
        }}
      />
      <Modal
        title={selectedManufacture.id ? "Cập nhật hãng" : "Thêm mới hãng"}
        visible={modalActive}
        onOk={
          selectedManufacture.id
            ? () => handleRecord("UPDATE", selectedManufacture)
            : () => handleRecord("ADD", selectedManufacture)
        }
        onCancel={() => handleModal(null)}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item label="Tên hãng">
            <Input
              value={selectedManufacture.name}
              onChange={(e) => onRecordInputChange("name", e)}
            />
          </Form.Item>
          <Form.Item label="Ghi chú">
            <Input
              value={selectedManufacture.description}
              onChange={(e) => onRecordInputChange("description", e)}
            />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <Upload
              name="file"
              accept="image/png, image/jpeg"
              customRequest={({ file, onSuccess }) => {
                setTimeout(() => {
                  onSuccess("ok");
                }, 0);
              }}
              multiple={false}
              onChange={(e) => onChangeUploadFile(e)}
            >
              <Button style={{ width: "100%" }} type="primary">
                Tải lên hình ảnh
              </Button>
            </Upload>
          </Form.Item>
          <Form.Item style={{ justifyContent: "center" }}>
            <Image width={200} src={selectedManufacture.thumbail} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
