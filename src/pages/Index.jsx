// import { shoes } from '../data';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

export default function Index({ shoes, categories }) {

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
                    <img src={'../assets/images/logos/logo.svg'} className="flex shrink-0" alt="logo" />
                    <a href="#">
                        <img src={'../assets/images/icons/notification.svg'} className="w-10 h-10" alt="icon" />
                    </a>
                </div>
                <form className="flex justify-between items-center mx-4">
                    <div className="relative flex items-center w-full rounded-l-full px-[14px] gap-[10px] bg-white transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FFC700]">
                        <img src={'../assets/images/icons/search-normal.svg'} className="w-6 h-6" alt="icon" />
                        <input
                            type="text"
                            className="w-full py-[14px] appearance-none bg-white outline-none font-semibold placeholder:font-normal placeholder:text-[#878785]"
                            placeholder="Search product..."
                        />
                    </div>
                    <button type="submit" className="h-full rounded-r-full py-[14px] px-5 bg-[#C5F277]">
                        <span className="font-semibold">Explore</span>
                    </button>
                </form>
                <section id="category" className="flex flex-col gap-4 px-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold leading-[20px]">Our Featured <br />Categories</h2>
                        <a href="#" className="rounded-full p-[6px_14px] border border-[#2A2A2A] text-xs leading-[18px]">
                            View All
                        </a>
                    </div>
                    <div className="grid grid-cols-2 gap-4">

                        {categories.map((category) => (
                            <Link to={`/category/${category.slug}`} key={category.id}>
                                <div className="flex items-center justify-between w-full rounded-2xl overflow-hidden bg-white transition-all duration-300 hover:ring-2 hover:ring-[#FFC700]">
                                    <div className="flex flex-col gap-[2px] px-[14px]">
                                        <h3 className="font-bold text-sm leading-[21px]">{category.name}</h3>
                                        <p className="text-xs leading-[18px] text-[#878785]">223 Shoes</p>
                                    </div>
                                    <div className="flex shrink-0 w-20 h-[90px] overflow-hidden">
                                        <img src={`../assets/images/thumbnails/${category.icon}`} className="w-full h-full object-cover object-left" alt="thumbnail" />
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </section>
                <section id="featured" className="flex flex-col gap-4">
                    <div className="flex items-center justify-between px-4">
                        <h2 className="font-bold leading-[20px]">Explore Our <br />Featured</h2>
                        <a href="#" className="rounded-full p-[6px_14px] border border-[#2A2A2A] text-xs leading-[18px]">
                            View All
                        </a>
                    </div>
                    <div className="swiper w-full overflow-hidden" >
                        <Swiper className="swiper-wrapper" spaceBetween={16} slidesPerView={'auto'} slidesOffsetAfter={16} slidesOffsetBefore={16}>

                            {shoes.map((shoe) => (
                                <SwiperSlide className="swiper-slide !w-fit py-[2px]" key={shoe.id}>
                                    <Link to={`/details/${shoe.slug}`}>
                                        <div className="flex flex-col shrink-0 w-[230px] h-full rounded-3xl gap-[14px] p-[10px] pb-4 bg-white transition-all duration-300 hover:ring-2 hover:ring-[#FFC700]">
                                            <div className="w-[210px] h-[230px] rounded-3xl bg-[#D9D9D9] overflow-hidden">
                                                <img src={`../assets/images/thumbnails/${shoe.thumbnail}`} className="w-full h-full object-cover" alt="thumbnail" />
                                            </div>
                                            <div className="flex flex-col gap-[14px] justify-between">
                                                <div className="flex items-center justify-between gap-4">
                                                    <h3 className="font-bold leading-[20px]">{shoe.name}</h3>
                                                    <p className="font-bold text-sm leading-[21px] text-nowrap">{formatRupiah(shoe.price)}</p>
                                                </div>
                                                <div className="flex items-center justify-between gap-2">
                                                    <div className="flex items-center gap-1">
                                                        <img src={'../assets/images/icons/Star 1.svg'} className="w-[22px] h-[22px]" alt="star" />
                                                        <p className="font-semibold text-sm leading-[21px]">4.5</p>
                                                    </div>
                                                    <p className="text-sm leading-[21px] text-[#878785]">(18,485 reviews)</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide >
                            ))}

                        </Swiper>
                    </div>
                </section>
                <section id="fresh" className="flex flex-col gap-4 px-4">
                    <div className="flex items-center justify-between">
                        <h2 className="font-bold leading-[20px]">Fresh From <br />Great Designers</h2>
                        <a href="#" className="rounded-full p-[6px_14px] border border-[#2A2A2A] text-xs leading-[18px]">
                            View All
                        </a>
                    </div>
                    <div className="flex flex-col gap-4">

                        {shoes.map((shoe, index) => (
                            <Link to={`/details/${shoe.slug}`} key={index}>
                                <div className="flex items-center rounded-3xl p-[10px_16px_16px_10px] gap-[14px] bg-white transition-all duration-300 hover:ring-2 hover:ring-[#FFC700]">
                                    <div className="w-20 h-20 flex shrink-0 rounded-2xl bg-[#D9D9D9] overflow-hidden">
                                        <img src={`../assets/images/thumbnails/${shoe.photo[0]}`} className="w-full h-full object-cover" alt="thumbnail" />
                                    </div>
                                    <div className="flex w-full items-center justify-between gap-[14px]">
                                        <div className="flex flex-col gap-[6px]">
                                            <h3 className="font-bold leading-[20px]">{shoe.name}</h3>
                                            <p className="text-sm leading-[21px] text-[#878785]">Sandal</p>
                                        </div>
                                        <div className="flex flex-col gap-1 items-end shrink-0">
                                            <div className="flex">
                                                <img src={'../assets/images/icons/Star 1.svg'} className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                <img src={'../assets/images/icons/Star 1.svg'} className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                <img src={'../assets/images/icons/Star 1.svg'} className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                <img src={'../assets/images/icons/Star 1.svg'} className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                                <img src={'../assets/images/icons/Star 1.svg'} className="w-[18px] h-[18px] flex shrink-0" alt="star" />
                                            </div>
                                            <p className="font-semibold text-sm leading-[21px]">4.5</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}

                    </div>
                </section>
                <div id="bottom-nav" className="relative flex h-[100px] w-full shrink-0">
                    <nav className="fixed bottom-5 w-full max-w-[640px] px-4 z-30">
                        <div className="grid grid-flow-col auto-cols-auto items-center justify-between rounded-full bg-[#2A2A2A] p-2 px-[30px]">
                            <Link to={'/'} className="active flex shrink-0 -mx-[22px]">
                                <div className="flex items-center rounded-full gap-[10px] p-[12px_16px] bg-[#C5F277]">
                                    <img src={'../assets/images/icons/3dcube.svg'} className="w-6 h-6" alt="icon" />
                                    <span className="font-bold text-sm leading-[21px]">Browse</span>
                                </div>
                            </Link>
                            <Link to={'/check-booking'} className="mx-auto w-full">
                                <img src={'../assets/images/icons/bag-2-white.svg'} className="w-6 h-6" alt="icon" />
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

        </>
    );
}