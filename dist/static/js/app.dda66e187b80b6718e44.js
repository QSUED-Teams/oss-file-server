webpackJsonp([1],{"+8CK":function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],a={render:i,staticRenderFns:s};t.a=a},"/7sk":function(e,t,n){"use strict";var i=n("rVsN"),s=n.n(i),a=n("3cXf"),r=n.n(a),o=n("w7Bb");t.a={data:function(){return{accept:"",bigImgDialog:!1,url:"",width:126,headers:{},files:[],fileTemplate:{isUploading:!1,percentage:0,uploadSuccess:!1}}},mounted:function(){this.fileList&&(this.files=this.fileList.map(function(e){return e}))},methods:{changeFile:function(e){var t=this,n=JSON.parse(r()(this.fileTemplate));Object(o.d)(e,this.action,this.files,this.fileNumber,n,this.progressCallback).then(function(e){var n=e.data,i=e.fileList;console.log(n,t.files);var s=i.filter(function(e){return e.name===n.name});s.length&&(s=s[0],s.isUploading=!1,200===n.res.status?(console.log(n),s.uploadSuccess=!0,s.address=Object(o.b)(n.name,1)):console.error(n)),t.removeFile(),t.$emit("upload",t.files)}).catch(function(e){t.removeFile(),0===e.uploadCode?t.$message.error(e.message):console.log(e)})},progressCallback:function(e,t,n){console.log(e,t);var i=this.files.filter(function(e){return e.name===t});i.length&&(i=i[0],i.isUploading=!0,i.percentage=Math.round(1e4*e)/100)},lookBigImg:function(e,t){this.url=e.fileUrl,this.bigImgDialog=!0},delFile:function(e,t){var n=this;Object(o.a)(e.name).then(function(e){n.files.splice(t,1),n.removeFile(),n.$emit("deleteFile",n.files,n.client)}).catch(function(e){999===e.errCode&&n.files.splice(t,1),n.$emit("deleteFile",n.files,n.client),console.error(e)})},removeFile:function(){var e=this.$refs.file;e&&(e.value="")},downloadFile:function(e){var t=void 0;this.client?(t=Object(o.b)(e,1),window.open(t,e)):this.$message.error("获取下载地址失败！")},fileReload:function(){var e=this;new s.a(function(t,n){Object(o.c)(e.action,storeAs,file,t,n,progressCb,cpt)})}},props:{action:{type:String},fileList:{type:Array},fileNumber:{type:Number}},watch:{fileList:{handler:function(e){e&&(this.files=e.map(function(e){return e}))},immediate:!0}}}},"37wE":function(e,t){},"8jQz":function(e,t,n){"use strict";function i(e){n("GVXH")}var s=n("/7sk"),a=n("kDnr"),r=n("C7Lr"),o=i,c=r(s.a,a.a,!1,o,"data-v-8fccd80a",null);t.a=c.exports},GVXH:function(e,t){},M93x:function(e,t,n){"use strict";function i(e){n("37wE")}var s=n("sEFh"),a=n("+8CK"),r=n("C7Lr"),o=i,c=r(s.a,a.a,!1,o,null,null);t.a=c.exports},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("83B7"),s=n("M93x"),a=n("YaEn"),r=n("Ip9M"),o=n.n(r),c=n("KPKd"),l=n.n(c);i.default.use(o.a),i.default.use(l.a),a.a.beforeEach(function(e,t,n){n()}),new i.default({el:"#app",router:a.a,render:function(e){return e(s.a)},template:"<App/>",components:{App:s.a}})},RTAW:function(e,t,n){"use strict";function i(e){n("q9Dk")}var s=n("jUvt"),a=n("gVwO"),r=n("C7Lr"),o=i,c=r(s.a,a.a,!1,o,"data-v-1474cbce",null);t.a=c.exports},YaEn:function(e,t,n){"use strict";var i=n("83B7"),s=n("KGCO"),a=n("RTAW");i.default.use(s.a),t.a=new s.a({routes:[{path:"/",name:"upload",component:a.a,hidden:!0}]})},gVwO:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"wrap"},[n("div",{staticClass:"title"},[e._v("图片上传：")]),e._v(" "),n("oss-upload",{attrs:{action:"http://192.168.0.154:7080/"},on:{deleteFile:e.getFiles,upload:e.getFiles}}),e._v(" "),n("ul",{staticClass:"info"},e._l(e.files,function(t,i){return t.address?n("li",{directives:[{name:"clipboard",rawName:"v-clipboard:copy",value:e.getUrl(t.name,1),expression:"getUrl(item.name,1)",arg:"copy"},{name:"clipboard",rawName:"v-clipboard:success",value:e.onCopy,expression:"onCopy",arg:"success"},{name:"clipboard",rawName:"v-clipboard:error",value:e.onError,expression:"onError",arg:"error"}],key:i,staticClass:"info-item"},[n("span",[e._v(e._s(t.name))]),e._v(" "),n("i",{staticClass:"el-icon-download",on:{click:function(n){return n.stopPropagation(),e.downloadFile(t.name)}}})]):e._e()}),0)],1)},s=[],a={render:i,staticRenderFns:s};t.a=a},jUvt:function(e,t,n){"use strict";var i=n("w7Bb"),s=n("8jQz");t.a={data:function(){return{files:[],client:""}},mounted:function(){},methods:{getFiles:function(e,t){this.client=t||"",this.files=e||[]},onCopy:function(e){this.$message({message:"复制成功",type:"success"})},onError:function(e){this.$message.error("复制失败")},getUrl:function(e,t){return Object(i.b)(e,t)},downloadFile:function(e){var t=void 0;e?(t=Object(i.b)(e,1),window.open(t,e)):this.$message.error("获取下载地址失败！")}},components:{ossUpload:s.a}}},kDnr:function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"el-upload-file"},[e._m(0),e._v(" "),n("input",{ref:"file",attrs:{type:"file",accept:e.accept},on:{change:e.changeFile}})]),e._v(" "),e._l(e.files,function(t,i){return n("div",{key:i,staticClass:"f-file-upload"},[n("div",{staticClass:"file-upload-loading"},[t.isUploading?n("el-progress",{attrs:{type:"circle","stroke-width":6,percentage:t.percentage}}):e._e()],1),e._v(" "),t.uploadSuccess?n("div",{staticClass:"f-file-title"},[n("div",{staticClass:"f-file-success f-center"})]):e._e(),e._v(" "),t.isUploading?e._e():n("div",{staticClass:"f-file-item"},[t.type?n("img",{attrs:{src:t.fileUrl,alt:""}}):n("div",{staticClass:"f-file-name f-center",attrs:{title:t.name}},[e._v(e._s(t.name)+"\n      ")]),e._v(" "),n("div",{staticClass:"f-file-warp"},[n("div",{staticClass:"f-center"},[1===t.type?n("i",{staticClass:"el-icon-zoom-in",staticStyle:{"margin-right":"10px"},on:{click:function(n){return e.lookBigImg(t,i)}}}):e._e(),e._v(" "),n("i",{staticClass:"el-icon-delete",on:{click:function(n){return e.delFile(t,i)}}})])])])])}),e._v(" "),n("el-dialog",{attrs:{visible:e.bigImgDialog,width:"40%",center:""},on:{"update:visible":function(t){e.bigImgDialog=t}}},[n("div",{staticClass:"bigproimg"},[n("img",{staticClass:"bigImg",attrs:{src:e.url,alt:""}})])])],2)},s=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"f-plus"},[n("div",{staticClass:"f-col f-center"}),e._v(" "),n("div",{staticClass:"f-row f-center"})])}],a={render:i,staticRenderFns:s};t.a=a},q9Dk:function(e,t){},sEFh:function(e,t,n){"use strict";t.a={name:"app"}},w7Bb:function(e,t,n){"use strict";function i(e,t,n,i,a,r,o){h.urllib.request(e,{method:"GET"},function(e,c){var l=void 0,u=void 0;if(e)return a(e),console.error(e);try{l=JSON.parse(c)}catch(e){return u="parse sts response info error: "+e.message,a(e),console.error(u)}w=new h({accessKeyId:l.AccessKeyId,accessKeySecret:l.AccessKeySecret,stsToken:l.SecurityToken,bucket:"park-static",endpoint:"oss.zhihuipk.com",cname:!0,region:"oss-cn-hangzhou"}),s(w,t,n,o,i,a,r)})}function s(e,t,n,i,s,a,r){var o=void 0;i?(console.log("multitest with cpt",i),e.multipartUpload(t,n,{parallel:2,checkpoint:i,progress:function(){function e(e,n,i){return t.apply(this,arguments)}var t=v()(g.a.mark(function e(t,n,i){return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r(t,n,i),o=i;case 2:case"end":return e.stop()}},e,this)}));return e}()}).then(function(e){s({data:e,fileList:b})}).catch(function(e){a(e)})):(console.log("multitest without cpt"),e.multipartUpload(t,n,{parallel:2,progress:function(){function e(e,t){return n.apply(this,arguments)}var n=v()(g.a.mark(function e(n,i){return g.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:r(n,t,i),o=i;case 2:case"end":return e.stop()}},e,this)}));return e}()}).then(function(e){s({data:e,fileList:b})}).catch(function(e){a(e)}))}function a(e,t,n,s,a,o){return b=n||[],a=a||{},new d.a(function(c,l){var f=e.target.files||e.dataTransfer.files,d=f[0],p=d.name;C=p;var g=["image/png","image/jpeg ","image/jpg","image/gif"].indexOf(d.type)>-1,m=b.filter(function(e){return e.name===p});if(s&&s<=b.length)return void l({uploadCode:0,message:"最大上传"+s+"个文件！"});m.length?(l({uploadCode:0,message:"该文件已经上传过了"}),console.warning("该文件已经上传过了")):g?r(f).then(function(e){1===s&&(n=[]),b.push(u()(a,{name:p,type:1,fileUrl:e,address:""})),i(t,p,d,c,l,o)}):(1===s&&(n=[]),b.push(u()(a,{name:p,type:0,address:""})),i(t,p,d,c,l,o))})}function r(e){return new d.a(function(t,n){for(var i=e.length,s=0;s<i;s++){var a=new FileReader;a.readAsDataURL(e[s]),a.onload=function(e){(new Image).src=this.result,t(this.result)}}})}function o(e,t){if(w)return 1===t?w.signatureUrl(e):w.getObjectUrl(e)}function c(e,t){return new d.a(function(t,n){w&&w.delete?w.delete(e).then(function(e){t(e)}).catch(function(e){n(e)}):n({errCode:999,errContent:"client is null , Please upload the file before deleting it !"})})}n.d(t,"d",function(){return a}),n.d(t,"b",function(){return o}),n.d(t,"c",function(){return i}),n.d(t,"a",function(){return c});var l=n("aA9S"),u=n.n(l),f=n("rVsN"),d=n.n(f),p=n("lC5x"),g=n.n(p),m=n("J0Oq"),v=n.n(m),h=n("SEXl"),b=[],w="",C=""}},["NHnr"]);
//# sourceMappingURL=app.dda66e187b80b6718e44.js.map