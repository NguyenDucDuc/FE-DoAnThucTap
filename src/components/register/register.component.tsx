import { Button, Checkbox, Col, Form, Input, Row, Spin } from "antd"
import axios from "axios";
import { useState } from "react";
import API from "../../configs/API";
import { useNavigate } from "react-router-dom";



export const Register = () => {
    const [avatar, setAvatar] = useState<any>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const nav = useNavigate()
    const onFinish = async (values: any) => {
        setIsLoading(true)
        const formData = new FormData()
        formData.append('upload_preset', 'testuploadimage')
        formData.append('file', avatar)
        const res = await axios.post('https://api.cloudinary.com/v1_1/dlyeizufn/image/upload', formData)
        const resUser = await API.post('/user', {
            username: values.username,
            password: values.password,
            fullName: values.fullName,
            avatar: res.data.secure_url
        })
        console.log(resUser.data)
        setIsLoading(false)
        nav('/login')
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    if(isLoading){
        return(
            <Spin size="large" tip="Đang tạo tài khoản..." style={{
                width: '100%',
                marginTop: 200
            }} />
        )
    }
    return (
        <div>
            <Row>
                <Col span={12} style={{
                    marginTop: 170
                }}>
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
                            label="Tên tài khoản"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Tên đầy đủ"
                            name="fullName"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            label="Ảnh đại diện"
                            name="avatar"
                            rules={[{ required: true, message: 'Please choose file!' }]}
                        >
                            <Input type="file" onChange={(e: any) => setAvatar(e.target.files[0])} />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{
                                background: '#00cc99',
                                width: 150
                            }}>
                                Đăng ký
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <img src="../images/add-product.png" />
                </Col>
            </Row>
        </div>
    )
}