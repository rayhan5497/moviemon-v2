import { useParams, useSearchParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import LottiePlayer from '../components/ui/LottiePlayer';
import loadingSpinner from '@/assets/animated-icon/loading-spinner.lottie';

import MovieCard from '../components/cards/MovieCard';
import FilterMovies from '../components/filters/movie/FilterMovies';
import { useMovies } from '../hooks/useMovies';
import MainScrollContext from '../context/MainScrollContext';
import ShowError from '@/components/ui/ShowError';

const Popular = () => {
  const [searchParams] = useSearchParams();

  const { sort } = useParams();
  const queryString = `${sort}&${searchParams.toString()}`;
  const type = 'movie';

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useMovies(queryString, type);

  const allMovies = [
    ...new Map(
      (data?.pages || [])
        .flatMap((page) => page.results)
        .filter(Boolean)
        .map((m) => [m.id, m])
    ).values(),
  ];

  const mainRef = useContext(MainScrollContext);

  // 1. Attach infinite scroll listener
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const checkScroll = () => {
      if (
        container.scrollTop + container.clientHeight >=
        container.scrollHeight - 500
      ) {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }
    };

    container.addEventListener('scroll', checkScroll);
    return () => container.removeEventListener('scroll', checkScroll);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, mainRef]);

  // 2. Auto-load until container becomes scrollable
  useEffect(() => {
    const container = mainRef.current;
    if (!container) return;

    const tryFill = () => {
      if (container.scrollHeight <= container.clientHeight) {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }
    };

    tryFill();
    const interval = setInterval(tryFill, 200);
    return () => clearInterval(interval);
  }, [hasNextPage, isFetchingNextPage, fetchNextPage, mainRef]);

  if (isError)
    return <ShowError type={type} code={error.code} message={error.message} />;

  return (
    <>
      <FilterMovies />
      <div className="movies">
        <div
          className="movie-wrapper movies-grid grid gap-1 lg:gap-2 m-2 xl:m-4
          grid-cols-[repeat(auto-fill,minmax(110px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(120px,1fr))]
          md:grid-cols-[repeat(auto-fill,minmax(130px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(150px,1fr))]
          xl:grid-cols-[repeat(auto-fill,minmax(170px,1fr))] md:mt-0"
        >
          {allMovies.map((media) => (
            <MovieCard key={media.id} media={media} />
          ))}
        </div>
        {!isLoading && !hasNextPage && (
          <div className="flex items-center justify-center gap-2 m-auto w-fit p-2 text-primary bg-accent-secondary rounded">
            <span className="text-secondary">No More Movies</span>
            <div className="w-5 h-5 invert-on-dark">🎬</div>
          </div>
        )}

        {isLoading && allMovies.length === 0 && (
          <div className="flex items-center justify-center gap-2 m-auto w-fit p-2 text-primary bg-accent-secondary rounded">
            <span className="text-secondary">Loading Movies</span>
            <div className="invert-on-dark">
              <LottiePlayer lottie={loadingSpinner} className="w-[1.4em]" />
            </div>
          </div>
        )}
        {isFetchingNextPage && allMovies.length > 0 && (
          <div className="flex items-center justify-center gap-2 m-auto w-fit p-2 text-primary bg-accent-secondary rounded">
            <span className="text-secondary">Loading More Movies</span>
            <div className="invert-on-dark">
              <LottiePlayer lottie={loadingSpinner} className="w-[1.4em]" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Popular;
