/*
 * @Author: xiangty
 * @Date: 2020-11-03 22:27:01
 * @LastEditTime: 2020-11-04 23:04:17
 * @LastEditors: Please set LastEditors
 * @Description: babel config
 * @FilePath: \control-app\babel.config.js
 */
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [
    [
        'import',
        { libraryName: 'vant', libraryDirectory: 'es', style: true },
        'vant'
    ]
  ]
};
