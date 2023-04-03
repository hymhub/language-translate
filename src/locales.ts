const en = {
  checkNetwork: 'Retry more than 10 times, the program is terminated, please check the network or proxy and try again',
  retry: 'Translation failed, retrying...',
  sourceErr: 'Translation exception: Please check whether the content of the file to be translated is normal',
  sourceNull: 'The file to be translated has no content, please add the content you need to translate and try again',
  targetErr: 'Translation exception: Check for errors in the target file',
  patchSuccess: 'Incremental update successful',
  createSuccess: 'The translation was successful and the file has been generated',
  customOutConfig: 'Please select a custom output configuration',
  checkConfig: 'Please check whether the translate.config configuration is correct',
  checkFromPath: 'The file to be translated was not found, please check whether the fromPath configuration is correct',
  notHasBaiduKey: 'Baidu key configuration not found in apiKeyConfig'
}

const zh = {
  checkNetwork: '重试已超过10次, 程序终止, 请检查网络或代理后重试',
  retry: '翻译失败,正在重试...',
  sourceErr: '翻译异常: 请检查待翻译文件内容是否正常',
  sourceNull: '待翻译文件没有内容，请添加您需要翻译的内容后重试',
  targetErr: '翻译异常: 检查目标文件内是否有错误',
  patchSuccess: '增量更新成功',
  createSuccess: '翻译成功，已生成文件',
  customOutConfig: '请选择自定义输出配置',
  checkConfig: '请检查 translate.config 配置是否正确',
  checkFromPath: '未找到待翻译文件，请检查 fromPath 配置是否正确',
  notHasBaiduKey: '在 apiKeyConfig 中没有找到 baidu key 配置'
}

export const ls = { en, 'zh-CN': zh }
