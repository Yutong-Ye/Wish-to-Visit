steps = [
    [
        """
        CREATE TABLE wish (
            wish_id SERIAL PRIMARY KEY NOT NULL,
            wish_name VARCHAR(20) NOT NULL,
            description VARCHAR(100) NOT NULL,
            start_date DATE,
            end_date DATE,
            picture_url VARCHAR(1000)
        );
        """,
        """
        DROP TABLE wish;
        """,
    ]
]
