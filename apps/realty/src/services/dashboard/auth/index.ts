import axios from "axios";
import Cookies from "js-cookie";

export const RemoveSession = () => {
  localStorage.removeItem("tokene");
  Cookies.remove('tokene')
}

export const Access = async () => {
  const token = localStorage.getItem("tokene");
  const tokenCookie = Cookies.get('tokene');
  const headers = { headers: { "authorization": token } }

  try {  
    if (!token) {
      RemoveSession();
      return { data: {}, error: false };
    }
    
    if (token !== tokenCookie) {
      RemoveSession();
      return { message: 'Token alterado', error: true };
    }
    const response = await axios.post('https://itaajrealty.com/api/api/v1/auth/access', {}, headers);

    const { user } = response.data;
    return { data: user, error: false };
  } catch (error: any) {
    const { response } = error;
    RemoveSession();
    return { message: response.data.message, error: true, status: response.status };
  }
}

export const Login = async (body: any) => {
  try {
    const response = await axios.post('https://itaajrealty.com/api/api/v1/auth/login', body);
    const { token, user } = response.data;

    localStorage.setItem("tokene", token);
    Cookies.set('tokene', token, { expires: 7 });
    return { data: user, message: 'Inicio de Sesión exitosa', error: false };
  } catch (error: any) {
    const { response } = error;
    RemoveSession();
    return { message: response.data.message, error: true, status: response.status };
  }
}

export const Register = async (body: any) => {
  try {
    const response = await axios.post("https://itaajrealty.com/api/api/v1/auth/register", body);
    const { token, user } = response.data;
    localStorage.setItem("tokene", token);
    Cookies.set('tokene', token, { expires: 7 });
    return { data: user, message: 'Registro de cuenta exitosa', error: false };
  } catch (error: any) {
    const { response } = error;
    return { message: response.data.message, error: true, status: response.status };
  }
}
