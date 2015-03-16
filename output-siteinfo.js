/********************************************
 * 指定したページの特定の情報をcsvに出力する
 ********************************************/
var fs = require('fs');

/* ページURLを設定 */
var LINKS = [
    'http://www.yahoo.co.jp/',
    'http://www.google.co.jp/',
    'http://www.msn.com/'
    // Basic認証を直接含めてもOK http://userName:password@example.jp
];

/* データを格納する多次元配列を作成する */
/* 2番目の配列には以下を格納 */
/*
 data[i][0] = url
 data[i][1] = title
*/
var data = (function() {
    var arr = [];
    var i = 0;
    var j = 0;
    var l = LINKS.length;

    for ( i = 0; i < l; i++) {
        arr[i] = [];
        for( j = 0; j < 3; j++) {
            arr[i][j] = '';
        }
    }
    return arr;
})();


/* casper処理 */
var casper = require('casper').create();
casper.start().each(LINKS, function(self, link, i) {

    data[i][0] = link;

    /* 連続実行 */
    self
        /* 指定urlを開く */
        .thenOpen(link, function () {
            data[i][1] = this.getTitle() || '';
        })

        /* 読み込んだら */
        .then(function() {
            fs.write('output.csv', data.join('\n'));
        })
    ;
});

casper.run();