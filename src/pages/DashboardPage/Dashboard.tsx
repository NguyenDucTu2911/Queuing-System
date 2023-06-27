import React, { useEffect, useState } from 'react';
import "./Dashboard.css"
import Navbar from '../../components/container/nav/navbar';
import Header from '../../components/container/header/Header';
import ReportCharts from '../../components/container/report-charts/reportCharts';
import NumberLVCharts from '../../components/container/numberLVCharts/numberLVCharts';
import Calendar from '../../components/container/dateRangePicker/Calendar';
import { redirect, useNavigate } from 'react-router-dom';
import { Progress } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/Hooks';
import { fetchDevice } from '../../redux/slices/DeviceSlice';
import { RootState } from '../../redux/Store';
import { fetchService } from '../../redux/slices/ServiceSlice';
import { fetchProgressions } from '../../redux/slices/ProgressionSlice';
import useLocalStorage from '../../components/customHook/useLocalStorage';
import { DataState } from '../../redux/slices/AuthSlice';
import { getAuth } from 'firebase/auth';

interface Actives {
    ActiveOnl: number,
    ActiveOff: number,
    ActiveSum: number,
    percent: number,
    Pending: number,
}

const Dashboard: React.FC = () => {

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const device = useAppSelector((state: RootState) => state.device.Device)
    const service = useAppSelector((state: RootState) => state.service.Service)
    const Progression = useAppSelector((state: RootState) => state.Progression.Progression)
    const [devices, setDevice] = useState<Partial<Actives>>({})
    const [services, setservice] = useState<Partial<Actives>>({})
    const [Progressions, setProgression] = useState<Partial<Actives>>({})
    const [checkAuth, setcheckAuth] = useLocalStorage<DataState | null>('authState', null);

    useEffect(() => {
        dispatch(fetchDevice())
        dispatch(fetchService())
        dispatch(fetchProgressions())

    }, [])

    useEffect(() => {
        find()
        findsevice()
        findProgression()
        loader()
    }, [device, service, Progression, checkAuth])

    const loader = async () => {
        if (!checkAuth?.authenticated) {
            return redirect("/");
        }
        return null;
    };

    const handleDrive = () => {
        navigate("/device")
    }

    const handleService = () => {
        navigate("/Service")
    }
    const handleProgression = () => {
        navigate("/Progression")
    }

    const find = () => {
        let count = 0;
        let sum = 0;
        device.forEach((item) => {
            if (item.Active) {
                sum++;
                if (item.Active === "Đang Hoạt Động") {
                    count++;
                }
            }
        });
        setDevice({
            ...devices,
            ActiveOnl: count,
            percent: Number((count / sum * 100).toFixed(2)),
            ActiveOff: (sum - count),
            ActiveSum: sum
        })
    };


    const findsevice = () => {
        let count = 0;
        let sum = 0;
        service.forEach((item) => {
            if (item.Active) {
                sum++;
                if (item.Active === "Đang Hoạt Động") {
                    count++;
                }

            }
        });
        setservice({
            ...services,
            ActiveOnl: count,
            percent: Number((count / sum * 100).toFixed(2)),
            ActiveOff: (sum - count),
            ActiveSum: sum
        })
    };

    const findProgression = () => {
        let count = 0;
        let sum = 0;
        let Pending = 0;
        Progression.forEach((item) => {
            if (item.Active) {
                sum++;
                if (item.Active === "Đã sử dụng") {
                    count++;
                }
                if (item.Active === "Đang chờ") {
                    Pending++
                }
            }
        });
        setProgression({
            ...Progressions,
            ActiveOnl: count,
            percent: Number((count / sum * 100).toFixed(2)),
            ActiveOff: (sum - (count + Pending)),
            ActiveSum: sum,
            Pending: Pending
        })
    };


    return (
        <>
            <div className="Dashboard">
                <Navbar />
                <Header />
                <b className="title">Biểu đồ cấp số</b>
                <NumberLVCharts />
                <div className="charts">
                    <ReportCharts />
                </div>
                <div className="menuBar">
                    <div className="menuBar-title">Tổng quan</div>
                    <div className="menuBar-top menuBar-item" onClick={handleDrive}>
                        <div className="menubar-chart">
                            <Progress type="circle" percent={devices.percent} size="small" strokeColor={{ '100%': '#FF7506' }} />
                        </div>

                        <div className="menubar-device">
                            <div className="textMenubar">
                                {devices.ActiveSum}
                            </div>
                            <div className="menubar-device_icon">
                                <i className="fa-solid fa-tv"></i>{" "}
                                Thiết bị
                            </div>
                        </div>

                        <div className="menubar-action" >
                            <div className="menuBar-isactive">
                                <li className='menuBar-text'>Đang Hoạt Động</li>
                                <b className='menuBar-text-origin'>{devices.ActiveOnl}</b>
                            </div>
                            <div className="menuBar-No-active">
                                <li className='menuBar-text'>Ngưng Hoạt Động</li>
                                <b className='menuBar-text-origin'>{devices.ActiveOff}</b>
                            </div>
                        </div>
                    </div>
                    <div className="menuBar-mid menuBar-item" onClick={handleService}>
                        <div className="menubar-chart">
                            <Progress type="circle" percent={services.percent} size="small" />
                        </div>

                        <div className="menubar-device">
                            <div className="textMenubar">
                                {services.ActiveSum}
                            </div>
                            <div className="menubar-Service_icon">
                                <i className="fa-regular fa-comments"></i>{" "}
                                Dịch Vụ
                            </div>
                        </div>
                        <div className="menubar-action">
                            <div className="menuBar-isactive">
                                <li className='menuBar-text' >Đang Hoạt Động</li>
                                <b className='menuBar-text-origin' style={{ color: "#4277FF" }}>
                                    {services.ActiveOnl}
                                </b>
                            </div>
                            <div className="menuBar-No-active">
                                <li className='menuBar-text'>Ngưng Hoạt Động</li>
                                <b className='menuBar-text-origin' style={{ color: "#4277FF" }}>
                                    {services.ActiveOff}
                                </b>
                            </div>
                        </div>
                    </div>
                    <div className="menuBar-botton menuBar-item" onClick={handleProgression}>
                        <div className="menubar-chart">
                            <Progress type="circle" percent={Progressions.percent} size="small" strokeColor={{ '100%': '#35C75A' }} />
                        </div>
                        <div className="menubar-device">
                            <div className="textMenubar">
                                {Progressions.ActiveSum}
                            </div>
                            <div className="menubar-Number_icon">
                                <i className="fa-solid fa-layer-group"></i>{" "}
                                Cấp số
                            </div>
                        </div>
                        <div className="menubar-action">
                            <div className="menuBar-Pending">
                                <li className='menuBar-text'>Đang chờ</li>
                                <b className='menuBar-text-origin' style={{ color: "rgb(82, 196, 26)" }}>{Progressions.Pending}</b>
                            </div>
                            <div className="menuBar-Used">
                                <li className='menuBar-text'>Đã sử dụng</li>
                                <b className='menuBar-text-origin' style={{ color: "rgb(82, 196, 26)" }}>{Progressions.ActiveOnl}</b>
                            </div>
                            <div className="menuBar-Bypass">
                                <li className='menuBar-text'>Bỏ qua</li>
                                <b className='menuBar-text-origin' style={{ color: "rgb(82, 196, 26)" }}>{Progressions.ActiveOff}</b>
                            </div>
                        </div>
                    </div>
                    <div className="daypicker">
                        <Calendar />
                    </div>
                </div>


            </div>
        </>
    );
};

export default Dashboard;
