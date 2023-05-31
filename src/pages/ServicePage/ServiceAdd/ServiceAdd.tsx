import React, { useState } from 'react';
import "./ServiceAdd.scss"
import Header from '../../../components/container/Header/Header';
import Navbar from '../../../components/container/nav/navbar';
import { Input } from '../../../components/container/Input/Input';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../components/container/Button/Button';
import { Checkbox } from 'antd';
import { Services, addService } from '../../../redux/Slices/serviceSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';

interface ServiceAddProps { }

const ServiceAdd: React.FC<ServiceAddProps> = (props) => {
    const navigate = useNavigate()
    const [Service, setService] = useState<Partial<Services>>({});
    const [formErrors, setFormErrors] = useState<Partial<Services>>({});
    const { error } = useAppSelector((state: RootState) => state.service)
    const [autoIncrement, setAutoIncrement] = useState(false);
    const dispatch = useAppDispatch()


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setService({
            ...Service,
            [name]: value
        })
    }

    const handleCheckboxChange = (event: any) => {
        setAutoIncrement(event.target.checked);

    };

    const handleAdd = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: Partial<Services> = {};

        if (!Service.Maid) {
            errors.Maid = "Bạn chưa nhập mã dịch vụ";
        }
        if (!Service.Name) {
            errors.Name = "Bạn chưa nhập tên dịch vụ";
        }

        setFormErrors(errors);

        if (!errors.Maid && !errors.Name) {
            try {
                if (!error) {
                    dispatch(addService(Service as Services))
                    navigate("/Service")
                } else {
                    console.log("ágdasd", error)
                }

            } catch (error) {
                console.log(error)
            }

        } else {
            console.log("lỗi")
        }

    }
    return (
        <>
            <div className="ServiceAdd">
                <Header />
                <Navbar />
                <div className="ServiceAdd-title">Quản lý dịch vụ</div>
                <div className="ServiceAdd-form">
                    <div className="ServiceAdd-form_title">Thông Tin Dịch Vụ</div>
                    <form onSubmit={handleAdd}>
                        <div className="ServiceAdd-form_maid">
                            <label htmlFor="MaID" className='ServiceAdd-form_lb'>Mã Dịch Vụ:
                                <span style={{ color: "red", paddingLeft: "1px" }}>*</span>
                            </label>
                            <Input className={formErrors.Maid ? "inputError" : 'ServiceAdd-form_IP'} placeholder='Nhập Mã Dịch Vụ' name='Maid' id='MaID'
                                handleChange={handleInputChange} />
                            {formErrors.Maid && <span className='messageError'>{formErrors.Maid}</span>}
                        </div>
                        <div className="ServiceAdd-form_Name">
                            <label htmlFor="name" className='ServiceAdd-form_lb'>Tên Dịch Vụ:
                                <span style={{ color: "red", paddingLeft: "1px" }}>*</span>
                            </label>
                            <Input className={formErrors.Maid ? "inputError" : 'ServiceAdd-form_IP'} placeholder='Tên Dịch Vụ' name='Name' id='name'
                                handleChange={handleInputChange} />
                            {formErrors.Name && <span className='messageError'>{formErrors.Name}</span>}

                        </div>
                        <div className="ServiceAdd-form_des">
                            <label htmlFor="Des" className='ServiceAdd-form_lb'>Mô tả:</label>
                            <Input className='ServiceAdd-form_IPdes' placeholder='Mô Tả Dịch Vụ' name='description' id='Des'
                                handleChange={handleInputChange} />
                        </div>
                        <div className="ServiceAdd-form_QT">Quy tắc cấp số</div>
                        <div className="ServiceAdd-numbernext">
                            <div className="ServiceAdd-numbernext_lb">
                                <Checkbox checked={autoIncrement} onChange={handleCheckboxChange}>
                                    Tăng tự động từ:
                                </Checkbox>
                            </div>

                            <div className="inputss">
                                <Input className='ServiceAdd-numbernext_IP' placeholder='0001' name='increaseStart' />
                                <b>Đến</b>
                                <Input className='ServiceAdd-numbernext_IP' placeholder='1000' name='increaseEnd' />
                            </div>

                        </div>
                        <div className="ServiceAdd-Prefix">
                            <div className="ServiceAdd-numbernext_lb">
                                <Checkbox checked={autoIncrement} onChange={handleCheckboxChange}>
                                    Prefix:
                                </Checkbox>
                            </div>

                            <Input className='ServiceAdd-numbernext_IP' placeholder='0001' name='Prefix' />
                        </div>
                        <div className="ServiceAdd-Surfix">
                            <div className="ServiceAdd-numbernext_lb">
                                <Checkbox checked={autoIncrement} onChange={handleCheckboxChange}>
                                    Surfix:
                                </Checkbox>
                            </div>
                            <Input className='ServiceAdd-numbernext_IP' placeholder='0001' name='Surfix' />

                        </div>

                        <div className="ServiceAdd-reset"></div>
                        <Button className='btnform-exit' onclick={() => navigate("/Service")}>Hủy Bỏ</Button>
                        <Button type='submit' className='btnform-add'>Thêm dịch vụ</Button>
                    </form>
                </div >
            </div >
        </>
    );
};

export default ServiceAdd;
