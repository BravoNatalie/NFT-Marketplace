import React, { useEffect,useState,useRef } from 'react';
import BtnSlider from './BtnSlider'
import dataSlider from './dataSlider'
import './Slider.css'
import video_welcome from "../../assets/Welcome.mp4";

const RotationChart = () => {

    const [slideIndex, setSlideIndex] = useState(1)

    const nextSlide = () => {
        if(slideIndex !== dataSlider.length){
            setSlideIndex(slideIndex + 1)
        }
        else if (slideIndex === dataSlider.length){
            setSlideIndex(1)
        }
    }

    const prevSlide = () => {
        if(slideIndex !== 1){
            setSlideIndex(slideIndex - 1)
        }
        else if (slideIndex === 1){
            setSlideIndex(dataSlider.length)
        }
    }

    const moveDot = index => {
        setSlideIndex(index)
    }
    useEffect(() => {
        const lastIndex = dataSlider.length;
        if (slideIndex < 0) {
            setSlideIndex(lastIndex);
        }
        if (slideIndex > lastIndex) {
            setSlideIndex(1);
        }
    }, [slideIndex,dataSlider]);
    useEffect(() => {
        let slider = setInterval(() => {
            setSlideIndex(slideIndex + 1);
        }, 5000);
        return () => {
            clearInterval(slider);
        };
    }, [slideIndex]);

    return (
        <div className="container-slider">
            {dataSlider.map((obj, index) => {
                return (
                    <div
                        key={obj.id}
                        className={slideIndex === index + 1 ? "slide active-anim" : "slide"}
                    >
                        {/*<img*/}
                        {/*    src={process.env.PUBLIC_URL + `/Imgs/img${index + 1}.jpeg`}*/}
                        {/*/>*/}
                        <video class="video" src={process.env.PUBLIC_URL + `/Video/video${index + 1}.mp4`} autoPlay loop muted></video>
                    </div>
                )

            })}
            <BtnSlider moveSlide={nextSlide} direction={"next"} />
            <BtnSlider moveSlide={prevSlide} direction={"prev"}/>

            <div className="container-dots">
                {Array.from({length: 5}).map((item, index) => (
                    <div
                        onClick={() => moveDot(index + 1)}
                        className={slideIndex === index + 1 ? "dot active" : "dot"}
                    ></div>
                ))}
            </div>
        </div>
    )
};

export default RotationChart;