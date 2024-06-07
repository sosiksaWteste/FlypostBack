use flypost;

insert into user(login, password, role) values('admin', 'admin', 2);
insert into user(login, password, role) values('user', 'user', 0);
insert into user(login, password, role) values('user2', 'user2', 0);
insert into user(login, password, role) values('work', 'work', 1);

insert into city(name) values ('Kyiv');

insert into office(office_number, address, cord_x, cord_y, city_id) values (23, '63 apt; mac st.', 50.033904, 36.208018, 1);
insert into office(office_number, address, cord_x, cord_y, city_id) values (24, '65 apt; mcconell st.', 50.033904, 36.208018, 1);

insert into client(first_name, last_name, phone, email, user_id) values('alex', 'kister', '099234585', 'aaa@gmail.com', 2);
insert into client(first_name, last_name, phone, email, user_id) values('maxim', 'kister', '099234335', 'mmm@gmail.com', 3);

insert into employee(first_name, last_name, phone, email, start_work, salary, user_id, office_id) values('stepan', 'oyster', '099237777', 'pppp@gmail.com', '2023-01-01', 15000, 4, 1);

insert into package(width, length, height, weight, insurance) values(100, 100, 50, 25, 1000);

insert into payment(payment_data, payment_date) values('mastercard', '2023-01-01');

insert into delivery(package_id, sender_id, recipient_id, payment_id, send_date, send_from, send_to, price, current_position, status) values(1, 1, 2, 1, '2023-01-01', 1, 2, 2500, 1, 'виїхала');
