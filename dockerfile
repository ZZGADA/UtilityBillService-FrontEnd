# 使用 Ubuntu 22.04 镜像作为基础镜像
FROM ubuntu:22.04

# 更新 apt 软件包索引并安装依赖项
RUN apt-get update && apt-get install -y curl

# 使用 curl 下载 Node.js 的安装脚本并运行
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

# 安装 Node.js 和 npm
RUN apt-get install -y nodejs

# 创建工作目录
WORKDIR /app

COPY . /app/
# RUN npm install
# RUN npm run build
CMD ["npm","run","start"]