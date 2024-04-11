import "./App.css";
import SearchForm from "src/components/SearchForm";
import ZSvg from "src/assests/img/Z.svg";
import { Image } from "antd";

function App() {
  return (
    <div>
      <div class="page-wrapper">
        <header class="oai-header">
          <Image
            src={ZSvg}
            preview={false}
            style={{ padding: "1rem", width: 200, height: 100 }}
            alt="ZZGEDA's Logo"
          />
        </header>
        <main class="main-container">
          <section class="content-wrapper">
            <div class="login-container">
              <div class="input-wrapper">
                <input
                  class="email-input"
                  inputmode="email"
                  type="email"
                  id="email-input"
                  name="email"
                  autocomplete="username"
                  autocapitalize="none"
                  spellcheck="false"
                  required=""
                  placeholder=" "
                />
                <label class="email-label" for="email-input">
                  电子邮件地址
                </label>
              </div>
              <button class="continue-btn">继续</button>
              <p class="other-page">
                没有账户？
                <a class="other-page-link" href="/public/SignUp.html">
                  注册
                </a>
              </p>
            </div>
          </section>
        </main>
        <footer class="oai-footer">
          <p>ZZGEDA学习端 ICP备案/许可证：浙ICP备2024076700号-1</p>
        </footer>
      </div>
    </div>
  );
}

/**
 *     <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
 */

export default App;
