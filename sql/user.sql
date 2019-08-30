-- user table
create table users (
       uid UUID, -- internal user id
       github_uid varchar(80) unique, -- github user id
       github_user_avatar varchar(80), -- github user avatar
       github_user_email text unique, -- github user email
       login_token text, -- login token
       wx_open_id varchar(80), -- weixin openid
       wx_union_id varchar(80), -- wexin union id
       wx_avatar text, -- weixin avatar
       wx_name text, -- weixin nickname
       wx_province text, -- weixin province
       wx_app_id varchar(80), -- weixin app id
       last_update timestamp with time zone, -- last update
       create_date timestamp with time zone -- create date
);
