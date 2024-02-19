import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get('weply_access');
    setIsLoggedIn(!!accessToken);
  }, []);

  const setLoginState = (state: any) => {
    setIsLoggedIn(state);
    if (!state) {
      Cookies.remove('weply_access'); // 로그아웃하는 경우 쿠키도 제거
    }
  };

  return { isLoggedIn, setLoginState };
};

export default useAuth;
