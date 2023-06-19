class Room {
    constructor(id, name, type, capacity, price, description, image) {
        this.id = id;
        this.name = name;
        this.type = type;
        this.capacity = capacity;
        this.price = price;
        this.description = description;
        this.image = image;
    }
}

module.exports = Room;