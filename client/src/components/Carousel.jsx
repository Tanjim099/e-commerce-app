import { Carousel } from "@material-tailwind/react";


export default function Carousels() {
    return (
        <Carousel autoplay transition={{ duration: 1 }} className="h-[400px]">
            <img
                src="https://files.myglamm.com/site-images/original/1920x527---2024-01-08T105855176.jpg"
                alt="image 1"
                className="h-full w-full object-cover"
            />
            <img
                src="https://files.myglamm.com/site-images/original/Homepage-desktop---1920-x-527-33.jpg"
                alt="image 2"
                className="h-full w-full object-cover"
            />
            <img
                src="https://files.myglamm.com/site-images/original/1920x527---2024-01-08T110114569.jpg"
                alt="image 3"
                className="h-full w-full object-cover"
            />
        </Carousel>
    );
}
