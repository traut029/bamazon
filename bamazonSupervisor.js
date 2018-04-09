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
                choices: ["View Product Sales By Department", "Create New Department"],
                message: "Options Available: "
            },

        ])
        .then(function (answer) {

            if (answer.choice == "View Product Sales By Department") {

                connection.query("SELECT departments.department_id, departments.department_name, departments.over_head_costs, ifnull(SUM(product_sales),0 ) AS department_sales,SUM(ifnull(product_sales,0)) - over_head_costs AS total_profit FROM products  right join departments on products.department_name=departments.department_name group by departments.department_name order by departments.department_id asc",
                    function (err, results) {
                        console.table(results)
                        start()

                    });
            }
            else if (answer.choice == "Create New Department") {
                inquirer
                    .prompt([
                        {
                            name: "department_name",
                            type: "input",
                            message: "Type the name of the new department"
                        },
                        {
                            name: "over_head_costs",
                            type: "input",
                            message: "Type the over head costs."
                        }

                    ])
                    .then(function (answer2) {
                        console.log(answer2.department_name)
                        connection.query("insert into departments SET ?",[
                            
                                {
                                    department_name: answer2.department_name,


                                    over_head_costs:answer2.over_head_costs


                                    
                                }
                            ], function (err, results) {
                                if (err) throw err;
                                console.log("\nNew Department successfully initiated!\n")
                                start()
                            })
                    })
            }
        });

}
