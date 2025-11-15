const errorBanner = document.getElementById("errorBanner");
const listaUsuarios = document.getElementById("listaUsuarios");

const endpoint = "https://jsonplaceholder.typicode.com/users";

fetch(endpoint)
.then(response => {
    if (!response.ok) throw new Error("El servidor ha mandado un mensaje de fallo en la solicitud.");
    return response.json();
})
.then(data => {
    let people = [];
    let listContent = "";

    if (Array.isArray(data)) {
        for (const d of data) {
            person = {
                ...d,
                age: Math.floor(Math.random()*100),
                image: `./assets/img/${d.id}.jpeg`,
                company: d.company?.name,
                address: [d.address?.street, d.address?.suite, d.address?.city].join(", ")
            };

            people.push(person);
        }
    }

    for (const person of people) {
        listContent += `
            <li>
                <div>
                    <div>
                        <p><span>Nombre: </span><span>${person.name}</span></p>
                        <p><span>Edad: </span><span>${person.age}</span></p>
                        <p><span>Username: </span><span>${person.username}</span></p>
                        <p><span>Teléfono: </span><span>${person.phone}</span></p>
                        <p><span>Email: </span><span>${person.email}</span></p>
                    </div>
                    <img alt=${person.name} src="${person.image}">
                </div>
                <div>
                    <p><span>Compañía: </span><span>${person.company}</span></p>
                    <p><span>Dirección: </span><span>${person.address}</span></p>
                </div>
            </li>
        `;
    }

    listaUsuarios.innerHTML = listContent;
})
.catch(error => {
    errorBanner.innerText = "Error al solicitar datos a la API, recarga la página para intentarlo de nuevo.";
    console.log(error);
});