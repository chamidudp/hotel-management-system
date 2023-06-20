import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



function PlaceHome() {
        //use useState hook to save fetch data
        const [places, setPlaces]=useState([]);

        //get data from backend
        useEffect(()=>{
            axios.get("http://localhost:8000/place").then((response)=>{
                setPlaces(response.data);
            }).catch((err)=>{
                console.log(err)
            })
        },[])
    
    
  return (
    <div>
    {/* nav bar */}
        <div>
            <nav  style={{boxShadow: '0 0 10px 2px rgba(0, 0, 0, 0.25)',}} class="navbar navbar-expand-lg  ">
                <div class="container-fluid">
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                       
                        <li class="nav-item">
                            <a class="nav-link" href="">Places</a>
                        </li>
                    </ul>
                    </div>
                </div>
            </nav>
        </div>



        

        <h1 style={styles.title}>Travel  <span style={styles.carSpan}>Management</span></h1>
        <div style={styles.mainBodyContainer}>
        <div style={styles.cardGrid}>
            {places.map((place,index) => (
                <div key={place._id} style={styles.main}>
                    <div style={styles.upperContainer}>
                        <div style={styles.leftContainer}>

                            <img style={styles.imageContainer} src={`http://localhost:8000/${place.image}`} />


                        </div>
                        <div style={styles.rightContainer}>
               
                                <p style={styles.placeName}>{place.name}</p>

                                <button style={styles.detailsButton}><Link to={`/place/details/${place._id}`} style={styles.buttonText}>VIEW DETAILS</Link></button>

                                <p style={styles.description}>{place.description}</p>

                        </div>

                    </div>
                     <div style={styles.downContainer}>
                        <div style={styles.price}>
                            <p>LKR {place.price}</p>
                        </div>
                         <div style={styles.bookButton}>
                            <button style={styles.bookButton}><Link to={`/place/book/${place._id}`} style={styles.buttonText}>Book Now</Link></button>
                         </div>
            
                    </div>

          
            
                </div>
                
            ))}    
        </div>

        </div>
        

        </div>
   
  )
}
const styles={
    mainBodyContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center"
    },
    cardGrid:{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        rowGap: '60px',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: '120px',
        marginBottom:"50px",
    },
    main:{
        width:"600px",
        height:"500px",
        backgroundColor:"white",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        borderRadius:"25px",
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"column",
        padding:"10px",
        marginTop:"50px"
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
        alignItems:'center'

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
        rowGap:"10px",
        padding:"10px"
    },
    downContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:'center',
        flexDirection:'row',
        width:'100%',
        height:"20%",
        backgroundColor:"#FAF8F1",
        columnGap:"150px"
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

    }


}
export default PlaceHome
