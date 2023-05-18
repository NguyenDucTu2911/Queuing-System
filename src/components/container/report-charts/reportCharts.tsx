import React, { useEffect, useState } from 'react';
import "./ReportCharts.scss"
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale, LineElement, CategoryScale, PointElement
} from 'chart.js';
import Dropdown from '../dropdown/Dropdown';
import { fetchReports, Report } from '../../../redux/Slices/reportSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { addReport } from '../../../redux/Slices/reportSlice';
import Item from 'antd/es/list/Item';

ChartJS.register(
    LinearScale, LineElement, CategoryScale, PointElement
)

interface ReportchartsProps { }

const ReportCharts: React.FC<ReportchartsProps> = (props) => {
    const reports = useAppSelector((state: RootState) => state.reports.reports)
    const dispatch = useAppDispatch()


    useEffect(() => {
        addReport(reports)
    }, [])

    const option = [
        { value: 'N', label: 'Ngày' },
        { value: 'T', label: 'Tuần' },
        { value: 'TT', label: 'Tháng' },
    ];

    const handleOptionSelect = (value: string) => {
        console.log('Selected option:', value);
        dispatch(fetchReports(value))
    };
    const data = {
        labels: ['01', '03', '19', '20', '31'],
        datasets: [
            {
                // label: 'Sales of the',
                data: [0, 1000, 2000, 6000, 4000],
                fill: false,
                borderColor: 'rgba(75,192,192,1)',
                tension: 0.1
            }
        ]
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    };

    return (
        <>
            <div className="ReportCharts">
                <div className="ReportCharts-textdate" >Bảng số liệu theo ngày</div>

                <div className="ReportCharts-dropdown">
                    <Dropdown options={option} onSelect={handleOptionSelect} />
                </div>
                <div className="ReportCharts-body">
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    );
};

export default ReportCharts;
