/* 设置本地存储 */
export function setLocalData(item, data) {
  localStorage.setItem(item, JSON.stringify(data))
}
/* 获取本地数据并判断是否有值 */
export function getIsData(item) {
  return !!localStorage.getItem(item)
}
/* 获取本地数据 */
export function getLocalData(item) {
  return localStorage.getItem(item) ? JSON.parse(localStorage.getItem(item)) : ''
}
/* 清楚本地数据 */
export function clearLocalData(item) {
  localStorage.removeItem(item)
}
