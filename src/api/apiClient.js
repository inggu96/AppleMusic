import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: {
    key: 'AIzaSyDPm1djuUOZKFIad32z0rfR8EVwCXn0pCA',
  },
  timeout: 50000,
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    console.log(error);
    if (
      error?.response?.data?.statusCode === 401 &&
      error?.response?.data?.message === 'TOKEN_EXPIRED'
    ) {
      const refreshToken = localStorage.getItem('REFRESH_TOKEN');
      const accessToken = localStorage.getItem('ACCESS_TOKEN');

      try {
        const response = await axios.post(`${config.API_URL}/refreshToken`, {
          refreshToken,
          accessToken,
        });

        if (response.data) {
          const { accessToken, refreshToken } = response.data;

          localStorage.setItem('ACCESS_TOKEN', accessToken);
          localStorage.setItem('REFRESH_TOKEN', refreshToken);
          // 새로운 토큰으로 재시도
          error.config.headers['Authorization'] = `Bearer ${accessToken}`;
          return apiClient(error.config);
        } else {
          localStorage.clear();
        }
      } catch (error) {
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  },
);
export default apiClient;
