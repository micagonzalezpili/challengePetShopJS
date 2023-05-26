const {createApp} = Vue
const app = createApp({
    data() { //REACTIVAS
        return {
            arrayProductos: [],
            medicamentos: [],
            medicamentosFiltrados: [],
            nameSearch: "",
            arrayCart: [],
            cartCount: 0,
            stockCount:""
        }
    },
    created(){ // LO QUE EJECUTO MIENTRAS LA APP ESTE CREADA
        fetch("https://mindhub-xj03.onrender.com/api/petshop")
            .then(res => res.json())
            .then(data => { 
                this.arrayProductos = data
                this.medicamentos = this.arrayProductos.filter(producto => producto.categoria == "farmacia")
                this.getLocalStorage()
                this.arrayCart = this.getLocalStorage() ?? []
                // this.stock()
                this.añadirCarrito();
            })
            .catch(error => { console.log(error) })
    },
    computed: {
        filtroNombre() {
            this.medicamentosFiltrados = this.medicamentos.filter(card => card.producto.toLowerCase().includes(this.nameSearch.toLowerCase()))            
        },
    },
    methods: {
        añadirCarrito(id) {
            const producto = this.medicamentos.find((medicamento) => medicamento._id == id);
            if (producto && !this.arrayCart.includes(producto)) {
              this.arrayCart.push(producto);
              const json = JSON.stringify(this.arrayCart);
              localStorage.setItem("producto", json);
              console.log(this.arrayCart);
            }
          },
        getLocalStorage() {
            return JSON.parse(localStorage.getItem("producto"))
        },
        // stock(){
        //     if (this.juguetes.disponibles > this.arrayCart.disponibles) {
        //         this.stockCount.textContent = this.juguetes.disponibles
        //     }else{
        //         const stock = document.getElementById("stock")
        //         stock.textContent = "No hay mas unidades disponibles"
        //     }
        // }
    }
})
app.mount(`#app`)