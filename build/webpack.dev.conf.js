const path = require("path"); // 引入nodejs路径模块，处理路径用的
const webpack = require("webpack"); // 引入webpack
const webpackMerge = require("webpack-merge"); // 合并webpack配置文件
const autoprefixer = require("autoprefixer"); // 给css自动加浏览器兼容性前缀的插件
const portfinder = require("portfinder"); // 这个帮助我们寻找可用的端口，如果默认端口被占用了的话
const fs = require("fs"); // 处理文件用的
const os = require("os"); // 这个nodejs模块，会帮助我们获取本机ip

const modulePageRegx = /^\/(bim0|workBench).html$/;

const webpackConfigBase = require("./webpack.base.conf.js");

let ports = fs.readFileSync("./port.json", "utf8"); // 把port.json读文件读出来
ports = JSON.parse(ports); // 把json格式的数据转成js对象
portfinder.basePort = "8080"; // 将我们默认的端口设置成8080，默认配置是8000
// 这个函数，portfinder会自动找到可用的端口
portfinder.getPort((err, port) => {
  ports.data.port = port; // 我们把可以用的端口赋值给port.json里面
  ports = JSON.stringify(ports, null, 4);
  fs.writeFileSync("./port.json", ports); // 然后再写入prot.json
});

// 获取本机ip
function getIPAdress() {
  const interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    const iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i];
      if (alias.family === "IPv4" && alias.address !== "127.0.0.1" && !alias.internal) {
        return alias.address;
      }
    }
  }
}

const webpackConfigDev = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name]-bundle.js",
    publicPath: "/"
  },
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            plugins: ["react-hot-loader/babel"]
          }
        },
        exclude: /(node_modules)/,
        include: /src/
      },
      {
        test: /\.css$/,
        // css不分离写法
        // use:['style-loader','css-loader','postcss-loader'],
        // css分离写法
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ["ie >= 8", "Firefox >= 20", "Safari >= 5", "Android >= 4", "Ios >= 6", "last 4 version"]
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.less$/,
        // css不分离写法
        // use:['style-loader','css-loader','less-loader','postcss-loader'],
        // css分离写法
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [
                autoprefixer({
                  overrideBrowserslist: ["ie >= 8", "Firefox >= 20", "Safari >= 5", "Android >= 4", "Ios >= 6", "last 4 version"]
                })
              ]
            }
          },
          "less-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
    // new webpack.NamedModulesPlugin()
  ]
  // devServer: {
  //   contentBase: path.join(__dirname, "../"), // 最好设置成绝对路径
  //   publicPath: "/",
  //   historyApiFallback: {
  //     rewrites: [
  //       { from: /^\/$/, to: "/workBench.html" },
  //       {
  //         from: modulePageRegx,
  //         to: context => {
  //           const name = context.parsedUrl.pathname.match(modulePageRegx)[1];
  //           renturn`/${name}.html`;
  //         }
  //       }
  //     ]
  //   }, // true默认打开index.html，false会出现一个目录，亦可配置
  //   hot: true, // 启用模块热替换特性
  //   inline: true,
  //   stats: "errors-only",
  //   // host: getIPAdress(),
  //   https: true,
  //   port: ports.data.port,
  //   overlay: true, // 出现错误之后会在页面中出现遮罩层提示
  //   compress: true, // 一切服务都启用gzip 压缩
  //   // open: true, // 运行之后自动打开本地浏览器
  //   // 服务器代理配置项
  //   proxy: {
  //     "/apiX/*": {
  //       target: "https://144.7.127.8:8888",
  //       secure: false,
  //       pathRewrite: { "^/apiX": "" }
  //       // changeOrigin: true
  //     }
  //   }
  // }
};

module.exports = webpackMerge(webpackConfigBase, webpackConfigDev);
