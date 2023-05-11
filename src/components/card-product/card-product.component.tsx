import { Button, Col, Rate, Row } from "antd"
import "./card-product.style.scss"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import API, { AuthApi, endpoints } from "../../configs/API";
import { getAllProductCartAsyncThunk, updateTotalProduct } from "../../slices/product-cart.slice";
import { useAppDispatch } from "../../store/store";


interface IProps {
    image?: string;
    name: string;
    price: string;
    id: number
}

export const CardProduct: React.FC<IProps> = ({name, price, id, image}) => {
    const nav = useNavigate()
    const dispatch = useAppDispatch()
    const handleGoDetail = () => {
        nav(`/product/${1}`)
    }
    const handleAddToCart = async () => {
        const res = await AuthApi().post(endpoints.productCart.add, {
            productId: id,
            quantity: 1
        })
        console.log(res.data.data)
        if(res.data.status == 200){
            dispatch(updateTotalProduct())
            dispatch(getAllProductCartAsyncThunk())
        }
    }
    return (
        <div className="card-product" >
            <div className="card-product-img" onClick={handleGoDetail}>
                <img src={image} />
            </div>
            <div className="info" style={{ marginTop: 0 }}>
                <h4 style={{textAlign: 'center'}}>{name}</h4>
                <h4 style={{ textAlign: 'center', color: '#00b386' }}>{price.toLocaleString()} VND</h4>
                <Rate defaultValue={4} style={{fontSize: 15, textAlign: 'center', marginLeft: 100, marginBottom: 30}}  />
                <Row>
                    <Col span={24}>
                        <Button type="primary" style={{
                            width: '100%',
                            background: '#00b386',
                            borderRadius: 0,
                            height: 50
                        }} icon={<ShoppingCartOutlined />}
                            onClick={handleAddToCart}
                        >Thêm vào giỏ hàng
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    )
}