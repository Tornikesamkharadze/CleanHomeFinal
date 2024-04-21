import React, { useState, useEffect } from "react";
import { Table, Tag, Button } from "antd";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";

const AdminPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3001/auth/userorders");
      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error.message);
    }
  };

  const updateOrderStatus = async (orderId, currentStatus) => {
    try {
      const newStatus =
        currentStatus === "აქტიური" ? "მოლოდინის რეჟიმში" : "აქტიური"; // Toggle status
      console.log("Updating order status for orderId:", orderId);
      const response = await fetch(
        `http://localhost:3001/auth/userorders/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update order status");
      }

      console.log("Order status updated successfully.");

      const updatedUsers = users.map((user) => {
        const updatedOrders = user.orders.map((order) => {
          if (order.orderNo === orderId) {
            return { ...order, status: newStatus }; // Update status
          }
          return order;
        });
        return { ...user, orders: updatedOrders };
      });
      setUsers(updatedUsers);
    } catch (error) {
      console.error("Error updating order status:", error.message);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:3001/auth/userorders/${orderId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete order");
      }
      console.log("Order deleted successfully.");
      const updatedUsers = users.map((user) => ({
        ...user,
        orders: user.orders.filter((order) => order.orderNo !== orderId),
      }));
      setUsers(updatedUsers);
      message.success("Order deleted successfully");
    } catch (error) {
      console.error("Error deleting order:", error.message);
      message.error("Failed to delete order");
    }
  };
  console.log(users);
  const columns = [
    {
      title: "სახელი",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "გვარი",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "ტელეფონი",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
    },
    {
      title: "შეკვეთის ნომერი",
      dataIndex: "orderNo",
      key: "orderNo",
    },
    {
      title: "შეკვეთის თარიღი",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "დრო",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "ბინის ფართობი",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "დასუფთავების საფასური",
      dataIndex: "price",
      key: "price",

      render: (price) => <span>{price} ლარი</span>,
    },
    {
      title: "მისამართი",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "სერვისი",
      dataIndex: "category",
      key: "category",
    },

    {
      title: "შეკვეთის სტატუსი",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          icon={
            status === "აქტიური" ? (
              <CheckCircleOutlined spin />
            ) : (
              <SyncOutlined spin />
            )
          }
          color={status === "აქტიური" ? "green" : "orange"}
        >
          {status}
        </Tag>
      ),
    },

    {
      title: "შეცვალე შეკვეთის სტატუსი",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            onClick={() => updateOrderStatus(record.orderNo, record.status)}
            type="primary"
          >
            შეცვალე შეკვეთის სტატუსი
          </Button>
        </>
      ),
    },
    {
      title: "შეკვეთის წაშლა",
      key: "action",
      render: (_, record) => (
        <>
          <Button
            className="bg-red-400 text-white"
            onClick={() => deleteOrder(record.orderNo)}
            type="danger"
            style={{ marginLeft: "10px" }}
          >
            წაშლა
          </Button>
        </>
      ),
    },
  ];

  const dataSource = users.flatMap((user) =>
    user.orders.map((order) => ({
      ...order,
      key: order.orderNo,
      category: order.services ? order.services.join(", ") : order.category,
    }))
  );
  console.log(dataSource);
  return (
    <>
      <h1>შეცვალე შეკვეთის სტატუსი</h1>
      <div style={{ padding: "20px", overflowX: "auto" }}>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{ position: ["bottomCenter"] }}
        />
      </div>
    </>
  );
};

export default AdminPage;
