import { Button, Image, Input, Modal, Form, message } from "antd";
import "./AppCss.css";
import { MailOutlined } from "@ant-design/icons";
import { useState } from "react";
import { getBillBySingleMail } from "../..//api/modules/billUtility";

function App() {
  // const { onOK, onCancel } = props
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const submit = async () => {
    const values = form.validateFields().then((values) => {
      return values;
    });

    setLoading(true);
    getBillBySingleMail(values).then(message.success("操作成功"));
  };

  return (
    <Modal
      width="620px"
      maskClosable={true}
      confirmLoading={loading}
      title={"登录"}
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
                  <Form.Item required={true} name={"mail"}>
                    <Input
                      placeholder="电子邮件地址"
                      size="large"
                      prefix={<MailOutlined />}
                      minLength={1}
                    />
                  </Form.Item>
                </div>
                <Button className="continue-btn" onClick={submit}>
                  继续
                </Button>
                <p className="other-page">
                  没有账户？
                  <a className="other-page-link" href="/public/SignUp.html">
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

export default App;
