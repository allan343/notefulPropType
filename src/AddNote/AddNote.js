import React from 'react';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';
import ApiContext from '../ApiContext';

class AddNote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
              value: '',
              touched: false
            },
         
       
            content: {
              value: '',
              touched: false
            }
          };
      }

      static contextType = ApiContext

      updateName(name) {
        this.setState({name: {value: name, touched: true}});
      }

      updateContent(password) {
        this.setState({content: {value: password, touched: true}});
      }
      
      validateName(fieldValue) {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }


      updateContent(name) {
        this.setState({name: {value: name, touched: true}});
      }

      validateContent(fieldValue) {
        const name = this.state.content.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }

    

    render(){
      const { folders=[] } = this.context;
     //throw "test";
        const nameError = this.validateName();
        const contentError = this.validateContent();
        return(
<form className="folder" onSubmit = {(event)=>{
event.preventDefault();
fetch(`http://localhost:9090/notes`,{headers:{'content-type': 'application/json'},method:"POST",body:JSON.stringify({name:event.target.name.value, content:event.target.content.value, folderId:event.target.folderId.value})}) .then(response => response.json())
.then(responseJson => console.log(responseJson)).then(responseJson => {this.setState({
  error: null
       });
      }
    ).catch(err => {
      
      this.setState({
        error: err.message
      });
    });;
    
}}> 
<h2>Register</h2>
       <div className="folder__hint">* required field</div>  
       <div className="form-group">
         <label htmlFor="name">Name *</label>
         <input type="text" className="folder__control"
           name="name" id="name" onChange={e => this.updateName(e.target.value)} />
             {this.state.name.touched && (
  <ValidationError message={nameError} />
)}
        </div>
        <div className="form-group">
          <label htmlFor="content">Content *</label>
          <input type="content" className="content__control"
           name="content" id="content"  onChange={e => this.updateContent(e.target.value)}/>
         {this.state.content.touched && (
  <ValidationError message={contentError} />
)}
<select name="folderId">
  
  
  {
    
    folders.map((folder)=>{
     return <option key={folder.name} value={folder.id}>{folder.name}</option>
    })
    /*
  <option value="grapefruit">Grapefruit</option>
  <option value="lime">Lime</option>
  <option value="coconut">Coconut</option>
  <option value="mango">Mango</option>*/}
</select>

          <div className="registration__hint"></div>
       </div>


        <div className="folder__button__group">
        <button type="reset" className="folder__button">
            Cancel
        </button>
        <button type="submit" className="folder__button">
            Save
        </button>
       </div>
</form>

)
    }
}

AddNote.propTypes = {
  key: PropTypes.string,
  path: PropTypes.string

}

export default AddNote;