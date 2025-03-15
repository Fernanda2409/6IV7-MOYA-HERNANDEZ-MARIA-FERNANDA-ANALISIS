const textoDescifrado = document.createElement("textarea");
textoDescifrado.id = "descifrado";
textoDescifrado.className = "form-control";
textoDescifrado.disabled = true;

// Agregar el campo de descifrado al HTML
const container = document.querySelector(".container");
const div = document.createElement("div");
div.className = "col-md-12";
const label = document.createElement("label");
label.textContent = "Texto Descifrado:";// Clase para el cifrado
class CifradoCesar {
    constructor(textoElement, desplazamientoElement, cifradoElement) {
        this.texto = textoElement;
        this.desplazamiento = desplazamientoElement;
        this.cifrado = cifradoElement;
        this.init();
    }

    // Función para cifrar el texto
    cifrar() {
        const textoIngresado = this.texto.value;
        this.cifrado.value = textoIngresado.split('').map(c => {
            let mayus = (c === c.toUpperCase()) ? true : false;
            let valorEntero = c.toLowerCase().charCodeAt(0);

            if (valorEntero >= 97 && valorEntero <= 122) {
                // Son letras, entonces las cifro
                const valorDesplazamiento = parseInt(this.desplazamiento.value);
                if (valorEntero + valorDesplazamiento > 122) {
                    valorEntero = 97 + (valorEntero - 122) + valorDesplazamiento - 1;
                } else {
                    valorEntero = valorEntero + valorDesplazamiento;
                }
            }
            let cifrado = String.fromCharCode(valorEntero);
            return mayus ? cifrado.toUpperCase() : cifrado;
        }).join('');
    }

    // Inicializar los eventos
    init() {
        this.texto.addEventListener("keyup", () => this.cifrar());
        this.desplazamiento.addEventListener("change", () => this.cifrar());
    }
}

// Clase para el descifrado
class DescifradoCesar {
    constructor(cifradoElement, desplazamientoElement, descifradoElement) {
        this.cifrado = cifradoElement;
        this.desplazamiento = desplazamientoElement;
        this.descifrado = descifradoElement;
        this.init();
    }

    // Función para descifrar el texto
    descifrar() {
        const textoIngresado = this.cifrado.value;
        this.descifrado.value = textoIngresado.split('').map(c => {
            let mayus = (c === c.toUpperCase()) ? true : false;
            let valorEntero = c.toLowerCase().charCodeAt(0);

            if (valorEntero >= 97 && valorEntero <= 122) {
                // Son letras, entonces las descifro
                const valorDesplazamiento = parseInt(this.desplazamiento.value);
                if (valorEntero - valorDesplazamiento < 97) {
                    valorEntero = 122 - (96 - (valorEntero - valorDesplazamiento));
                } else {
                    valorEntero = valorEntero - valorDesplazamiento;
                }
            }
            let descifrado = String.fromCharCode(valorEntero);
            return mayus ? descifrado.toUpperCase() : descifrado;
        }).join('');
    }

    // Inicializar los eventos
    init() {
        this.cifrado.addEventListener("input", () => this.descifrar());
        this.desplazamiento.addEventListener("change", () => this.descifrar());
    }
}

// Crear las instancias de las clases
const cifrado = new CifradoCesar(document.getElementById("texto"), document.getElementById("desplazamiento"), document.getElementById("cifrado"));
const descifrado = new DescifradoCesar(document.getElementById("cifrado"), document.getElementById("desplazamiento"), document.getElementById("descifrado"));

div.appendChild(label);
div.appendChild(textoDescifrado);
container.appendChild(div);

function descifrado() {
    const textoIngresado = textoCifrado.value;
    
    textoDescifrado.value = textoIngresado.split('').map(c => {
        let mayus = (c === c.toUpperCase()) ? true : false;
        let valorEntero = c.toLowerCase().charCodeAt(0);
        
        if (valorEntero >= 97 && valorEntero <= 122) {
            const valorDesplazamiento = parseInt(desplazamiento.value);
            if (valorEntero - valorDesplazamiento < 97) {
                valorEntero = 122 - (96 - (valorEntero - valorDesplazamiento));
            } else {
                valorEntero = valorEntero - valorDesplazamiento;
            }
        }
        let descifrado = String.fromCharCode(valorEntero);
        return mayus ? descifrado.toUpperCase() : descifrado;
    }).join('');
}


textoCifrado.addEventListener("input", descifrado);
desplazamiento.addEventListener("change", descifrado);