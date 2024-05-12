import { ConfigProvider } from "antd";
// import { connect } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import Router from "@/routers/index";
// import useTheme from '@/hooks/useTheme'
// import zhCN from 'antd/lib/locale-provider/zh_CN'


const App = (props: any) => {
  const { assemblySize } = props;

  // 全局使用主题
  // useTheme(themeConfig)

  return (
    <BrowserRouter>
      <ConfigProvider componentSize={assemblySize} image={require("@/assests/img/Z.png")}>
        <Router />
      </ConfigProvider>
    </BrowserRouter>
  );
};

// const mapStateToProps = (state: any) => state.global;
export default App;
