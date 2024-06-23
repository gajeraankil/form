import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUser: [],
  currentUser: null,
};

export const authSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      state.allUser.push(payload);
    },
    setCurrentUser: (state, { payload }) => {
      state.currentUser = payload;
    },
    setTodo: (state, { payload }) => {
      const user = state.allUser.find((i) => i?.email === payload?.currentUser);
      if (user) {
        if (!user.todo) {
          user.todo = [];
        }
        if (!state.currentUser.todo) {
          state.currentUser.todo = [];
        }
        user.todo.push(payload?.task);
        state.currentUser.todo.push(payload?.task);
      }
    },
    setEditToDo: (state, { payload }) => {
      const user = state.allUser.find((i) => i?.email === payload?.currentUser);
      if (user && user.todo && user.todo[payload.index] !== undefined) {
        user.todo[payload.index] = payload.editData;

        // Also update currentUser if needed
        if (state.currentUser && state.currentUser.todo) {
          state.currentUser.todo[payload.index] = payload.editData;
        }
      }
    },
    setDeleteToDo: (state, { payload }) => {
      const user = state.allUser.find((i) => i?.email === payload?.currentUser);
      user.todo = user.todo.filter((item) => item !== payload?.item);
      state.currentUser.todo = state.currentUser.todo.filter(
        (item) => item !== payload?.item
      );
    },
  },
});

export const { setUser, setCurrentUser, setTodo, setEditToDo, setDeleteToDo } =
  authSlice.actions;

export default authSlice.reducer;
