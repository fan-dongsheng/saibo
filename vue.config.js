module.exports = {
    devServer: {
        open: true,
        port: 8878,
        proxy:{
            '/hehe':{
              target:"http://192.168.50.90:8000", //目标服务器
              changeOrigin:true,//是否改变请求源
              pathRewrite:{ //路径重写
                "^/hehe":''
              }
            }
    }
}
}