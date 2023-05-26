import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/container/Header/Header';
import Navbar from '../../../../components/container/nav/navbar';
import { Input } from '../../../../components/container/Input/Input';
import { Button } from '../../../../components/container/Button/Button';
import { useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import { Account } from '../../../../redux/Slices/accountSlice';
import useSessionStorage from '../../../../components/customHook/useSessionStorage';

interface RoleManagementUpdateProps { }

const RoleManagementUpdate: React.FC<RoleManagementUpdateProps> = (props) => {
    const Role = useAppSelector((state: RootState) => state.account.Account)
    const [RoleData, setRoleData] = useState<Partial<Account>>({})
    const { id } = useParams()
    const navigate = useNavigate()
    // const [selectAll, setSelectAll] = useState(false);
    // const [checkboxValues, setCheckboxValues] = useState({
    //     quyenax: false,
    //     quyenay: false,
    //     quyenaz: false,
    // });
    // console.log(checkboxValues)

    // const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const isChecked = event.target.checked;
    //     setSelectAll(isChecked);
    //     const updatedCheckboxValues = {
    //         quyenax: isChecked,
    //         quyenay: isChecked,
    //         quyenaz: isChecked,
    //     };
    //     setCheckboxValues(updatedCheckboxValues);
    // };

    // const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //     const checkboxName = event.target.name;
    //     const isChecked = event.target.checked;
    //     setCheckboxValues((prevCheckboxValues) => ({
    //         ...prevCheckboxValues,
    //         [checkboxName]: isChecked,
    //     }));
    //     setSelectAll(Object.values(checkboxValues).every((value) => value));
    // };


    useEffect(() => {
        fetchRole(id)
    }, [Role, id])

    const fetchRole = (id: any) => {
        const data = Role.find((item) => item && item.id === id)
        if (data) {
            setRoleData(data as Account)
        }
        return data;
    }
    return (
        <>
            <div className="RoleManagementAdd">
                <Header />
                <Navbar />
                <div className="RoleManagementAdd-title">Danh sách vai trò</div>
                <form action="">
                    <div className="RoleManagementAdd-form">
                        <div className="RoleManagementAdd-form_title">Thông tin vai trò</div>
                        <div className="RoleManagementAdd-form_name">
                            <label className='RoleManagementAdd-form_LB'>Tên Vai Trò
                                <p className='errorStart'>*</p>
                            </label>
                            <Input className='RoleManagementAdd-form_IPName' placeholder='Nhập Vai Trò' value={RoleData.Name} />
                        </div>
                        <div className="RoleManagementAdd-form_des">
                            <label className='RoleManagementAdd-form_LB'>Mô Tả
                                <p className='errorStart'>*</p>
                            </label>
                            <Input className='RoleManagementAdd-form_IPDes' placeholder='Nhập Mô Tả' value={RoleData.description} />
                        </div>
                        <div className="RoleManagementAdd-form_role-LB RoleManagementAdd-form_LB">
                            Phân quyền chức năng<p className='errorStart'>*</p>
                        </div>
                        <div className="RoleManagementAdd-form_role">

                            <div className="role-Title">Nhóm chức năng A</div>
                            <div className="role-itemAll">
                                <Input type='checkbox' className='CheckBox' />
                                <p className='role-item_text'>Tất cả</p>
                            </div>
                            <div className="role-itemX">
                                <Input type='checkbox' className='CheckBox' />
                                <p className='role-item_text'>Chức năng x</p>
                            </div>
                            <div className="role-itemY">
                                <Input type='checkbox' className='CheckBox' />
                                <p className='role-item_text'>Chức năng y</p>
                            </div>
                            <div className="role-itemZ">
                                <Input type='checkbox' className='CheckBox' />
                                <p className='role-item_text'>Chức năng z</p>
                            </div>
                            <div className="role-b">
                                <div className="role-Title">Nhóm chức năng B</div>
                                <div className="role-itemAll">
                                    <Input type='checkbox' className='CheckBox'
                                    // checked={selectAll}
                                    // handleChange={handleSelectAllChange}
                                    />
                                    <p className='role-item_text'>Tất cả</p>
                                </div>
                                <div className="role-itemX">
                                    <Input type='checkbox' className='CheckBox' name="quyenax"
                                    // checked={checkboxValues.quyenax}
                                    // handleChange={handleCheckboxChange}
                                    />
                                    <p className='role-item_text'>Chức năng x</p>
                                </div>
                                <div className="role-itemY">
                                    <Input type='checkbox' className='CheckBox' name="quyenay"
                                    // checked={checkboxValues.quyenay}
                                    // handleChange={handleCheckboxChange} 
                                    />
                                    <p className='role-item_text'>Chức năng y</p>
                                </div>
                                <div className="role-itemZ">
                                    <Input type='checkbox' className='CheckBox' name="quyenaz"
                                        // checked={checkboxValues.quyenaz}
                                        // handleChange={handleCheckboxChange}
                                        value={RoleData.quyenaz} />

                                    <p className='role-item_text'>Chức năng z</p>
                                </div>
                            </div>

                        </div>
                        <Button className='btnform-exit' onclick={() => navigate("/RoleManagement")}>Hủy Bỏ</Button>
                        <Button type='submit' className='btnform-add'>Cập Nhật</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RoleManagementUpdate;
