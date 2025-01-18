import {createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push({
        id: Date.now().toString(), // Unique ID for each task
        ...action.payload,
      });
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter(task => task.id !== action.payload);
    },
  },
});

export const {addTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
