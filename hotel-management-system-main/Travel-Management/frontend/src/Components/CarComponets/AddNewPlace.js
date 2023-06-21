import React, {useState} from 'react'
import axios from "axios";


function AddNewPlace() {
  //set place data
  const [placeData, setPlaceData]=useState({
    name:"",
    description:"",
    days:"",
    price:"",
    activities:"",
    image:""
  });

  // handle submit
  const handleSubmit=(event)=>{
    event.preventDefault();

    axios.post('http://localhost:8000/place/add',placeData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then((response)=>{
      alert(response.data);
    }).catch((error)=>{
      console.log(error)
    });

  }

  //handle onChange other inputes 
  const handleOnChange=(event)=>{
    setPlaceData({
      ...placeData,
      [event.target.name]:event.target.value
    });
  }
  //handle Image onChange input
  const handleImageOnChange= async(event)=>{
    const file=event.target.files[0];
    setPlaceData({
      ...placeData,
      image:file
  
    })
  }


  return (
      <div>
        <div class="mb-3">
          <form onSubmit={handleSubmit}>
              <label for="name" class="form-label">Place Name</label>
              <input type="text" class="form-control" id="name" name='name' placeholder="Ella" onChange={handleOnChange}/>

              <label for="description" class="form-label">Place Description</label>
              <input type="text" class="form-control" id="name" name='description' placeholder="" onChange={handleOnChange}/>

              <label for="days" class="form-label">Days</label>
              <input type="text" class="form-control" id="name" name='days' placeholder="2 days" onChange={handleOnChange}/>

              <label for="price" class="form-label">Price </label>
              <input type="text" class="form-control" id="name" name='price' placeholder="price" onChange={handleOnChange}/>

              <label for="activities" class="form-label">Activities</label>
              <input type="text" class="form-control" id="name" name='activities' placeholder="water rafting" onChange={handleOnChange}/>

              <label for="image" class="form-label">Image</label>
              <input type="file" class="form-control" id="name" name='image' accept='.jpg, .png, .jpeg'  onChange={handleImageOnChange}/>

              <button type='submit' class="btn btn-success mt-2">Add new Place</button>
          </form>
            
        </div>
    
      </div>
    
  )
}

export default AddNewPlace






