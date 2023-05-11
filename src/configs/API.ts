import axios from "axios";

export const endpoints = {
    user: {
        login: "/auth/login",
        currentUser: "/user/current-user"
    },
    product: {
        getAll: "/product",
        create: "/product",
        totalProduct: "/product/total"
    },
    productCart: {
        getAll: "/product-cart",
        getByCartId: (cartId: number) => `/product-cart/${cartId}`,
        add: "/product-cart",
        updateQuantity: "/product-cart/change-quantity",
        delete: "/product-cart/delete",
    },
    cart: {
        getDetail: "/cart/get-detail"
    },
    category: {
        getAll: "/category"
    },
    orderDetail: {
        checkout: '/order-detail',
        stats: '/order-detail/stats-total-price'
    },
    order: {
        create: '/order'
    }
}

export const AuthApi = () => {
    return axios.create({
        baseURL: "http://localhost:3005/",
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
}

export const AuthAdminApi = () => {
    return axios.create({
        baseURL: "http://localhost:3005/",
        headers: {
            "authorization": `Bearer ${localStorage.getItem('accessTokenAdmin')}`
        }
    })
}

export default axios.create({
    baseURL: "http://localhost:3005/"
})