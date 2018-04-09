var mysql = require("mysql");
var inquirer = require("inquirer");
require("console.table")
// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function (err) {
    if (err) throw err;
    // run the start function after the connection is made to prompt the user
    start();
});

function start() {
    var query = "SELECT item_id, product_name, price FROM products";
    connection.query(query, function (err, res) {
        // console.log(res)
        console.table(res)
        prompt1();
    });
}
function prompt1() {

    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "item_id",
                    type: "input",
                    message: "Type the ID of the product you would like to buy."
                },

                {
                    name: "units",
                    type: "input",
                    message: "Type how many units you would like to buy."
                },
            ])
            .then(function (answer) {
                    // get the information of the chosen item
                    var chosenItem=0;
                    for (var i = 0; i < results.length; i++) {
                        if (results[i].item_id == answer.item_id) {
                            chosenItem = results[i];
                        }
                    }
                    var stockDifference= chosenItem.stock_quantity-parseInt(answer.units);
                   
                    // determine if bid was high enough
                    if(chosenItem==0){
                        console.log("\nInvalid item ID!\n")
                        start();
                    }
                    else if (chosenItem.item_id == parseInt(answer.item_id)&&stockDifference>=0) {
                        
                        // bid was high enough, so update db, let the user know, and start over
                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                               
                                {
                                    stock_quantity:stockDifference
                                },
                                {
                                item_id: chosenItem.item_id
                                }
                            ],
                            function (error) {
                                if (error) throw err;
                                var totalPrice=chosenItem.price*answer.units;
                                console.log("\nOrder placed Successfully!\n");
                                console.log("Total cost: $ "+totalPrice+"\n")
                                start();
                            }
                        );
                    }
                    else if(stockDifference<0){
                        console.log("\nInsufficient Quantity!\n")
                        start();
                    }

                });
    });
}


