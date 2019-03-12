<template>
  <div class="wrap">
    <div class="title">图片上传：</div>
    <oss-upload action="http://192.168.0.154:7080/" @deleteFile="getFiles" @upload="getFiles"></oss-upload>
    <ul class="info">
      <li v-for="(item,index) in files" :key="index" v-if="item.address" v-clipboard:copy="getUrl(item.name,1)"
          v-clipboard:success="onCopy" v-clipboard:error="onError" class="info-item">
        <span>{{item.name}}</span>
        <!--<a class="el-icon-download icon" :href="downloadFile(item.name)" :download="item.name"></a>-->
        <i class="el-icon-download" @click.stop="downloadFile(item.name)"></i>
      </li>
    </ul>
  </div>
</template>

<script>
  import {getExtranetUrl} from '../plugins/oss-sdk'
  import ossUpload from './oss-upload'

  export default {
    data() {
      return {
        files: [],
        client: '',
      };
    },
    mounted() {
    },
    methods: {
      getFiles(list, client) {
        this.client = client ? client : '';
        this.files = list ? list : [];
      },
      onCopy(e) {
        this.$message({
          message: '复制成功',
          type: 'success'
        });
      },
      onError(e) {
        this.$message.error('复制失败');
      },
      getUrl(name, type) {
        return getExtranetUrl(name, type)
      },
      downloadFile(name) {//下载文件
        let url;
        if (name) {
          url = getExtranetUrl(name, 1);
          window.open(url, name);
        } else {
          this.$message.error('获取下载地址失败！');
        }
        // return url;
      },
    },
    components: {
      ossUpload
    }
  }
</script>

<style lang="scss" scoped>
  .wrap {
    margin: 50px;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 40px;
    background-color: #fff;
  }

  .title {
    margin-bottom: 10px;
  }

  .el-upload-list__item {
    img {
      object-fit: contain;
    }
  }

  .info {
    margin-top: 20px;
    li {
      margin-bottom: 10px;
    }
  }

  body {
    background-color: #eee;
  }
</style>
