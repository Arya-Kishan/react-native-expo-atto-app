export function formatTimestamp(timestamp) {
    const date = new Date(parseInt(timestamp));

    // Get hours and minutes
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // AM/PM handling
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'

    // Get date parts
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // month is zero-based
    const year = date.getFullYear().toString().slice(-2);

    return `${hours}:${minutes} ${ampm} - ${day}/${month}/${year}`;
}

