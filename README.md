# Application Documentation

## Running the Application

### Prerequisites
- **Java**: Ensure that Java 11 or higher is installed on your machine. To verify, run `java -version` in your terminal or command prompt. If Java is not installed, download and install it from [Oracle's website](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) or use an OpenJDK distribution.

### Installation
1. **Download the `.jar` File**: Click on the following link to download the `.jar` file:

   [Download Application](https://iitkgpacin-my.sharepoint.com/:u:/g/personal/aryachandanreddy_iitkgp_ac_in/EZtOLKVtgzhAptdX-Wl2BEUBV62GXBX3GOC4pHp04UWuZA?e=tK2tba)

2. **Save the File**: Save the file to a convenient location on your machine, such as your desktop or a dedicated folder.

### Running the Backend
1. **Open Terminal or Command Prompt**: Navigate to the directory where you downloaded the `.jar` file.

2. **Execute the Jar File**: Run the following command in your terminal or command prompt:
   ```bash
   java -jar .\Spendwise-0.0.1-SNAPSHOT.jar

Once the backend is up, we go to Frontend

## Running the Frontend

### Prerequisites
- **Node.js and Yarn**: Ensure that Node.js is installed on your machine along with Yarn, which is used to manage the dependencies of the frontend application. You can check their installation by running `node -v` and `yarn -v` in your terminal. If these are not installed, download and install Node.js from [Node.js official website](https://nodejs.org/) and Yarn from [Yarn's official site](https://yarnpkg.com/).

### Installation
1. **Clone the Repository**: If you haven't already cloned the repository, do so with the following command:
   ```bash
   git clone https://github.com/AstoundReddy/fi-svc-1.git
2. After cloning, navigate to the frontend directory, install the dependencies and run the application:
   ```bash
   cd fi-svc-1/frontend
   yarn install
   yarn start
3. The application is up and running on localhost at port 3000
   ```bash
    http://localhost:3000/

### Endpoint Documentation
1. This is a postman collection of all the designed and used API endpoints: Spendwise.postman_collection.json.
2. Download the file and import it Postman to test the APIs.

# API Endpoints Documentation

This documentation covers the key functionalities provided by the Spendwise API. Below are the descriptions of each endpoint along with request examples.

## User Endpoints

### Register
- **Description**: Register a new user.
- **Method**: `POST`
- **URL**: `http://localhost:5000/users/register`
- **Body**:
```json
{
   "email" : "testuser2@gmail.com",
   "password" : "1981229sha",
   "name" : "test user 2"
}
```

### Login
- **Description**: Login for existing users and retrieve a JWT token.
- **Method**: `POST`
- **URL**: `http://localhost:8080/users/login`
- **Body**:
  ```json
  {
    "email": "kuchbhi@gmail.com",
    "password": "1981229sha"
  }
  ```
## Category Endpoints

### Create Category
- **Description**: Create a new category for a user.
- **Method**: `POST`
- **URL**: `http://localhost:5000/categories/user/1`
- **Headers**: Authorization: `Bearer {{jwt_token}}`
- **Body**:
```json
{
 "name": "Groceries new"
}
```
### Update Category
- **Description**: Update an existing category.
- **Method**: `PUT`
- **URL**: `http://localhost:5000/categories`
- **Headers**: Authorization: `Bearer {{jwt_token}}`
- **Body**:
  ```json
  {
    "name": "Updated groceries",
    "id": "4"
  }
### Categories by User
- **Description**: Retrieve all categories created by a specific user.
- **Method**: `GET`
- **URL**: `http://localhost:5000/categories/user/1`
- **Headers**: Authorization: `Bearer {{jwt_token}}`
- **Responses**: A list of categories associated with the user or error messages.

## Transaction Endpoints
### Create Transaction
- **Description**: Record a new transaction for a user.
- **Method**: `POST`
- **URL**: `http://localhost:5000/transactions/user/1`
- **Headers**: Authorization: `Bearer {{jwt_token}}`
- **Body**:
  ```json
  {
    "amount": 280.0,
    "date": "2023-03-05",
    "description": "Dinner at restaurant",
    "category": {
      "id": 4
    }
  }
### Delete Transaction
- **Description**: Delete an existing transaction.
- **Method**: `DELETE`
- **URL**: `http://localhost:5000/transactions/1`
- **Headers**: Authorization: `Bearer {{jwt_token}}`
- **Responses**: A confirmation of deletion or error messages.

### Update Transaction
- **Description**: Update details of an existing transaction.
- **Method**: `PUT`
- **URL**: `http://localhost:5000/transactions`
- **Headers**: Authorization: `Bearer {{jwt_token}}`
- **Body**:
  ```json
  {
    "id": 1,
    "amount": 5.6,
    "description": "Updated transaction details",
    "category": {
      "id": 4
    }
  }
This is the most important API of all that took the longest to design
### Transactions by User
- **Description**: Retrieve all transactions for a specific user with optional filtering parameters.
- **Method**: `GET`
- **URL**: `http://localhost:5000/transactions/user/1`
- **Headers**: Authorization: `Bearer {{jwt_token}}`
- **Query Parameters**:
  - **startDate**: Start date for filtering transactions (format: YYYY-MM-DD)
  - **endDate**: End date for filtering transactions (format: YYYY-MM-DD)
  - **categories**: Comma-separated category IDs to filter transactions
  - **minAmount**: Minimum amount for filtering transactions
  - **maxAmount**: Maximum amount for filtering transactions
- **Example URL with Parameters**: http://localhost:5000/transactions/user/1?startDate=2023-03-01&endDate=2023-03-09&categories=4,5&minAmount=250&maxAmount=260
- **Responses**: A list of filtered transactions based on the provided criteria or error messages.

