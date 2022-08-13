import { DashboardWrapper } from "./Dashboard.style";
import { Layout, Button, Row } from "antd";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authSlice from "../../redux/auth/authSlice";
const { Header, Content, Footer } = Layout;
export default function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <DashboardWrapper>
      <Layout hasSider>
        <Sidebar />
        <Layout
          className="site-layout"
          style={{
            marginLeft: 200,
          }}
        >
          <Header
            className="site-layout-background"
            style={{ padding: "15px" }}
          >
            <Row>
              <Button
                danger
                style={{ marginLeft: "auto" }}
                onClick={() => {
                  dispatch(authSlice.actions.logout());
                  navigate("login", { replace: true });
                }}
              >
                Đăng xuất
              </Button>
            </Row>
          </Header>
          <Content
            style={{
              margin: "24px 16px 0",
              overflow: "initial",
            }}
          >
            <div
              className="site-layout-background"
              style={{
                padding: 24,
                textAlign: "center",
              }}
            >
              <Outlet />
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
      </Layout>
    </DashboardWrapper>
  );
}
