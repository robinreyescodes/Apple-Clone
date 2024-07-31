import gsap from 'gsap';
import {useGSAP} from "@gsap/react";
import {heroVideo, smallHeroVideo} from "../../utils/index.js";
import {useEffect, useState} from "react";

export default function Hero() {
    // use state and check how big the width of the window is, conditionally set video
    const [videoSrc, setVideoSrc] = useState(window.innerWidth < 760 ? smallHeroVideo : heroVideo)

    function handleSetVideoSrc() {
        if (window.innerWidth < 760) {
            setVideoSrc(smallHeroVideo)
        } else {
            setVideoSrc(heroVideo);
        }
    }
    // these are called hooks! this is a new one I haven't seen before
    useEffect(() => {
        window.addEventListener('resize', handleSetVideoSrc)
        // clean up by removing the event listener
        return () => { window.removeEventListener('resize', handleSetVideoSrc)}
    }, [])

    //first time using gsap, this thing is cool!
    useGSAP(() => {
        gsap.to(".hero-title", {opacity: 1, delay: 2, duration: 2})
        gsap.to("#cta", {opacity: 1, delay: 2, y: -50})
    }, [])
    return (
    // tailwind makes it so easy... kind of hard to remember but it okay
    <section className="w-full nav-height bg-black relative">
        <div className="h-5/6 w-full flex-center flex-col">
            <p className="hero-title">iPhone 15 Pro</p>
            <div className="md:w-10/12 w-9/12">
                <video className="pointer-events-none" autoPlay muted playsInline={true} key={videoSrc}>
                    <source src={videoSrc} type="video/mp4"/>
                </video>
            </div>
        </div>

        <div id="cta" className="flex flex-col items-center opacity-0 translate-y-20">
            <a href="#highlights" className="btn">Buy</a>
            <p className="font-normal text-xl">From $199/month or $999</p>
        </div>
    </section>
    )
}