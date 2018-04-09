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


    inquirer
        .prompt([
            {
                name: "choice",
                type: "list",
                choices: ["View Products For Sale", "View Low Inventory", "Add To Inventory", "Add New Product"],

                message: "Options Available: "
            },
        ])
        .then(function (answer) {

            if (answer.choice == "View Products For Sale") {

                connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", function (err, results) {
                    if (err) throw err;
                    console.log("\n")
                    console.table(results)
                    start()
                });
            }
            else if (answer.choice == "View Low Inventory") {
                connection.query("SELECT item_id, product_name, price, stock_quantity FROM products WHERE stock_quantity<5", function (err, results) {
                    if (err) throw err;
                    console.log("\n")
                    console.table(results)
                    start()
                });
            }
            else if (answer.choice == "Add To Inventory") {
                add()

            }
            else if (answer.choice == "Add New Product") {
                newProduct()
            }



        });
}
function add() {
    connection.query("SELECT * FROM products", function (err, res) {
        
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice2",
                    type: "list",
                    choices: function() {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                          choiceArray.push(res[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Options Available: "
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "Type the amount of stock you would like to order."
                },
            ])
            .then(function (answer2) {
                var chosenItem;
                for (var i = 0; i < res.length; i++) {
                    if (res[i].product_name == answer2.choice2) {
                        chosenItem = res[i];
                    }
                }
                
                var newStock = chosenItem.stock_quantity + parseInt(answer2.stock_quantity);
                connection.query("UPDATE products SET ? WHERE ?", [

                    {
                        stock_quantity: newStock
                    },
                    {
                        item_id: chosenItem.item_id
                    }
                ], function (err, results) {
                    if (err) throw err;
                    console.log("\nOrder successfully placed!\n")
                    start()
                });
            })
    })
}
function newProduct() {
    connection.query("SELECT * FROM products", function (err, res) {
        
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "product_name",
                    type: "input",
                    message: "Type the name of the new product."
                },
                {
                    name: "department_name",
                    type: "input",
                    message: "Type the department name."
                },
                {
                    name: "price",
                    type: "input",
                    message: "Type the price."
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "Type the amount of stock you would like to order."
                },
            ])
            .then(function (answer3) {
             console.log(answer3.product_name)
             console.log(answer3.department_name)
             console.log(parseFloat(answer3.price).toFixed(2))
             console.log(parseInt(answer3.stock_quantity))
              
                connection.query("insert into products SET ?",
                [ 
                    {
                        stock_quantity: parseInt(answer3.stock_quantity),
                    
                
                         price: parseFloat(answer3.price).toFixed(2),
                    
                    
                        product_name: answer3.product_name,
                    
                    
                        department_name: answer3.department_name
                    }
                               
                ], function (err, results) {
                    if (err) throw err;
                    console.log("\nNew Item successfully initiated!\n")
                    start()
                });
            })
    })
}