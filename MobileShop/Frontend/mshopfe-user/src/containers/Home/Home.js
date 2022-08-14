import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import homeSlice from "../../redux/home/homeSlice";
import {
  Row,
  Col,
  Input,
  Radio,
  Space,
  Card,
  Image,
  Checkbox,
  Typography,
  Select,
} from "antd";

const style = {
  background: "#fff",
  padding: "8px 0",
};
const { Option } = Select;
const { Title } = Typography;
const { Meta } = Card;
export default function Home() {
  const dispatch = useDispatch();
  const { manufactures, products, searchOptions } = useSelector(
    (state) => state.home
  );
  React.useEffect(() => {
    document.title = "Tìm kiếm - mShop";
    dispatch(homeSlice.actions.getManufactures());
    dispatch(homeSlice.actions.getProducts());
  }, [dispatch]);

  const onChangeCheckBox = (list) => {
    let searchOption = Object.assign({}, searchOptions);
    searchOption.manufactures = list;
    dispatch(homeSlice.actions.updateSearchOptions(searchOption));
  };

  const onChangeSelectSort = (value) => {
    let searchOption = Object.assign({}, searchOptions);
    searchOption.sort = value;
    dispatch(homeSlice.actions.updateSearchOptions(searchOption));
  };

  const onChangeRadioRangePrice = (event) => {
    let searchOption = Object.assign({}, searchOptions);
    searchOption.rangePrice = event.target.value;
    dispatch(homeSlice.actions.updateSearchOptions(searchOption));
  };
  const onChangeSearchInput = (event) => {
    let searchOption = Object.assign({}, searchOptions);
    searchOption.keyword = event.target.value;
    dispatch(homeSlice.actions.updateSearchOptions(searchOption));
  };

  const priceList = [
    { id: 1, value: "Tất cả" },
    { id: 2, value: "Dưới 2 triệu" },
    { id: 3, value: "Từ 2 - 4 triệu" },
    { id: 4, value: "Từ 4 - 7 triệu" },
    { id: 5, value: "Từ 7 - 13 triệu" },
    { id: 6, value: "Từ 13 - 20 triệu" },
    { id: 7, value: "Trên 20 triệu" },
  ];

  return (
    <div>
      <Row
        gutter={16}
        style={{
          margin: "15px 30px",
        }}
      >
        <Col className="gutter-row" span={6}>
          <Row style={{ marginTop: "8px" }}>
            <Input
              placeholder="Tìm kiếm"
              value={searchOptions.keyword}
              onChange={(e) => onChangeSearchInput(e)}
            />
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Card
              title="Khoảng giá"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Radio.Group
                value={searchOptions.rangePrice}
                onChange={(e) => onChangeRadioRangePrice(e)}
              >
                <Space direction="vertical">
                  {priceList.map((price, index) => (
                    <Radio value={price.id} key={index}>
                      {price.value}
                    </Radio>
                  ))}
                </Space>
              </Radio.Group>
            </Card>
          </Row>
          <Row style={{ marginTop: "8px" }}>
            <Card
              title="Hãng điện thoại"
              bordered={false}
              style={{
                width: "100%",
              }}
            >
              <Checkbox.Group
                value={searchOptions.manufactures}
                onChange={(e) => onChangeCheckBox(e)}
              >
                <Space direction="vertical">
                  {manufactures.map((manufacture, index) => (
                    <Checkbox value={manufacture.name} key={index}>
                      {manufacture.name}
                    </Checkbox>
                  ))}
                </Space>
              </Checkbox.Group>
            </Card>
          </Row>
        </Col>
        <Col className="gutter-row" span={18}>
          <Row style={{ marginTop: "8px" }}>
            <Title level={5}>Hiện thị {products.length} sản phẩm</Title>
            <Select
              value={searchOptions.sort}
              style={{ marginLeft: "auto", width: "200px" }}
              onChange={(e) => onChangeSelectSort(e)}
            >
              <Option value={"DESC"}>Giá thấp đến cao</Option>
              <Option value={"ASC"}>Giá cao đến đến</Option>
            </Select>
          </Row>
          <Row gutter={[16, 24]} style={{ marginTop: "8px" }}>
            {products.map((product, index) => (
              <Col className="gutter-row" span={6} key={index}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={
                    <Image
                      alt="example"
                      src={product.thumbail}
                      style={{
                        width: "auto",
                        height: 260,
                        objectFit: "fill",
                      }}
                    />
                  }
                >
                  <Meta
                    title={product.name}
                    description={new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(product.price)}
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
}
