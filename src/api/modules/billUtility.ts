import { UtilityBillService, UtilityBillSignUpHead, UtilityBillHead } from '@/api/config/servicePort'
import http from '@/api'

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

export const getBillBySingleMail = (params: any) => {
  return http.get(UtilityBillService + `${UtilityBillHead}/getBill`, params);

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

export const postUserSignUp = (params:any)=>{
  return http.post(UtilityBillService+`${UtilityBillSignUpHead}/userSignUp`,params)
}