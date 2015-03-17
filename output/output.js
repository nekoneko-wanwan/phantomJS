/********************************************
 * 指定したページの特定の情報をcsvに出力する
 ********************************************/
var fs   = require('fs');
var json = require('./files/src.json');  // URLが配列形式で記載されたファイルを読み込む


/* データを格納する多次元配列を作成する */
/* 2番目の配列には以下を格納するための '' 空スペースを用意 */
/*
  data[i][0] = url
  data[i][1] = title
  data[i][2] = meta: description
  data[i][3] = meta: keyword
*/
var data = (function() {
    var arr = [];
    var i, j;
    var l = json.length;

    for (i = 0; i < l; i++) {
        arr[i] = [];
        for(j = 0; j < 4; j++) {
            arr[i][j] = '';
        }
    }
    return arr;
})();


/* casperの定義 */
/* ローカルにあるjQueryを実行できるように */
var casper = require('casper').create({clientScripts: ['../jquery-1.11.2.min.js']});

/** 
 * casperのループ実行
 * @param {array}  json: URLを設定した配列
 * @param {object} self: Casperオブジェクト
 * @param {stings} link: 処理している現在のURL
 */
casper.start().each(json, function(self, link, i) {

    /* 連続実行 */
    self
        /* 指定urlを開く */
        .thenOpen(link, function () {

            /* URLとタイトルの取得 */
            var title = this.getTitle();
            var url   = this.getCurrentUrl();

            /* metaタグの取得 */
            var metaDes = this.evaluate(function() {
                return $('meta[name=description]').attr('content');
            });
            var metaKey = this.evaluate(function() {
                return $('meta[name=keywords]').attr('content');
            });

            /* dataの2番目の各配列にデータを追加 */
            /* カンマ区切りが入ってきても大丈夫なように各項目には "" でエスケープする */
            /* データが存在しない時（null）は "" は付けない */
            data[i][0] = '"' + url + '"';
            data[i][1] = (title   !== null) ? '"' + title   + '"' : '';
            data[i][2] = (metaDes !== null) ? '"' + metaDes + '"' : '';
            data[i][3] = (metaKey !== null) ? '"' + metaKey + '"' : '';

            this.echo('Loading... ' + title);
        })

        /* 読み込んだらcsvファイルに書き込む */
        .then(function() {
            /* ファイルはutf-8なので、必要に応じてツールで文字コード変換を行う */
            fs.write('./files/output.csv', data.join('\n'));
        })
    ;
});

casper.run();