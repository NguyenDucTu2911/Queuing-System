import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/container/nav/navbar';
import Header from '../../../components/container/header/Header';
import "./Rolemanagement.scss"
import { Input } from '../../../components/container/Input/Input';
import { useNavigate } from 'react-router-dom';
import { Account, fetchRole, User } from '../../../redux/slices/AccountSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { RootState } from '../../../redux/Store';
interface RolemanagementProps { }

const RoleManagement: React.FC<RolemanagementProps> = (props) => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const Role = useAppSelector((state: RootState) => state.account.Account)
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredData, setFilteredData] = useState<(Account | User)[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchErrorMessage, setSearchErrorMessage] = useState(false)

  useEffect(() => {
    dispatch(fetchRole())
  }, [])

  const itemsPerPage = 5;
  // Tính số lượng trang dựa trên dữ liệu và số lượng dòng mỗi trang
  const totalPages =
    filteredData && filteredData.length > 0
      ? Math.ceil(filteredData.length / itemsPerPage)
      : Math.ceil(Role.length / itemsPerPage);

  // Lấy dữ liệu của trang hiện tại
  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    if (filteredData && filteredData.length >= endIndex) {
      return filteredData.slice(startIndex, endIndex);
    }

    return Role.slice(startIndex, endIndex);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setSearchKeyword(keyword);
    if (keyword.length > 0) {
      const filteredData = Role.filter((item) =>
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
      const filteredData = Role.filter((item) =>
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
      <div className="RoleManagement">
        <Navbar />
        <Header />
        <div className="RoleManagement-title">Danh sách vai trò</div>
        <div className="RoleManagement-search">
          <label className='RoleManagement-LB' htmlFor='search'>Từ khoá</label>
          <Input className='RoleManagement-IP' id='search' placeholder='Nhập Từ Khóa'
            handleChange={handleSearchChange}
          />
          <div className="btn-search" onClick={handleSearchBtn}>
            <i className="fa-solid fa-magnifying-glass iconSearch" style={{ color: "#FF7506" }}></i>
          </div>
          {/* <i className="fa-solid fa-magnifying-glass iconSearch"></i> */}
        </div>
        <div className="RoleManagement-add" onClick={() => navigate("/RoleManagementAdd")}>
          <i className="fa-solid fa-plus icon-add iconPlus"></i>
          Thêm Vai Trò
        </div>

        <table className="Table">
          <thead className='Table-title'>
            <tr >
              <th>Tên Vai Trò</th>
              <th >Số Người Dùng</th>
              <th >Mô Tả</th>
              <th ></th>
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
                    <td>{item.Name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description}</td>
                    <td><a onClick={() => navigate(`/RoleManagement/RoleManagementUpdate/${item.id}`)}>Cập Nhật</a></td>
                  </tr>
                ))}
              </tbody>
          }
        </table>
      </div>
    </>
  );
};

export default RoleManagement;
