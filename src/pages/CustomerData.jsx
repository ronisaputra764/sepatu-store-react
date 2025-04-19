import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function CustomerData({ shoes }) {

    const navigate = useNavigate();

    const { id } = useParams();
    const shoe = shoes.find((shoe) => shoe.id === id);

    const [booking, setBooking] = useState(null);

    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [city, setCity] = useState("");
    const [postCode, setPostCode] = useState("");

    useEffect(() => {
        const bookingData = sessionStorage.getItem('bookingData');
        if (bookingData) {
            const parsedData = JSON.parse(bookingData); // Konversi string JSON ke objek
            setBooking(parsedData);

        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const bookingData = {
            shoeName: booking.shoeName,
            shoeId: booking.shoeId,
            shoeSize: booking?.shoeSize,
            name: booking?.name,
            email: booking?.email,
            quantity: booking?.quantity,
            promoCode: booking?.promoCode,
            totalPrice: booking?.totalPrice,
            address,
            phone,
            city,
            postCode,
        };

        sessionStorage.setItem('bookingData', JSON.stringify(bookingData));

        navigate(`/payment/${id}`);
    };

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    return (
        <div className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
            <div id="top-bar" className="flex justify-between items-center px-4 mt-[60px]">
                <Link to={`/booking/${id}`}>
                    <img src="../assets/images/icons/back.svg" className="w-10 h-10" alt="icon" />
                </Link>
                <p className="font-bold text-lg leading-[27px]">Delivery</p>
                <div className="dummy-btn w-10"></div>
            </div>
            <div className="flex items-center rounded-3xl gap-[14px] p-[10px_16px_16px_10px] bg-white mx-4">
                <div className="flex shrink-0 w-20 h-20 rounded-2xl p-1 bg-[#D9D9D9] overflow-hidden">
                    <img src={`../assets/images/thumbnails/${shoe.photo[0]}`} className="w-full h-full object-contain"
                        alt="" />
                </div>
                <div className="flex flex-col w-full">
                    <h1 id="title" className="font-bold text-lg leading-6">Green Style Lite <br />Flying Pro Kit</h1>
                    <p className="font-semibold text-sm leading-[21px]">{booking?.shoeSize} • {booking?.quantity} Pcs</p>
                </div>
                <div className="flex items-center shrink-0 gap-1">
                    <img src="../assets/images/icons/Star 1.svg" className="w-[22px] h-[22px]" alt="star" />
                    <span className="font-semibold text-sm leading-[21px]">4.5</span>
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col rounded-[20px] p-4 mx-4 pb-5 gap-5 bg-white">
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col">
                            <h1 id="title" className="font-bold text-[22px] leading-9[30px]">Shipping Address</h1>
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex flex-col gap-2">
                        <label htmlFor="address" className="font-semibold">Full Address</label>
                        <div
                            className="flex items-start w-full rounded-[18px] ring-1 ring-[#090917] p-[14px] gap-[10px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src="../assets/images/icons/house-2.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                            <textarea name="address" id="address" rows="6" onChange={(e) => setAddress(e.target.value)}
                                className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#878785]"
                                placeholder="Type your full address" required></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="phone" className="font-semibold">Phone Number</label>
                        <div
                            className="flex items-center w-full rounded-full ring-1 ring-[#090917] px-[14px] gap-[10px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src="../assets/images/icons/call.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input type="tel" name="phone" id="phone" onChange={(e) => setPhone(e.target.value)}
                                className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#878785] py-[14px]"
                                placeholder="What’s your phone number" required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="city" className="font-semibold">City</label>
                        <div
                            className="flex items-center w-full rounded-full ring-1 ring-[#090917] px-[14px] gap-[10px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src="../assets/images/icons/global.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input type="text" name="city" id="city" onChange={(e) => setCity(e.target.value)}
                                className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#878785] py-[14px]"
                                placeholder="Type your city" required />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="post" className="font-semibold">Post Code</label>
                        <div
                            className="flex items-center w-full rounded-full ring-1 ring-[#090917] px-[14px] gap-[10px] overflow-hidden transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                            <img src="../assets/images/icons/location.svg" className="w-6 h-6 flex shrink-0" alt="icon" />
                            <input type="text" name="post" id="post" onChange={(e) => setPostCode(e.target.value)}
                                className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-[#878785] py-[14px]"
                                placeholder="Type your post code" required />
                        </div>
                    </div>
                    <hr className="border-[#EAEAED]" />
                    <div className="flex items-center gap-[10px]">
                        <img src="../assets/images/icons/shield-tick.svg" className="w-8 h-8 flex shrink-0" alt="icon" />
                        <p className="leading-[26px]">Kami melindungi data privasi anda dengan baik.</p>
                    </div>
                </div>
                <div id="bottom-nav" className="relative flex h-[100px] w-full shrink-0 mt-5">
                    <div className="fixed bottom-5 w-full max-w-[640px] z-30 px-4">
                        <div className="flex items-center justify-between rounded-full bg-[#2A2A2A] p-[10px] pl-6">
                            <div className="flex flex-col gap-[2px]">
                                <p id="grand-total" className="font-bold text-[20px] leading-[30px] text-white">{formatRupiah(booking?.totalPrice)}
                                </p>
                                <p className="text-sm leading-[21px] text-[#878785]">Grand total</p>
                            </div>
                            <button type="submit" className="rounded-full p-[12px_20px] bg-[#C5F277] font-bold">
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};