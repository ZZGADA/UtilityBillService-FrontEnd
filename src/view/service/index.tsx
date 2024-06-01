import { Modal } from "antd";
function Service() {
  return (
    <Modal
      width="620px"
      maskClosable={true}
      //   confirmLoading={loading}
      title={"用户注册"}
      //   open={visible}
      destroyOnClose
      // footer={null}
    ></Modal>
  );
}

export default Service;
