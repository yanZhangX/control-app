<template>
  <div>
    <editor id="tinymce" v-model="myValue" :init="init" @onClick="onClick"> </editor>
  </div>
</template>
<script>
import tinymce from 'tinymce/tinymce'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/themes/silver/theme'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/contextmenu'
import 'tinymce/plugins/wordcount'
import 'tinymce/plugins/colorpicker'
import 'tinymce/plugins/textcolor'
export default {
  name: 'richtext',
  components: {
    Editor
  },
  data() {
    return {
      // 初始化配置
      init: {
        language_url: '/static/tinymce/langs/zh_CN.js',
        language: 'zh_CN',
        skin_url: '/static/tinymce/skins/ui/oxide',
        width: 750,
        height: 600,
        branding: false, // 是否禁用“Powered by TinyMCE”
        // menubar: false, //菜单栏
        // menubar: "view",
        theme: 'silver', // 主题
        elementpath: false, // 禁用编辑器底部的状态栏
        image_advtab: true,
        images_upload_url: 'https://api.jianchejia.cn/v2/common/upload', //  图片上传地址
        file_picker_types: 'media',
        content_style: `*{ padding:0; margin:0; }     html, body                { height:100%; }     img                       { max-width:100%; display:block;height:auto; }     a                         { text-decoration: none; }     iframe                    { width: 100%; }     p                         { line-height:1.6; margin: 0px; }     table                     { word-wrap:break-word; word-break:break-all; max-width:600px; border:none; border-color:#999; }     .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }     ul,ol                     { list-style-position:inside; }   `,
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        media_live_embeds: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        statusbar: false, // 隐藏编辑器底部的状态栏
        images_upload_handler: (blobInfo, success, failure) => {
          console.log(blobInfo, success, failure, 'blobInfo, success, failure')
          var xhr, formData

          xhr = new XMLHttpRequest()
          xhr.withCredentials = false
          xhr.open('POST', 'https://api.jianchejia.cn/v2/common/upload') // 第一个参数是请求方式，第二个参数是请求地址，我这里配置的是struts的action，如果是其他（PHP等）的可这样配置：xxx.php

          xhr.onload = function() {
            var json
            console.log(xhr.status, 'xhr.status')
            if (xhr.status !== 200) {
              failure('HTTP Error: ' + xhr.status)
              return
            }
            json = JSON.parse(xhr.responseText)
            if (json.code === 1) {
              failure('Invalid JSON: ' + json.message)
              return
            }
            success(json.data.url)
          }

          formData = new FormData()
          formData.append('img', blobInfo.blob(), blobInfo.filename())
          xhr.send(formData)
        },
        plugins: 'link lists image code table wordcount media pageembed',
        toolbar:
          'searchreplace fontselect formatselect fontsizeselect bold italic underline strikethrough forecolor backcolor hr alignleft aligncenter alignright outdent indent blockquote undo redo removeformat subscript superscriptcode codesample bullist numlist table link image charmap preview anchor pagebreak insertdatetime media emoticons fullscreen pageembed '
      },
      myValue: this.value
    }
  },
  mounted() {
    tinymce.init({ skins: 'oxide' })
  },
  methods: {
    // 添加相关的事件，可用的事件参照文档=> https://github.com/tinymce/tinymce-vue => All available events
    // 需要什么事件可以自己增加
    onClick(e) {
      this.$emit('onClick', e, tinymce)
    },
    // 可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = ''
    }
  },
  watch: {
    value(newValue) {
      this.myValue = newValue
    },
    myValue(newValue) {
      this.$emit('input', newValue)
    }
  }
}
</script>
<style scoped></style>
