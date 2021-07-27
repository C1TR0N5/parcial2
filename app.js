// ## Agrega la dependencia de express ##
const express = require('express');

var animals = [
   {
     animalType: "dog",
     pet: true,
     fierceness: 4
   }, {
     pet: true,
     fierceness: 10
   }, {
     animalType: "giraffe",
     pet: false,
     fierceness: 4
   }, {
     animalType: "zebra",
     pet: false,
     fierceness: 8
   }, {
     animalType: "lion",
     pet: false,
     fierceness: 10
   }
 ];


// ## Inicializa express ##
const app = express();

// ## Inicializa el motor de plantillas con EJS ##
app.set('view engine', 'ejs');

// ## Agrega el middleware de express para que el servidor soporte json ##
app.use(express.json());

/* ############## RUTAS ################  */

/* (1)  Crea una ruta GET que: 
   - escuche en /all-pets  
   - renderice la página 'pages/all-pets' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor "All" 
      b) animals: con referencia al arreglo animals. 
*/
app.get("/all-pets", (req, res) => {
  res.render("pages/all-pets", { title: "ALL", animals: animals });
});

/* (2)  Crea una ruta POST que: 
   - escuche en /api/addAnimal 
   - obtenga el valor recibido del body
   - lo agregue al arreglo animals

*/
app.post("/api/addAnimal", (req, res) => {
  animals.push(req.body)
  res.send(req.body);
}) 
/* (3)  Crea una ruta GET que: 
   - escuche en /dog  
   - renderice la página 'pages/dog' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor "Dog" 
      b) dog: con el valor del indice[0]
*/ 
app.get("/dog", (req, res) => {
  res.render("pages/dog", {title: "Dog", dog: animals[0]});
});

/* (4)  Crea una ruta GET que: 
   - escuche en /api/getAnimal/:animal
   - obtenga el valor de la ruta dinámica
   - Realice una busqueda en el arreglo 'animals' vs el valor dinámico.
   - Si hay coincidencia almacena ese objeto en alguna variable
   - renderice la página 'pages/any' y reciba 1 objeto con 2 propiedades: 
      a) title:  con el valor obtenido de la ruta dinámica
      b) animal: con la variable que almacena el objeto encontrado. Si no lo encuentra la variable se va vacía
*/ 
app.get("/api/getAnimal/:animal", (req, res) => {
	var chosen = req.params.animal;
	var found = null;
	for (var i = 0; i < animals.length; i++) {
		if (chosen === animals[i].animalType) {
			found = animals[i];
		}
	}
	res.render('pages/any', {title: chosen, animal: found});
})

//  Agrega el código necesario para que el servidor escuche en el puerto 5000
const PORT = 5000;
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
