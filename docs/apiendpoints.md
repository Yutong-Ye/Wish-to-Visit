# Wish API Endpoints

Methods: __POST__, __GET__, __DELETE__

URL path: 
- api/wishes
- api/wishes/{wish_id}

Input:
```json
{
  "wish_name": "string",
  "description": "string",
  "start_date": "2024-02-10",
  "end_date": "2024-02-20",
  "picture_url": "string"
}

Output:
```json
{
  "wish_id": 0,
  "wish_name": "string",
  "description": "string",
  "start_date": "2024-02-10",
  "end_date": "2024-02-20",
  "picture_url": "string"
}
```

# Interest API Endpoints
Methods: __POST__, __GET__, __UPDATE__, __DELETE__

URL path: 
- api/interests/
- api/interests/{interest_id}

Input:
```json
{
  "interests": "string",
  "hobbies": "string",
  "perfect_day_description": "string",
  "children": false,
  "pet_picture_url": "string"
}

Output:
```json
{
  "interest_id": 0,
  "interests": "string",
  "hobbies": "string",
  "perfect_day_description": "string",
  "children": false,
  "pet_picture_url": "string"
}
```


# Visit API Endpoints

Methods: __POST__, __GET__, __UPDATE__, __DELETE__

URL path: 
- api/visit
- api/visit/{visit_id}

Input:
```json
{
  "visit_name": "string",
  "description": "string",
  "start_date": "2024-01-01",
  "end_date": "2024-01-02",
  "picture_url": "string"
}

Output:
```json
{
  "visit_id": 0,
  "visit_name": "string",
  "description": "string",
  "start_date": "2024-01-01",
  "end_date": "2024-01-02",
  "picture_url": "string"
}
```