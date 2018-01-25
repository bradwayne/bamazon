
# Bamazon

Bamazon is a node app that will take in orders from customers and deplete stock from the store's inventory from the MySQL database.

**Bamazon Customer**

* The app will start you off with a prompt asking you if you would like to shop with Bamazon.

        * SHOP
        * LEAVE

        ![bamazonCustomer](/read_me/Screenshot (65).png)
        Format: ![Alt Text](url)

    * If you chose to 'SHOP' an item number, department, product and price will all be provided to you for each product available.
      
        ![bamazonCustomer](/read_me/Screenshot (67).png)
        Format: ![Alt Text](url)

        * You will then be given a prompt to chose the quantity of units to purchase.

        * Once you have chosen your quanity to purchase we will be given a reciept-like discription of the product with the item number, department, product and price.

        * It will be followed up by the total quantity units purchased, the item along with your grand total.

        ![bamazonCustomer](/read_me/Screenshot (72).png)
        Format: ![Alt Text](url)

        * If Bamazon does not have enought quantity in stock to fill your order it will prompt you regarding the lack of inventory and return you to the 'SHOP' or 'LEAVE' screen.

        ![bamazonCustomer](/Screenshot (69).png)
        Format: ![Alt Text](url)

* If you chose to 'LEAVE' you will be exiting out of the Bamazon Customer App.


**Bamazon Manager**

* The app will start you off with a prompt asking you what you would like to manage... 

        ![bamazonCustomer](/Screenshot (74).png)
        Format: ![Alt Text](url)


    * Products for Sale
        * this will display everything that Bamazon have in inventory. It will be broken down by item number, product name, department name and stock quantity.

        ![bamazonCustomer](/Screenshot (75).png)
        Format: ![Alt Text](url)

    * View Inventory
        * I list of all inventory items with a stock quantity that is less that 5 units.

    * Add to Inventory
        * this will allow you to select any inventroy item and add the the stock quantity.

        ![bamazonCustomer](/Screenshot (78).png)
        Format: ![Alt Text](url)

    * Add New Product
        * this will allow you to add a new product and specify what department it will be located in, the quantity that you will be ordering and the price you will be charging. It will then assign an item id for the new product. 

        ![bamazonCustomer](/Screenshot (84).png)
        Format: ![Alt Text](url)

    * Exit Manager List
        * This will exit you out of the Bamazon Manager App.