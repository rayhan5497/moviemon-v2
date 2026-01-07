import { GoHome, GoHomeFill } from 'react-icons/go';
import { RiMovie2AiLine, RiMovie2AiFill } from 'react-icons/ri';
import { BiTv, BiSolidTv } from 'react-icons/bi';
import { RiFolderCloudLine, RiFolderCloudFill } from 'react-icons/ri';

import { useMatch } from 'react-router-dom';

import NavSection from './NavSection';
import ThemeToggle from '@/components/ui/ThemeToggle';
import { useIsMd } from '@/hooks/useIsMd';
import { AvatarComponent, GithubButton, ShareButton } from '@/components/ui/MUI';
import { color } from 'framer-motion';

const Sidebar = ({ isSidebarOpen }) => {
  const isHomeActive = useMatch('/');
  const isMovieActive = useMatch('discover/movie');
  const isTvActive = useMatch('discover/tv');

  const isMd = useIsMd();

  return (
    <aside
      className={`sidebar fixed md:static transition duration-300 text-white z-49 bg-gray-800 top-0 left-0 pb-5 px-5 min-[450px]:w-60 w-[70%] min-[350px]:w-[50%] h-full pt-24 md:pt-5 overflow-auto
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} `}
    >
      {!isMd && (
        <div className="flex items-center flex-col gap-4 mb-8">
          <AvatarComponent
            style={{
              width: '100px',
              height: '100px',
              border: '1px solid gray',
            }}
          />
          <div className="flex flex-wrap items-center gap-2">
            <ThemeToggle />
            <ShareButton
              style={{
                background: 'gray',
                width: '1.2em',
                height: '1.2em',
                cursor: 'pointer',
                transition: 'background 0.1s',
                color: 'white',
                '&:hover': { background: 'white', color: 'black' },
              }}
            />
            <GithubButton
              style={{
                background: 'gray',
                width: '1.2em',
                height: '1.2em',
                cursor: 'pointer',
                transition: 'background 0.1s',
                color: 'white',
                '&:hover': { background: 'white', color: 'black' },
              }}
            />
          </div>
        </div>
      )}
      <NavSection
        icon={GoHome}
        iconFill={GoHomeFill}
        isSectionActive={isHomeActive}
        title={{ label: 'Home', path: '/' }}
        items={[]}
      />
      <NavSection
        icon={RiMovie2AiLine}
        iconFill={RiMovie2AiFill}
        title={{ label: 'Movies', path: '/discover/movie' }}
        isSectionActive={isMovieActive}
        items={[
          {
            label: 'English',
            path: '/discover/movie?with_original_language=en',
          },
          { label: 'Hindi', path: '/discover/movie?with_original_language=hi' },
          {
            label: 'Bangla',
            path: '/discover/movie?with_original_language=bn',
          },
        ]}
      />
      <NavSection
        icon={BiTv}
        iconFill={BiSolidTv}
        title={{ label: 'TV Series', path: '/discover/tv' }}
        isSectionActive={isTvActive}
        items={[
          { label: 'English', path: '/discover/tv?with_original_language=en' },
          { label: 'Hindi', path: '/discover/tv?with_original_language=hi' },
          { label: 'Bangla', path: '/discover/tv?with_original_language=bn' },
        ]}
      />
    </aside>
  );
};

export default Sidebar;
