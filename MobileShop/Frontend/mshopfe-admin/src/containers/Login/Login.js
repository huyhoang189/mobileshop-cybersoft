import { useEffect, useState } from "react";
import { useNavigate, useHistory } from "react-router-dom";
import { Button, Form, Input, Row, Col, Typography, Image } from "antd";
import BgSignin from "../../assets/bg-signin.jpg";
import Logo from "../../assets/mshop.png";
import { useDispatch, useSelector } from "react-redux";
import authSlice from "../../redux/auth/authSlice";
export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.idToken);
  const onFinish = (values) => {
    dispatch(authSlice.actions.login(values));
  };

  useEffect(() => {
    window.document.title = "Đăng nhập - mShop";
  }, []);

  const onFinishFailed = (errorInfo) => {};

  const [windowSize, setWindowSize] = useState(getWindowSize());

  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // console.log(windowSize);

  return (
    <Row
      type="flex"
      style={{
        alignItems: "center",
        justifyContent: "center",
        height: windowSize.innerHeight,
        width: windowSize.innerWidth,
        backgroundImage: `url(${BgSignin})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Col span={24}>
        <div
          style={{
            width: 500,
            position: "relative",
            margin: "auto",
            backgroundColor: "#fff",
            borderColor: "#000",
            padding: "15px 30px",
            borderRadius: "25px",
          }}
        >
          <Form
            name="basic"
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item>
              <Typography.Title level={5} style={{ textAlign: "center" }}>
                <Image width={200} src={Logo} preview={false} />
              </Typography.Title>
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
              name="username"
            >
              <Input placeholder="username" />
            </Form.Item>

            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              name="password"
            >
              <Input.Password placeholder="password" />
            </Form.Item>
            <Form.Item>
              <Typography.Title level={5} style={{ textAlign: "center" }}>
                <Button
                  style={{
                    alignItems: "center",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Đăng nhập
                </Button>
              </Typography.Title>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
}

function getWindowSize() {
  const { innerWidth, innerHeight } = window;
  return { innerWidth, innerHeight };
}
