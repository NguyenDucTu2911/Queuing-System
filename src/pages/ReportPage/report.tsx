import React, { useEffect, useRef, useState } from 'react';
import Navbar from '../../components/container/nav/navbar';
import Header from '../../components/container/Header/Header';
import "./report.scss"
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { RootState } from '../../redux/store';
import { Progressions, fetchProgressions } from '../../redux/Slices/ProgressionSlice';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/container/Input/Input';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import formatDate from '../../components/container/format/formatDate';
import moment from 'moment';

interface ReportProps { }

const Report: React.FC<ReportProps> = (props) => {

    const { Progression } = useAppSelector((state: RootState) => state.Progression)
    const [currentPage, setCurrentPage] = useState(1);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [filteredData, setFilteredData] = useState<Progressions[]>([]);
    const [searchErrorMessage, setSearchErrorMessage] = useState(false)
    //test
    const [searchStartDate, setSearchStartDate] = useState('');
    const [searchEndDate, setSearchEndDate] = useState('');
    //ádasdf
    const tableRef = useRef(null);

    const dispatch = useAppDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(fetchProgressions())
    }, [])

    let data = Progression.concat(Progression).concat(Progression).concat(Progression).concat(Progression)

    // table
    const itemsPerPage = 5;
    // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
    const totalPages =
        filteredData && filteredData.length > 0
            ? Math.ceil(filteredData.length / itemsPerPage)
            : Math.ceil(data.length / itemsPerPage);

    // Lấy dữ liệu của trang hiện tại
    const getCurrentPageData = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;

        if (filteredData && filteredData.length >= endIndex) {
            return filteredData.slice(startIndex, endIndex);
        }

        return data.slice(startIndex, endIndex);
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
   
    useEffect(() => {
        handleSearch();
    }, [searchStartDate, searchEndDate]);

    const handleSearch = () => {
        const filteredData = data.filter((item) => {
            const startDate = moment(item.Time);
            const endDate = moment(item.Time);
            console.log(endDate)
            const searchStart = moment(searchStartDate);
            const searchEnd = moment(searchEndDate);
            console.log(searchEnd)

            return startDate.isSameOrAfter(searchStart, 'day') && endDate.isSameOrBefore(searchEnd, 'day');
        });

        // Do something with the filtered data
        console.log(filteredData);
    };

    return (
        <>
            <div className="reports">
                <Header />
                <Navbar />
                <DownloadTableExcel
                    filename="data"
                    sheet="data"
                    currentTableRef={tableRef.current}
                >
                    <div className="report-save">
                        <i className="fa-solid fa-file-arrow-down" style={{ fontSize: "24px" }}></i>
                        Tải về
                    </div>
                </DownloadTableExcel>

                <div className="report-Time">
                    <label htmlFor="Time" className='report-LB'>Chọn Thời Gian</label>
                    <div className="report-Time_item">
                        <Input type='date' className='report-IP' value={searchStartDate}
                            handleChange={(e) => setSearchStartDate(e.target.value)} />
                        <Input type='date' className='report-IP' value={searchEndDate}
                            handleChange={(e) => setSearchEndDate(e.target.value)} />
                    </div>
                </div>

                <table className="Table" ref={tableRef}>
                    <thead className='Table-title'>
                        <tr >
                            <th>Số Thứ Tự</th>
                            <th >Tên Dịch Vụ</th>
                            <th >Thời Gian Cấp</th>
                            <th >Tình Trạng</th>
                            <th >Ngồn Cấp</th>
                        </tr>
                    </thead>
                    {
                        searchErrorMessage ?
                            <tbody className='table-body'>
                                <tr>
                                    <td colSpan={18} style={{ textAlign: "center", fontSize: "24px" }}>Không có Dữ Liệu
                                        <i className="fa-regular fa-calendar-xmark" style={{ color: "#d12e2e", paddingLeft: "5px" }}></i>
                                    </td>
                                </tr>
                            </tbody>
                            :
                            <tbody className='table-body'>
                                {getCurrentPageData().map((item: any, index: number) => (
                                    <tr key={index}>
                                        <td>{item.STT}</td>
                                        <td>{item.NameDV}</td>
                                        <td>{item.Time}</td>
                                        {item && item.Active === "Đang chờ" ? <td><b className='tickBlue'>.</b>{item.Active}</td>
                                            : item.Active === "Đã sử dụng" ? <td><b className='tickGray'>.</b> {item.Active}</td> :
                                                <td><b className='tickRed'>.</b> {item.Active}</td>
                                        }
                                        <td>{item.power}</td>
                                    </tr>
                                ))}
                            </tbody>
                    }
                </table>
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

export default Report;
