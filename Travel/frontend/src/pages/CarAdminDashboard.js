import React, { useEffect, useState } from 'react';

import AllPlaces from '../Components/CarComponets/AllPlaces';
import AddNewPlace from '../Components/CarComponets/AddNewPlace';
import UpdatePlace from '../Components/CarComponets/UpdatePlace';
import DeletePlace from '../Components/CarComponets/DeletePlace';
import PlaceBookings from '../Components/CarComponets/PlaceBookings';


function CarAdminDashboard() {
    const [component, setComponent]=useState(null);
    //handle onclick 
    const handleOnClick=(comp)=>{
        setComponent(comp)
  
    }

  return (
    <div style={styles.mainConatiner}>
      <div style={styles.container}>
        <div style={styles.leftContainer}>
       
            <div style={styles.buttonContainer}>
                <p style={styles.adminTitle}>Place Booking Admin </p>
                <button style={styles.button} name='home' onClick={()=>handleOnClick("AllPlaces")}>All Places</button>
                <button style={styles.button} name='add' onClick={()=>handleOnClick("AddNewPlace")}>Add</button>
                <button style={styles.button} name='update' onClick={()=>handleOnClick("UpdatePlace")}>Update</button>
                <button style={styles.button} name='delete' onClick={()=>handleOnClick("DeletePlace")}>Delete</button>
                <button style={styles.button} name='Bookings' onClick={()=>handleOnClick("PlaceBookings")}>Bookings</button>
            </div>
            

        </div>
        <div style={styles.rightContainer}>
         
           

            {component==="AllPlaces" && <AllPlaces/>}
            {component==="AddNewPlace" && <AddNewPlace/>}
            {component==="UpdatePlace" && <UpdatePlace/>}
            {component==="DeletePlace" && <DeletePlace/>}
            {component==="PlaceBookings" && <PlaceBookings/>}

        
        </div>

      </div>
    </div>
  )
}

const styles={
    mainConatiner:{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:"100%",
        height:"100vh"
    },
    container:{
        width:"90%",
        height:"90vh",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:"25px",
    },
    leftContainer:{
        width:"20%",
        height:"100%",
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:"column",
        borderRadius:"25px 0px 0px 25px",
        backgroundColor:"#98D8AA",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
 
       
    },
    buttonContainer:{
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"column",
        width:"100%",
        height:"50%",
        rowGap:"20px",
    },
    adminTitle:{
        fontSize:"20px",
        fontWeight:"bold",
        textAlign:"center",
        marginBottom:"-10px"
    },
    rightContainer:{
        width:"80%",
        height:"100%",
        backgroundColor:"#AFD3E2",
        borderRadius:"0px 25px 25px 0",
        backgroundColor:"white",
        boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.25)",
        padding:"50px",
        overflow: 'scroll',


    },
    button:{
        borderRadius:"25px",
        border:"0px",
        width:"100px",
        height:"35px"
    },
}

export default CarAdminDashboard
