import React from 'react'
import Carousel from 'better-react-carousel'

const Gallery = () => {
    return (
        <Carousel cols={2} rows={1} gap={10} autoplay={3000} loop={true}>
            <Carousel.Item>
                <a href="http://localhost:5173/countries/Greece">
                    <img
                        width="100%"
                        height="50%"
                        src="https://images.pexels.com/photos/1010657/pexels-photo-1010657.jpeg"
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item>
                <a href="http://localhost:5173/countries/Denmark">
                    <img
                        width="100%"
                        height="50%"
                        src="https://images.pexels.com/photos/415722/pexels-photo-415722.jpeg"
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item>
                <a href="http://localhost:5173/countries/Indonesia">
                    <img
                        width="100%"
                        height="50%"
                        src="https://images.pexels.com/photos/2315271/pexels-photo-2315271.jpeg"
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item>
                <a href="http://localhost:5173/countries/Germany">
                    <img
                        width="100%"
                        height="50%"
                        src="https://images.pexels.com/photos/2106452/pexels-photo-2106452.jpeg"
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item>
                <a href="http://localhost:5173/countries/Spain">
                    <img
                        width="100%"
                        height="50%"
                        src="https://images.pexels.com/photos/1386444/pexels-photo-1386444.jpeg"
                    />
                </a>
            </Carousel.Item>
            <Carousel.Item>
                <a href="http://localhost:5173/countries/Ireland">
                    <img
                        width="100%"
                        height="50%"
                        src="https://images.pexels.com/photos/631401/pexels-photo-631401.jpeg"
                    />
                </a>
            </Carousel.Item>
        </Carousel>
    )
}

export default Gallery
