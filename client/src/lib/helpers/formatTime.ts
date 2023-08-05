const formatTime = (time: Date): string => {
  const currentTime = new Date();
  const timeDiffInSeconds = Math.floor((currentTime.getTime() - time.getTime()) / 1000);

  if (timeDiffInSeconds >= 24 * 60 * 60) {
    const days = Math.floor(timeDiffInSeconds / (24 * 60 * 60));
    return `${days} days ago`;
  }
  if (timeDiffInSeconds >= 60 * 60) {
    const hours = Math.floor(timeDiffInSeconds / (60 * 60));
    return `${hours} hours ago`;
  }
  if (timeDiffInSeconds >= 60) {
    const minutes = Math.floor(timeDiffInSeconds / 60);
    return `${minutes} minutes ago`;
  }
  return `${timeDiffInSeconds} seconds ago`;
};

export default formatTime;
