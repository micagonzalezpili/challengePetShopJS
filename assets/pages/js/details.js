const { createApp } = Vue; // ACCEDL A LA PROP DEL OBJETO

const app = createApp({

    data() { // PROP REACTIVAS
        return {
            infoData: [],
            juguetesId: [],
            juguetes: [],
            medicamentos: [],
            params: [],
            dataParams: []
        }
    },

    created() { // LO QUE EJECUTO MIENTRAS LA APP ESTE CREADA
        const url = "https://mindhub-xj03.onrender.com/api/petshop"
        fetch(url)
            .then(res => res.json())
            .then(data => {
                this.infoData = data   
                this.juguetes = this.infoData.filter(e => e.categoria == "jugueteria")             
                this.medicamentos = this.infoData.filter(e => e.categoria == "farmacia")             
                this.params = new URLSearchParams(location.search)
                this.dataParams = this.params.get("_id")
                this.juguetesId = this.juguetes.find(juguete => juguete._id == this.dataParams) || this.medicamentos.find(medicamento => medicamento._id == this.dataParams )
                console.log(this.juguetesId);
                console.log(this.juguetesId);
                console.log(this.dataParams);
                console.log(this.params);
            })
            .catch(error => { console.log(error) })
    },

    methods: { // FN DE MI APP 

    },

    computed: {
               
       

    }

})
app.mount("#app")