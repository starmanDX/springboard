/** Customer for Lunchly */

const db = require("../db");
const Reservation = require("./reservation");

/** Customer of the restaurant. */

class Customer {
  constructor({
    id,
    firstName,
    lastName,
    phone,
    notes
  }) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.notes = notes;
  }

  /** methods for getting/setting notes (keep as empty string, not NULL) */

  set notes(val) {
    this._notes = val || "";
  }

  get notes() {
    return this._notes;
  }

  /** methods for getting/setting phone #. */

  set phone(val) {
    this._phone = val || null;
  }

  get phone() {
    return this._phone;
  }

  /** find all customers. */

  static async all() {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       ORDER BY last_name, first_name`
    );
    return results.rows.map(c => new Customer(c));
  }

  /** find top 10 most-reserving customers. */

  static async topTen() {
    const results = await db.query(
      `SELECT customers.id, 
        first_name AS "firstName", 
        last_name AS "lastName", 
        phone, 
        customers.notes, 
        COUNT(customer_id) AS count 
      FROM customers 
      JOIN reservations 
      ON customers.id = reservations.customer_id 
      GROUP BY customers.id 
      ORDER BY count DESC LIMIT 10`
    );
    return results.rows.map(c => new Customer(c));
  }

  /** Search for a customer. */

  static async search(firstName, lastName) {
    if (firstName === undefined || lastName === undefined) {
      const err = new Error(`Please search by both first and last name`);
      err.status = 400;
      throw err;
    }
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes
       FROM customers
       WHERE first_name = $1
       AND last_name = $2
       ORDER BY last_name, first_name`,
      [firstName, lastName]);

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${firstName} ${lastName}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  /** get a customer by ID. */

  static async get(id) {
    const results = await db.query(
      `SELECT id, 
         first_name AS "firstName",  
         last_name AS "lastName", 
         phone, 
         notes 
        FROM customers WHERE id = $1`,
      [id]
    );

    const customer = results.rows[0];

    if (customer === undefined) {
      const err = new Error(`No such customer: ${id}`);
      err.status = 404;
      throw err;
    }

    return new Customer(customer);
  }

  /** get full name for a customer.  */

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  /** get all reservations for this customer. */

  async getReservations() {
    return await Reservation.getReservationsForCustomer(this.id);
  }

  /** save this customer. */

  async save() {
    if (this.id === undefined) {
      const result = await db.query(
        `INSERT INTO customers (first_name, last_name, phone, notes)
             VALUES ($1, $2, $3, $4)
             RETURNING id`,
        [this.firstName, this.lastName, this.phone, this.notes]
      );
      this.id = result.rows[0].id;
    } else {
      await db.query(
        `UPDATE customers SET first_name=$1, last_name=$2, phone=$3, notes=$4
             WHERE id=$5`,
        [this.firstName, this.lastName, this.phone, this.notes, this.id]
      );
    }
  }
}

module.exports = Customer;