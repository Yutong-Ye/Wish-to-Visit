steps = [
    [
        """
        CREATE TABLE interests (
            interest_id SERIAL PRIMARY KEY NOT NULL,
            interests VARCHAR(100) NOT NULL,
            hobbies VARCHAR(100) NOT NULL,
            perfect_day_description VARCHAR(200) NOT NULL,
            children BOOLEAN NOT NULL,
            pet_picture_url VARCHAR(1000)
        );
        """,
        """
        DROP TABLE interests;
        """,
    ]
]
