import React from "react";
import Title from "../Title";
import { Card } from "antd";
import { Delete } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { icon } from "./style.module.css";
import { deleteToCart } from "../../store/cartSlice";
import { NavLink } from "react-router-dom";
import { Button } from "@mui/material";
import QuantityInput from "../../components/Quantity";

function Cards() {
  const cards = useSelector((state) => state.cart.products);
  const dispatch = useDispatch();
  return (
    <section>
      <div
        className="container"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <Title text={"Cards"} />
        <div className="cards" style={{ display: "flex", flexWrap: "wrap" }}>
          {cards.length > 0 ? (
            cards.map(({ id, title, price, description = "", thumbnail }) => {
              return (
                <Card
                  hoverable
                  key={id}
                  style={{
                    width: 400,
                    margin: "16px",
                  }}
                  cover={
                    <img alt={title} src={thumbnail} width={400} height={350} />
                  }
                >
                  <Card.Meta
                    style={{
                      height: "150px",
                      fontSize: "15px",
                      borderTop: "2px solid black",
                      paddingTop: "10px",
                    }}
                    title={title}
                    description={
                      description.split(" ").slice(0, 20).join(" ") + "..."
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
                    <QuantityInput id={id.toString()} />
                    <Delete
                      onClick={() => dispatch(deleteToCart(id))}
                      className={icon}
                      fontSize="large"
                    />
                  </div>
                </Card>
              );
            })
          ) : (
            <div>
              <h1
                style={{
                  textAlign: "center",
                  fontSize: "40px",
                  color: "red",
                  marginTop: "50px",
                }}
              >
                Card is empty !
              </h1>
              <Button variant="contained" style={{ marginTop: "50px" }}>
                <NavLink
                  style={{
                    color: "white",
                    textDecoration: "none",
                    fontSize: "25px",
                  }}
                  to={"/"}
                >
                  Choose product
                </NavLink>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Cards;
