INSERT INTO customer(username, email) VALUES('John wick','John.wick@gmail.com');
INSERT INTO cart(customer_id, total_amount) VALUES(1,0);
INSERT INTO menu_item(menu_item_id) VALUES(1);
INSERT INTO public.cart_items (created_at, updated_at, cart_items_id, price, quantity, cart_id, menu_item_id)
VALUES
    ('2024-04-27 10:00:00', '2024-04-27 10:00:00', 4, 10.99, 2, 1, 1)
    
INSERT INTO order_status(status) VALUES('PENDING');
INSERT INTO order_status(status) VALUES('CANCELED');
INSERT INTO order_status(status) VALUES('SUCCESS');

INSERT INTO orders(order_total_amount, order_status, customer_id) VALUES(123.0,1,1);
INSERT INTO orders(order_total_amount, order_status, customer_id) VALUES(123.0,2,1);
INSERT INTO orders(order_total_amount, order_status, customer_id) VALUES(123.0,3,1);


INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(123,4,1);
INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(321,4,1);
INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(132,4,1);

INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(123,4,2);
INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(321,4,2);
INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(132,4,2);

INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(123,4,3);
INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(321,4,3);
INSERT INTO order_details(order_details_price, order_details_quantity, order_id) VALUES(132,4,3);
