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
import userSlice from "../../redux/user/userSlice";
const { Title } = Typography;
const { Option } = Select;

export default function Users() {
  const dispatch = useDispatch();
  const { users, selectedUser, modalActive, roles } = useSelector(
    (state) => state.user
  );

  React.useEffect(() => {
    document.title = "Người dùng - mShop";
    dispatch(userSlice.actions.getUsers());
    dispatch(userSlice.actions.getRoles());
  }, [dispatch]);

  const dataSource = [];
  Object.keys(users).map((user, index) => {
    return dataSource.push({
      ...users[user],
      key: user,
    });
  });

  const handleModal = (user = null) => {
    if (user) delete user.key;
    dispatch(userSlice.actions.toggleModal(user));
  };

  const handleRecord = (actionName, user) => {
    dispatch(
      userSlice.actions.handUser({
        user: user,
        actionName: actionName,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    let user = Object.assign({}, selectedUser);
    if (key) user[key] = event.target.value;
    dispatch(userSlice.actions.updateUserInput(user));
  };

  const onRecordSelectChange = (key, value) => {
    let role;
    if (value) role = roles.find((e) => e.id == value);
    let user = Object.assign({}, selectedUser);
    if (key) user[key] = role;
    dispatch(userSlice.actions.updateUserInput(user));
  };

  //init column
  const userColumns = [
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
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tên tài khoản",
      dataIndex: "username",
      key: "username",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone_number",
      key: "phone_number",
    },
    {
      title: "Quyền",
      dataIndex: "role",
      key: "role",
      render: (text, row, index) => {
        return row.role.name;
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
        <Title level={3}>Quản lý người dùng</Title>
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
        columns={userColumns}
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
        title={selectedUser.id ? "Cập nhật người dùng" : "Thêm mới người dùng"}
        visible={modalActive}
        onOk={
          selectedUser.id
            ? () => handleRecord("UPDATE", selectedUser)
            : () => handleRecord("ADD", selectedUser)
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
          <Form.Item label="Tên người dùng">
            <Input
              value={selectedUser.name}
              onChange={(e) => onRecordInputChange("name", e)}
            />
          </Form.Item>
          <Form.Item label="Tên tài khoản">
            <Input
              value={selectedUser.username}
              onChange={(e) => onRecordInputChange("username", e)}
            />
          </Form.Item>
          <Form.Item label="Số điện thoại">
            <Input
              value={selectedUser.phone_number}
              onChange={(e) => onRecordInputChange("phone_number", e)}
            />
          </Form.Item>
          <Form.Item label="Mật khẩu">
            <Input
              value={selectedUser.password}
              onChange={(e) => onRecordInputChange("password", e)}
            />
          </Form.Item>
          <Form.Item label="Quyền">
            <Select
              value={selectedUser.role.id}
              onChange={(e) => onRecordSelectChange("role", e)}
            >
              {roles.map((role, index) => (
                <Option key={index} value={role.id}>
                  {role.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
