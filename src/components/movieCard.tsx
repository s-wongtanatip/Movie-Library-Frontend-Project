
const baseUrl = "http://image.tmdb.org/t/p/";
const posterSize = "w780"; // [ "w92", "w154", "w185", "w342", "w500", "w780", "original" ]

type Props = {
  title: string;
  poster_path: string;
  card_per_carousel: number;
};

const MovieCard = ({ title, poster_path, card_per_carousel }: Props) => {

  const movie_card_width = window.innerWidth / (card_per_carousel + 1);

  return (
    <div>
        <a href="#">
          <img
            src={`${baseUrl}${posterSize}${poster_path}`}
            alt={title}
            style={{ maxWidth: `${movie_card_width}px` }}
          />
        </a>
    </div>
  );
};

export default MovieCard;
