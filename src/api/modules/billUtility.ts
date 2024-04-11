import { UtilityBillService } from '../config/servicePort'
import http from '../'

export const getBillBySingleMail = (params: any) => {
    return http.get(UtilityBillService + `/utilityBill/getBill`, params);

}