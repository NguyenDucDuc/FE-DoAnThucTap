import { Button, Col, Form, Input, Row, Select, Spin } from "antd"
import { useEffect, useState } from "react";
import { AuthApi, endpoints } from "../../configs/API";
import axios from "axios";



export const AddProductAdmin = () => {
    console.log("khai bao bien")
    const [category, setCategory] = useState<any[]>([])
    const [image, setImage] = useState<any>()
    const [status, setStatus] = useState<boolean>(false)
    const onFinish = async (values: any) => {
        setStatus(true)
        const formData = new FormData()
        formData.append('upload_preset', 'testuploadimage')
        formData.append('file', image)
        const res = await axios.post('https://api.cloudinary.com/v1_1/dlyeizufn/image/upload', formData)
        const resCreateProduct = await AuthApi().post(endpoints.product.create, {
            category: values.category,
            name: values.name,
            price: values.price,
            image: res.data.secure_url
        })
        console.log(resCreateProduct.data)
        setStatus(false)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    useEffect(() => {
        console.log("trong use effect")
        const getAllCategory = async () => {
            const res = await AuthApi().get(endpoints.category.getAll)
            setCategory(res.data)
        }
        getAllCategory()
    }, [])
    if(status === true){
        return <Spin size="large" tip="Đang tạo sản phẩm..." style={{width: '100%', marginTop: 250, background: 'white'}} />
    }
    return (
        <div className=""
            style={{
                background: 'white'
            }}
        >
            <h1>Thêm sản phẩm</h1>
            <Row style={{ marginTop: 100, background: 'white' }}>
                <Col span={12} style={{ marginTop: 50 }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Tên sản phẩm"
                            name="name"
                            rules={[{ required: true, message: 'Please input your product name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Giá bán"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Chọn hình sản phẩm"
                            name="image"
                            rules={[{ required: true, message: 'Please choose your product image!' }]}
                        >
                            <Input type="file" onChange={(e: any) => setImage(e.target.files[0])} />
                        </Form.Item>

                        <Form.Item
                            label="Chọn loại sản phẩm"
                            name="category"
                            rules={[{ required: true, message: 'Please choose your product image!' }]}
                        >
                            <Select>
                                {category && category.map((item: any) => <Select.Option value={item.id}>{item.name}</Select.Option>)}
                            </Select>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{
                                background: '#00cc99',
                                width: 200
                            }}>
                                Thêm sản phẩm
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12} style={{ marginTop: -100, background: 'white' }}>
                    <img src="../images/add-product.png" style={{ width: '100%', height: 500 }} />
                </Col>
            </Row>
        </div>
    )
}