function validar() {

	if (document.getElementById("uno").value != document.getElementById("dos").value) {
		alert("no coinciden las contraseñas")
		document.getElementById("dos").focus() /*en esto conseguimos que el cursor esté sobre el campo */
		return false
	}
	else
		alert("Se ha registrado correctamente")
	return true

}
//Aqui le doy a cada producto un precio y una cantidad predefinida.
const productos = {
	prod1: { precio: 90, cantidad: 0 },
	prod2: { precio: 200, cantidad: 0 },
	prod3: { precio: 120, cantidad: 0 },
	prod4: { precio: 200, cantidad: 0 },
};

// Uso el localStorage para cargar los datos y que asi no se borren.
function cargarDatos() {
	const datosGuardados = localStorage.getItem("carrito");
	if (datosGuardados) {
		const carrito = JSON.parse(datosGuardados);
		for (const variable in productos) {
			if (carrito[variable] !== undefined) {
				productos[variable].cantidad = carrito[variable];
			}
		}
	}
}

// Uso el localStorage pero esta vez para guardarlos y que asi no se borren.
function guardarDatos() {
	const datosParaGuardar = {};
	for (const variable in productos) {
		datosParaGuardar[variable] = productos[variable].cantidad;
	}
	localStorage.setItem("carrito", JSON.stringify(datosParaGuardar));
}

// Inicializo el total en 0, ya que al principio todo esta en 0.
let total = 0;

// Función para actualizar el total y el recuento del carrito.
function actualizarTotalYRecuento() {
	total = Object.values(productos).reduce((suma, prod) => suma + (prod.precio * prod.cantidad), 0);
	const recuentoTotal = Object.values(productos).reduce((suma, prod) => suma + prod.cantidad, 0);

	document.getElementById("total").innerHTML = `Total: ${total}`;
	document.getElementById("recuento").innerHTML = `Cantidad total de productos: ${recuentoTotal}`;


	document.getElementById("cantidadProd1").innerHTML = ` ${productos.prod1.cantidad}`;
	document.getElementById("cantidadProd2").innerHTML = ` ${productos.prod2.cantidad}`;
	document.getElementById("cantidadProd3").innerHTML = ` ${productos.prod3.cantidad}`;
	document.getElementById("cantidadProd4").innerHTML = ` ${productos.prod4.cantidad}`;



}

// Función que se usa para sumar los productos
function sumar(productoId) {
	productos[productoId].cantidad++; // Incrementar cantidad en uno mas.
	guardarDatos(); // Se guardan los datos cada vez que se llama a esta funcion.
	actualizarTotalYRecuento(); // Se actualiza visualmente cada vez que se llama a esta funcion.
}

// Función que se usa para restar los productos
function restar(productoId) {
	if (productos[productoId].cantidad > 0) {
		productos[productoId].cantidad--; // Se resta a la cantidad uno menos.
		guardarDatos();
		actualizarTotalYRecuento();
	}
}

function reiniciarProducto(productoId) {
	productos[productoId].cantidad = 0; // Establecer a 0
	guardarDatos();
	actualizarTotalYRecuento();
}

// Función para reiniciar todo lo del carrito a 0
function reiniciar() {
	// Establecer todas las cantidades de los productos a 0
	for (const variable in productos) {
		productos[variable].cantidad = 0;
	}
	guardarDatos(); // Guardar el cambio
	actualizarTotalYRecuento();
}

// Configurar los botones de suma y resta de cada producto, usando un id para cada producto.
document.getElementById("sum1").addEventListener("click", () => {
	cargarDatos();
	

	sumar("prod1");

	guardarDatos();


});

document.getElementById("sum2").addEventListener("click", () => {
	cargarDatos();
	sumar("prod2");
	guardarDatos();
});

document.getElementById("sum3").addEventListener("click", () => {
	cargarDatos();
	sumar("prod3");
	guardarDatos();
});

document.getElementById("sum4").addEventListener("click", () => {
	cargarDatos();
	sumar("prod4");
	guardarDatos();
});

document.getElementById("res1").addEventListener("click", () => {
	restar("prod1");
});

document.getElementById("res2").addEventListener("click", () => {
	restar("prod2");
});

document.getElementById("res3").addEventListener("click", () => {
	restar("prod3");
});

document.getElementById("res4").addEventListener("click", () => {
	restar("prod4");
});

document.getElementById("resetProd1").addEventListener("click", () => {
	reiniciarProducto("prod1");
});

document.getElementById("resetProd2").addEventListener("click", () => {
	reiniciarProducto("prod2");
});

document.getElementById("resetProd3").addEventListener("click", () => {
	reiniciarProducto("prod3");
});

document.getElementById("resetProd4").addEventListener("click", () => {
	reiniciarProducto("prod4");
});




// Aqui se cargan los datos al principio
cargarDatos();
// Se actualiza el total y recuento al inicio
actualizarTotalYRecuento();




function cerrar() {

	alert("Se ha cerrado la sesion");
}
function numero() {
	//Obtengo el valor de cada input del formulario a partir de los id.
	const cvv = document.getElementById("CV").value;
	const fechaInput = document.getElementById("fcha").value;
	const fechaActual = new Date();
	const numeroTarjeta = document.getElementById("tarjeta").value;
	const nombreTitutlar = document.getElementById("nombreUsu").value;


	//Aqui se comprueba si es un numero o no.
	if (isNaN(cvv)) {
		alert("CVV debe ser un número.");
		return false;
		//Se comprueba si contiene un numero o no.
	} else if (/\d/.test(nombreTitutlar)) {
		alert("El nombre del titular no puede contener números");
		return false;
		//Se comprueba la longitud del numero de la tarjeta.
	} else if (numeroTarjeta.length !== 16) {
		alert("El numero de la tarjeta debe tener 16 digitos");
		return false;
	}
	//Se comprueba la longitud del cvv.
	else if (cvv.length !== 3) {
		alert("CVV debe tener 3 dígitos.");
		return false;
		//Se comprueba si la fecha es anterior a la actual
	} else if (new Date(fechaInput) <= fechaActual) {
		alert("La fecha de vencimiento debe ser posterior a la actual.");
		return false;
		//Se comprueba si el numero de la tarjeta contiene numeros o no
	} else if (isNaN(numeroTarjeta)) {
		alert("El numero de la tarjeta no puede contener letras");
		return false;
	}
	// Si todo esta correcto entraria en este caso y dejaria enviar el formulario con el return true.
	else {
		alert("Datos ingresados correctamente.");
		reiniciar();
		return true;
	}
}




