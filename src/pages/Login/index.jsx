import React, { useState } from "react";
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
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";

const { Title } = Typography;

function Login() {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    console.log(formLogin);
    signInWithEmailAndPassword(auth, formLogin.email, formLogin.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        message.success("Login successful");
        navigate("/layout/products");
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
          case "auth/wrong-password":
            message.error("The password is incorrect.");
            break;
          case "auth/user-not-found":
            message.error("No user found with this email.");
            break;
          default:
            message.error(errorMessage);
        }
      });
  };

  return (
    <div className={wrapper}>
      <Row justify="center" align="middle" style={{ minHeight: "100vh" }}>
        <Col>
          <Card style={{ width: 300 }}>
            <Title level={2} style={{ textAlign: "center" }}>
              Login
            </Title>
            <Form
              form={form}
              name="login"
              initialValues={{ remember: true }}
              onFinish={handleLogin}
            >
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your Email!" },
                  { type: "email", message: "The input is not valid E-mail!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className={site_form_item_icon} />}
                  placeholder="Email"
                  value={formLogin.email}
                  onChange={(e) =>
                    setFormLogin({ ...formLogin, email: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                  {
                    pattern: /^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                    message:
                      "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character!",
                  },
                ]}
                style={{ marginTop: "30px" }}
              >
                <Input.Password
                  prefix={<LockOutlined className={site_form_item_icon} />}
                  placeholder="Password"
                  value={formLogin.password}
                  onChange={(e) =>
                    setFormLogin({ ...formLogin, password: e.target.value })
                  }
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>Remember me</Checkbox>
                </Form.Item>

                <a
                  className="login-form-forgot"
                  href=""
                  style={{ float: "right" }}
                >
                  Forgot password
                </a>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  Log in
                </Button>
              </Form.Item>

              <Form.Item>
                Or <Link to="/register">register now!</Link>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
