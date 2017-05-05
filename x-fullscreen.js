(function () {

    // 获取 wangEditor 构造函数和 jquery
    var E = window.wangEditor;
    var $ = window.jQuery;

    // 用 createMenu 方法创建菜单
    E.createMenu(function (check) {

        // 定义菜单id，不要和其他菜单id重复。编辑器自带的所有菜单id，可通过『参数配置-自定义菜单』一节查看
        var menuId = 'x-fullscreen';

        // check将检查菜单配置（『参数配置-自定义菜单』一节描述）中是否该菜单id，如果没有，则忽略下面的代码。
        if (!check(menuId)) {
            return;
        }

        // this 指向 editor 对象自身
        var editor = this;

        // 创建 menu 对象
        var menu = new E.Menu({
            editor: editor,  // 编辑器对象
            id: menuId,  // 菜单id
            title: '全屏', // 菜单标题

            // 正常状态和选中状态下的dom对象，样式需要自定义
            $domNormal: $('<a href="#" tabindex="-1"><i class="wangeditor-menu-img-enlarge2"></i></a>'),
            $domSelected: $('<a href="#" tabindex="-1" class="selected"><i class="wangeditor-menu-img-enlarge2"></i></a>')
        });
        var state = false;
        // 菜单正常状态下，点击将触发该事件
        menu.clickEvent = function (e) {
            // 使用自定义命令
            function commandFn() {
                if(window.top.fullScreen){
                    var height;
                    if(!state){
                        state = true;
                        height = window.top.fullScreen(state);
                    }else{
                        state = false;
                        height = window.top.fullScreen(state);
                    }
                    document.body.style.height = height + 'px';
                    // 减去菜单栏的高度和编辑框的下边距
                    editor.$valueContainer.css('height', height - 47 + 'px');
                }
            }
            editor.customCommand(e, commandFn);
        };
        // 增加到editor对象中
        editor.menus[menuId] = menu;
    });

})();