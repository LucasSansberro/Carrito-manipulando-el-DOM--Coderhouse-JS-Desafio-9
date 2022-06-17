//Construimos la clase y sus objetos
class TipoDeReparacion {
	constructor (portada, lomo, limpieza, pegado){
		this.portada = portada;
		this.lomo = lomo;
		this.limpieza = limpieza;
		this.pegado = pegado;
	}
}

const rusticaObjeto = new TipoDeReparacion (
	{nombre: "Restauración de portada $" , precio: 600},
	{nombre: "Encolado de lomo $" , precio: 1200},
	{nombre: "Limpieza $" , precio: 300},
	{nombre: "Pegado de páginas $" , precio: 2000})

const cartoneObjeto = new TipoDeReparacion (
	{nombre: "Restauración de portada $" , precio: 2000},
	{nombre: "Encolado de lomo $" , precio: 5000},
	{nombre: "Limpieza $" , precio: 1500},
	{nombre: "Pegado de páginas $" , precio: 7000})

const cueroObjeto = new TipoDeReparacion (
	{nombre: "Restauración de portada $" , precio: 15000},
	{nombre: "Reemplazo de tarlatana $" , precio: 10000},
	{nombre: "Limpieza $" , precio: 8000},
	{nombre: "Restauración de páginas $" , precio: 9000})

//Colocamos los datos de los objetos dentro de arrays para facilitar su manipulación en el DOM. De esta
//manera combinamos la facilidad que tienen los objetos para acciones tales como cambiar el precio mediante método
//mientras a su vez mantenemos las funciones del DOM simples, sin tener que manipular propiedades de objeto en ellas
function arrayzador (array, objeto){
	array.push(objeto.portada.nombre + objeto.portada.precio)
	array.push(objeto.lomo.nombre + objeto.lomo.precio)
	array.push(objeto.limpieza.nombre + objeto.limpieza.precio)
	array.push(objeto.pegado.nombre + objeto.pegado.precio)
}
const rustica = [] ; arrayzador(rustica, rusticaObjeto)
const cartone = [] ; arrayzador(cartone, cartoneObjeto)
const cuero = [] ; arrayzador(cuero, cueroObjeto)

let carrito =[]
let precioFinal = 0

//Agregamos las listas de precios al DOM
const divListaPrecios = document.createElement("div")
divListaPrecios.setAttribute("style", "display:flex;justify-content:space-evenly")
document.body.append(divListaPrecios)
function creadorDeCuadros (eleccion){
	let eleccionCuadro = document.createElement("ul")
	eleccionCuadro.setAttribute("style", "border: black 1px solid;padding:20px; list-style:none;")
	for (const item of eleccion){
		eleccionCuadro.innerHTML += `<li style="padding:10px;"><button id="${item}"> ${item}</button></li>`
	}
	divListaPrecios.appendChild(eleccionCuadro)}
creadorDeCuadros(rustica) ; creadorDeCuadros(cartone) ; creadorDeCuadros(cuero)

//Agregamos al DOM los div de los elementos inferiores
const divResultados = document.createElement("div")
divResultados.setAttribute("style", "display:flex;justify-content:space-evenly;")
document.body.append(divResultados)

const divCarrito = document.createElement("div")
divCarrito.setAttribute("style", "border: black 1px solid;width:25%;border-radius:20px;"+
"display:flex;justify-content:center;align-items:center")
divResultados.appendChild(divCarrito)

const divBotones = document.createElement("div")
divBotones.setAttribute("style", "border: black 1px solid;padding:20px;width:25%;" +
"border-radius:20px;height:75px;display:flex;flex-direction:column;justify-content:space-between")
divResultados.appendChild(divBotones)

const divPrecioFinal = document.createElement("div")
divPrecioFinal.setAttribute("style", "border: black 1px solid;width:25%;border-radius:20px;"+
"height:100px;display:flex;justify-content:center;align-items:center")
divResultados.appendChild(divPrecioFinal)

//Agregamos un evento a los botones para que reaccionen al click
let listaCarrito = document.createElement("ul")
listaCarrito.setAttribute("style", "list-style:none;")
divCarrito.appendChild(listaCarrito)
function botonera (eleccion) {
	for (const item of eleccion){
		let eventos = document.getElementById(item)
		eventos.addEventListener("click", function(){
			listaCarrito.innerHTML += `<li> ${item}</li>`
			carrito.push(item)
			precioFinal = precioFinal + Number(item.match(/(\d+)/g))
		})
	}
}
botonera(rustica) ; botonera(cartone) ; botonera(cuero)

//Agregamos un botón para ordenar de menor a mayor
const sorteador = document.createElement("button")
sorteador.innerHTML = "Presione para ordenar por precio de menor a mayor"
divBotones.appendChild(sorteador)
sorteador.addEventListener("click", function(){
	carrito.sort((a, b) => (Number(a.match(/(\d+)/g)) - Number((b.match(/(\d+)/g)))))
	listaCarrito.remove();
	listaCarrito.innerHTML = carrito.join("</br>")
	divCarrito.appendChild(listaCarrito)
})

//Agregamos un botón para mostrar el precio final
const textoPrecioFinal = document.createElement("h2")
textoPrecioFinal.innerHTML = `El precio final es $${precioFinal}`
divPrecioFinal.appendChild(textoPrecioFinal)
const sumadorPrecioFinal = document.createElement("button")
sumadorPrecioFinal.innerHTML = "Presione para conocer el precio final"
divBotones.appendChild(sumadorPrecioFinal)
sumadorPrecioFinal.addEventListener("click", function(){
	textoPrecioFinal.remove()
	textoPrecioFinal.innerHTML = `El precio final es $${precioFinal}`
	divPrecioFinal.appendChild(textoPrecioFinal)
 })