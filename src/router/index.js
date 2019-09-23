import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Home from '@/views/Home'
import InternetHospital from '@/views/InternetHospital'
import Mine from '@/views/Mine'
import Reserve1 from '@/views/Reserve1'
import Reserve2 from '@/views/Reserve2'
import Reserve3 from '@/views/Reserve3'
import Reserve4 from '@/views/Reserve4'
import PayOnline from '@/views/PayOnline'
import CheckIn from '@/views/CheckIn'
import QueueInfo from '@/views/QueueInfo'
import HospitalInfo from '@/views/HospitalInfo'
import DoctorIntro from '@/views/DoctorIntro'
import Guidance from '@/views/Guidance'
import Guidance2 from '@/views/Guidance2'
import Report from '@/views/Report'
import BodyExam from '@/views/BodyExam'
import Examination from '@/views/Examination'
import OtherReport from '@/views/OtherReport'
import DrugSearch from '@/views/DrugSearch'
import ParkingSpace from '@/views/ParkingSpace'
import Suggestion from '@/views/Suggestion'
import SelectDept from '@/views/SelectDept'
import SelectDoc from '@/views/SelectDoc'
import DocIntro from '@/views/DocIntro'
import Inquiry from '@/views/Inquiry'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [
        { path: '', component: Home },
        { path: '/home', name: 'home', component: Home },
        { path: '/internetHospital', name: 'internetHospital', component: InternetHospital },
        { path: '/mine', name: 'mine', component: Mine }
      ]
    },
    {
      path: '/reserve1',
      name: 'reserve1',
      component: Reserve1
    },
    {
      path: '/reserve2/:dname',
      name: 'reserve2',
      component: Reserve2
    },
    {
      path: '/reserve3',
      name: 'reserve3',
      component: Reserve3
    },
    {
      path: '/reserve4',
      name: 'reserve4',
      component: Reserve4
    },
    {
      path: '/payOnline',
      name: 'payOnline',
      component: PayOnline
    },
    {
      path: '/checkIn',
      name: 'checkIn',
      component: CheckIn
    },
    {
      path: '/queueInfo',
      name: 'queueInfo',
      component: QueueInfo
    },
    {
      path: '/hospitalInfo',
      name: 'hospitalInfo',
      component: HospitalInfo
    },
    {
      path: '/doctorIntro',
      name: 'doctorIntro',
      component: DoctorIntro
    },
    {
      path: '/guidance',
      name: 'guidance',
      component: Guidance
    },
    {
      path: '/guidance2',
      name: 'guidance2',
      component: Guidance2
    },
    {
      path: '/report',
      name: 'report',
      component: Report
    },
    {
      path: '/bodyExam',
      name: 'bodyExam',
      component: BodyExam
    },
    {
      path: '/examination',
      name: 'examination',
      component: Examination
    },
    {
      path: '/otherReport',
      name: 'otherReport',
      component: OtherReport
    },
    {
      path: '/drugSearch',
      name: 'drugSearch',
      component: DrugSearch
    },
    {
      path: '/parkingSpace',
      name: 'parkingSpace',
      component: ParkingSpace
    },
    {
      path: '/suggestion',
      name: 'suggestion',
      component: Suggestion
    },
    {
      path: '/selectDept',
      name: 'selectDept',
      component: SelectDept
    },
    {
      path: '/selectDoc',
      name: 'selectDoc',
      component: SelectDoc
    },
    {
      path: '/docIntro',
      name: 'docIntro',
      component: DocIntro
    },
    {
      path: '/inquiry',
      name: 'inquiry',
      component: Inquiry
    }
  ]
})
