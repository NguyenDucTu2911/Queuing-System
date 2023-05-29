import React, { useState } from 'react';
import "./RoleManagementAdd.scss"
import { Input } from '../../../../components/container/Input/Input';
import Header from '../../../../components/container/Header/Header';
import Navbar from '../../../../components/container/nav/navbar';
import { Button } from '../../../../components/container/Button/Button';
import { useNavigate } from 'react-router-dom';
import { Account, newRole } from '../../../../redux/Slices/accountSlice';
import { useAppDispatch } from '../../../../redux/hooks';
interface RoleManagementAddProps { }

const RoleManagementAdd: React.FC<RoleManagementAddProps> = (props) => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [RoleData, setRoleData] = useState<Partial<Account>>({
        quyenax: false,
        quyenay: false,
        quyenaz: false,
        quyenBx: false,
        quyenBy: false,
        quyenBz: false,
    })
    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.name;
        const isChecked = event.target.checked;
        if (checkboxName === "All-A") {
            setSelectAll(isChecked);
            const updatedCheckboxValues = {
                quyenax: isChecked,
                quyenay: isChecked,
                quyenaz: isChecked,
            };
            setRoleData({ ...RoleData, ...updatedCheckboxValues });
        } else {
            setSelectAll(isChecked);
            const updatedCheckboxValues = {
                quyenBx: isChecked,
                quyenBy: isChecked,
                quyenBz: isChecked,
            };
            setRoleData({ ...RoleData, ...updatedCheckboxValues });
        }

    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.name;
        const isChecked = event.target.checked;
        setRoleData({ ...RoleData, [checkboxName]: isChecked, });
        setSelectAll(Object.values(RoleData).every((value) => value));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setRoleData({
            ...RoleData,
            [name]: value
        })
    }

    const handleNewRole = () => {
        console.log("check", RoleData)
        dispatch(newRole(RoleData as Account))
        navigate("/RoleManagement")
    }

    return (
        <>
            <div className="RoleManagementAdd">
                <Header />
                <Navbar />
                <div className="RoleManagementAdd-title">Danh sách vai trò</div>
                <form onSubmit={handleNewRole}>
                    <div className="RoleManagementAdd-form">
                        <div className="RoleManagementAdd-form_title">Thông tin vai trò</div>
                        <div className="RoleManagementAdd-form_name">
                            <label className='RoleManagementAdd-form_LB'>Tên Vai Trò
                                <p className='errorStart'>*</p>
                            </label>
                            <Input className='RoleManagementAdd-form_IPName' placeholder='Nhập Vai Trò' name='Name' value={RoleData.Name}
                                handleChange={handleInputChange}
                            />
                        </div>
                        <div className="RoleManagementAdd-form_des">
                            <label className='RoleManagementAdd-form_LB'>Mô Tả
                                <p className='errorStart'>*</p>
                            </label>
                            <Input className='RoleManagementAdd-form_IPDes' placeholder='Nhập Mô Tả' name='description' value={RoleData.description}
                                handleChange={handleInputChange}
                            />
                        </div>
                        <div className="RoleManagementAdd-form_role-LB RoleManagementAdd-form_LB">
                            Phân quyền chức năng<p className='errorStart'>*</p>
                        </div>
                        <div className="RoleManagementAdd-form_role">

                            <div className="role-Title">Nhóm chức năng A</div>
                            <div className="role-itemAll">
                                <Input type='checkbox' className='CheckBox' name='All-A'
                                    checked={selectAll}
                                    handleChange={handleSelectAllChange}
                                />
                                <p className='role-item_text'>Tất cả</p>
                            </div>
                            <div className="role-itemX">
                                <Input type='checkbox' className='CheckBox' name='quyenax'
                                    checked={RoleData.quyenax}
                                    handleChange={handleCheckboxChange}
                                />
                                <p className='role-item_text'>Chức năng x</p>
                            </div>
                            <div className="role-itemY">
                                <Input type='checkbox' className='CheckBox' name='quyenay'
                                    checked={RoleData.quyenay}
                                    handleChange={handleCheckboxChange}
                                />
                                <p className='role-item_text'>Chức năng y</p>
                            </div>
                            <div className="role-itemZ">
                                <Input type='checkbox' className='CheckBox' name='quyenax'
                                    checked={RoleData.quyenaz}
                                    handleChange={handleCheckboxChange}
                                />
                                <p className='role-item_text'>Chức năng z</p>
                            </div>
                            <div className="role-b">
                                <div className="role-Title">Nhóm chức năng B</div>
                                <div className="role-itemAll">
                                    <Input type='checkbox' className='CheckBox' name='All-B'
                                        checked={selectAll}
                                        handleChange={handleSelectAllChange}
                                    />
                                    <p className='role-item_text'>Tất cả</p>
                                </div>
                                <div className="role-itemX">
                                    <Input type='checkbox' className='CheckBox' name="quyenBx"
                                        checked={RoleData.quyenBx}
                                        handleChange={handleCheckboxChange}
                                    />
                                    <p className='role-item_text'>Chức năng x</p>
                                </div>
                                <div className="role-itemY">
                                    <Input type='checkbox' className='CheckBox' name="quyenBy"
                                        checked={RoleData.quyenBy}
                                        handleChange={handleCheckboxChange}
                                    />
                                    <p className='role-item_text'>Chức năng y</p>
                                </div>
                                <div className="role-itemZ">
                                    <Input type='checkbox' className='CheckBox' name="quyenBz"
                                        checked={RoleData.quyenBz}
                                        handleChange={handleCheckboxChange}

                                    />

                                    <p className='role-item_text'>Chức năng z{RoleData.quyenaz}</p>
                                </div>
                            </div>

                        </div>
                        <Button className='btnform-exit' onclick={() => navigate("/RoleManagement")}>Hủy Bỏ</Button>
                        <Button type='submit' className='btnform-add'>Thêm</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RoleManagementAdd;
