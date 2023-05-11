import { AppstoreOutlined, ArrowUpOutlined, DeleteOutlined, EyeOutlined, MailOutlined, MoneyCollectOutlined, SettingOutlined, ShoppingOutlined } from "@ant-design/icons";
import { Card, Col, Menu, MenuProps, Row, Statistic } from "antd"
import { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AuthAdminApi, AuthApi, endpoints } from "../../configs/API";


type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps['items'] = [
  getItem(<Link to='/admin/home'>Thống kê doanh thu</Link>, '1', <MoneyCollectOutlined />),
  getItem(<Link to='/admin/home'>Quản lý sản phẩm</Link>, '2', <ShoppingOutlined />, [
    getItem(<Link to='/admin/add-product'>Thêm sản phẩm mới</Link>, '3', <EyeOutlined />),
    getItem(<Link to='/admin/delete-product'>Xóa sản phẩm</Link>, '4', <DeleteOutlined />),
  ])
];


export const Dashboard = () => {
  const nav = useNavigate()
  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
  };
  useEffect(() => {
    const checkRole = async () => {
      try {
        const res = await AuthAdminApi().get('/user/is-admin')
        console.log(res.data)
        if (res.data.data === false) {
          nav('/admin/forbidden')
        }
      } catch (error) {
        nav('/admin/forbidden')

      }
    }
    checkRole()
  }, [])
  return (
    <div>
      <Row>
        <Col span={4}>
          <Menu
            onClick={onClick}
            style={{ width: 256 }}
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
          />
        </Col>
        <Col span={20}>
          <div className="dashboard-right" style={{
            width: '95%',
            margin: '0 auto',
            background: '#f2f2f2'
          }}>

            <Outlet />
          </div>
        </Col>
      </Row>
    </div>
  )
}