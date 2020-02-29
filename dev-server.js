const WebpackDevServer = require("webpack-dev-server");
const webpack = require("webpack");
const path = require("path"); // 引入nodejs路径模块，处理路径用的
const portfinder = require("portfinder"); // 这个帮助我们寻找可用的端口，如果默认端口被占用了的话
const fs = require("fs"); // 处理文件用的
const os = require("os"); // 这个nodejs模块，会帮助我们获取本机ip

const modulePageRegx = /^\/(bim0|workBench).html$/;

const webpackConfig = require("./build/webpack.dev.conf.js");

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

const devServerOptions = {
  contentBase: path.join(__dirname, "./"), // 最好设置成绝对路径
  publicPath: "/",
  historyApiFallback: {
    rewrites: [
      { from: /^\/$/, to: "/workBench.html" },
      {
        from: modulePageRegx,
        to: context => {
          const name = context.parsedUrl.pathname.match(modulePageRegx)[1];
          renturn`/${name}.html`;
        }
      }
    ]
  }, // true默认打开index.html，false会出现一个目录，亦可配置
  hot: true, // 启用模块热替换特性
  inline: true,
  stats: "errors-only",
  // host: getIPAdress(),
  https: true,
  port: ports.data.port,
  overlay: true, // 出现错误之后会在页面中出现遮罩层提示
  compress: true, // 一切服务都启用gzip 压缩
  // open: true, // 运行之后自动打开本地浏览器
  // 服务器代理配置项
  proxy: {
    "/apiX/*": {
      target: "https://144.7.127.8:8888",
      secure: false,
      pathRewrite: { "^/apiX": "" }
      // changeOrigin: true
    }
  }
};

WebpackDevServer.addDevServerEntrypoints(webpackConfig, devServerOptions);
const compiler = webpack(webpackConfig);
const server = new WebpackDevServer(compiler, devServerOptions);

const portConfig = require("./port.json");
server.listen(portConfig.data.port, "localhost", () => {
  console.log(`
    dev server listening on port ${portConfig.data.port}
    visit https://localhost:${portConfig.data.port}
  `);
});
