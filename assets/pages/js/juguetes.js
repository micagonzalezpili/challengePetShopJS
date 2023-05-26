const { createApp } = Vue; // ACCEDL A LA PROP DEL OBJETO

const app = createApp({

    data() { // PROP REACTIVAS
        return {
            infoData: [],
            juguetes: [],
            juguetesFiltrados: [],
            textoIngresado: "",
            arrayCart: [],
            cartCount: 0,
            stockCount: "",
            dataSet: [],
            dataAccion: ""
        }
    },
    created() { // LO QUE EJECUTO MIENTRAS LA APP ESTE CREADA
        const url = "https://mindhub-xj03.onrender.com/api/petshop"
        fetch(url)
            .then(res => res.json())
            .then(data => { 
                this.infoData = data
                this.juguetes = this.infoData.filter(e => e.categoria == "jugueteria")
                this.getLocalStorage()
                this.arrayCart = this.getLocalStorage() ?? []
                // this.stock()
                this.añadirCarrito();
                
            })
            .catch(error => { console.log(error) })
    },
    computed: {
        filtroTexto() {
            this.juguetesFiltrados = this.juguetes.filter(e => e.producto.toLowerCase().includes(this.textoIngresado.toLowerCase()))            
        },
    },methods: {
        añadirCarrito(id) {
            const producto = this.juguetes.find((juguete) => juguete._id == id);
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
        descartarCarrito(e){
            this.dataSet = e.target.dataSet
            console.log(this.dataSet);
            if (this.dataAccion == "Descartar"){
                this.arrayCart = this.arrayCart.filter(e=> e._id != this.dataSet._id)
            }
        }
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
app.mount("#app")