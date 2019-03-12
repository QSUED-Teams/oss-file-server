<template>
  <div>
    <div class="el-upload-file">
      <div class="f-plus">
        <div class="f-col f-center"></div>
        <div class="f-row f-center"></div>
      </div>
      <input type="file" @change="changeFile" ref="file" :accept="accept"/>
    </div>
    <div class="f-file-upload" v-for="(file,index) in files" :key="index">
      <div class="file-upload-loading">
        <el-progress
          v-if="file.isUploading"
          type="circle"
          :stroke-width="6"
          :percentage="file.percentage">
        </el-progress>
      </div>
      <div class="f-file-title" v-if="file.uploadSuccess">
        <div class="f-file-success f-center"></div>
      </div>
      <div class="f-file-item" v-if="!file.isUploading">
        <img :src="file.fileUrl" alt="" v-if="!!file.type">
        <div class="f-file-name f-center" v-else :title="file.name">{{file.name}}
        </div>
        <div class="f-file-warp">
          <div class="f-center" style="width: 100%;text-align: center;">
            <i v-if="file.type===1" class="el-icon-zoom-in" @click="lookBigImg(file,index)"></i>
            <i v-if="file.uploadState===2" class="el-icon-refresh" @click="fileReload(file,index)"></i>
            <i v-if="file.uploadState!==1" class="el-icon-delete" @click="delFile(file,index)"></i>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="bigImgDialog" width="40%" center>
      <div class="bigproimg">
        <img :src="url" alt="" class="bigImg">
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {upload, multipartUploadWithSts, getExtranetUrl, deleteFile} from '../plugins/oss-sdk'

  export default {
    data() {
      return {
        accept: '',
        bigImgDialog: false,
        url: '',
        width: 126,
        headers: {},
        files: [],
        fileOpt: '',
        clientConfig: {  //OSS上传配置项信息（可选），当isNotNeedRequest为true时必填项
          accessKeyId: '',//通过阿里云控制台创建的access key
          accessKeySecret: '',//通过阿里云控制台创建的access secret。
          stsToken: '',//使用临时授权方式。
          bucket: '',// 通过控制台创建的bucket。
          endpoint: '',//OSS域名。
          cname: true, //是否支持上传自定义域名，默认false。如果cname为true，endpoint传入自定义域名时，自定义域名需要先同bucket进行绑定。
          region: 'oss-cn-hangzhou', //bucket 所在的区域，默认 oss-cn-hangzhou（是根据当前所在区域自动确认的）。
        }
      };
    },
    mounted() {
      if (this.fileList) {
        this.files = this.fileList.map(item => {
          return item;
        });
      }
    },
    methods: {
      changeFile(e) {
        const fileTemplate = {
          isUploading: false,//文件是否正在上传
          uploadState: 0,//文件状态 0初始状态 1上传中 2上传失败 3上传成功
          percentage: 0,//该文件的上传进度
          uploadSuccess: false,//该文件是否上传成功
          fileOpt: '',//该文件的上传进度节点，上传失败时可以使用继续上传
        }; //每一个文件包含的其他字段（可选）
        const config = {
          action: this.action, //获取取配置信息接口请求地址，当isNotNeedRequest为false时必传。
          fileList: this.files,//文件列表
          template: fileTemplate, //文件添加时的其他默认值，可自定义需要的字段
          cb: this.progressCallback, //上传进度回调函数
          // fileNumber: this.fileNumber,//文件限制数量 不传或者传非为不限制数量
          // isNotNeedRequest: false,//默认为false，即需要请求接口获取配置信息，不需要时，请设置为true。
          // clientRequest: this.clientConfig,//当isNotNeedRequest为true时必填项，配置项详情请查看OSS上传的配置项文档。https://help.aliyun.com/
        }; //配置项
        upload(e, config).then((resolve) => {
          const result = resolve.data, fileList = resolve.fileList;
          // console.log(result, this.files);
          let filesObj = fileList.filter((item) => {
            return item.name === result.name
          });
          if (filesObj.length) {
            filesObj = filesObj[0];
            filesObj.isUploading = false;
            if (result.res.status === 200) {
              console.log(result);
              filesObj.uploadSuccess = true;
              filesObj.uploadState = 3;
              filesObj.address = getExtranetUrl(result.name, 1);//获取图片外网访问地址
            } else {
              filesObj.uploadState = 2;
              console.error(result);
            }
          }
          this.removeFile();//移除选择文件的选中状态，可以继续选择文件
          this.$emit('upload', this.files);//传出所有的文件
        }).catch(_ => {
          this.removeFile();
          if (_.uploadCode === 0) {
            this.$message.error(_.message);
            return;
          } else {
            console.error(_)
          }
          let filesObj = this.files.filter((item) => {
            return item.name === _.storeAs
          });
          if (filesObj.length) {
            filesObj = filesObj[0];
            filesObj.uploadState = 2;
            if (_.cpt) {
              filesObj.fileOpt = _.cpt;
            }
          }
        })
      },
      progressCallback(percent, storeAs, cpt) {//参数说明：当前上传进度的  当前上传的文件名  当前上传节点（进行重新上传时使用）
        console.log(percent, storeAs);
        let filesObj = this.files.filter((item) => {
          return item.name === storeAs
        });
        if (filesObj.length) {
          filesObj = filesObj[0];
          filesObj.isUploading = true;
          filesObj.uploadState = 1;
          filesObj.percentage = Math.round(percent * 10000) / 100;
        }
      },
      lookBigImg(file, index) {//查看图片大图
        this.url = file.fileUrl;
        this.bigImgDialog = true;
      },
      delFile(file, index) {//删除OSS服务器上的文件
        deleteFile(file.name).then((res) => {
          this.files.splice(index, 1);
          this.removeFile();//移除选择文件的选中状态，可以继续选择文件
          this.$emit('deleteFile', this.files, this.client);
        }).catch((err) => {
          if (err.errCode === 999) {//该状态为文件没有上传成功，可以直接在本地删除
            this.files.splice(index, 1);
            console.warn(err)
          } else {
            console.error(err)
          }
          this.$emit('deleteFile', this.files, this.client);
        });
      },
      removeFile() {//移除选择文件的选中状态，可以继续选择文件
        let fileObj = this.$refs['file'];
        if (fileObj) {
          fileObj.value = '';
        }
      },
      downloadFile(name) {//下载文件
        let url;
        if (this.client) {
          url = getExtranetUrl(name, 1);//获取图片外网访问地址
          window.open(url, name);
        } else {
          this.$message.error('获取下载地址失败！');
        }
      },
      fileReload(item, index) {
        new Promise((resolve, reject) => {
          let uploadConfig = {
            action: this.action,//请求地址
            resolve: resolve,//Promise(成功的返回)
            reject: reject,// Promise(失败的返回)
            progressCb: this.progressCallback,//上传进度回调函数
            // isNotNeedRequest: false,//默认为false，即需要请求接口获取配置信息，不需要时，请设置为true。
            // clientRequest: this.clientConfig,//当isNotNeedRequest为true时必填项，配置项详情请查看OSS上传的配置项文档。https://help.aliyun.com/
          };
          item.fileOpt && (uploadConfig.cpt = item.fileOpt);//如果该文件有上传进度节点，则重新上传。
          multipartUploadWithSts(item.name, item.target, uploadConfig);//参数说明：文件名；文件；配置对象
        }).then((res) => {
          console.log(res)
        }).catch(_ => {
          console.log(_);
          this.removeFile();
          let filesObj = this.files.filter((item) => {
            return item.name === _.storeAs
          });
          if (filesObj.length) {
            filesObj = filesObj[0];
            filesObj.uploadState = 2;
            if (_.cpt) {
              filesObj.fileOpt = _.cpt;
            }
          }
        });
      },
    },
    props: {
      action: {
        type: String,
      },
      fileList: {
        type: Array,
      },
      fileNumber: {
        type: Number,
      }
    },
    watch: {
      fileList: {
        handler(val) {
          if (val) {
            this.files = val.map(item => {
              return item;
            });
          }
        },
        immediate: true
      }
    }
  }
</script>

<style lang="scss" scoped>
  .info {
    margin-top: 20px;
    li {
      margin-bottom: 10px;
    }
  }

  body {
    background-color: #eee;
  }

  .f-center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  .el-upload-file {
    display: inline-block;
    width: 126px;
    height: 126px;
    border: 2px dashed #c0c4cc;
    position: relative;
    margin-top: 10px;
    margin-right: 20px;
    text-align: center;
    i {
      line-height: 126px;
      font-size: 40px;
      color: #c0c4cc;
    }
    input {
      position: absolute;
      width: 126px;
      height: 126px;
      left: 0;
      top: 0;
      opacity: 0;
    }
    .f-plus {
      position: relative;
      width: 100%;
      height: 100%;
      .f-col {
        width: 30%;
        height: 2px;
        background: #c0c4cc;
      }
      .f-row {
        height: 30%;
        width: 2px;
        background: #c0c4cc;
      }
    }
  }

  .el-upload-file:hover {
    border-color: #16B8BD;
    color: #16b8bd;
  }

  .info-item {
    word-break: break-all;
    cursor: pointer;
    > span {
      line-height: 32px;
    }
    .el-icon-download {
      font-size: 18px;
      margin-left: 10px;
      margin-top: 2px;
    }
  }

  .f-file-upload {
    width: 129px;
    height: 129px;
    display: inline-block;
    position: relative;
    border-radius: 5px;
    border: 2px solid #e5e5e5;
    box-sizing: border-box;
    overflow: hidden;
    .file-upload-loading {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: 1;
    }
    .f-file-title {
      position: absolute;
      right: -15px;
      top: -6px;
      width: 40px;
      height: 24px;
      background: #13ce66;
      text-align: center;
      transform: rotate(45deg);
      box-shadow: 0 0 1pc 1px rgba(0, 0, 0, .2);
      z-index: 100;
    }
    .f-file-success {
      position: absolute;
      left: 36%;
      top: 54%;
      width: 8px;
      height: 4px;
      border-left: 2px solid;
      border-bottom: 2px solid;
      transform: rotate(-90deg);
      border-color: #fff;
    }
    .f-file-item {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: 20;
      background: rgba(0, 0, 0, 0.5);
      img {
        width: 100%;
        height: 100%;
      }
      .f-file-name {
        width: 90%;
        max-height: 90%;
        font-size: 12px;
        text-align: center;
        word-break: break-all;
        color: #fff;
      }
      .f-file-warp {
        position: absolute;
        left: 0;
        top: 0;
        display: none;
        width: 100%;
        height: 100%;
        z-index: 100;
        background: rgba(0, 0, 0, 0.5);
        font-size: 18px;
        color: #fff;
        > div {
          > i {
            cursor: pointer;
          }
        }
      }
    }
  }

  .f-file-upload:hover {
    .f-file-title {
      display: none;
    }
    .f-file-item .f-file-warp {
      display: block;
    }
  }
</style>
