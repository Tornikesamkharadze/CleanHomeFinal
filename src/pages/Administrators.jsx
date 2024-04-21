import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Space, Table, Tag } from "antd";

const Administrators = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3001/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const updateUserRole = async (userId, role) => {
    try {
      await axios.patch(`http://localhost:3001/auth/users/${userId}`, {
        role,
      });
      setUsers(
        users.map((user) => (user._id === userId ? { ...user, role } : user))
      );
    } catch (error) {
      console.error("Error updating user role:", error);
    }
  };

  const columns = [
    {
      title: "სახელი",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "გვარი",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "ტელეფონის ნომერი",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "ელ.ფოსტა",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "ამჟამინდელი სტატუსი",
      dataIndex: "role",
      key: "role",
      render: (role) => (
        <Tag color={role === "USER" ? "green" : "blue"}>{role}</Tag>
      ),
    },
    {
      title: "სტატუსის მინიჭება",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          {record.role === "USER" ? (
            <Button onClick={() => updateUserRole(record._id, "ADMIN")}>
              ადმინის მინიჭება
            </Button>
          ) : (
            <Button onClick={() => updateUserRole(record._id, "USER")}>
              მომხმარებლის სტატუსის დაბრუნება
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const administrators = users.filter((user) => user.role === "ADMIN");

  return (
    <>
      <h1>ადმინისტრატორები</h1>
      <div className="p-4 m-4" style={{ overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={administrators.map((user) => ({
            ...user,
            key: user._id,
          }))}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
    </>
  );
};

export default Administrators;
