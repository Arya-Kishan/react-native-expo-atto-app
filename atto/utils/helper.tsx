export const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

console.log(formatTime(1741696196455)); // Example: "10:43 AM"

export const convertMinutesIntoHour = (mins: number) => {
    if (mins < 60) return `${mins} min`; // Less than 60 mins → show only minutes
    const hours = Math.floor(mins / 60); // Get whole hours
    const minutes = mins % 60; // Get remaining minutes

    return minutes === 0 ? `${hours} hr` : `${hours} hr ${minutes} min`;
};

export const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);

    // Extract day, month, year
    const day = String(date.getDate()).padStart(2, "0"); // Ensures 2-digit day
    const month = date.toLocaleString("en-US", { month: "short" }); // "Mar"
    const year = date.getFullYear();

    // Extract hours and minutes in 12-hour format
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0"); // Ensures 2-digit minutes
    const amPm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; // Convert 24-hour to 12-hour format

    return `${day} ${month} ${year} | ${hours}:${minutes} ${amPm}`;
};