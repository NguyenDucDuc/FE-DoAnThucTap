import { Button, Col, InputNumber, Row } from 'antd'
import './card-product-checkout.style.scss'
import API, { AuthApi, endpoints } from '../../configs/API';
import { RootState, useAppDispatch } from '../../store/store';
import { deleteProductCart, getAllProductCartAsyncThunk, incOrDecTotalPriceRedux, updateQuantityAsyncThunk, updateTotalPriceRedux, updateTotalProductCheckout } from '../../slices/product-cart.slice';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


interface IProps {
    id: number;
    image: string;
    price: number;
    name: string;
    quantity: number;
    productId: number
}

export const CardProductCheckout: React.FC<IProps> = ({ id, name, image, price, quantity, productId }) => {
    const dispatch = useAppDispatch()
    const totalPrice = useSelector((state: RootState) => state.productCart.totalPice)
    const [newQuantity, setNewQuantity] = useState<number>(quantity)
    const [isDisableInput, setIsDisableInput] = useState<boolean>(false)

    const handleStep = async (val: any, info: any) => {
        setIsDisableInput(true)
        const resCart = await AuthApi().get(endpoints.cart.getDetail)
       
        // const resChangeQuantity = await API.post(endpoints.productCart.updateQuantity, {
        //     productId: productId,
        //     cartId: resCart.data.data.id,
        //     quantity: Number(val)
        // })
        const reqBody = {
            productId,
            quantity: val,
            cartId: resCart.data.data.id
        } 
        if(info.type === 'up'){
            dispatch(updateTotalProductCheckout(1))
            setNewQuantity(val)
            dispatch(incOrDecTotalPriceRedux(price))
            dispatch(updateQuantityAsyncThunk(reqBody))
            // dispatch lại get all
        }
        if(info.type === 'down'){
            setNewQuantity(val)
            dispatch(updateQuantityAsyncThunk(reqBody))
            dispatch(updateTotalProductCheckout(-1))
            dispatch(incOrDecTotalPriceRedux(-(price)))
            // dispatch lai get all
        }
        setIsDisableInput(false)
    }

    const handleDelete = async () => {
        // lấy thông tin giỏ hàng
        const resCart = await AuthApi().get(endpoints.cart.getDetail)
        const reqBody = {
            productId: productId,
            cartId: resCart.data.data.id,
        }
        // update lai tong sp
        dispatch(updateTotalProductCheckout(-newQuantity))
        // update lai gia tien
        dispatch(updateTotalPriceRedux(totalPrice - (price*newQuantity)))
        //
        await dispatch(deleteProductCart(reqBody))
        //
        // dispatch(getAllProductCartAsyncThunk())
    }
    return (
        <div className='card-product-checkout'
            style={{
            }}
        >
            <Row>
                <Col span={4}>
                    <img src={image} style={{ width: 79, height: 79, marginTop: 10 }} />
                </Col>
                <Col span={6}>
                    <p style={{ fontWeight: 'bold', marginTop: 40 }}>{name}</p>
                </Col>
                <Col span={6}>
                    <p style={{ textAlign: 'center', marginTop: 40, color: '#00b386', fontWeight: 'bold' }}>{price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}</p>
                </Col>
                <Col span={4} style={{ marginTop: 35 }}>
                    <InputNumber min={1} max={200} value={quantity}  onStep={handleStep} />
                </Col>
                <Col span={4} style={{ marginTop: 35 }}>
                    <Button style={{ background: '#00b386', width: '70%' }} type='primary' onClick={handleDelete}>Xóa</Button>
                </Col>
            </Row>
        </div>
    )
}