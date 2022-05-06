// ==UserScript==
// @name             豆瓣标记(书影音等)导出工具
// @namespace        https://www.douban.com/people/140647728/?_i=1808095RL-21xU
// @version          0.2
// @description      导出豆瓣标记过的（看过/想看）的电影/电视剧到csv
// @author           momo4826
// @match            https://movie.douban.com/people/*/collect*
// @icon             data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant            none
// @original-script  https://greasyfork.org/en/scripts/420999-%E8%B1%86%E7%93%A3%E8%AF%BB%E4%B9%A6-%E7%94%B5%E5%BD%B1-%E9%9F%B3%E4%B9%90-%E6%B8%B8%E6%88%8F-%E8%88%9E%E5%8F%B0%E5%89%A7%E5%AF%BC%E5%87%BA%E5%B7%A5%E5%85%B7
// @license MIT
// ==/UserScript==

(function() {
    'use strict';
    function sleep(d) {
        for (var t = Date.now(); Date.now() - t <= d;) ;
    }
    function exportRaw (data, name){
        let urlObject = window.URL || window.webkitURL || window;
        let export_blob = new Blob([data]);
        let save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a")
        save_link.href = urlObject.createObjectURL(export_blob);
        save_link.download = name;
        save_link.click();
    }

    var base_url = "https://movie.douban.com/people/140647728/collect?start=";
    var urls = [];
    for (var i = 0; i<46; i++){
        var tmp = i*15;
        urls.push(base_url + tmp + "&sort=time&rating=all&filter=all&mode=grid");
    }
    var record = urls.indexOf(window.location.href)
    console.log(record)

    var result = ""
    for (i = 0; i<46; i++){
        var divs_all = document.querySelectorAll(".item");
        if (divs_all.length < 15){
            var last = divs_all.length;
        }else{
            last = 15;
        }
        for (var j = 0; j<last; j++){
            console.log(j);
            var divs = divs_all[j]
            result += "<<<<<";
            result += divs.querySelector("img").getAttribute('src');
            console.log(divs.querySelector("img").getAttribute('src'));
            result += ">>>>>";
            divs = divs.querySelector(".info")
            result += divs.querySelector(".title").querySelector("a").getAttribute('href');
            result += ">>>>>";
            result += divs.querySelector(".title").querySelector("a").innerText;
            result += ">>>>>";
            result += divs.querySelector(".intro").innerText;
            result += ">>>>>";
            result += divs.querySelectorAll("li")[2].querySelectorAll("span")[0].getAttribute("class");
            result += ">>>>>";
            result += divs.querySelector(".date").innerText;
            result += ">>>>>";
            if (divs.querySelector(".comment")){
                result += divs.querySelector(".comment").innerText;
            }

        }
    }

    let name = record + ".txt";
    exportRaw(result, name);
    sleep(3000)
    if(record < urls.length-1){
        window.location.href = urls[record+1]
    }else{
        window.location.href = "https://www.zhihu.com/";//在当前窗口中打开窗口
    }
    return false;
    // Your code here...
})();
