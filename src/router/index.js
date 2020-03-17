import Vue from 'vue'
import Router from 'vue-router'

const Attendance = resolve => require(['@/pages/Attendance/index'], resolve)
const Home = resolve => require(['@/pages/Home/index'], resolve)
const IDRegister = resolve => require(['@/pages/Home/IDRegister'], resolve)
const Mysetting = resolve => require(['@/pages/Mysetting/index'], resolve)
const SetUp = resolve => require(['@/pages/Mysetting/SetUp'], resolve)
const SetUped = resolve => require(['@/pages/Mysetting/SetUped'], resolve)
const Join = resolve => require(['@/pages/Mysetting/Join'], resolve)
const ChangePwd = resolve => require(['@/pages/Mysetting/ChangePwd'], resolve)
const ChangeNick = resolve => require(['@/pages/Mysetting/ChangeNick'], resolve)
const UploadImg = resolve => require(['@/pages/Mysetting/UploadImg'], resolve)
const Login = resolve => require(['@/pages/SignIn/login'], resolve)
const Register = resolve => require(['@/pages/SignIn/register'], resolve)
const HomeAttendance = resolve => require(['@/pages/Home/Attendance'], resolve)
const HomeAttendanceHistory = resolve => require(['@/pages/Home/AttendanceHistory'], resolve)
const HomeAskLeave = resolve => require(['@/pages/Home/AskLeave'], resolve)
const HomeApplicationLeave = resolve => require(['@/pages/Home/ApplicationLeave'], resolve)
const HomeApproveLeave = resolve => require(['@/pages/Home/ApproveLeave'], resolve)
const HomeCallRoll = resolve => require(['@/pages/Home/CallRoll'], resolve)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/Home'
    },
    {
      path: '/Attendance',
      name: 'Attendance',
      component: Attendance,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Home/IDRegister',
      name: 'IDRegister',
      component: IDRegister,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Home/Attendance',
      name: 'HomeAttendance',
      component: HomeAttendance,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Home/AttendanceHistory',
      name: 'HomeAttendanceHistory',
      component: HomeAttendanceHistory,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Home/AskLeave',
      name: 'HomeAskLeave',
      component: HomeAskLeave,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Home/ApplicationLeave',
      name: 'HomeApplicationLeave',
      component: HomeApplicationLeave,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Home/ApproveLeave',
      name: 'HomeApproveLeave',
      component: HomeApproveLeave,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Home/CallRoll',
      name: 'HomeCallRoll',
      component: HomeCallRoll,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Mysetting',
      name: 'Mysetting',
      component: Mysetting,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Mysetting/SetUp',
      name: 'SetUp',
      component: SetUp,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Mysetting/SetUped',
      name: 'SetUped',
      component: SetUped,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Mysetting/Join',
      name: 'Join',
      component: Join,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Mysetting/ChangePwd',
      name: 'ChangePwd',
      component: ChangePwd,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Mysetting/ChangeNick',
      name: 'ChangeNick',
      component: ChangeNick,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Mysetting/UploadImg',
      name: 'UploadImg',
      component: UploadImg,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register,
      meta: {
        keepAlive: false
      }
    }
  ]
})
