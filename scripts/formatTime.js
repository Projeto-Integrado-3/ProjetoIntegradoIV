function formatTime(time) {
  if (typeof time !== 'string') {
    return '';
  }
  return time.replace(/(\d{2})(\d{2})/, "$1:$2");
}

// Export for ES modules
export { formatTime };

// For browser compatibility, make it globally available
if (typeof window !== 'undefined') {
  window.formatTime = formatTime;
}
