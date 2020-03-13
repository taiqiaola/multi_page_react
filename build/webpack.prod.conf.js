const path = require("path"); // 引入nodejs路径模块，处理路径用的
const webpack = require("webpack"); // 引入webpack
const webpackMerge = require("webpack-merge"); // 合并webpack配置文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); // 分离css，webpack4推荐的分离css的插件
const autoprefixer = require("autoprefixer"); // 给css自动加浏览器兼容性前缀的插件
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 压缩css
const { CleanWebpackPlugin } = require("clean-webpack-plugin"); // 清除目录
const os = require("os"); // 这个nodejs模块，会帮助我们获取本机ip
const HappyPack = require("happypack");

const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });
const jsxHappy = new HappyPack({
  id: "jsx",
  threadPool: happyThreadPool,
  loaders: ["babel-loader"]
});

const webpackConfigBase = require("./webpack.base.conf.js");

const webpackConfigProd = {
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "js/[name]-[hash].js",
    publicPath: "./"
  },
  mode: "production",
  devtool: "none",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loaders: ["happypack/loader?id=jsx"],
        exclude: /(node_modules)/,
        include: /src/
      },
      {
        test: /\.css$/,
        // css不分离写法
        // use:['style-loader','css-loader','postcss-loader'],
        // css分离写法
        use: [
          MiniCssExtractPlugin.loader, // 生产环境时，使用css分离
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
          MiniCssExtractPlugin.loader, // 生产环境时，使用css分离
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
    jsxHappy,
    new CleanWebpackPlugin(), // 删除dist目录
    new MiniCssExtractPlugin({
      filename: "css/[name].css"
    }),
    // 压缩css
    new OptimizeCSSAssetsPlugin({
      cssProcessorOptions: {
        safe: true
      }
    })
  ]
};

module.exports = webpackMerge(webpackConfigBase, webpackConfigProd);
