"use strict";

/* Controllers */
/*todos列表*/
var list = [{
    "id": 1,
    "title": "周末约了小婧看电影！",
    "date": 1383874571824,
    "finished": 1
  }, 
  { 
    "id": 2,
    "title": "后天早上8点有热火的比赛，期待ing~",
    "date": 1383880865848,
    "finished": 0
}];

/*留言消息*/
var messages = [{
    "id": 1,
    "name": "张欣",
    "content": "嘿，man，我来了~",
    "date": 1383881121761
  }, 
  {
    "id": 2,
    "name": "王小贱",
    "content": "good luck to you...",
    "date": 1383874616277
}];

//定义模块
angular.module("myApp.controllers", [])
    //todo列表ListCtrl类
    .controller("ListCtrl", ["$scope", "$location", function($scope, $location) {
        $scope.list = list;
        //是否完成状态
        $scope.itemClass = function (finished) {
            return finished ? "del" : "new";
        };
        //完成
        $scope.itemFinished = function (item) {
            item.finished = 1;
        };
        //恢复
        $scope.itemRenew = function(item) {
            item.finished = 0;
        };
        //删除
        $scope.itemDelete = function(item) {
            for(var i = 0, len = $scope.list.length; i < len; i++) {
                if (item === $scope.list[i]) {
                    $scope.list.splice(i, 1);
                }
            }
        }
        //新建todo
        $scope.newTodo = function(e) {
            var data = {};
            data.id = this.list.length+1;
            data.title = e.target.value;
            data.finished = 0;
            data.date = (new Date()).getTime(); //获取当前系统时间

            this.list.push(data); //添加列表
        };
        //跳到todo编辑页面
        $scope.gotoEdit = function(item){
            $location.url("/edit/"+ item.id);
        };

        //跳到留言页面
        $scope.gotoListMsg = function() {
            $location.url("/message");
        }

    }])

    //todo列表编辑EditCtrl类
    .controller("EditCtrl", ["$scope", "$routeParams", "$location", function($scope, $routeParams, $location) {
        // console.log(list)
        var _data = list[ $routeParams.id - 1 ];
        $scope.title = _data.title;

        //更新todo
        $scope.itemUpdate = function(e) {
            _data.title = $scope.title;
            $location.url("/list");
        };

    }])


    //留言列表类MsgListCtrl
    .controller("MsgListCtrl", ["$scope", "$location", function($scope, $location) {
        $scope.messages = messages;
        //删除留言
        $scope.itemDelete = function(item) {
            for(var i = 0, len = $scope.messages.length; i < len; i++) {
                if(item === $scope.messages[i]) {
                    $scope.messages.splice(i, 1);
                }
            }
        };

        //跳到留言页面
        $scope.gotoEdit = function(item){ 
            $location.url("/msg/new");//item.id
        };

        $scope.returnHome = function() {
            $location.url("/list");
        };
    }])

    //留言编辑MsgEditCtrl类
    .controller("MsgNewCtrl", ["$scope", "$routeParams", "$location", function($scope, $routeParams, $location) {
        $scope.messages = messages;

        $scope.newMessage = function(e) {
            var data = {}; //数据对象
            data.id = this.messages.length + 1;
            var myName = document.getElementById("myName"),
                myMsg = document.getElementById("myMessage"),
                nameValidate = document.getElementById("nameValidate"),
                contentValidate = document.getElementById("contentValidate");
            //验证是否为空
            myName.onkeyup = function() {
                this.value === "" ? nameValidate.style.display = "inline-block" : nameValidate.style.display = "none";
            };
            myMsg.onkeyup = function() {
                this.value === "" ? contentValidate.style.display = "inline-block" : contentValidate.style.display = "none";
            };
          
            if (myName.value === "") {
                nameValidate.style.display = "inline-block";
            }
            if ( myMsg.value === "") {
                contentValidate.style.display = "inline-block";
            }

            if (myName.value ==="" || myMsg.value === "") {
                return false; //阻止表单提交
            }
          

            data.name = myName.value; //名称
            data.content = myMsg.value; //内容
            data.date = (new Date()).getTime(); //当前时间
            $scope.messages.push(data); //组合列表数据
            $location.url("/message");//返回到留言列表
        };

    }]);




