webpackJsonp([1],{"+8CK":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},r=[],s={render:i,staticRenderFns:r};t.a=s},"/7sk":function(e,t,n){"use strict";var i=n("rVsN"),r=n.n(i),s=n("w7Bb");t.a={data:function(){return{accept:"",bigImgDialog:!1,url:"",width:126,headers:{},files:[],fileOpt:"",clientConfig:{accessKeyId:"",accessKeySecret:"",stsToken:"",bucket:"",endpoint:"",cname:!0,region:"oss-cn-hangzhou"}}},mounted:function(){this.fileList&&(this.files=this.fileList.map(function(e){return e}))},methods:{changeFile:function(e){var t=this,n={isUploading:!1,uploadState:0,percentage:0,uploadSuccess:!1,fileOpt:""},i={action:this.action,fileList:this.files,template:n,cb:this.progressCallback};Object(s.d)(e,i).then(function(e){var n=e.data,i=e.fileList,r=i.filter(function(e){return e.name===n.name});r.length&&(r=r[0],r.isUploading=!1,200===n.res.status?(console.log(n),r.uploadSuccess=!0,r.uploadState=3,r.address=Object(s.b)(n.name,1)):(r.uploadState=2,console.error(n))),t.removeFile(),t.$emit("upload",t.files)}).catch(function(e){if(t.removeFile(),0===e.uploadCode)return void t.$message.error(e.message);console.error(e);var n=t.files.filter(function(t){return t.name===e.storeAs});n.length&&(n=n[0],n.uploadState=2,e.cpt&&(n.fileOpt=e.cpt))})},progressCallback:function(e,t,n){console.log(e,t);var i=this.files.filter(function(e){return e.name===t});i.length&&(i=i[0],i.isUploading=!0,i.uploadState=1,i.percentage=Math.round(1e4*e)/100)},lookBigImg:function(e,t){this.url=e.fileUrl,this.bigImgDialog=!0},delFile:function(e,t){var n=this;Object(s.a)(e.name).then(function(e){n.files.splice(t,1),n.removeFile(),n.$emit("deleteFile",n.files,n.client)}).catch(function(e){999===e.errCode?(n.files.splice(t,1),console.warn(e)):console.error(e),n.$emit("deleteFile",n.files,n.client)})},removeFile:function(){var e=this.$refs.file;e&&(e.value="")},downloadFile:function(e){var t=void 0;this.client?(t=Object(s.b)(e,1),window.open(t,e)):this.$message.error("获取下载地址失败！")},fileReload:function(e,t){var n=this;new r.a(function(t,i){var r={action:n.action,resolve:t,reject:i,progressCb:n.progressCallback};e.fileOpt&&(r.cpt=e.fileOpt),Object(s.c)(e.name,e.target,r)}).then(function(e){console.log(e)}).catch(function(e){console.log(e),n.removeFile();var t=n.files.filter(function(t){return t.name===e.storeAs});t.length&&(t=t[0],t.uploadState=2,e.cpt&&(t.fileOpt=e.cpt))})}},props:{action:{type:String},fileList:{type:Array},fileNumber:{type:Number}},watch:{fileList:{handler:function(e){e&&(this.files=e.map(function(e){return e}))},immediate:!0}}}},"37wE":function(e,t){},"8jQz":function(e,t,n){"use strict";function i(e){n("YNhZ")}var r=n("/7sk"),s=n("zAEU"),a=n("C7Lr"),o=i,c=a(r.a,s.a,!1,o,"data-v-cd8c0f14",null);t.a=c.exports},M93x:function(e,t,n){"use strict";function i(e){n("37wE")}var r=n("sEFh"),s=n("+8CK"),a=n("C7Lr"),o=i,c=a(r.a,s.a,!1,o,null,null);t.a=c.exports},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("rVsN"),r=n.n(i),s=n("83B7"),a=n("M93x"),o=n("YaEn"),c=n("Ip9M"),l=n.n(c),u=n("KPKd"),f=n.n(u);s.default.use(l.a),s.default.use(f.a),window.Promise=r.a,o.a.beforeEach(function(e,t,n){n()}),new s.default({el:"#app",router:o.a,render:function(e){return e(a.a)},template:"<App/>",components:{App:a.a}})},RTAW:function(e,t,n){"use strict";function i(e){n("q9Dk")}var r=n("jUvt"),s=n("gVwO"),a=n("C7Lr"),o=i,c=a(r.a,s.a,!1,o,"data-v-1474cbce",null);t.a=c.exports},YNhZ:function(e,t){},YaEn:function(e,t,n){"use strict";var i=n("83B7"),r=n("KGCO"),s=n("RTAW");i.default.use(r.a),t.a=new r.a({routes:[{path:"/",name:"upload",component:s.a,hidden:!0}]})},gVwO:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap"},[n("div",{staticClass:"title"},[e._v("图片上传：")]),e._v(" "),n("oss-upload",{attrs:{action:"http://192.168.0.154:7080/"},on:{deleteFile:e.getFiles,upload:e.getFiles}}),e._v(" "),n("ul",{staticClass:"info"},e._l(e.files,function(t,i){return t.address?n("li",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.getUrl(t.name,1),expression:"getUrl(item.name,1)",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],key:i,staticClass:"info-item"},[n("span",[e._v(e._s(t.name))]),e._v(" "),n("i",{staticClass:"el-icon-download",on:{click:function(n){return n.stopPropagation(),e.downloadFile(t.name)}}})]):e._e()}),0)],1)},r=[],s={render:i,staticRenderFns:r};t.a=s},jUvt:function(e,t,n){"use strict";var i=n("w7Bb"),r=n("8jQz");t.a={data:function(){return{files:[],client:""}},mounted:function(){},methods:{getFiles:function(e,t){this.client=t||"",this.files=e||[]},onCopy:function(e){this.$message({message:"复制成功",type:"success"})},onError:function(e){this.$message.error("复制失败")},getUrl:function(e,t){return Object(i.b)(e,t)},downloadFile:function(e){var t=void 0;e?(t=Object(i.b)(e,1),window.open(t,e)):this.$message.error("获取下载地址失败！")}},components:{ossUpload:r.a}}},q9Dk:function(e,t){},sEFh:function(e,t,n){"use strict";t.a={name:"app"}},w7Bb:function(e,t,n){"use strict";function i(e,t,n){var i=n.action;if(n.isNotNeedRequest&&n.clientRequest)try{b=new h(n.clientRequest),r(b,e,t,n)}catch(t){n.reject({err:t,storeAs:e})}else i||n.reject({uploadCode:0,message:"如果要请求获取配置接口，请给定接口地址！",storeAs:e}),h.urllib.request(i,{method:"GET"},function(i,s){var a=void 0,o=void 0;if(i)return n.reject({err:i,storeAs:e}),console.error(i);try{a=JSON.parse(s)}catch(t){return o="parse sts response info error: "+t.message,n.reject({err:t,storeAs:e}),console.error(o)}var c={accessKeyId:a.AccessKeyId,accessKeySecret:a.AccessKeySecret,stsToken:a.SecurityToken,bucket:"park-static",endpoint:"oss.zhihuipk.com",cname:!0,region:"oss-cn-hangzhou"};try{b=new h(c),r(b,e,t,n)}catch(t){n.reject({err:t,storeAs:e})}})}function r(e,t,n,i){var r=void 0,s=i.cpt,a=i.progressCb;s?(console.log("multitest with cpt",s),e.multipartUpload(t,n,{parallel:2,checkpoint:s,progress:function(){function e(e,n,i){return t.apply(this,arguments)}var t=v()(d.a.mark(function e(t,n,i){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a&&a(t,n,i),r=i;case 2:case"end":return e.stop()}},e,this)}));return e}()}).then(function(e){i.resolve({data:e,fileList:w})}).catch(function(e){var n={err:e,storeAs:t};void 0!==r&&null!==r&&(n.cpt=r),i.reject(n)})):(console.log("multitest without cpt"),e.multipartUpload(t,n,{parallel:2,progress:function(){function e(e,t){return n.apply(this,arguments)}var n=v()(d.a.mark(function e(n,i){return d.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:a&&a(n,t,i),r=i;case 2:case"end":return e.stop()}},e,this)}));return e}()}).then(function(e){i.resolve({data:e,fileList:w})}).catch(function(e){var n={err:e,storeAs:t};void 0!==r&&null!==r&&(n.cpt=r),i.reject(n)}))}function s(e,t){w=t.fileList?t.fileList:[];var n=t.fileNumber,s=t.action,o=t.template,c=t.cb;_=!!t.isNotNeedRequest;var l=o&&o.constructor===Object?o:{},f=c&&c.constructor===Function?c:"";return new m.a(function(o,c){var d=e.target.files||e.dataTransfer.files,p=d[0],v=p.name;C=v;var g=["image/png","image/jpeg ","image/jpg","image/gif"].indexOf(p.type)>-1,m=w.filter(function(e){return e.name===v});if(_&&!(y=t.clientRequest))return void c({uploadCode:0,message:"如果不需要请求获取配置接口，请给定规范的配置对象！详情请查看OSS文档"});if(n&&n<=w.length)return void c({uploadCode:0,message:"最大上传"+n+"个文件！"});if(m.length)c({uploadCode:0,message:"该文件已经上传过了"}),console.warning("该文件已经上传过了");else{var j={action:s,resolve:o,reject:c,progressCb:f};if(g)a(d).then(function(e){if(1===n&&(t.fileList?t.fileList=[]:w=[]),w.push(u()(l,{target:d[0],name:v,type:1,fileUrl:e,address:""})),_)try{b=new h(y),r(b,v,p,j)}catch(e){j.reject({err:e,storeAs:v})}else i(v,p,j)});else if(1===n&&(t.fileList?t.fileList=[]:w=[]),w.push(u()(l,{target:d[0],name:v,type:0,address:""})),_)try{b=new h(y),r(b,v,p,j)}catch(e){j.reject({err:e,storeAs:v})}else i(v,p,j)}})}function a(e){return new m.a(function(t,n){for(var i=e.length,r=0;r<i;r++){var s=new FileReader;s.readAsDataURL(e[r]),s.onload=function(e){(new Image).src=this.result,t(this.result)}}})}function o(e,t){if(b)return 1===t?b.signatureUrl(e):b.getObjectUrl(e)}function c(e,t){return new m.a(function(t,n){b&&b.delete?b.delete(e).then(function(e){t(e)}).catch(function(e){n(e)}):n({errCode:999,errContent:"client is null , Please upload the file before deleting it !"})})}n.d(t,"d",function(){return s}),n.d(t,"b",function(){return o}),n.d(t,"c",function(){return i}),n.d(t,"a",function(){return c});var l=n("aA9S"),u=n.n(l),f=n("lC5x"),d=n.n(f),p=n("J0Oq"),v=n.n(p),g=n("rVsN"),m=n.n(g),h=n("SEXl"),w=[],b="",C="",_=!1,y="";window.Promise=m.a},zAEU:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"el-upload-file"},[e._m(0),e._v(" "),n("input",{ref:"file",attrs:{type:"file",accept:e.accept},on:{change:e.changeFile}})]),e._v(" "),e._l(e.files,function(t,i){return n("div",{key:i,staticClass:"f-file-upload"},[n("div",{staticClass:"file-upload-loading"},[t.isUploading?n("el-progress",{attrs:{type:"circle","stroke-width":6,percentage:t.percentage}}):e._e()],1),e._v(" "),t.uploadSuccess?n("div",{staticClass:"f-file-title"},[n("div",{staticClass:"f-file-success f-center"})]):e._e(),e._v(" "),t.isUploading?e._e():n("div",{staticClass:"f-file-item"},[t.type?n("img",{attrs:{src:t.fileUrl,alt:""}}):n("div",{staticClass:"f-file-name f-center",attrs:{title:t.name}},[e._v(e._s(t.name)+"\n      ")]),e._v(" "),n("div",{staticClass:"f-file-warp"},[n("div",{staticClass:"f-center",staticStyle:{width:"100%","text-align":"center"}},[1===t.type?n("i",{staticClass:"el-icon-zoom-in",on:{click:function(n){return e.lookBigImg(t,i)}}}):e._e(),e._v(" "),2===t.uploadState?n("i",{staticClass:"el-icon-refresh",on:{click:function(n){return e.fileReload(t,i)}}}):e._e(),e._v(" "),1!==t.uploadState?n("i",{staticClass:"el-icon-delete",on:{click:function(n){return e.delFile(t,i)}}}):e._e()])])])])}),e._v(" "),n("el-dialog",{attrs:{visible:e.bigImgDialog,width:"40%",center:""},on:{"update:visible":function(t){e.bigImgDialog=t}}},[n("div",{staticClass:"bigproimg"},[n("img",{staticClass:"bigImg",attrs:{src:e.url,alt:""}})])])],2)},r=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"f-plus"},[n("div",{staticClass:"f-col f-center"}),e._v(" "),n("div",{staticClass:"f-row f-center"})])}],s={render:i,staticRenderFns:r};t.a=s}},["NHnr"]);
//# sourceMappingURL=app.a5c1a2726067a1d049e9.js.map