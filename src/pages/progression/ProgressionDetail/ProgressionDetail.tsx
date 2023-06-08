import React, { useEffect } from 'react';
import Header from '../../../components/container/header/Header';
import Navbar from '../../../components/container/nav/navbar';
import "./ProgressionDetail.scss"
import { useNavigate, useParams } from 'react-router-dom';
import useSessionStorage from '../../../components/customHook/useSessionStorage';
import { Progressions } from '../../../redux/slices/ProgressionSlice';
import { useAppSelector } from '../../../redux/Hooks';
import { RootState } from '../../../redux/Store';
interface ProgressionDetailProps { }

const ProgressionDetail: React.FC<ProgressionDetailProps> = (props) => {
  const DetailDataSelector = useAppSelector((state: RootState) => state.Progression.Progression)
  const [DetailData, setDetailData] = useSessionStorage<Partial<Progressions>>("Progression", {})
  const { id } = useParams()
  const navigate = useNavigate();

  useEffect(() => {
    fetchData(id)
  }, [id, DetailDataSelector])

  const fetchData = (id: any) => {
    const DetailData = DetailDataSelector.find((item) => item.id === id)
    if (DetailData) {
      setDetailData(DetailData as Progressions)
    }
    return DetailData;
  }
  return (
    <>
      <div className="ProgressionDetail">
        <Header />
        <Navbar />
        <div className="ProgressionDetail-Title">Quản Lý Cấp Số</div>
        <div className="ProgressionDetail-form">
          <div className="ProgressionDetail-form_title">Thông Tin Cấp Số</div>
          <div className="ProgressionDetail-form_name">
            <label className='ProgressionDetail-form_LB'>Họ Tên:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.Name}</p>
          </div>
          <div className="ProgressionDetail-form_nameDv">
            <label className='ProgressionDetail-form_LB'>Tên Dịch Vụ:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.NameDV}</p>
          </div>
          <div className="ProgressionDetail-form_number">
            <label className='ProgressionDetail-form_LB'>Số Thứ Tự:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.STT}</p>
          </div>
          <div className="ProgressionDetail-form_TimeStart">
            <label className='ProgressionDetail-form_LB'>Thời Gian Cấp:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.Time}</p>
          </div>
          <div className="ProgressionDetail-form_HSD">
            <label className='ProgressionDetail-form_LB'>Hạn Sử Dụng:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.HSD}</p>
          </div>
          <div className="ProgressionDetail-form_power">
            <label className='ProgressionDetail-form_LB'>Nguồn Cấp:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.power}</p>
          </div>
          <div className="ProgressionDetail-form_Active">
            <label className='ProgressionDetail-form_LB'>Trạng Thái:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.Active}</p>
          </div>
          <div className="ProgressionDetail-form_SDT">
            <label className='ProgressionDetail-form_LB'>Số Điện Thoại:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.SDT}</p>
          </div>
          <div className="ProgressionDetail-form_Email">
            <label className='ProgressionDetail-form_LB'>Địa Chỉ Email:</label>
            <p className='ProgressionDetail-form_IP'>{DetailData.email}</p>
          </div>
        </div>
        <div className="ProgressionDetail-btnBack" onClick={() => navigate("/Progression")}>
          <i className="fa-solid fa-arrow-rotate-left"></i>
          Quay Lại
        </div>
      </div>
    </>
  );
};

export default ProgressionDetail;
