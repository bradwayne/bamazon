var mysql = require('mysql');
var inquirer = require('inquirer');
var cTables = require('console.table');

var connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    // Your username
    user: 'root',
    // Your password
    password: 'Bailey#1019',
    database: 'bamazon'
});
connection.connect(function (err) {
    if (err) throw err;
    start();
});

///////////////////////////////////////////////////////////////////////////////////
function start() {
    inquirer
        .prompt({
            name: 'bamazon',
            type: 'rawlist',
            message: 'What would you like to Manage?',
            choices: [
                'Products for Sale',
                'View Low Inventory',
                'Add to Inventory',
                'Add New Product',
                'Exit Manager List'
            ]
        })

        .then(function (answer) {
            switch (answer.bamazon) {
                case 'Products for Sale':
                    ViewProducts();
                    break;
                case 'View Low Inventory':
                    ViewLowInventory();
                    break;
                case 'Add to Inventory':
                    AddInventory();
                    break;
                case 'Add New Product':
                    AddNewProduct();
                    break;
                case 'Exit Manager List':
                    ExitManagerList();
                    break;
            }
        });
}

///////////////////////////////////////////////////////////////////////////////////

function ViewProducts() {

    var query = connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        console.log('---------------------------------------------------------------------');
        console.table(res);
        console.log('-------------------------------------------');
        start();
    });
}

///////////////////////////////////////////////////////////////////////////////////

function AddInventory() {
    // query the database for all items being auctioned
    var query = connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([{
                    name: 'manager',
                    type: 'rawlist',

                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push('Product: ' + res[i].product_name + ' || Quantity: ' + res[i].stock_quantity);
                        }
                        return choiceArray;
                    },
                    pageSize: 20,
                    message: 'What product would you like to order more of?'
                },
                {
                    name: 'quantity',
                    type: 'input',
                    message: 'How any units would you like to order?'
                }
            ])
            .then(function (answer) {

                console.log('-------------------------------------------');
                console.table(res);
                console.log('-------------------------------------------');

                var inventoryUpdate;

                for (var i = 0; i < res.length; i++) {
                    if (answer.manager.indexOf(res[i].product_name) > 0) {
                        inventoryUpdate = res[i];
                    }
                }

                if (inventoryUpdate.stock_quantity + parseInt(answer.quantity)) {
                    connection.query(
                        'UPDATE products SET ? WHERE ?', [{
                                // stock_quantity: answer.quantity
                                stock_quantity: inventoryUpdate.stock_quantity + parseInt(answer.quantity)
                            },
                            {
                                item_id: inventoryUpdate.item_id
                            }
                        ],
                        function (error) {
                            if (error) throw err;
                            console.log('Quantity ordered was successfully!');
                            // console.log('Product: ' + inventoryUpdate.product_name + ' || Quantity is now ' + inventoryUpdate.stock_quantity);
                            console.log('-------------------------------------------');

                            start();
                        }
                    )
                };
            });
    });
}


///////////////////////////////////////////////////////////////////////////////////

// function ViewLowInventory() {

// }

///////////////////////////////////////////////////////////////////////////////////

function AddNewProduct() {
    // prompt for info about the item being put up for auction
    inquirer
        .prompt([{
                name: "product",
                type: "input",
                message: "What is the new product you would like to add?"
            },
            {
                name: "department",
                type: "input",
                message: "What department does this new product belong in?"
            },
            {
                name: "price",
                type: "input",
                message: "What is the price for this product",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            },
            {
                name: "stockQuantity",
                type: "input",
                message: "What is the inventory count for this item?",
                validate: function (value) {
                    if (isNaN(value) === false) {
                        return true;
                    }
                    return false;
                }
            }
        ])
        .then(function (answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
                "INSERT INTO products SET ?", {
                    product_name: answer.product,
                    department_name: answer.department,
                    price: answer.price,
                    stock_quantity: answer.stockQuantity
                },
                function (err) {
                    if (err) throw err;
                    console.log("Your new product was add successfully!");
                    // re-prompt the user for if they want to bid or post
                    start();
                }
            );
        });
}

///////////////////////////////////////////////////////////////////////////////////

function ExitManagerList() {
    console.log('----------------------------------------------');
    console.log('You have now exited the Manager Inventory List');
    connection.end();

}