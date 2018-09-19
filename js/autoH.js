/**
 * Created by Amh on 2018-08-28.
 */


/*滑动删除*/
(function () {

  var star_x;   // touchstart时的水平起始位置
  var end_x;     // touchmove过程中的水平结束位置
  var touchmove=false;
  var del_w;    // 删除按钮的宽
  $('.item_del').each(function(){
    $this=$(this);
    del_w=$this.width();
    var h=$this.siblings('.item_top').height();
    $this.css("height",h+"px");
    $this.css("lineHeight",h+"px");
  });
  $(document).on("touchstart", '.item_top', function (e) { // 触摸开始时
    if (e.originalEvent.targetTouches) {
      star_x = e.originalEvent.targetTouches[0].pageX;
    } else {
      star_x = e.pageX;
    }
  });

  $(document).on("touchmove", '.item_top', function (e) { // 触摸过程中...
    var left = $(this).css('left');
    if (star_x - end_x >= 5) {
      touchmove = true;
    }
    if (e.originalEvent.targetTouches) {
      end_x = e.originalEvent.targetTouches[0].pageX;
    } else {
      end_x = e.pageX;
    }

    if (star_x - end_x >= 0) {  // touchmove 向左移动
      if (parseInt(left) > -del_w) {
        $(this).css('left', end_x - star_x + 'px');  // 移动效果
      }
    } else {  // 向右移动
      if (parseInt(left) < 0) {
        $(this).animate({left: 0}, 500);  // 恢复原状（动画效果）
      }
    }
  });
  $(document).on("touchend", '.item_top', function (e) {  // 触摸抬起时
    var offset = star_x - end_x;     // 偏移量
    if (touchmove == false) {
      return;
    }
    if (offset > 0) {   // 左滑动
      if (offset >= del_w / 2) {      // 偏移量大于等于删除按钮的一半
        $(this).animate({left: -del_w + 'px'}, 500);  // 动画显示删除按钮
      } else {
        $(this).animate({left: 0}, 500);  // 恢复原状
      }
    }
    touchmove = false;
  });
  $(document).on("touchend", '.item_del', function (e) {
    $this = $(this);
    $this.parent().remove();


    //$modal = $("#del");
    //$modal.css("display", "block");
    //$(this).parent().remove();
    /*$(document).on("touchend", '.cancel', function (e) {  // 取消删除事件抬起时
      //console.log('cancel');
      $modal.css("display", "none");
      $this.siblings('.item_top').animate({left: 0}, 500);  // 恢复原状
      //$(this).parent().remove();
    });*/
    /*$(document).on("touchend", '.ok', function (e) {  // 确认删除事件抬起时
      //console.log('ok');
      $this.parent().remove();
      $modal.css("display", "none");
    });*/
  });
})();