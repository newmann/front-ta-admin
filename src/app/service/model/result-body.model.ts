/**
 * 从服务器调用api后返回的消息体格式
 * 包括restful调用和stomp方式调用后返回的消息格式
 */
export class BylResultBody<T>{
    public static RESULT_CODE_NO_LOGIN = -1;
    public static RESULT_CODE_SUCCESS = 0;
    public static RESULT_CODE_CHECK_FAIL = 1;
    public static RESULT_CODE_CHECK_NO_PERMISSION = 2;
    public static RESULT_CODE_CHECK_UNKNOWN_EXCEPTION = -99;

    public msg: string; // 错误消息
    public code: number; // 错误代码，
    public data: T; // 返回的信息体
  }

