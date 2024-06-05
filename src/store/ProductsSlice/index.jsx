import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  data: [],
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      console.log(action.payload);
      state.data.push(...action.payload);
    },
  },
});

export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;
