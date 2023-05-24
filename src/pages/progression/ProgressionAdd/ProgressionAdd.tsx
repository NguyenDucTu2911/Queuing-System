import React, { useEffect, useState } from 'react';
import Header from '../../../components/container/Header/Header';
import Navbar from '../../../components/container/nav/navbar';
import "./ProgressionAdd.scss"
import { Button } from '../../../components/container/Button/Button';
import { useNavigate } from 'react-router-dom';
import formatDate from '../../../components/container/format/formatDate';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import ProgressionModal from '../../../components/container/modal/ProgressionModal';
import useSessionStorage from '../../../components/customHook/useSessionStorage';
import { addProgressions, Progressions } from '../../../redux/Slices/ProgressionSlice';
interface ProgressionAddProps { }

const ProgressionAdd: React.FC<ProgressionAddProps> = (props) => {
  const [Progression, setProgression] = useSessionStorage<Partial<Progressions>>("newStt", {})
  const stt = useAppSelector((state: RootState) => state.Progression.Progression)
  const [isOpen, setisOpen] = useState(false);


  const dispatch = useAppDispatch()
  const navigate = useNavigate()


  useEffect(() => {
    fetchSTT()
  }, [stt])

  const fetchSTT = () => {
    const sttValues = stt.map((item) => item.STT);
    const largestNumber = Math.max(...sttValues.map(Number));
    const STTS = (largestNumber + 1)
    setProgression({ ...Progression, STT: STTS })
  };

  const changeSelectDV = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    console.log(value)
    setProgression({ ...Progression, NameDV: value })
  }

  const DateTime = () => {
    const Time = new Date();
    const HSD = new Date(Time.setDate(Time.getDate() + 1));

    setProgression({ ...Progression, Time: formatDate(Time), HSD: formatDate(HSD), Active: "Đang chờ", power: "Kiosk" });

  }

  const handleAdd = () => {
    DateTime()
    if (Progression && Progression.HSD && Progression.NameDV
      && Progression.STT && Progression.Time) {
      setisOpen(!isOpen);
      dispatch(addProgressions(Progression as Progressions))
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
