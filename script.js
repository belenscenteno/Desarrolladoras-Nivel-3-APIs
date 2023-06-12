document.addEventListener('DOMContentLoaded', function () {
    var video = document.getElementById('videoPlayer');
    var playButton = document.getElementById('playButton');
    var pauseButton = document.getElementById('pauseButton');
    var volumeUpButton = document.getElementById('volumeUpButton');
    var volumeDownButton = document.getElementById('volumeDownButton');
    var fileInput = document.getElementById('fileInput');
    var loadingMessage = document.getElementById('loadingMessage');

    // Evento click para reproducir el video
    playButton.addEventListener('click', function () {
        video.play();
    });

    // Evento click para pausar el video
    pauseButton.addEventListener('click', function () {
        video.pause();
    });

    // Evento click para subir el volumen
    volumeUpButton.addEventListener('click', function () {
        if (video.volume < 1) {
            video.volume += 0.1;
        }
    });

    // Evento click para bajar el volumen
    volumeDownButton.addEventListener('click', function () {
        if (video.volume > 0) {
            video.volume -= 0.1;
        }
    });

    // Evento change para cargar el video seleccionado por el usuario
    fileInput.addEventListener('change', function (event) {
        var file = event.target.files[0];
        var type = file.type;

        // Verificar si el archivo es un video
        if (type.startsWith('video/')) {
            var reader = new FileReader();

            // Mostrar mensaje de carga
            loadingMessage.innerText = 'Cargando el video...';

            // Agregar un retraso de 3 segundos antes de cargar el video
            setTimeout(function () {
                reader.onload = function (event) {
                    var videoSource = event.target.result;

                    // Crear URL para el video cargado
                    var videoUrl = URL.createObjectURL(file);

                    // Asignar la URL al elemento de video
                    video.src = videoUrl;

                    // Ocultar mensaje de carga
                    loadingMessage.innerText = '';
                };

                reader.readAsArrayBuffer(file);
            }, 3000);
        } else {
            // El archivo no es un video
            alert('¡Por favor, selecciona un archivo de video válido!');
            fileInput.value = ''; // Limpiar el valor del input file
        }
    });
});
