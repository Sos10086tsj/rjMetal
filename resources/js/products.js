/**
 * Created by Paris Tao on 03/06/2017.
 */
var products = {
    imgGroups : null,
    currentCode : '',
    totalPage : -1,
    currentPage : -1,
    pageSize : 6,
    currentPics : new Array(),

    //初始化文件列表
    initGroups : function(){
        products.imgGroups = {
            'bb' : datasource.pic.bb,
            'bp' : datasource.pic.bp,
            'fa' : datasource.pic.fa,
            'op' : datasource.pic.op,
            'pl' : datasource.pic.pl
        };
    },

    //更新菜单
    showMenu : function(code){
        if(code != products.currentCode){
            products.currentPics = products.imgGroups[code];
            var length = products.currentPics.length;
            var hasPage = true;
            var pages = -1;
            if(length <= products.pageSize){
                hasPage = false;
                products.totalPage = -1;
                products.currentPage = -1;
                $('.page').hide();
            }else {
                pages = Math.ceil(length / products.pageSize);
                var pageHtml = products.generatePageHtml(pages, 1);

                products.totalPage = pages;
                products.currentPage = 1;

                $('.page').html(pageHtml);
                $('.page').show();
            }
            var html = products.refreshPics(code);
            $('.image_content').html(html);
        }
        products.currentCode = code;
    },

    generatePageHtml : function (pages , currentPage) {
        var pageHtml = '<ul class="am-pagination am-pagination-centered">'
            + '<li ' ;
        if(currentPage == 1){
            pageHtml += 'class="am-disabled"';
        }
        pageHtml += '><a href="javascript:void(0)" onclick="products.pageClick(1)">&laquo;</a></li>';
        for(var i=1; i <= pages; i++){
            pageHtml += '<li ' ;
            if(currentPage == i){
                pageHtml += ' class="am-active"';
            }
            pageHtml +=' onclick="products.pageClick(' + (i) + ')"><a href="javascript:void(0)">'
                + (i)
                + '</a></li>';
        }
        pageHtml += '<li ';
        if(currentPage == pages){
            pageHtml += 'class="am-disabled"';
        }
        pageHtml += ' onclick="products.pageClick(' + pages + ')"><a href="javascript:void(0)">&raquo;</a></li></ul>';
        return pageHtml;
    },

    //点击页码
    pageClick : function (i) {
        var pageHtml = products.generatePageHtml(products.totalPage, i);

        products.currentPage = i;
        $('.page').html(pageHtml);
        $('.page').show();

        var html = products.refreshPics(products.currentCode);
        $('.image_content').html(html);
    },

    refreshPics : function (code) {
        var html = '';
        var picList = new Array();
        if (products.totalPage == -1){//全部加载
            picList =  products.currentPics;
        }else {//部分加载
            var startIndex = (products.currentPage - 1) * products.pageSize;
            var endIndex = startIndex + products.pageSize;
            if(endIndex >  products.currentPics.length){
                endIndex =  products.currentPics.length;
            }
            for(var i = startIndex; i < endIndex ; i++){
                picList.push(products.currentPics[i]);
            }
        }
        return products.generatePicHtml(picList, code);
    },

    generatePicHtml : function(pics,code){
        var html = '';
        if(pics.length % 2 == 0){//偶数个
            for(var i =0; i < pics.length; i = i +2){
                var item1 = pics[i];
                var item2 = pics[i+1];
                html += '<div class="am-g item">'
                    + products.generateItemHtml(code,item1)
                    + products.generateItemHtml(code,item2)
                    + '</div>';
            }
        }else {
            for(var i =0; i < pics.length-1; i = i +2){
                var item1 = pics[i];
                var item2 = pics[i+1];
                html += '<div class="am-g item">'
                    + products.generateItemHtml(code,item1)
                    + products.generateItemHtml(code,item2)
                    + '</div>';
            }
            html +='<div class="am-g item">'
                + products.generateItemHtml(code,pics[pics.length - 1])
                + '</div>';
        }
        return html;
    },

    generateItemHtml : function(code, item){
        return '<div class="am-u-sm-6">'
            + '<img class="am-radius" alt="" src="../resources/images/portal/products/' + code + '/' + item.file + '" width="300" height="300" />'
            + '<br>' + item.name
            + '</div>';
    }
}

$(function () {
    products.initGroups();
    products.showMenu('pl');

    $('.menu li').click(function () {
        $('.menu_active').removeClass('menu_active');
        $(this).addClass('menu_active');
        var code = $(this).attr('data-url');
        products.showMenu(code);
    });
});