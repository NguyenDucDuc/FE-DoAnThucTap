import { Button, Checkbox, Col, Form, Input, Row, notification } from "antd"
import API, { endpoints } from "../../configs/API";
import { useNavigate } from "react-router-dom";
import './login-admin.style.scss'


export const LoginAdmin = () => {
    const [api, contextHolder] = notification.useNotification()
    const nav = useNavigate()
    const onFinish = async (values: any) => {
        const res = await API.post(endpoints.user.login, {
            username: values.username,
            password: values.password
        })
        console.log(res.data)
        if (res.data.status === 200) {
            if (res.data.data.role === "ADMIN") {
                localStorage.setItem('accessTokenAdmin', res.data.data.access_token)
                api.success({
                    message: `Thông báo`,
                    description: 'Đăng nhập admin thành công!!!',
                    duration: 4
                });
                setTimeout(() => {
                    nav('/admin')
                }, 1500)
            } else {
                api.error({
                    message: `Thông báo`,
                    description: 'Tài khoản không phải admin!!!',
                    duration: 4
                });
            }

        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    return (

        <div style={{
            width: '60%',
            background: 'white',
            height: 400,
            margin: '0 auto',
        }}>
            {contextHolder}
            <Row>
                <Col span={24}
                    style={{
                        marginTop: 150,
                        width: '80%',
                        height: 400,
                        borderRadius: 10

                    }}
                    className="box-shadow"
                >
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{
                            maxWidth: 600,
                            marginTop: 100,
                            marginLeft: 100
                        }}
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
                            label="Mật khẩu"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Nhớ mật khẩu</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{
                                background: '#00cc99',
                                width: 150
                            }}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    )
}