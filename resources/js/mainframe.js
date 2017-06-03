
var portal = {
    frameLoad : function () {
        document.getElementById("mainframe").height=0;
        document.getElementById("mainframe").height=document.getElementById("mainframe").contentWindow.document.body.scrollHeight;
    }
}

$(function(){
    $(window).resize(portal.frameLoad);
});

