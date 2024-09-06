// helpers/slotHelper.js

function generateAvailableSlots(lapangan, bookings) {
    const allSlots = [];
    let currentTime = new Date(`1970-01-01T${lapangan.open_time}`);
    const closeTime = new Date(`1970-01-01T${lapangan.close_time}`);

    // Buat semua slot dari jam buka hingga jam tutup lapangan
    while (currentTime < closeTime) {
        const nextTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // Tambahkan 1 jam
        const startTime = currentTime.toTimeString().substr(0, 5); // Format HH:MM
        const endTime = nextTime.toTimeString().substr(0, 5);

        allSlots.push({
            start: startTime,
            end: endTime,
            price: lapangan.price_per_hour
        });

        currentTime = nextTime;
    }

    // Filter out slots that overlap with any booking
    const filteredSlots = allSlots.filter(slot => {
        return !bookings.some(booking => {
            // Cek apakah slot bentrok dengan waktu booking
            return (
                (slot.start < booking.end_time && slot.end > booking.start_time)  // Slot overlap dengan booking
            );
        });
    });

    return filteredSlots;

}

module.exports = {
    generateAvailableSlots,
};
