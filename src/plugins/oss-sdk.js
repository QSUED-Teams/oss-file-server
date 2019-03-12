const OSS = require('ali-oss');
let files = [];
let client = '', fileName = '';

//获取OSS上传必须的秘钥及其他设置信息
function multipartUploadWithSts(action, storeAs, file, resolve, reject, progressCb, cpt) {
  //参数说明：请求地址 文件名 文件 Promise(成功的返回) Promise(失败的返回) 上传进度回调 上一个节点（重新上传时需要）
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
    multitest(client, storeAs, file, cpt, resolve, reject, progressCb);//使用OSS上传文件
  })
}

//使用OSS上传文件
function multitest(ossClient, storeAs, file, cpt, resolve, reject, progressCb) {
  //参数说明：oss对象 文件名 文件 上一个节点（重新上传时需要） Promise(成功的返回) Promise(失败的返回) 上传进度回调
  let checkpoint_temp;
  if (cpt) {
    //如果有断点则继续上一个节点上传该文件
    console.log("multitest with cpt", cpt);
    ossClient.multipartUpload(storeAs, file, {
      parallel: 2,
      checkpoint: cpt,
      //进度回调函数
      progress: async function (percent, storeAs, cpt) {//当前上传进度的 当前上传的文件名 当前上传节点（进行重新上传时使用）
        progressCb && progressCb(percent, storeAs, cpt);
        checkpoint_temp = cpt;
      }
    }).then((result) => {//成功的返回
      resolve({
        data: result,
        fileList: files,
      });
    }).catch((err) => {//失败的返回
      reject({err: err, cpt: checkpoint_temp});
    });
  } else {
    console.log("multitest without cpt");
    ossClient.multipartUpload(storeAs, file, {
      parallel: 2,
      //进度回调函数
      progress: async function (percent, cpt) {//当前上传进度的 当前上传的文件名 当前上传节点（进行重新上传时使用）
        progressCb(percent, storeAs, cpt);
        checkpoint_temp = cpt;
      }
    }).then((result) => {//成功的返回
      resolve({
        data: result,
        fileList: files,
      });
    }).catch((err) => {//失败的返回
      reject({err: err, cpt: checkpoint_temp});//将当前节点返回，使其可以重新从该节点继续上传文件
    });
  }
}

//获取选中的文件
function upload(e, action, fileList, fileNumber, fileTemplate, progressCb) {// 文件 请求地址 当前文件列表 文件限制数量 文件添加时的其他默认值 文件上传时的回调函数
  let argumentList = arguments[0];
  console.log(argumentList);
  files = fileList ? fileList : [];//文件添加时的其他默认值
  fileTemplate = fileTemplate ? fileTemplate : {};
  return new Promise((resolve, reject) => {
    const target = e.target.files || e.dataTransfer.files;
    let file = target[0];
    let storeAs = file.name;
    fileName = storeAs;
    let fileType = ['image/png', 'image/jpeg ', 'image/jpg', 'image/gif'].indexOf(file.type) > -1;
    let hasFile = files.filter((item) => {
      return item.name === storeAs
    });
    if (fileNumber && fileNumber <= files.length) {
      reject({
        uploadCode: 0,
        message: `最大上传${fileNumber}个文件！`,
      });
      return
    }
    if (hasFile.length) {//如果本次已经上传了该文件则提示
      reject({
        uploadCode: 0,
        message: '该文件已经上传过了',
      });
      console.warning('该文件已经上传过了');
    } else {
      if (fileType) {//如果该文件是图片格式，则使先转换成base64
        getImgUrl(target).then(res => {
          if (fileNumber === 1) {
            fileList = [];
          }
          files.push(Object.assign(fileTemplate, {
            name: storeAs,//文件名
            type: 1,//文件格式为图片
            fileUrl: res,//该文件的图片base64
            address: '',//该文件的OSS地址
          }));
          multipartUploadWithSts(action, storeAs, file, resolve, reject, progressCb);//获取OSS上传必须的秘钥及其他设置信息
        });
      } else {
        if (fileNumber === 1) {
          fileList = [];
        }
        files.push(Object.assign(fileTemplate, {
          name: storeAs,//文件名
          type: 0,//文件格式为其他类型的文件
          address: '',//该文件的OSS地址
        }));
        multipartUploadWithSts(action, storeAs, file, resolve, reject, progressCb);//获取OSS上传必须的秘钥及其他设置信息
      }
    }
  });
}

//获取图片base64
function getImgUrl(files) {
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

/**获取图片外网访问地址
 * 如果图片的读写权限为私有
 * client.signatureUrl("你的图片地址/名字")
 例如我的图片(名字为testImg)在根目录
 client.signatureUrl("testImg");//返回的就是带加密签名的图片路径，复制这个路径到浏览器上，便可以实现浏览

 * 如果图片的读写权限为公共
 client.getObjectUrl("你的图片名字");//返回的就是不带签名的图片路径，复制路径也可以在浏览器上访问.
 */
function getExtranetUrl(name, type) {
  if (client) {
    return type === 1 ? client.signatureUrl(name) : client.getObjectUrl(name);//1 为私有
  }
}

//删除OSS服务器上的文件
function deleteFile(name, index) {
  return new Promise((resolve, reject) => {
    (client && client.delete) ? client.delete(name).then((res) => {
      resolve(res)
    }).catch((err) => {
      reject(err);
    }) : (reject({errCode: 999, errContent: 'client is null , Please upload the file before deleting it !'}));
  })
}

export {
  upload, getExtranetUrl, multipartUploadWithSts, multitest, deleteFile
}
