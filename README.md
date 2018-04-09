# bamazon
## bamazoncustomer.js
When bamazonCustomer.js is run in node a table tailored to customers appears and requests an item ID:

![initial customer image](images/image1.png)

After the user inputs an item ID the program requests how many they would like:
![initial customer image](images/image2.png)

Before we run this here is an image of the current database:
![initial customer image](images/image3.png)

After running it console logs that the order was completed, the total price of the purchase, and resubmits the table and item_id query to fill more orders:
![initial customer image](images/image4.png)

And the database has changed to reflect the loss of inventory:
![initial customer image](images/image5.png)

If we request more of a product than there is available it stops the order and console logs "Insufficient Quantity!":
![initial customer image](images/image6.png)

If we request an invalid item ID it throws an error:
![initial customer image](images/image7.png)

## bamazonmanager.js
When bamazonmanger.js runs it presents 4 options.
![initial customer image](images/image8.png)

View Products for sale logs a table for a manager in the console.
![initial customer image](images/image9.png)

View Low inventory logs a list of all inventory with under 5 stock_quantity in console.
![initial customer image](images/image10.png)

Add to inventory displays an array of existing items to choose from.
![initial customer image](images/image11.png)

After selecting an item inquirer queries user for how much stock they would like to add. After submitting it logs that the order was placed successfully.

![initial customer image](images/image12.png)

Selecting Add new product queries the user for the item name, department name, price and initial stock before creating the new product.
![initial customer image](images/image13.png)

If we recheck Products For Sale our new item "Chocolate Bar" now exists in the database.
![initial customer image](images/image14.png)