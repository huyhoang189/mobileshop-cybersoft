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
} from "antd";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import serieSlice from "../../redux/serie/serieSlice";
import manufactureSlice from "../../redux/manufacture/manufactureSlice";
const { Title } = Typography;
const { Option } = Select;

export default function Series() {
  const dispatch = useDispatch();
  const { series, selectedSerie, modalActive } = useSelector(
    (state) => state.serie
  );

  const { manufactures } = useSelector((state) => state.manufacture);

  React.useEffect(() => {
    document.title = "Dòng điện thoại";
    dispatch(manufactureSlice.actions.getManufactures());
    dispatch(serieSlice.actions.getSeries());
  }, [dispatch]);

  //generate datasource
  const dataSource = [];
  Object.keys(series).map((serie, index) => {
    return dataSource.push({
      ...series[serie],
      key: serie,
    });
  });

  const handleModal = (serie = null) => {
    if (serie) delete serie.key;
    dispatch(serieSlice.actions.toggleModal(serie));
  };

  const onRecordInputChange = (key, event) => {
    let serie = Object.assign({}, selectedSerie);
    if (key) serie[key] = event.target.value;
    dispatch(serieSlice.actions.updateSerieInput(serie));
  };

  const handleRecord = (actionName, serie) => {
    dispatch(
      serieSlice.actions.handSerie({
        serie: serie,
        actionName: actionName,
      })
    );
  };

  const onRecordSelectChange = (key, value) => {
    let manufacture;
    if (value) manufacture = manufactures.find((e) => e.id == value);
    let serie = Object.assign({}, selectedSerie);
    if (key) serie[key] = manufacture;
    dispatch(serieSlice.actions.updateSerieInput(serie));
  };

  //init column
  const serieColumns = [
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
      title: "Tên dòng sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên viết tắt",
      dataIndex: "sort_name",
      key: "sort_name ",
    },
    {
      title: "Hãng sản xuất",
      dataIndex: "manufacture",
      key: "manufacture",
      render: (text, row, index) => {
        return row.manufacture.name;
      },
    },
    {
      title: "Công cụ",
      key: "tool",
      fixed: "center",
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
        <Title level={3}>Quản lý dòng sản phẩm</Title>
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
        columns={serieColumns}
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
        title={
          selectedSerie.id ? "Cập nhật dòng sản phẩm" : "Thêm mới dòng sản phẩm"
        }
        visible={modalActive}
        onOk={
          selectedSerie.id
            ? () => handleRecord("UPDATE", selectedSerie)
            : () => handleRecord("ADD", selectedSerie)
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
          <Form.Item label="Tên dòng sản phẩm">
            <Input
              value={selectedSerie.name}
              onChange={(e) => onRecordInputChange("name", e)}
            />
          </Form.Item>
          <Form.Item label="Tên viết tắt">
            <Input
              value={selectedSerie.sort_name}
              onChange={(e) => onRecordInputChange("sort_name", e)}
            />
          </Form.Item>
          <Form.Item label="Hãng sản xuất">
            <Select
              value={selectedSerie.manufacture.id}
              onChange={(e) => onRecordSelectChange("manufacture", e)}
            >
              {manufactures.map((manufacture, index) => (
                <Option key={index} value={manufacture.id}>
                  {manufacture.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
