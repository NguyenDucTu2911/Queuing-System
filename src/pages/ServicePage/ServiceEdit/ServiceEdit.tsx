
import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/container/nav/navbar';
import { Input } from '../../../components/container/Input/Input';
import { Checkbox } from 'antd';
import { Button } from '../../../components/container/Button/Button';
import { Services } from '../../../redux/Slices/serviceSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../components/container/Header/Header';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
import useSessionStorage from '../../../components/customHook/useSessionStorage';
import { UpdateService } from '../../../redux/Slices/serviceSlice';

interface ServiceEditProps { }

const ServiceEdit: React.FC<ServiceEditProps> = (props) => {
    const navigate = useNavigate()
    const [autoIncrement, setAutoIncrement] = useState(false);
    const DetailDataSelector = useAppSelector((state: RootState) => state.service.Service)
    const { error } = useAppSelector((state: RootState) => state.service)
    const [EditData, setEditData] = useSessionStorage<Partial<Services>>("Service", {})
    const [formErrors, setFormErrors] = useState<Partial<Services>>({});
    const { id } = useParams()
    const dispatch = useAppDispatch()

    useEffect(() => {
        fetchData(id)
    }, [id, DetailDataSelector])

    //lấy dữ liệu the0 id
    const fetchData = (id: any) => {
        const DetailData = DetailDataSelector.find((item) => item.id === id)
        if (DetailData) {
            setEditData(DetailData as Services)
        }
        return DetailData;
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEditData({
            ...EditData,
            [name]: value,
        });
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.name;
        const isChecked = event.target.checked;
        setEditData({ ...EditData, [checkboxName]: isChecked, });
    };

    const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const errors: Partial<Services> = {};

        if (!EditData.Maid) {
            errors.Maid = "Bạn chưa nhập mã dịch vụ";
        }
        if (!EditData.Name) {
            errors.Name = "Bạn chưa nhập tên dịch vụ";
        }

        setFormErrors(errors);

        if (!errors.Maid && !errors.Name) {
            try {
                if (!error) {
                    dispatch(UpdateService(EditData as Services))
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
                    <form onSubmit={handleUpdate}>
                        <div className="ServiceAdd-form_maid">
                            <label htmlFor="MaID" className='ServiceAdd-form_lb'>Mã Dịch Vụ:
                                <span style={{ color: "red", paddingLeft: "1px" }}>*</span>
                            </label>
                            <Input className={formErrors.Maid ? "inputError" : 'ServiceAdd-form_IP'} placeholder='Nhập Mã Dịch Vụ' name='Maid' id='MaID'
                                value={EditData.Name}
                                handleChange={handleInputChange} />
                            {formErrors.Maid && <span className='messageError'>{formErrors.Maid}</span>}
                        </div>
                        <div className="ServiceAdd-form_Name">
                            <label htmlFor="name" className='ServiceAdd-form_lb'>Tên Dịch Vụ:
                                <span style={{ color: "red", paddingLeft: "1px" }}>*</span>
                            </label>
                            <Input className={formErrors.Maid ? "inputError" : 'ServiceAdd-form_IP'} placeholder='Tên Dịch Vụ' name='Name' id='name'
                                value={EditData.Maid}
                                handleChange={handleInputChange} />
                            {formErrors.Name && <span className='messageError'>{formErrors.Name}</span>}

                        </div>
                        <div className="ServiceAdd-form_des">
                            <label htmlFor="Des" className='ServiceAdd-form_lb'>Mô tả:</label>
                            <Input className='ServiceAdd-form_IPdes' placeholder='Mô Tả Dịch Vụ' name='description' id='Des'
                                value={EditData.description}
                                handleChange={handleInputChange} />
                        </div>
                        <div className="ServiceAdd-form_QT">Quy tắc cấp số</div>
                        <div className="ServiceAdd-numbernext">
                            <div className="ServiceAdd-numbernext_lb">
                                <Input
                                    type='checkbox'
                                    name='autoIncrement'
                                    checked={EditData.autoIncrement}
                                    handleChange={handleCheckboxChange}
                                />
                                Tăng tự động từ:

                            </div>

                            <div className="inputss">

                                <Input className='ServiceAdd-numbernext_IP' placeholder='0001' name='increaseStart'
                                    value={EditData.increaseStart}
                                    handleChange={handleInputChange} />
                                <b>Đến</b>
                                <Input className='ServiceAdd-numbernext_IP' placeholder='1000' name='increaseEnd'
                                    value={EditData.increaseEnd}
                                    handleChange={handleInputChange} />
                            </div>

                        </div>
                        <div className="ServiceAdd-Prefix">
                            <div className="ServiceAdd-numbernext_lb">
                                <Input
                                    type='checkbox'
                                    name='PrefixCB'
                                    checked={!!EditData.PrefixCB}
                                    handleChange={handleCheckboxChange}
                                />
                                Prefix:
                            </div>

                            <Input className='ServiceAdd-numbernext_IP' placeholder='0001' name='Prefix'
                                value={EditData.Prefix}
                                handleChange={handleInputChange}
                            />
                        </div>
                        <div className="ServiceAdd-Surfix">
                            <div className="ServiceAdd-numbernext_lb">
                                <Input
                                    type='checkbox'
                                    name='SurfixCB'
                                    checked={!!EditData.SurfixCB}
                                    handleChange={handleCheckboxChange}
                                />
                                Surfix:
                            </div>
                            <Input
                                className='ServiceAdd-numbernext_IP'
                                placeholder='0001'
                                name='Surfix'
                                value={EditData.Surfix}
                                handleChange={handleInputChange}
                            />
                        </div>


                        <div className="ServiceAdd-reset"></div>
                        <Button className='btnform-exit' onclick={() => navigate("/Service")}>Hủy Bỏ</Button>
                        <Button type='submit' className='btnform-add'>Cập Nhật</Button>
                    </form>
                </div >
            </div >
        </>
    );
};

export default ServiceEdit;
