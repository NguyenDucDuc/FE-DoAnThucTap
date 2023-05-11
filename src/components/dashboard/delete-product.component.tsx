import { useEffect, useState } from "react"
import { AuthApi, endpoints } from "../../configs/API"
import { Button, Space, Tag } from "antd";
import Table, { ColumnsType } from "antd/es/table";
import axios from "axios";


interface DataType {
    id: number;
    image: string;
    name: string;
    price: number;
    createdAt: string;
}



export const DeleteProduct = () => {
    const [products, setProducts] = useState<any[]>([])
    const data: DataType[] = products
    useEffect(() => {
        const getAllProduct = async () => {
            const res = await AuthApi().get(endpoints.product.getAll)
            console.log(res.data)
            setProducts(res.data.data)
        }
        getAllProduct()
    }, [])

    const handleDelete = async (record: DataType) => {
        const newListProduct = products.filter((item) => item.id !== record.id)
        setProducts(newListProduct)
       const res = await axios.post(`http://localhost:3005/product/${record.id}/delete`)
       console.log(res.data)
    }   

    const columns: ColumnsType<DataType> = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Ảnh sản phẩm',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => {
                return (
                    <img src={record.image} style={{
                        width: 60,
                        height: 60,
                        borderRadius: 60,
                        border: '3px solid black'
                    }} />
                )
            }
        },
        {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            key: 'price',
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: '',
            dataIndex: '',
            key: '',
            render: (_, record) => {
                return (
                    <Button type="primary" style={{
                        background: '#ff1a75'
                    }}
                    onClick={() => handleDelete(record)}
                    >Xóa sản phẩm</Button>
                )
            }
        },
    ];
    return (
        <div style={{
            background: 'white'
        }}>
            <h1>Quản lý sản phẩm</h1>
            <Table columns={columns} dataSource={data} />
        </div>
    )
}