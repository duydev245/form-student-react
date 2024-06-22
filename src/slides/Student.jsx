import { createSlice } from "@reduxjs/toolkit"
import { Student } from "../components/Student";

const initialState = {
    list: [
        new Student(1, 'Nguyễn Văn A', '0938111111', 'nguyenvana@gmail.com'),
        new Student(2, 'Nguyễn Văn B', '0938111111', 'nguyenvanb@gmail.com'),
        new Student(3, 'Nguyễn Văn C', '0938111111', 'nguyenvanc@gmail.com'),
    ]
}

const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
        addStudent: (state, action) => {
            const { payload } = action;
            state.list.push(payload);
        },

        deleteStudent: (state, action) => {
            const { payload } = action;
            state.list = state.list.filter(item => item.id !== payload)
        }
    }
})

export const { addStudent, deleteStudent } = studentSlice.actions;

export default studentSlice.reducer;