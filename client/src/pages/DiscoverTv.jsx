import { useSearchParams } from 'react-router-dom';
import { useEffect, useContext } from 'react';

import LottiePlayer from '../components/ui/LottiePlayer';
import loadingSpinner from '@/assets/animated-icon/loading-spinner.lottie';

import MovieCard from '../components/cards/MovieCard';
import FilterMovies from '../components/filters/discover/FilterMovies';
import { useMovies } from '../hooks/useMovies';
import MainScrollContext from '../context/MainScrollContext';
import ShowError from '@/components/ui/ShowError';

const Tv = () => {
  const [searchParams] = useSearchParams();
  const queryString = searchParams.toString();
  const type = 'discover/tv';

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    error,
    isLoading,
  } = useMovies(queryString, type);

  // flatten all pages into one array
  const allTv = [
    ...new Map(
      (data?.pages || [])
        .flatMap((page) => page.results)
        .filter(Boolean)
        .map((m) => [m.id, m])
    ).values(),
  ];

  const mainRef = useContext(MainScrollContext);

  // infinite scroll listener
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

    const tryFill = () => {
      if (container.scrollHeight <= container.clientHeight) {
        if (hasNextPage && !isFetchingNextPage) fetchNextPage();
      }
    };

    tryFill(); // check immediately
    const interval = setInterval(tryFill, 200); // keep trying until scrollable

    return () => {
      container.removeEventListener('scroll', checkScroll);
      clearInterval(interval);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isError)
    return <ShowError type={type} code={error.code} message={error.message} />;

  return (
    <>
      <FilterMovies />
      <div className="movies">
        <div
          className="movie-wrapper movies-grid grid gap-1 lg:gap-2 m-2 xl:m-4
          grid-cols-[repeat(auto-fit,minmax(110px,auto))] sm:grid-cols-[repeat(auto-fit,minmax(120px,auto))]
          md:grid-cols-[repeat(auto-fit,minmax(130px,auto))] lg:grid-cols-[repeat(auto-fit,minmax(150px,auto))]
          xl:grid-cols-[repeat(auto-fit,minmax(170px,auto))] md:mt-0"
        >
          {allTv.map((media) => (
            <MovieCard key={media.id} media={media} />
          ))}
        </div>

        {!isLoading && !hasNextPage && (
          <div className="flex items-center justify-center gap-2 m-auto w-fit p-2 text-primary bg-accent-secondary rounded">
            <span className="text-secondary">No More Shows</span>
            <div className="w-5 h-5 invert-on-dark">🎬</div>
          </div>
        )}

        {isLoading && allTv.length === 0 && (
          <div className="flex items-center justify-center gap-2 m-auto w-fit p-2 text-primary bg-accent-secondary rounded">
            <span className="text-secondary">Loading Tv Shows</span>
            <div className="invert-on-dark">
              <LottiePlayer lottie={loadingSpinner} className="w-[1.4em]" />
            </div>
          </div>
        )}
        {isFetchingNextPage && allTv.length > 0 && (
          <div className="flex items-center justify-center gap-2 m-auto w-fit p-2 text-primary bg-accent-secondary rounded">
            <span className="text-secondary">Loading More Shows</span>
            <div className="invert-on-dark">
              <LottiePlayer lottie={loadingSpinner} className="w-[1.4em]" />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Tv;
