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

////////////////////////////////////////////////////////////////////////////////////////////////////

function start() {
    inquirer
        .prompt({
            name: 'bamazon',
            type: 'rawlist',
            message: 'Would you like to shop at Bamazon?',
            choices: ['SHOP', 'LEAVE']
        })

        .then(function (answer) {
            if (answer.bamazon.toUpperCase() === 'SHOP') {
                ShopBamazon();
            } else {
                LeaveBamazon();
            }
        });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function ShopBamazon() {

    var query = connection.query('SELECT * FROM products', function (err, res) {
        if (err) throw err;

        inquirer
            .prompt([{
                    name: 'bamazon',
                    type: 'rawlist',

                    choices: function () {

                        var choiceArray = [];
                        for (var i = 0; i < res.length; i++) {
                            choiceArray.push('Item #' + res[i].item_id + ' || Department: ' + res[i].department_name + ' || Product: ' + res[i].product_name + ' || Price: $' + res[i].price);
                        }
                        return choiceArray;
                    },
                    pageSize: 20,
                    message: 'What item by number would you like to purchase?'
                },
                {
                    name: 'inventory',
                    type: 'input',
                    message: 'How many units would you like to purchase?',
                }
            ])

            .then(function (answer) {

                console.log('-------------------------------------------');

                console.table(res);
                var itemToPurchase;

                for (var i = 0; i < res.length; i++) {
                    if (answer.bamazon.indexOf(res[i].product_name) > 0) {
                        itemToPurchase = res[i];
                    }
                }
 
                if (itemToPurchase.stock_quantity >= parseInt(answer.inventory)) {
                    connection.query(
                        'UPDATE products SET ? WHERE ?', [{
                                stock_quantity: itemToPurchase.stock_quantity - parseInt(answer.inventory)
                            },
                            {
                                item_id: itemToPurchase.item_id
                            }
                        ],

                        function (err) {

                            if (err) throw err;
                            console.log('---------------------------------------------------------------------')
                            console.table('Your order for (' + answer.inventory + ') ' + itemToPurchase.product_name + '(s) at ' + itemToPurchase.price + ' was placed successfully.');
                            console.table('Your total for todays order is $' + itemToPurchase.price * parseInt(answer.inventory));
                            console.log('---------------------------------------------------------------------')
                            start();
                        }
                    );

                } else {
                    console.log('We do not have the inventory to full your order.');
                    console.log('------------------------------------------------');

                    start();
                }
            });
    });
}

////////////////////////////////////////////////////////////////////////////////////////////////////

function LeaveBamazon() {
    console.log('-----------------------------------------------------------');
    console.log('Thank you for visiting Bamazon. We hope you come back soon.');
    connection.end();

}