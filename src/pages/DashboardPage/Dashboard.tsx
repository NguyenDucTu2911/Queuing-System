import React from 'react';
import "./Dashboard.css"
import Navbar from '../../components/container/nav/navbar';
import Header from '../../components/container/Header/Header';
import ReportCharts from '../../components/container/report-charts/reportCharts';

interface DashboardProps { }

const Dashboard: React.FC<DashboardProps> = (props) => {
    return (
        <>
            <div className="Dashboard">
                <Navbar />
                <Header />
                <div className="charts">
                    <ReportCharts />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
