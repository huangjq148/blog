import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryArticle(params?: TableListParams) {
  return request('/api/article', {
    method: 'GET',
    params: {
      params: JSON.stringify(params)
    }
  });
}
