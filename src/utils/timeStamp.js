const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { year: "numeric", month: "short", day: "numeric" });
};

export { formatDate, formatTime }
