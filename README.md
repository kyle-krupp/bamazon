# # Bamazon

An Amazon-like store front using Node.js and MySQL.

## Getting Started

- Clone repo.
- Vagrant up
- Vagrant ssh
- mysql -u root -p
- Create a MySQL DB with the SQL query file
- Run the JS files with “node <file name.js>”


### What each Node application does

1. `Bamazon-Customer.js`

    * Prints the products in the store.

    * Prompts customer which product they would like to purchase by code number.

    * Asks for the quantity.

      * If there is a sufficient amount of the product in stock, it will return the total for that purchase.
      * If there is not enough of the product in stock, it will tell the user that there isn't enough of the product.
      * If the purchase goes through, it updates the stock quantity to reflect the purchase.
      * It will also update the product sales in the department table.


(https://github.com/kyle-krupp/bamazon/blob/master/code/Screen%20Shot%202018-09-15%20at%209.01.12%20AM.png?raw=true)




-----------------------

2. `Bamazon-Manager.js`

    * Starts with a menu:
        * View Products for Sale
        * View Low Inventory
        * Add to Inventory
        * Add New Product
        * End Session
<<<<<<< HEAD

    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its StockQuantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `End Session`, it ends the session and doesn't go back to the menu.

=======

    * If the manager selects `View Products for Sale`, it lists all of the products in the store including all of their details.

    * If the manager selects `View Low Inventory`, it'll list all the products with less than five items in its StockQuantity column.

    * If the manager selects `Add to Inventory`, it allows the manager to select a product and add inventory.

    * If the manager selects `Add New Product`, it allows the manager to add a new product to the store.

    * If the manager selects `End Session`, it ends the session and doesn't go back to the menu.

(https://github.com/kyle-krupp/bamazon/blob/master/code/Screen%20Shot%202018-09-15%20at%2011.34.06%20AM.png?raw=true)



-----------------------


## Technologies used
- Node.js
- Inquire NPM Package (https://www.npmjs.com/package/inquirer)
- MYSQL NPM Package (https://www.npmjs.com/package/mysql)
- Console Table NPM Package (https://www.npmjs.com/package/console.table)

### Prerequisites

```
- Node.js - Download the latest version of Node https://nodejs.org/en/
<<<<<<< HEAD
<<<<<<< HEAD
- Create a MYSQL database called 'BAMazon', reference schema.sql
```
