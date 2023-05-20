import React, { useState } from 'react';
import { Pagination, Space, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { TableRowSelection } from 'antd/es/table/interface';
import { useAppSelector } from '../../../redux/hooks';
import { RootState } from '../../../redux/store';
interface TabledeviceProps { }
interface DataType {
    // key: React.Key;
    id: string,
    Name?: string,
    Address?: string,
    Active?: string,
    MaID?: string,
    Connect?: string,
    Sevice?: string
}

const TableDevice: React.FC<TabledeviceProps> = (props) => {
    const device = useAppSelector((state: RootState) => state.device.Device)
    const [currentPage, setCurrentPage] = useState(1);

    let data = device.concat(device).concat(device).concat(device).concat(device).concat(device).concat(device).concat(device).concat(device)
    const pageSize = 5;
    const handleChangePage = (page: any) => {
        setCurrentPage(page);
    };
    const handleDetail = (e: any) => {
        console.log(e)
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Mã Thiết Bị',
            dataIndex: 'MaID',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Tên Thiết Bị',
            dataIndex: 'Name',
        },
        {
            title: 'Địa chỉ Ip',
            dataIndex: 'Address',
        },
        {
            title: 'Trạng Thái Hoạt Động',
            dataIndex: 'Active',
            render: (text: string) => <a>{text}</a>,
        },
        {
            title: 'Trạng Thái Kết Nối',
            dataIndex: 'Connect',
        },
        {
            title: 'Dịch Vụ Sủ Dụng',
            dataIndex: 'Sevice',
        },
        {
            title: '',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <a onClick={() => handleDetail(record)}>Chi Tiết </a>
                    <a>Cập Nhật </a>
                </Space>
            ),
        },
    ];

    const paginatedData = data.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );
    return (
        <>
            <Table
                columns={columns}
                dataSource={paginatedData}
                pagination={false}
            />
            <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={data.length}
                onChange={handleChangePage}
            />
        </>
    );
};

export default TableDevice;
