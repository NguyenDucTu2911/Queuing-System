import React from 'react';
import Navbar from '../../components/container/nav/navbar';
import Header from '../../components/container/Header/Header';
import "./report.scss"
interface ReportProps { }

const Report: React.FC<ReportProps> = (props) => {
    return (
        <>
            <div className="reports">
                <Header />
                <Navbar />
                <div className="report-save">
                    <i className="fa-solid fa-file-arrow-down" style={{ fontSize: "24px" }}></i>
                    Tải về
                </div>
                <div className="report-form"></div>
            </div>
        </>
    );
};

export default Report;
