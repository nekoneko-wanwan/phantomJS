/********************************************
 * 指定したページの特定の情報をテキストファイルに出力する
 ********************************************/

var data = ['url', 'title'];



/* ページのURLを設定 */
var LINKS = [
    'http://www.yahoo.co.jp/',
    'http://www.google.co.jp/',
    'http://www.msn.com/'
    // Basic認証を直接含めてもOK http://userName:password@example.jp
];

/* URLの数だけdataの多次元配列をコピーする */
function createData() {
    var arr = [];
    var i   = 0;
    var l   = LINKS.length;
    for (; i < l; i++) {
        arr[i] = JSON.stringify(data);
    }
    return arr;
}

var newData = createData();  // この段階だとJSON.stringifyが効いているため後で戻す





var casper = require('casper').create();


/* キャプチャ処理 */
casper.start().each(LINKS, function(self, link, i) {

    newData[i] = JSON.parse(newData[i]);
    newData[i][0] = link;


    /* 連続実行 */
    self
        /* 指定urlを開く */
        .thenOpen(link, function () {
            newData[i][1] = this.getTitle();
        })

        /* 読み込んだら */
        .then(function() {
            // self.capture('capture_img/' + title + '.png');
            var fs = require('fs');
            fs.write('output.txt', newData[i]);
        })
    ;
});


console.log(newData);

casper.run();




