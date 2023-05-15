import React from 'react';
import "./ReportCharts.scss"
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LinearScale, LineElement, CategoryScale, PointElement
} from 'chart.js';

ChartJS.register(
    LinearScale, LineElement, CategoryScale, PointElement
)

interface ReportchartsProps { }

const ReportCharts: React.FC<ReportchartsProps> = (props) => {
    const data = {
        labels: ['01', '03', '19', '20', '31'],
        datasets: [
            {
                label: 'Sales of the',
                data: [0, 1000, 2000, 1500, 4000],
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
                <div className="ReportCharts-textdate">Bảng thống kê theo ngày</div>
                <div className="ReportCharts-dropdown">
                    Xem Theo:{" "}
                    <select name="daytime" id="daytime">
                        <option value="day">Ngày</option>
                        <option value="month">Tháng</option>
                        <option value="year">Năm</option>
                    </select>
                </div>
                <div className="ReportCharts-body">
                    <Line data={data} options={options} />
                </div>
            </div>
        </>
    );
};

export default ReportCharts;
