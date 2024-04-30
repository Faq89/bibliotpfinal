const login = () => {
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;
  
    if (user == "" || password == "") {
    alert("Campos vacios")
    }
    axios.get("http://localhost:3001/admin")

      .then((resp) => {
        const usuarioValido = resp.data.find(U => user === U.user && password === U.password);
  
        if (usuarioValido) {
            window.location.href = "view.html";
        } else {
          alert("Usuario o contraseña incorrecta")
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };