create table if not exists users(
    id int not null AUTO_INCREMENT,
    email varchar(64) not null,
    password varchar(128) not null,
    name varchar(32) not null,
    primary key(id),
    unique(email)
);

create table if not exists educations(
    id int not null AUTO_INCREMENT,
    s_name varchar(64) not null,
    major varchar(16) not null,
    state varchar(64) not null,
    user_id int not null,
    primary key(id),
    foreign key(user_id) references users (id) 
);

create table if not exists awards(
    id int not null AUTO_INCREMENT,
    a_name varchar(16) not null,
    a_description varchar(64) not null,
    user_id int not null,
    primary key(id),
    foreign key(user_id) references users (id) 
);

create table if not exists projects(
    id int not null AUTO_INCREMENT,
    p_name varchar(16) not null,
    p_description varchar(64) not null,
    start_date date not null,
    end_date date not null,
    user_id int not null,
    primary key(id),
    foreign key(user_id) references users (id) 
);

create table if not exists certificates(
    id int not null AUTO_INCREMENT,
    c_name varchar(64) not null,
    c_agency varchar(16) not null,
    issue_date date not null,
    user_id int not null,
    primary key(id),
    foreign key(user_id) references users (id) 
);

create table if not exists profile(
    id int not null AUTO_INCREMENT,
    introduce varchar(64) not null,
    img varchar(512) not null,
    primary key(id),
    foreign key(id) references users (id) 
);