import { Button, Checkbox, Col, Form, Input, Row, notification } from 'antd'
import './login.style.scss'
import { useAppDispatch } from '../../store/store';
import { loginAsyncThunk } from '../../slices/user.slice';
import { useNavigate } from 'react-router-dom';
import { getAllProductCartAsyncThunk } from '../../slices/product-cart.slice';


export const Login = () => {
    const [api, contextHolder] = notification.useNotification();
    const dispatch = useAppDispatch()
    const nav = useNavigate()
    const handleLogin = async (values: any) => {

        const reqBody = {
            username: values.username,
            password: values.password
        }
        if (values.username !== undefined && values.password !== undefined) {
            const dp: any = await dispatch(loginAsyncThunk(reqBody))
           
            console.log(dp.payload)
            if (dp.payload.status === 400) {
                api.error({
                    message: 'Thông báo',
                    description: `${dp.payload.error}`,
                    duration: 4
                  });
            } else {
                api.success({
                    message: 'Thông báo',
                    description: `Đăng nhập thành công`,
                    duration: 4
                  });
                localStorage.setItem('accessToken', dp.payload.access_token)
                dispatch(getAllProductCartAsyncThunk())
                setTimeout(() => {
                    nav('/')
                },1000)
            }

        }

    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (

        <div className='login'>
            {contextHolder}
            <Row>
                <Col span={12} style={{
                    marginTop: 200
                }}>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 600 }}
                        initialValues={{ remember: true }}
                        onFinish={handleLogin}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        size='large'
                    >
                        <Form.Item
                            label="Username"
                            name="username"
                            rules={[{ required: true, message: 'Please input your username!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[{ required: true, message: 'Please input your password!' }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button onClick={handleLogin} type="primary" htmlType="submit" style={{ width: 160, background: '#00b386' }}>
                                Đăng nhập
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <img src='./images/login.png' style={{ width: '100%' }} />
                </Col>
            </Row>
        </div>
    )
}