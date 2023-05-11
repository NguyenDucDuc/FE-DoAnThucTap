import { Outlet } from "react-router-dom"
import { Header } from "../header/header.component"
import { useEffect, useState } from "react"
import { RootState, useAppDispatch } from "../../store/store"
import { useSelector } from "react-redux"
import { updateTotalPriceRedux } from "../../slices/product-cart.slice"



export const BaseLayout = () => {
    const dispatch = useAppDispatch()
    const listProductCart = useSelector((state: RootState) => state.productCart.listProduct)
    const totalProduct = useSelector((state: RootState) => state.productCart.totalProduct)
    const totalPriceRedux = useSelector((state: RootState) => state.productCart.totalPice)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    useEffect(() => {
        const calcTotalPrice = async () => {
            let totalPr = 0
            await Promise.all(listProductCart.map((item) => totalPr += (item.price * item.quantity)))
            setTotalPrice(totalPr)
            await dispatch(updateTotalPriceRedux(totalPr))
            setIsLoading(false)
        }

        calcTotalPrice()
    }, [])
    return (
        <div className="base-layout">
            <Header />
            <Outlet />
        </div>
    )
}