import React, { useEffect, useState } from "react";
import Title from "../Title";
import { Card } from "antd";
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { icon } from "./style.module.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setProducts } from "../../store/ProductsSlice";
import { addToCart } from "../../store/cartSlice";
import loadergif from "/src/assets/loader.gif";

const { Meta } = Card;

function Products() {
  const [loader, setLoader] = useState(false);
  const products = useSelector((state) => state.products.data);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch([]);
  useEffect(() => {
    setLoader(true);
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        console.log(data.products);
        dispatch(setProducts(data.products));
        setLoader(false);
      });
  }, []);
  return (
    <>
      <section>
        <div
          className="container"
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Title text={"Products"} />
          {loader && <img src={loadergif} className="loader"></img>}
          <div
            className="products"
            style={{ display: "flex", flexWrap: "wrap" }}
          >
            {products.length > 0 &&
              products.map(
                ({ id, title, price, description, thumbnail }, ind) => {
                  return (
                    <Card
                      hoverable
                      key={ind}
                      style={{
                        width: 300,
                        margin: "16px",
                      }}
                      cover={
                        <img
                          alt={title}
                          src={thumbnail}
                          width={300}
                          height={250}
                        />
                      }
                    >
                      <Meta
                        style={{
                          height: "150px",
                          fontSize: "15px",
                          borderTop: "2px solid black",
                          paddingTop: "10px",
                        }}
                        title={title}
                        description={
                          description.split(" ").slice(0, 15).join(" ") + "..."
                        }
                      />
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: "auto",
                        }}
                      >
                        <h3 style={{ fontSize: "20px" }}>{price}$</h3>
                        <AddShoppingCartOutlined
                          onClick={() =>
                            dispatch(
                              addToCart({
                                id,
                                title,
                                price,
                                description,
                                thumbnail,
                              })
                            )
                          }
                          className={icon}
                          fontSize="large"
                        />
                      </div>
                    </Card>
                  );
                }
              )}
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
