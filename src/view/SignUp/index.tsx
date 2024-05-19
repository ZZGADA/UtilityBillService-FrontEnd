import { Button, Image, Input, Modal, Form, message, TreeSelect } from "antd";
import "./signUp.css";
import { MailOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import {
  getUniversityAndArea,
  getBillBySingleMail,
  getDormitoryDetails,
  getDormitoryFloor,
  postUserSignUp,
} from "@/api/modules/billUtility";
function SignUp() {
  // interface universityInformation {
  //   code: number;
  //   msg: string;
  //   data: Array<universityInformation_item>;
  // }
  // interface universityInformation_item {
  //   title: string;
  //   value: string;
  //   children: Array<universityInformation_item>;
  // }

  const [form] = Form.useForm();
  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const [selectedSchoolId, setSelectedSchoolId] = useState(" ");

  // 唯一value
  const [selectedSchoolValue, setSelectedSchoolValue] = useState("");
  const [selectedDormitoryValue, setSelectedDormitoryValue] = useState("");
  const [selectedRoomValue, setSelectedRoomValue] = useState("");

  const treeObject = {
    title: "",
    value: "",
    children: [],
    titleChain: "",
  };

  // tree结构数据
  const [schoolTreeValue, setSchoolTreeValue] = useState<any>([treeObject]);

  const [dormitoryTreeValue, setDormitoryTreeValue] = useState<any>([
    treeObject,
  ]);

  const [roomTreeValue, setRoomTreeValue] = useState<any>([treeObject]);

  // useEffect 空数组 初次渲染页面的时候调用
  useEffect(() => {
    schoolTreeDataFromBackEnd();
  }, []);

  // 当选择的学校改变的时候 触发
  useEffect(() => {
    dormitoryTreeDataFromBackEnd({ universityUuid: selectedSchoolId });
  }, [selectedSchoolId]);

  useEffect(() => {
    roomTreeDataFromBackEnd();
  }, [selectedSchoolId]);

  const submit = async () => {
    setLoading(true);
    await form
      .validateFields()
      .then((values) => {
        console.log("validate 校验");
        postUserSignUp(values)
          .then((result) => {
            if (result.verifyCode == 1) {
              // 表示用户信息已经注册
              message.info(result.signUpMsg + ",请直接登录");
            } else {
              // 用户信息注册成功 多少秒之跳转
              message.info("用户信息注册成功，请点击邮件链接完成验证");
            }
          })
          .catch((error) => {
            console.log(error);
            message.error(error.msg);
          });
      })
      .catch(() => {
        return;
      })
      .finally(() => {
        setLoading(false);
      });

    // getBillBySingleMail(values)
    //   .then(() => {
    //     setTimeout(() => {
    //       message.success("操作成功");
    //     }, 700);
    //   })
    //   .finally(() => {
    //     setLoading(false);
    //   });
  };

  // 下拉框勾选标签改变的时候将触发
  const onChangeSchool = (newValue: any) => {
    setSelectedSchoolValue(newValue);
  };

  const onChangeDormitory = (newValue: any) => {
    setSelectedDormitoryValue(newValue);
  };

  const onChangeRoom = (newValue: any) => {
    setSelectedRoomValue(newValue);
  };

  // 异步调用接口接收学校数据
  const schoolTreeDataFromBackEnd = async () => {
    await getUniversityAndArea().then((response) => {
      setSchoolTreeValue(response.universityInformationDTOList);
    });
  };

  // 异步调用接口获得选择的宿舍数据
  const dormitoryTreeDataFromBackEnd = async (universityUuid: any) => {
    await getDormitoryDetails(universityUuid).then((response) => {
      setDormitoryTreeValue(response.dormitoryBuildings);
    });
  };

  const roomTreeDataFromBackEnd = async () => {
    await getDormitoryFloor().then((response) => {
      setRoomTreeValue(response.roomLocation);
    });
  };

  return (
    <Modal
      width="620px"
      maskClosable={true}
      confirmLoading={loading}
      title={"用户注册"}
      open={visible}
      destroyOnClose
      // footer={null}
    >
      <Form form={form}>
        <div className="page-wrapper">
          <header className="oai-header">
            <Image
              src={require("@/assests/img/Z.png")}
              preview={false}
              style={{ padding: "1rem", width: 200, height: 100 }}
              alt="ZZGEDA's Logo"
            />
          </header>
          <main className="main-container">
            <section className="content-wrapper">
              <div className="title-wrapper">
                <h1 className="title">欢迎来到ZZGEDA空间</h1>
              </div>
              <div className="login-container">
                <div className="input-wrapper">
                  <Form.Item
                    required={true}
                    name={"email"}
                    rules={[{ required: true, message: "请输入邮箱号" }]}
                  >
                    <Input
                      placeholder="电子邮件地址"
                      size="large"
                      prefix={<MailOutlined />}
                      minLength={1}
                      showCount
                    />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    required={true}
                    name={"userName"}
                    rules={[{ required: true, message: "请输入用户名" }]}
                  >
                    <Input
                      placeholder="请输入用户名"
                      minLength={1}
                      maxLength={20}
                      showCount
                      size="large"
                    />
                  </Form.Item>
                </div>

                <div className="input-wrapper">
                  <Form.Item
                    required={true}
                    name={"universityCodeId"}
                    rules={[{ required: true, message: "请选择学校-校区" }]}
                  >
                    <TreeSelect
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      value={selectedSchoolValue}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      treeData={schoolTreeValue}
                      treeNodeLabelProp="titleChain" //选择treeData的属性作为下拉列表的回显节点标签
                      placeholder="请选择--学校和校区"
                      // treeDefaultExpandAll  默认展开所有树节点
                      onChange={onChangeSchool}
                      maxTagTextLength={1}
                      onSelect={(uniqueId) => {
                        setSelectedSchoolId(uniqueId);
                      }}
                    />
                  </Form.Item>
                </div>

                <div className="input-wrapper">
                  <Form.Item
                    required={true}
                    name={"dormitoryId"}
                    rules={[{ required: true, message: "请输入宿舍楼" }]}
                  >
                    <TreeSelect
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      value={selectedDormitoryValue}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      treeData={dormitoryTreeValue}
                      treeNodeLabelProp="titleChain" //选择treeData的属性作为下拉列表的回显节点标签
                      showSearch={true}
                      placeholder="请选择/输入--宿舍区和宿舍楼"
                      // treeDefaultExpandAll  默认展开所有树节点
                      onChange={onChangeDormitory}
                      // maxTagTextLength={1}
                    />
                  </Form.Item>
                </div>

                <div>
                  <Form.Item
                    required={true}
                    name={"dormitoryRoomId"}
                    rules={[{ required: true, message: "请选择房间" }]}
                  >
                    <TreeSelect
                      size="large"
                      style={{
                        width: "100%",
                      }}
                      value={selectedRoomValue}
                      dropdownStyle={{
                        maxHeight: 400,
                        overflow: "auto",
                      }}
                      showSearch={true}
                      treeData={roomTreeValue}
                      treeNodeLabelProp="floorRoom" //选择treeData的属性作为下拉列表的回显节点标签
                      placeholder="请选择/输入--房间号"
                      // treeDefaultExpandAll  默认展开所有树节点
                      onChange={onChangeRoom}
                      maxTagTextLength={1}
                    />
                  </Form.Item>
                </div>

                <Button className="continue-btn" onClick={submit}>
                  注冊
                </Button>
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

export default SignUp;
