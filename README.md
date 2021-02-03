# cij-test

测试 CSS-in-JS 性能， [数据](./packages/tests/RESULT.md)。

## 安装

使用包管理器 [yarn](https://yarnpkg.com/) 来安装依赖。

```bash
yarn
```

## 使用

```bash
# 1 进入 tests
cd ./packages/tests

# 2 生成数据
yarn generate-benchmarks-data

# 3 浏览数据(ECharts 或 Markdown)
## 3.1 ECharts
### 生成 ECharts 页面
yarn dev --port 3001

### 浏览器访问
open http://localhost:3001/

## 3.2 Markdown
### 生成 RESULT.md
yarn generate-result-md

### 查看 RESULT.md
cat ./RESULT.md
```

## 共享

欢迎提 PR ～如果是重要大改动，请先创建一个 issue 讨论你的修改内容。
记得适当补充测试。

## License

[MIT](https://choosealicense.com/licenses/mit/)
