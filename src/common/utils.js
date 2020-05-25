/*
 * @Author: 刘佑祥
 * @LastEditors: 刘佑祥
 * @LastEditTime: 2020-04-30 00:47:04
 */
function picker () {
  let arr = []
  for (let i = 1; i < 101; i++) {
    arr.push({text: `${i}人`})
  }
  return arr
}

function children () {
  let classes = ['1601', '1602', '1603', '1604', '1701', '1702', '1703', '1704', '1801', '1802', '1803', '1804', '1901', '1902', '1903', '1904']
  let res = []
  for (let i = 0; i < classes.length; i++) {
    res.push({text: classes[i], children: picker()})
  }
  return res
}
export function column () {
  let department = ['计算机科学与技术', '数学']
  let res = []
  for (let i = 0; i < department.length; i++) {
    res.push({text: department[i], children: children()})
  }
  return res
}
