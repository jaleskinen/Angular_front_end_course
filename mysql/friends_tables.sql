create table user(
	user_id int NOT NULL UNIQUE AUTO_INCREMENT,
    username varchar(255) NOT NULL UNIQUE,
    pass varchar(255) NOT NULL,
    /* On every table has to have a primary key, That is one of the attributes defined
    In our case it is user id*/
    primary key(user_id)

)Engine=InnoDb;

create table friend(
	_id int NOT NULL UNIQUE AUTO_INCREMENT,
    name varchar(255),
    address varchar(255),
    age int,
    user_id int, 
    primary key(_id),
    foreign key(user_id) references user(user_id)
)Engine=InnoDb;

/*This is the one way to delete table*/
/*Table must be deleted before change*/
/*drop table user;*/