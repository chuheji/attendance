import { getCookie } from '../common/cookie'
let info = getCookie('info')
let type = getCookie('type')
let ID = getCookie('id')
let account = getCookie('account')
let Attendance = getCookie('Attendance')
let IDRegister = getCookie('IDRegister')
let AttendanceHistory = getCookie('AttendanceHistory')
let AskLeave = getCookie('AskLeave')
let ApplicationLeave = getCookie('ApplicationLeave')
let ApproveLeave = getCookie('ApproveLeave')
let CallRoll = getCookie('CallRoll')
let Path = getCookie('Path')
let nickname = getCookie('nickname')
let department = getCookie('department')
let classes = getCookie('classes')
const state = {
  info: info,
  ID: ID,
  account: account,
  type: type,
  Attendance: Attendance,
  IDRegister: IDRegister,
  AttendanceHistory: AttendanceHistory,
  AskLeave: AskLeave,
  ApplicationLeave: ApplicationLeave,
  ApproveLeave: ApproveLeave,
  CallRoll: CallRoll,
  message: '',
  isLoading: false,
  Path: Path,
  nickname: nickname,
  department: department,
  classes: classes
}
export default state
