let express = require('express')
let router = express.Router()
const connection = require('./conn')
const md5 = require('blueimp-md5')
const fs = require('fs')
const multer = require('multer')
const key = 'xlf'
var createFolder = function (folder) {
  try {
    fs.accessSync(folder)
  } catch (e) {
    fs.mkdirSync(folder)
  }
}

var uploadFolder = './upload/'

createFolder(uploadFolder)

// 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder) // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    let fileFormat = (file.originalname).split('.')
    cb(null, file.fieldname + '-' + Date.now() + '.' + fileFormat[fileFormat.length - 1])
  }
})

// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({ storage: storage })

connection.connect(() => {
  console.log('数据库连接成功')
})
// 游客注册
router.post('/register', (req, res) => {
  let { account, password, nickname } = req.body.params
  let addsql = `INSERT INTO user(id,account,password,nickname) VALUES(0,?,?,?)`
  let addSqlParams = [`${account}`, `${md5(password, key)}`, `${nickname}`]
  connection.query(addsql, addSqlParams, (err, data) => {
    if (err) {
      throw err
    } else {
      res.send({code: 200, msg: '注册成功', data})
    }
  })
})
// 游客登录
router.post('/login', (req, res) => {
  let { account, password } = req.body.params
  // 定义sql语句
  let loginsql = `select * from user where account='${account}' and password='${md5(password, key)}'`
  connection.query(loginsql, function (err, data) {
    if (err) {
      res.send({msg: '用户名或密码错误'})
      throw err
    } else {
      if (!data.length) {
        res.send({msg: '用户不存在'})
      } else {
        res.send({data: {id: data[0].id, account: data[0].account, nickname: data[0].nickname, Attendance: true, IDRegister: true, AttendanceHistory: true, AskLeave: true, ApplicationLeave: true, ApproveLeave: true, CallRoll: true}, msg: '登录成功', code: 200})
      }
    }
  })
})
// 学生/老师登录
router.post('/loginType', (req, res) => {
  let { account, password, type } = req.body.params
  // 定义sql语句
  let loginsql = `select * from custom where account='${account}' and password='${md5(password, key)}' and type='${type}'`
  connection.query(loginsql, function (err, data) {
    if (err) {
      res.send({msg: '用户名或密码错误'})
      throw err
    } else {
      if (!data.length) {
        res.send({msg: '用户不存在'})
      } else {
        if (data[0].type === 'teacher') {
          res.send({data: {type: 'teacher', id: data[0].id, avatar: data[0].avatar, account: data[0].account, nickname: data[0].nickname, Attendance: false, IDRegister: true, AttendanceHistory: false, AskLeave: false, ApplicationLeave: false, ApproveLeave: true, CallRoll: true}, msg: '操作成功', code: 200})
        } else if (data[0].type === 'student') {
          res.send({data: {type: 'student', id: data[0].id, avatar: data[0].avatar, account: data[0].account, nickname: data[0].nickname, Attendance: true, IDRegister: true, AttendanceHistory: true, AskLeave: true, ApplicationLeave: true, ApproveLeave: false, CallRoll: false}, msg: '操作成功', code: 200})
        } else {
          res.send({data: {id: data[0].id, avatar: data[0].avatar, account: data[0].account, nickname: data[0].nickname, Attendance: true, IDRegister: true, AttendanceHistory: true, AskLeave: true, ApplicationLeave: true, ApproveLeave: true, CallRoll: true}, msg: '操作成功', code: 200})
        }
      }
    }
  })
})
// 老师创建签到
router.post('/create', (req, res) => {
  let { name, geo, startTime, endTime, id, lng, lat, code, account, prenum } = req.body.params
  let addsql = `INSERT INTO setup(id,startTime,endTime,lng,lat,code,name,geo,account,prenum) VALUES(?,?,?,?,?,?,?,?,?)`
  let addSqlParams = [`${id}`, `${startTime}`, `${endTime}`, `${lng}`, `${lat}`, `${code}`, `${name}`, `${geo}`, `${account}`, `${prenum}`]
  connection.query(addsql, addSqlParams, function (err, data) {
    if (err) {
      res.send({msg: '创建失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '创建成功', data})
    }
  })
})
// 删除创建的签到
router.post('/delattend', (req, res) => {
  let { code } = req.body.params
  let delsql = `DELETE FROM setup WHERE code = ${code}`
  connection.query(delsql, function (err, data) {
    if (err) {
      res.send({msg: '删除失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '删除成功'})
    }
  })
})
// 创建的签到
router.post('/setuped', (req, res) => {
  let { account } = req.body.params
  let selectsql = `select * from setup where account='${account}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '请求成功', data})
    }
  })
})
// 签到查询
router.post('/attendance', (req, res) => {
  let { code } = req.body.params
  let selectsql = `select * from setup where code='${code}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      throw err
    } else {
      if (!data.length) {
        res.send({msg: '无效的签到码'})
      } else {
        res.send({code: 200, data})
      }
    }
  })
})
// 查询是否已签到
router.post('/selectattended', (req, res) => {
  let { code, account } = req.body.params
  let selectsql = `select * from setuped where account='${account}' and code='${code}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      if (!data.length) {
        res.send({code: 200, msg: '继续签到', data})
      } else {
        res.send({code: 250, msg: '已经签到过了~', data})
      }
    }
  })
})
// 签到
router.post('/toattendance', (req, res) => {
  let { account, name, startTime, endTime, geo, attendTime, code } = req.body.params
  let addsql = `INSERT INTO setuped(account,name,startTime,endTime,geo,attendTime,code) VALUES(?,?,?,?,?,?,?)`
  let addSqlParams = [`${account}`, `${name}`, `${startTime}`, `${endTime}`, `${geo}`, `${attendTime}`, `${code}`]
  connection.query(addsql, addSqlParams, function (err, data) {
    if (err) {
      res.send({msg: '签到失败了。。。'})
      throw err
    } else {
      res.send({code: 200, msg: '签到成功', data})
    }
  })
})
// 签到历史
router.post('/attendhistory', (req, res) => {
  let { account } = req.body.params
  let selectsql = `select * from setuped where account='${account}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '请求成功', data})
    }
  })
})
// 删除签到历史
router.post('/delattendhis', (req, res) => {
  let { code, account } = req.body.params
  let delsql = `DELETE FROM setuped WHERE code = ${code} and account = ${account}`
  connection.query(delsql, function (err, data) {
    if (err) {
      res.send({msg: '删除失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '删除成功'})
    }
  })
})
// 上传头像
router.post('/upload', upload.single('avatar'), function (req, res, next) {
  let file = req.file
  let account = req.query.account
  let path = file.filename
  connection.query('UPDATE custom SET avatar = (?) WHERE account = ?', [path, account], function (err, data) {
    if (err) {
      res.send({ msg: '上传失败' })
      throw err
    } else {
      res.send({ code: 200, path: file.filename, msg: '上传成功' })
    }
  })
})
// 修改昵称
router.post('/changenick', function (req, res, next) {
  let { account, nickname } = req.body.params
  connection.query('UPDATE custom SET nickname = (?) WHERE account = ?', [nickname, account], function (err, data) {
    if (err) {
      res.send({ msg: '修改失败' })
      throw err
    } else {
      res.send({ code: 200, msg: '修改成功', data })
    }
  })
})
// 查询密码是否正确
router.post('/rightpwd', (req, res) => {
  let { account, opassword } = req.body.params
  console.log(account, opassword)
  let selectsql = `select * from custom where account='${account}' and password='${md5(opassword, key)}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      console.log(data)
      if (!data.length) {
        res.send({code: 250, msg: '旧密码错误', data})
      } else {
        res.send({code: 200, msg: '旧密码正确', data})
      }
    }
  })
})
// 修改密码
router.post('/changepwd', function (req, res, next) {
  let { account, npassword } = req.body.params
  connection.query('UPDATE custom SET password = (?) WHERE account = ?', [md5(npassword, key), account], function (err, data) {
    if (err) {
      res.send({ msg: '修改失败' })
      throw err
    } else {
      res.send({ code: 200, msg: '修改成功' })
    }
  })
})
// 请假
router.post('/askleave', (req, res) => {
  console.log(req.body.params)
  let { reason, name, startTime, endTime, status, account, code } = req.body.params
  let addsql = `INSERT INTO askforholiday(reason,name,startTime,endTime,status,account,code) VALUES(?,?,?,?,?,?,?)`
  let addSqlParams = [`${reason}`, `${name}`, `${startTime}`, `${endTime}`, `${status}`, `${account}`, `${code}`]
  connection.query(addsql, addSqlParams, function (err, data) {
    if (err) {
      res.send({msg: '创建请假失败了。。。'})
      throw err
    } else {
      res.send({code: 200, msg: '创建请假成功，请在我的假条中查看', data})
    }
  })
})
// 假条
router.post('/leaverecord', (req, res) => {
  let { account } = req.body.params
  let selectsql = `select * from askforholiday where account='${account}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '请求成功', data})
    }
  })
})
// 删除假条
router.post('/delrecord', (req, res) => {
  let { id } = req.body.params
  let delsql = `DELETE FROM askforholiday WHERE id = ${id}`
  connection.query(delsql, function (err, data) {
    if (err) {
      res.send({msg: '删除失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '删除成功'})
    }
  })
})
// 所有的批假
router.post('/allleaverecord', (req, res) => {
  let { name } = req.body.params
  let selectsql = `select * from askforholiday where name='${name}'`
  connection.query(selectsql, function (err, data) {
    if (err) {
      res.send({msg: '请求失败了'})
      throw err
    } else {
      res.send({code: 200, msg: '请求成功', data})
    }
  })
})
// 通过请假
router.post('/pass', function (req, res, next) {
  let { id } = req.body.params
  connection.query('UPDATE askforholiday SET status = (?) WHERE id = ?', ['已批准', id], function (err, data) {
    if (err) {
      res.send({ msg: '操作失败' })
      throw err
    } else {
      res.send({ code: 200, msg: '操作成功', data })
    }
  })
})
// 不通过请假
router.post('/nopass', function (req, res, next) {
  let { id } = req.body.params
  connection.query('UPDATE askforholiday SET status = (?) WHERE id = ?', ['未通过', id], function (err, data) {
    if (err) {
      res.send({ msg: '操作失败' })
      throw err
    } else {
      res.send({ code: 200, msg: '操作成功', data })
    }
  })
})
module.exports = router
