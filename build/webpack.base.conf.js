const path = require("path"); // 引入nodejs路径模块，处理路径用的
const webpack = require("webpack"); // 引入webpack
const glob = require("glob"); // glob，这个是一个全局的模块，动态配置多页面会用得着
const HtmlWebpackPlugin = require("html-webpack-plugin"); // 这个是通过html模板生成html页面的插件，动态配置多页面用得着
const TransferWebpackPlugin = require("transfer-webpack-plugin"); // 原封不动的把assets中的文件复制到dist文件夹中
const os = require("os"); // 这个nodejs模块，会帮助我们获取本机ip
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); // 压缩js
const HappyPack = require("happypack");

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const jsxHappy = new HappyPack({
  id: "jsx",
  threadPool: happyThreadPool,
  loaders: ["babel-loader"]
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

// 动态添加入口
function getEntry() {
  const entry = {};
  //读取src目录所有page入口
  glob.sync("./src/stage/*/index.jsx").forEach(name => {
    const start = name.indexOf("src/") + 10;
    const end = name.length - 10;
    const eArr = [];
    let n = name.slice(start, end);
    // n = n.split("/")[1];
    eArr.push(name);
    eArr.push("babel-polyfill"); // 引入这个，是为了用async await，一些IE不支持的属性能够受支持，兼容IE浏览器用的
    entry[n] = eArr;
  });
  return entry;
}

// 动态生成html，获取html-webpack-plugin参数的方法
const getHtmlConfig = (name, chunks) => {
  return {
    template: `./src/pages/${name}.html`,
    filename: `${name}.html`,
    inject: true,
    hash: false,
    // favicon: './favicon.ico',
    // title: title,
    // chunks: [name]
    chunks: chunks,
    minify:
      process.env.NODE_ENV === "development"
        ? false
        : {
            removeComments: true, // 移除HTML中的注释
            collapseWhitespace: true, // 折叠空白区域 也就是压缩代码
            removeAttributeQuotes: true // 去除属性引用
          }
  };
};

module.exports = {
  entry: getEntry(),
  // output: {
  //   path: path.resolve(__dirname, "./dist"),
  //   filename: "js/[name]-bundle.js"
  // },
  resolve: {
    extensions: ["*", ".js", ".json", ".jsx"],
    alias: {
      common: path.resolve(__dirname, "../src/common"),
      service: path.resolve(__dirname, "../src/service"),
      bim0: path.resolve(__dirname, "../src/bim0"),
      workBench: path.resolve(__dirname, "../src/workBench")
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ["happypack/loader?id=jsx"],
        exclude: /(node_modules)/,
        include: /src/
        // use: ["babel-loader"]
      },
      {
        test: /\.(png|jpg|gif|jpeg)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 5000
            }
          }
        ]
      }
    ]
  },
  performance: {
    hints: false
  },
  optimization: {
    // minimizer: [
    //   new OptimizeCSSAssetsPlugin({
    //     assetNameRegExp: /\.less\.css$/g
    //   }),
    //   new UglifyJsPlugin({
    //     test: /\.(js|jsx)(\?.*)?$/i, //测试匹配文件,
    //     exclude: /node_modules/ //不包含哪些文件
    //   })
    // ],
    splitChunks: {
      cacheGroups: {
        // 抽离第三方插件
        common: {
          chunks: "initial",
          name: "common", // 打包后的文件名，任意命名
          minSize: 0,
          minChunks: 2 // 重复2次才能打包到此模块
        },
        vendor: {
          priority: 1, // 优先级配置，优先匹配优先级更高的规则，不设置的规则优先级默认为0
          test: /node_modules/, // 匹配对应文件,// 指定是node_modules下的第三方包
          chunks: "initial",
          name: "vendor",
          minSize: 0,
          minChunks: 1
        }
      }
    }
  },
  plugins: [
    jsxHappy,
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      jquery: "jquery",
      "window.jQuery": "jquery"
    }),
    new TransferWebpackPlugin(
      [
        {
          from: path.resolve(__dirname, "../src/assets"),
          to: "assets"
        }
      ],
      path.resolve(__dirname, "src")
    )
  ]
};

// 配置页面
const entryObj = getEntry();
const htmlArray = [];
Object.keys(entryObj).forEach(element => {
  htmlArray.push({
    _html: element,
    title: "",
    chunks: ["common", "vendor", element]
  });
});

// 自动生成html模板
htmlArray.forEach(element => {
  module.exports.plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html, element.chunks)));
});
