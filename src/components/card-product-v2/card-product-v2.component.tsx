import { Col, Modal, Rate, Row, notification } from "antd"
import "./card-product-v2.style.scss"
import { CommentOutlined, EyeOutlined, HeartFilled, HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons"
import { useAppDispatch } from "../../store/store";
import { createProductCartAsyncThunk, getAllProductCartAsyncThunk, updateTotalProduct } from "../../slices/product-cart.slice";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import { AuthApi } from "../../configs/API";
import { CardComment } from "../card-comment/card-comment.component";
import { getAllProductAsyncThunk } from "../../slices/product.slice";


interface IProps {
    id: number;
    name: string;
    price: number;
    like: number;
    image: string;

}

export const CardProductV2: React.FC<IProps> = ({ id, name, price, image, like }) => {
    const dispatch = useAppDispatch()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modal2, setModal2] = useState(false);
    const [api, contextHolder] = notification.useNotification();
    const [content, setContent] = useState('')
    const [comments, setComment] = useState<any []>([])
    const [heartFilled, setHeartFilled] = useState<boolean>(false)
    const handleAddToCart = async () => {
        const reqBody = {
            quantity: 1,
            productId: id
        }
        dispatch(updateTotalProduct())
        await dispatch(createProductCartAsyncThunk(reqBody))
        await dispatch(getAllProductCartAsyncThunk())
        api.success({
            message: `Thông báo`,
            description: ' Sản phẩm đã được thêm vào giỏ hàng.',
            duration: 4
        });
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = async () => {
        if(content !== ''){
            const res = await AuthApi().post('/comment', {
                content,
                productId: id
            })
            console.log(res.data)
            setContent('')
        }
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleCancel2 = () => {
        setModal2(false);
    };

    const showModal2 = async () => {
        const res = await AuthApi().get(`/comment/${id}/get-all`)
        console.log(res.data)
        setComment(res.data.data)
        setModal2(true);
    };

    const handleOk2 = async () => {
        
        setModal2(false);
    };

    const handleLike = async () => {
        setHeartFilled(true)
        const res = await AuthApi().post(`/product/${id}/like`, {
            like: like+1
        })
        console.log(res.data)
        await dispatch(getAllProductAsyncThunk('/product'))
        setHeartFilled(false)
    }

    return (
        <div className="card-product-v2">
            {contextHolder}
            <img style={{ width: '95%', margin: '0 2.4%', height: 300, objectFit: 'cover' }} src={image} />
            <div className="card-product-v2-content">
                <Rate defaultValue={4} style={{ fontSize: 15 }} />
                <h4>{name}</h4>
                <p style={{ fontWeight: 'bold' }}>{price} VND</p>
                <Row>
                    <Col span={4}>
                        {
                            heartFilled === true ? 
                            <><HeartFilled onClick={handleLike} style={{ fontSize: 20, color: 'red', cursor: 'pointer' }}/><span style={{marginLeft: 5}}>{like}</span></>
                            :
                            <><HeartOutlined onClick={handleLike} style={{ fontSize: 20, color: 'red', cursor: 'pointer' }}/><span style={{marginLeft: 5}}>{like}</span></>
                        }
                    </Col>
                    <Col span={4}><ShoppingCartOutlined onClick={handleAddToCart} style={{ fontSize: 20, color: '#008ae6', cursor: 'pointer' }} /></Col>
                    <Col span={4}><CommentOutlined onClick={showModal} style={{ fontSize: 20, color: '#00cc99', cursor: 'pointer' }} /></Col>
                    <Col span={4}><EyeOutlined onClick={showModal2} style={{ fontSize: 20, color: '#00cc99', cursor: 'pointer' }} /></Col>
                </Row>
            </div>
            <Modal title="Viết bình luận" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <TextArea onChange={(e) => setContent(e.target.value)} />
            </Modal>
            <Modal title="Danh sách bình luận" open={modal2} onOk={handleOk2} onCancel={handleCancel2}>
                {
                    comments.length > 0 ?
                    comments.map((item) => <CardComment id={item.id} content={item.content} createdAt={item.createdAt} user={item.user} />)
                    :
                    null
                }
            </Modal>
        </div>
    )
}