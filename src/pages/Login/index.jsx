import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [remember, setRemember] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formLogin.email) {
      newErrors.email = "Please input your Email!";
    } else if (!/\S+@\S+\.\S+/.test(formLogin.email)) {
      newErrors.email = "The input is not valid E-mail!";
    }
    if (!formLogin.password) {
      newErrors.password = "Please input your Password!";
    } else if (
      !/^(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/.test(formLogin.password)
    ) {
      newErrors.password =
        "Password must be at least 8 characters long, include uppercase and lowercase letters, a number, and a special character!";
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      signInWithEmailAndPassword(auth, formLogin.email, formLogin.password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          alert("Login successful");
          navigate("/layout/products");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(`Error [${errorCode}]: ${errorMessage}`);
          switch (errorCode) {
            case "auth/email-already-in-use":
              alert("This email is already in use. Please try another one.");
              break;
            case "auth/invalid-email":
              alert("The email address is not valid.");
              break;
            case "auth/wrong-password":
              alert("The password is incorrect.");
              break;
            case "auth/user-not-found":
              alert("No user found with this email.");
              break;
            default:
              alert(errorMessage);
          }
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-600">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <div className="flex items-center border rounded-md">
              <MailOutlined className="text-gray-400 p-2" />
              <input
                type="email"
                id="email"
                className="w-full p-2 focus:outline-none"
                placeholder="Email"
                value={formLogin.email}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, email: e.target.value })
                }
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <div className="flex items-center border rounded-md">
              <LockOutlined className="text-gray-400 p-2" />
              <input
                type="password"
                id="password"
                className="w-full p-2 focus:outline-none"
                placeholder="Password"
                value={formLogin.password}
                onChange={(e) =>
                  setFormLogin({ ...formLogin, password: e.target.value })
                }
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
              />
              Remember me
            </label>
            <a className="text-blue-600 hover:underline" href="">
              Forgot password
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300"
          >
            Log in
          </button>

          <div className="mt-4 text-center">
            Or{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              register now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
