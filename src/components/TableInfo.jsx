import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteStudent } from '../slides/Student';
import { Popconfirm } from 'antd';

const TableInfo = () => {

    const dispatch = useDispatch();
    let { list } = useSelector((state) => state.students);

    const [searchValue, setSearchValue] = useState('');

    const handleDelete = (id) => {
        dispatch(deleteStudent(id));
    }

    const handleOnCancel = () => {
        return;
    }

    const handleSearch = (event) => {
        const { value } = event.target;
        setSearchValue(value);
    }

    list = list.filter((student) => student.name.toLowerCase().includes(searchValue.toLowerCase()));

    return (
        <div>
            <div className='bg-gray-600 py-4 px-4 rounded'>
                <h1 className='text-4xl text-white font-bold'>Danh sách sinh viên</h1>
            </div>

            <form className="mx-auto my-5">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Tìm Họ Tên Sinh Viên"
                        required
                        value={searchValue}
                        onChange={handleSearch}
                    />
                </div>
            </form>

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Mã Sinh Viên
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Họ Tên
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Số Điện Thoại
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Thao Tác
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {list.map((item) => {
                            return (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {item.id}
                                    </th>
                                    <td className="px-6 py-4">
                                        {item.name}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.phone}
                                    </td>
                                    <td className="px-6 py-4">
                                        {item.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <Popconfirm
                                            title="Ấn 'Có' để xóa !"
                                            onConfirm={() => { handleDelete(item.id) }}
                                            onCancel={handleOnCancel}
                                            okText="Có"
                                            cancelText="Không"
                                        >
                                            <button
                                                type="button"
                                                className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">
                                                Xóa
                                            </button>
                                        </Popconfirm>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableInfo
