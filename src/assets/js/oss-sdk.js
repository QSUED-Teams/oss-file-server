const OSS = require('ali-oss');
let files = [];
let client = '';

function multipartUploadWithSts(action, storeAs, file, cpt, cb) {//获取OSS上传必须的秘钥及其他设置信息
  return new Promise((resolve, reject) => {
    OSS.urllib.request(action, {
      method: 'GET',
    }, (err, response) => {
      let result, errmsg;
      if (err) {
        reject(err);
        return console.error(err);
      }
      try {
        result = JSON.parse(response);
      } catch (e) {
        errmsg = 'parse sts response info error: ' + e.message;
        reject(e);
        return console.error(errmsg);
      }
      //上传前的准备
      client = new OSS({
        accessKeyId: result.AccessKeyId,//通过阿里云控制台创建的access key
        accessKeySecret: result.AccessKeySecret,//通过阿里云控制台创建的access secret。
        stsToken: result.SecurityToken,//使用临时授权方式。
        bucket: 'park-static',// 通过控制台创建的bucket。
        endpoint: 'oss.zhihuipk.com',//OSS域名。
        cname: true,
        region: 'oss-cn-hangzhou',
      });
      multitest(client, storeAs, file, cpt, resolve, reject);//使用OSS上传文件
    })
  })
}

function multitest(ossClient, storeAs, file, cpt, resolve, reject) {//使用OSS上传文件
  let checkpoint_temp;
  if (cpt) {
    //如果有断点则继续上传该文件
    console.log("multitest with cpt", cpt);
    ossClient.multipartUpload(storeAs, file, {
      parallel: 2,
      checkpoint: cpt,
      progress: async function (percent, cpt) {//进度回调函数
        let filesObj = files.filter((item) => {
          return item.name === storeAs
        });
        if (filesObj.length) {
          filesObj = filesObj[0];
          filesObj.isUploading = true;
          filesObj.percentage = Math.round(percent * 10000) / 100;
        }
        // console.log('Progress: ', filesObj.isUploading, filesObj.percentage);
        checkpoint_temp = cpt
      }
    }).then((result) => {
      resolve(result);
    }).catch((err) => {
      console.error(err);
      reject(err);
    });
  } else {
    console.log("multitest without cpt");
    ossClient.multipartUpload(storeAs, file, {
      parallel: 2,
      progress: async function (percent, cpt) {
        let filesObj = files.filter((item) => {
          return item.name === storeAs
        });
        if (filesObj.length) {
          filesObj = filesObj[0];
          filesObj.isUploading = true;
          filesObj.percentage = Math.round(percent * 10000) / 100;
        }
        // console.log('Progress: ', filesObj.isUploading, filesObj.percentage);
        checkpoint_temp = cpt
      }
    }).then((result) => {
      let filesObj = files.filter((item) => {
        return item.name === storeAs
      });
      if (filesObj.length) {
        filesObj = filesObj[0];
        filesObj.isUploading = false;
        if (result.res.status === 200) {
          console.log(result);
          filesObj.uploadSuccess = true;
          filesObj.address = getExtranetUrl(result.name, 1, ossClient);
        } else {
          console.error(result);
        }
      }
      resolve(result);
    }).catch((err) => {
      reject(err);
      console.error(err);
    });
  }
}

function upload(e, action) {//获取选中的文件
  return () => {
    let file = e.target.files || e.dataTransfer.files;
    file = file[0];
    let storeAs = file.name;
    let fileType = ['image/png', 'image/jpeg ', 'image/jpg', 'image/gif'].indexOf(file.type) > -1;
    let hasFile = files.filter((item) => {
      return item.name === storeAs
    });//如果本次已经上传了该文件则提示
    if (hasFile.length) {
      // this.$message({
      //   message: '该文件已经上传过了',
      //   type: 'warning'
      // });
    } else {
      if (fileType) {//如果该文件是图片格式，则使先转换成base64
        getImgUrl(e.target.files).then(res => {
          files.push({
            name: storeAs,
            isUploading: false,
            percentage: 0,
            uploadSuccess: false,
            type: 1,
            fileUrl: res,
            address: '',
          });
        });
        return multipartUploadWithSts(action, storeAs, file);//获取OSS上传必须的秘钥及其他设置信息
      } else {
        return multipartUploadWithSts(action, storeAs, file);//获取OSS上传必须的秘钥及其他设置信息
      }
    }
  };
}

function getImgUrl(files) {//获取图片base64
  return new Promise((res, err) => {
    const len = files.length;
    for (let i = 0; i < len; i++) {
      let reader = new FileReader();
      reader.readAsDataURL(files[i]);
      reader.onload = function (e) {
        let image = new Image();
        image.src = this.result;
        res(this.result);
      };
    }
  })
}

function getExtranetUrl(url, type, client) {
  /**获取图片外网访问地址
   * 如果图片的读写权限为私有
   * client.signatureUrl("你的图片地址/名字")
   例如我的图片(名字为testImg)在根目录
   client.signatureUrl("testImg");//返回的就是带加密签名的图片路径，复制这个路径到浏览器上，便可以实现浏览

   * 如果图片的读写权限为公共
   client.getObjectUrl("你的图片名字");//返回的就是不带签名的图片路径，复制路径也可以在浏览器上访问.
   */
  if (client) {
    return type === 1 ? client.signatureUrl(url) : client.getObjectUrl(url);
  }
}

export {
  upload, getExtranetUrl, multipartUploadWithSts, multitest
}
