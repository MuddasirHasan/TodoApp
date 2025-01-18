import {createSlice} from '@reduxjs/toolkit';
import uuid from 'react-native-uuid';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: uuid.v4(), // Generate a unique ID for each task
        ...action.payload, // Add task details from action payload
      });
    },
  },
});

export const {addTask} = taskSlice.actions;
export default taskSlice.reducer;
