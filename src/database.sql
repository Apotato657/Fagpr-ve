create table filter
(
    user_id   varchar,
    filter_id varchar,
    primary key (user_id, filter_id)
);

alter table filter
    add filter_name varchar;

