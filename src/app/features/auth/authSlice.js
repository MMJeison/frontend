import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { login } from './authAPI'

const initialState = {
  user: null,
  token: null,
  status: 'idle',
  error: null
}

export const loginAsync = createAsyncThunk(
  'auth/login',
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await login(email, password)
      return response.data
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error.message })
    }
  }
)

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload.user
        state.token = action.payload.token
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.status = 'idle'
        state.error = action.payload.error
      })
  }
})

export const { logout } = authSlice.actions

export default authSlice.reducer
