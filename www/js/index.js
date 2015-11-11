//------------------------------------------------------------------------------->
/**
 * datos de usuario
 * @type type
 */
var dataUser = {
    datos_rol: undefined,
    data_user: undefined,
    carteleraVirtual: undefined,
};
//------------------------------------------------------------------------------->
var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
        navigator.notification.alert("El sistema operativo de su dispositivo no permite ejecutar esta aplicación");
        console.log('Received Event: ' + id);
    },
    init: function () {
        login.validaSesion();
    }
};

$(document).ready(function () {
    app.init();
});


