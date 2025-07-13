import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, CreateAxiosDefaults } from 'axios';

// 扩展ImportMeta类型
declare global {
    interface ImportMeta {
        env: Record<string, string | undefined>;
    }
}

// 拦截器配置类型定义
interface InterceptorOptions {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  requestErrorHandler?: (error: any) => any;
  responseInterceptor?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>;
  responseErrorHandler?: (error: any) => any;
}

// 创建axios实例的工厂函数
const createService = (
  config: CreateAxiosDefaults,
  interceptors?: InterceptorOptions
): AxiosInstance => {
  const service = axios.create(config);

  // 默认请求拦截器
  const defaultRequestInterceptor = (config: InternalAxiosRequestConfig) => {
    // 可以在这里添加token等信息
    const token = localStorage.getItem('token');
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  };

  // 默认请求错误处理器
  const defaultRequestErrorHandler = (error: any) => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  };

  // 默认响应拦截器
  const defaultResponseInterceptor = (response: AxiosResponse) => {
    // 处理响应数据
    if (response.status === 200) {
      return response.data;
    }
    return Promise.reject(new Error('请求失败'));
  };

  // 默认响应错误处理器
  const defaultResponseErrorHandler = (error: any) => {
    console.error('响应错误:', error);
    // 处理错误
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 处理未授权
          break;
        case 404:
          // 处理资源不存在
          break;
        default:
          // 其他错误
          break;
      }
    }
    return Promise.reject(error);
  };

  // 应用请求拦截器
  service.interceptors.request.use(
    interceptors?.requestInterceptor || defaultRequestInterceptor,
    interceptors?.requestErrorHandler || defaultRequestErrorHandler
  );

  // 应用响应拦截器
  service.interceptors.response.use(
    interceptors?.responseInterceptor || defaultResponseInterceptor,
    interceptors?.responseErrorHandler || defaultResponseErrorHandler
  );

  return service;
};

// 创建默认服务实例 (使用默认拦截器)
const defaultService = createService({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// 创建第二个服务实例 (自定义部分拦截器)
const service2 = createService(
  {
    baseURL: import.meta.env.VITE_APP_API_BASE_URL_SERVICE2 || '/api/service2',
    timeout: 8000,
    headers: {
      'Content-Type': 'application/json'
    }
  },
  {
    // 只自定义请求拦截器
    requestInterceptor: (config: InternalAxiosRequestConfig) => {
      // 例如，这里可以使用不同的token获取方式
      const token = sessionStorage.getItem('service2_token');
      if (token) {
        config.headers = config.headers || {};
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      // 可以添加其他自定义逻辑
      return config;
    },
    // 只自定义响应拦截器
    responseInterceptor: (response: AxiosResponse) => {
      // 处理响应数据
      if (response.status === 200) {
        return response.data;
      }
      return Promise.reject(new Error('请求失败'));
    }
  }
);

// 示例：创建第三个服务实例 (完全自定义拦截器)
// const service3 = createService(
//   {
//     baseURL: '/api/service3',
//     timeout: 10000
//   },
//   {
//     requestInterceptor: (config) => {
//       // 完全自定义的请求拦截器
//       return config;
//     },
//     requestErrorHandler: (error) => {
//       // 完全自定义的请求错误处理
//       return Promise.reject(error);
//     },
//     responseInterceptor: (response) => {
//       // 完全自定义的响应拦截器
//       return response.data;
//     },
//     responseErrorHandler: (error) => {
//       // 完全自定义的响应错误处理
//       return Promise.reject(error);
//     }
//   }
// );

// 创建请求方法的工具函数
const createRequestMethods = (service: AxiosInstance) => ({
  get: <T = any>(url: string, params?: any, config?: InternalAxiosRequestConfig): Promise<T> => {
    return service.get(url, { params, ...config });
  },
  post: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> => {
    return service.post(url, data, config);
  },
  put: <T = any>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<T> => {
    return service.put(url, data, config);
  },
  delete: <T = any>(url: string, params?: any, config?: InternalAxiosRequestConfig): Promise<T> => {
    return service.delete(url, { params, ...config });
  }
});

// 导出请求方法
export const request = {
  // 默认服务请求方法
  ...createRequestMethods(defaultService),

  // 第二个服务请求方法
  service2: createRequestMethods(service2)
};

// 类型定义
export type RequestMethods = typeof request;

// 扩展请求方法示例：
// 1. 创建新服务实例
// const service3 = createService({ baseURL: '/api/service3' });
// 2. 添加到request对象
// request.service3 = createRequestMethods(service3);