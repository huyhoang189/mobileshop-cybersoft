import { Button, Result } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Page404() {
  const navigate = useNavigate();
  useEffect(() => {
    window.document.title = "404 - mShop";
  }, []);

  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" onClick={() => navigate("/", { replace: true })}>
          Back Home
        </Button>
      }
    />
  );
}
