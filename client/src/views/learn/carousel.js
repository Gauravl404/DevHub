import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import './carouselstyle.css';

const CCarousel = () => (
    
    <Carousel className='divcarousel'>
        <div> 
            <img alt="" src="https://impressivewebs.s3.amazonaws.com/2019-08/react-course.jpg" />
            <a href="https://www.youtube.com/watch?v=DLX62G4lc44"><p className="legend">#React.js</p></a>
        </div>
        <div> 
            <img alt="" src="https://www.bitdegree.org/learn/storage/media/images/203b0fb7-ae46-4ba7-a69e-8cc445b89db2.o.jpg" />
            <a href="https://www.youtube.com/watch?v=QXPWs00RD3A"><p className="legend">#HTML</p></a>
        </div>
        <div> 
            <img alt="" src="https://res.cloudinary.com/practicaldev/image/fetch/s--Tu2z9cvG--/c_limit%2Cf_auto%2Cfl_progressive%2Cq_auto%2Cw_880/https://miro.medium.com/max/696/1%2A6UpwEDOw04H5fKyaMGXpSw.png" />
            <a href="https://www.youtube.com/watch?v=vLnPwxZdW4Y"><p className="legend">#C++</p></a>
        </div>
        <div> 
            <img alt="" src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/20200807232652/How-to-Learn-Python-in-21-Days.jpg" />
            <a href="https://www.youtube.com/watch?v=rfscVS0vtbw"><p className="legend">#Python</p></a>
        </div>
        <div> 
            <img alt="" src="https://miro.medium.com/max/750/0*KFu4aHUCJjbKI5iw.jpg" />
            <a href="https://www.youtube.com/watch?v=Oe421EPjeBE"><p className="legend">#Node.js</p></a>
        </div>
        <div> 
            <img alt="" src="https://www.freecodecamp.org/news/content/images/2019/10/css.png" />
            <a href="https://www.youtube.com/watch?v=1PnVor36_40"><p className="legend">#CSS</p></a>
        </div>
        <div> 
            <img alt="" src="https://i.ytimg.com/vi/PkZNo7MFNFg/maxresdefault.jpg" />
            <a href="https://www.youtube.com/watch?v=PkZNo7MFNFg"><p className="legend">#Javascript</p></a>
        </div>
    </Carousel>
);

export default CCarousel;
