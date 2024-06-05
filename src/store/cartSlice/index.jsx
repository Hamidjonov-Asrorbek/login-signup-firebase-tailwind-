import { createSlice } from "@reduxjs/toolkit";
import { message } from "antd";
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return { products: [] };
    }
    return { products: JSON.parse(serializedState) };
  } catch (e) {
    console.warn("Could not load state from local storage", e);
    return {
      products: [],
    };
  }
};
const saveStateToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch (e) {
    console.warn("Could not save state to local storage", e);
  }
};
const initialState = loadStateFromLocalStorage();
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.products.find(
        (item) => item.id === action.payload.id
      );
      console.log(existingItem);
      if (existingItem) {
        message.warning("Item already in cart");
        existingItem.count += 1;
      } else {
        state.products.push({ ...action.payload, count: 1 });
        message.success("Item added to cart");
      }
      saveStateToLocalStorage(state.products);
    },

    deleteToCart: (state, action) => {
      // const index = state.products.find((item) => item.id === action.payload);
      const index = state.products.filter((item) => item.id !== action.payload);
      state.products = index;
      message.success("Item deleted from cart");
      saveStateToLocalStorage(state.products);
    },
    increment: (state, action) => {
      const item = state.products.filter((item) => item.id == action.payload);
      console.log(item);
      if (item) {
        item.price += item.price;
      }
      saveStateToLocalStorage(state.products);
    },
    decrement: (state, action) => {
      const item = state.find((item) => item.id == action.payload);
      if (item) {
        item.price -= item.price;
      }
      saveStateToLocalStorage(state);
    },
  },
});

export const { addToCart, deleteToCart, increment, decrement } =
  cartSlice.actions;
export default cartSlice.reducer;
