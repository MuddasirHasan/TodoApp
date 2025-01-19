import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {dataServer} from '../services/axiosConfig';

// Async thunk to fetch todos
export const getTodos = createAsyncThunk(
  'data/getTodos',
  async (_, {rejectWithValue}) => {
    try {
      const todos = await dataServer.get('todos');

      return todos;
    } catch (error) {
      console.error('Error fetching todos:', error);
      return rejectWithValue(error.response?.data || 'Something went wrong');
    }
  },
);

// Initial state
const initialState = {
  data: [],
  status: 'idle',
  error: null,
};

// Create slice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getTodos.pending, state => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(getTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(getTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch todos';
      });
  },
});

// Export reducer
export default dataSlice.reducer;
