import { DashboardWrapper } from "./Dashboard.style";
import { Breadcrumb, Layout, Menu, Image } from "antd";
import React from "react";
import Logo from "../../assets/mshop.png";
import Home from "../Home/Home";
const { Header, Content, Footer } = Layout;

export default function Dashboard() {
  return (
    <DashboardWrapper>
      <Layout>
        <Header
          style={{
            position: "fixed",
            zIndex: 1,
            width: "100%",
          }}
        >
          <div className="logo" style={{ alignItems: "center" }}>
            <Image
              src={Logo}
              width={150}
              preview={false}
              style={{ padding: "5px" }}
            />
          </div>
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 64,
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 380,
              margin: "16px 0",
            }}
          >
            <Home></Home>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          mShop ©2022 Created by huyhoang189
        </Footer>
      </Layout>
    </DashboardWrapper>
  );
}
