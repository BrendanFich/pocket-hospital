import Vue from 'vue'
import Router from 'vue-router'

// Index
// import Index from '@/components/Index/Index/Index'
import SDept from '@/components/Index/Reserve/SDept/SDept'
import SDayDoc from '@/components/Index/Reserve/SDayDoc/SDayDoc'
import STime from '@/components/Index/Reserve/STime/STime'
import Confirm from '@/components/Index/Reserve/Confirm/Confirm'
import Unpaid from '@/components/Index/PayOnline/Unpaid/Unpaid'
import Paid from '@/components/Index/PayOnline/Paid/Paid'
import UnpayList from '@/components/Index/OutpatientPay/UnpayList/UnpayList'
import UnpayItem from '@/components/Index/OutpatientPay/UnpayItem/UnpayItem'
import PaidItem from '@/components/Index/OutpatientPay/PaidItem/PaidItem'
import DocSearchPage from '@/components/Index/Guidance/DocSearchPage/DocSearchPage'
import SSymptom from '@/components/Index/Guidance/SSymptom/SSymptom'
import GSTime from '@/components/Index/Guidance/GSTime/GSTime'
import CQueue from '@/components/Index/CheckIn/CQueue/CQueue'
import CConfirm from '@/components/Index/CheckIn/CConfirm/CConfirm'
// 住院模块
import Nav from '@/components/Index/InHosp/Nav/Nav'
import DailyList from '@/components/Index/InHosp/DailyList/DailyList'
import FeeTotal from '@/components/Index/InHosp/FeeTotal/FeeTotal'
import Recharge from '@/components/Index/InHosp/Recharge/Recharge'
import ReportsKind from '@/components/Index/Reports/ReportsKind/ReportsKind'
import BodyExam from '@/components/Index/Reports/BodyExam/BodyExam'
import Examination from '@/components/Index/Reports/Examination/Examination'
import ReportDetail from '@/components/Index/Reports/ReportDetail/ReportDetail'
import DrugIndex from '@/components/Index/DrugSearch/DrugIndex/DrugIndex'
import DrugSearchPage from '@/components/Index/DrugSearch/DrugSearchPage/DrugSearchPage'
import ServerIndex from '@/components/Index/ServerSearch/ServerIndex/ServerIndex'
import ServerSearchPage from '@/components/Index/ServerSearch/ServerSearchPage/ServerSearchPage'

// iHospital
import Review from '@/components/IHospital/Review/Review'
import SelectDoc from '@/components/IHospital/SelectDoc/SelectDoc'
import ISDept from '@/components/IHospital/ISDept/ISDept'
import DocIntro from '@/components/IHospital/DocIntro/DocIntro'
import Inquiry from '@/components/IHospital/Inquiry/Inquiry'
import Evaluate from '@/components/IHospital/Evaluate/Evaluate'

// mine
import OutOrderInfo from '@/components/Mine/OutOrderInfo/OutOrderInfo'
import LiveHosOrder from '@/components/Mine/LiveHosOrder/LiveHosOrder'
import RegOrderItem from '@/components/Mine/RegOrder/RegOrderItem/RegOrderItem'
import CardManage from '@/components/Mine/CardManage/CardManage/CardManage'
import BindCard from '@/components/Mine/CardManage/BindCard/BindCard'
import CardInfo from '@/components/Mine/CardManage/CardInfo/CardInfo'

Vue.use(Router)
const Index = () => import(/* webpackChunkName: "indexchunk" */ '@/components/Index/Index/Index')
const Reserve = () => import('@/components/Index/Reserve/Reserve/Reserve')
const PayOnline = () => import('@/components/Index/PayOnline/PayOnline')
const Container = () => import('@/base/Container/Container')
const CheckIn = () => import('@/components/Index/CheckIn/CheckIn/CheckIn')
const InHosp = () => import('@/components/Index/InHosp/InHosp/InHosp')
const Mine = () => import('@/components/Mine/Mine/Mine')
const IHospital = () => import('@/components/IHospital/IHospital/IHospital')
const HospitalInfo = () => import('@/components/Index/HospitalInfo/HospitalInfo')
const DoctorIntro = () => import('@/components/Index/DoctorIntro/DoctorIntro')

export default new Router({
  // mode: 'history',
  base: '/weixin/',
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: { deepth: 0.5 } },
    {
      path: '/reserve',
      redirect: '/reserve/sDept',
      component: Reserve,
      children: [
        { path: 'sDept', name: 'sDept', component: SDept, meta: { deepth: 1, keepAlive: true } },
        { path: 'sDayDoc', name: 'sDayDoc', component: SDayDoc, meta: { deepth: 2, keepAlive: true } },
        { path: 'sTime', name: 'sTime', component: STime, meta: { deepth: 3 } },
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
      path: '/outpatientPay',
      redirect: '/outpatientPay/unpayList',
      component: Container,
      children: [
        { path: 'unpayList', name: 'unpayList', component: UnpayList },
        { path: 'unpayItem/:patCardNo&:hisOrdNum', name: 'unpayItem', component: UnpayItem },
        { path: 'paidItem/:ledgerSn', name: 'paidItem', component: PaidItem }
      ]
    },
    {
      path: '/guidance',
      redirect: '/guidance/sSymptom',
      component: Container,
      children: [
        { path: 'sSymptom', name: 'sSymptom', component: SSymptom },
        { path: 'gSTime', name: 'gSTime', component: GSTime },
        { path: 'docSearchPage/:tagName', name: 'docSearchPage', component: DocSearchPage }
      ]
    },
    {
      path: '/checkIn',
      redirect: '/checkIn/cConfirm',
      component: CheckIn,
      children: [
        { path: 'cConfirm', name: 'cConfirm', component: CConfirm },
        { path: 'cQueue/:hisOrdNum', name: 'cQueue', component: CQueue }
      ]
    },
    {
      path: '/inHosp',
      redirect: '/inHosp/nav',
      component: InHosp,
      children: [
        { path: 'nav', name: 'nav', component: Nav },
        { path: 'dailyList', name: 'dailyList', component: DailyList },
        { path: 'feeTotal', name: 'feeTotal', component: FeeTotal },
        { path: 'recharge', name: 'recharge', component: Recharge }
      ]
    },
    { path: '/hospitalInfo', name: 'hospitalInfo', component: HospitalInfo },
    { path: '/doctorIntro', name: 'doctorIntro', component: DoctorIntro },
    {
      path: '/reports',
      redirect: '/reports/reportsKind',
      component: resolve => require(['@/components/Index/Reports/Reports/Reports'], resolve),
      children: [
        { path: 'reportsKind', name: 'reportsKind', component: ReportsKind },
        { path: 'examination', name: 'examination', component: Examination },
        { path: 'bodyExam', name: 'bodyExam', component: BodyExam },
        { path: 'reportDetail/:inspectId&:checkId', name: 'reportDetail', component: ReportDetail }
      ]
    },
    {
      path: '/drugSearch',
      redirect: '/drugSearch/drugIndex',
      component: Container,
      children: [
        { path: 'drugIndex', name: 'drugIndex', component: DrugIndex },
        { path: 'drugSearchPage', name: 'drugSearchPage', component: DrugSearchPage }
      ]
    },
    {
      path: '/serverSearch',
      redirect: '/serverSearch/serverIndex',
      component: Container,
      children: [
        { path: 'serverIndex', name: 'serverIndex', component: ServerIndex },
        { path: 'serverSearchPage', name: 'serverSearchPage', component: ServerSearchPage }
      ]
    },
    { path: '/parking', name: 'parking', component: resolve => require(['@/components/Index/Parking/Parking'], resolve) },
    { path: '/suggestion', name: 'suggestion', component: resolve => require(['@/components/Index/Suggestion/Suggestion'], resolve) },
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
            { path: 'cardInfo/:addressDetail&:nation&:patId&:patIdNo&:patIdType&:patMobile&:patName&:patSex&:userCode&:userName&:visitCardNo&:visitCardType', name: 'cardInfo', component: CardInfo }
          ]
        },
        { path: 'liveHosOrder', name: 'liveHosOrder', component: LiveHosOrder },
        {
          path: 'regOrder',
          component: Container,
          children: [
            { path: '', name: 'regOrderList', component: resolve => require(['@/components/Mine/RegOrder/RegOrderList/RegOrderList'], resolve) },
            { path: 'regOrderItem/:hisOrdNum&:ledgerSn', name: 'regOrderItem', component: RegOrderItem }
          ]
        },
        { path: 'outOrderInfo/:ledgerSn', name: 'outOrderInfo', component: OutOrderInfo }
      ]
    }
  ]
})
