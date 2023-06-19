class Customer {
  constructor(id, name, email, password, nic, address, phone) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.nic = nic;
    this.address = address;
    this.phone = phone;
    this.password = password;
  }
}

module.exports = Customer;
