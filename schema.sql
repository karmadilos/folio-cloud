create table if not exists user(
    id int not null AUTO_INCREMENT,
    email varchar(64) not null,
    password varchar(128) not null,
    name varchar(32) not null,
    primary key(id),
    unique(email)
);

create table if not exists education(
    id int not null AUTO_INCREMENT,
    s_name varchar(64) not null,
    major varchar(16) not null,
    state int not null,
    primary key(id),
    foreign key(user_id) references user (id) 
);

create table if not exists awards(
    id int not null AUTO_INCREMENT,
    a_name varchar(16) not null,
    a_description varchar(64) not null,
    primary key(id),
    foreign key(user_id) references user (id) 
);

create table if not exists project(
    id int not null AUTO_INCREMENT,
    p_name varchar(64) not null,
    start_date date not null,
    end_date date not null,
    primary key(id),
    foreign key(user_id) references user (id) 
);

create table if not exists certificates(
    id int not null AUTO_INCREMENT,
    c_name varchar(64) not null,
    c_agency varchar(16) not null,
    issue_date date not null,
    primary key(id),
    foreign key(user_id) references user (id) 
);