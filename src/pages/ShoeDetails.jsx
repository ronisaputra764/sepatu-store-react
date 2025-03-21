import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from 'react';

export default function ShoeDetails({ shoes }) {

    const { slug } = useParams();
    const shoe = shoes.find((shoe) => shoe.slug === slug);

    const [activeImage, setActiveImage] = useState(shoe.photo[0]);
    const [selectedSize, setSelectedSize] = useState('');

    // Simpan selectedSize ke session storage setiap kali berubah
    useEffect(() => {
        sessionStorage.setItem('selectedSize', selectedSize);
    }, [selectedSize]);

    // Ambil data dari session storage saat komponen dimuat
    useEffect(() => {
        const savedSize = sessionStorage.getItem('selectedSize');
        if (savedSize) {
            setSelectedSize(savedSize);
        }
    }, []);

    const handleSizeChange = (size) => {
        setSelectedSize(size);
    };

    function formatRupiah(amount) {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    }

    return (
        <>
            <div className="relative flex flex-col w-full max-w-[640px] min-h-screen gap-5 mx-auto bg-[#F5F5F0]">
                <div id="top-bar" className="flex justify-between items-center px-4 mt-[60px]">
                    <Link to={'/'}>
                        <img src="../assets/images/icons/back.svg" className="w-10 h-10" alt="icon" />
                    </Link>
                    <p className="font-bold text-lg leading-[27px]">Look Details</p>
                    <div className="dummy-btn w-10"></div>
                </div>
                <section id="gallery" className="flex flex-col gap-[10px]">
                    <div className="flex w-full h-[250px] shrink-0 overflow-hidden px-4">
                        <img id="main-thumbnail" src={`../assets/images/thumbnails/${activeImage}`} className="w-full h-full object-contain object-center" alt="thumbnail" />
                    </div>
                    <div className="swiper w-full overflow-hidden">

                        <Swiper spaceBetween={12} slidesPerView={'auto'} slidesOffsetAfter={16} slidesOffsetBefore={16} centerInsufficientSlides={true} className='swiper'>
                            {shoe.photo.map((itemPhoto, index) => (
                                <SwiperSlide className="swiper-slide !w-fit py-[2px]" key={index}>
                                    <label onClick={() => setActiveImage(itemPhoto)} className="thumbnail-selector flex flex-col shrink-0 w-20 h-20 rounded-[20px] p-[10px] bg-white transition-all duration-300 hover:ring-2 hover:ring-[#FFC700] has-[:checked]:ring-2 has-[:checked]:ring-[#FFC700]">
                                        <input type="radio" name="image" className="hidden" />
                                        <img src={`../assets/images/thumbnails/${itemPhoto}`} className="w-full h-full object-contain" alt="thumbnail" />
                                    </label>
                                </SwiperSlide>
                            ))}
                        </Swiper>

                    </div>
                </section>
                <section id="info" className="flex flex-col gap-[14px] px-4">
                    <div className="flex items-center justify-between">
                        <h1 id="title" className="font-bold text-2xl leading-9">{shoe.name}</h1>
                        <div className="flex flex-col items-end shrink-0">
                            <div className="flex items-center gap-1">
                                <img src="../assets/images/icons/Star 1.svg" className="w-[26px] h-[26px]" alt="star" />
                                <span className="font-semibold text-xl leading-[30px]">4.5</span>
                            </div>
                            <p className="text-sm leading-[21px] text-[#878785]">(18,485 reviews)</p>
                        </div>
                    </div>
                    <p id="desc" className="leading-[30px]">{shoe.about}</p>
                </section>
                <div id="brand" className="flex items-center gap-4 px-4">
                    <div className="w-[70px] h-[70px] rounded-[20px] bg-white overflow-hidden">
                        <img src="../assets/images/logos/nike.svg" className="w-full h-full object-contain" alt="brand logo" />
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-sm leading-[21px]">Brand</h2>
                        <div className="flex items-center gap-1">
                            <h3 className="font-bold text-lg leading-[27px]">Nike Indonesia</h3>
                            <img src="../assets/images/icons/arrow-left.svg" className="w-5 h-5" alt="icon" />
                        </div>
                    </div>
                </div>
                <form action={`/booking/${shoe.id}`} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-3 px-4">
                        <h2 className="font-bold">Choose Size</h2>
                        <div className="flex items-center flex-wrap gap-[10px]">

                            {['EU 40', 'EU 42', 'EU 45', 'EU 50', 'EU 52', 'EU 54'].map((size, index) => (
                                <label
                                    key={index}
                                    className={`relative flex justify-center min-w-[83px] w-fit rounded-2xl ring-1 ring-[#2A2A2A] p-[14px] transition-all duration-300 ${selectedSize === size ? 'bg-white ring-2 ring-[#FFC700]' : ''
                                        } hover:ring-2 hover:ring-[#FFC700]`}
                                >
                                    <input
                                        type="radio"
                                        name="size"
                                        value={size}
                                        className="absolute top-1/2 left-1/2 opacity-0"
                                        required
                                        onChange={() => handleSizeChange(size)}
                                        checked={selectedSize === size}
                                    />
                                    <span className="font-semibold">{size}</span>
                                </label>
                            ))}

                        </div>
                    </div>
                    <div id="form-bottom-nav" className="relative flex h-[100px] w-full shrink-0 mt-5">
                        <div className="fixed bottom-5 w-full max-w-[640px] z-30 px-4">
                            <div className="flex items-center justify-between rounded-full bg-[#2A2A2A] p-[10px] pl-6">
                                <div className="flex flex-col gap-[2px]">
                                    <p className="font-bold text-[20px] leading-[30px] text-white">{formatRupiah(shoe.price)}</p>
                                    <p className="text-sm leading-[21px] text-[#878785]">One pair shoes</p>
                                </div>
                                <button type="submit" className="rounded-full p-[12px_20px] bg-[#C5F277] font-bold">
                                    Buy Now
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};