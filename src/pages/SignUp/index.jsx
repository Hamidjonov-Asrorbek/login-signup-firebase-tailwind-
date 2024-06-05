import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import { Link } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.displayName) {
      newErrors.displayName = "Please input your Username!";
    } else if (formData.displayName.length < 3) {
      newErrors.displayName = "Username must be at least 3 characters";
    } else if (formData.displayName.length > 15) {
      newErrors.displayName = "Username must be at most 15 characters";
    }

    if (!formData.email) {
      newErrors.email = "Please input your Email!";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "The input is not valid E-mail!";
    }

    if (!formData.password) {
      newErrors.password = "Please input your Password!";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      createUserWithEmailAndPassword(auth, formData.email, formData.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: formData.displayName,
          }).then(() => {
            console.log(user);
            alert("Registration successful!");
            navigate("/layout/products");
            localStorage.setItem("user", JSON.stringify(user));
          });
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
            case "auth/weak-password":
              alert("The password is too weak.");
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
        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="displayName" className="block text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="displayName"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Username"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
            />
            {errors.displayName && (
              <p className="text-red-500 text-xs mt-1">{errors.displayName}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full p-2 border rounded focus:outline-none"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div className="flex items-center mb-4">
            <input type="checkbox" className="mr-2" id="remember" />
            <label htmlFor="remember" className="text-gray-700">
              Remember me
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
          >
            Sign Up
          </button>

          <div className="mt-4 text-center">
            Or{" "}
            <Link to="/login" className="text-blue-600 hover:underline">
              login now!
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
