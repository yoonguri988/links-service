import axios from "../lib/axios";
import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null, // user데이터
  login: () => {}, // 로그인
  logout: () => {}, // 로그아웃
  updateMe: () => {}, // user데이터 수정
});

// Context를 적용할 함수
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  async function getMe() {
    const res = await axios.get("/users/me");
    const nextUser = res.data;
    setUser(nextUser);
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
    setUser(nextUser);
  }
  return (
    <AuthContext.Provider value={{ user, login, logout, updateMe }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("반드시 AuthContext 안에서 사용해야 합니다.");
  }

  return context;
}
