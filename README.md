# agnosTask
A simple coffee shop

A coffee shop in India sells a bunch of items (e.g. beverages, sandwiches, etc.).
Each Items have varying tax rates.
Example: Cold Coffee is an item that belong to Beverages group. Selling Price of Cold Coffee with out tax is 50 Rs.
We say that tax for Cold Coffee is 10%. Therefore the total amount customer needs to pay for a cold coffee is 55 Rs.

It is mentioned that some products are tax free and some products get discount if ordered with another item.
Ex: Apple Shake is tax free. So if the selling price is 30Rs, then customer has to pay 30.

If Cold coffee is ordered with a sandwich (a combo), then there is a discount of 5% in Cold Coffee. 
Selling price of Cold Coffee = 50 Rs.
10% tax = 5 Rs
5% discount = 2.5 Rs.
Selling Price of Sandwich is 80 Rs and lets say Tax of Sandwich is 10%.
10% tax = 8 Rs.

Total amount customer has to pay = 50+5-2.5+80+8 = 140.5 Rs.
Formula = S.Ps + Taxes - Discounts
Total Amount = (80+50) + (5+8) - (2.5) = 140.5 Rs.

Expectations:
1) Users should be able to see the list of available items
2) User should be able to order them and see the order total
3) User should get a notification after a fixed amount of time that their order is ready.

Assumptions:
1) There a web app running on a browser which is being used by an employee in the coffee shop. This employee could be the store owner or waiter or cashier or a worker who holds the responsibility to take the order from customer. Let's call it as **Store Persona**.
2) When a Customer comes to this coffee shop, he/she will interact with the store personal verbally and give orders by looking at some screen where the Menus are displayed.
3) Store persona will select the items based on what is being told by Customer persona and once all the items are added, the customer persona will freeze/finalise the order by looking at the order total.
4) If Customer persona is happy about the total price and the items being added, he/she will do the payment.
5) After the payment, the store persona will give the customer persona an order unique number say 'y' and ask to wait for 'x' minutes.
6) When the time reaches the orderCreatedTime+'x' time, there will be a notification on the web app displaying that, order number "y" is ready.

Questions:
1) In the problem statement, it is mentioned that Customer will be notified. Wanted to know through which medium the notification will be conveyed?
I'm assuming that it is a flashy message in the same screen of the store persona or some display device in the store itself.
