class HallBooking {
    constructor(id, hall_id, customer_id, booking_date, booking_time) {
        this.id = id;
        this.hall_id = hall_id;
        this.customer_id = customer_id;
        this.booking_date = booking_date;
        this.booking_time = booking_time;
    }
}

module.exports = HallBooking;