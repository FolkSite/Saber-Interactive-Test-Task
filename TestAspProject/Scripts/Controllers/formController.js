var app = angular.module('messagesApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache']);

app.directive('focusOn', function () {
    return function (scope, elem, attr) {
        scope.$on(attr.focusOn, function (e) {
            elem[0].focus();
            elem[0].activate();
        });
    };
});

app.controller('formCtrl', function ($scope, $http, $window, $interval) {
    var vm = this;
    
    function activate() {
        vm.title = 'Form'
        vm.textInput = null;
        vm.currentMessages = [];
        vm.allMessages = [];
        //max count of messages in stack
        vm.maxMessages = 8;
        vm.formDisabled = false;
    }

    vm.RemoveMessageClick = function (message) {
        RemoveMessage(message)
    }

    

    vm.ParseTextClick = function () {
        vm.formDisabled = true;
        var post = $http({
            method: "POST",
            url: "/Logic/Parse",
            dataType: 'json',
            data: { input: vm.textInput },
            headers: { "Content-Type": "application/json" }
        }).then(function (responce) {
            // success callback
            vm.textInput = null;
            vm.formDisabled = false;
            var newMessage = {
                Text: responce.data.Text,
                IsValid: responce.data.IsValid,
                Time: new Date()
            };

            if (vm.currentMessages.length > (vm.maxMessages - 1)) {
                vm.currentMessages.splice(0, 1);
            }

            vm.currentMessages.push(newMessage);

            vm.allMessages.push(newMessage);

            $scope.$broadcast('elementParsed');

            //autodelete after 30 seconds
            var promise = $interval(function () {
                RemoveMessage(newMessage);
                $interval.cancel(promise);
            }, 30000);

        }, function (responce) {
            // failure callback
            vm.textInput = null;
            vm.formDisabled = false;
            vm.$broadcast('elementParsed');
            $window.alert(responce.data.Message);
        });

    }

    function RemoveMessage(message) {
        var index = -1;
        var currents = eval(vm.currentMessages);
        for (var i = 0; i < currents.length; i++) {
            if (currents[i].Text === message.Text
                && currents[i].Time === message.Time) {
                index = i;
                break;
            }
        }
        if (index !== -1) {
            vm.currentMessages.splice(index, 1);
        }
    }

    activate();
});

