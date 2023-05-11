import { ArrowUpOutlined } from "@ant-design/icons"
import { Card, Col, Row, Statistic } from "antd"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useEffect, useState } from "react";
import { Bar, Line } from 'react-chartjs-2';
import { AuthApi, endpoints } from "../../configs/API";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    PointElement
);



export const HomeDashboard = () => {
    const [stats, setStats] = useState<any[]>([])
    const data: any = {
        labels: stats.length > 0 ? stats.map((item) => item.month) : null,
        datasets: [
            {
                label: 'Tổng doanh thu mỗi tháng',
                data: stats.length > 0 ?stats.map((item) => item.total) : null,
                backgroundColor: '#008ae6',
                boderRadius: 5,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
        ],
    };
    const dataLine: any = {
        labels: stats.length > 0 ? stats.map((item) => `Tháng ${item.month}`) : null,
        datasets: [
            {
                label: 'Tổng doanh thu mỗi tháng',
                data: stats.length > 0 ? stats.map((item) => item.total) : null,
                backgroundColor: '#ff1a8c',
                borderColor: '#ff1a8c',
                borderWidth: 2,
                tension: 0.4
            }
        ],
    };

    useEffect(() => {
        const getTotalStats = async () => {
            const res = await AuthApi().get(endpoints.orderDetail.stats)
            console.log(res.data)
            setStats(res.data.data)
        }
        getTotalStats()
    }, [])
    return (
        <div>
            <Row gutter={[60, 0]} style={{
                paddingTop: 80,
                width: '95%',
                margin: '0 auto'
            }}>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Tổng số sản phẩm"
                            value={28}
                            valueStyle={{ color: '#ff1a8c' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số người đã mua"
                            value={19}
                            valueStyle={{ color: '#ff1a8c' }}
                        />
                    </Card>
                </Col>
                <Col span={8}>
                    <Card bordered={false}>
                        <Statistic
                            title="Số đơn hoàn lại"
                            value={0}
                            valueStyle={{ color: '#ff1a8c' }}
                        />
                    </Card>
                </Col>
            </Row>
            <Row style={{
                width: '90%',
                margin: '0 auto',
                height: 560
            }}>
                <Col span={9} style={{
                    marginTop: 50,
                }}>
                    <div className=""
                        style={{
                            width: '100%',
                            background: 'white',
                            height: 400,
                            borderRadius: 10
                        }}
                    >
                        <Bar data={data} />

                    </div>
                </Col>
                <Col span={1}></Col>
                <Col span={14} style={{
                    marginTop: 50
                }}>
                    <div className=""
                        style={{
                            width: '100%',
                            background: 'white',
                            height: 400,
                            borderRadius: 10
                        }}
                    >
                        <Line data={dataLine} />
                    </div>
                </Col>
            </Row>
        </div>
    )
}