var login = {
    base_url: 'http://www.redsuri.com',
    sendLogin: function () {
        utils.loadingHide();
//        $.mobile.changePage("#perfil", {transition: "slideup", changeHash: false});
//        return false;
        var user_name = $('#user_name').val();
        var password = $('#password').val();
        var optionRol = '';
        $.ajax({
            url: 'http://www.redsuri.com/mobile.php/login/autenticar',
            type: 'POST',
            dataType: 'json',
            timeout: 15000,
            cache: true,
            data: {
                user_name: user_name,
                password: password
            },
            beforeSend: function (xhr) {
                utils.loadingShow('', '', '', '', '');
            },
            success: function (resp) {
                utils.loadingHide();
                console.log(resp);
                if (resp['status']) {
                    dataUser.datos_rol = resp['datos_rol'];
                    dataUser.data_user = resp['data_user'];
                    dataUser.carteleraVirtual = resp['carteleraVirtual'];


                    $("#nombre_usuario").text(dataUser.data_user['nombre_completo']);
                    $("#nombre_perfil").text(dataUser.data_user['primer_nombre'] + ' ' + dataUser.data_user['segundo_nombre']);
                    $("#apellidos_perfil").text(dataUser.data_user['primer_apellido'] + ' ' + dataUser.data_user['segundo_apellido']);
                    $("#email1_perfil").text(dataUser.data_user['email']);
                    $("#profesion_perfil").text(dataUser.data_user['profesion']);
                    
                    $("#fecha_nacimiento_perfil").text(dataUser.data_user['fecha_nacimiento']);
                    $("#telefono_perfil").text(dataUser.data_user['telefono_fjo']);
                    $("#movil_perfil").text(dataUser.data_user['movil']);
                    $("#direccion_perfil").text(dataUser.data_user['direccion']);
                    $("#imagen_perfil").attr('src', login.base_url + dataUser.data_user['url_corta']);
                    
                    //Renderizamos selectorl rol 
                    utils.renderSelectRol(dataUser.datos_rol);

                    //Cargamos la cartelera virtual 
                    utils.renderCarteleraVirtual(dataUser.carteleraVirtual);

                    //Redireccionamos a perfil
                    change_pages.inicio();
                } else {

                }
            },
            error: function (resp) {

                utils.loadingShow('', '', true, true, '<h1>Intente de nuevo</h1>');
                setTimeout(function () {
                    utils.loadingHide();
                }, 1500);
                console.log(resp);
            }
        });
    },
    validaSesion: function () {
        //SI tiene cargado los datos de session redireccionamos a perfil
        if (dataUser.datos_rol != undefined && dataUser.data_user != undefined) {
            //Redireccionamos a perfil
            $.mobile.changePage("#inicio", {transition: "slideup", changeHash: false});
        } else {
            //Redireccionamos a login
            $.mobile.changePage("#login", {transition: "slideup", changeHash: false});
        }
    },
    cerrarSesion: function (element) {
        delete dataUser.datos_rol;
        delete  dataUser.data_user;
        delete  dataUser.carteleraVirtual;

        dataUser.datos_rol = undefined;
        dataUser.data_user = undefined;
        dataUser.carteleraVirtual = undefined;
        //Redireccionamos a login
        $.mobile.changePage("#login", {transition: "slideup", changeHash: false});
    }
}

