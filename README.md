# agnosTask

**A simple coffee shop**

A coffee shop in India sells a bunch of items (e.g. beverages, sandwiches, etc.). Each Item has varying tax rates. Example: Cold Coffee is an item that belongs to the Beverages group. Selling Price of Cold Coffee without tax is 50 Rs. We say that the tax for Cold Coffee is 10%. Therefore the total amount a customer needs to pay for a cold coffee is 55 Rs.

It is mentioned that some products are tax free and some products get a discount if ordered with another item. Ex: Apple Shake is tax free. So if the selling price is 30Rs, then the customer has to pay 30.

If Cold coffee is ordered with a sandwich (a combo), then there is a discount of 5% in Cold Coffee. Selling price of Cold Coffee = 50 Rs. 10% tax = 5 Rs 5% discount = 2.5 Rs. The Selling Price of Sandwich is 80 Rs and lets say Tax of Sandwich is 10%. 10% tax = 8 Rs.

Total amount the customer has to pay = 50+5-2.5+80+8 = 140.5 Rs.
Formula = S.Ps + Taxes - Discounts
Total Amount = (80+50) + (5+8) - (2.5) = 140.5 Rs.

**Expectations:**

1) Users should be able to see the list of available items
2) User should be able to order them and see the order total
3) User should get a notification after a fixed amount of time that their order is ready.

**Assumptions:**

There is a web app running on a browser which is being used by an employee in the coffee shop. This employee could be the store owner or waiter or cashier or a worker who holds the responsibility to take the order from the customer. Let's call it as **Store Persona**.
When a **Customer persona** comes to this coffee shop, he/she will interact with the store persona verbally and give orders by looking at some screen where the Menus are displayed.
Store persona will select the items based on what is being told by Customer persona and once all the items are added, the customer persona will freeze/finalise the order by looking at the order total.
If Customer persona is happy about the total price and the items being added, he/she will do the payment.
After the payment, the store persona will give the Customer persona an order unique number say 'y' and ask to wait for 'x' minutes.
When the time reaches the orderCreatedTime+'x' time, there will be a notification on the web app displaying that, order number "y" is ready.

**Tech Stack:**
Nodejs,MongoDB and React

**Questions:**

In the problem statement, it is mentioned that a Customer will be notified. Wanted to know through which medium the notification will be conveyed? I'm assuming that it is a flashy message in the same screen of the store persona or some display device in the store itself.

**What is implemented so far:**

1) Use cases:
   1.1) Get all products
   1.2) Send Order Events and get order details as response
   1.3) Send Payment event and get order status as PAID
   1.4) On the server, get a console message after order is ready.

2) Artifacts:
   2.1) Nodejs server in Express framework.
   2.2) Used Swagger middleware to validate requests.
   2.3) Used Swagger for API documentation
   2.4) One sample unit test
   2.5) Package.json wired with test,run scripts
   2.6) Postman collection
   2.7) Architectural Documents
   2.8) Logger.Correlation Id added across the req cycle
   2.9) Launch.json wired with debug script.

Notes:

1) Mongo URL is added in the env file as it is a test server given my mLab. In production world, we never commit such secrets to github as they will be configured in github secret store.

2) Have not added any auth support.

3) Have not added unit tests for all the files.

4) No UI has been developed.

5) Cloud deployment/infrastructure code has not been added.

**Time taken to complete the task: 16 hours**