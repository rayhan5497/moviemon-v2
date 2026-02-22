const AppError = require('../../shared/errors/AppError');
const { hashPassword } = require('../../shared/utils/hash');
const {
  uploadAvatar,
  deleteAvatar,
  deleteAvatarsByPrefix,
  cleanupAvatarsByPrefix,
} = require('../../shared/utils/cloudinary');
const userRepository = require('./user.repository');

function parseState(value, fieldName) {
  if (typeof value === 'boolean') return value;
  if (value === 'true') return true;
  if (value === 'false') return false;
  throw new AppError(`Invalid ${fieldName} state`, 400);
}

function parseMovieId(movieId) {
  const id = Number(movieId);
  if (!Number.isFinite(id)) {
    throw new AppError('Invalid movieId', 400);
  }
  return id;
}


async function updateProfile(userId, data, file) {
  const updates = {};

  if (data.name) {
    updates.name = data.name;
  }

  if (data.email) {
    const existing = await userRepository.findByEmail(data.email);
    if (existing && existing.id !== userId) {
      throw new AppError('Email already in use', 409);
    }
    updates.email = data.email;
  }

  if (data.password) {
    updates.passwordHash = await hashPassword(data.password);
  }

  if (file) {
    try {
      const avatarBasePublicId = `moviemon/avatars/avatar_${userId}`;
      await deleteAvatarsByPrefix([
        `${avatarBasePublicId}_`,
        avatarBasePublicId,
      ]);
      await deleteAvatar(avatarBasePublicId);
      const result = await uploadAvatar(file.buffer, {
        public_id: `avatar_${userId}`,
        overwrite: true,
        invalidate: true,
      });
      updates.avatar = result.secure_url || result.url;
      try {
        await cleanupAvatarsByPrefix(avatarBasePublicId, result.public_id);
      } catch (cleanupError) {
        console.warn('Avatar cleanup failed', cleanupError);
      }
    } catch (err) {
      throw new AppError('Avatar upload failed', 500);
    }
  }

  if (Object.keys(updates).length === 0) {
    throw new AppError('No data to update', 400);
  }

  const user = await userRepository.updateUser(userId, updates);

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  };
}

async function getSavedMovies(userId) {
  const user = await userRepository.findById(userId, 'savedMovies saved');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const saved = user.saved || {};
  return {
    movies: saved.movies || [],
    tv: saved.tv || [],
  };
}

async function getWatchLaterMovies(userId) {
  const user = await userRepository.findById(
    userId,
    'watchLaterMovies watchLater'
  );
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const watchLater = user.watchLater || {};

  return {
    movies: watchLater.movies || [],
    tv: watchLater.tv || [],
  };
}

async function setSavedMovie(userId, movieId, data) {
  const state = parseState(data?.saved, 'saved');
  const id = parseMovieId(movieId);
  const mediaType = data?.mediaType === 'tv' ? 'tv' : 'movies';
  const field = `saved.${mediaType}`;
  const user = await userRepository.updateUserMovieList(
    userId,
    field,
    id,
    state
  );
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const saved = user.saved || {};
  return {
    movies: saved.movies || [],
    tv: saved.tv || [],
  };
}

async function setWatchLaterMovie(userId, movieId, data) {
  const state = parseState(data?.watchLater, 'watchLater');
  const id = parseMovieId(movieId);
  const mediaType = data?.mediaType === 'tv' ? 'tv' : 'movies';
  const field = `watchLater.${mediaType}`;
  const user = await userRepository.updateUserMovieList(
    userId,
    field,
    id,
    state
  );
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const watchLater = user.watchLater || {};

  return {
    movies: watchLater.movies || [],
    tv: watchLater.tv || [],
  };
}

async function getWatchHistory(userId) {
  const user = await userRepository.findById(userId, 'watchHistory');
  if (!user) {
    throw new AppError('User not found', 404);
  }
  const history = Array.isArray(user.watchHistory) ? user.watchHistory : [];
  history.sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
  return history;
}

async function addWatchHistory(userId, movieId, data) {
  const id = parseMovieId(movieId);
  const user = await userRepository.findById(userId, 'watchHistory');
  if (!user) {
    throw new AppError('User not found', 404);
  }

  const entry = {
    mediaId: id,
    mediaType: data?.mediaType || '',
    timestamp: Number.isFinite(Number(data?.timestamp))
      ? Number(data?.timestamp)
      : Date.now(),
  };

  const history = Array.isArray(user.watchHistory) ? user.watchHistory : [];
  const nextHistory = history.filter((h) => h.mediaId !== id);
  nextHistory.unshift(entry);

  const MAX_HISTORY = 200;
  if (nextHistory.length > MAX_HISTORY) {
    nextHistory.length = MAX_HISTORY;
  }

  const updated = await userRepository.updateUser(userId, {
    watchHistory: nextHistory,
  });

  return updated.watchHistory || [];
}

module.exports = {
  updateProfile,
  getSavedMovies,
  getWatchLaterMovies,
  setSavedMovie,
  setWatchLaterMovie,
  getWatchHistory,
  addWatchHistory,
};
