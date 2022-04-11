module.exports = {
  semi: false, // 是否在末尾添加分号
  singleQuote: true, // 是否使用单引号
  jsxSingleQuote: false, // 在jsx文件中的是否使用单引号
  proseWrap: 'preserve', // 是否对markdown等文章自动换行
  printWidth: 120,
  tabWidth: 2,
  useTabs: false, // 是否使用tab缩进
  quoteProps: 'consistent', // 对象中的属性名是否添加引号，as-needed只有当需要的时候才添加
  trailingComma: 'es5', // 是否使用尾逗号
  bracketSpacing: true,
  arrowParens: 'always', // 箭头函数单个参数的情况是否省略括号
  htmlWhitespaceSensitivity: 'css', // html中的空格敏感性
  vueIndentScriptAndStyle: false, // vue script和style标签中是否缩进
  endOfLine: 'lf',
  // Format only a segment of a file.
  rangeStart: 0,
  rangeEnd: Infinity,
  // Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file.
  requirePragma: false,
  // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier.
  insertPragma: false,
  // Control whether Prettier formats quoted code embedded in the file
  embeddedLanguageFormatting: 'auto',
}
