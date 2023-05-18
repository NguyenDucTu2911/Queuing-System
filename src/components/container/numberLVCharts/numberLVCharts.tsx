import React from 'react';
import "./numberLVCharts.scss"
import num from "../../../assets/image/Vector.png"
import { useNavigate } from 'react-router-dom';

interface NumberLVChartsProps { }

const NumberLVCharts: React.FC<NumberLVChartsProps> = (props) => {
    const navigate = useNavigate()
    const handleNumber = () => {
        navigate("/capso")

    }

    return (
        <>
            <div className="NumberLVCharts">
                <div className="NumberLVCharts-item" onClick={handleNumber}>
                    <div className="item-top">
                        <div className="item_icon" style={{ background: "rgba(102, 149, 251, 0.57)" }} >
                            <i className="fa-regular fa-calendar num-icon" style={{ color: "#6493F9" }}></i>
                        </div>
                        <div className="item_text">
                            Số thứ tự đã cấp
                        </div>
                    </div>
                    <div className="NumberLVCharts_text">
                        1.001
                    </div>
                </div>

                <div className="NumberLVCharts-item" onClick={handleNumber}>
                    <div className="item-top">
                        <div className="item_icon" style={{ background: "rgba(53, 199, 90, 0.44)" }}>
                            <i className="fa-regular fa-calendar-check num-icon" style={{ color: "#35C75A" }}></i>
                        </div>
                        <div className="item_text">
                            Số thứ tự đã sử dụng
                        </div>
                    </div>
                    <div className="NumberLVCharts_text">
                        1.001
                    </div>
                </div>

                <div className="NumberLVCharts-item" onClick={handleNumber}>
                    <div className="item-top">
                        <div className="item_icon"  >
                            <i className="fa-regular fa-calendar num-icon" style={{ color: "#2771d3" }}></i>
                        </div>
                        <div className="item_text">
                            Số thứ tự đang chờ
                        </div>
                    </div>
                    <div className="NumberLVCharts_text">
                        1.001
                    </div>
                </div>

                <div className="NumberLVCharts-item" onClick={handleNumber}>
                    <div className="item-top">
                        <div className="item_icon" >
                            <i className="fa-regular fa-calendar num-icon" style={{ color: "#2771d3" }}></i>
                        </div>
                        <div className="item_text">
                            Số thứ tự đã cấp
                        </div>
                    </div>
                    <div className="NumberLVCharts_text">
                        1.001
                    </div>
                </div>
            </div>
        </>
    );
};
export default NumberLVCharts;
