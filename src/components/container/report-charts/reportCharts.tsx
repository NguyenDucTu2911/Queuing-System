import React, { useEffect, useState } from 'react';
import "./ReportCharts.scss"
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale, LineElement, CategoryScale, PointElement
} from 'chart.js';
import Dropdown from '../dropdown/Dropdown';
import { fetchReports, Report } from '../../../redux/slices/ReportSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/Hooks';
import { RootState } from '../../../redux/Store';
import useLocalStorage from '../../customHook/useLocalStorage';

ChartJS.register(
    LinearScale, LineElement, CategoryScale, PointElement
)

interface ReportchartsProps { }

const ReportCharts: React.FC<ReportchartsProps> = (props) => {
    const reports = useAppSelector((state: RootState) => state.reports.reports)
    const [report, setReport] = useState<Partial<Report>>({})
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (reports.length > 0) {
            setReport(reports[0]);
        }
    }, [reports]);

    const handleOptionSelect = (value: string) => {
        console.log('Selected option:', value);
        dispatch(fetchReports(value))

    };

    const option = [
        { value: 'N', label: 'Ngày' },
        { value: 'T', label: 'Tuần' },
        { value: 'TT', label: 'Tháng' },
    ];

    const data = {
        labels: report.date,
        datasets: [
            {
                // label: 'Sales of the',
                data: report.data,
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
    console.log(report)
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
