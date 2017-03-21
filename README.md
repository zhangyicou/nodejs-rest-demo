# nodejs-rest 演示项目
1. bin 目录为启动文件
2. public 为静态文件，如: css,js
3. src 为工程源代码
    3.1 src/config 为工程全局配置文件
    3.2 controller为对外提供的rest接口
    3.3 db 为数据库的连接池封装
    3.4 lib 为各种公共工具的封装
    3.5 routes 为工程rest接口路由配置
    3.6 server 为具体的服务接口
    3.7 util 为公共封装
    3.8 app.js 为nodejs工程启动文件, 类似于java中main方法所在的文件
4. .gitlab-ci.yaml 为gitlat的ci文件
5. Dockerfile为docker镜像build的文件
6. package.json为工程中使用的各种第三方库的依赖配置文件， package.josn中配置的依赖库，需要使用npm install 才能正确的安装

