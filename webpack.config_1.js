// const path = require("path"); // 引入nodejs路径模块，处理路径用的
// const webpack = require("webpack"); // 引入webpack
// const webpackMerge = require("webpack-merge"); // 合并webpack配置文件
// const glob = require("glob"); // glob，这个是一个全局的模块，动态配置多页面会用得着
// const HtmlWebpackPlugin = require("html-webpack-plugin"); // 这个是通过html模板生成html页面的插件，动态配置多页面用得着
// const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css，webpack4推荐的分离css的插件
// const TransferWebpackPlugin = require("transfer-webpack-plugin"); // 原封不动的把assets中的文件复制到dist文件夹中
// const autoprefixer = require("autoprefixer"); // 给css自动加浏览器兼容性前缀的插件
// const os = require("os"); // 这个nodejs模块，会帮助我们获取本机ip
// const portfinder = require("portfinder"); // 这个帮助我们寻找可用的端口，如果默认端口被占用了的话
// const fs = require("fs"); // 处理文件用的
// const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
// const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩js
// const HappyPack = require("happypack");

// const modulePageRegx = /^\/(bim0|workBench).html$/;

// const devMode = process.env.NODE_ENV !== "production";

// let ports = fs.readFileSync("./port.json", "utf8"); // 把port.json读文件读出来
// ports = JSON.parse(ports); // 把json格式的数据转成js对象
// portfinder.basePort = "8080"; // 将我们默认的端口设置成8080，默认配置是8000
// // 这个函数，portfinder会自动找到可用的端口
// portfinder.getPort((err, port) => {
//   ports.data.port = port; // 我们把可以用的端口赋值给port.json里面
//   ports = JSON.stringify(ports, null, 4);
//   fs.writeFileSync("./port.json", ports); // 然后再写入prot.json
// });

// const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
// const jsxHappy = new HappyPack({
//   id: "jsx",
//   threadPool: happyThreadPool,
//   loaders: ["babel-loader"]
// });

// // 获取本机ip
// function getIPAdress() {
//   const interfaces = os.networkInterfaces();
//   for (let devName in interfaces) {
//     const iface = interfaces[devName];
//     for (let i = 0; i < iface.length; i++) {
//       const alias = iface[i];
//       if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
//         return alias.address;
//       }
//     }
//   }
// }

// // 动态添加入口
// function getEntry() {
//   const entry = {};
//   //读取src目录所有page入口
//   glob.sync("./src/stage/*/index.jsx").forEach(name => {
//     const start = name.indexOf("src/") + 10;
//     const end = name.length - 10;
//     const eArr = [];
//     let n = name.slice(start, end);
//     // n = n.split("/")[1];
//     eArr.push(name);
//     eArr.push("babel-polyfill"); // 引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
//     entry[n] = eArr;
//   });
//   return entry;
// }

// // 动态生成html，获取html-webpack-plugin参数的方法
// const getHtmlConfig = (name, chunks) => {
//   return {
//     template: `./src/pages/${name}.html`,
//     filename: `${name}.html`,
//     inject: true,
//     hash: false,
//     chunks: [name]
//     // chunks: chunks
//   };
// };

// const webpackConfig = {
//   entry: getEntry(),
//   output: {
//     path: path.resolve(__dirname, "./dist"),
//     filename: "js/[name]-bundle.js"
//   },
//   mode: "development",
//   devtool: "source-map",
//   resolve: {
//     extensions: ["*", ".js", ".json", ".jsx"],
//     alias: {
//       common: path.resolve(__dirname, "src/common"),
//       bim0: path.resolve(__dirname, "src/bim0"),
//       workBench: path.resolve(__dirname, "src/workBench")
//     }
//   },
//   module: {
//     rules: [
//       {
//         test: /\.(js|jsx)$/,
//         loaders: ["happypack/loader?id=jsx"],
//         exclude: /(node_modules)/,
//         include: /src/
//         // use: ["babel-loader"]
//       },
//       {
//         test: /\.css$/,
//         // css不分离写法
//         // use:['style-loader','css-loader','postcss-loader'],
//         // css分离写法
//         use: [
//           devMode ? "style-loader" : MiniCssExtractPlugin.loader, // 生产环境时，使用css分离
//           "css-loader",
//           {
//             loader: "postcss-loader",
//             options: {
//               plugins: [
//                 autoprefixer({
//                   overrideBrowserslist: ["ie >= 8", "Firefox >= 20", "Safari >= 5", "Android >= 4", "Ios >= 6", "last 4 version"]
//                 })
//               ]
//             }
//           }
//         ]
//       },
//       {
//         test: /\.less$/,
//         // css不分离写法
//         // use:['style-loader','css-loader','less-loader','postcss-loader'],
//         // css分离写法
//         use: [
//           devMode ? "style-loader" : MiniCssExtractPlugin.loader, // 生产环境时，使用css分离
//           "css-loader",
//           {
//             loader: "postcss-loader",
//             options: {
//               plugins: [
//                 autoprefixer({
//                   overrideBrowserslist: ["ie >= 8", "Firefox >= 20", "Safari >= 5", "Android >= 4", "Ios >= 6", "last 4 version"]
//                 })
//               ]
//             }
//           },
//           "less-loader"
//         ]
//       },
//       {
//         test: /\.(png|jpg|gif|jpeg)$/,
//         use: [
//           {
//             loader: "url-loader",
//             options: {
//               limit: 5000
//             }
//           }
//         ]
//       }
//     ]
//   },
//   performance: {
//     hints: false
//   },
//   optimization: {
//     // minimizer: [
//     //   new OptimizeCSSAssetsPlugin({
//     //     assetNameRegExp: /\.less\.css$/g
//     //   }),
//     //   new UglifyJsPlugin({
//     //     test: /\.(js|jsx)(\?.*)?$/i, //测试匹配文件,
//     //     exclude: /node_modules/ //不包含哪些文件
//     //   })
//     // ],
//     // splitChunks: {
//     //   cacheGroups: {
//     //     // 抽离第三方插件
//     //     common: {
//     //       chunks: "initial",
//     //       name: "common", // 打包后的文件名，任意命名
//     //       minSize: 0,
//     //       minChunks: 2 // 重复2次才能打包到此模块
//     //     },
//     //     vendor: {
//     //       priority: 1, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
//     //       test: /node_modules/, // 匹配对应文件,// 指定是node_modules下的第三方包
//     //       chunks: "initial",
//     //       name: "vendor",
//     //       minSize: 0,
//     //       minChunks: 1
//     //     }
//     //   }
//     // }
//   },
//   //插件
//   plugins: [
//     jsxHappy,
//     new MiniCssExtractPlugin({
//       filename: "css/[name].css"
//     }),
//     new webpack.ProvidePlugin({
//       $: "jquery",
//       jQuery: "jquery",
//       jquery: "jquery",
//       "window.jQuery": "jquery"
//     }),
//     new TransferWebpackPlugin(
//       [
//         {
//           from: "assets",
//           to: "assets"
//         }
//       ],
//       path.resolve(__dirname, "src")
//     ),
//     new webpack.HotModuleReplacementPlugin()
//     // new webpack.NamedModulesPlugin()
//   ],
//   devServer: {
//     contentBase: path.resolve(__dirname, "dist"), // 最好设置成绝对路径
//     historyApiFallback: {
//       rewrites: [
//         { from: /^\/$/, to: "/workBench.html" },
//         {
//           from: modulePageRegx,
//           to(context) {
//             const name = context.parsedUrl.pathname.match(modulePageRegx)[1];
//             renturn`/${name}.html`;
//           }
//         }
//         // { from: /./, to: '/views/404.html' }
//       ]
//     }, // true默认打开index.html，false会出现一个目录，亦可配置
//     hot: true,
//     inline: true,
//     stats: "errors-only",
//     // host: getIPAdress(),
//     https: true,
//     port: ports.data.port,
//     overlay: true, // 出现错误之后会在页面中出现遮罩层提示
//     compress: true,
//     open: true // 运行之后自动打开本地浏览器
//   }
// };

// // 配置页面
// const entryObj = getEntry();
// const htmlArray = [];
// Object.keys(entryObj).forEach(element => {
//   htmlArray.push({
//     _html: element,
//     title: "",
//     chunks: ["common", "vendor", element]
//   });
// });

// // 自动生成html模板
// htmlArray.forEach(element => {
//   webpackConfig.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
// });

// module.exports = webpackConfig;
