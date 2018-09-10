
// environment variables for package dependencies. NPM packes mysql and requirer
var mysql = require("mysql");
var inquirer = require("inquirer");

// configure server connection

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
  displayProducts();
});

function displayProducts() {

	console.log("First, display all products");

	connection.query("SELECT * FROM products", function(err, res) {
		if (err) throw err;
		
		var display = res.map(elem => {
			var item = {};
			item["code"] = elem.item_id;
			item["name"] = elem.product_name;
			item["price"] = elem.price;
			return item;
		});
		console.log(display);	


		inquirer.prompt([
			{
				name: "offer",
				type: "input",
				message: "Please type in the code of the product you would like to buy"
			},
			{	
				name: "units",
				type: "input",
				message: "Please write how many units you would like to buy"	    

			}
		]).then(function(order) {

			console.log("This is the order placed: product number " + order.offer + " number of units " + order.units + " :)");

			var chosenItem;

			res.forEach(function(elem, index, arr){

				if (arr[index].item_id == order.offer) 
				{
					chosenItem = arr[index];
				};
				return chosenItem;
			});


			console.log("quantity in stock " + chosenItem.stock_quantity);

				if (chosenItem.stock_quantity < order.units) {
					console.log("You greedy bastard!");
					connection.end();
				}

				else {
					var unitsBought = parseInt(order.units);
					var unitsRemaining = chosenItem.stock_quantity - unitsBought;

					
					console.log ("Units remaining in stock: " + unitsRemaining);
					
					connection.query("UPDATE products SET ? WHERE ?", 
						[	
						    {
						    	stock_quantity: unitsRemaining
						    },
						    {
						    	product_name: chosenItem.product_name
						    }

						], function(err) {
							if (err) throw err;
						}
					);

					console.log ("Total cost of your purchase is: $" + unitsBought*chosenItem.price ); 


					connection.end();
				};
		}); // end then function
		
	}); // end query 
};// end display
