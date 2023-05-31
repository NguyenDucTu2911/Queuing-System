import React, { useEffect, useState } from 'react';
import Header from '../../../components/container/Header/Header';
import Navbar from '../../../components/container/nav/navbar';
import "./ProgressionAdd.scss"
import { Button } from '../../../components/container/Button/Button';
import { useNavigate } from 'react-router-dom';
import formatDate, { formatDateMon } from '../../../components/container/format/formatDate';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import ProgressionModal from '../../../components/container/modal/ProgressionModal';
import useSessionStorage from '../../../components/customHook/useSessionStorage';
import { addProgressions, Progressions } from '../../../redux/Slices/ProgressionSlice';
import useLocalStorage from '../../../components/customHook/useLocalStorage';
interface ProgressionAddProps { }

const ProgressionAdd: React.FC<ProgressionAddProps> = (props) => {
  const [Progression, setProgression] = useLocalStorage<Partial<Progressions>>("newStt", {})
  const [isOpen, setisOpen] = useState(false);


  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  // useEffect(() => {
  //   fetchSTT()
  // }, [stt])

  // const fetchSTT = () => {
  //   const sttValues = stt.map((item) => item.STT);
  //   const largestNumber = Math.max(...sttValues.map(Number));
  //   const STTS = (largestNumber + 1)
  //   setProgression({ ...Progression, STT: STTS })
  // };


  const changeSelectDV = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    console.log(value)
    setProgression({ ...Progression, NameDV: value })
  }

  // const DateTime = () => {
  //   const Time = new Date();
  //   const HSD = new Date(Time.setDate(Time.getDate() + 1));
  //   setProgression({ ...Progression, Time: formatDate(Time), HSD: formatDateMon(HSD), Active: "Đang chờ", power: "Kiosk" });
  // }

  const fetchSTTs = () => {
    let currentSTT = 2010000; // Biến lưu trữ STT hiện tại

    if (Progression && Progression?.STT) {
      const previousDateFormatted = Progression.Time;

      const currentDate = new Date();
      const currentDateFormatted = formatDate(currentDate); // Hàm formatDate để định dạng ngày theo mong muốn (hh:mm dd-mm-yyyy)

      if (previousDateFormatted === currentDateFormatted) {
        currentSTT = Progression.STT + 1; // Nếu ngày hiện tại trùng với ngày trước đó, tăng STT lên 1
      }
    }

    const currentDate = new Date();
    const HSD = new Date(currentDate.setDate(currentDate.getDate() + 1));
    const currentDateFormatted = formatDate(currentDate); // Hàm formatDate để định dạng ngày theo mong muốn (hh:mm dd-mm-yyyy)

    // Cập nhật trạng thái của Progression
    const updatedProgression = {
      STT: currentSTT,
      Time: currentDateFormatted,
      HSD: formatDateMon(HSD),
      Active: "Đang chờ",
      power: "Kiosk"
    };

    setProgression({ ...Progression, ...updatedProgression });
  };



  const handleAdd = () => {
    // DateTime()
    fetchSTTs()
    console.log(Progression)
    if (Progression && Progression.HSD && Progression.NameDV
      && Progression.STT && Progression.Time) {
      setisOpen(!isOpen);
      // dispatch(addProgressions(Progression as Progressions))
    }
  }

  const toggle = () => {
    setisOpen(!isOpen);
  };

  return (
    <>
      <div className="ProgressionAdd">
        <Header />
        <Navbar />
        <div className="ProgressionAdd-title">Quản lý cấp số</div>

        <div className="ProgressionAdd-form">
          <div className="ProgressionAdd-form_title">CẤP SỐ MỚI</div>
          <h3 className='ProgressionAdd-form_DV' >Dịch vụ khách hàng lựa chọn</h3>
          <select className='ProgressionAdd-form-ip' name='NameDV' id='NameDV' placeholder='chọn toại thiết bị'
            onChange={changeSelectDV}
          >
            <option value="ALL">Tất Cả</option>
            <option value="Khám sản Phụ khoa">Khám sản - Phụ khoa</option>
            <option value="Khám răng hàm mặt">Khám răng hàm mặt</option>
            <option value="Khám tai mũi họng">Khám tai mũi họng</option>
            <option value="Khám Tim Mạch">Khám Tim Mạch</option>
          </select>

          <div className="ProgressionAdd-form_btn">

            <Button className='btn-closes' onclick={() => navigate("/Progression")}>Hủy Bỏ</Button>
            <div className='btn-print' onClick={handleAdd}>In Số</div>
          </div>
        </div>

        <ProgressionModal
          Progression={Progression}
          isOpen={isOpen} toggle={toggle}
        />
      </div>
    </>
  );
};

export default ProgressionAdd;
