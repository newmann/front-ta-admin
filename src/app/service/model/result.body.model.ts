/**
 * 从服务器调用api后返回的消息体格式
 * 包括restful调用和stomp方式调用后返回的消息格式
 */
export class ResultBody<T>{
    public static RESULT_CODE_NO_LOGIN: number = -1;
    public static RESULT_CODE_SUCCESS: number = 0;
    public static RESULT_CODE_CHECK_FAIL: number = 1;
    public static RESULT_CODE_CHECK_NO_PERMISSION: number = 2;
    public static RESULT_CODE_CHECK_UNKNOWN_EXCEPTION: number = -99;
  
    public msg: string; // 错误消息
    public code: number; // 错误代码，
    public data: T; // 返回的信息体
  }
  
