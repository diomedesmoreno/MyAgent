import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
// import url from '../url'
const baseUrl = "https://mycontactos.herokuapp.com/";


export default class Contacto extends Component {

    constructor(props){
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
      this.handleChangeNombre = this.handleChangeNombre.bind(this);
      this.handleChangeApellido  = this.handleChangeApellido.bind(this);
      this.handleChangeCorreo  = this.handleChangeCorreo.bind(this);
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
        console.log("se produccion el sig. error ",error);//  alert("Error "+error);
       });

    }

    filter(event){      
      var text = event.target.value;
      const data = this.state.contactoBackup;

      const newData = data.filter(function(item){
          const itemDataNombre = item.nombre.toUpperCase();
         
          const itemDataApellido = item.apellido.toUpperCase();
          
          const itemData = itemDataNombre+" "+itemDataApellido;
          
          const textData = text.toUpperCase();
      
          return itemData.indexOf(textData) > -1;
      });

      this.setState({contacto:newData});

    }
   
    handleChangeNombre(event) {      
      this.setState({formNombre: event.target.value});
    }

    handleChangeApellido(event) {
      this.setState({formApellido: event.target.value});
    }

    handleChangeCorreo(event) {
      this.setState({formCorreo: event.target.value});
    }

    handleChangeNo_telefono(event) {
        this.setState({formNo_telefono: event.target.value});
      }
    render() {
        return (
          <div className="container">

            <div>
              <h3>Agenda Telefónica</h3>
            </div>
            
            <hr/>

           <div className="row"> 
              <input className="form-control col-md-6" placeholder="Buscar..." value={this.state.text} onChange={(text) => this.filter(text)}/>
              <div className="row"> 
                <div className=" col-md-3"> 
                  <a href="fibonacci">Número fibonacci</a>  
                </div>
                <div className=" col-md-3"> 
                  <a href="multiplo">Múltiplo de una número</a>  
                </div>
                <div className=" col-md-3"> 
                  <a href="numeroImpar">Número impar o par</a>
                </div>
              </div>
                <button type="button" className="btn btn-primary pull-right" onClick={()=>this.showModalCreate()}>
                  Crear un contacto
                </button>
            </div>

            <hr/>
            <div className="row"> 
              
              <table className="table table-striped ">
                <thead>
                  <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Dirección</th>
                    <th>No. Telefónico</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody id="bodytable">
                    {this.listData()}
                </tbody>
              </table>
            </div>


            <div className="modal fade" id="exampleModalDelete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div className="modal-dialog" role="document">

                <div className="modal-content">

                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">Eliminar</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">×</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <p>Esta seguro desea de eliminar un regsitro?</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" className="btn btn-primary" onClick={()=>this.sendNetworkDelete()}>Eliminar</button>
                  </div>
                </div>
              </div>
            </div>


            <form>
              <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">Formulario del contacto</h5>
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                      </button>
                    </div>
                    <div className="modal-body">
                      <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Nombre </label>
                      <input type="text" className="form-control" value={this.state.formNombre} onChange={this.handleChangeNombre} />                     
                      </div>
                      <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Apellido </label>
                      <input className="form-control" value={this.state.formApellido} onChange={this.handleChangeApellido}/>
                      </div>
                      <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Correo electrónico</label>
                      <input type="email" className="form-control" value={this.state.formCorreo} onChange={this.handleChangeCorreo} />
                      </div>
                      <div className="form-group">
                      <label htmlFor="exampleInputEmail1">No. Telefónico</label>
                      <input type="text" className="form-control" value={this.state.formNo_telefono} onChange={this.handleChangeNo_telefono} />
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>

                      {
                        this.state.edit?
                        <button type="button" className="btn btn-primary" onClick={()=>this.sendNetworkUpdate()}>Actualizar</button>
                        :
                        <button type="button" className="btn btn-primary" onClick={()=>this.sendNetworkContacto()}>Guardar</button>
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
      this.setState({ idContacto:data.id });
      $("#exampleModalDelete").modal("show");
    }

    showModalEdit(data){      
      this.setState({
        idContacto:data.id,
        formNombre:data.nombre,
        formApellido: data.apellido,
        formCorreo:data.correo,
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
        formCorreo:"",
        formNo_telefono:"",
        edit:false
      });
      $("#exampleModal").modal("show");
    }

    sendNetworkContacto()
    {
      const formData = new FormData()
      formData.append('nombre',this.state.formNombre)
      formData.append('apellido',this.state.formApellido)
      formData.append('correo',this.state.formCorreo)
      formData.append('no_telefono',this.state.formNo_telefono)

      axios.post(baseUrl+'api/contacto/create',formData).then(response=>{

           if (response.data.success==true) {             
             this.loadDataContacto();
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
        console.log("se produccion el sig. error ",error);//  alert("Error "+error);
       })

    }

    sendNetworkDelete(){

      const formData = new FormData()
      formData.append('id',this.state.idContacto);

      axios.post(baseUrl+'api/contacto/delete',formData).then(response=>{

           if (response.data.success==true) {             
             this.loadDataContacto();
             $("#exampleModalDelete").modal("hide");
           }

       }).catch(error=>{
        console.log("se produccion el sig. error ",error);//  alert("Error "+error);
       })

    }

    sendNetworkUpdate(){

      const formData = new FormData()
      formData.append('id',this.state.idContacto)
      formData.append('nombre',this.state.formNombre)
      formData.append('apellido',this.state.formApellido)
      formData.append('correo',this.state.formCorreo)
      formData.append('no_telefono',this.state.formNo_telefono)

      axios.post(baseUrl+'api/contacto/update',formData).then(response=>{

           if (response.data.success==true) {             
             this.loadDataContacto();
             $("#exampleModal").modal("hide");
           }

       }).catch(error=>{
        console.log("se produccion el sig. error ",error);//  alert("Error "+error);
       })

    }

    listData(){

      return this.state.contacto.map((data)=>{

        return(
          <tr key={data.id}>
            <td>{data.nombre}</td>
            <td>{data.apellido}</td>
            <td>{data.correo}</td>
            <td>{data.no_telefono}</td>
            <td>
              <div className="">
                <button className="col-sm-4 btn btn-info" onClick={()=>this.showModalEdit(data)}>Editar</button>
                
                <button className="col-sm-4 btn btn-danger" onClick={()=>this.showModalDelete(data)}>Eliminar</button>
              </div>
              
            </td>
          </tr>
        )

      })

    }
}

if (document.getElementById('contacto')) {
    ReactDOM.render(<Contacto />, document.getElementById('contacto'));
}
