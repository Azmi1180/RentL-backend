// helpers/slotHelper.js

function generateAvailableSlots(lapangan, bookings) {
    const allSlots = [];
    let currentTime = new Date(`1970-01-01T${lapangan.open_time}`);
    const closeTime = new Date(`1970-01-01T${lapangan.close_time}`);

    while (currentTime < closeTime) {
        const nextTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
        const startTime = currentTime.toTimeString().substr(0, 5);
        const endTime = nextTime.toTimeString().substr(0, 5);

        allSlots.push({
            start: startTime,
            end: endTime,
            price: lapangan.price_per_hour
        });

        currentTime = nextTime;
    }

    const filteredSlots = allSlots.filter(slot => {
        return !bookings.some(booking => {
            return (slot.start < booking.end_time && slot.end > booking.start_time);
        });
    });

    return filteredSlots;
}

module.exports = {
    generateAvailableSlots,
};
