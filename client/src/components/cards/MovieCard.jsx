import { useState } from 'react';
import LinkWithScrollSave from '../ui/LinkWithScrollSave';

import '../../index.css';
import { useIsMd } from '../../hooks/useIsMd';

const MovieCard = ({ media }) => {
  const isMd = useIsMd();

  const getPath = () => {
    if (media?.title) {
      return `/player/movie/${media?.id}`;
    } else {
      return `/player/tv/${media?.id}`;
    }
  };

  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <LinkWithScrollSave
      to={getPath()}
      data-id={media?.id}
      className="group card md:snap-start bg-primary relative cursor-pointer rounded-lg sm:p-1 hover:scale-105 transition-all duration-200 shadow-md shadow-accent w-full flex flex-col mb-1"
    >
      <div className="poster-container relative">
        <div className="poster bg-secondary content-center text-center aspect-[2/3] w-full rounded">
          {media?.poster_path ? (
            <>
              <img
                className={`w-full h-full object-cover rounded ${
                  !imgLoaded ? 'invisible' : 'visible'
                }`}
                src={`https://image.tmdb.org/t/p/${isMd ? 'w342' : 'w185'}${
                  media?.poster_path
                }`}
                alt={media?.title}
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgLoaded(true)}
              />

              {!imgLoaded && (
                <>
                  <div className="absolute inset-0 bg-secondary rounded-lg overflow-hidden">
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `linear-gradient(
              135deg,
              rgba(255,255,255,0) 0%,
              rgba(126,126,126,0.20) 50%,
              rgba(255,255,255,0) 100%
            )`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '300% 300%', // big enough to move smoothly
                        animation: `shimmer 1s infinite linear`,
                        animationDelay: `${Math.random() * 0.5}s`,
                      }}
                    ></div>
                  </div>
                </>
              )}
            </>
          ) : (
            <span className="text-secondary">No Poster!</span>
          )}
        </div>

        <p className="yea rounded m-0 absolute text-sm sm:text-[1rem] top-1 left-1 px-[0.3rem] bg-accent text-primary font-semibold">
          {(media?.release_date ?? media?.first_air_date)?.slice(0, 4) || 'N/A'}
        </p>
        <p className="rating text-orange-300 text-[1.2rem] font-bold bg-[#0000007a] px-[0.3rem] py-[0rem] rounded absolute right-1 bottom-1">
          {media?.vote_average ? media?.vote_average.toFixed(1) : 'N/A'}
        </p>

        <button className="play-btn cursor-pointer bg-[#0000007a] hover:scale-110 opacity-0 scale-125 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 p-[0.5rem] rounded-full font-semibold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="white"
            viewBox="0 0 24 24"
            className="w-10 h-10"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>

      <h2 className="name text-primary text-sm/[1em] sm:text-[1rem] p-[0.3em] m-0 font-medium truncate">
        {media.name || media.title || 'N/A'}
      </h2>
    </LinkWithScrollSave>
  );
};

export default MovieCard;
