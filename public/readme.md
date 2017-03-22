<p>css-dist / js-dist / views-dist ---- 生产环境的css,js,ejs目录</p>

<p>less / js / views  --- 开发环境的css,js,ejs目录</p>

<p>
<code>
<b>步骤：</b>
public文件夹下：
(1)  npm install 安装npm包
(2)  命令 node r.js -o build.js optimize=none(增加 optimize=none 只合并js不压缩)
(3)  命令 gulp
(4)  config.js 可修改css/js/ejs 引用路径 为开发还是生产环境
</code>
</p>

<pre>
<code>
public
 |
 |---img
 |
 |---js
 |      |---common 公共js库
 |      |---page 项目js
 |---less
 |     |---common 公共less
 |     |---page 项目less
 |---css-dist   --- 自动生成
 |---js-dist    --- 自动生成
 |---build.js     -- 合并js
 |---r.js         -- 合并js
 |---gulpfile.js  -- 前端打包任务
 |---package.json -- 打包工具依赖模块配置文件

 views           ---   ejs模板
 views-dist      ---   增加版本号后的ejs模板

 </code>
 </pre>
