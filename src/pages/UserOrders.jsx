import React, { useState, useEffect } from "react";
import "../styles/UserOrders.scss";
import axios from "axios";
import { Card } from "antd"; // Import the Card component
import { CiUser } from "react-icons/ci";
import { Divider, Flex, Tag } from "antd";
import styled from "styled-components";
import { CheckCircleOutlined, SyncOutlined } from "@ant-design/icons";

const UserOrders = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token not found");
        }

        // Make a GET request to fetch the user data
        const response = await axios.get("https://cleanhomefinal-1.onrender.com/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the JWT token in the Authorization header
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, []);
  return (
    <>
      <div style={{ marginTop: "50px" }}>
        {user ? (
          <div>
            <Divider>
              <Flex>
                <p style={{ padding: "0px 0px 0px 20px" }}>
                  <strong style={{ display: "flex", alignItems: "center" }}>
                    <CiUser /> {user.firstName} {user.lastName}
                  </strong>
                </p>
              </Flex>
            </Divider>
            <Divider>
              <p style={{ padding: "0px 0px 10px 20px" }}>
                <strong>{user.email}</strong>
              </p>
            </Divider>
            <Divider>
              {user.orders && user.orders.length > 0
                ? "ჩემი შეკვეთები"
                : "თქვენ არ გაქვთ აქტიური შეკვეთა"}
            </Divider>
            <div className="orders-container">
              {user.orders.map((order, index) => (
                <div key={index} className="order-card">
                  <Card
                    title={order.category}
                    bordered={false}
                    style={{ width: "100%", maxWidth: "400px" }}
                  >
                    <StatusContainer>
                      <Tag
                        icon={
                          order.status === "აქტიური" ? (
                            <CheckCircleOutlined spin />
                          ) : (
                            <SyncOutlined spin />
                          )
                        }
                        color={
                          order.status === "აქტიური" ? "success" : "orange"
                        }
                        className="aqtiuri"
                      >
                        {order.status}
                      </Tag>
                    </StatusContainer>
                    <p>
                      <strong>დამკვეთი:</strong> {order.firstName} {""}
                      {order.lastName}
                    </p>
                    <p>
                      <strong>ტელეფონის ნომერი:</strong> {order.phoneNumber}
                    </p>
                    <p>
                      <strong>დასუფთავების თარიღი:</strong> {order.date}
                    </p>
                    <p>
                      <strong>დასუფთავების დრო:</strong> {order.time}
                    </p>
                    {order.quantity && (
                      <p>
                        <strong>ბინის ფართობი:</strong> {order.quantity}
                      </p>
                    )}
                    {order.price && (
                      <p>
                        <strong> დასუფთავების საფასური:</strong> {order.price}{" "}
                        ლარი
                      </p>
                    )}
                    <p>
                      <strong> შეკვეთის ნომერი: </strong>
                      <span style={{ color: "rgb(241, 79, 29)" }}>
                        {order.orderNo}
                      </span>
                    </p>
                    {order.services &&
                      order.services.map((service, index) => (
                        <p key={index}>
                          <strong className="list">სერივსი:</strong>
                          {service}
                        </p>
                      ))}
                    <p>
                      <strong>მისამართი: </strong>
                      {order.address}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
};

const StatusContainer = styled.div`
  margin-bottom: 25px; /* Adjust margin as needed */
  display: flex;
  align-items: center;
`;

export default UserOrders;
