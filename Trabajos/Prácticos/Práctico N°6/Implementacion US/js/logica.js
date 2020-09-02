var myApp = angular.module("myApp", []);

myApp.controller("myCtrl", function ($scope, $http){
    $scope.mostrar = "1"
    
    $scope.cambiar = function(paso) {
        $scope.mostrar = paso;
        for(i = 1; i <= 5; i++)
        {
            document.getElementById(i).classList.remove("active")
        }
        document.getElementById(paso).classList.add("active");
        var progreso = (paso * 100) / 5;
        if(progreso == 100)
        {
            progreso = progreso - 5;
        }
        document.getElementById("barra").style.width = progreso + "%";
    }

    $scope.confirmar = function() {
        //TODO todas las validaciones pertinentes
        document.getElementById("barra").style.width = 100 + "%";
        window.alert("PEDIDO EXITOSO");
    }
})