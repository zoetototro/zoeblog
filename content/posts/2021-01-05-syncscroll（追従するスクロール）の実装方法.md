---
template: SinglePost
title: syncscroll（追従するスクロール）の実装方法
status: Published
date: 2021-01-05
excerpt: どうも、今回はsyncscrollの実装方法を紹介しようと思います。
---
どうも、今回はsyncscrollの実装方法とハマりどころを軽く解説しようと思います。

## syncscrollを実装するには

以下の記事が参考になります。

https://uxdesign.cc/position-stuck-96c9f55d9526

結論からいうと、cssだけではできないので外部ライブラリを使用する必要があります。

## syncscroll用の外部ライブラリ

standard
https://github.com/asvd/syncscroll

僕の場合はreactでしたので、react-scroll-syncを利用。TSの@typesはない。

https://www.npmjs.com/package/react-scroll-sync

vueのバージョンもある。
https://github.com/metawin-m/vue-scroll-sync?ref=kabanoki.net

## cssのハマりどころ

僕の場合、親要素にoverflow:visible以外が指定されている場合にposition:stickyが効かない。
しかし、親要素にoverflow:hidden;を入れないと配置したい場所に配置ができないというところで少しハマりました。

position stickyとは

> 要素は文書の通常のフローに従って配置され、直近のスクロールする祖先及び包含ブロック (直近のブロックレベル祖先、表関連要素を含む) に対して top, right, bottom, left の値に基づいて相対配置されます。オフセットは他の要素の配置には影響を与えません。
> この値は、常に新しい積み重ねコンテキストを作成します。なお粘着要素は、直近の祖先がスクロールしない場合でも、「スクロールの仕組み」を持つ直近の祖先 (overflow が hidden, scroll, auto, overlay として作成されたもの) に「粘着」します。これによって「粘着」のふるまいを効果的に抑止します (Github issue on W3C CSSWG を参照)。

## 対処法

position:stickyをしたい要素の一つ上で

heightを指定し、親を変更し、
`position:relative
overflow:auto
height:100vh`

これでoverflow:hiddenとposition:stickyの両立が可能になります！

