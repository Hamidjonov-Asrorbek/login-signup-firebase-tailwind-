import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import productsSlice from "./ProductsSlice";
import cartSlice from "./cartSlice";
const store = configureStore({
  reducer: {
    products: productsSlice,
    cart: cartSlice,
  },
});

export default store;

export const StoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
