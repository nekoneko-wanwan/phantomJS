# PhantomJS・CasperJS
PhantomJS・CasperJSのスクリプトをまとめたリポジトリ

##npmによるパッケージのインストール

* PhantomJS: 例） `$ sudo npm install -g phantomjs@1.9.7-15`
* CasperJS : 例） `$ sudo npm install -g casperjs`

> PhantomJSの1.9.8がインストールされるとCasperJS実行時にエラーが出たため、1.9.7を指定  
> casperjs は1.1.0bata


##構成要素

###/capture/
* 指定したページのキャプチャ画像を連続して保存できる
* コマンドに sp を渡すことでスマホ用のUA/Viewportでキャプチャできる
* ページのURLはJSONファイルで外部管理

###/output/
* 指定したページのURL, タイトル, Metaディスクリプション, MetaキーワードをまとめてCSVで出力できる
* ページのURLはJSONファイルで外部管理
* CSVはUTF-8なので、ツールで文字コード変換が必要になることも
