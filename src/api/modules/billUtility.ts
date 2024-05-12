import { UtilityBillService } from '@/api/config/servicePort'
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
  return http.get(UtilityBillService + `/utilityBill/getBill`, params);

}

export const getUniversityAndArea = () => {
  return http.get(UtilityBillService + `/utilityBill/getUniversityAndArea`);
}

export const getDormitoryDetails = (universityUuid: any) => {
  return http.get(UtilityBillService + `/utilityBill/getDormitoryDetails`, universityUuid)
}