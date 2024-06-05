import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Row,
  Col,
  Card,
  message,
} from "antd";
import { wrapper, site_form_item_icon } from "./style.module.css";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { useState } from "react";

const { Title } = Typography;

function SignUp() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });

  const handleSubmit = (values) => {
    createUserWithEmailAndPassword(auth, formData.email, formData.password, {
      displayName: formData.displayName,
    })
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        message.success("Registration successful!");
        navigate("/layout/products");
        localStorage.setItem("user", JSON.stringify(user));
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(`Error [${errorCode}]: ${errorMessage}`);
        switch (errorCode) {
          case "auth/email-already-in-use":
            message.error(
              "This email is already in use. Please try another one."
            );
            break;
          case "auth/invalid-email":
            message.error("The email address is not valid.");
            break;
          case "auth/weak-password":
            message.error("The password is too weak.");
            break;
          default:
            message.error(errorMessage);
        }
      });
    updateProfile(auth.currentUser, {
      displayName: formData.displayName,
    }).catch((error) => {
      console.error(`Error [${error.code}]: ${error.message}`);
    });
  };

  return (
    <div className={wrapper}>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card style={{ width: 300 }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Sign Up
            </Title>
            <Form
              form={form}
              name="signup"
              onFinish={handleSubmit}
              initialValues={{
                remember: true,
              }}
            >
              <Form.Item
                name="displayName"
                rules={[
                  { required: true, message: "Please input your Username!" },
                  { min: 3, message: "Username must be at least 3 characters" },
                  {
                    max: 15,
                    message: "Username must be at most 15 characters",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className={site_form_item_icon} />}
                  placeholder="Username"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your Email!",
                    type: "email",
                  },
                ]}
              >
                <Input
                  prefix={<MailOutlined className={site_form_item_icon} />}
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className={site_form_item_icon} />}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox style={{ lineHeight: "32px", marginBottom: "10px" }}>
                  Remember me
                </Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    backgroundColor: "#1890ff",
                    borderColor: "#1890ff",
                    color: "white",
                  }}
                >
                  Sign Up
                </Button>
              </Form.Item>
              <Form.Item>
                Or <Link to="/login">login now!</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default SignUp;
