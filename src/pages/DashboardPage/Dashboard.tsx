import React, { useEffect } from 'react';
import "./Dashboard.css"
import Navbar from '../../components/container/nav/navbar';
import Header from '../../components/container/Header/Header';
import ReportCharts from '../../components/container/report-charts/reportCharts';
import NumberLVCharts from '../../components/container/numberLVCharts/numberLVCharts';
import Calendar from '../../components/container/DateRangePicker/Calendar';
import { useNavigate } from 'react-router-dom';
import { Progress } from 'antd';

interface DashboardProps { }


const Dashboard: React.FC<DashboardProps> = (props) => {
    const navigate = useNavigate()
    const handleDrive = () => {
        navigate("/device")
    }

    const handleService = () => {
        navigate("/Service")
    }

    const sum = Number((3779 / 4009 * 100).toFixed(2));

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
                            <Progress type="circle" percent={sum} size="small" strokeColor={{ '100%': '#FF7506' }} />
                        </div>

                        <div className="menubar-device">
                            <div className="textMenubar">
                                4.221
                            </div>
                            <div className="menubar-device_icon">
                                <i className="fa-solid fa-tv"></i>{" "}
                                Thiết bị
                            </div>
                        </div>

                        <div className="menubar-action" >
                            <div className="menuBar-isactive">
                                <li className='menuBar-text'>Đang Hoạt Động</li>
                                <b className='menuBar-text-origin'>3.799</b>
                            </div>
                            <div className="menuBar-No-active">
                                <li className='menuBar-text'>Ngưng Hoạt Động</li>
                                <b className='menuBar-text-origin'>210</b>
                            </div>
                        </div>
                    </div>
                    <div className="menuBar-mid menuBar-item" onClick={handleService}>
                        <div className="menubar-chart">
                            <Progress type="circle" percent={sum} size="small" />
                        </div>

                        <div className="menubar-device">
                            <div className="textMenubar">
                                4.221
                            </div>
                            <div className="menubar-Service_icon">
                                <i className="fa-regular fa-comments"></i>{" "}
                                Dịch Vụ
                            </div>
                        </div>
                        <div className="menubar-action">
                            <div className="menuBar-isactive">
                                <li className='menuBar-text' >Đang Hoạt Động</li>
                                <b className='menuBar-text-origin' style={{ color: "#4277FF" }}>3.799</b>
                            </div>
                            <div className="menuBar-No-active">
                                <li className='menuBar-text'>Ngưng Hoạt Động</li>
                                <b className='menuBar-text-origin' style={{ color: "#4277FF" }}>210</b>
                            </div>
                        </div>
                    </div>
                    <div className="menuBar-botton menuBar-item">
                        <div className="menubar-chart">
                            <Progress type="circle" percent={sum} size="small" strokeColor={{ '100%': '#35C75A' }} />
                        </div>
                        <div className="menubar-device">
                            <div className="textMenubar">
                                4.221
                            </div>
                            <div className="menubar-Number_icon">
                                <i className="fa-solid fa-layer-group"></i>{" "}
                                Cấp số
                            </div>
                        </div>
                        <div className="menubar-action">

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
