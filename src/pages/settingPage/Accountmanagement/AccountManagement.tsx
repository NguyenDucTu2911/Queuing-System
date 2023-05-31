import React, { useEffect, useState } from 'react';
import "./AccountManagement.scss"
import { Input } from '../../../components/container/Input/Input';
import Navbar from '../../../components/container/nav/navbar';
import Header from '../../../components/container/Header/Header';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { Account, User, fetchUsers } from '../../../redux/Slices/accountSlice';

interface AccountmanagementProps { }

const AccountManagement: React.FC<AccountmanagementProps> = (props) => {
    const navigate = useNavigate()
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)
    const User = useAppSelector((state: RootState) => state.account.Account)
    const [filteredData, setFilteredData] = useState<(Account | User)[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');

    const dispatch = useAppDispatch()

    useEffect(() => {
        dispatch(fetchUsers())
    }, [])

    const itemsPerPage = 5;
    // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
    const totalPages =
        filteredData && filteredData.length > 0
            ? Math.ceil(filteredData.length / itemsPerPage)
            : Math.ceil(User.length / itemsPerPage);

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredData && filteredData.length >= endIndex) {
            return filteredData.slice(startIndex, endIndex);
        }

        return User.slice(startIndex, endIndex);
    };

    // Xử lý sự kiện khi nhấn nút chuyển trang
    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Xử lý sự kiện khi nhấn nút quay lại
    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prevPage) => prevPage - 1);
        }
    };

    // Xử lý sự kiện khi nhấn nút tiếp theo
    const handleNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prevPage) => prevPage + 1);
        }
    };

    const generatePageNumbers = () => {
        const pageNumbers = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            if (currentPage <= 3) {
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i);
                }
            } else if (currentPage >= totalPages - 2) {
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i);
                }
            } else {
                for (let i = currentPage - 2; i <= currentPage + 2; i++) {
                    pageNumbers.push(i);
                }
            }
        }

        return pageNumbers;
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyword = event.target.value;
        setSearchKeyword(keyword);
        if (keyword.length > 0) {
            const filteredData = User.filter((item) =>
                item && item.Name && item.Name.toLowerCase().includes(keyword.toLowerCase())
            );
            setFilteredData(filteredData);
            setCurrentPage(1);
        } else {
            setSearchKeyword('');
            setSearchErrorMessage(false)
            setFilteredData([])
            setCurrentPage(1);
        }
    }

    const handleSearchBtn = () => {
        if (searchKeyword.length > 0) {
            const filteredData = User.filter((item) =>
                item && item.Name && item.Name.toLowerCase().includes(searchKeyword.toLowerCase())
            );
            if (filteredData.length === 0) {
                setSearchErrorMessage(true)
            } else {
                setSearchErrorMessage(false)
                setFilteredData(filteredData);
                setCurrentPage(1);
            }
        } else {
            setSearchKeyword('');
            setFilteredData([])
            setCurrentPage(1);
        }
    }


    return (
        <>
            <div className="AccountManagement">
                <Navbar />
                <Header />
                <div className="AccountManagement-title">Danh Sách Tài Khoản</div>
                <div className="AccountManagement-Role">
                    <label htmlFor="">Tên Vai Trò</label>
                </div>
                <div className="AccountManagement-search">
                    <label htmlFor="search" className='RoleManagement-LB'>Từ Khóa</label>
                    <Input id='search' className='RoleManagement-IP' handleChange={handleSearchChange} />
                    <div className="icon-searchAccountManagement" onClick={handleSearchBtn}>
                        <i className="fa-solid fa-magnifying-glass "></i>
                    </div>
                </div>
                <div className="AccountManagement-btn" onClick={() => navigate("/AccountManagementAdd")}>
                    <i className="fa-solid fa-plus icon-add iconPlus"></i>
                    Thêm Tài Khoản
                </div>
                <div className="AccountManagement-form">
                    <table className="Table">
                        <thead className='Table-title'>
                            <tr >
                                <th>Tên Đăng Nhập</th>
                                <th >Họ Tên</th>
                                <th >Số Điện Thoại</th>
                                <th >Email</th>
                                <th >Vai Trò</th>
                                <th >Trạng Thái Hoạt Động</th>
                                <th ></th>
                            </tr>
                        </thead>
                        {
                            searchErrorMessage ?
                                <tbody>
                                    <tr>
                                        <td colSpan={18} style={{ textAlign: "center", fontSize: "24px" }}>Không có Dữ Liệu
                                            <i className="fa-regular fa-calendar-xmark" style={{ color: "#d12e2e", paddingLeft: "5px" }}></i>
                                        </td>
                                    </tr>
                                </tbody>
                                :
                                <tbody>
                                    {getCurrentPageData().map((item: any, index: number) => (
                                        <tr key={index}>
                                            <td>{item.UserName}</td>
                                            <td>{item.Name}</td>
                                            <td>{item.SDT}</td>
                                            <td>{item.email}</td>
                                            <td>{item.Role}</td>
                                            {item && item.Action === "Hoạt Động" ? <td><b className='tickGreen'>.</b>{item.Action}</td>
                                                : <td><b className='tickRed'>.</b> {item.Action}</td>}
                                            <td><a onClick={() => navigate(`/AccountManagement/AccountManagementUpdate/${item.id}`)} >Cập Nhật</a></td>
                                        </tr>
                                    ))}
                                </tbody>
                        }

                    </table>
                </div>
                <div className="nextPage-device">
                    <button className='btn-device-back' onClick={handlePrevPage} disabled={currentPage === 1}>
                        <i className="fa-solid fa-caret-left"></i>
                    </button>
                    <div>
                        {generatePageNumbers().map((pageNumber, index) => (
                            <button
                                key={index}
                                onClick={() => handlePageChange(pageNumber)}
                                className={currentPage === pageNumber ? "active" : "btn-device"}
                                disabled={currentPage === pageNumber}
                            >
                                {pageNumber}
                            </button>
                        ))}
                    </div>
                    <button onClick={handleNextPage} disabled={currentPage === totalPages}
                        className='btn-device-next'>
                        <i className="fa-solid fa-caret-right"></i>
                    </button>
                </div>
            </div>
        </>
    );
};

export default AccountManagement;
