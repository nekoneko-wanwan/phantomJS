/********************************************
 * 指定したページのキャプチャーを取る
 * コマンドラインに 引数 sp を入力するとスマホ版をキャプチャーしてくる
 ********************************************/
var json   = require('./files/src.json');  // URLが配列形式で記載されたファイルを読み込む
var casper = require('casper').create();


/* スマホ環境でのキャプチャにするかどうか */
/* コマンド実行時の引数で判断する */
var isSmartPhone = (function() {
    return (casper.cli.get(0) === 'sp') ? true: false;
})();


/** 
 * casperのループ実行
 * @param {array}  json: URLを設定した配列
 * @param {object} self: Casperオブジェクト
 * @param {stings} link: 処理している現在のURL
 */
casper.start().each(json, function(self, link) {

    /* ページタイトルの定義 */
    var title;

    /* スマホ有効の場合は、UAとviewportを変更する */
    if (isSmartPhone) {
        self.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 ' + '(KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53')
            .viewport(320, 480);
    } else {
        self.viewport(1280, 1000);
    }

    /* 連続実行 */
    self
        /* 指定urlを開く */
        .thenOpen(link, function () {
            /* ページタイトルの取得 */
            title = this.getTitle();
        })

        /* 背景を白色に */
        .thenEvaluate(function() {
            document.body.bgColor = 'white';
        }, 'setBackGround')

        /* キャプチャ（ページタイトル名をファイル名とする） */
        .then(function() {
            this.echo('Capturing... ' + title);
            this.capture('./files/img/' + title + '.png');
        })
    ;

});

casper.run();
