import { AppstoreOutlined, BuildOutlined, GifOutlined, LoginOutlined, LogoutOutlined, MailOutlined, MenuOutlined, SignalFilled, UserOutlined } from '@ant-design/icons';
import { Col, Menu, MenuProps, Row, Spin, notification } from 'antd'
import { useEffect, useState } from 'react';
import "./header.style.scss"
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../store/store';
import { Link, useNavigate } from 'react-router-dom';
import { getAllProductCartAsyncThunk } from '../../slices/product-cart.slice';
import API, { AuthApi, endpoints } from '../../configs/API';
import { logOutUserRedux, updateUsernameRedux } from '../../slices/user.slice';
import { getAllProductAsyncThunk } from '../../slices/product.slice';
import { end } from '@cloudinary/url-gen/qualifiers/textAlignment';

export const Header = () => {
    const user = useSelector((state: RootState) => state.user)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const dispatch = useAppDispatch()
    const [categories, setCategories] = useState<any[]>([])
    const [api, contextHolder] = notification.useNotification()
    useEffect(() => {
        const getAllProductCart = () => {
            dispatch(getAllProductCartAsyncThunk())
        }

        const getUserInfo = async () => {
            const resCurrentUser = await AuthApi().get(endpoints.user.currentUser)
            dispatch(updateUsernameRedux(resCurrentUser.data.data))
        }

        const getAllCategory = async () => {
            const res = await API.get(endpoints.category.getAll)
            console.log(res.data)
            setCategories(res.data)
        }

        getAllCategory()
        getUserInfo()
        getAllProductCart()
        setIsLoading(false)
    }, [])
    const nav = useNavigate()
    const goToLogin = () => {
        if (user.username === "Đăng nhập")
            nav('/login')
        else
            return
    }
    /**
     * set up menu
     */
    const items: any = categories !== undefined && (categories.map((item) => {
        return {
            label: `${item.name}`,
            key: `${item.id}`,
            icon: <BuildOutlined />,
            onClick: () => {
                dispatch(getAllProductAsyncThunk(`${endpoints.product.getAll}?category=${item.id}`))
            },
        }
    }))
    items.push({
        label: `Đăng ký`,
        key: `Register`,
        icon: <UserOutlined />,
        onClick: () => {
            nav('/register')
        },
    })
    items.push(
        user.fullName !== "" ?
            {
                label: <Link to="/login" style={{ color: 'black' }}>{user.fullName}</Link>,
                key: 'user',
                icon: <UserOutlined />,
                children: [
                    {
                        label: <Link to='/login'>Đăng xuất</Link>,
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        onClick: async () => {
                            await dispatch(logOutUserRedux())
                            localStorage.removeItem('accessToken')
                            localStorage.removeItem('accessTokenAdmin')
                            api.success({
                                message: "Thông báo",
                                description: "Đăng xuất thành công ",
                                duration: 3
                            });
                        }
                    },
                ]
            } :
            {
                label: <Link to='/login'>Chưa đăng nhập</Link>,
                key: 'login',
                icon: <LoginOutlined />,
            },
    )
    // const items: MenuProps['items'] = [
    //     {
    //         label: 'Máy móc',
    //         key: 'mail',
    //         icon: <MailOutlined />,
    //         onClick: () => {
    //             dispatch(getAllProductAsyncThunk(`${endpoints.product.getAll}?category=${2}`))
    //         }
    //     },
    //     {
    //         label: 'Phụ kiện',
    //         key: '1',
    //         icon: <AppstoreOutlined />,
    //         onClick: () => {
    //             dispatch(getAllProductAsyncThunk(`${endpoints.product.getAll}?category=${1}`))
    //         }
    //     },
    //     {
    //         label: 'Đồ bảo hộ',
    //         key: '2',
    //         icon: <AppstoreOutlined />,
    //         onClick: () => {
    //             dispatch(getAllProductAsyncThunk(`${endpoints.product.getAll}?category=${4}`))
    //         }
    //     },
    //     {
    //         label: 'Thiết bị công trình',
    //         key: '3',
    //         icon: <AppstoreOutlined />,
    //         onClick: () => {
    //             dispatch(getAllProductAsyncThunk(`${endpoints.product.getAll}?category=${3}`))
    //         }
    //     },
    // user.fullName !== "" ? 
    // {
    //     label: <Link to="/login" style={{color: 'black'}}>{user.fullName}</Link>,
    //     key: 'user',
    //     icon: <UserOutlined />,
    //     children: [
    //         {
    //             label: <Link to='/login'>Đăng xuất</Link>,
    //             key: 'logout',
    //             icon: <LogoutOutlined />,
    //             onClick: async () => {
    //                 await dispatch(logOutUserRedux())
    //                 localStorage.removeItem('accessToken')
    //                 api.success({
    //                     message: "Thông báo",
    //                     description: "Đăng xuất thành công ",
    //                     duration: 3
    //                   });
    //             }
    //         },
    //     ]
    // } :  
    // {
    //     label: <Link to='/login'>Chưa đăng nhập</Link>,
    //     key: 'login',
    //     icon: <LoginOutlined />,
    // },

    // ];

    const [current, setCurrent] = useState('mail');

    const onClick: MenuProps['onClick'] = (e) => {
        console.log('click ', e);
        setCurrent(e.key);
    };

    if (isLoading) {
        return (<Spin tip="Loading..." style={{
            height: 600,
            marginTop: 200,
            width: '100%'
        }} size='large' />)
    }
    return (
        <div className="header" style={{ paddingTop: 20 }}>
            <div className='header-child'>
                <Row>
                    <Col span={8}>
                        <h2 style={{ color: '#00b386' }}>Sale Machine App</h2>
                    </Col>
                    <Col span={13}>
                        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
                    </Col>
                    <Col span={3}>
                        <img style={{ width: 55, height: 55, borderRadius: 50, border: '2.5px solid black', marginLeft: -15, marginTop: -5, objectFit: 'cover' }} src={user.avatar} />
                    </Col>
                </Row>
            </div>
        </div>
    )
}