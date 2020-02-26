import Vue from 'vue'
import Router from 'vue-router'

// Index

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
import InHospReg1 from '@/components/Index/InHosp/InHospReg1/InHospReg1'
import InHospReg2 from '@/components/Index/InHosp/InHospReg2/InHospReg2'
import OutCount from '@/components/Index/InHosp/OutCount/OutCount'
import Balance from '@/components/Index/InHosp/Balance/Balance'
import FeeTotal from '@/components/Index/InHosp/FeeTotal/FeeTotal'
import InHospInfo from '@/components/Index/InHosp/InHospInfo/InHospInfo'
import RegInfo from '@/components/Index/InHosp/RegInfo/RegInfo'
import Recharge from '@/components/Index/InHosp/Recharge/Recharge'
import RechargeRecord from '@/components/Index/InHosp/RechargeRecord/RechargeRecord'

import ReportsKind from '@/components/Index/Reports/ReportsKind/ReportsKind'
import BodyExam from '@/components/Index/Reports/BodyExam/BodyExam'
import Examination from '@/components/Index/Reports/Examination/Examination'
import ReportDetail from '@/components/Index/Reports/ReportDetail/ReportDetail'

import DrugIndex from '@/components/Index/DrugSearch/DrugIndex/DrugIndex'
import DrugSearchPage from '@/components/Index/DrugSearch/DrugSearchPage/DrugSearchPage'

import ServerIndex from '@/components/Index/ServerSearch/ServerIndex/ServerIndex'
import ServerSearchPage from '@/components/Index/ServerSearch/ServerSearchPage/ServerSearchPage'

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
import RegOrderList from '@/components/Mine/RegOrder/RegOrderList/RegOrderList'
import RegOrderItem from '@/components/Mine/RegOrder/RegOrderItem/RegOrderItem'
import CardManage from '@/components/Mine/CardManage/CardManage/CardManage'
import BindCard from '@/components/Mine/CardManage/BindCard/BindCard'
import CardInfo from '@/components/Mine/CardManage/CardInfo/CardInfo'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    { path: '/', redirect: '/index' },
    {
      path: '/index',
      name: 'index',
      component: resolve => require(['@/components/Index/Index/Index'], resolve),
      meta: { deepth: 0.5 } },
    {
      path: '/reserve',
      redirect: '/reserve/sDept',
      component: resolve => require(['@/components/Index/Reserve/Reserve/Reserve'], resolve),
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
      component: resolve => require(['@/components/Index/PayOnline/PayOnline'], resolve),
      children: [
        { path: 'unpaid', name: 'unpaid', component: Unpaid },
        { path: 'paid', name: 'paid', component: Paid }
      ]
    },
    {
      path: '/outpatientPay',
      redirect: '/outpatientPay/unpayList',
      component: resolve => require(['@/base/Container/Container'], resolve),
      children: [
        { path: 'unpayList', name: 'unpayList', component: UnpayList },
        { path: 'unpayItem/:patCardNo&:hisOrdNum', name: 'unpayItem', component: UnpayItem },
        { path: 'paidItem/:ledgerSn', name: 'paidItem', component: PaidItem }
      ]
    },
    {
      path: '/guidance',
      redirect: '/guidance/sSymptom',
      component: resolve => require(['@/base/Container/Container'], resolve),
      children: [
        { path: 'sSymptom', name: 'sSymptom', component: SSymptom },
        { path: 'gSTime', name: 'gSTime', component: GSTime },
        { path: 'docSearchPage/:tagName', name: 'docSearchPage', component: DocSearchPage }
      ]
    },
    {
      path: '/checkIn',
      redirect: '/checkIn/cConfirm',
      component: resolve => require(['@/components/Index/CheckIn/CheckIn/CheckIn'], resolve),
      children: [
        { path: 'cConfirm', name: 'cConfirm', component: CConfirm },
        { path: 'cQueue/:hisOrdNum', name: 'cQueue', component: CQueue }
      ]
    },
    {
      path: '/inHosp',
      redirect: '/inHosp/nav',
      component: resolve => require(['@/components/Index/InHosp/InHosp/InHosp'], resolve),
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
    { path: '/hospitalInfo', name: 'hospitalInfo', component: resolve => require(['@/components/Index/HospitalInfo/HospitalInfo'], resolve) },
    { path: '/doctorIntro', name: 'doctorIntro', component: resolve => require(['@/components/Index/DoctorIntro/DoctorIntro'], resolve) },
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
      component: resolve => require(['@/base/Container/Container'], resolve),
      children: [
        { path: 'drugIndex', name: 'drugIndex', component: DrugIndex },
        { path: 'drugSearchPage', name: 'drugSearchPage', component: DrugSearchPage }
      ]
    },
    {
      path: '/serverSearch',
      redirect: '/serverSearch/serverIndex',
      component: resolve => require(['@/base/Container/Container'], resolve),
      children: [
        { path: 'serverIndex', name: 'serverIndex', component: ServerIndex },
        { path: 'serverSearchPage', name: 'serverSearchPage', component: ServerSearchPage }
      ]
    },
    { path: '/parking', name: 'parking', component: resolve => require(['@/components/Index/Parking/Parking'], resolve) },
    { path: '/suggestion', name: 'suggestion', component: resolve => require(['@/components/Index/Suggestion/Suggestion'], resolve) },
    {
      path: '/iHospital',
      component: resolve => require(['@/base/Container/Container'], resolve),
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
      component: resolve => require(['@/base/Container/Container'], resolve),
      children: [
        { path: '', name: 'mine', component: Mine },
        {
          path: 'cardManage',
          component: resolve => require(['@/base/Container/Container'], resolve),
          children: [
            { path: '', name: 'cardManage', component: CardManage },
            { path: 'bindCard', name: 'bindCard', component: BindCard },
            { path: 'cardInfo/:cardNo', name: 'cardInfo', component: CardInfo }
          ]
        },
        { path: 'liveHosOrder', name: 'liveHosOrder', component: LiveHosOrder },
        {
          path: 'regOrder',
          component: resolve => require(['@/base/Container/Container'], resolve),
          children: [
            { path: '', name: 'regOrderList', component: RegOrderList },
            { path: 'regOrderItem/:hisOrdNum&:ledgerSn', name: 'regOrderItem', component: RegOrderItem }
          ]
        },
        { path: 'outOrderInfo/:ledgerSn', name: 'outOrderInfo', component: OutOrderInfo }
      ]
    }
  ]
})
