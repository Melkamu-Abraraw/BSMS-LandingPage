import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  client: { toggleForm: false, formId: undefined, deleteId: null },
};
export const ReducerSlice = createSlice({
  name: "bsms",
  initialState,
  reducers: {
    toggleChangeAction: (state) => {
      state.client.toggleForm = !state.client.toggleForm;
    },
    updateAction: (state, action) => {
      state.client.formId = action.payload;
    },
    deleteAction: (state, action) => {
      state.client.deleteId = action.payload;
    },
    loadProfile: (state, action) => {
      return {
        ...state,
        value: {
          url: action.payload,
        },
      };
    },
  },
});
export const { toggleChangeAction, updateAction, deleteAction, loadProfile } =
  ReducerSlice.actions;

export default ReducerSlice.reducer;