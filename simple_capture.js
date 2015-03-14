/********************************************
 * 指定したページのキャプチャーを取るだけ
 ********************************************/


/* スマホ環境でのキャプチャにするかどうか */
var isSmartPhone = false;  // trueでスマホ


/* 保存したいページのURLを設定 */
var LINKS = [
    'http://www.yahoo.co.jp/',
    'http://www.google.co.jp/',
    'http://www.msn.com'
];


var casper = require('casper').create();

/* キャプチャ処理 */
casper.start().each(LINKS, function(self, link) {

    var title;

    /* スマホ有効の場合は、UAとviewportを変更する */
    if (isSmartPhone) {
        self.userAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 ' + '(KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53')
            .viewport(320, 568);
    } else {
        self.viewport(1280, 1000);
    }

    /* 連続実行 */
    self
        /* 指定urlを開く */
        .thenOpen(link, function () {
            title = this.getTitle();
            this.echo(this.getTitle());
        })

        /* 背景を白色に */
        .thenEvaluate(function(term) {
            document.body.bgColor = 'white';
        }, 'setBackGround')

        /* キャプチャ */
        .then(function() {
            self.capture('capture_img/' + title + '.png');
        })
    ;

});

casper.run();
