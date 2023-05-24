import React, { ReactNode } from "react";
import "./ProgressionModal.scss"
import ProgressionAdd from "../../../pages/progression/ProgressionAdd/ProgressionAdd";

interface ProgressionModalProps {
  Progression: {
    NameDV?: string,
    STT?: number,
    Time?: string,
    HSD?: string
  };
  isOpen: boolean;
  toggle: () => void;
}

const ProgressionModal: React.FC<ProgressionModalProps> = ({ Progression, isOpen, toggle }) => {
  // const { Data } = props;

  // Access the properties of Data object
  // const { Time, HSD, NameDV, STT } = Data;

  // Use the properties as needed
  // console.log(Time, HSD, NameDV, STT);

  return (
    <>
      <div className="ProgressionModal">
        {isOpen && (
          <div className="modal-overlay">
            <div className="modal-box">
              <div className="modal-header" onClick={toggle}>
                <i className="fa-solid fa-xmark" style={{ color: "#FF9138" }}></i>
              </div>
              <div className="modal-title">Số thứ tự được cấp</div>
              <div className="Modal-number">{Progression.STT}</div>
              <div className="modal-dv">{Progression.NameDV}</div>
              <div className="footer">
                <div className="modal-time">Thời gian cấp: {Progression.Time}</div>
                <div className="modal-hsd">Hạn sử dụng: {Progression.HSD}</div>
              </div>
            </div>
          </div>
        )}
      </div>

    </>
  );
};

export default ProgressionModal;

