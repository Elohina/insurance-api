# Insurance-API

This project lets applications make requests to obtain the insurance data of clients.

## Development server

1. Run `npm install`
2. Run the script `node start` for dev serve. This command will execute the script `./seeds/seeds.js` that takes the data from the given ULR's and fills the database.

## Libraries

This project uses the following libraries to complement functionalities:

- **Mongoose**: used to manage MongoDB collections through models and querying.
- **JW WebToken**: used to manage session with token based authentication.
- **BodyParser**: used to parse request bodies before process data.
- **Morgan**: used to create a console log of requests.

## API Documentation

### Authenticate
Verifies a user email and returns a token.
- URL: `/session`
- Method: POST
- Body Params:
  - Required: `email:[String]`
- Success response:
  - Code: 200
  - Content:
  ```json
  {
    "token": [String]
  }
  ```
- Error response:
  - Code: 400
  - Content: `{ "error": "Please, provide an email in request body" }`
  - Code: 404
  - Content: `{"error": "User not found"}`

### Get user data by id
Returns user json data from a given id.
- URL: `/users/:id`
- Method: GET
- URL Params:
  - Required: `id:[integer]`
- Success response:
- Code: 200
- Content:
```json
{
  "id": [String],
  "name": [String],
  "email": [String],
  "role": [String],
  "_id": [String]
}
```
- Error response:
  - Code: 403
  - Content: `{ "error": "Forbidden" }`
  - Code: 404
  - Content: `{"error": "User not found"}`

### Get user data by name
Returns user json data from a given name.
- URL: `/users?name=:id`
- Method: GET
- Data Params:
  - Required: `name:[String]`
- Success response:
  - Code: 200
  - Content:
```json
{
  "id": [String],
  "name": [String],
  "email": [String],
  "role": [String],
  "_id": [String]
}
```
- Error response:
  - Code: 403
  - Content: `{ "error": "Forbidden" }`
  - Code: 404
  - Content: `{"error": "User not found"}`

### Get user's policies by user's name
Returns an array of user's policies from a given user's name.
- URL: `/users/:name/policies`
- Method: GET
- URL Params:
  - Required: `name:[String]`
- Success response:
  - Code: 200
  - Content:
```json
[
  {
    "id": [String],
    "amountInsured": [Number],
    "email": [String],
    "inceptionDate": [Date],
    "installmentPayment": [Boolean],
    "clientId": [String],
    "_id": [String]
  }
]
```
- Error response:
  - Code: 403
  - Content: `{ "error": "Forbidden" }`
  - Code: 404
  - Content: `{"error": "User not found"}` or `{"error": "User has no policies"}`

### Get user linked to a policy number
Returns a user json data from a given policy number.
- URL: `/policies/:id/user`
- Method: GET
- URL Params:
  - Required: `id:[String]`
- Success response:
  - Code: 200
  - Content:
```json
{
  "id": [String],
  "name": [String],
  "email": [String],
  "role": [String],
  "_id": [String]
}
```
- Error response:
  - Code: 403
  - Content: `{ "error": "Forbidden" }`
  - Code: 404
  - Content: `{"error": "Policy not found"}`
