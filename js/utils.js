/**
 * Created by Jielin on 2018/1/25.
 */

// 使用惰性思想(JS高阶编程技巧之一)来封装方法库
var utils = (function() {

    // flag变量不销毁，判断当前浏览器是否支持getComputedStyle，兼容就是标准浏览器，等于false就是IE6 7 8
    var flag = "getComputedStyle" in window;
    var doc = document;

    // 获取元素类的集合
    function getCls(cls, context) {
        context = context || doc;
        return context.getElementsByClassName(cls)[0];
    }


    // 设置或添加屏幕属性
    function getClient(key, val) {
        if (val !== undefined) {
            doc.documentElement[key] = val;
            doc.body[key] = val;
        }
        return doc.documentElement[key] || doc.body[key];
    }

    // 获取元素到根元素的偏移量
    function getOffset(elem) {
        var elemParent = elem.offsetParent,
            totalLeft = elem.offsetLeft,
            totalTop = elem.offsetTop,
            left = null,
            top = null;

        left += totalLeft;
        top += totalTop;

        while (elemParent) {
            if (window.navigator.userAgent.indexOf("MSIE 8.0") !== -1) {
                left += elemParent.offsetLeft;
                top += elemParent.offsetTop;
            } else {
                left += elemParent.clientLeft + elemParent.offsetLeft;
                top += elemParent.clientTop + elemParent.offsetTop;
            }
            elemParent = elemParent.offsetParent;
        }
        return {left: left, top: top};
    }

    // 将类数组转化为数组的兼容方法
    function listToArray(likeAry) {
        if (flag) {
            return ary = Array.prototype.slice.call(likeAry);
        }

        var ary = [];
        for (var i=0; i<likeAry.length; i++) {
            ary.push(likeAry[i]);
        }
        return ary;
    }

    // 获取当前元素下的所有子节点
    function childrens(ele, tagName) {
        var ary = [];

        // 非IE6 7 8下的操作，先获取所有的子元素，通过判断哪些是元素节点，是元素节点就添加在数组里边
        if (!flag) {
            var nodeList = ele.childNodes, len = nodeList.length;
            for (var i=0; i<len; i++) {
                var curNode = nodeList[i];
                if (curNode.nodeType === 1) {
                    ary.push(curNode);
                }
            }
        } else {

            // 由于ele.children返回的是个伪数组，需要调用Array原型下的slice方法转换成数组
            // ary = Array.prototype.slice.call(ele.children);
            ary = this.listToArray(ele.children);
        }

        // 进行第二次筛选,如果标签名不符合将通过数组的splice方法进行删除
        if (typeof tagName === "string") {
            for (var j=0; j<ary.length; j++) {
                var curNode = ary[j];
                if (curNode.nodeName.toLowerCase() !== tagName.toLowerCase()) {
                    ary.splice(j, 1);
                    j--;
                }
            }
        }
        return ary;
    }

    // 获取元素的上一个兄弟节点
    function prev(ele) {
        if (flag) {
            return ele.previousElementSibling;
        } else {
            var pre = ele.previousSibling;
            while (pre && pre.nodeType !== 1) {
                pre = pre.previousSibling;
            }
            return pre;
        }
    }

    // 获取元素的下一个兄弟节点
    function next(ele) {
        if (flag) {
            return ele.nextElementSibling;
        } else {
            var nex = ele.nextSibling;
            while (nex && nex.nodeType !== 1) {
                nex = nex.nextSibling;
            }
            return nex;
        }
    }

    // 获取当前元素的所有上级节点
    function prevAll(ele) {
        var ary = [];
        var pre = this.prev(ele);
        while (pre) {
            ary.unshift(pre);
            pre = this.prev(pre);
        }
        return ary;
    }

    // 获取当前元素的所有下级节点
    function nextAll(ele) {
        var ary = [];
        var nex = this.next(ele);
        while (nex) {
            ary.push(nex);
            nex = this.next(nex);
        }
        return ary;
    }

    // 获取所有的兄弟节点
    function siblings(ele) {
        return this.prevAll(ele).concat(this.nextAll(ele));
    }

    // 获取当前元素的索引
    function index(ele) {
        return this.prevAll(ele).length;
    }

    // 获取当前元素的第一个子节点
    function firstChild(ele) {
        var chs = this.childrens(ele);
        return chs.length > 0 ? chs[0] : null;
    }

    // 获取当前元素的最后一个子节点
    function lastChild(ele) {
        var chs = this.childrens(ele);
        return chs.length > 0 ? chs[chs.length - 1] : null;
    }

    // 在元素的子节点后面添加节点
    function append(container, newEle) {
        return container.appendChild(newEle);
    }

    // 在元素的子节点之前添加节点
    function prepend(container, newEle) {
        var fir = this.firstChild(container);
        if (fir) {
            container.insertBefore(newEle, fir);
            return;
        }
        container.appendChild(newEle);
    }

    // 将新元素添加到指定元素的前面
    function insertBefore(newEle, oldEle) {
        return oldEle.parentNode.insertBefore(newEle, oldEle);
    }

    // 将新元素添加到指定元素的后面,相当于追加到弟弟元素之前，如果弟弟元素不存在，则直接添加到末尾即可
    function insertAfter(newEle, oldele) {
        var nex = this.next(oldele);
        if (nex) {
            oldele.parentNode.insertBefore(newEle, oldele);
            return;
        }
        oldele.parentNode.appendChild(newEle);
    }

    // 检测当前节点是否包含该class
    function hasClass(ele, cls) {
        var reg = new RegExp("(^| +)"+ cls +"( +|$)");
        return reg.test(ele.className);
    }

    // 添加class，先将class通过split拆分成数组，再逐个判断
    function addClass(ele, cls) {
        var ary = cls.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curCls = ary[i];
            if (!this.hasClass(ele, curCls)) {
                ele.className += " " + cls;
            }
        }
    }

    // 移除class，先用split拆分class，逐个判断，将找到相同的class用replace替换为空
    function removeClass(ele, cls) {
        var ary = cls.replace(/(^ +| +$)/g, "").split(/ +/g);
        for (var i = 0, len = ary.length; i < len; i++) {
            var curCls = ary[i];
            if (this.hasClass(ele, curCls)) {
                var reg = new RegExp("(^| +)" + curCls + "($| +)", "g");
                ele.className = ele.className.replace(reg, " ");
            }
        }
    }
   

    // 获取css样式
    function getCss(attr) {
        // 正则验证需要去单位的节点
        var val = null;

        if (flag) {
            val = attr === 'opacity' ? window.getComputedStyle(this, null)[attr]/1 : window.getComputedStyle(this, null)[attr];
        } else {
            //这里处理filter的滤镜问题  alpha(opacity=40);
            if (attr === 'opacity') {
                // alpha(opacity=40)
                val = this.currentStyle['filter'];
                var reg1 = /^alpha\(opacity=(\d+(?:\.\d+)?)\)$/;
                return reg1.test(val) ? reg1.exec(val)[1] / 100 : 1;
            }
            val = this.currentStyle[attr];
        }

        //如果正则验证通过，返回值是带单位的,要人为去掉这个单位。否则不变
        var reg = /^(-?\d+(\.\d+)?)(?:px|em|pt|deg|rem)$/;
        return reg.test(val) ? parseFloat(val) : val;
    }


    // 设置css样式
    function setCss(attr, val) {
        if (attr === "float") {
            this["style"]["cssFloat"] = val;
            this["style"]["styleFloat"] = val;
            return;
        }

        if (attr === "opacity") {
            this["style"]["opacity"] = val;
            this["style"]["filter"] = "alpha(opacity="+ val * 100 +")";
            return;
        }

        var reg = /^(width|height|left|bottom|top|right|((margin|padding)(Top|Bottom|Left|Right)?))$/;
        if (reg.test(attr)) {
            if (!isNaN(val)) {
                val += "px";
            }
        }
        this["style"][attr] = val;
    }

    // 批量设置css样式
    function setGroupCss(options) {
        for (var key in options) {
            if (options.hasOwnProperty(key)) {
                setCss.call(this, key, options[key]);
            }
        }
    }

    // 灵活设置css样式
    function css(ele) {
        var ary = Array.prototype.slice.call(arguments, 1);
        var argTwo = arguments[1];

        // 如果第二个参数存在并且是字符串
        if (typeof argTwo === "string") {
            if (typeof arguments[2] === "undefined") {    // 第三个参数不存在就是获取css样式
                // return this.getCss(ele, argTwo);
                return getCss.apply(ele, ary);
            }

            // 如果第三个参数存在就是设置css样式
            // this.setCss(ele, argTwo, argThree);
            setCss.apply(ele, ary);
        }
        argTwo = argTwo || 0;
        if (argTwo.toString() === "[object Object]") {
            setGroupCss.apply(ele, ary);
        }
    }

    // function startMove(obj, json, fn) {
    //     clearInterval(obj.iTimer);
    //     var iCur = 0;
    //     var iSpeed = 0;
    //     var that = this;

    //     obj.iTimer = setInterval(function() {

    //         var iBtn = true;

    //         for ( var attr in json ) {

    //             var iTarget = json[attr];

    //             if (attr == 'opacity') {
    //                 iCur = Math.round(that.css( obj, 'opacity' ) * 100);
    //             } else {
    //                 iCur = parseInt(that.css(obj, attr));
    //             }

    //             iSpeed = ( iTarget - iCur ) / 8;
    //             iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

    //             if (iCur != iTarget) {
    //                 iBtn = false;
    //                 if (attr == 'opacity') {
    //                     obj.style.opacity = (iCur + iSpeed) / 100;
    //                     obj.style.filter = 'alpha(opacity='+ (iCur + iSpeed) +')';
    //                 } else {
    //                     obj.style[attr] = iCur + iSpeed + 'px';
    //                 }
    //             }

    //         }

    //         if (iBtn) {
    //             clearInterval(obj.iTimer);
    //             fn && fn.call(obj);
    //         }

    //     }, 30);
    // }

    function move(ele, target, duration, callBack) {
        var Linear = function (t, b, c, d) {
            return c * t / d + b;
        };

        if (target.toString() !== "[object Object]") return;

        window.clearInterval(ele.timer);

        // 定义每个方向的起始位置和当前所走的距离
        var begin = {}, change = {};
        for (var key in target) {
            if (target.hasOwnProperty(key)) {
                begin[key] = utils.css(ele, key);
                change[key] = target[key] - begin[key];
            }
        }

        // 多方向运动动画的实现
        var time = 0;
        var interval = 10;
        ele.timer = window.setInterval(function() {
            time += 10;
            if (time >= duration) {
                utils.css(ele, target);
                window.clearInterval(ele.timer);

                // 动画结束后,如果有函数传递过来,就执行传递过来的那个函数
                typeof callBack === "function" && callBack.call(ele);
                return;
            }

            for (var key in target) {
                if (target.hasOwnProperty(key)) {
                    var curPro = Linear(time, begin[key], change[key], duration);
                    utils.css(ele, key, curPro);
                }
            }
        }, interval);
    }

    // 返回要使用的方法
    return {
        getCls: getCls,
        getClient: getClient,
        getOffset: getOffset,
        listToArray: listToArray,
        childrens: childrens,
        prev: prev,
        next: next,
        prevAll: prevAll,
        nextAll: nextAll,
        siblings: siblings,
        index: index,
        firstChild: firstChild,
        lastChild: lastChild,
        append: append,
        prepend: prepend,
        insertBefore: insertBefore,
        insertAfter: insertAfter,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        css: css,
        // startMove: startMove,
        animate: move
    }   

})();

function getCookie(c_name) {
    if (document.cookie.length > 0) {
        c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return "";
}

