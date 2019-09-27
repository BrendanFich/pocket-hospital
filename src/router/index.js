import Vue from 'vue'
import Router from 'vue-router'

import container from '@/components/container'

import index from '@/views/index'

import reserve from '@/views/reserve/reserve'
import sDept from '@/views/reserve/sDept'
import sDayDoc from '@/views/reserve/sDayDoc'
import sTime from '@/views/reserve/sTime'
import confirm from '@/views/reserve/confirm'

import payOnline from '@/views/payOnline'

import guidance from '@/views/guidance/guidance'
import sSymptom from '@/views/guidance/sSymptom'
import gSTime from '@/views/guidance/gSTime'

import checkIn from '@/views/checkIn/checkIn'
import cQueue from '@/views/checkIn/cQueue'
import cConfirm from '@/views/checkIn/cConfirm'

import iHospital from '@/views/iHospital/iHospital'
import selectDept from '@/views/iHospital/selectDept'
import review from '@/views/iHospital/review'
import drugDelivery from '@/views/iHospital/drugDelivery'

import Mine from '@/views/Mine'

import hospitalInfo from '@/views/hospitalInfo'
import doctorIntro from '@/views/doctorIntro'

import reports from '@/views/reports/reports'
import reportsKind from '@/views/reports/reportsKind'
import bodyExam from '@/views/reports/bodyExam'
import examination from '@/views/reports/examination'
import otherReports from '@/views/reports/otherReports'

import DrugSearch from '@/views/DrugSearch'
import ParkingSpace from '@/views/ParkingSpace'
import Suggestion from '@/views/Suggestion'
import SelectDoc from '@/views/SelectDoc'
import DocIntro from '@/views/DocIntro'
import Inquiry from '@/views/Inquiry'
import Evaluate from '@/views/Evaluate'
import LiveHosOrder from '@/views/LiveHosOrder'
import RegOrder from '@/views/RegOrder'
import CardManage from '@/views/CardManage'
import BindCard from '@/views/BindCard'
import BuildCard from '@/views/BuildCard'
import CardInfo from '@/views/CardInfo'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', redirect: '/index' },
    { path: '/index', component: index },
    { path: '/reserve',
      redirect: '/reserve/sDept',
      component: reserve,
      children: [
        { path: 'sDept', component: sDept },
        { path: 'sDayDoc/:dname', name: 'sDayDoc', component: sDayDoc },
        { path: 'sTime', component: sTime },
        { path: 'confirm', component: confirm }
      ]
    },
    { path: '/payOnline', name: 'payOnline', component: payOnline },
    { path: '/guidance',
      redirect: '/guidance/sSymptom',
      component: guidance,
      children: [
        { path: 'sSymptom', component: sSymptom },
        { path: 'gSTime', component: gSTime }
      ]
    },
    { path: '/checkIn',
      redirect: '/checkIn/cConfirm',
      component: checkIn,
      children: [
        { path: 'cConfirm', component: cConfirm },
        { path: 'cQueue', component: cQueue }
      ]
    },
    { path: '/hospitalInfo', component: hospitalInfo },
    { path: '/doctorIntro', component: doctorIntro },
    { path: '/reports',
      redirect: '/reports/reportsKind',
      component: reports,
      children: [
        { path: 'reportsKind', component: reportsKind },
        { path: 'examination', component: examination },
        { path: 'otherReports', component: otherReports },
        { path: 'bodyExam', component: bodyExam }

      ] },
    { path: '/iHospital',
      component: container,
      children: [
        { path: '', component: iHospital },
        { path: 'selectDept', component: selectDept },
        { path: 'review', component: review },
        { path: 'drugDelivery', component: drugDelivery }
      ]
    },
    { path: '/mine', component: Mine },

    { path: '/drugSearch', name: 'drugSearch', component: DrugSearch },
    { path: '/parkingSpace', name: 'parkingSpace', component: ParkingSpace },
    { path: '/suggestion', name: 'suggestion', component: Suggestion },
    { path: '/selectDoc', name: 'selectDoc', component: SelectDoc },
    { path: '/docIntro', name: 'docIntro', component: DocIntro },
    { path: '/inquiry', name: 'inquiry', component: Inquiry },
    { path: '/evaluate', name: 'evaluate', component: Evaluate },
    { path: '/liveHosOrder', name: 'liveHosOrder', component: LiveHosOrder },
    { path: '/regOrder', name: 'regOrder', component: RegOrder },
    { path: '/cardManage', name: 'cardManage', component: CardManage },
    { path: '/bindCard', name: 'bindCard', component: BindCard },
    { path: '/buildCard', name: 'buildCard', component: BuildCard },
    { path: '/cardInfo', name: 'cardInfo', component: CardInfo }

  ]
})
