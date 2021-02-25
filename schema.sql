create table if not exists user(
    id int not null AUTO_INCREMENT,
    email varchar(64) not null,
    password varchar(128) not null,
    name varchar(32) not null,
    primary key(id),
    unique(email)
);