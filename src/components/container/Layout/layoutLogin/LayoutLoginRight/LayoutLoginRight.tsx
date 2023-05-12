import React from 'react';
import Group from "../../../../../assets/image/Group.png"
import "./LayoutLoginRight.css"
interface LayoutLoginLeftProps { }

const LayoutLoginRight: React.FC<LayoutLoginLeftProps> = (props) => {
  return (
    <>
      <div className="layoutRight">
        <div className="layoutRight-image" style={{ backgroundImage: (`url(${Group})`) }} />
        <p className='TextHT'>Hệ Thống</p>
        <p className='TextQL'>QUẢN LÝ XẾP HÀNG</p>
      </div>
    </>
  );
};

export default LayoutLoginRight;
