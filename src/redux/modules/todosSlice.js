import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { waitTwoSeconds } from '../../utils';

export const __addToDo = createAsyncThunk(
  '__addToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()
    console.log('패이로드', payload)
    return payload
  }
);

export const __deleteTodo = createAsyncThunk(
  '__deleteToDo',
  async (payload, thunkAPI) => {
    await waitTwoSeconds()
    return payload
  }
);

const initialState = {
  list: [],
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      state.list = [...state.list, action.payload]
    },
    deleteTodo: (state, action) => {
      const deleteFilter = state.list.filter(item => item.id !== action
        .payload
      )
      state.list = deleteFilter
    },
  },
  extraReducers : (builder) => {
    builder
    .addCase(__addToDo.fulfilled, (state, action)=>{
      state.list = [...state.list, action.payload]
    })
    .addCase(__deleteTodo.fulfilled, (state, action) => {
      const deleteFilter = state.list.filter(item => item.id !== action
        .payload
      )
      state.list = deleteFilter
    })
  }
});


export const { addTodo, deleteTodo } = todosSlice.actions;
export default todosSlice.reducer;
