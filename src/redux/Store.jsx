import { configureStore } from '@reduxjs/toolkit'
import studentSlice from '../slides/Student'

const Store = configureStore({
    reducer: {
        students: studentSlice
    }
})

export default Store