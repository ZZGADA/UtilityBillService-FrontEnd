import { Button, Image, Input, Modal, Form, message } from "antd";
import "./logIn.css";
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { postUserLogin } from "@/api/modules/billUtility";
import { useNavigate } from 'react-router-dom';

function isEmptyString(str:any) {
  return str ==null  || typeof str !== 'string' || str.trim().length === 0;
}

function Login() {
  // const { onOK, onCancel } = props
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  
  const navigate = useNavigate();


  const submit = async () => {
    setLoading(true);

    await form
      .validateFields()
      .then((values) => {
        postUserLogin(values)
          .then(result => {
            setTimeout(() => {
              message.success(result.msg);
            }, 700);
          })
          .catch((error) => {
            console.log(error);
            if(error.code == '200'){
              if(!isEmptyString(error.data.token)){
                navigate(`/service?token=${error.data.token}`)
              }else{
                message.error('服务开小差了')
              }
            }else{
              message.error(error.msg);
            }
          });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal
      width="620px"
      maskClosable={true}
      confirmLoading={loading}
      title={"用户登录"}
      open={visible}
      destroyOnClose
      footer={null}
    >
      <Form form={form}>
        <div className="page-wrapper">
          <header className="oai-header">
            <Image
              src={require("./assests/Z.png")}
              preview={false}
              style={{ padding: "1rem", width: 200, height: 100 }}
              alt="ZZGEDA's Logo"
            />
          </header>
          <main className="main-container">
            <section className="content-wrapper">
              <div className="title-wrapper">
                <h1 className="title">欢迎回来</h1>
              </div>
              <div className="login-container">
                <div className="input-wrapper">
                  <Form.Item
                    required={true}
                    name={"email"}
                    rules={[{ required: true, message: "请输入邮箱号" }]}
                  >
                    <Input
                      placeholder="用户注册邮箱"
                      size="large"
                      prefix={<MailOutlined />}
                      minLength={1}
                      maxLength={30}
                    />
                  </Form.Item>
                </div>
                <div className="input-wrapper">
                  <Form.Item
                    required={true}
                    name={"password"}
                    rules={[{ required: true, message: "请输入密码" }]}
                  >
                    <Input.Password
                      size="large"
                      minLength={8}
                      maxLength={30}
                      placeholder="请输入密码"
                    />
                  </Form.Item>
                </div>
                <Button className="continue-btn" onClick={submit}>
                  继续
                </Button>
                <p className="other-page">
                  没有账户？
                  <a className="other-page-link" href="/signUp">
                    注册
                  </a>
                </p>
              </div>
            </section>
          </main>
          <footer className="oai-footer">
            <p>ZZGEDA学习端 ICP备案/许可证：浙ICP备2024076700号-1</p>
          </footer>
        </div>
      </Form>
    </Modal>
  );
}

export default Login;
