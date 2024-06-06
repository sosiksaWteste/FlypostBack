create database flypost;

use flypost;

    create table user (
        id int not null auto_increment,
        login varchar(255) not null,
        password varchar(255) not null,
		role int not null,
        PRIMARY KEY (id)
    );

    create table client (
        id int not null auto_increment,
        first_name varchar(100) not null,
        last_name varchar(100) not null,
        middle_name varchar(100),
        phone varchar(100) not null,
        email varchar(100) not null,
        last_login Date,
        user_id int not null,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id)
    );

		create table city (
        id int not null auto_increment,
        name varchar(100) not null,
        PRIMARY KEY (id)
    );

		create table office (
        id int not null auto_increment,
        office_number integer not null,
        address varchar(500) not null,
		cord_x float not null,
		cord_y float not null,
        city_id int not null,
        PRIMARY KEY (id),
        FOREIGN KEY (city_id) REFERENCES city(id)
    );

    create table employee (
        id int not null auto_increment,
        first_name varchar(100) not null,
        last_name varchar(100) not null,
        middle_name varchar(100),
        phone varchar(100) not null,
        email varchar(100) not null,
        start_work Date not null,
        salary int not null,
        user_id int not null,
        office_id int not null,
        PRIMARY KEY (id),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (office_id) REFERENCES office(id)
    );

	create table package (
        id int not null auto_increment,
        width int not null,
        length int not null,
        height int not null,
        weight int not null,
        insurance int,
        description varchar(500),
        PRIMARY KEY (id)
    );

	create table payment (
        id int not null auto_increment,
        payment_data varchar(500),
        PRIMARY KEY (id)
    );

	create table delivery (
        id int not null auto_increment,
        package_id int not null,
        sender_id int not null,
        recipient_id int not null,
        payment_id int,
        send_date Date not null,
        claim_date Date,
        send_from int not null,
        send_to int not null,
        price int not null,
		current_position varchar(25) not null,
        PRIMARY KEY (id),
		FOREIGN KEY (send_from) REFERENCES office(id),
		FOREIGN KEY (send_to) REFERENCES office(id),
        FOREIGN KEY (package_id) REFERENCES package(id),
        FOREIGN KEY (sender_id) REFERENCES client(id),
        FOREIGN KEY (recipient_id) REFERENCES client(id),
        FOREIGN KEY (payment_id) REFERENCES payment(id)
    );
