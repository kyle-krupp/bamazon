var mysql = require("mysql");
var inquirer = require("inquirer");
var consoleTable = require("console.table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "1234",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  displayOptions();
});

function displayOptions() {
	inquirer.prompt([
	{
		name: "action",
		type: "list",
		message: "What would you like to do?",
		choices: [
		"View products for sale",
		"View Low Inventory",
		"Add to Inventory",
		"Add New Product",
		"Exit Options"
		]
	}]).then(function(answer) {
		switch(answer.action){
			case "View products for sale": viewProducts();
			break;

			case "View Low Inventory": viewInventory();
			break;

			case "Add to Inventory": add2Inventory();
			break;

			case "Add New Product": addProduct();
			break;

			case "Exit Options": connection.end();
			break;
		}
	});
}

function viewProducts() {
	console.log("\nHere are the items in stock at this moment:");

	connection.query("SELECT item_id AS ID, product_name AS Product, price, stock_quantity AS Quantity FROM products", function(err, res) {
		if (err) throw err;
		console.table(res);

	displayOptions();	
	});
	
}

function viewInventory() {
	console.log("\nHere are the products with low inventory:");

	connection.query("SELECT product_name, stock_quantity as Product FROM products WHERE stock_quantity < 5", function(err, res) {
		if (err) throw err;

		if (res[0] == undefined ) console.log("All items are well stocked!");
		else console.table(res);

		displayOptions();
	});
	
}

function add2Inventory() {
	
	connection.query("SELECT * FROM products", function(err, results) {
   			 if (err) throw err;

   			 var choicesArr = results.map(elem => {
   			 	var item = {};

   			 	item['name'] = elem.product_name;
   			 	item['quantity'] = elem.stock_quantity;

   			 	return item;
   			 }); 
   			 console.log(choicesArr);

		inquirer.prompt([

			{
				name: "add",
				type: "list",
				message: "Which product would you like to add more of?",
				choices: choicesArr
			},
			{
				name: "number",
				type: "input",
				message: "How many more items would you like to add to your inventory?"
			}
			]).then(function(answer) {

				var selectedItem;

				results.forEach(function(elem, index, arr) {
					if (arr[index].product_name == answer.add) {
						selectedItem = arr[index];
					}
					return selectedItem;
				}); 

				console.log("Number of items currently in stock: " + selectedItem.stock_quantity);
				console.log("Number of items added: " + answer.number);

				var updatedStock = selectedItem.stock_quantity + parseInt(answer.number);

				connection.query("UPDATE products SET ? WHERE ?", [
					{
						stock_quantity: updatedStock
					},
					{
						product_name: answer.add
					}
				], function(err) {
					if (err) throw err;
					console.log("Database updated successfully!");
				});


					displayOptions();
		});
	});
}

function addProduct() {

	inquirer.prompt([
	{
				name: "name",
				type: "input",
				message: "Type in the name of the product you would like to add in the database"
	},
	{
				name: "department",
				type: "input",
				message: "What department does the product belong in?"
	},
	{
				name: "price",
				type: "input",
				message: "How much will one item cost?"
	},
	{
				name: "extra",
				type: "input",
				message: "Quantity available?"
	}]).then(function(newItem) {

		connection.query("INSERT INTO products SET ?", 
		{
			product_name: newItem.name,
			department_name: newItem.department,
			price: newItem.price,
			stock_quantity: newItem.extra
		
		}, function(err) {
			if (err) throw err;

			console.log("New item was successfully added to the database!");

			displayOptions();
		});

	});

}