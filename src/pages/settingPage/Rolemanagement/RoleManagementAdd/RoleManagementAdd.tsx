import React from 'react';
import "./RoleManagementAdd.scss"
import { Input } from '../../../../components/container/Input/Input';
import Header from '../../../../components/container/Header/Header';
import Navbar from '../../../../components/container/nav/navbar';
import { Button } from '../../../../components/container/Button/Button';
import { useNavigate } from 'react-router-dom';
interface RoleManagementAddProps { }

const RoleManagementAdd: React.FC<RoleManagementAddProps> = (props) => {
    const navigate = useNavigate()
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
                            <Input className='RoleManagementAdd-form_IPName' placeholder='Nhập Vai Trò' />
                        </div>
                        <div className="RoleManagementAdd-form_des">
                            <label className='RoleManagementAdd-form_LB'>Mô Tả
                                <p className='errorStart'>*</p>
                            </label>
                            <Input className='RoleManagementAdd-form_IPDes' placeholder='Nhập Mô Tả' />
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
