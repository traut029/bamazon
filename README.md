# bamazon
## bamazoncustomer.js
When bamazonCustomer.js is run in node a table tailored to customers appears and requests an item ID:

![images](images/image1.png)

After the user inputs an item ID the program requests how many they would like:
![images](images/image2.png)

Before we run this here is an image of the current database:
![images](images/image3.png)

After running it console logs that the order was completed, the total price of the purchase, and resubmits the table and item_id query to fill more orders:
![images](images/image4.png)

And the database has changed to reflect the loss of inventory:
![images](images/image5.png)

If we request more of a product than there is available it stops the order and console logs "Insufficient Quantity!":
![images](images/image6.png)

If we request an invalid item ID it throws an error:
![images](images/image7.png)

## bamazonmanager.js
When bamazonmanger.js runs it presents 4 options.
![images](images/image8.png)

View Products for sale logs a table for a manager in the console.
![images](images/image9.png)

View Low inventory logs a list of all inventory with under 5 stock_quantity in console.
![images](images/image10.png)

Add to inventory displays an array of existing items to choose from.
![images](images/image11.png)

After selecting an item inquirer queries user for how much stock they would like to add. After submitting it logs that the order was placed successfully.

![images](images/image12.png)

Selecting Add new product queries the user for the item name, department name, price and initial stock before creating the new product.
![images](images/image13.png)

If we recheck Products For Sale our new item "Chocolate Bar" now exists in the database.
![images](images/image14.png)

## bamazonsupervisor.js

If we run bamazonsupervisor.js we are given the options to view product sales by department or to create a new department.  If we view product sales:
![images](images/image15.png)

If we create a new department we will be prompted by inquirer for the new department name and over head costs. Afterwards it will log that the new department is initiated. If we recheck our table the new department has been added.
![images](images/image16.png)