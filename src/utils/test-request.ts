import { request } from './request';

// 测试GET请求
export async function testGetRequest() {
  try {
    const result = await request.get('/api/test');
    console.log('GET请求成功:', result);
    return result;
  } catch (error) {
    console.error('GET请求失败:', error);
    throw error;
  }
}

// 测试POST请求
export async function testPostRequest(data: any) {
  try {
    const result = await request.post('/api/test', data);
    console.log('POST请求成功:', result);
    return result;
  } catch (error) {
    console.error('POST请求失败:', error);
    throw error;
  }
}

// 测试PUT请求
export async function testPutRequest(id: string, data: any) {
  try {
    const result = await request.put(`/api/test/${id}`, data);
    console.log('PUT请求成功:', result);
    return result;
  } catch (error) {
    console.error('PUT请求失败:', error);
    throw error;
  }
}

// 测试DELETE请求
export async function testDeleteRequest(id: string) {
  try {
    const result = await request.delete(`/api/test/${id}`);
    console.log('DELETE请求成功:', result);
    return result;
  } catch (error) {
    console.error('DELETE请求失败:', error);
    throw error;
  }
}