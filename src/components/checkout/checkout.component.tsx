import { Button, Col, Row, Spin, notification } from 'antd'
import './checkout.style.scss'
import { CardProductCheckout } from '../card-product-checkout/card-product-checkout.component'
import { RootState, useAppDispatch } from '../../store/store'
import { useEffect, useState } from 'react'
import { getAllProductCartAsyncThunk, setNullProductCart, updateTotalPriceRedux } from '../../slices/product-cart.slice'
import { useSelector } from 'react-redux'
import { AuthApi, endpoints } from '../../configs/API'
import { useNavigate } from 'react-router-dom'


export const Checkout = () => {
    const [api, contextHolder] = notification.useNotification();
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const listProductCart = useSelector((state: RootState) => state.productCart.listProduct)
    const totalProduct = useSelector((state: RootState) => state.productCart.totalProduct)
    const totalPrice = useSelector((state: RootState) => state.productCart.totalPice)
    useEffect(() => {
        const calcTotalPrice = async () => {

        }
        const getAllProductCart = () => {
            dispatch(getAllProductCartAsyncThunk())
        }

        getAllProductCart()
        calcTotalPrice()
    }, [])
    const handleCheckout = async () => {
        const newOrder = await AuthApi().post(endpoints.order.create)
        await Promise.all(listProductCart.map(async (productCartItem) => {
            await AuthApi().post(endpoints.orderDetail.checkout, {
                orderId: newOrder.data.id,
                productId: productCartItem.product?.id,
                quantity: productCartItem.quantity,
                price: productCartItem.price,
                totalPrice: totalPrice
            })
        }))
        await dispatch(setNullProductCart())
        api.success({
            message: `Thông báo`,
            description: 'Đặt hàng thành công.',
            duration: 4
          });
        setTimeout(() => {
            nav('/')
        }, 1000)
    }

    return (
        <div className='checkout' style={{
            marginTop: 50
        }}
        >
            {contextHolder}
            {
                listProductCart.length > 0 ?
                    listProductCart.map((productCartItem: any, idx) =>
                        <CardProductCheckout key={idx} id={productCartItem.id}
                            image={productCartItem.product.image}
                            name={productCartItem.product.name}
                            price={productCartItem.price}
                            quantity={productCartItem.quantity}
                            productId={productCartItem.product.id}
                        />
                    )
                    :
                    null
            }

            <div className='checkout__fixed'>
                <Row style={{ marginTop: 25 }}>
                    <Col span={9}>
                    </Col>
                    <Col span={4}>
                        <h4>Tổng tiền: {totalPrice.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h4>
                    </Col>
                    <Col span={4}>
                        <h4>Tổng sản phẩm: {totalProduct}</h4>
                    </Col>
                    <Col span={4}>
                        <Button type='primary' style={{ background: '#00b386', marginTop: 5, marginLeft: 40, width: 130 }} onClick={handleCheckout}>Thanh toán</Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}