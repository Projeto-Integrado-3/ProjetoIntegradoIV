function formatTime(time) {
  return time.replace(/(\d{2})(\d{2})/, "$1:$2");
}

module.exports = formatTime;
