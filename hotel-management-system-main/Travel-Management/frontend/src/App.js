
import React from 'react';
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import CarAdminDashboard from './pages/CarAdminDashboard';
import PlaceHome from './pages/PlaceHome';
import PlaceBooking from './pages/PlaceBooking';


function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' exact Component={PlaceHome} />
        <Route path='/admin' exact Component={CarAdminDashboard} />
        <Route path='/place/details/:id' exact Component={PlaceBooking} />
        <Route path='/place/book/:id' exact Component={PlaceBooking} />
      </Routes>
    </Router>

 
  );
}

export default App;
