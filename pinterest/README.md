pinterest
=========

a show style for list , just likes pinterest !

### Use

  dom

    < div id="Pinterest" >
        < div class="pinitem" >
            a show style for list , just likes pinterest !<br>
            content of item, you can instead with your content|dom|other ...
        < /div >
        < div class="pinitem" >
            a show style for list , just likes pinterest !<br>
            content of item, you can instead with your content|dom|other ...
        < /div >
        ...
    < /div >


  js

    ( function( $ ) {
        $( document ).ready( function() {
            $ ( "#Pinterest" ).PinTerest( {
                item_selector: ".pinitem", //选择器
                column_change: false, //是否随浏览器窗口大小改变列数
                stamp_left_height: 0, // 左侧留空的高度
                stamp_right_height: 0 // 右侧留空的高度
            } ) ;
        } );
    } )( jQuery )
