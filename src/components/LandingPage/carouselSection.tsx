import { IMovieListLandingPage } from "../../pages/landingPage/landingPage";
import { IMovieList } from "../../services/interface";
import CarouselPanel from "./carouselPanel"


interface Props {
    movies: IMovieList[];
    cardNumber: number;
    category: keyof IMovieListLandingPage;
}

const CarouselSection = ({movies, cardNumber, category}: Props) => {
  return (
    <section>
        <div className="text-3xl font-bold ml-10 mb-6 mt-16 capitalize">{category} list</div>
        <CarouselPanel movies={movies} card_per_carousel={cardNumber}/>
    </section>
  )
}

export default CarouselSection