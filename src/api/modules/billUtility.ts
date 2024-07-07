import { UtilityBillService, UtilityBillSignUpHead, UtilityBillLogin, UtilityBillBasicService } from '@/api/config/servicePort'
import http from '@/api'
import axios from 'axios';

interface universityInformation {
  code: number;
  msg: string;
  data: Array<universityInformation_item>;
}
interface universityInformation_item {
  title: string;
  value: string;
  children: Array<universityInformation_item>;
}

export const getBillBySingleMail = (paramEmail: any,token:any) => {
  const config={
    headers: { //头部参数
      token: token
    }
  }
  const params = {
    email: paramEmail
  }
  return http.get(UtilityBillService + `${UtilityBillBasicService}/getBill`,params, config);

}

export const subscribeService = (params: any, token: any) => {
  return http.post(UtilityBillService + `${UtilityBillBasicService}/subscribeModify`, params, {
    headers: {
      'token': token,
      'Content-Type': 'application/json'
    }
  })
}

export const getUserInformation = (params: any) => {
  // console.log(params)
  // return axios.get(UtilityBillService + `${UtilityBillBasicService}/getUserInformation`, {
  //   headers: {
  //     'Content-Type': 'application/json; charset=utf-8',
  //     'Authorization': `${params}`
  //   }
  // });
  // const config={headers: {
  //   'Authorization': `${params}`
  // }}
  return http.post(UtilityBillService + `${UtilityBillBasicService}/getUserInformation`, { 'token': params }, {
    headers: {
      'token': params,
      'Content-Type': 'application/json'
    }
  });
}

export const postUserLogin = (params: any) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer your_token_here', // 如果你有token
      // 其他自定义头
    }
  };
  return http.post(UtilityBillService + `${UtilityBillLogin}/account`, params, config);
}

export const getUniversityAndArea = () => {
  return http.get(UtilityBillService + `${UtilityBillSignUpHead}/dropDownList/getUniversityAndArea`);
}

export const getDormitoryDetails = (universityUuid: any) => {
  return http.get(UtilityBillService + `${UtilityBillSignUpHead}/dropDownList/getDormitoryDetails`, universityUuid)
}

export const getDormitoryFloor = () => {
  return http.get(UtilityBillService + `${UtilityBillSignUpHead}/dropDownList/getDormitoryFloor`)
}

export const postUserSignUp = (params: any) => {
  return http.post(UtilityBillService + `${UtilityBillSignUpHead}/userSignUp`, params)
}