import { auth } from '../../firebase-config';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useState } from 'react';

const BaseLogin = () => {
  const [userData, setUserData] = useState();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((data) => {
        setUserData(data.user);
        console.log(data);
        console.log(data);
        console.log(userData);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h3>로그인 테스트</h3>
      <button onClick={handleGoogleLogin}>로그인</button>
      <h4>이름표시</h4>
      <div>
        {userData
          ? '당신의 이름은 : ' + userData.displayName
          : '로그인 버튼을 눌러주세요 :)'}
      </div>
    </div>
  );
};

export default BaseLogin;
