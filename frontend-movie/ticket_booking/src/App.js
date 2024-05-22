import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Navbar from './components/Navbar/Navbar';
import Home from './components/pages/Home';
import Register from './components/auth/AdminRegister';
import Login from './components/auth/adminLogin';
import ListMovie from './components/Admin/ListMovie';
import AddMovies from './components/Admin/AddMovies';
import EditMovies from './components/Admin/EditMovies';
import ViewMovie from './components/user/ViewMovie';
import BookTicket from './components/user/BookTicket';
import BookingHistory from './components/user/BookingHistory';
import TicketConfirm from './components/user/TicketConfirm';




function App() {
  return (
    <div>
      <Router>
        {/* <Navbar/> */}
        
        <Routes>
        <Route path='/' element={<Home/>} />,
        <Route path='/register' element={<Register/>} />,
        <Route path='/login' element={<Login/>} />,
        <Route path='/listmovies' element={<ListMovie/>} />,
        <Route path='/addmovies' element={<AddMovies/>} />,
        <Route path='/movies/posts/:postId/edit' element={<EditMovies />} />,
        <Route path='/movies/posts/:postId/view' element={<ViewMovie/>} />,
        <Route path='/bookticket/:price/:title/:postId' element={<BookTicket/>} />,
        <Route path='/bookinghistory' element={<BookingHistory/>} />,
        <Route path='/confirm/:book_id' element={<TicketConfirm/>} />,
        </Routes>
      </Router>
    </div>
  );
}

export default App;
