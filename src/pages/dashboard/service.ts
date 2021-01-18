import request from '@/utils/request';

/**
 * 首页-每日统计
 * @param queryDate
 */
export function dailyStatistics(queryDate: string) {
  return request.get('/index/daily_statistics', { params: { queryDate } });
}

/**
 * 首页-代付月度报表
 * @param queryDate
 */
export function everyDayMonthOrder(queryDate: string) {
  return request.get('/index/every_day_month_order', { params: { queryDate } });
}

/**
 * 首页-接入商代付月度排行榜
 * @param queryDate
 */
export function monthlyRankingOfApplierPayment(queryDate: string) {
  return request.get('/index/monthlyRankingOfApplierPayment', { params: { queryDate } });
}

/**
 * 首页-企业代付月度排行榜
 * @param queryDate
 */
export function monthlyRankingOfEnterprisePayment(queryDate: string) {
  return request.get('/index/monthlyRankingOfEnterprisePayment', { params: { queryDate } });
}
