import Vue from 'vue'
import Router from 'vue-router'

import Container from '@/base/Container/Container'
// Index
import Index from '@/components/Index/Index/Index'
import Reserve from '@/components/Index/Reserve/Reserve/Reserve'
import SDept from '@/components/Index/Reserve/SDept/SDept'
import SDayDoc from '@/components/Index/Reserve/SDayDoc/SDayDoc'
import STime from '@/components/Index/Reserve/STime/STime'
import Confirm from '@/components/Index/Reserve/Confirm/Confirm'
import PayOnline from '@/components/Index/PayOnline/PayOnline'
import Guidance from '@/components/Index/Guidance/Guidance/Guidance'
import SSymptom from '@/components/Index/Guidance/SSymptom/SSymptom'
import GSTime from '@/components/Index/Guidance/GSTime/GSTime'
import CheckIn from '@/components/Index/CheckIn/CheckIn/CheckIn'
import CQueue from '@/components/Index/CheckIn/CQueue/CQueue'
import CConfirm from '@/components/Index/CheckIn/CConfirm/CConfirm'

// 住院模块
import InHosp from '@/components/Index/InHosp/InHosp/InHosp'
import Nav from '@/components/Index/InHosp/Nav/Nav'
import DailyList from '@/components/Index/InHosp/DailyList/DailyList'
import InHospReg1 from '@/components/Index/InHosp/InHospReg1/InHospReg1'
import InHospReg2 from '@/components/Index/InHosp/InHospReg2/InHospReg2'
import OutCount from '@/components/Index/InHosp/OutCount/OutCount'
import Balance from '@/components/Index/InHosp/Balance/Balance'
import FeeTotal from '@/components/Index/InHosp/FeeTotal/FeeTotal'
import InHospInfo from '@/components/Index/InHosp/InHospInfo/InHospInfo'
import RegInfo from '@/components/Index/InHosp/RegInfo/RegInfo'
import Recharge from '@/components/Index/InHosp/Recharge/Recharge'
import RechargeRecord from '@/components/Index/InHosp/RechargeRecord/RechargeRecord'

import HospitalInfo from '@/components/Index/HospitalInfo/HospitalInfo'
import DoctorIntro from '@/components/Index/DoctorIntro/DoctorIntro'
import Reports from '@/components/Index/Reports/Reports/Reports'
import ReportsKind from '@/components/Index/Reports/ReportsKind/ReportsKind'
import BodyExam from '@/components/Index/Reports/BodyExam/BodyExam'
import Examination from '@/components/Index/Reports/Examination/Examination'
import OtherReports from '@/components/Index/Reports/OtherReports/OtherReports'
import DrugSearch from '@/components/Index/DrugSearch/DrugSearch'
import ServerPrice from '@/components/Index/ServerPrice/ServerPrice'
import Parking from '@/components/Index/Parking/Parking'
import Suggestion from '@/components/Index/Suggestion/Suggestion'
// iHospital
import IHospital from '@/components/IHospital/IHospital/IHospital'
import Review from '@/components/IHospital/Review/Review'
import SelectDoc from '@/components/IHospital/SelectDoc/SelectDoc'
import ISDept from '@/components/IHospital/ISDept/ISDept'
import DocIntro from '@/components/IHospital/DocIntro/DocIntro'
import Inquiry from '@/components/IHospital/Inquiry/Inquiry'
import Evaluate from '@/components/IHospital/Evaluate/Evaluate'

// mine
import Mine from '@/components/Mine/Mine/Mine'
import OutOrderInfo from '@/components/Mine/OutOrderInfo/OutOrderInfo'
import LiveHosOrder from '@/components/Mine/LiveHosOrder/LiveHosOrder'
import RegOrder from '@/components/Mine/RegOrder/RegOrder'
import CardManage from '@/components/Mine/CardManage/CardManage/CardManage'
import BindCard from '@/components/Mine/CardManage/BindCard/BindCard'
import BuildCard from '@/components/Mine/CardManage/BuildCard/BuildCard'
import CardInfo from '@/components/Mine/CardManage/CardInfo/CardInfo'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: Index },
    {
      path: '/reserve',
      redirect: '/reserve/sDept',
      component: Reserve,
      children: [
        { path: 'sDept', component: SDept },
        { path: 'sDayDoc/:deptCode&:deptName', name: 'sDayDoc', component: SDayDoc },
        { path: 'sTime/:doctorCode&:date', name: 'sTime', component: STime },
        { path: 'confirm', component: Confirm }
      ]
    },
    { path: '/payOnline', component: PayOnline },
    {
      path: '/guidance',
      redirect: '/guidance/sSymptom',
      component: Guidance,
      children: [
        { path: 'sSymptom', component: SSymptom },
        { path: 'gSTime/:deptCode&:doctorCode', name: 'gSTime', component: GSTime }
      ]
    },
    {
      path: '/checkIn',
      redirect: '/checkIn/cConfirm',
      component: CheckIn,
      children: [
        { path: 'cConfirm', component: CConfirm },
        { path: 'cQueue/:hisOrdNum', name: 'cQueue', component: CQueue }
      ]
    },
    {
      path: '/inHosp',
      redirect: '/inHosp/nav',
      component: InHosp,
      children: [
        { path: 'nav', component: Nav },
        { path: 'inHospReg1', component: InHospReg1 },
        { path: 'inHospReg2', component: InHospReg2 },
        { path: 'dailyList', component: DailyList },
        { path: 'outCount', component: OutCount },
        { path: 'balance', component: Balance },
        { path: 'feeTotal', component: FeeTotal },
        { path: 'inHospInfo', component: InHospInfo },
        { path: 'regInfo', component: RegInfo },
        { path: 'recharge', component: Recharge },
        { path: 'rechargeRecord', component: RechargeRecord }
      ]
    },
    { path: '/hospitalInfo', component: HospitalInfo },
    { path: '/doctorIntro', component: DoctorIntro },
    {
      path: '/reports',
      redirect: '/reports/reportsKind',
      component: Reports,
      children: [
        { path: 'reportsKind', component: ReportsKind },
        { path: 'examination', component: Examination },
        { path: 'otherReports', component: OtherReports },
        { path: 'bodyExam', component: BodyExam }

      ]
    },
    { path: '/drugSearch', component: DrugSearch },
    { path: '/serverPrice', component: ServerPrice },
    { path: '/parking', component: Parking },
    { path: '/suggestion', component: Suggestion },
    {
      path: '/iHospital',
      component: Container,
      children: [
        { path: '', component: IHospital },
        { path: 'iSDept', component: ISDept },
        { path: 'selectDoc/:deptCode&:deptName', name: 'selectDoc', component: SelectDoc },
        { path: 'docIntro/:deptCode&:doctorCode', name: 'docIntro', component: DocIntro },
        { path: 'inquiry', component: Inquiry },
        { path: 'evaluate', component: Evaluate },

        { path: 'review', component: Review }
      ]
    },
    {
      path: '/mine',
      component: Container,
      children: [
        { path: '', component: Mine },
        {
          path: 'cardManage',
          component: Container,
          children: [
            { path: '', component: CardManage },
            { path: 'bindCard/:cardTypeWord', name: 'bindCard', component: BindCard },
            { path: 'buildCard', name: 'buildCard', component: BuildCard },
            { path: 'cardInfo/:cardNo', name: 'cardInfo', component: CardInfo }
          ]
        },
        { path: 'liveHosOrder', component: LiveHosOrder },
        { path: 'regOrder', component: RegOrder },
        { path: 'outOrderInfo/:ledgerSn&:paymentStatus', name: 'outOrderInfo', component: OutOrderInfo }
      ]
    }
  ]
})
