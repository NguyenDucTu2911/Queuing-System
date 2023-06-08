import React from 'react';
import "./LayoutForgot.css"
import Frame from "../../../../assets/image/Frame.png"

const LayoutForgot: React.FC = () => {
    return (
        <>
            <div className="layoutRight">
                <div className="LayoutForgot" style={{ backgroundImage: `url(${Frame})` }}></div>
            </div>
        </>
    );
};

export default LayoutForgot;
