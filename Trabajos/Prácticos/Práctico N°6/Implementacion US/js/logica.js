var myApp = angular.module("myApp", []);

function mostrarFoto() {
    var file = document.getElementById('imagenDescriptiva').files[0];
    var tamaño = ((file.size / 1024) / 1024).toFixed(4);
    if (tamaño < 5) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var image = document.getElementById("imagen");
            image.src = e.target.result;
        }
        reader.readAsDataURL(file);
    } else {
        alert("La foto es demasiado grande");
    }
}

myApp.controller("myCtrl", function ($scope, $http) {

    $scope.horaEntrega = "8:00:00";
    $scope.mostrar = "1";

    $scope.costo;
    $scope.costoVar;
    $scope.costoFijo = 50;

    $scope.costoTot;

    var nivel = 0;
    var regexTarjeta = new RegExp("(^4[0-9]{12}(?:[0-9]{3})?$)");
    var regexCVC = new RegExp("/^[0-9]{3,4}$/")

    var queDescOK = false;
    var fotoOk = true;

    var costoPedidoOk = false;

    var origenCalleOk = false;
    var origenNumOk = false;
    var origenPisoOk = false;
    var origenDptoOk = false;

    var destinoCalleOk = false;
    var destinoNumOk = false;
    var destinoPisoOk = false;
    var destinoDptoOk = false;

    var cuandoHoraOk = false;
    var cuandoFechaOk = false;

    var pagoEfvoOk = false;
    var pagoTitularOk = false;
    var pagoNumTarOk = false;
    var pagoVencOk = false;
    var pagoCVCOk = false;

    var que = false;
    var origen = false;
    var destino = false;
    var cuando = false;
    var pago = false;

    $scope.cambiar = function (paso) {

        $scope.mostrar = paso;
        for (i = 1; i <= 5; i++) {
            document.getElementById(i).classList.remove("active")
        }
        document.getElementById(paso).classList.add("active");

        var progreso = 0;

        //Veo el progreso del que queres
        if (queDescOK) {
            progreso = 50;
            document.getElementById("descripcion").classList.remove("is-invalid");
        } else {
            document.getElementById("descripcion").classList.add("is-invalid");
        }
        if (fotoOk) {
            progreso += 50;
        }
        document.getElementById("barraQue").classList.remove("bg-success");
        document.getElementById("barraQue").style.width = progreso + "%";
        if (progreso == 100) {
            document.getElementById("barraQue").classList.add("bg-success");
            que = true;
        }


        //progreso origen
        progreso = 0;
        if ($scope.mapa == undefined) {} else {
            if ($scope.mapa) {
                if (costoPedidoOk) {
                    progreso = 100;
                    document.getElementById("costoPedido").classList.remove("is-invalid");
                } else {
                    progreso = 50;
                    document.getElementById("costoPedido").classList.add("is-invalid")
                }
            } else {
                if (origenCalleOk) {
                    progreso += 20;
                    document.getElementById("dirOrigen").classList.remove("is-invalid");
                } else {
                    document.getElementById("dirOrigen").classList.add("is-invalid");
                }
                if (origenNumOk) {
                    progreso += 20;
                    document.getElementById("numOrigen").classList.remove("is-invalid");
                } else {
                    document.getElementById("numOrigen").classList.add("is-invalid");
                }
                if (origenPisoOk) {
                    progreso += 20;
                }
                if (origenDptoOk) {
                    progreso += 20;
                }
                if (costoPedidoOk) {
                    progreso += 20;
                    document.getElementById("costoPedido").classList.remove("is-invalid");
                } else {
                    document.getElementById("costoPedido").classList.add("is-invalid");
                }
            }
        }
        document.getElementById("barraOrigen").classList.remove("bg-success");
        document.getElementById("barraOrigen").style.width = progreso + "%";
        if (progreso == 100) {
            document.getElementById("barraOrigen").classList.add("bg-success");
            origen = true;
        }

        //progreso destino
        if ($scope.mostrar >= "4") {
            progreso = 0;
            if (destinoCalleOk) {
                progreso += 25;
                document.getElementById("dirDestino").classList.remove("is-invalid");
            } else {
                document.getElementById("dirDestino").classList.add("is-invalid");
            }
            if (destinoNumOk) {
                progreso += 25;
                document.getElementById("numDestino").classList.remove("is-invalid");
            } else {
                document.getElementById("numDestino").classList.add("is-invalid");
            }
            if (destinoPisoOk) {
                progreso += 25;
            }
            if (destinoDptoOk) {
                progreso += 25;
            }
            document.getElementById("barraDestino").classList.remove("bg-success");
            document.getElementById("barraDestino").style.width = progreso + "%";
            if (progreso == 100) {
                document.getElementById("barraDestino").classList.add("bg-success");
                destino = true;
            }
        }

        //progreso cuando
        progreso = 0;
        if ($scope.programa == undefined) {} else if ($scope.programa) {
            if (cuandoHoraOk) {
                progreso += 50;
                document.getElementById("horaEntrega").classList.remove("is-invalid");
            } else{document.getElementById("horaEntrega").classList.add("is-invalid");}
            if (cuandoFechaOk) {
                progreso += 50;
                document.getElementById("fechaEntrega").classList.remove("is-invalid");
            } else{document.getElementById("fechaEntrega").classList.add("is-invalid");}
        } else {
            progreso = 100;
        }
        document.getElementById("barraCuando").classList.remove("bg-success");
        document.getElementById("barraCuando").style.width = progreso + "%";
        if (progreso == 100) {
            document.getElementById("barraCuando").classList.add("bg-success");
            cuando = true;
        }

        //progreso forma pago
        progreso = 0;
        if ($scope.efectivo != undefined) {
            if ($scope.efectivo) {
                //revisar pago efectivo
                if (pagoEfvoOk) {
                    progreso += 100;
                }
            } else {
                if (pagoTitularOk) {
                    progreso += 25;
                }
                if (pagoNumTarOk) {
                    progreso += 25;
                }
                if (pagoVencOk) {
                    progreso += 25;
                }
                if (pagoCVCOk) {
                    progreso += 25;
                }
            }
        }
        document.getElementById("barraPago").classList.remove("bg-success");
        document.getElementById("barraPago").style.width = progreso + "%";
        if (progreso == 100) {
            document.getElementById("barraPago").classList.add("bg-success");
            pago = true;
        }
    }

    $scope.cambiarQue = function (paso) {

        var descripcionQue = $scope.descQue;
        try {
            //ver el tamaño de la cadena
            if (descripcionQue.length > 2 && descripcionQue.length < 500) {
                queDescOK = true;
            } else {
                queDescOK = false;
            }

            //intentar ver el tamaño de la foto
            var file = document.getElementById('imagenDescriptiva').files[0];
            if ((((file.size / 1024) / 1024).toFixed(4)) > 5) {
                fotoOk = false;
            }
        } catch {
            $scope.cambiar(paso);
        }
    }

    $scope.cambiarOrigenMaps = function (paso) {
        if ($scope.costoPedido != undefined && $scope.costoPedido >= 0) {
            costoPedidoOk = true;
            $scope.costo = $scope.costoPedido;
            $scope.costoVar = $scope.costo * 0.02;
            $scope.costoTot = $scope.costo + $scope.costoVar + $scope.costoFijo;
        } else {
            costoPedidoOk = false;
            $scope.costo = undefined;
        }
        $scope.cambiar(paso);
    }

    $scope.cambiarOrigenManual = function (paso) {

        var dirOrigen = $scope.dirOrigen;
        var numOrigen = $scope.numOrigen;
        var pisoOrigen = $scope.pisoOrigen;
        var dptoOrigen = $scope.dptoOrigen;

        try {
            if (dirOrigen.length < 80 && dirOrigen.length > 0) {
                origenCalleOk = true;
            } else {
                origenCalleOk = false;
            }
        } catch {}

        if (numOrigen > 0) {
            origenNumOk = true;
        } else {
            origenNumOk = false;
        }

        if ($scope.costoPedido != undefined && $scope.costoPedido >= 0) {
            costoPedidoOk = true;
            $scope.costo = $scope.costoPedido;
        } else {
            costoPedidoOk = false;
            $scope.costo = undefined;
        }

        if (pisoOrigen == undefined) {
            origenPisoOk = true;
        } else if (pisoOrigen > 0) {
            origenPisoOk = true;
        } else {
            origenPisoOk = false;
        }

        if (dptoOrigen == undefined) {
            origenDptoOk = true;
        } else if (dptoOrigen > 0) {
            origenDptoOk = true;
        } else {
            origenDptoOk = false;
        }

        $scope.cambiar(paso);
    }

    $scope.cambiarDestino = function (paso) {

        var dirDestino = $scope.dirDestino;
        var numDestino = $scope.numDestino;
        var pisoDestino = $scope.pisoDestino;
        var dptoDestino = $scope.dptoDestino;

        try {
            if (dirDestino.length < 80 && dirDestino.length > 0) {
                destinoCalleOk = true;
            } else {
                destinoCalleOk = false;
            }
        } catch {}

        if (numDestino > 0) {
            destinoNumOk = true;
        } else {
            destinoNumOk = false;
        }

        if (pisoDestino == undefined) {
            destinoPisoOk = true;
        } else if (pisoDestino > 0) {
            destinoPisoOk = true;
        } else {
            destinoPisoOk = false;
        }

        if (dptoDestino == undefined) {
            destinoDptoOk = true;
        } else if (dptoDestino > 0) {
            destinoDptoOk = true;
        } else {
            destinoDptoOk = false;
        }
        $scope.cambiar(paso);
    }

    $scope.cambiarCuando = function (paso) {
        if ($scope.programa != undefined && $scope.programa == true) {
            var fecha = $scope.fechaEntrega;
            var date = new Date(Date.now());
            if (fecha >= date) {
                cuandoFechaOk = true;
            } else {
                cuandoFechaOk = false;
            }
            if ($scope.horaEntrega != undefined) {
                cuandoHoraOk = true;
            } else {
                cuandoHoraOk = false;
            }
        }
        $scope.cambiar(paso);
    }

    $scope.confirmar = function () {
        if ($scope.efectivo != undefined) {
            if ($scope.efectivo) {
                if (costoPedidoOk && $scope.cantEfvo > $scope.costoTot) {
                    pagoEfvoOk = true;
                } else {
                    pagoEfvoOk = false;
                }
            } else {
                //paga con tarjeta

                if (regexTarjeta.test($scope.numTarjeta)) {
                    pagoNumTarOk = true;
                }

                if (regexCVC.text($scope.CVC)) {
                    pagoCVCOk = true;
                }

                var date = new Date(Date.now());
                if ($scope.vencimiento > date) {
                    pagoVencOk = true;
                } else {
                    pagoVencOk = false;
                }

                if ($scope.pagoTitular.length > 4) {
                    pagoTitularOk = true;
                } else {
                    pagoTitularOk = false;
                }
            }
        }
        $scope.cambiar('5');
        $scope.confirmacionFinal();
    }

    $scope.confirmacionFinal = function () {
        if (que && origen && destino && cuando && pago) {
            document.getElementById("btnConfirmarModal").click();
        }
    }
})