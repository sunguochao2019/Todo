$(document).ready(function () {
    $('header').on('submit', function () {
        var item = $('form input');
        var todo = { item: item.val() };
        //alert(todo);

        //判断是否为空
        if (todo.item == '') {
            alert('内容不能为空');
            return;
        }

        //发送数据
        $.ajax({
            type: 'POST',
            url: '/todo',
            data: todo,
            success: function (data) {
                //alert(data);
            }
        })
    })

    $('.remove').on('click', function () {
        var item = $.trim($(this).parent().parent().text());
        //alert(item);
        //将数据传递到服务中
        $.ajax({
            type: 'delete',
            url: '/todo/' + item,
            success: function (data) {
                location.reload();
            }
        })

    })
});