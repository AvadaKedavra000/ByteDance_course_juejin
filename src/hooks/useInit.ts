import axios from "axios";
import { useStore } from "vuex";

export default function useInit() {
  //默认主题为浅色
  const initTheme = (): void => {
    const theme = localStorage.getItem("data-theme");
    if (!theme) {
      localStorage.setItem("data-theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", theme);
    }
  };

  const store = useStore();

  //初始化用户登陆状态
  const initVerification = (): void => {
    //验证lastToken和lastUserName是否仍有效
    const lastToken = sessionStorage.getItem("token");
    const lastUserName = sessionStorage.getItem("userName");

    axios
      .post("https://qcgsjt.api.cloudendpoint.cn/validate", {
        token: lastToken,
        secret: lastUserName,
      })
      .then((res) => {
        //请求成功的回调函数
        console.log(res);
        if (res.data.code === 401) {
          //若认证失败
          //静默
        } else if (res.data.code === 200) {
          //认证成功，更新vuex中be_logged_in和userName信息
          store.commit("userLogin");
          store.commit("setUserName", lastUserName);
        }
        store.commit("setIsGlobalInitializing", false);
      })
      .catch((err) => {
        //请求失败的回调函数
        console.log(err);
        alert("认证失败!");
        store.commit("setIsGlobalInitializing", false);
      });
  };
  return {
    initTheme,
    initVerification,
  };
}
