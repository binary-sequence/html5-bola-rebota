/*
                                ESPAÑOL

  Este archivo es parte de 'html5-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-bola-rebota' es software libre: usted puede redistribuirlo y/o
  modificarlo bajo los términos de la Licencia Pública General GNU publicada por
  la Fundación para el Software Libre, ya sea la versión 3 de la Licencia,o (a
  su elección) cualquier versión posterior.

  'html5-bola-rebota' se distribuye con la esperanza de que sea útil, pero SIN
  GARANTÍA ALGUNA; ni siquiera la garantía implícita MERCANTIL o de APTITUD PARA
  UN PROPÓSITO DETERMINADO. Consulte los detalles de la Licencia Pública General
  GNU para obtener una información más detallada.

  Debería haber recibido una copia de la Licencia Pública General GNU junto a
  'html5-bola-rebota'. En caso contrario, consulte
  <http://www.gnu.org/licenses/>.


                                ENGLISH

  This file is part of 'html5-bola-rebota'.

  Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>

  'html5-bola-rebota' is free software: you can redistribute it and/or modify it
  under the terms of the GNU General Public License as published by the Free
  Software Foundation, either version 3 of the License, or (at your option) any
  later version.

  'html5-bola-rebota' is distributed in the hope that it will be useful, but
  WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or
  FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
  details.

  You should have received a copy of the GNU General Public License along with
  'html5-bola-rebota'. If not, see <http://www.gnu.org/licenses/>.

*/
;
// CLASE cámara.
function Camara2D(imagenes, elementos) {
// PROPIEDADES.    --------//

	// Activa o desactiva modo debug.
	this.debugMode = true;

	// Referencia al almacén de imágenes.
	this.img = imagenes;

	// Referencia al almacén de elementos.
	this.elementos = elementos;

	// Medidas de gráficos.
	this.ancho = 800; this.alto = 600;

	// Referencia al elemento gráfico canvas.
	this.canvasGameScreen = document.getElementById('canvasGameScreen');

	// Objeto que efectúa operaciones de dibujo 2d en canvas.
	this.contextGameScreen = this.canvasGameScreen.getContext('2d');

	// Buffer para técnica de double buffering.
	this.canvasBufferScreen = document.createElement('canvas');

	// Objeto que efectúa operaciones de dibujo 2d en el buffer.
	this.contextBufferScreen = this.canvasBufferScreen.getContext('2d');

	// Resolución del elemento canvas.
	this.canvasGameScreen.width = this.ancho;
	this.canvasGameScreen.height = this.alto;

	// Resolución del buffer.
	this.canvasBufferScreen.width = this.canvasGameScreen.width;
	this.canvasBufferScreen.height = this.canvasGameScreen.height;


// MÉTODOS.    --------//

	// Actualiza el gráfico canvas.
	this.actualizar = function() {
		if( elementos['estados'].licencia ) {
			// Mostrar texto de licencia.
			var texto = new Array();
			texto[0] = 'Copyright 2012 Sergio Lindo - <sergiolindo.empresa@gmail.com>';
			texto[1] = '';
			texto[2] = "'html5-bola-rebota' es software libre: usted puede redistribuirlo y/o";
			texto[3] = 'modificarlo bajo los términos de la Licencia Pública General GNU publicada por';
			texto[4] = 'la Fundación para el Software Libre, ya sea la versión 3 de la Licencia,o (a';
			texto[5] = 'su elección) cualquier versión posterior.';
			texto[6] = '';
			texto[7] = "'html5-bola-rebota' se distribuye con la esperanza de que sea útil, pero SIN";
			texto[8] = 'GARANTÍA ALGUNA; ni siquiera la garantía implícita MERCANTIL o de APTITUD PARA';
			texto[9] = 'UN PROPÓSITO DETERMINADO. Consulte los detalles de la Licencia Pública General';
			texto[10] = 'GNU para obtener una información más detallada.';
			texto[11] = '';
			texto[12] = 'Debería haber recibido una copia de la Licencia Pública General GNU junto a';
			texto[13] = "'html5-bola-rebota'. En caso contrario, consulte";
			texto[14] = '<http://www.gnu.org/licenses/>.';
			texto[15] = '';

			this.contextGameScreen.fillStyle = '#FFFFFF';
			this.contextGameScreen.fillRect(0, 0, this.canvasGameScreen.width, this.canvasGameScreen.height);

			this.contextGameScreen.font = "normal 18px verdana";
			this.contextGameScreen.fillStyle = '#000000';
			this.contextGameScreen.textBaseline = 'top';

			this.contextGameScreen.drawImage(imagenes['gplv3-127x51'], 50, 30);
			var i;
			for(i = 0; i < texto.length; i++) {
				this.contextGameScreen.fillText(texto[i], 25, 90+i*20);
			}

			this.contextGameScreen.fillStyle = '#000099'; 
			this.contextGameScreen.fillText('Pulsa una tecla para continuar.', 30, 90+i*20);

		} else {
			// TODO
		}


	// VOLCADO DEL BUFFER AL CANVAS VISIBLE.    --------//

		// Pasa el contenido del buffer al canvas.
		this.contextGameScreen.drawImage(this.canvasBufferScreen, 0, 0);
	};

	// Ajusta el tamaño del canvas a cualquier resolución de pantalla.
	this.ajustarGameScreen = function() {
		// Proporción de ancho / alto deseada.
		var widthToHeight = this.ancho / this.alto; // 320px*240px

		// Ancho y alto actuales de la ventana.
		var newWidth = window.innerWidth;
		var newHeight = window.innerHeight;

		// Proporción de ancho / alto actual.
		var newWidthToHeight = newWidth / newHeight;

		// Si hay mas ancho del deseado...
		if (newWidthToHeight > widthToHeight) {
			// Se ajusta al alto.
			newWidth = newHeight * widthToHeight;
			this.canvasGameScreen.style.height = newHeight + 'px';
			this.canvasGameScreen.style.width = newWidth + 'px';
		} else {
		// Si hay mas alto del deseado...
			// Se ajusta al ancho.
			newHeight = newWidth / widthToHeight;
			this.canvasGameScreen.style.width = newWidth + 'px';
			this.canvasGameScreen.style.height = newHeight + 'px';
		}

		// Según las medidas actuales, se centra el canvas.
		this.canvasGameScreen.style.marginTop = (-newHeight / 2) + 'px';
		this.canvasGameScreen.style.marginLeft = (-newWidth / 2) + 'px';
	};

	// Información en consola javascript del navegador.
	console.info("Creado objeto de clase Camara.");
}

// Información en consola javascript del navegador.
console.info("Incluído html5-bola-rebota.camara2d.js");