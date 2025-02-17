import { useNavigate } from "react-router-dom";
import axios from "../lib/axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext({
  user: null, // user데이터
  isPending: true, // 유저정보 대기확인
  login: () => {}, // 로그인
  logout: () => {}, // 로그아웃
  updateMe: () => {}, // user데이터 수정
});

// Context를 적용할 함수
export function AuthProvider({ children }) {
  const [values, setValues] = useState({
    user: null,
    isPending: true,
  });

  async function getMe() {
    setValues((prevValues) => ({
      ...prevValues,
      isPending: true,
    }));
    let nextUser;
    try {
      const res = await axios.get("/users/me");
      nextUser = res.data;
    } finally {
      setValues((prevValues) => ({
        ...prevValues,
        user: nextUser,
        isPending: false,
      }));
    }
  }

  async function login({ email, password }) {
    await axios.post("/auth/login", {
      email,
      password,
    });
    await getMe();
  }

  async function logout() {
    /** @TODO 로그아웃 구현하기 */
  }

  async function updateMe(formData) {
    const res = await axios.patch("/users/me", formData);
    const nextUser = res.data;
    setValues((prevValues) => ({
      ...prevValues,
      user: nextUser,
      isPending: false,
    }));
  }
  // 처음 렌더링 되면 유저 데이터 가져오기
  useEffect(() => {
    getMe();
  }, []);
  return (
    <AuthContext.Provider
      value={{
        user: values.user,
        isPending: values.isPending,
        login,
        logout,
        updateMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(require) {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  if (!context) {
    throw new Error("반드시 AuthContext 안에서 사용해야 합니다.");
  }

  useEffect(() => {
    if (require && !context.user && !context.isPending) {
      navigate("/login");
    }
  }, [context.user, context.isPending, navigate, require]);

  return context;
}
