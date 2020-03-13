import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import url from '../url'
const baseUrl = "http://127.0.0.1:8000";

export default class Contacto extends Component {

    constructor(props){
      // variables
      super(props);
      this.state = {
        contacto:[],
        contactoBackup:[],
        textBuscar:'',
        formNombre:'',
        formApellido:'',
        formNo_telefono:'',
        idContacto:0,
        edit:false
      };
      // funciones de onchange de los campos en el formulario
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeApellido  = this.handleChangeApellido.bind(this);
      this.handleChangeDireccion  = this.handleChangeDireccion.bind(this);
      this.handleChangeNo_telefono  = this.handleChangeNo_telefono.bind(this);

    }

    componentDidMount(){
      this.loadDataContacto();
    }

    loadDataContacto(){

      axios.get(baseUrl+'api/contacto/list').then( response => {
          this.setState({
            contacto:response.data,
            contactoBackup:response.data
          });
       }).catch(error=>{
         alert("Error "+error);
       });

    }

    filter(event){

      console.log(event.target.value);
      // obtener datos de buscar
      var text = event.target.value;
      // obtener datos de array
      const data = this.state.contactoBackup;

      const newData = data.filter(function(item){
          // variable de titulo
          const itemDataNombre = item.nombre.toUpperCase();
          // variable de descripcion
          const itemDataApellido = item.apellido.toUpperCase();
          // juntarlos de titulo y descripcion
          const itemData = itemDataNombre+" "+itemDataApellido;
          // variable de buscar
          const textData = text.toUpperCase();
          // filtrar su es verdadero o no y lo devuelve
          return itemData.indexOf(textData) > -1;
      });

      this.setState({contacto:newData});

    }

    // campo de nombre
    handleChangeNombre(event) {
      this.setState({formNombre: event.target.value});
    }

    //campo de descripcion
    handleChangeApellido(event) {
      this.setState({formApellido: event.target.value});
    }

    // campo de precio
    handleChangeDireccion(event) {
      this.setState({formPrecio: event.target.value});
    }

    handleChangeNo_telefono(event) {
        this.setState({formNo_telefono: event.target.value});
      }
    render() {
        return (
          <div class="container">

            <br/>
            <h3>Agenda Telefonica </h3>
            <hr/>

            <input class="form-control col-md-4" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
            <br/>
            <button type="button" class="btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>
              Crear un contacto
            </button>

            <hr/>


            <table class="table table-bordered order-table ">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Apellido</th>
                  <th>No. Telefonico</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody id="bodytable">
                  {this.listData()}
              </tbody>
            </table>

            <div class="modal fade" id="exampleModalDelete" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">

                <div class="modal-content">

                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Eliminar</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <p>Esta seguro desea de eliminar un regsitro?</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                  </div>
                </div>

              </div>
            </div>


            <form>
            <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Formulario del contacto</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="form-group">
                     <label for="exampleInputEmail1">Nombre de contacto </label>
                     <input type="text" class="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Apellido del contacto</label>
                     <textarea class="form-control" rows="3" value={this.state.formApellido} onChange={this.handleChangeApellido}></textarea>
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">Dirección</label>
                     <input type="number" class="form-control" value={this.state.formDireccion} onChange={this.handleChangeDireccion} />
                    </div>
                    <div class="form-group">
                     <label for="exampleInputEmail1">No. Telefonico</label>
                     <input type="number" class="form-control" value={this.state.formNo_telefono} onChange={this.handleChangeNo_telefono} />
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>

                    {
                      this.state.edit?
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                      :
                      <button type="button" class="btn btn-primary" onClick={()=>this.sendNetworkProduct()}>Guardar</button>
                    }
                  </div>
                </div>
              </div>
            </div>
            </form>


          </div>
        );
    }

    showModalDelete(data){ 
      // id seleccionado para eliminar
      this.setState({ idProducto:data.id });
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){
      //alert("mostrar modal "+JSON.stringify(data))
      this.setState({
        idContacto:data.id,
        formNombre:data.nombre,
        formApellido: data.apellido,
        formDireccion:data.direccion,
        formNo_telefono: data.no_telefono,
        edit:true
      });
      $("#exampleModal").modal("show");
    }

    showModalCreate(){
      this.setState({
        idContacto:0,
        formNombre:"",
        formApellido:"",
        formDireccion:"",
        formNo_telefono:"",
        edit:false
      });
      $("#exampleModal").modal("show");
    }

    sendNetworkProduct()
    {
      const formData = new FormData()
      formData.append('nombre',this.state.formNombre)
      formData.append('apellido',this.state.formApellido)
      formData.append('direccion',this.state.formDireccion)
      formData.append('no_telefono',this.state.formNo_telefono)

      axios.post(baseUrl+'api/contacto/create',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataContacto()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error);
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id',this.state.idContacto)

      axios.post(baseUrl+'api/contacto/delete',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataContacto()
             // para cerrar el modal
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
         alert("Error "+error)
       })

    }

    sendNetworkUpdate(){

      const formData = new FormData()
      formData.append('id',this.state.idContacto)
      formData.append('nombre',this.state.formNombre)
      formData.append('apellido',this.state.formApellido)
      formData.append('direccion',this.state.formDireccion)
      formData.append('no_telefono',this.state.formNo_telefono)

      axios.post(baseUrl+'api/contacto/update',formData).then(response=>{

           if (response.data.success==true) {
             alert(response.data.message)
             // para cargar datos de nuevo
             this.loadDataContacto()
             // para cerrar el modal
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
         alert("Error 456"+error)
       })

    }

    listData(){

      return this.state.contacto.map((data)=>{

        return(
          <tr>
            <td>{data.nombre}</td>
            <td>{data.apellido}</td>
            <td>{data.direccion}</td>
            <td>{data.no_telefono}</td>
            <td>
              <button class="btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>
              <br/>
              <button class="btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>
            </td>
          </tr>
        )

      })

    }
}

if (document.getElementById('contacto')) {
    ReactDOM.render(<Contacto />, document.getElementById('contacto'));
}
