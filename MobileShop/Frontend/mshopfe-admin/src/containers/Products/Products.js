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
  Image,
  Upload,
  InputNumber,
} from "antd";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productSlice from "../../redux/product/productSlice";

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

export default function Products() {
  const dispatch = useDispatch();
  const {
    products,
    selectedProduct,
    modalActive,
    manufactures,
    series,
    selectedManufacture,
    selectedSerie,
  } = useSelector((state) => state.product);

  React.useEffect(() => {
    document.title = "Điện thoại - mShop";
    dispatch(productSlice.actions.getManufactures());
    dispatch(productSlice.actions.getProducts());
  }, [dispatch]);

  //generate datasource
  const dataSource = [];
  Object.keys(products).map((product, index) => {
    return dataSource.push({
      ...products[product],
      key: product,
    });
  });

  const handleModal = (product = null) => {
    if (product) {
      delete product.key;
      let manufacture = manufactures.find(
        (e) => e.id == product.serie.manufacture.id
      );
      if (manufacture) {
        dispatch(productSlice.actions.updateSelectedManufacture(manufacture));
      }
    }
    dispatch(productSlice.actions.toggleModal(product));
  };

  const onRecordInputChange = (key, event) => {
    let product = Object.assign({}, selectedProduct);
    if (key) product[key] = event.target.value;
    dispatch(productSlice.actions.updateProductInput(product));
  };

  const onRecordInputNumberChange = (key, value) => {
    let product = Object.assign({}, selectedProduct);
    if (key) product[key] = value;
    dispatch(productSlice.actions.updateProductInput(product));
  };

  const handleRecord = (actionName, product) => {
    dispatch(
      productSlice.actions.handProduct({
        product: product,
        selectedSerie: selectedSerie,
        actionName: actionName,
      })
    );
  };

  const onChangeUploadFile = (info) => {
    let file = info.file.originFileObj;
    var reader = new FileReader();
    reader.onloadend = function () {
      let product = Object.assign({}, selectedProduct);
      product["thumbail"] = reader.result;
      dispatch(productSlice.actions.updateProductInput(product));
    };
    reader.readAsDataURL(file);
  };

  const onRecordSelectChange = (key, value) => {
    if (key === "manufacture") {
      let manufacture = manufactures.find((e) => e.id == value);
      if (manufacture) {
        dispatch(productSlice.actions.updateSelectedManufacture(manufacture));
      }
    } else if (key === "serie") {
      let serie = series.find((e) => e.id == value);
      dispatch(productSlice.actions.updateSelectedSerie(serie));
    }
  };

  //init column
  const productColumns = [
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
      title: "Tên điện thoại",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Nội dung",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      render: (text, row, index) => {
        return new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(row.price);
      },
    },
    {
      title: "Số lượng",
      dataIndex: "count",
      key: "count",
    },
    {
      title: "Hình ảnh",
      dataIndex: "thumbail",
      key: "thumbail ",
      align: "center",
      render: (text, row, index) => {
        return <Image width={100} src={row.thumbail} />;
      },
    },
    {
      title: "Dòng điện thoại",
      dataIndex: "serie",
      key: "serie",
      render: (text, row, index) => {
        return row.serie.name;
      },
    },
    {
      title: "Hãng sản xuất",
      dataIndex: "manufacture",
      key: "manufacture",
      render: (text, row, index) => {
        return row.serie.manufacture.name;
      },
    },
    {
      title: "Công cụ",
      key: "tool",
      width: 200,
      align: "center",
      render: (text, row, index) => (
        <Row
          justify="center"
          style={{
            display: "grid",
            gridAutoFlow: "column",
            gridColumnGap: "10px",
          }}
        >
          <Button type="primary" onClick={() => handleModal(row)}>
            Cập nhật
          </Button>
          <Button type="danger" onClick={() => handleRecord("DELETE", row)}>
            Xoá
          </Button>
        </Row>
      ),
    },
  ];
  return (
    <div>
      <Row>
        <Title level={3}>Quản lý điện thoại</Title>
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
        columns={productColumns}
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
          selectedProduct.id ? "Cập nhật điện thoại" : "Thêm mới điện thoại"
        }
        visible={modalActive}
        onOk={
          selectedProduct.id
            ? () => handleRecord("UPDATE", selectedProduct)
            : () => handleRecord("ADD", selectedProduct)
        }
        onCancel={() => handleModal(null)}
        width={750}
      >
        <Form
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
        >
          <Form.Item label="Tên điện thoại">
            <Input
              value={selectedProduct.name}
              onChange={(e) => onRecordInputChange("name", e)}
            />
          </Form.Item>
          <Form.Item label="Nội dung">
            <TextArea
              value={selectedProduct.description}
              onChange={(e) => onRecordInputChange("description", e)}
              rows={6}
            />
          </Form.Item>
          <Form.Item label="Giá">
            <Input
              value={selectedProduct.price}
              onChange={(e) => onRecordInputChange("price", e)}
            />
          </Form.Item>
          <Form.Item label="Số lượng">
            <InputNumber
              value={selectedProduct.count}
              min={0}
              max={10000}
              onChange={(e) => onRecordInputNumberChange("count", e)}
            />
          </Form.Item>
          <Form.Item label="Hãng điện thoại">
            <Select
              value={
                selectedProduct.serie.manufacture.id == 0
                  ? selectedManufacture.id
                  : selectedProduct.serie.manufacture.id
              }
              onChange={(e) => onRecordSelectChange("manufacture", e)}
            >
              {manufactures.map((manufacture, index) => (
                <Option key={index} value={manufacture.id}>
                  {manufacture.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Dòng điện thoại">
            <Select
              value={
                selectedProduct.serie.id == 0
                  ? selectedSerie.id
                  : selectedProduct.serie.id
              }
              onChange={(e) => onRecordSelectChange("serie", e)}
            >
              {series.map((serie, index) => (
                <Option key={index} value={serie.id}>
                  {serie.name}
                </Option>
              ))}
            </Select>
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
            <Image width={200} src={selectedProduct.thumbail} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
