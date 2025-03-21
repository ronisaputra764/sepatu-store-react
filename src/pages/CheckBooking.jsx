
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CheckBooking() {

    const navigate = useNavigate();

    const [booking, setBooking] = useState(null);
    const [phone, setPhone] = useState("");
    const [transactionCode, setTransactionCode] = useState("");

    useEffect(() => {
        const bookingData = sessionStorage.getItem('bookingData');
        if (bookingData) {
            const parsedData = JSON.parse(bookingData);
            setBooking(parsedData);
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (phone === booking.phone && transactionCode === booking.transactionCode) {

            navigate(`/booking-details/${booking.shoeId}`);
        }

    };

    return (
        <div className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
            <div className="flex flex-col items-center justify-center px-4 gap-[30px] my-auto">
                <form onSubmit={handleSubmit} className="flex flex-col w-full max-w-[330px] rounded-[30px] p-5 gap-6 bg-white">
                    <img src={"../assets/images/icons/3d-cube-search.svg"} className="w-[90px] h-[90px] mx-auto" alt="icon" />
                    <h1 className="font-bold text-2xl leading-9 text-center">Check My Order</h1>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="booking-id" className="font-semibold leading-[21px]">Booking ID</label>
                        <div className="flex items-center w-full rounded-full px-[14px] gap-[10px] overflow-hidden bg-[#F8F8F9] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src={"../assets/images/icons/delivery.svg"} className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input onChange={(e) => setTransactionCode(e.target.value)} type="text" name="booking-id" id="booking-id" className="appearance-none outline-none bg-[#F8F8F9] w-full font-semibold leading-[21px] placeholder:font-normal py-[14px]" placeholder="What’s your booking ID" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="font-semibold leading-[21px]">Phone Number</label>
                        <div className="flex items-center w-full rounded-full px-[14px] gap-[10px] overflow-hidden bg-[#F8F8F9] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src={"../assets/images/icons/call.svg"} className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input type="tel" onChange={(e) => setPhone(e.target.value)} name="phone" id="phone" className="appearance-none outline-none bg-[#F8F8F9] w-full font-semibold leading-[21px] placeholder:font-normal py-[14px]" placeholder="What’s your number" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-3">
                        <button type="submit" className="rounded-full p-[12px_20px] text-center w-full bg-[#C5F277] font-bold">Find Booking</button>
                    </div>
                </form>
                <div id="bottom-nav" className="relative flex h-[100px] w-full shrink-0">
                    <nav className="fixed bottom-5 w-full max-w-[640px] px-4 z-30">
                        <div className="grid grid-flow-col auto-cols-auto items-center justify-between rounded-full bg-[#2A2A2A] p-2 px-[30px]">
                            <Link to={'/'} className="mx-auto w-full">
                                <img src={"../assets/images/icons/3dcube-white.svg"} className="w-6 h-6" alt="icon" />
                            </Link>
                            <Link to={'/check-booking'} className="active flex shrink-0 -mx-[22px]">
                                <div className="flex items-center rounded-full gap-[10px] p-[12px_16px] bg-[#C5F277]">
                                    <img src={'../assets/images/icons/bag-2.svg'} className="w-6 h-6" alt="icon" />
                                    <span className="font-bold text-sm leading-[21px]">My Order</span>
                                </div>
                            </Link>
                            <a href="#" className="mx-auto w-full">
                                <img src={'../assets/images/icons/star-white.svg'} className="w-6 h-6" alt="icon" />
                            </a>
                            <a href="#" className="mx-auto w-full">
                                <img src={'../assets/images/icons/24-support-white.svg'} className="w-6 h-6" alt="icon" />
                            </a>
                        </div>
                    </nav>
                </div>
            </div>
        </div >
    );
}