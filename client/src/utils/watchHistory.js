export const saveWatchProgress = (showId, seasonNum, episodeNum, seasonId, episodeId) => {
  try {
    const watchHistory = JSON.parse(
      localStorage.getItem('watchHistory') || '{}'
    );
    watchHistory[showId] = {
      season: seasonNum,
      episode: episodeNum,
      seasonId: seasonId,
      episodeId: episodeId,
      timestamp: Date.now(),
    };
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  } catch (error) {
    console.error('Error saving watch progress:', error);
  }
};

export const getWatchProgress = (showId) => {
  try {
    const watchHistory = JSON.parse(
      localStorage.getItem('watchHistory') || '{}'
    );
    return watchHistory[showId] || null;
  } catch (error) {
    console.error('Error getting watch progress:', error);
    return null;
  }
};

export const clearWatchProgress = (showId) => {
  try {
    const watchHistory = JSON.parse(
      localStorage.getItem('watchHistory') || '{}'
    );
    delete watchHistory[showId];
    localStorage.setItem('watchHistory', JSON.stringify(watchHistory));
  } catch (error) {
    console.error('Error clearing watch progress:', error);
  }
};
