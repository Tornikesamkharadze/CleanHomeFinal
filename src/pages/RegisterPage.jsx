import React from "react";
import { Button, Form, Input, Select, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import styled from "styled-components";
import bubbleSoap from "../../public/assets/bubble.jpg";
const { Option } = Select;
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
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    const formData = new FormData();

    // Password length validation
    if (values.password.length < 6) {
      toast.error("პაროლი უნდა შეადგენდეს მინიმუმ 6 სიმბოლოს!");
      return;
    }

    // Append form values to FormData
    for (let key in values) {
      // If the key is profileImage, append the File object
      if (key === "profileImage") {
        formData.append(key, values[key][0].originFileObj, values[key][0].name);
      } else {
        formData.append(key, values[key]);
      }
    }

    try {
      // Send formData to backend
      const response = await fetch("https://cleanhomefinal-1.onrender.com/auth/register", {
        method: "POST",
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        toast.success("რეგისტრაცია Წარმატებულია ");
        navigate("/login");
        form.resetFields();
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      toast.error("Error during registration");
      console.error("Error during registration:", error.message);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="995">+995</Option>
      </Select>
    </Form.Item>
  );

  return (
    <FormWrapper>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{
          prefix: "995",
        }}
        style={{
          width: "100%",
          maxWidth: 600,
        }}
        scrollToFirstError
        layout="vertical"
      >
        <Form.Item
          name="firstName"
          label="სახელი"
          tooltip="შეიყვანეთ თქვენი სახელი"
          rules={[
            {
              required: true,
              message: "გთხოვთ შეიყვანოთ თქვენი სახელი!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="lastName"
          label="გვარი"
          tooltip="შეიყვანეთ თქვენი გვარი"
          rules={[
            {
              required: true,
              message: "გთხოვთ შეიყვანოთ თქვენი გვარი!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="ელ.ფოსტა"
          rules={[
            {
              type: "email",
              message: "შეყვანილი ელ.ფოსტა არასწორია!",
            },
            {
              required: true,
              message: "გთხოვთ შეიყვანოთ თქენი ელ.ფოსტა!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="ტელეფონის ნომერი"
          rules={[
            {
              required: true,
              message: "გთხოვთ შეიყვანოთ თქვენი ტელეფონის ნომერი!",
            },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="password"
          label="პაროლი"
          rules={[
            {
              required: true,
              message: "გთხოვთ შეიყვანოთ პაროლი!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="გაიმეორეთ პაროლი"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "გთხოვთ გაიმეოროთ პაროლი!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("პაროლი არ ემთხვევა!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="profileImage"
          label="პროფილის სურათი"
          valuePropName="fileList"
          getValueFromEvent={(e) => e && e.fileList}
          rules={[
            {
              required: true,
              message: "გთხოვთ ატვირთოთ პროფილის სურათი!",
            },
          ]}
        >
          <Upload
            beforeUpload={() => false}
            maxCount={1}
            accept="image/*"
            listType="picture"
          >
            <Button icon={<UploadOutlined />}>ატვირთვა</Button>
          </Upload>
        </Form.Item>
        <div className="wr">
          <Button type="primary" htmlType="submit" className="btn">
            რეგისტრაცია
          </Button>
          <Link to="/login">გააქვთ ანგარიში? შესვლა</Link>
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
export default RegisterPage;
