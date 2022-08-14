import { Row, Button, Col, Card, Image, Typography } from "antd";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import bgLanding from "../../assets/bg-landing.jpg";
import bg_1 from "../../assets/1.png";
import bg_2 from "../../assets/2.png";
import bg_3 from "../../assets/3.png";
import bg_4 from "../../assets/4.png";
import bg_5 from "../../assets/5.png";
import bg_6 from "../../assets/6.png";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import homeSlice from "../../redux/home/homeSlice";
import { useNavigate } from "react-router-dom";
const { Meta } = Card;
export default function Landing() {
  const { products } = useSelector((state) => state.home);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    document.title = "Trang chủ - mShop";
    dispatch(homeSlice.actions.getProducts());
  }, [dispatch]);

  return (
    <Row
      style={{
        position: "relative",
        textAlign: "center",
        margin: "10px 10px",
        zIndex: 999,
      }}
    >
      <Carousel autoPlay showThumbs={false}>
        <div>
          <img src={bg_1} />
        </div>
        <div>
          <img src={bg_2} />
        </div>
        <div>
          <img src={bg_3} />
        </div>
        <div>
          <img src={bg_4} />
        </div>
        <div>
          <img src={bg_5} />
        </div>
        <div>
          <img src={bg_6} />
        </div>
      </Carousel>

      <Typography.Title level={4} style={{ margin: "auto", padding: "20px" }}>
        Sản phẩm nổi bật
      </Typography.Title>
      <Row
        gutter={[16, 24]}
        style={{
          marginTop: "8px",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {products.map((product, index) =>
          index < 8 ? (
            <Col className="gutter-row" span={5} key={index}>
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
          ) : (
            ""
          )
        )}
      </Row>
      <Row style={{ width: "100%", margin: "10px 15px" }}>
        <Button
          style={{ margin: "auto" }}
          onClick={() => {
            navigate("search");
          }}
        >
          {" "}
          Xem thêm
        </Button>
      </Row>
    </Row>
  );
}
