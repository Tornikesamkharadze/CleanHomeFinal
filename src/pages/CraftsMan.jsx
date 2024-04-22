import React, { useState, useEffect } from "react";
import "../styles/Register.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { FaArrowTurnDown } from "react-icons/fa6";
import styled from "styled-components";
import craftsman from "../../public/assets/craftsman.png";
import bubblebg from "../../public/assets/bubble.jpg";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator
//antd
import { DatePicker, TimePicker } from "antd";
import { Select } from "antd";
const format = "HH:mm";
const OPTIONS = [
  "ავეჯის ქიმწმენდა",
  "სანტექნიკის შეკეთება",
  "სარეცხი და ჭურჭლის მანქანის შეკეთება",
];

const GeneralCleaning = () => {
  const userId = useSelector((state) => state.user?._id); // Access the userId from Redux store

  const [orderData, setOrderData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    date: "", // Add date field to the state
    time: "",
    address: "",
    category: "სხვადასხვა",
    services: [],
    orderNo: "",
    status: "მოლოდინის რეჟიმში",
  });

  const [formCompleted, setFormCompleted] = useState(false); // State to track form completion

  useEffect(() => {
    // Check if all fields are completed whenever orderData changes
    const isFormCompleted =
      orderData.firstName !== "" &&
      orderData.lastName !== "" &&
      orderData.phoneNumber !== "" &&
      orderData.date !== "" &&
      orderData.time !== "";

    // Update the state with the result
    setFormCompleted(isFormCompleted);
  }, [orderData]);

  const handleChange = (value, option) => {
    // Update orderData with selected services
    setOrderData({
      ...orderData,
      services: value,
    });
  };

  const handleTimeChange = (time, timeString) => {
    setOrderData({
      ...orderData,
      time: timeString,
    });
  };
  const generateOrderNumber = () => {
    // Generate UUID
    const uuid = uuidv4();

    // Transform UUID to a shorter format
    const shortUuid = uuid
      .replace(/-/g, "") // Remove dashes
      .substring(0, 8); // Take the first 8 characters

    return shortUuid; // Return the short order number
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderNumber = generateOrderNumber();

      // Use the userId obtained from Redux store
      await fetch("https://cleanhomefinal-1.onrender.com/auth/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          orderData: { ...orderData, orderNo: orderNumber, userId: userId },
        }),
      });

      // Clear input fields after submission
      setOrderData({
        firstName: "",
        lastName: "",
        phoneNumber: "",
        date: "",
        time: "",
        address: "",
        services: [],
      });

      // Update form completion state
      setFormCompleted(false);
      toast.success("შეკვეთა წარმატებით დაემატა");
    } catch (err) {
      console.log("Order failed", err.message);
    }
  };

  return (
    <BackgroundWrapper>
      <TitleWrapper>
        <img src={craftsman} alt="craftsman" />
        <p>CLEAN SERVICE</p>
        <h1>ხელოსნის გამოძახება</h1>
      </TitleWrapper>
      <ContentWrapper>
        <form onSubmit={handleSubmit}>
          <FormWrapper>
            <InputLabel>სახელი</InputLabel>
            <StyledInput
              type="text"
              placeholder="სახელი"
              name="firstName"
              value={orderData.firstName}
              onChange={(e) =>
                setOrderData({ ...orderData, firstName: e.target.value })
              }
              required
              disabled={!userId}
            />
          </FormWrapper>
          <FormWrapper>
            <InputLabel>გვარი</InputLabel>
            <StyledInput
              type="text"
              placeholder="გვარი"
              name="lastName"
              value={orderData.lastName}
              onChange={(e) =>
                setOrderData({ ...orderData, lastName: e.target.value })
              }
              required
              disabled={!userId}
            />
          </FormWrapper>
          <FormWrapper>
            <InputLabel>ტელეფონის ნომერი</InputLabel>
            <StyledInput
              type="text"
              placeholder="ტელეფონის ნომერი"
              name="phoneNumber"
              value={orderData.phoneNumber}
              onChange={(e) =>
                setOrderData({ ...orderData, phoneNumber: e.target.value })
              }
              required
              disabled={!userId}
            />
          </FormWrapper>
          <FormWrapper>
            <InputLabel>აირჩიეთ დასუფთავების თარიღი</InputLabel>
            <CustomDatePicker
              format="MM-DD-YYYY"
              onChange={(date, dateString) =>
                setOrderData({ ...orderData, date: dateString })
              }
              disabled={!userId}
            />
          </FormWrapper>
          <FormWrapper>
            <InputLabel>აირჩიეთ დასუფთავების საათი</InputLabel>
            <CustomTimePicker
              format={format}
              onChange={handleTimeChange}
              disabled={!userId}
            />
          </FormWrapper>
          <FormWrapper>
            <InputLabel>აირჩიეთ სერვისი</InputLabel>
            <Select
              mode="multiple"
              placeholder="სერვისის არჩევა"
              value={orderData.services}
              onChange={handleChange}
              style={{ width: "100%" }}
              disabled={!userId}
              options={OPTIONS.map((item) => ({
                value: item,
                label: item,
              }))}
            />
          </FormWrapper>
          <FormWrapper>
            <InputLabel>მიუთითეთ მისამართი</InputLabel>
            <StyledInput
              type="text"
              placeholder="მისამართი"
              name="address"
              value={orderData.address}
              onChange={(e) =>
                setOrderData({ ...orderData, address: e.target.value })
              }
              required
              disabled={!userId}
            />
          </FormWrapper>
          {userId ? (
            <Button
              type="submit"
              disabled={
                !formCompleted ||
                !orderData.address ||
                orderData.services.length === 0
              }
            >
              შეკვეთის დამატება
            </Button>
          ) : (
            <>
              <InfoText>
                შეკვეთის გასაკეთებლად გთხოვთ გაიაროთ რეგისტრაცია
                <FaArrowTurnDown style={{ marginLeft: "10px" }} />
              </InfoText>
              <LinkButton to="/register">დარეგისტრირდი</LinkButton>
            </>
          )}
        </form>
      </ContentWrapper>
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled.div`
  background-image: url(${bubblebg});
  background-size: cover;
  background-position: center;
`;
const SuccessPopup = styled.p`
  position: fixed;
  top: 20px; /* Adjust as needed */
  right: 20px; /* Adjust as needed */
  background-color: white;
  color: green;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  z-index: 9999; /* Ensure it's above other content */
`;
const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;

  p {
    font-size: 20px;
    padding: 20px 0px;
    font-weight: 900;
    color: #24355a;
  }
  h1 {
    color: rgb(69, 142, 240);
    font-size: 32px;
    padding-bottom: 40px;
    font-weight: 900;
  }
  img {
    height: 150px;
    width: 150px;
  }
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  form {
    max-width: 760px;
    width: 100%;
    padding: 0px 30px;
    margin-bottom: 50px;
  }
`;

const FormWrapper = styled.div`
  margin-bottom: 10px;
  label {
    margin-bottom: 5px;
    color: #24355a;
  }
  margin-bottom: 20px;
`;

const InputLabel = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  max-width: 760px;
  max-height: 60px;
  margin-top: 8px;
  padding: 10px;
  border: 2px solid rgb(217, 217, 217); /* Updated border color */
  border-radius: 5px;
  transition: border-color 0.3s ease;
  font-size: 14px;
  &:focus,
  &:hover {
    border-color: rgb(111, 164, 238);
    outline: none;
  }
`;

const CustomDatePicker = styled(DatePicker)`
  && {
    width: 100%;
    max-width: 760px;
    max-height: 60px;
    margin-top: 8px;
    .ant-picker-input > input {
      font-size: 14px;
    }
  }
`;

const CustomTimePicker = styled(TimePicker)`
  && {
    width: 100%;
    max-width: 760px;
    max-height: 60px;
    margin-top: 8px;
    .ant-picker-input > input {
      font-size: 14px;
    }
  }
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
  &:disabled {
    background-color: #007bff;
    opacity: 0.4;
    cursor: not-allowed;
  }
`;

const InfoText = styled.div`
  padding-bottom: 35px;
  color: #007bff;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const LinkButton = styled(Link)`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: rgb(111, 164, 238);
  }
`;

export default GeneralCleaning;
