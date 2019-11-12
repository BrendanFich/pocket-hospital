import Vue from 'vue'
import Router from 'vue-router'

import container from '@/components/container'
// index
import index from '@/views/index/index'
import reserve from '@/views/index/reserve/reserve'
import sDept from '@/views/index/reserve/sDept'
import sDayDoc from '@/views/index/reserve/sDayDoc'
import sTime from '@/views/index/reserve/sTime'
import confirm from '@/views/index/reserve/confirm'
import payOnline from '@/views/index/payOnline/payOnline'
import guidance from '@/views/index/guidance/guidance'
import sSymptom from '@/views/index/guidance/sSymptom'
import gSTime from '@/views/index/guidance/gSTime'
import checkIn from '@/views/index/checkIn/checkIn'
import cQueue from '@/views/index/checkIn/cQueue'
import cConfirm from '@/views/index/checkIn/cConfirm'
import inHosp from '@/views/index/inHosp/inHosp'
import nav from '@/views/index/inHosp/nav'
import dailyList from '@/views/index/inHosp/dailyList'
import inHospReg1 from '@/views/index/inHosp/inHospReg1'
import inHospReg2 from '@/views/index/inHosp/inHospReg2'
import outCount from '@/views/index/inHosp/outCount'
import balance from '@/views/index/inHosp/balance'
import prePay from '@/views/index/inHosp/prePay'
import feeTotal from '@/views/index/inHosp/feeTotal'
import InHospInfo from '@/views/index/inHosp/InHospInfo'
import RegInfo from '@/views/index/inHosp/RegInfo'

import hospitalInfo from '@/views/index/hospitalInfo/hospitalInfo'
import doctorIntro from '@/views/index/doctorIntro/doctorIntro'
import reports from '@/views/index/reports/reports'
import reportsKind from '@/views/index/reports/reportsKind'
import bodyExam from '@/views/index/reports/bodyExam'
import examination from '@/views/index/reports/examination'
import otherReports from '@/views/index/reports/otherReports'
import drugSearch from '@/views/index/drugSearch/drugSearch'
import serverPrice from '@/views/index/serverPrice/serverPrice'
import parking from '@/views/index/parking/parking'
import suggestion from '@/views/index/suggestion/suggestion'
// iHospital
import iHospital from '@/views/iHospital/iHospital'
import review from '@/views/iHospital/review'
import selectDoc from '@/views/iHospital/selectDoc'
import iSDept from '@/views/iHospital/iSDept'
import docIntro from '@/views/iHospital/docIntro'
import inquiry from '@/views/iHospital/inquiry'
import evaluate from '@/views/iHospital/evaluate'

// mine
import mine from '@/views/mine/mine'
import liveHosOrder from '@/views/mine/liveHosOrder'
import regOrder from '@/views/mine/regOrder'
import cardManage from '@/views/mine/cardManage/cardManage'
import bindCard from '@/views/mine/cardManage/bindCard'
import buildCard from '@/views/mine/cardManage/buildCard'
import cardInfo from '@/views/mine/cardManage/cardInfo'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: index },
    {
      path: '/reserve',
      redirect: '/reserve/sDept',
      component: reserve,
      children: [
        { path: 'sDept', component: sDept },
        { path: 'sDayDoc/:deptCode&:deptName', name: 'sDayDoc', component: sDayDoc },
        { path: 'sTime/:doctorCode&:date', name: 'sTime', component: sTime },
        { path: 'confirm', component: confirm }
      ]
    },
    { path: '/payOnline', component: payOnline },
    {
      path: '/guidance',
      redirect: '/guidance/sSymptom',
      component: guidance,
      children: [
        { path: 'sSymptom', component: sSymptom },
        { path: 'gSTime', component: gSTime }
      ]
    },
    {
      path: '/checkIn',
      redirect: '/checkIn/cConfirm',
      component: checkIn,
      children: [
        { path: 'cConfirm', component: cConfirm },
        { path: 'cQueue/:hisOrdNum', name: 'cQueue', component: cQueue }
      ]
    },
    {
      path: '/inHosp',
      redirect: '/inHosp/nav',
      component: inHosp,
      children: [
        { path: 'nav', component: nav },
        { path: 'inHospReg1', component: inHospReg1 },
        { path: 'inHospReg2', component: inHospReg2 },
        { path: 'dailyList', component: dailyList },
        { path: 'outCount', component: outCount },
        { path: 'balance', component: balance },
        { path: 'feeTotal', component: feeTotal },
        { path: 'prePay', component: prePay },
        { path: 'inHospInfo', component: InHospInfo },
        { path: 'regInfo', component: RegInfo }
      ]
    },
    { path: '/hospitalInfo', component: hospitalInfo },
    { path: '/doctorIntro', component: doctorIntro },
    {
      path: '/reports',
      redirect: '/reports/reportsKind',
      component: reports,
      children: [
        { path: 'reportsKind', component: reportsKind },
        { path: 'examination', component: examination },
        { path: 'otherReports', component: otherReports },
        { path: 'bodyExam', component: bodyExam }

      ]
    },
    { path: '/drugSearch', component: drugSearch },
    { path: '/serverPrice', component: serverPrice },
    { path: '/parking', component: parking },
    { path: '/suggestion', component: suggestion },
    {
      path: '/iHospital',
      component: container,
      children: [
        { path: '', component: iHospital },
        { path: 'iSDept', component: iSDept },
        { path: 'selectDoc/:deptCode&:deptName', name: 'selectDoc', component: selectDoc },
        { path: 'docIntro', component: docIntro },
        { path: 'inquiry', component: inquiry },
        { path: 'evaluate', component: evaluate },

        { path: 'review', component: review }
      ]
    },
    {
      path: '/mine',
      component: container,
      children: [
        { path: '', component: mine },
        {
          path: 'cardManage',
          component: container,
          children: [
            { path: '', component: cardManage },
            { path: 'bindCard/:patName&:patIdNo&:patientId&:cardTypeWord', name: 'bindCard', component: bindCard },
            { path: 'buildCard', name: 'buildCard', component: buildCard },
            { path: 'cardInfo/:cardNo', name: 'cardInfo', component: cardInfo }
          ]
        },
        { path: 'liveHosOrder', component: liveHosOrder },
        { path: 'regOrder', component: regOrder }
      ]
    }
  ]
})
