var vigenere = (function () {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var longitud = abc.length;

    var proceso = function (txt, desp, action) {
        return txt.replace(/[a-zñ]/ig, function (c) {
            var i = abc.indexOf(c.toLowerCase());
            if (i !== -1) {
                var pos = action ? (i + desp) % longitud : (i - desp + longitud) % longitud;
                return abc[pos];
            }
            return c;
        });
    };

    return {
        encode: function (txt, desp) {
            return proceso(txt, desp, true);
        },
        decode: function (txt, desp) {
            return proceso(txt, desp, false);
        }
    };
})();

function obindiceClave(reco) {
    var abc = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    return abc.indexOf(reco.toLowerCase());
}

function codificar(texto, clave) {
    if (clave.length > texto.length) {
        alert("La clave no puede ser más larga que el texto a cifrar.");
        return "";
    }
    var resultado = "";
    var indiceclave = 0;
    var charartexto = texto.split('');

    for (var i = 0; i < charartexto.length; i++) {
        var desp = obindiceClave(clave.charAt(indiceclave));
        resultado += vigenere.encode(charartexto[i], desp);
        indiceclave = (indiceclave + 1) % clave.length;
    }

    return resultado;
}

function decodificar(texto, clave) {
    if (clave.length > texto.length) {
        alert("La clave no puede ser más larga que el texto a descifrar.");
        return "";
    }
    var resultado = "";
    var indiceclave = 0;
    var charartexto = texto.split('');

    for (var i = 0; i < charartexto.length; i++) {
        var desp = obindiceClave(clave.charAt(indiceclave));
        resultado += vigenere.decode(charartexto[i], desp);
        indiceclave = (indiceclave + 1) % clave.length;
    }

    return resultado;
}

document.getElementById("btnCifrar").addEventListener("click", function() {
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;
    if (!texto || !clave) {
        alert("Por favor, ingrese texto y clave.");
        return;
    }
    document.getElementById("respuesta").value = codificar(texto, clave);
});

document.getElementById("btnDescifrar").addEventListener("click", function() {
    var texto = document.getElementById("txt").value;
    var clave = document.getElementById("txtclave").value;
    if (!texto || !clave) {
        alert("Por favor, ingrese texto y clave.");
        return;
    }
    document.getElementById("respuesta").value = decodificar(texto, clave);
});

document.getElementById("btnReiniciar").addEventListener("click", function() {
    document.getElementById("txt").value = "";
    document.getElementById("txtclave").value = "";
    document.getElementById("respuesta").value = "";
});

document.getElementById("btnCopiar").addEventListener("click", function() {
    var resultado = document.getElementById("respuesta");
    resultado.select();
    document.execCommand("copy");
    alert("Texto copiado al portapapeles.");
});
