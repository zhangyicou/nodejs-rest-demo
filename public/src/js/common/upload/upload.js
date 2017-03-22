define(['jquery','lib/wAjax','common/upload/lib/plupload-2.1.2/js/plupload.full.min'],function($,wAjax){
    var new_multipart_params;

    var config = {
        ajaxUrl:'/web/v1/tenant/signup/oss/getAccessInfo'
    };
    function upload(){
        var accessid ='';
        var accesskey = '';
        var host = '';
        var policyBase64 ='';
        var signature = '';
        var object_id = '';
        var g_object_name = '';

        function get_suffix(filename) {
            pos = filename.lastIndexOf('.')
            suffix = ''
            if (pos != -1) {
                suffix = filename.substring(pos)
            }
            return suffix;
        };

        function calculate_object_name(filename)
        {
            suffix = get_suffix(filename)
            g_object_name = object_id + suffix;
            return ''
        };

        function set_upload_param(up, filename) {
            if (filename != '') {
                calculate_object_name(filename)
            }
            new_multipart_params = {
                'key' : g_object_name,
                'policy': policyBase64,
                'OSSAccessKeyId': accessid,
                'success_action_status' : '200', //让服务端返回200,不然，默认会返回204
                'signature': signature
            };

            up.setOption({
                'url': host,
                'multipart_params': new_multipart_params
            });

            up.start();
        };

        function getBtn(){
            if('ontouchmove' in window){
                var strbtn = 'licensePhoto_box';
            }else{
                var strbtn = 'select_btn';
            }
            return strbtn;
        }

        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : getBtn(),
            //multi_selection: false,
            container: document.getElementById('upload_container'),
            flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
            silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
            url : 'http://oss.aliyuncs.com',

            init: {
                PostInit: function() {
                    
                },

                FilesAdded: function(up, files) {
                    plupload.each(files, function(file) {
                        $('input[name="licenseSize"]').val(file.size);
                        // $('input[name="licenseName"]').val(file.name);
                        // if(file.name){
                        //     $('input[name="licenseName"]').parent().find('.error').html('').removeClass('error-show');
                        // }else{
                        //     $('input[name="licenseName"]').parent().find('.error').html('请上传营业执照影印件');
                        // }
                        //read img
                        var r = new FileReader();
                        r.onload = function(e){
                            var result =  e.target.result;
                            //jpg,png
                            var w,h;
                            var uploadImg = new Image();
                            uploadImg.onload = function(){
                                w = this.width;
                                h = this.height;
                                var box_w = $('.licensePhoto').width();
                                var box_h = $('.licensePhoto').height();
                                if(w > box_w || h > box_h){
                                    $('.licensePhoto').css('background-size','contain');
                                }else{
                                    $('.licensePhoto').css('background-size','auto auto');
                                }
                            }
                            uploadImg.src = result;
                            $('#select_btn').hide();
                            $('.licensePhoto').css('background-image','url('+result+')');
                            $('.licensePhoto-box').mouseenter(function(){
                                if(file.name){
                                    $('#select_btn').show().addClass('hover');
                                    $('.mask').stop().animate({opacity:1});
                                }
                            }).mouseleave(function(){
                                if(file.name){
                                    $('#select_btn').hide().addClass('hover');
                                    $('.mask').stop().animate({opacity:0});
                                }
                            });
                        }
                        r.readAsDataURL(file.getNative());
                        //上传
                        $.ajax({
                            url: config.ajaxUrl,
                            type: 'get',
                            dataType: 'json',
                            success: function (rs) {
                                if(rs && rs.status == 'ok'){
                                    accessid = rs.data.accessid;
                                    accesskey = rs.data.accesskey;
                                    host = rs.data.host;
                                    policyBase64 = rs.data.policyBase64;
                                    signature = rs.data.signature;
                                    object_id = rs.data.objectKey;
                                    g_object_name = '';
                                    set_upload_param(uploader, file.name);
                                    //$('input[name="licenseName"]').val(g_object_name);
                                }else{
                                    //上传失败
                                    $('#upload_container .error').removeClass('error-show').addClass('error-show').text('上传失败，请重新上传！');
                                }
                            }
                        });
                    });
                },

                BeforeUpload: function(up, file) {
                    set_upload_param(up, file.name, true);
                },
                FileUploaded: function(up, file, info) {
                    if (info.status == 200){
                        console.log('success');
                        $('input[name="licenseName"]').val(g_object_name);
                    }else{
                        console.log(info.response);
                    }
                },
                Error: function(up, err) {
                    console.log('error upload');
                }
            }
        });

        uploader.init();

        //mobile or pad
        /*if(!('mouseenter' in window)){
            $('.licensePhoto-box').click(function(){
                uploader.init();
            });
        }*/
    }



    return upload;

});



