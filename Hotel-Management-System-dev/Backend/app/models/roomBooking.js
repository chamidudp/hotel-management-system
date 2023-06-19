class RoomBooking {
    constructor(id, customer_id, room_id, booking_date, booking_time) {
        this.id = id;
        this.room_id = room_id;
        this.customer_id = customer_id;
        this.booking_date = booking_date;
        this.booking_time = booking_time;
    }
}

module.exports = RoomBooking;