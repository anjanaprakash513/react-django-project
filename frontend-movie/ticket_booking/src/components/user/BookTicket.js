import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import checkAuth from "../auth/checkAuth";
import Navbar from "../Navbar/Navbar";

function BookTicket() {
    
    const { price, title,postId } = useParams(); 
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [seat, setSeat] = useState('');
    const [quantity, setQuantity] = useState('');
    const [total_price, setTotalPrice] = useState(0);


    const [minDate, setMinDate] = useState(""); // State to hold minimum selectable date
    const [maxDate, setMaxDate] = useState(""); // State to hold maximum selectable date
    const [time_11_30, setTime11_30] = useState('00:00');
    const [time_2_30, setTime2_30] = useState('00:00');
    const [time_5, setTime5] = useState('00:00');
    const [time_9, setTime9] = useState('00:00');


    const navigate = useNavigate();

    const user = useSelector((store) => store.auth.user);
    const token = user?.token || "";
    const userId = user ? user.userId : null;
    const email = user ? user.email : null;
    console.log(userId)

    // Calculate total price whenever quantity or price changes
    useEffect(() => {
        if (quantity && price) {
            const total = quantity * price;
            setTotalPrice(total);
        }
    }, [quantity, price]);
//new useeffect
    useEffect(() => {
        const today = new Date();
        const nextSevenDays = new Date(today);
        nextSevenDays.setDate(today.getDate() + 7); // Get the date 7 days from today
        setMinDate(today.toISOString().split('T')[0]);
        setMaxDate(nextSevenDays.toISOString().split('T')[0]);


    
        axios.get('http://127.0.0.1:8000/admin/viewonemovie/'+postId, {
          headers: { Authorization: `Bearer ${token}` }
          }).then(response => {
            const fetchedMovie = response.data;
            setTime11_30(fetchedMovie.time_11_30);
            setTime2_30(fetchedMovie.time_2_30);
            setTime5(fetchedMovie.time_5);
            setTime9(fetchedMovie.time_9);
    
          }).catch(error => {
              console.error('Error fetching movie details:', error);
          });
      }, [postId, token]);
//datechange
      const DateChange = (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);
      };
//timechange
        const TimeChange = (event) => {
            const time = event.target.value;
            setTime(time);
        };

     
    function addTicket() {
        axios.post('http://127.0.0.1:8000/user/bookticket', {
            user: userId,
            title: title,
            date: date,
            time: time,
            seat: seat,
            price: price,
            quantity: quantity,
            total_price:total_price

        }, {
            headers: { Authorization: "Bearer " + token }
        })
        .then(response => { 
            const book_id = response.data.id
            // console.log(book_id)
            initiatePayment(book_id); // Assuming the response contains book_id
            // navigate('/payment');
          
        })
        .catch(error => {
            console.error('Error adding post:', error);
        });
    }


    

    const initiatePayment = (book_id) => {
        // Send request to backend to generate order
        axios
          .post("http://127.0.0.1:8000/user/generate_order", {
            amount: total_price, // Amount in paisa (e.g., ₹10.00)
            order_id: userId, // Pass the user  ID as the order ID
          })
          .then((response) => {
            // Extract order ID from response
            const orderId = response.data.order_id;
           
      
            // Initialize Razorpay payment
            const options = {
              key: "rzp_test_cAHU0nyqJ4tMOB",
              amount: total_price, // Amount in paisa
              currency: "INR",
              order_id: orderId,
              name: "Your Company Name",
              description: "Payment for Movie Ticket",
              handler: function (response) {
                // Handle successful payment
                console.log("Payment successful:", response);
                sendEmail(); // Call sendEmail function here
              
                navigate(`/confirm/${book_id}`);
              },
              prefill: {
                name: "John Doe",
                email: "john@example.com",
                contact: "9999999999",
              },
            };
            const rzp = new window.Razorpay(options);
            rzp.open();
          })
          .catch((error) => {
            console.error("Error initiating payment:", error);
            // Handle error
          });
      };
    
    //   Define sendEmail function outside initiatePayment function
      function sendEmail() {
        const emailData = {
            recipient_email: email,
    
            subject: 'Movie Ticket Confirmation',
            message: 'Thank you for choosing to experience this cinematic journey with us. Your ticket(s) are now confirmed, and we look forward to welcoming you to the theater.Enjoy the show....!!'
        };
    
        axios.post('http://127.0.0.1:8000/user/send_email', emailData)
            .then(response => {
                console.log('Email sent successfully');
            })
            .catch(error => {
                console.error('Failed to send email:', error);
           });
      }





    return (
        <div>
            <Navbar/>
            <div className="container">
                <div className="row">
                    {/* <div className="col-md-4">
                    <img style={{maxHeight:"500px"}} src={poster_url} alt={title} className="img-fluid rounded" />
                </div> */}

                    <div className="col-md-8">
                        <h1 className="text-center">Ticket Booking</h1>
                        <div className="form-group">
                            <label>title:</label>
                            <input type="text" className="form-control" value={title} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Date:</label>
                            <input type="date" className="form-control" value={date} onChange={DateChange} min={minDate}
                             max={maxDate}/>
                        </div>
                        {/* time */}
                        <div className="form-group">
                                <label>Show Time:</label>
                                <select
                                    className="form-control"
                                    value={time}
                                    onChange={TimeChange}
                                >
                                    <option value="">Select a time</option>
                                    {time_11_30 !== "00:00" && <option value={time_11_30}>{time_11_30}</option>}
                                    {time_2_30 !== "00:00" && <option value={time_2_30}>{time_2_30}</option>}
                                    {time_5 !== "00:00" && <option value={time_5}>{time_5}</option>}
                                    {time_9 !== "00:00" && <option value={time_9}>{time_9}</option>}
                                </select>

                        </div>


                        <div className="form-group">
                            <label>Seat:</label>
                            <select className="form-control" value={seat} onChange={(event) => setSeat(event.target.value)}>
                                <option value="">Select a seat</option>
                                {['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1', 'C2', 'C3', 'C4'].map(seatOption => (
                                    <option key={seatOption}>{seatOption}</option>
                                ))}
                            </select>
                        </div> 

                        <div className="form-group">
                            <label>quantity:</label>
                            <input type="text" className="form-control" value={quantity} onChange={(event) => setQuantity(event.target.value)} />
                        </div>
                        <div className="form-group">
                            <label>price:</label>
                            <input type="text" className="form-control" value={price} readOnly />
                        </div>
                        <div className="form-group">
                            <label>total price:</label>
                            <input type="text" className="form-control" value={total_price} readOnly />
                        </div>
                        <div className="form-group">
                            <button className="btn btn-primary float-right" onClick={addTicket}>Submit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default checkAuth(BookTicket);
