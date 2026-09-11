Library API

This is my Library API for Lab 4. It was built with Express.js and MongoDB Atlas. It allows books to be added, viewed, updated and deleted.

How to Run

Node.js 18 LTS or newer is required.

npm install
npm start

Create a .env file:

MONGODB_URI=your_mongodb_connection_string
PORT=3000

The .env file is not committed to GitHub.

Project Structure

* app.js – sets up Express, middleware and routes. It must not connect to MongoDB or call listen().
* server.js – connects to MongoDB and starts the server. It does not contain route definitions.
* config/ – handles environment variables and the database connection.
* models/ – contains the Book schema and database rules. It does not use req or res.
* controllers/ – handles requests, responses and book operations.
* routes/ – contains the API paths and middleware order. It does not contain database queries.
* middleware/ – handles validation and errors.

Endpoints

Method	Endpoint	Purpose
GET	/health	Checks the API and database
POST	/api/books	Creates a book
GET	/api/books	Gets books
GET	/api/books/:id	Gets one book
PATCH	/api/books/:id	Updates a book
DELETE	/api/books/:id	Deletes a book

Books can also be filtered by author and genre.

Validation and Errors

I used hand-written validation middleware to check required fields and reject fields that are not allowed.

Errors follow this format:

{
  "error": {
    "message": "Error message",
    "details": []
  }
}

Required Questions

Controller vs Model:
The controller handles requests and responses, while the model handles the book data and database rules.

Books with copies on loan:
This rule belongs in the business logic because it checks whether the book can be deleted. It does not belong in the route or model.

Why copiesAvailable cannot be changed with PATCH:
It prevents the client from directly changing the available-copy count and making the book information inaccurate.

Known Limitations

There is no authentication, borrowing/returning system or frontend.

Acceptance Evidence

Request and response evidence for the required acceptance criteria will be included with the submission.