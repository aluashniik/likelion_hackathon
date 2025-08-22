import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import ad_img7 from '../../assets/ad_img7.jpg'
import './SlideBanner.css'
import ad_img1 from '../../assets/ad_img6.jpg'
import ad_img2 from '../../assets/ad_img2.jpg'
import ad_img3 from '../../assets/ad_img3.jpg'
import ad_img4 from '../../assets/ad_img4.jpg'
import ad_img5 from '../../assets/ad_img5.png'


export default function SliderBanner() {
      
const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    fade: true,
    swipe: true,
    arrows: false,
    dragable:true
};
      
return (
    <Slider {...settings} className='banner'>
        <div className='banner-img'>
            <img src={ad_img7} alt="" />
        </div>
        <div className='banner-img'>
            <img src={ad_img1} alt="" />
        </div>
        <div className='banner-img'>
            <img src={ad_img2} alt="" />
        </div>
        <div className='banner-img'>
            <img src={ad_img3} alt="" />
        </div>
        <div className='banner-img'>
            <img src={ad_img4} alt="" />
        </div>
        <div className='banner-img'>
            <img src={ad_img5} alt="" />
        </div>
    </Slider>
    );
}