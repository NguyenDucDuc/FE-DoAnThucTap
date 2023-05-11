import { Button, Checkbox, Col, Form, Input, Row } from "antd"
import "./add-product.style.scss"


export const AddProduct = () => {
    const onFinish = (values: any) => {
        console.log('Success:', values);
      };
      
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className="add-product">
            <Row>
                <Col span={12} style={{marginTop: 200}}>
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
                            label="Product name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your product name!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Price"
                            name="price"
                            rules={[{ required: true, message: 'Please input your price!' }]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Image"
                            name="image"
                            rules={[{ required: true, message: 'Please choose your product image!' }]}
                        >
                            <Input type="file" />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit" style={{
                                background: '#00cc99',
                                width: 200
                            }}>
                                Add product
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
                <Col span={12}>
                    <img src="./images/add-product.png" style={{ width: '100%', height: 500 }} />
                </Col>
            </Row>
        </div>
    )
}