import React, { useEffect, useState } from 'react';
import "./numberLVCharts.scss"
import num from "../../../assets/image/Vector.png"
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import { fetchProgressions } from '../../../redux/Slices/ProgressionSlice';

interface NumberLVChartsProps { }
interface Actives {
    ActiveOnl: number,
    ActiveOff: number,
    ActiveSum: number,
    percent: number,
    Pending: number,
    sum: number,
}
const NumberLVCharts: React.FC<NumberLVChartsProps> = (props) => {
    const Progression = useAppSelector((state: RootState) => state.Progression.Progression)
    const [Progressions, setProgression] = useState<Partial<Actives>>({})
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const handleNumber = () => {
        navigate("/Progression")
    }

    useEffect(() => {
        dispatch(fetchProgressions())
    }, [])

    useEffect(() => {
        findProgression()
    }, [Progression])

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
            Pending: Pending,
            sum: sum
        })
    };

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
                        {Progressions.sum}
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
                        {Progressions.ActiveOnl}
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
                        {Progressions.Pending}
                    </div>
                </div>

                <div className="NumberLVCharts-item" onClick={handleNumber}>
                    <div className="item-top">
                        <div className="item_icon" >
                            <i className="fa-regular fa-calendar num-icon" style={{ color: "#2771d3" }}></i>
                        </div>
                        <div className="item_text">
                            Số thứ tự đã bỏ qua
                        </div>
                    </div>
                    <div className="NumberLVCharts_text">
                        {Progressions.ActiveOff}
                    </div>
                </div>
            </div>
        </>
    );
};
export default NumberLVCharts;
