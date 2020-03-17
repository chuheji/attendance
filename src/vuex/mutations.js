import { setCookie } from '../common/cookie'

const mutations = {
  LOG_IN (state, info) {
    setCookie('info', info)
    setCookie('nickname', info.nickname)
    setCookie('id', info.id)
    setCookie('type', info.type)
    setCookie('Path', info.avatar)
    setCookie('account', info.account)
    setCookie('Attendance', info.Attendance)
    setCookie('IDRegister', info.IDRegister)
    setCookie('AttendanceHistory', info.AttendanceHistory)
    setCookie('AskLeave', info.AskLeave)
    setCookie('ApplicationLeave', info.ApplicationLeave)
    setCookie('ApproveLeave', info.ApproveLeave)
    setCookie('CallRoll', info.CallRoll)
    state.info = info
  },
  UPLOAD_AVATAR (state, path) {
    setCookie('Path', path)
  },
  UPDATE_NICKNAME (state, nickname) {
    setCookie('nickname', nickname)
  }
}
export default mutations
