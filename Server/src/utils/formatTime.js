// 7:00
const timeToMinutes = time => {
    const [hours, minutes] = time.split(':');
    return hours * 60 + minutes * 1;
};

module.exports = {
    timeToMinutes
};