const { createApp } = Vue; // ACCEDL A LA PROP DEL OBJETO

const app = createApp({

    data() { // PROP REACTIVAS
        return {
            infoData: [],
            juguetes: [],
            juguetesFiltrados: [],
            textoIngresado: "",

        }
    },

    created() { // LO QUE EJECUTO MIENTRAS LA APP ESTE CREADA
        const url = "https://mindhub-xj03.onrender.com/api/petshop"
        fetch(url)
            .then(res => res.json())
            .then(data => { 
                this.infoData = data
                console.log(this.infoData);
                this.juguetes = this.infoData.filter(e => e.categoria == "jugueteria")
                console.log(this.juguetes);



            })
            .catch(error => { console.log(error) })
    },

    computed: {
        filtroTexto() {
            this.juguetesFiltrados = this.juguetes.filter(e => e.producto.toLowerCase().includes(this.textoIngresado.toLowerCase()))            
        },

    }

})
app.mount("#app")