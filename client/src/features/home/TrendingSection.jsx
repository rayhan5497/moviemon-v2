import { useEffect, useMemo } from 'react';

import LottiePlayer from '@/components/ui/LottiePlayer';
import fireAnimation from '@/assets/animated-icon/fire-animation.lottie';
import loadingSpinner from '@/assets/animated-icon/loading-spinner.lottie';
import { useMovies } from '@/hooks/useMovies';
import HorizontalCardCarousel from '@/components/sections/HorizontalCardCarousel';
import ShowError from '@/components/ui/ShowError';

const TrendingSection = ({ setMovies }) => {
  const queryString = `all/day`;
  const type = 'trending';

  const { data, isError, error, isLoading } = useMovies(
    queryString,
    type,
    false
  );

  const allMovies = useMemo(() => {
    return [
      ...new Map(
        (data?.pages || [])
          .flatMap((page) => page.results)
          .filter(Boolean)
          .map((m) => [m.id, m])
      ).values(),
    ];
  }, [data]);

  useEffect(() => {
    setMovies(allMovies);
  }, [allMovies]);

  const getLottiePlayer = () => {
    return <LottiePlayer lottie={fireAnimation} className="w-[1.5em]" />;
  };

  return (
    <div className="m-2 md:m4">
      <HorizontalCardCarousel
        media={allMovies}
        title={'Trending Now'}
        route={'/trending/all/day'}
        Icon={getLottiePlayer}
        className="text-accent"
      />

      {isError && (
        <ShowError type={type} code={error.code} message={error.message} />
      )}

      {isLoading && allMovies.length === 0 && (
        <div className="flex items-center justify-center gap-2 m-auto w-fit p-2 text-primary bg-accent-secondary rounded">
          <span className="text-secondary">Loading Media</span>
          <div className="invert-on-dark">
            <LottiePlayer lottie={loadingSpinner} className="w-[1.4em]" />
          </div>
        </div>
      )}
    </div>
  );
};

export default TrendingSection;
