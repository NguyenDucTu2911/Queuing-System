import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/container/Header/Header';
import Navbar from '../../../../components/container/nav/navbar';
import { Input } from '../../../../components/container/Input/Input';
import { Button } from '../../../../components/container/Button/Button';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';
import { Account, updateRole } from '../../../../redux/Slices/accountSlice';
import useSessionStorage from '../../../../components/customHook/useSessionStorage';

interface RoleManagementUpdateProps { }

const RoleManagementUpdate: React.FC<RoleManagementUpdateProps> = (props) => {
    const Role = useAppSelector((state: RootState) => state.account.Account)
    const [RoleData, setRoleData] = useState<Partial<Account>>({})
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    console.log(RoleData)
    const [selectAll, setSelectAll] = useState(false);



    useEffect(() => {
        fetchRole(id)
    }, [id])

    const fetchRole = (id: any) => {
        const data = Role.find((item) => item && item.id === id)
        if (data) {
            setRoleData(data as Account)
        }
        return data;
    }

    const handleSelectAllChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.name;
        const isChecked = event.target.checked;
        console.log("ádkhaks", checkboxName)
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

    const handleUpdate = () => {
        if (RoleData && RoleData.Name && RoleData.description) {
            console.log(RoleData)
            dispatch(updateRole(RoleData as Account))
            navigate("/RoleManagement")
        }
    }

    return (
        <>
            <div className="RoleManagementAdd">
                <Header />
                <Navbar />
                <div className="RoleManagementAdd-title">Danh sách vai trò</div>
                <form onSubmit={handleUpdate}>
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
                        <Button type='submit' className='btnform-add'>Cập Nhật</Button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default RoleManagementUpdate;
