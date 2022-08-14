import { DashboardWrapper } from "./Dashboard.style";
import { Breadcrumb, Layout, Menu, Image } from "antd";
import React from "react";
import Logo from "../../assets/mshop.png";
import { Outlet, useNavigate } from "react-router-dom";
const { Header, Content, Footer } = Layout;
export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <DashboardWrapper>
      <Layout>
        <Header
          style={{
            position: "",
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
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </Header>
        <Content className="site-layout">
          <div
            style={{
              minHeight: 380,
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#001529",
            color: "#fff",
          }}
        >
          mShop ©2022 Created by huyhoang189
        </Footer>
      </Layout>
    </DashboardWrapper>
  );
}
