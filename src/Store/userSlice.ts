import { SetUsersPayload, UserState } from "@/lib/type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
  PLayerId: "",
  PlayerName: "",
  PlayerEmail: "",
  level: 1,
  xp: 200,
  coin: 10,
  xpToNext: 300,
};

const userSlice = createSlice({
  name: "UserInfo",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<SetUsersPayload>) => {
      state.PLayerId = action.payload.Id;
      state.PlayerName = action.payload.name;
      state.PlayerEmail = action.payload.email;
      state.level = action.payload.level;
      state.xp = action.payload.xp;
      state.coin = action.payload.coin;
      state.xpToNext = action.payload.xpToNext;
    },
  },
});

export const { setUsers } = userSlice.actions;
export default userSlice.reducer;
