import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import previousIcon from '../images/carHome/previous.png'


function PlaceBooking() {
  const { id } = useParams();
    let userPlace;

  //use useState hook to save fetch data
  const [places, setPlaces]=useState([]);
  //get data from backend
  useEffect(()=>{
      axios.get(`http://localhost:8000/place/find/${id}`).then((response)=>{
          setPlaces(response.data);
      }).catch((err)=>{
          console.log(err)
      })
  },[])

  //set user data
const [userData, setuserData]=useState({
 place:"",
 name:"",
 contactNumber:"",
 address:"",
 persons:"",
 
});


//handle onChange inputes 
const handleOnChange=(event)=>{

 setuserData({
   ...userData,
   [event.target.name]:event.target.value
 });
}
const handlePlaceName=(name)=>{
    setuserData({
        ...userData,
        place:name
    })
  }

// handle submit
const handleSubmit=(event)=>{
 event.preventDefault();

 console.log(userData);

 axios.post('http://localhost:8000/booking/add',userData).then((response)=>{
   alert(response.data);
 }).catch((error)=>{
   console.log(error)
 });

}
  
  return (
    <div style={styles.bodyContainer}>
    <div>
        <Link to={"/place"}><img style={{width:64, height:64,position:'relative',marginTop:"-650px", marginLeft:"-100px"}} src={previousIcon} /></Link>
    </div>
    <div style={styles.mainContainer}>
      <div style={styles.mainLeftContainer}>
        <div style={styles.cardGrid}>
                  <div key={places._id} style={styles.main}>
                      <div style={styles.upperContainer}>
                          <div style={styles.leftContainer}>

                              <img style={styles.imageContainer} src={`http://localhost:8000/${places.image}`} />


                          </div>
                          <div style={styles.rightContainer}>
                
                                  <p style={styles.placeName}>{places.name}</p>

                                  <p style={styles.description}>{places.description}</p>

                                  <p ><span style={styles.activities}>Activities:</span> {places.activities}</p>

                                  <p ><span style={styles.activities}>Days:</span> {places.days}</p>

                          </div>

                      </div>
                      <div style={styles.downContainer}>
                          <div style={styles.price}>
                              <p>LKR {places.price}</p>
                          </div>
                          <div style={styles.bookButton}>
                              <button style={styles.bookButton}><Link to={`/place/book/${places._id}`} style={styles.buttonText}>Book Now</Link></button>
                          </div>
              
                      </div>

              
                  </div>  
          </div>
      </div>
      <div style={styles.mainRightContainer}>
        <div style={styles.rightContainerTitle}>
                    <p> Booking Form</p>
                </div>

          <div>
                    <div class="mb-3 p-4">
                        <form onSubmit={handleSubmit}>
                        
                            <label for="name" class="form-label">Name</label>
                            <input type="text" class="form-control" id="name" name='name' placeholder="Kasun" onChange={handleOnChange}/>

                            <label for="contactNumber" class="form-label">Contact Number</label>
                            <input type="text" class="form-control" name='contactNumber' placeholder="+94 XXX XXX" onChange={handleOnChange}/>

                            <label for="address" class="form-label">Address</label>
                            <input type="text" class="form-control" name='address' placeholder="Colombo" onChange={handleOnChange}/>

                            <label for="persons" class="form-label">For how many Persons?</label>
                            <input type="text" class="form-control" name='persons' placeholder="" onChange={handleOnChange}/>

                            

                            <button type='submit' class="btn btn-success mt-3" onClick={()=>handlePlaceName(places.name)}>Book Now</button>
                        </form>
                    </div>
          </div>

      </div>
      
    </div>
      

    </div>
    
  
  )
}
const styles={
  bodyContainer:{
    display:"flex",
    justifyContent:"center",
    alignItems:"center",
    width:"100%",
    height:"100vh"
},
mainContainer:{
    width:"80%",
    height:"80vh",
    backgroundColor:"white",
    boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
    borderRadius:"25px",
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center",
    padding:"20px"


    
},
mainLeftContainer:{
    width:"50%",
    height:"100%",
},

price:{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:"30px"
},
mainRightContainer:{
    width:"50%",
    height:"100%"
},
rightContainerTitle:{
    textAlign:"center",
    fontWeight:"bold",
    fontSize:'30px'
},


  /////////////////////////////////
  main:{
      width:"600px",
      height:"500px",
      borderRadius:"25px",
      display:"flex",
      alignItems:"center",
      justifyContent:"center",
      flexDirection:"column",
      padding:"10px",

  },
  upperContainer:{
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
      flexDirection:"row",
      width:"100%",
      height:"80%",
      
  },
  leftContainer:{
      width:"60%",
      height:'100%',
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
    

  },
  imageContainer:{
      width:"330px",
      height:"300px",
      borderRadius:"25px",
  },
  rightContainer:{
      width:"40%",
      height:'100%',
      display:"flex",
      alignItems:"center",
      justifyContent:"flex-start",
      flexDirection:"column",
    //   rowGap:"10px",
      padding:"10px",
      overflow: 'scroll',
  },
  downContainer:{
      display:"flex",
      justifyContent:"center",
      alignItems:'center',
      flexDirection:'row',
      width:'100%',
      height:"20%",
      backgroundColor:"#FAF8F1",
      columnGap:"150px",
  },
  title:{
      color:"red",
      textAlign:"center",
      fontWeight:"bold",
      marginTop:"50px"
  },
  carSpan:{
      color:'black',
      fontWeight:"bold"
  },
  cardGrid:{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      rowGap: '60px',
      alignItems: 'center',
      justifyContent: 'center',
      columnGap: '60px',
      marginBottom:"50px",
      display:"flex"
  },
  placeName:{
      fontSize:"35px",
      fontWeight:"600",
      color:"#146C94"
  },
  detailsButton:{
      border:"none",
      borderRadius:"25px",
      backgroundColor:"#0C134F",
      width:"150px",
      height:"40px",
      
  },
  buttonText:{
      color:"#FFF",
      textDecoration:"none",
    
  },
  price:{
      color:"red",
      fontSize:"40px",
      fontWeight:"700"
  },
  bookButton:{
      border:"none",
      borderRadius:"25px",
      backgroundColor:"#0C134F",
      width:"150px",
      height:"50px",
      backgroundColor:"red",
      fontSize:"20px",
      fontWeight:"500",

  },
  activities:{
    fontWeight:'bold',

  },


}
export default PlaceBooking
