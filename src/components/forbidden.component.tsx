import { Button } from "antd"
import { useNavigate } from "react-router-dom"



export const Forbidden = () => {
    const nav = useNavigate()
    return (
        <div>
            <img src="../images/forbidden.png" style={{
                marginLeft: 440,
                marginTop: 60
            }} />
            <h1 style={{textAlign: 'center'}}>BẠN KHÔNG ĐƯỢC PHÉP TRUY CẬP</h1>
            <Button onClick={() => nav('/admin/login')} type="primary" style={{
                marginLeft:630  ,
                background: "#00cc99"
            }}>Đăng nhập với quyền admin</Button>
        </div>
    )
}