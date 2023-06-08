import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/container/nav/navbar';
import Header from '../../../components/container/header/Header';
import "./ActivityLog.scss"
import { Input } from '../../../components/container/Input/Input';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { RootState } from '../../../redux/Store';
import { Account, User, ActivityLogs, fetchActivityLog } from '../../../redux/slices/AccountSlice';
import { DatePicker, Space } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
interface ActivityLogProps { }
interface SearchDate {
    firstDay: string;
    endDay: string;
}

const ActivityLog: React.FC<ActivityLogProps> = (props) => {
    const navigate = useNavigate()
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)
    const ActivityLogData = useAppSelector((state: RootState) => state.account.Account)
    const [filteredData, setFilteredData] = useState<ActivityLogs[]>([]);
    const [searchDate, setSearchDate] = useState<Partial<SearchDate>>({});

    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [size, setSize] = useState<SizeType>("large");
    const dispatch = useAppDispatch()


    useEffect(() => {
        dispatch(fetchActivityLog())
    }, [])


    const itemsPerPage = 5;
    // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
    const totalPages =
        filteredData && filteredData.length > 0
            ? Math.ceil(filteredData.length / itemsPerPage)
            : Math.ceil(ActivityLogData.length / itemsPerPage);

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredData && filteredData.length >= endIndex) {
            return filteredData.slice(startIndex, endIndex);
        }

        return ActivityLogData.slice(startIndex, endIndex);
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
            const filteredData = ActivityLogData.filter((item) =>
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
            const filteredData = ActivityLogData.filter((item) =>
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

    const handleInputChangefirstDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        const firstDay = e.target.value;
        setSearchDate((prevSearchDate) => ({
            ...prevSearchDate,
            firstDay: firstDay,
        }));
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const endDay = e.target.value;
        setSearchDate((prevSearchDate) => ({
            ...prevSearchDate,
            endDay: endDay,
        }));

        if (!ActivityLogData || !searchDate.firstDay || !endDay) {
            setFilteredData([]);
            setSearchErrorMessage(false);
            setCurrentPage(1);
            return;
        }

        const startDate = new Date(searchDate.firstDay);
        const endDate = new Date(endDay);

        const filteredData = ActivityLogData.filter((item) => {
            if ('Time' in item) {
                const itemTime = item.Time;
                if (itemTime) {
                    const itemDateParts = itemTime.split(' ')[1].split('-');
                    const itemDate = new Date(
                        parseInt(itemDateParts[2]),
                        parseInt(itemDateParts[1]) - 1,
                        parseInt(itemDateParts[0])
                    );
                    return itemDate > startDate && itemDate < endDate;
                }
            }
            return false;
        });
        console.log(filteredData)
        setFilteredData(filteredData);
        setSearchErrorMessage(filteredData.length === 0);
        setCurrentPage(1);
    };

    return (
        <>
            <div className="ActivityLog">
                <Navbar />
                <Header />
                <div className="ActivityLog-time">
                    <label htmlFor="Time" className='ActivityLog-LB'>Chọn thời gian</label>

                    <Input
                        className='Progression-date-Start '
                        type='date'
                        name='firstDay'
                        value={searchDate.firstDay}
                        // handleChange={handleInputChange}
                        handleChange={handleInputChangefirstDay}
                    />
                    <i className="fa-solid fa-caret-right Progression-next"></i>
                    <Input
                        className='Progression-date-end'
                        type='date'
                        name='endDay'
                        value={searchDate.endDay}
                        handleChange={handleInputChange}
                    />

                </div>
                <div className="ActivityLog-search">
                    <label htmlFor="search" className='ActivityLog-LB'>Từ Khóa</label>
                    <Input id='search' className='ActivityLog-IP' handleChange={handleSearchChange} />
                    <div className="icon-searchProgression" onClick={handleSearchBtn}>
                        <i className="fa-solid fa-magnifying-glass "></i>
                    </div>
                </div>
                <div className="ActivityLog-form">
                    <table className="Table">
                        <thead className='Table-title'>
                            <tr >
                                <th>Tên Đăng Nhập</th>
                                <th >Thời Gian Tác Động</th>
                                <th >IP thực hiện</th>
                                <th >Thao tác thực hiện</th>
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
                                            <td>{item.Name}</td>
                                            <td>{item.Time}</td>
                                            <td>{item.IP}</td>
                                            <td>{item.Active}</td>
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

export default ActivityLog;
