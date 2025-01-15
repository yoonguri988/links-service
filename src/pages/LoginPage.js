import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../lib/axios';
import Label from '../components/Label';
import Input from '../components/Input';
import Button from '../components/Button';
import HorizontalRule from '../components/HorizontalRule';
import Link from '../components/Link';
import GoogleImage from '../assets/google.svg';
import styles from './LoginPage.module.css';

function LoginPage() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    /**
     * @TODO
     * 서버에 로그인을 시도합니다
     * 로그인이 성공하면 `/me`로 이동합니다
     */
  }

  return (
    <>
      <h1 className={styles.Heading}>로그인</h1>
      <form className={styles.Form} onSubmit={handleSubmit}>
        <Label className={styles.Label} htmlFor="email">
          이메일
        </Label>
        <Input
          id="email"
          className={styles.Input}
          name="email"
          type="email"
          placeholder="이메일"
          value={values.email}
          onChange={handleChange}
        />
        <Label className={styles.Label} htmlFor="password">
          비밀번호
        </Label>
        <Input
          id="password"
          className={styles.Input}
          name="password"
          type="password"
          placeholder="비밀번호"
          value={values.password}
          onChange={handleChange}
        />
        <Button className={styles.Button}>로그인</Button>
        <HorizontalRule className={styles.HorizontalRule}>또는</HorizontalRule>
        <Button
          className={styles.GoogleButton}
          type="button"
          appearance="outline"
          as={Link}
          /** @TODO 구글 로그인 구현 */
        >
          <img src={GoogleImage} alt="Google" />
          구글로 시작하기
        </Button>
        <div>
          회원이 아니신가요? <Link to="/register">회원가입하기</Link>
        </div>
      </form>
    </>
  );
}

export default LoginPage;
