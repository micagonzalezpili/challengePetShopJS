const {createApp} = Vue
const app = createApp({
    data() { // PROP REACTIVAS
        return {
            arrayProductos: [],
            medicamentos: [],
            medicamentosFiltrados: [],
            nameSearch: "",
        }
    },
    created(){
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(res => res.json())
            .then(data => { 
                this.arrayProductos = data
                this.medicamentos = this.arrayProductos.filter(producto => producto.categoria == "farmacia")

            })
            .catch(error => { console.log(error) })
    },
    computed: {
        filtroNombre() {
            this.medicamentosFiltrados = this.medicamentos.filter(card => card.producto.toLowerCase().includes(this.nameSearch.toLowerCase()))            
        },
    }
})
app.mount(`#app`)