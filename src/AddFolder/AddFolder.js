import React from 'react';
import ValidationError from '../ValidationError';
import PropTypes from 'prop-types';

class AddFolder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: {
              value: '',
              touched: false
            }
          };
      }

      updateName(name) {
        this.setState({name: {value: name, touched: true}});
      }

      validateName(fieldValue) {
        const name = this.state.name.value.trim();
        if (name.length === 0) {
          return 'Name is required';
        } else if (name.length < 3) {
          return 'Name must be at least 3 characters long';
        }
      }

    

    render(){

      AddFolder.propTypes = {
        key: PropTypes.string,
        path: PropTypes.string
  
      }
     //throw "test";
        const nameError = this.validateName();
        return(
<form className="folder" onSubmit = {(event)=>{
event.preventDefault();
console.log(event.target.name.value);
fetch(`http://localhost:9090/folders`,{headers:{'content-type': 'application/json'},method:"POST",body:JSON.stringify({name:event.target.name.value})}) .then(response => response.json())
.then(responseJson => console.log(responseJson));
    


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

AddFolder.propTypes = {
  key: PropTypes.string,
  path: PropTypes.string

}


export default AddFolder;