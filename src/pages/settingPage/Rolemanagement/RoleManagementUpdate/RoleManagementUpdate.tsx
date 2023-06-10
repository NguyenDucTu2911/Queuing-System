import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../../../components/container/header/Header';
import Navbar from '../../../../components/container/nav/navbar';
import { Input } from '../../../../components/container/Input/Input';
import { Button } from '../../../../components/container/button/Button';
import { useAppDispatch, useAppSelector } from '../../../../redux/Hooks';
import { RootState } from '../../../../redux/Store';
import { Account, updateRole } from '../../../../redux/slices/AccountSlice';
import useSessionStorage from '../../../../components/customHook/useSessionStorage';
import { validationRoleManagement } from '../roleManagementAdd/RoleManagementAdd';

interface RoleManagementUpdateProps { }

const RoleManagementUpdate: React.FC<RoleManagementUpdateProps> = (props) => {
    const Role = useAppSelector((state: RootState) => state.account.Account)
    const [RoleData, setRoleData] = useState<Partial<Account>>({})
    const [RoleDataError, setRoleDataError] = useState<Partial<validationRoleManagement>>({})
    const { id } = useParams()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    console.log(RoleData)

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
        const { checked, name } = event.target;
        if (name === "All-A") {
            setRoleData((prevData) => ({
                ...prevData,
                quyenax: checked,
                quyenay: checked,
                quyenaz: checked,

            }));
        } else {
            setRoleData((prevData) => ({
                ...prevData,
                quyenBx: checked,
                quyenBy: checked,
                quyenBz: checked,
            }));
        }
    };

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checkboxName = event.target.name;
        const isChecked = event.target.checked;
        setRoleData({ ...RoleData, [checkboxName]: isChecked, });
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        const errors: Partial<validationRoleManagement> = {};

        switch (name) {
            case "Name":
                errors.Name = value.length < 5 ? "Tên vai trò ít nhất 5 ký tự" : undefined;
                break;
            case "description":
                errors.description = value ? "" : "Vui lòng nhập Mô tả";
                break;
            default:
                break;
        }

        setRoleDataError(errors);
        setRoleData({
            ...RoleData,
            [name]: value
        })
    }

    const handleUpdate = async (event: React.FormEvent<HTMLElement>) => {
        event.preventDefault();
        const errors: Partial<validationRoleManagement> = {};

        if (!RoleData.Name) {
            errors.Name = "Vui lòng nhập tên vai trò"
        }

        if (!RoleData.description) {
            errors.description = "Vui lòng nhập Mô tả"
        }

        if (!RoleData.quyenax && !RoleData.quyenay && !RoleData.quyenaz) {
            errors.RoleGroupA = "Chọn ít nhất một chức năng trong nhóm chức năng A"
        }

        if (!RoleData.quyenBx && !RoleData.quyenBy && !RoleData.quyenBz) {
            errors.RoleGroupB = "Chọn ít nhất một chức năng trong nhóm chức năng B"
        }

        setRoleDataError(errors);

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
                            <Input className={`RoleManagementAdd-form_IPName ${RoleDataError.Name ? 'error' : ''}`}
                                placeholder='Nhập Vai Trò' name='Name'
                                value={RoleData.Name}
                                handleChange={handleInputChange}
                            />
                            {RoleDataError.Name && <span className='textError'>{RoleDataError.Name}</span>}
                        </div>
                        <div className="RoleManagementAdd-form_des">
                            <label className='RoleManagementAdd-form_LB'>Mô Tả
                                <p className='errorStart'>*</p>
                            </label>
                            <Input className={`RoleManagementAdd-form_IPDes ${RoleDataError.description ? 'error' : ''}`}
                                placeholder='Nhập Mô Tả' name='description' value={RoleData.description}
                                handleChange={handleInputChange}
                            />
                            {RoleDataError.description && <span className='textError'>{RoleDataError.description}</span>}
                        </div>
                        <div className="RoleManagementAdd-form_role-LB RoleManagementAdd-form_LB">
                            Phân quyền chức năng<p className='errorStart'>*</p>
                        </div>
                        <div className="RoleManagementAdd-form_role">

                            <div className="role-Title">Nhóm chức năng A</div>
                            <div className="role-itemAll">
                                <input
                                    type='checkbox'
                                    className='CheckBox'
                                    name='All-A'
                                    checked={RoleData.quyenax && RoleData.quyenay && RoleData.quyenaz}
                                    onChange={handleSelectAllChange}
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
                                        checked={RoleData.quyenBx && RoleData.quyenBy && RoleData.quyenBz}
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
