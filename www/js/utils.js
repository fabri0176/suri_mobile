var utils = {
    loadingShow: function (theme, msgText, textVisible, textonly, html) {

        var theme = theme || $.mobile.loader.prototype.options.theme;
        var msgText = msgText || $.mobile.loader.prototype.options.text;
        var textVisible = textVisible || $.mobile.loader.prototype.options.textVisible;
        var textonly = !!textonly;
        var html = html || "";

        $.mobile.loading("show", {
            text: msgText,
            textVisible: textVisible,
            theme: theme,
            textonly: textonly,
            html: html
        });
    },
    loadingHide: function () {
        $.mobile.loading("hide");
    },
    renderCarteleraVirtual: function (carteleraVirtual) {
        var carteleraHtml = '';
        
        $.each(carteleraVirtual, function (index, value) {
            carteleraHtml += '<div class="ui-block">';
            carteleraHtml += '      <div data-role="collapsible">';
            carteleraHtml += '          <h1>' + value['titulo'] + '</h1>';
            carteleraHtml += '          <p>' + value['descripcion'] + '</p>';
            carteleraHtml += '          <a href="http://www.redsuri.com/">Más...</a>';
            carteleraHtml += '      </div> ';
            carteleraHtml += '</div> ';
        });
        
        $('#carleteraVirtualData').empty();
        $('#carleteraVirtualData').html(carteleraHtml);
        $('body').trigger("create");
    },
    renderSelectRol: function (datos_rol) {
        var optionRol;
        var tipo = '';

        var valOption = '';
        $.each(datos_rol['residentes_rol'], function (index, value) {
            tipo = value['tipo'].slice(0, 4);
            valOption = tipo + '-' + value['conjunto_id'] + '-' + value['apartamento_id'] + '-' + value['id'] + '-' + value['bloque'] + '-' + value['numero_apto'] + '-' + datos_rol['nombre_conjunto'];
            optionRol += '<option value="' + valOption + '">' + value['tipo'] + '-' + value['nombre'] + '-' + value['bloque'] + '-' + value['numero_apto'] + '</option>';
            valOption = '';
            tipo = '';
        });

        $.each(datos_rol['propietarios_rol'], function (index2, value2) {
            tipo = value2['tipo'].slice(0, 4);
            valOption = tipo + '-' + value2['conjunto_id'] + '-' + value2['apartamento_id'] + '-' + value2['id'] + '-' + value2['bloque'] + '-' + value2['numero_apto'] + '-' + datos_rol['nombre_conjunto'];
            optionRol += '<option value="' + valOption + '">' + value2['tipo'] + '-' + value2['nombre'] + '-' + value2['bloque'] + '-' + value2['numero_apto'] + '</option>';
            tipo = '';
            valOption = '';
        });

        $('#rol').append(optionRol);
        $('#rol').val(datos_rol['cod_id']);
    },
    updateRedenderCartelera: function (element) {
        // $.mobile.changePage("#perfil", {transition: "slideup", changeHash: false});
        // return false;
        var selectRol = $('#rol').val();
        utils.updateDataRol();
        console.log(dataUser)

        var optionRol = '';
        $.ajax({
            url: 'http://www.redsuri.com/mobile.php/libraries/updateRedenderCartelera',
            type: 'POST',
            dataType: 'json',
            timeout: 15000,
            cache: true,
            data: {
                conjunto_id: dataUser.datos_rol['conjunto_id'],
            },
            beforeSend: function (xhr) {
                utils.loadingShow('', '', '', '', '');
            },
            success: function (resp) {
                utils.loadingHide();
                console.log(resp);

                //Si  no es objet y es vacio return false
                if (typeof (resp) != 'object' && $.isEmptyObject(resp) == true) {
                    return false;
                }

                //Cargamos la cartelera virtual 
                utils.renderCarteleraVirtual(resp);
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
    updateDataRol: function () {
        //Actualiza los datos del rol tomando los valores del rol
        //"prop-4-10-10-torre demo 2-200-unidad residencial demostracion"
        var selectRol = $('#rol').val();
        var resArray = selectRol.split("-");
        var tipo = resArray[0];
        var conjunto_id = resArray[1];
        var apartamento_id = resArray[2];
        var id = resArray[3];
        var bloque = resArray[4];
        var numero_apto = resArray[5];
        var nombre_conjunto = resArray[6];

        //Actualizamos valores
        dataUser.datos_rol['cod_id'] = selectRol;
        dataUser.datos_rol['tipo'] = tipo;
        dataUser.datos_rol['tipo_id'] = tipo + '_' + id;
        dataUser.datos_rol['conjunto_id'] = conjunto_id;
        dataUser.datos_rol['logo'];

        dataUser.datos_rol['apartameto_id'] = apartamento_id;
        dataUser.datos_rol['propietario_id'];
        dataUser.datos_rol['nombre_bloque'] = bloque;
        dataUser.datos_rol['numero_apto'] = numero_apto;
        dataUser.datos_rol['nombre_conjunto'] = nombre_conjunto;
    }
};

