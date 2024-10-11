import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// 导入 vant 按需引入组件工具
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "@vant/auto-import-resolver";
console.log('Vite config is being loaded...');  // 添加这行
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [VantResolver()],
    }),
    Components({
      resolvers: [VantResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/easy-data-api/eda_dm_locj/score/score_detail_m": {
        target: "http://134.108.25.70:10073",
        changeOrigin: true,
        pathRewrite: (path) => {
          console.log("Path before rewrite:", path); // 打印原始路径
          // const rewrittenPath = path.replace(
          //   /^\/score/,
          //   "/easy-data-api/eda_dm_locj/score/score_detail_m"
          // );
          // console.log("Path after rewrite:", rewrittenPath); // 打印重写后的路径
          return rewrittenPath;
        },
        onProxyReq: (proxyReq, req, res) => {
          console.log("Proxying request to:", proxyReq.path); // 打印代理请求的目标路径
        },
        onProxyRes: (proxyRes, req, res) => {
          console.log(
            "Received response from:",
            proxyRes.headers.location || proxyRes.url
          ); // 打印从目标服务器收到的响应
        },
        logLevel: "debug", // 启用详细的日志
      },
    },
  },
});
