var change_pages = {
    editarPerfil: function () {
        //Cargamos datos a editar 
        
        $("#p_nombre").val(dataUser.data_user['primer_nombre'] + ' ' + dataUser.data_user['segundo_nombre']);
        $("#p_apellidos").val(dataUser.data_user['primer_apellido'] + ' ' + dataUser.data_user['segundo_apellido']);
        $("#p_email").val(dataUser.data_user['email']);
        $("#p_profesion").val(dataUser.data_user['profesion']);
        
        $("#p_fecha_nacimiento").val(dataUser.data_user['fecha_nacimiento']);
        $("#p_tel_fijo").val(dataUser.data_user['telefono_fjo']);
        $("#p_tel_movil").val(dataUser.data_user['movil']);
        $("#p_dir_residencia").val(dataUser.data_user['direccion']);
        

        //Redireccionamos a editar-perfil
        change_pages.change("editar-perfil");
    },
    perfil: function () {
        //Redireccionamos a perfil
        change_pages.change("perfil");
    },
    inicio: function () {
        //Redireccionamos a perfil
        change_pages.change("inicio");
    },
    change: function (id_change) {
        //Función para cambiar de pagina
        $.mobile.changePage("#" + id_change, {transition: "slideup", changeHash: false});
    }
};

