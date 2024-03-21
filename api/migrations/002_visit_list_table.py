steps = [
    [
        """
        CREATE TABLE visit (
            visit_id SERIAL PRIMARY KEY NOT NULL,
            visit_name VARCHAR(20) NOT NULL,
            description VARCHAR(100) NOT NULL,
            start_date DATE,
            end_date DATE,
            picture_url VARCHAR(1000)
        );
        """,
        """
        DROP TABLE visit;
        """,
    ]
]
