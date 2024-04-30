// var global para almacenar el ID seleccionado
let Id = 0;


const MostrarLibros = () => {
  try {

    // Realiza un get para obtener datos de libros
    axios.get("http://localhost:3001/libros")
      .then(resp => {

        // Limpia el contenido actual del elemento con ID _libros
        document.getElementById("_libros").innerHTML = "";

        // mapea los datos de libros y los agrega a la tabla
        resp.data.map(libros => {
          document.getElementById("_libros").innerHTML += `<tr>
            <th scope="row" id="id">${libros.id}</th>
            <td>${libros.nombreLibros}</td>
            <td>${libros.autorLibros}</td>

           <td> 
              <button type="submit" class="btn btn-dark" onclick="traerDatos(${libros.id},'${libros.nombreLibros}','${libros.autorLibros}')">
                <i class="fa-solid fa-pen-to-square">Editar</i>
              </button>
              <button type="submit" class="btn btn-danger" onclick="eliminarLibros(${libros.id})">
                <i class="fa-solid fa-trash-can">Borrar</i>
              </button>
              </td>
          </tr>`;
        })
      })
      .catch(error => console.log("Error al mostrar libros", error))
  }

  catch (error) {
    console.log("Error al mostrar libros", error);
  }
}


const ListarNombres = () => {
  try {
    axios.get("http://localhost:3001/libros").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(libros => {
        document.getElementById("nombreLibros").innerHTML += `
                        <option value="${libros.nombreLibros}">${libros.nombreLibros}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}
const ListarAutor = () => {
  try {
    axios.get("http://localhost:3001/libros").then(resp => {
      let array = resp.data
      console.log(array);
      array.map(libros => {
        document.getElementById("autorLibros").innerHTML += `
                        <option value="${libros.autorLibros}">${libros.autorLibros}</option>
                      </select>`
      })
    })
  } catch (error) {
    console.log(error);
  }
}

// llama a la funcion para mostrar el libro al cargar la página
MostrarLibros();
ListarNombres();
ListarAutor();

// funcion agregar libros
const Agregarlibros = () => {

  //   obtiene valores de los campos
  let nombre = document.getElementById("nombreLibros").value;
  let autor = document.getElementById("autorLibros").value;

  //valida los datos ingresados
  if (!validarDatos(nombre, autor)) {
    alert("Campos vacíos");
    return false;
  }

  //hace solicitud POST para agregar libros
  axios.post("http://localhost:3001/libros", {
    nombreLibros: nombre,
    autorLibros: autor,
  })
    .catch((error) => {
      console.error(error.message);
    });
  MostrarLibros();
};

//agrega un event listener al botón "agregar" para llamar a la función AgregarLibros
document.getElementById("agregar").addEventListener("click", Agregarlibros);

// funcion para traer datos de libros para editar
const traerDatos = (id, nombre, autor) => {

  //almacena el ID seleccionado
  Id = id;

  // Actualiza los valores en los campos de edición
  document.getElementById("nombreLibros").value = nombre;
  document.getElementById("autorLibros").value = autor;

  // Muestra el btn de edicion y oculta el btn de agregar
  document.getElementById("editar").style.display = "block";
  document.getElementById("agregar").style.display = "none";
};


const editarlibros = () => {

  // Obtiene valores de los campos de edición
  const nombre = document.getElementById("nombreLibros").value;
  const autor = document.getElementById("autorLibros").value;

  
  if (!validarDatos(nombre, autor)) {
    alert("Campos vacios")
  };
  axios.put("http://localhost:3001/libros/" + Id, {

    nombreLibros: nombre,
    autorLibros: autor,
  })
    .then(() => {

      // Actualiza la tabla de internaciones después de editar
      MostrarLibros();
    })
    .catch((error) => {
      console.error("Error al editar libros", error.message);
    });
}




// Agrega un event listener al botón "editar" para llamar a la función editarInternacion
document.getElementById("editar").addEventListener("click", editarlibros);

// Función para eliminar una internación
const eliminarLibros = (id) => {

  axios.delete("http://localhost:3001/libros/" + id)
    .then(() => {

      // Actualiza la tabla de internaciones después de eliminar
      MostrarLibros();
    })
    .catch((error) => {
      console.error("Error al eliminar libros", error.message);
    });
}

// Función para validar datos ingresados
const validarDatos = (nombre, autor) => {
  if (nombre === "" || autor === "") {
    return false;
  };
  return true;
};




