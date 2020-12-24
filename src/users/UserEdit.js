import React from 'react'
import apiurl from '../api/apiurl'
import {  Link  } from 'react-router-dom';


class UserEdit extends React.Component{
   
  state ={ 

     username : '',
    first_name : '',
    last_name : '',
    profile_pic: null,
    has_sales_access : false,
    has_sales_access_null: true,
    has_marketing_access : false,
    has_marketing_access_null : true,
    is_active : true
  //  user : ''
}
 

  
  
  componentDidMount(){
    const id = this.props.match.params.id
            apiurl.get(`/users/${id}/`)
            .then((posRes) => {
              this.setState({ 
                first_name : posRes.data.data.user_obj.first_name,
                last_name : posRes.data.data.user_obj.last_name,
                username : posRes.data.data.user_obj.username,
                profile_pic : posRes.data.data.user_obj.profile_pic,
                has_marketing_access : posRes.data.data.user_obj.has_marketing_access,
                has_sales_access : posRes.data.data.user_obj.has_sales_access,
                is_active: posRes.data.data.user_obj.is_active
                 //user :  posRes.data.data.user_obj
              })
                console.log(posRes.data.data.user_obj.has_marketing_access)
                console.log(this.state.has_marketing_access)     
                       
            }).catch(errRes=> {
                         console.log(errRes)
                         });
                        }

     onHandleChange = e => {
      
       console.log({[e.target.name] : e.target.value })
        this.setState({ ...this.state, [e.target.name] : e.target.value });
      };

     onSubmit = e => {
      const id = this.props.match.params.id
       e.preventDefault()
        apiurl.put(`/users/${id}/`,this.state)
      this.props.history.push('/user')
        
        }

     

        
    render() {
    //   if(!this.state.user){
    //     return <div>Loading</div>
    // }
           
        return(
          <div className= "container mt-5 py-5">
          <div class="card">
          <div class="card-header text-center">
           <b><i>EDIT USER</i></b> 
          </div>
          <div class="card-body">

          <form onSubmit={this.onSubmit}>
            {/* <h1 className="text-center bg-light">Edit User</h1> */}
      <div className="form-row">
      <div className="col-md-4">
        <label><b>First Name</b></label>
        <input type="text" name="first_name" value={this.state.first_name} onChange={this.onHandleChange} className="form-control" required />
      </div>
      <div className="col-md-4">
        <label><b>Last Name</b></label>
        <input type="text" name="last_name" value={this.state.last_name}  onChange={this.onHandleChange}  className="form-control" />
      </div>
        <div className="form-group col-md-4">
          <label><b>User Name</b></label>
          <input type="text" name="username" value={this.state.username}  onChange={this.onHandleChange} className="form-control" required />
  
        </div>
    
    </div>
    <div className="form-row">
    <div class="form-group col-md-4">
      <label><b>Upload Profile Picture</b></label>
      <input type="file" name="profile_pic" value={this.state.profile_pic}  onChange={this.onHandleChange} className="form-control" />
    </div>
    <div class="form-group col-md-4">
    <label><b>Marketing Access</b></label>
    <select  name="has_marketing_access" onChange={this.onHandleChange}  class="form-control" required >
    <option >.....</option>
        <option value={false} >false</option>
        <option  value={true} > true </option>
      </select>
    </div>
    <div class="form-group col-md-4">
    <label><b>Sales Access</b></label>
    <select name="has_sales_access" onChange={this.onHandleChange} class="form-control" required >
    <option  >.....</option>
    <option value={false}> false </option>
    <option  value={true}>true </option>

        
      </select>
    </div>
    
    </div>

    <label><b>Status</b></label>
    <select  name="this.state.user.is_active" onChange={this.onHandleChange}  class="form-control" required >
    <option >.....</option>
     <option value={false} >false</option>
       
      </select>
    <div class="text-center">
  <button type="submit" class="btn btn-success">Save</button>
  <Link to='/user' class="btn btn-light">Cancel</Link>
  </div>
    </form>
          </div>
        </div>

          </div>
         
        )
    }

}
export default UserEdit;



