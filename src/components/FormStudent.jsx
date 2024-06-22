import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Student } from './Student';
import { addStudent } from '../slides/Student';
import { message } from 'antd';

const defaultValues = {
    id: '',
    name: '',
    phone: '',
    email: ''
};

const FormStudent = () => {
    const dispatch = useDispatch();

    const [formData, setFormData] = useState(defaultValues);
    const [formError, setFormError] = useState(defaultValues);

    const handleChange = (event) => {
        const { name, value, required, pattern } = event.target;
        const newErrors = { ...formError };

        if (!value.trim()) {
            if (required) {
                newErrors[name] = 'Vui Lòng Nhập Thông Tin';
            }
        } else {
            if (pattern) {
                const regex = new RegExp(pattern);
                const isValid = regex.test(value);

                if (!isValid) {
                    if (name === 'email') {
                        newErrors[name] = 'Vui Lòng Nhập Đúng Định Dạng Email (abc@gmail.com)';
                    } else if (name === 'phone') {
                        newErrors[name] = 'Vui Lòng Nhập Đúng Định Dạng Số Điện Thoại (0123456789)';
                    }
                } else {
                    newErrors[name] = '';
                }
            } else {
                newErrors[name] = '';
            }
        }

        setFormData({
            ...formData,
            [name]: value
        });

        setFormError(newErrors);
    };

    const handleAdd = (event) => {
        event.preventDefault();

        const hasError = Object.values(formError).some((item) => !!item);
        
        if (!hasError) {
            const { id, name, phone, email } = formData;
            const newStudent = new Student(id, name, phone, email);

            dispatch(addStudent(newStudent));
            message.success('Thêm Thành Công!');

            setFormData(defaultValues);
            setFormError({});
        }
    };

    return (
        <div>
            <div className='bg-gray-600 py-4 px-4'>
                <h1 className='text-4xl text-white font-bold'>Thông tin sinh viên</h1>
            </div>
            <form className="max-w-md mx-auto my-6" onSubmit={handleAdd}>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="id"
                            id="floating_id"
                            value={formData.id}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            required />
                        {
                            formError.id &&
                            <p className='text-start text-red-600 text-sm mt-2'>{formError.id}</p>
                        }

                        <label
                            htmlFor="floating_id"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Mã Sinh Viên
                        </label>
                    </div>

                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="name"
                            id="floating_name"
                            value={formData.name}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            required />

                        {
                            formError.name &&
                            <p className='text-start text-red-600 text-sm mt-2'>{formError.name}</p>
                        }

                        <label
                            htmlFor="floating_name"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Họ tên
                        </label>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            pattern="[0-9]{10}"
                            name="phone"
                            id="floating_phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            required />

                        {
                            formError.phone &&
                            <p className='text-start text-red-600 text-sm mt-2'>{formError.phone}</p>
                        }

                        <label
                            htmlFor="floating_phone"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Số điện thoại
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            pattern="^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$"
                            name="email"
                            id="floating_email"
                            value={formData.email}
                            onChange={handleChange}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer"
                            placeholder=" "
                            required />

                        {
                            formError.email &&
                            <p className='text-start text-red-600 text-sm mt-2'>{formError.email}</p>
                        }

                        <label
                            htmlFor="floating_email"
                            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Email
                        </label>
                    </div>
                </div>

                <button
                    type="submit"
                    className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                    Thêm sinh viên
                </button>

            </form>
        </div>
    );
};

export default FormStudent;
