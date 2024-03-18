steps = [
    [
        # "Up" SQL statement
        """
        CREATE TABLE wishes (
            list_id SERIAL PRIMARY KEY NOT NULL,
            user_id INT REFERENCES users(user_id) ON DELETE CASCADE NOT NULL,
            destination VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            description TEXT,
            planned_date DATE,
            status VARCHAR(20) CHECK (status IN ('Planned', 'Visited', 'Canceled')) NOT NULL
        );
        """,
        # "Down" SQL statement
        """
        DROP TABLE travel_bucket_lists;
        """
    ]
]