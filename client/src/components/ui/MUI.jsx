import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import Tooltip from '@mui/material/Tooltip';
import { Share2 } from 'lucide-react';
import { Github } from 'lucide-react';

import { useSnackbar } from '../../context/SnackbarProvider';

const AvatarComponent = ({ style }) => {
  return (
    <Tooltip title="Profile">
      <IconButton>
        <Avatar src="/profile.jpg" sx={style} />
      </IconButton>
    </Tooltip>
  );
};

const ShareButton = ({ style }) => {
  const { showSnackbar } = useSnackbar();

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      await navigator.share({ url });
    } else {
      await navigator.clipboard.writeText(url);
      showSnackbar('Link copied!');
    }
  };

  return (
    <>
      <Tooltip title="Share">
        <IconButton onClick={handleShare} aria-label="share" sx={style}>
          <Share2 size={20} />
        </IconButton>
      </Tooltip>
    </>
  );
};

const GithubButton = ({ style }) => {
  const handleGithub = () => {
    const githubUrl = 'https://github.com/rayhan5497/Moviemon---watch-movies';
    window.open(githubUrl, '_blank');
  };

  return (
    <>
      <Tooltip title="View on GitHub">
        <IconButton onClick={handleGithub} aria-label="github" sx={style}>
          <Github size={20} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export { AvatarComponent, ShareButton, GithubButton };
