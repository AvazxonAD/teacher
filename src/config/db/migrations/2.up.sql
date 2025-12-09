
alter table users add column is_admin boolean default false;

insert into users(email, name, phone, avatar, is_admin) values('email@.com', 'Admin user', '+998992996937', '', true);