import { Col, Row } from "antd";


interface IProps {
  id: number;
  content: string;
  createdAt: string;
  user: {
    fullName: string;
    avatar: string;
  }
}

export const CardComment: React.FC<IProps> = ({ id, content, createdAt, user }) => {
  return (
    <div style={{
      marginTop: 40
    }}>
      <Row>
        <Col span={4}>
          <img src={user.avatar} style={{
            width: 60,
            height: 60,
            borderRadius: 60
          }} />
        </Col>
        <Col span={8}>
          <Row>
            <Col span={24} style={{ fontWeight: 'bold' }}>{user.fullName}</Col>
          </Row>
          <Row>
            <Col span={24}>{content}</Col>
          </Row>
        </Col>
      </Row>
    </div>
  )
}