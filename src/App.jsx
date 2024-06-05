import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./layout";
import "./App.css";
import Products from "./pages/Products";

import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Cards from "./pages/Cards";

function App() {
  // const routes = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <Layout />,
  //     children: [
  //       {
  //         path: "/products",
  //         element: <Products />,
  //       },
  //       {
  //         index: true,
  //         element: <Products />,
  //       },
  //       {
  //         path: "/cart",
  //         element: <Cards />,
  //       },
  //     ],
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/register",
  //     element: <SignUp />,
  //   },
  // ]);
  // return <RouterProvider router={routes} />;
  function Redirect({ children }) {
    let user = localStorage.getItem("user") ?? false;

    return user ? children : <Navigate to="/" />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<SignUp />}></Route>

        <Route
          path="/layout"
          element={
            <Redirect>
              <Layout />
              {/* <Products />
              <Cards /> */}
            </Redirect>
          }
        >
          <Route path="/layout/products" element={<Products />}></Route>
          <Route path="/layout/cart" element={<Cards />}></Route>
        </Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<SignUp />}></Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
