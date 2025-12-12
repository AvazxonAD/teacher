alter table users
RENAME COLUMN email TO username;
alter table users
RENAME COLUMN avatar TO image;
alter table users
RENAME COLUMN phone TO fio;
alter table users
ADD COLUMN bio TEXT;