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
import roleSlice from "../../redux/role/roleSlice";
const { Title } = Typography;

export default function Roles() {
  const dispatch = useDispatch();
  const { roles, selectedRole, modalActive } = useSelector(
    (state) => state.role
  );

  React.useEffect(() => {
    document.title = "Phân quyền";
    dispatch(roleSlice.actions.getRoles());
  }, [dispatch]);

  const dataSource = [];
  Object.keys(roles).map((role, index) => {
    return dataSource.push({
      ...roles[role],
      key: role,
    });
  });

  const handleModal = (role = null) => {
    if (role) delete role.key;
    dispatch(roleSlice.actions.toggleModal(role));
  };

  const handleRecord = (actionName, role) => {
    dispatch(
      roleSlice.actions.handRole({
        role: role,
        actionName: actionName,
      })
    );
  };

  const onRecordInputChange = (key, event) => {
    let role = Object.assign({}, selectedRole);
    if (key) role[key] = event.target.value;
    dispatch(roleSlice.actions.updateRoleInput(role));
  };

  //init column
  const roleColumns = [
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
      title: "Quyền",
      dataIndex: "name",
      key: "name",
      align: "center",
    },
    {
      title: "Công cụ",
      key: "tool",
      align: "center",
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
        <Title level={3}>Quản lý phân quyền</Title>
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
        columns={roleColumns}
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
        title={selectedRole.id ? "Cập nhật quyền" : "Thêm mới quyền"}
        visible={modalActive}
        onOk={
          selectedRole.id
            ? () => handleRecord("UPDATE", selectedRole)
            : () => handleRecord("ADD", selectedRole)
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
          <Form.Item label="Tên quyền">
            <Input
              value={selectedRole.name}
              onChange={(e) => onRecordInputChange("name", e)}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
