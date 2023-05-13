import React from 'react';
import "./LayoutForgot.css"
import Frame from "../../../../assets/image/Frame.png"
interface LayoutForgotProps { }

const LayoutForgot: React.FC<LayoutForgotProps> = (props) => {
    return (
        <>
            <div className="layoutRight">
                <div className="LayoutForgot" style={{ backgroundImage: `url(${Frame})` }}></div>
            </div>
        </>
    );
};

export default LayoutForgot;
