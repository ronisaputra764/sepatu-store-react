import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


export default function OrderFinished({ shoes }) {

    const { id } = useParams();
    const shoe = shoes.find((shoe) => shoe.id === id);

    const [booking, setBooking] = useState(null);

    useEffect(() => {
        const bookingData = sessionStorage.getItem('bookingData');
        if (bookingData) {
            const parsedData = JSON.parse(bookingData); // Konversi string JSON ke objek
            setBooking(parsedData);
        }
    }, []);

    return (
        <div className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
            <div className="flex flex-col items-center justify-center px-4 gap-[30px] my-auto">
                <div className="w-[330px] h-[196px] flex overflow-hidden">
                    <img src={`../assets/images/thumbnails/${shoe.photo[0]}`} className="w-full h-full object-contain" alt="thumbnail" />
                </div>
                <div className="flex flex-col w-full max-w-[340px] rounded-[20px] p-[20px_16px_30px_16px] gap-[30px] bg-white">
                    <div className="flex flex-col text-center gap-[10px]">
                        <h1 className="font-bold text-xl leading-[30px]">New Shoes Coming!</h1>
                        <p className="leading-[30px]">Kami akan memeriksa pesanan anda silahkan cek order secara berkala</p>
                    </div>
                    <div className="flex items-center justify-between rounded-2xl border-2 border-[#FFC700] border-dashed p-[12px_16px]">
                        <div className="flex items-center gap-[10px]">
                            <img src="../assets/images/icons/delivery.svg" className="w-8 h-8 flex shrink-0" alt="icon" />
                            <p>Booking ID <span className="font-bold">{booking?.transactionCode}</span></p>
                        </div>
                        <img src="../assets/images/icons/verify.svg" className="w-6 h-6" alt="icon" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Link to={"/"} className="rounded-full p-[12px_20px] text-center w-full bg-[#C5F277] font-bold">Order More</Link>
                        <Link to={`/booking-details/${id}`} className="rounded-full p-[12px_20px] text-center w-full bg-[#090917] font-bold text-white">View Booking</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}