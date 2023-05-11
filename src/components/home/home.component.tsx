import { Badge, Card, Col, Pagination, Row, Spin } from "antd"
import { CardProduct } from "../card-product/card-product.component"
import "./home.style.scss"
import { ShoppingCartOutlined } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { RootState, useAppDispatch } from "../../store/store"
import { useEffect, useState } from "react"
import API, { endpoints } from "../../configs/API"
import { CardProductV2 } from "../card-product-v2/card-product-v2.component"
import { getAllProductCartAsyncThunk } from "../../slices/product-cart.slice"
import { getAllProductAsyncThunk } from "../../slices/product.slice"


export const Home = () => {
    const nav = useNavigate()
    const user = useSelector((state: RootState) => state.user)
    const dispatch = useAppDispatch()
    const [products, setProducts] = useState<any[]>([])
    const [page, setPage] = useState(-1)
    const [pageSize, setPageSize] = useState(-1)
    const [totalProduct, setTotalProduct] = useState(0)
    const listProduct = useSelector((state: RootState) => state.product.listProduct)
    const goToCheckout = () => {
        nav('/checkout')
    }
    const handlePageChange = (page: any, pageSize: any) => {
        setPage(page)
        setPageSize(pageSize)
    }
    const totalProductInCart = useSelector((state: RootState) => state.productCart.totalProduct)

    useEffect(() => {
        const getTotalProduct = async () => {
            const res = await API.get(endpoints.product.totalProduct)
            console.log(res.data)
            setTotalProduct(res.data.data)
        }
        const getAllProducts = async () => {
            let url = `${endpoints.product.getAll}?`
            if (page !== -1)
                url += `page=${page}`
            if (pageSize !== -1)
                url += `&limit=${pageSize}`
            // const res = await API.get(url)
            // setProducts(res.data.data)
            dispatch(getAllProductAsyncThunk(url))
        }
        getTotalProduct()
        getAllProducts()
    }, [page, pageSize])

    if (user.status === "pending")
        return <Spin size="large" tip="Loading..." style={{ width: '100%', height: '600px', marginTop: 200 }} />

    return (
        <div className="home">
            <Row>
                <Col span={6}>
                    <div className="home-side-bar">
                        <h4 style={{
                            marginLeft: 30,
                            paddingTop: 30,
                            paddingBottom: 30
                        }}>Một số dịch vụ chúng tôi cam kết</h4>
                        <div className="archive">
                            <p>Sản phẩm chính hãng, chất lượng</p>
                        </div>
                        <div className="archive">
                            <p>Bảo hành 2 năm</p>
                        </div>
                        <div className="archive">
                            <p>1 đổi 1 trong năm đầu tiên</p>
                        </div>
                        <div className="archive">
                            <p>Sữa chữa tận nơi</p>
                        </div>
                    </div>
                </Col>
                <Col span={18}>
                    <div className="home-pagination">
                        <Row>
                            <Col span={20}>
                                {
                                    totalProduct !== 0 ?
                                        <Pagination defaultCurrent={1} pageSize={5} total={totalProduct} style={{ color: '#00b386', border: '#00b386' }} onChange={handlePageChange} />
                                        :
                                        null
                                }
                            </Col>
                            <Col span={4}>
                                <Badge count={totalProductInCart} style={{ background: '#00b386', cursor: 'pointer' }}>
                                    <ShoppingCartOutlined style={{
                                        fontSize: 30,
                                        color: '#00b386'
                                    }} onClick={goToCheckout} />
                                </Badge>
                            </Col>
                        </Row>
                    </div>
                    <div className="home-product">
                        <Row>
                            {listProduct.length > 0 ?
                                listProduct.map((productItem: any, idx) =>

                                    <Col span={8} key={idx}>
                                        <CardProductV2 key={idx} like={productItem.like} name={productItem.name} price={productItem.price} id={productItem.id} image={productItem.image} />
                                    </Col>
                                )
                                :
                                null
                            }
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}