import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";

const client: AxiosInstance = axios.create({
  baseURL:
    "https://requitool-be-dwabg9fhbcexhubv.canadacentral-01.azurewebsites.net",
  headers: {
    "Content-Type": "application/json",
  },
});

interface UserState {
  accessToken?: string;
}

export const request = async (options: AxiosRequestConfig): Promise<any> => {
  try {
    let token: string = "";
    // const state = store.getState();
    const userState: UserState | null = null;
    if (userState !== null) {
      token = userState.accessToken || "";
    }

    if (token) {
      client.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    const onSuccess = (response: AxiosResponse) => response?.data;
    const onError = (error: AxiosError) => {
      console.log(error.response?.data);
      return Promise.reject(error.response?.data);
    };

    return client(options).then(onSuccess).catch(onError);
  } catch (e) {
    return Promise.reject(e);
  }
};
