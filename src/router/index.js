import Vue from 'vue'
import Router from 'vue-router'

import Test from '@/components/Test/Test'

import Container from '@/base/Container/Container'
// Index
import Index from '@/components/Index/Index/Index'
import Reserve from '@/components/Index/Reserve/Reserve/Reserve'
import SDept from '@/components/Index/Reserve/SDept/SDept'
import SDayDoc from '@/components/Index/Reserve/SDayDoc/SDayDoc'
import STime from '@/components/Index/Reserve/STime/STime'
import Confirm from '@/components/Index/Reserve/Confirm/Confirm'
import PayOnline from '@/components/Index/PayOnline/PayOnline'
import Unpaid from '@/components/Index/PayOnline/Unpaid/Unpaid'
import Paid from '@/components/Index/PayOnline/Paid/Paid'
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
import CardInfo from '@/components/Mine/CardManage/CardInfo/CardInfo'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', name: 'index', component: Index },
    { path: '/test', name: 'test', component: Test },
    {
      path: '/reserve',
      redirect: '/reserve/sDept',
      component: Reserve,
      children: [
        { path: 'sDept', name: 'sDept', component: SDept },
        { path: 'sDayDoc', name: 'sDayDoc', component: SDayDoc },
        { path: 'sTime', name: 'sTime', component: STime },
        { path: 'confirm', name: 'confirm', component: Confirm }
      ]
    },
    {
      path: '/payOnline',
      redirect: '/payOnline/unpaid',
      component: PayOnline,
      children: [
        { path: 'unpaid', name: 'unpaid', component: Unpaid },
        { path: 'paid', name: 'paid', component: Paid }
      ]
    },
    {
      path: '/guidance',
      redirect: '/guidance/sSymptom',
      component: Guidance,
      children: [
        { path: 'sSymptom', name: 'sSymptom', component: SSymptom },
        { path: 'gSTime', name: 'gSTime', component: GSTime }
      ]
    },
    {
      path: '/checkIn',
      redirect: '/checkIn/cConfirm',
      component: CheckIn,
      children: [
        { path: 'cConfirm', name: 'gSTime', component: CConfirm },
        { path: 'cQueue/:hisOrdNum', name: 'cQueue', component: CQueue }
      ]
    },
    {
      path: '/inHosp',
      redirect: '/inHosp/nav',
      component: InHosp,
      children: [
        { path: 'nav', name: 'nav', component: Nav },
        { path: 'inHospReg1', name: 'inHospReg1', component: InHospReg1 },
        { path: 'inHospReg2', name: 'inHospReg2', component: InHospReg2 },
        { path: 'dailyList', name: 'dailyList', component: DailyList },
        { path: 'outCount', name: 'outCount', component: OutCount },
        { path: 'balance', name: 'balance', component: Balance },
        { path: 'feeTotal', name: 'feeTotal', component: FeeTotal },
        { path: 'inHospInfo', name: 'inHospInfo', component: InHospInfo },
        { path: 'regInfo', name: 'regInfo', component: RegInfo },
        { path: 'recharge', name: 'recharge', component: Recharge },
        { path: 'rechargeRecord', name: 'rechargeRecord', component: RechargeRecord }
      ]
    },
    { path: '/hospitalInfo', name: 'hospitalInfo', component: HospitalInfo },
    { path: '/doctorIntro', name: 'doctorIntro', component: DoctorIntro },
    {
      path: '/reports',
      redirect: '/reports/reportsKind',
      component: Reports,
      children: [
        { path: 'reportsKind', name: 'reportsKind', component: ReportsKind },
        { path: 'examination', name: 'examination', component: Examination },
        { path: 'otherReports', name: 'otherReports', component: OtherReports },
        { path: 'bodyExam', name: 'bodyExam', component: BodyExam }

      ]
    },
    { path: '/drugSearch', name: 'drugSearch', component: DrugSearch },
    { path: '/serverPrice', name: 'serverPrice', component: ServerPrice },
    { path: '/parking', name: 'parking', component: Parking },
    { path: '/suggestion', name: 'suggestion', component: Suggestion },
    {
      path: '/iHospital',
      component: Container,
      children: [
        { path: '', component: IHospital },
        { path: 'iSDept', name: 'iSDept', component: ISDept },
        { path: 'selectDoc/:deptCode&:deptName', name: 'selectDoc', component: SelectDoc },
        { path: 'docIntro/:deptCode&:doctorCode', name: 'docIntro', component: DocIntro },
        { path: 'inquiry', name: 'inquiry', component: Inquiry },
        { path: 'evaluate', name: 'evaluate', component: Evaluate },
        { path: 'review', name: 'review', component: Review }
      ]
    },
    {
      path: '/mine',
      component: Container,
      children: [
        { path: '', name: 'mine', component: Mine },
        {
          path: 'cardManage',
          component: Container,
          children: [
            { path: '', name: 'cardManage', component: CardManage },
            { path: 'bindCard', name: 'bindCard', component: BindCard },
            { path: 'cardInfo/:cardNo', name: 'cardInfo', component: CardInfo }
          ]
        },
        { path: 'liveHosOrder', name: 'liveHosOrder', component: LiveHosOrder },
        { path: 'regOrder', name: 'regOrder', component: RegOrder },
        { path: 'outOrderInfo/:ledgerSn', name: 'outOrderInfo', component: OutOrderInfo }
      ]
    }
  ]
})
