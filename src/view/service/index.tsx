import { Modal, Descriptions, Tag, Button, Collapse, Select, message } from "antd";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import "./service.css";
import {
  getUserInformation,
  subscribeService,
  getBillBySingleMail
} from "@/api/modules/billUtility";

const { Panel } = Collapse;
// const { Option } = Select;

interface UserInfo {
  dormitoryBuildingName: string;
  dormitoryRoomName: string;
  isSubscribe: boolean;
  universityName: string;
  userName: string;
  utilityBillUserPOJSONStr: string;
  utilityBill: string;
  email:string;
  detailInfo: [
    {
      payTime: string;
      payMoney: number;
      week: string;
    }
  ];
}

function isEmptyString(str: string | null): boolean {
  return str == null || str.trim().length === 0;
}

function Service() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const tokenFromQuery = query.get("token");
    if (!isEmptyString(tokenFromQuery)) {
      setToken(tokenFromQuery!);
    } else {
      navigate("/login");
    }
  }, [location.search, navigate]);

  const fetchData = async (token: string) => {
    try {
      const result: any = await getUserInformation(token);
      console.log(result);
      setUserInfo(result);
    } catch (error) {
      console.error("Error fetching user information:", error);
    }
  };

  const handleSubscribe = async (ifWantToSubscribe: any) => {
    setSubscribing(true);
    try {
      const subscribeDTO = {
        utilityBillUserJson: userInfo?.utilityBillUserPOJSONStr,
        userUuid: userInfo?.userName,
        ifSubscribe: ifWantToSubscribe,
      };
      const response: any = await subscribeService(subscribeDTO, token);
      if (response.success === true) {
        setUserInfo((prev) =>
          prev ? { ...prev, isSubscribe: ifWantToSubscribe } : prev
        );
      }
      // Handle response if needed
    } catch (error) {
      console.error("Error subscribing:", error);
    }
    setSubscribing(false);
    setIsModalVisible(false);
  };

  useEffect(() => {
    if (!isEmptyString(token)) {
      fetchData(token);
    }
  }, [token]);

  const handleButtonClick = async () => {
    try {
      // 调用后端接口的逻辑
      const response:any = await getBillBySingleMail(userInfo?.email,token);
      if(response===2001){
        message.info("邮件发送成功")
      }else{
        message.info("邮件发送失败")
      }
      console.log(response);
      // 根据需要处理响应数据
    } catch (error) {
      console.error("Error calling backend API:", error);
    }
  };

  return (
    <div className="App">
      {showWelcome && (
        <motion.div
          className="welcome-banner"
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          欢迎来到ZZGEDA的服务空间
        </motion.div>
      )}
      <div className="content">
        <div className="box">
          <h1>ZZGEDA的服务空间</h1>
          {userInfo && (
            <Descriptions
              title={<span>用户信息</span>}
              bordered
              extra={
                <Button type="primary" onClick={handleButtonClick}  style={{ float: 'right' }}>
                  邮件发送
                </Button>
              }
            >
              <Descriptions.Item label="用户">
                {userInfo.userName}
              </Descriptions.Item>
              <Descriptions.Item label="大学">
                {userInfo.universityName}
              </Descriptions.Item>
              <Descriptions.Item label="宿舍楼">
                {userInfo.dormitoryBuildingName}
              </Descriptions.Item>
              <Descriptions.Item label="宿舍房间">
                {userInfo.dormitoryRoomName}
              </Descriptions.Item>
              <Descriptions.Item label="剩余电费">
                <Tag
                  color={
                    parseFloat(userInfo.utilityBill) >= 20 ? "green" : "red"
                  }
                >
                  {userInfo.utilityBill}度
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="是否订阅">
                <Tag
                  color={userInfo.isSubscribe ? "green" : "red"}
                  onMouseEnter={() => setIsModalVisible(true)}
                >
                  {userInfo.isSubscribe ? "已订阅" : "未订阅"}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label={userInfo.userName + "的支付信息"}>
                <Collapse>
                  {userInfo.detailInfo.map((detail, index) => (
                    <Panel
                      header={detail.payTime}
                      key={index}
                      className="collapse-content"
                    >
                      <p>支付时间: {detail.payTime}</p>
                      <p>支付金额: {detail.payMoney}元</p>
                      <p>方式: {detail.week}</p>
                    </Panel>
                  ))}
                </Collapse>
                {/* <Select style={{ width: 300 }} placeholder="选择支付信息">
                  {userInfo.detailInfo.map((detail, index) => (
                    <Option key={index} value={index}>
                      {`支付时间: ${detail.payTime}, 支付金额: ${detail.payMoney}, 星期: ${detail.week}`}
                    </Option>
                  ))}
                </Select> */}
              </Descriptions.Item>
            </Descriptions>
          )}
        </div>
      </div>

      <Modal
        title="订阅服务"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button
            key="back"
            type="primary"
            loading={subscribing}
            onClick={() => {
              handleSubscribe(false);
            }}
          >
            取消订阅
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={subscribing}
            onClick={() => {
              handleSubscribe(true);
            }}
          >
            订阅服务
          </Button>,
        ]}
      >
        <p>是否订阅服务？</p>
      </Modal>
    </div>
  );
}

export default Service;
