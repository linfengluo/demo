/**
 * Created by linfengluo@gmail.com on 2018/5/18.
 */
import * as CODE from './response'

const resFormat  = {
  error(error, msg = '出错啦，请稍后再试！'){
    return {
      code: CODE.ERROR_CODE,
      data: error,
      msg: msg
    }
  },

  success(result = {}, msg = '获取成功'){
    return {
      code: CODE.SUCCESS_CODE,
      data: result,
      msg: msg
    }
  },

  lackParams(msg = '缺少参数'){
    return {
      code: CODE.LACK_PARAMS,
      data: {},
      msg: msg
    }
  }
}

export default resFormat
