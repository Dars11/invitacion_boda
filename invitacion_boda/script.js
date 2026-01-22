// --- Sección 2: Cuenta Regresiva ---

// ¡IMPORTANTE! Cambia esta fecha por la fecha de tu boda.
// Formato: Mes Día, Año HH:MM:SS
const fechaBoda = new Date("Mar 14, 2026 16:00:00").getTime();

// Actualiza el contador cada segundo
const x = setInterval(function () {

    // Obtiene la fecha y hora actual
    const ahora = new Date().getTime();

    // Encuentra la distancia entre ahora y la fecha de la boda
    const distancia = fechaBoda - ahora;

    // Cálculos de tiempo para días, horas, minutos y segundos
    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    // Muestra el resultado en los elementos correspondientes
    document.getElementById("dias").innerText = dias < 10 ? '0' + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? '0' + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? '0' + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? '0' + segundos : segundos;

    // Si la cuenta regresiva termina, muestra un mensaje
    if (distancia < 0) {
        clearInterval(x);
        document.getElementById("reloj").innerHTML = "¡Llegó el gran día!";
    }
}, 1000);


// --- MOTOR DE EXPERIENCIA DE BODA (Implementación Senior) ---
(function () {
    'use strict';

    const experienciaBoda = {
        iniciar() {
            document.addEventListener('DOMContentLoaded', () => this.vincularEventos());
        },

        vincularEventos() {
            const pantalla = document.getElementById('splash-boda');
            const audio = document.getElementById('musica-boda');
            const btnMusica = document.getElementById('btn-musica');
            const btnSilencio = document.getElementById('btn-silencio');
            const btnControl = document.getElementById('btn-control-musica');

            if (!pantalla || !audio) return;

            btnMusica.addEventListener('click', () => this.manejarEntrada(true, pantalla, audio));
            btnSilencio.addEventListener('click', () => this.manejarEntrada(false, pantalla, audio));

            // Evento para el botón flotante
            if (btnControl) {
                btnControl.addEventListener('click', () => this.alternarMusica(audio, btnControl));
            }
        },

        manejarEntrada(conMusica, pantalla, audio) {
            if (conMusica) {
                this.reproducirMusicaConDesvanecimiento(audio);
            }

            // Inicio de Animación de Salida
            pantalla.classList.add('esta-saliendo');

            // Senior UX: Delay ajustado para coincidir con la transición (1.5s) y evitar reflow
            setTimeout(() => {
                document.body.classList.remove('esta-bloqueado');
            }, 1500);

            // Limpieza: Eliminar Splash del DOM para liberar recursos
            setTimeout(() => {
                pantalla.remove();
                // Mostrar el botón flotante después de que se va el splash
                const btnControl = document.getElementById('btn-control-musica');
                if (btnControl) {
                    btnControl.classList.remove('oculto');
                    if (conMusica) {
                        btnControl.classList.add('reproduciendo');
                    }
                }
            }, 2000);
        },

        alternarMusica(audio, btnControl) {
            if (audio.paused) {
                audio.play();
                btnControl.classList.add('reproduciendo');
            } else {
                audio.pause();
                btnControl.classList.remove('reproduciendo');
            }
        },

        reproducirMusicaConDesvanecimiento(audio) {
            audio.volume = 0;
            const promesaReproduccion = audio.play();

            if (promesaReproduccion !== undefined) {
                promesaReproduccion.then(() => {
                    // Lógica de Fade In (entrada suave)
                    let volumen = 0;
                    const intervalo = setInterval(() => {
                        if (volumen < 1) {
                            volumen += 0.05;
                            audio.volume = Math.min(volumen, 1);
                        } else {
                            clearInterval(intervalo);
                        }
                    }, 100);
                }).catch(error => {
                    console.error("Fallo la reproducción de audio:", error);
                });
            }
        }
    };

    experienciaBoda.iniciar();
})();

// --- Sección 4: Lógica del Carrusel con Autoscroll ---
document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.carrusel-track');

    if (track) {
        const scrollInterval = setInterval(function () {
            const slideWidth = track.querySelector('.carrusel-slide').offsetWidth;
            const gap = 20; // El mismo valor que tienes en el 'gap' de tu CSS

            // Si el scroll está cerca del final, lo reiniciamos al principio
            // El +1 es un pequeño margen para evitar problemas de redondeo de píxeles
            if (track.scrollLeft + track.clientWidth + 1 >= track.scrollWidth) {
                track.scrollLeft = 0;
            } else {
                // Si no, avanzamos un slide
                track.scrollLeft += slideWidth + gap;
            }
        }, 3000); // Cambia de slide cada 3 segundos (3000 milisegundos). Puedes ajustar este valor.
    }
});

//Implementacion de invitados dinamicos
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    // Usaremos el parámetro 'familia' (o 'invitados', como prefieras)
    const dataNombres = params.get('familia');
    
    const contenedor = document.getElementById('contenedor-invitados');
    const contadorCupos = document.getElementById('cantidad-cupos');

    if (dataNombres) {
        // 1. Limpiamos el contenedor (borramos "Invitado Especial")
        contenedor.innerHTML = ''; 

        // 2. Convertimos el texto del link en una lista (Array)
        // Ejemplo: "Juan|Ana|Luis" se convierte en ["Juan", "Ana", "Luis"]
        const listaNombres = dataNombres.split('|');

        // Asignamos la cantidad de nombres encontrados al número en pantalla
        if (contadorCupos) {
            contadorCupos.innerText = listaNombres.length;
        }

        // 3. Recorremos la lista y creamos un elemento por cada persona
        listaNombres.forEach(nombre => {
            // Creamos una etiqueta nueva (puede ser span, p, h2, etc.)
            const nuevoElemento = document.createElement('span');

            let nombreLimpio = decodeURIComponent(nombre).replace(/\+/g, ' ');
            
            // Le ponemos el texto
            nuevoElemento.innerText = nombreLimpio;
            
            // Le agregamos la clase CSS para que se vea bonito (mismo estilo que tenías)
            nuevoElemento.classList.add('nombre-invitado');
            
            // Opcional: Forzamos que sea bloque para que salga uno debajo de otro
            nuevoElemento.style.display = 'block'; 

            // 4. Lo insertamos dentro del contenedor
            contenedor.appendChild(nuevoElemento);
        });
    }
});