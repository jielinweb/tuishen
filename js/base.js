$(function () {

    //页面滚动时，顶部条固定
    $(window).scroll(
        function () {
            var top = $(window).scrollTop();
            if (top > 0) {
                $(".top").addClass("topfixed");
            }
            else {
                $(".top").removeClass("topfixed")
            }
        });
        
    // 轮播图
    $('#home_slider').flexslider({
        animation: 'slide',
        controlNav: true,
        directionNav: true,/*banner左右箭头*/
        animationLoop: true,
        slideshow: true,
        useCSS: true
    });
    // seo优化技巧
    $('#seo_slider').flexslider({
        animation: 'slide',
        controlNav: true,
        directionNav: true,/*banner左右箭头*/
        animationLoop: true,
        slideshow: true,
        useCSS: true
    });

    //返回上一步
    var location = "http://m.tmsen.cn";
    var myURL = document.location.href;
    if (myURL != location) {
        $(".reback").show();
    }
    else {
        $(".top .logo").addClass("logo_l");
    }
    $(".reback").click(function () {
        // history.go(-1);
        // return false;
        history.back();
    });

    //侧边导航
    $('.on-menu').click(function () {
        $('#container').animate({
            marginLeft: "-100%"
        });
        $("#sidenav").addClass("open");
    });
    $('.close-menu').click(function () {
        $('#container').animate({
            marginLeft: "0px"
        });
        $("#sidenav").removeClass("open");
    });
    $(".nav li").click(function () {
        $(this).children(".menu").slideToggle(200);
        $(this).siblings().children(".menu").slideUp(200);
        $(this).addClass("on").siblings().removeClass("on");
    });

    //文字列表导航
    $(".yxlist li:gt(5)").css("display", "none");
    $(".yxbox .btn2").hide();
    $(".yxbox .btn1").click(function () {
        $(".yxlist li").css("display", "block");
        $(".yxbox .btn2").show();
        $(".yxbox .btn1").hide();
    });
    $(".yxbox .btn2").click(function () {
        $(".yxlist li:gt(5)").css("display", "none");
        $(".yxbox .btn1").show();
        $(".yxbox .btn2").hide();
    });
    //返回顶部
    $(".fixed").hide();
    $(window).scroll(
        function () {
            var top = $(window).scrollTop();
            if (top > 200) {
                $(".fixed").show();
            }
            else {
                $(".fixed").hide();
            }
        });
    $(".fixed").click(function () {
        $("html,body").animate({ scrollTop: 0 }, 600);
    });
    //二级页面导航
    var snav = $(".snav a");
    for (var i = 0; i < snav.length; i++) {
        var links = snav[i].getAttribute("href");
        var myURL = document.location.href;
        if (myURL.indexOf(links) != -1) {
            snav[i].className = "on";
        }
    }

    //快速排名页面
    $(".tui_title li").first().addClass("current").siblings().removeClass("current");
    $(".tui_box .tui_content").first().show().siblings().hide();
    $(".tui_title li").mouseover(function () {
        $(this).addClass("current").siblings().removeClass("current");
        var a = $(this).index();
        //document.title=a;
        $(".tui_box .tui_content").eq(a).show().siblings().hide();
    });
    $(".yun_case a").css("opacity", "1");

    //b2b推广页面 
    $('.yxxt-main-t .t-main ul').eq(0).show().siblings().hide();
    $('.yxxt-main-t .t-meau a').click(function () {
        var linum = $(this).index();
        $(this).addClass('on').siblings().removeClass('on');
        $('.yxxt-main-t .t-main ul').eq(linum).fadeIn().siblings().hide();
    });

    //企业百科页面    
    $('.tabPanel ul li').eq(0).children('img').attr('src', function () {
        return '/img/00.jpg';
    });
    $('.panes .pane').eq(0).show().siblings().hide();
    $('.tabPanel ul li').hover(function () {
        $('.tabPanel ul li').eq(0).children('img').attr('src', function () {
            return '/img/0.jpg';
        });
        var i = $(this).index();
        $(this).children('img').attr('src', function () {
            return '/img/' + i + i + '.jpg';
        });
        $('.panes>div:eq(' + $(this).index() + ')').show().siblings().hide();
    }, function () {
        var i = $(this).index();
        $(this).children('img').attr('src', function () {
            return '/img/' + i + '.jpg';
        });
    })

    function MM_preloadImages() {
        var d = document; if (d.images) {
            if (!d.MM_p) d.MM_p = new Array();
            var i, j = d.MM_p.length, a = MM_preloadImages.arguments; for (i = 0; i < a.length; i++)
                if (a[i].indexOf("#") != 0) { d.MM_p[j] = new Image; d.MM_p[j++].src = a[i]; }
        }
    }

    function MM_swapImgRestore() {
        var i, x, a = document.MM_sr; for (i = 0; a && i < a.length && (x = a[i]) && x.oSrc; i++) x.src = x.oSrc;
    }

    function MM_findObj(n, d) {
        var p, i, x; if (!d) d = document; if ((p = n.indexOf("?")) > 0 && parent.frames.length) {
            d = parent.frames[n.substring(p + 1)].document; n = n.substring(0, p);
        }
        if (!(x = d[n]) && d.all) x = d.all[n]; for (i = 0; !x && i < d.forms.length; i++) x = d.forms[i][n];
        for (i = 0; !x && d.layers && i < d.layers.length; i++) x = MM_findObj(n, d.layers[i].document);
        if (!x && d.getElementById) x = d.getElementById(n); return x;
    }

    function MM_swapImage() {
        var i, j = 0, x, a = MM_swapImage.arguments; document.MM_sr = new Array; for (i = 0; i < (a.length - 2); i += 3)
            if ((x = MM_findObj(a[i])) != null) { document.MM_sr[j++] = x; if (!x.oSrc) x.oSrc = x.src; x.src = a[i + 2]; }
    }


});
//留言板
function sendMsg() {
    var username = $("#txtUserName").val();
    var tel = $("#txtUserTel").val();
    var reg = /^(13[0-9]|15[012356789]|18[0-9]|17[678]|14[57])[0-9]{8}$/;
    var re = /^[0-9]+.?[0-9]*$/;
    if (username == "") {
        alert("请填写您的姓名！");
        $("#txtUserName").focus();
        return false;
    }
    if (tel == "" || (tel != "" && !reg.test(tel))) {
        alert("请填写正确有效的手机号码");
        $("#txtUserTel").focus();
        return false;
    }
    var options = {
        // 留言请求接口
        url: '/plugins/feedback/ajax.ashx?action=add&site=shangqiyun',
        type: 'post',
        dataType: 'html',
        data: {
            txtUserName: $("#txtUserName").val(),
            txtUserTel: $("#txtUserTel").val()
        },
        success: function (data) {
            alert("留言成功");
        }, error: function (error) {
            alert("对不起，出问题了。");
        }
    };
    jQuery.ajax(options);
} 
