import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import checkAuth from "../auth/checkAuth";
import { useSelector } from "react-redux";
import Navbar from "../Navbar/Navbar";

import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import QRCode from "react-qr-code";



function BookingHistory() {
  const { postId } = useParams();
  const [bookingHistory, setBookingHistory] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const user = useSelector((store) => store.auth.user);
  const token = user?.token; // Get token from Redux store
  const userId = user ? user.userId : null;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/user/bookinghistory/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        console.log("API Response:", response.data);
        setBookingHistory(response.data);
        setDataFetched(true);
      })
      .catch((error) => {
        console.error("Error fetching booking history:", error);
      });
  }, [userId]);


  const downloadPdf = (containerId) => {
    const ticketDetails = document.getElementById(containerId);
    if (!ticketDetails) {
      console.error("Ticket details not found.");
      return;
    }
  
    html2canvas(ticketDetails)
      .then(canvas => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF();
        pdf.addImage(imgData, "PNG", 0, 0);
  
        // Include QR code in PDF
        const qrCanvas = document.querySelector("canvas"); // Assuming QR code canvas is the first canvas element
        if (qrCanvas) {
          const qrImgData = qrCanvas.toDataURL("image/png");
          pdf.addPage();
          pdf.addImage(qrImgData, "PNG", 10, 10, 50, 50); // Adjust position and size as needed
        }
  
        pdf.save("ticket.pdf");
      })
      .catch(error => {
        console.error("Error generating PDF:", error);
      });
  };
  

  

  return (
    <div>
      <Navbar/>
      <div className="container">
        <div className="row">
          <div className="col-8 offset-2">
            <h1 className="text-center">Booking History</h1>
            {dataFetched ? (
              bookingHistory.map((booking) => (
                <div key={booking.booking_id} className="card mb-3">
                  
                  <div className="card-body" id={`ticket-container-${booking.booking_id}`}>
                    <h4>{booking.title}</h4>
                    <p>Booking Id: {booking.booking_id}</p>
                    <p>Date: {booking.date}</p>
                    <p>Time: {booking.time}</p>
                    <p>seat: {booking.seat}</p>
                    <p>No. of seats: {booking.quantity}</p>
                    <p>Total Price: {booking.total_price}</p>
                  
                    <QRCode value={JSON.stringify(booking)} />
                  </div>
                  <button onClick={() => downloadPdf(`ticket-container-${booking.booking_id}`)}>Download Ticket</button>
                </div>
              ))
            ) : (
              <p>Loading booking history...</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default checkAuth(BookingHistory);