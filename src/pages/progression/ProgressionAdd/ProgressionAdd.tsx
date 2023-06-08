import React, { useState } from 'react';
import Header from '../../../components/container/header/Header';
import Navbar from '../../../components/container/nav/navbar';
import "./ProgressionAdd.scss"
import { Button } from '../../../components/container/button/Button';
import { useNavigate } from 'react-router-dom';
import formatDate, { formatDateMon } from '../../../components/container/format/formatDate';
import { useAppDispatch } from '../../../redux/Hooks';
import ProgressionModal from '../../../components/container/modal/ProgressionModal';
import { Progressions, addProgressions } from '../../../redux/slices/ProgressionSlice';

interface ProgressionAddProps { }

const ProgressionAdd: React.FC<ProgressionAddProps> = (props) => {
  // const [Progression, setProgression] = useState<Partial<Progressions>>({})
  const [Progression, setProgression] = useState<Partial<Progressions>>({})
  const [ProgressionError, setProgressionError] = useState<Partial<Progressions>>({})
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
    setProgressionError({
      ...ProgressionError,
      NameDV: value.trim() ? "" : 'Vui lòng chọn Dịch vụ',
    })
  }

  // const DateTime = () => {
  //   const Time = new Date();
  //   const HSD = new Date(Time.setDate(Time.getDate() + 1));
  //   setProgression({ ...Progression, Time: formatDate(Time), HSD: formatDateMon(HSD), Active: "Đang chờ", power: "Kiosk" });
  // }

  const fetchSTTs = () => {
    // Lấy thông tin STT và ngày hiện tại từ Local Storage (nếu có)
    const previousSTT = localStorage.getItem('currentSTT');
    const previousDate = localStorage.getItem('currentDate');

    let currentSTT = previousSTT ? parseInt(previousSTT, 10) : 2010000; // Giá trị mặc định của STT
    let currentDate = new Date(); // Ngày hiện tại

    if (previousDate) {
      // Kiểm tra nếu ngày hiện tại khác với ngày đã lưu trữ, thì reset STT về giá trị mặc định
      if (previousDate !== formatDate(currentDate)) {
        currentSTT = 2010000;
      }
    }

    // Tăng giá trị của STT
    currentSTT++;

    // Lưu trữ thông tin STT và ngày hiện tại vào Local Storage
    localStorage.setItem('currentSTT', currentSTT.toString());
    localStorage.setItem('currentDate', formatDate(currentDate));

    const HSD = new Date(currentDate.setDate(currentDate.getDate() + 1));
    const currentDateFormatted = formatDate(currentDate);

    const updatedProgression = {
      STT: currentSTT,
      Time: currentDateFormatted,
      HSD: formatDateMon(HSD),
      Active: 'Đang chờ',
      power: 'Kiosk'
    };

    setProgression({ ...Progression, ...updatedProgression });
  };


  const handleAdd = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // DateTime()
    console.log(Progression)
    if (!Progression.NameDV) {
      setProgressionError({
        ...ProgressionError,
        NameDV: "Chưa Chọn Dich Vụ"
      })
    }

    fetchSTTs()

    if (Progression && Progression.HSD && Progression.NameDV
      && Progression.STT && Progression.Time) {
      setisOpen(!isOpen);
      dispatch(addProgressions(Progression as Progressions))
    } else {
      console.log("cấp số Không Thành công")
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
        <form onSubmit={handleAdd}>
          <div className="ProgressionAdd-form">
            <div className="ProgressionAdd-form_title">CẤP SỐ MỚI</div>
            <h3 className='ProgressionAdd-form_DV' >Dịch vụ khách hàng lựa chọn</h3>
            <select className={`ProgressionAdd-form-ip ${ProgressionError.NameDV ? "error" : ""}`}
              name='NameDV' id='NameDV'
              placeholder='chọn toại thiết bị'
              onChange={changeSelectDV}
            >
              <option value="">Tất Cả</option>
              <option value="Khám sản Phụ khoa">Khám sản - Phụ khoa</option>
              <option value="Khám răng hàm mặt">Khám răng hàm mặt</option>
              <option value="Khám tai mũi họng">Khám tai mũi họng</option>
              <option value="Khám Tim Mạch">Khám Tim Mạch</option>
            </select>

            <div className="ProgressionAdd-form_btn">
              <Button className='btn-closes' onclick={() => navigate("/Progression")}>Hủy Bỏ</Button>
              <Button className='btn-print' type='submit'>In Số</Button>
            </div>
          </div>
        </form>
        <ProgressionModal
          Progression={Progression}
          isOpen={isOpen} toggle={toggle}
        />
      </div>
    </>
  );
};

export default ProgressionAdd;
