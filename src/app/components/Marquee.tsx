import React from 'react';
import MarqueeText from 'react-marquee-text';

const Marquee = () => {
    return (
        <div>
            <MarqueeText direction="right" duration="15" >
            
                <div className=" flex items-center gap-4 ">
                    <p>Welcome to our store</p>
                    <p>Welcome to our Home</p>
                    <p>Welcome to our Pond</p>
                </div>
            </MarqueeText>
        </div>
    );
};

export default Marquee;