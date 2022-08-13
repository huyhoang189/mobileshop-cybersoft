import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Image } from "antd";
import Logo from "../../assets/mshop.png";
const { Sider } = Layout;
export default function Sidebar() {
  const items = [
    {
      key: "manufactures",
      icon: <AppstoreOutlined />,
      label: "Hãng điện thoại",
    },
    {
      key: "series",
      icon: <BarChartOutlined />,
      label: "Dòng điện thoại",
    },
    {
      key: "products",
      icon: <CloudOutlined />,
      label: "Điện thoại",
    },
    {
      key: "users",
      icon: <ShopOutlined />,
      label: "Người dùng",
    },
    {
      key: "roles",
      icon: <ShopOutlined />,
      label: "Phân quyền",
    },
  ];

  const navigate = useNavigate();

  const onMenuClick = (event) => {
    const { key } = event;
    console.log(event);
    navigate(event.key);
  };
  return (
    <Sider
      style={{
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
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
      <Menu theme="dark" mode="inline" items={items} onClick={onMenuClick} />
    </Sider>
  );
}
