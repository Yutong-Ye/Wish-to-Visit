steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE post (
            id serial not null primary key,
            user_id serial not null,
            title varchar(75) not null,
            created_on date not null,
            content text null default null
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE post;
        """,
    ]
]
