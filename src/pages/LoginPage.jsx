import React from "react";
import { Button, Form, Input } from "antd";
import toast from "react-hot-toast"; // Import toast from react-hot-toast
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import bubbleSoap from "../../public/assets/bubble.jpg";
import { setLogin } from "../redux/state";

// Import the setLogin action

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const LoginPage = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    
    // Convert email and password to lowercase
    const lowerCaseEmail = email.toLowerCase();
    const lowerCasePassword = password.toLowerCase();

    try {
      const response = await fetch(
        "https://cleanhomefinal-1.onrender.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: lowerCaseEmail, password: lowerCasePassword }),
        }
      );

      if (!response.ok) {
        if (response.status === 400) {
          // If status code is 401 (Unauthorized), display specific error message
          toast.error("ელ.ფოსტა ან პაროლი არასწორია");
        } else {
          // For other errors, display a generic error message
          toast.error("მომხმარებელი არ არსებობს");
        }
        return;
      }

      const loggedIn = await response.json();

      if (loggedIn) {
        localStorage.setItem("token", loggedIn.token);
        dispatch(
          setLogin({
            user: loggedIn.user,
            email: loggedIn.user.email,
            token: loggedIn.token,
          })
        );
        navigate("/");
        toast.success("You are logged in");
      }
    } catch (err) {
      console.log("Login failed", err.message);
      toast.error("შეცდომა მოხდა");
    }
  };

  return (
    <FormWrapper>
      <Form
        {...formItemLayout}
        form={form}
        name="login"
        onFinish={onFinish}
        style={{
          width: "100%",
          maxWidth: 600,
        }}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="email"
          label="ელ.ფოსტა"
          rules={[
            {
              type: "email",
              message: "ელ.ფოსტა არასწორია!",
            },
            {
              required: true,
              message: "გთხოვთ შეიყვანეთ თქვენი ელ.ფოსტა!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="პაროლი"
          rules={[
            {
              required: true,
              message: "გთხოვთ შეიყვანეთ თქვენი პაროლი!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <div className="wr">
          <Button type="primary" htmlType="submit" className="btn">
            შესვლა
          </Button>
          <Link to="/register">არ გაქვთ ანგარიში? რეგისტრაცია</Link>
        </div>
      </Form>
    </FormWrapper>
  );
};
const FormWrapper = styled.div`
  background-image: url(${bubbleSoap});
  background-size: cover;
  min-height: 100vh;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  .wr {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }
  .btn {
    margin-right: 10px;
  }
`;
export default LoginPage;
