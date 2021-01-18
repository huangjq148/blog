export default {
  // 人员实名认证状态
  PERSON_REAL_NAME_STATUS: [
    { value: '0', label: '初始化' },
    { value: '1', label: '验证中' },
    { value: '2', label: '认证通过' },
    { value: '3', label: '认证失败' },
    { value: '4', label: '禁用' },
  ],
  // 企业实名状态
  ENTERPRISE_REAL_NAME_STATUS: [
    { value: '0', label: '初始化' },
    { value: '1', label: '审核中' },
    { value: '2', label: '审核通过 需打款验证' },
    { value: '3', label: '审核失败' },
    { value: '4', label: '打款验证中' },
    { value: '5', label: '打款验证完成 审核完成' },
    { value: '6', label: '打款验证失败' },
    { value: '7', label: '禁用' },
  ],
  // 接入商状态
  APPLIER_STATUS: [
    { value: 1, label: '启用' },
    { value: 2, label: '禁用' },
  ],
  // 交易状态
  ORDER_STATUS: [
    { value: '0', label: '初始化' },
    { value: '1', label: '待处理' },
    { value: '2', label: '处理中' },
    { value: '3', label: '交易成功' },
    { value: '4', label: '交易失败' },
  ],
  //提现订单交易状态 交易状态 (1:订单初始化失败; 2:交易中; 3:交易成功; 4:交易失败)
  WITHDRAW_ORDER_STATUS: [
    { value: '1', label: '初始化失败' },
    { value: '2', label: '交易中' },
    { value: '3', label: '交易成功' },
    { value: '4', label: '交易失败' },
  ],
  RECHARGE_ORDER_STATUS: [
    { value: '1', label: '初始化失败' },
    { value: '2', label: '交易中' },
    { value: '3', label: '交易成功' },
    { value: '4', label: '交易失败' },
  ],
  //薪资订单状态
  PRE_ORDER_STATUS: [
    { value: '1', label: '待处理' },
    { value: '2', label: '交易中' },
    { value: '3', label: '交易成功' },
    { value: '4', label: '交易失败' },
  ],
  // 提现类新房
  ORDER_TYPE: [
    { value: '1', label: '企业提现 ' },
    { value: '2', label: '代付订单提现' },
  ],
  // 对账状态
  CHECK_STATUS: [
    { value: '1', label: '未对账' },
    { value: '2', label: '对账成功' },
    { value: '3', label: '对账失败' },
  ],
  // 充值类型
  RECHARGE_TYPE: [
    { value: '1', label: '线下' },
    { value: '2', label: '线上' },
  ],
  REPORT_CHECK_STATUS: [
    { value: '1', label: '未确认' },
    { value: '2', label: '已确认' },
  ],
  // 账户状态
  ACC_STATUS: [
    { value: '1', label: '可用' },
    { value: '2', label: '不可用' },
  ],
  IMAGE_STATUS: [
    { value: '1', label: '未上传' },
    { value: '2', label: '审核中' },
    { value: '3', label: '审核通过' },
    { value: '4', label: '审核失败' },
  ],
  RESPONSE_RESULT: [
    { value: '1', label: '成功' },
    { value: '2', label: '审核中' },
  ],
  USE_STATUS: [
    { value: "1", label: '启用' },
    { value: "2", label: '禁用' },
  ],
  ID_CARD_TYPE: [
    { value: "10", label: '身份证' },
    { value: "20", label: '护照' },
  ],
  PROCESS_STATUS: [
    { value: 1, label: '初始化' },
    { value: 2, label: '企业充值成功' },
    { value: 3, label: '平台提现中' },
    { value: 4, label: '平台提现成功' },
    { value: 5, label: '平台提现失败' },
    { value: 6, label: '上传文件成功' },
    { value: 7, label: '文件已回盘' },
    { value: 8, label: '上传文件失败' },
  ],
};
