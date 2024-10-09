# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts
Installations that need to be done:
--------------------------------------------------------------------------------------------------------------------------------------------------
npm install
npm install react-icons 
npx install -D tailwindcss
npm install axios
npm install ajv@^8.0.0


To start application:
----------------------------------------------------------------------------------------------------------------------------------------------------
npm start


Features:
-----------------------------------------------------------------------------------------------------------------------------------------------------
Api chaning:
First, make a GET request to the usersdata endpoint.
Once the data is received, update the application state with it.
Clicking on a specific user in the table automatically imports the user’s ID into the POST request body.
The ID can also be manually edited.
Completing the form fills out the remaining fields of the POST request body.
Clicking the POST button sends a POST request to the appropriate endpoint.
If the request is successful, a response is shown, and the ID of the post is automatically imported into the GET request body.
This post ID can also be manually changed.
Clicking the "Get Comments" button displays all comments related to that post.




dealing with edge cases:
------------------------------------------------------------------------------------------------------------------------------------------------
If no text is entered and the POST button is clicked, an error message is displayed.
If an invalid number is entered in the userID field, a warning prompts the user to enter a valid number.


issues:
-------------------------------------------------------------------------------------------------------------------------------------------------
The document lacks clarity on API chaining, causing issues with seeing updated data in the GET request, even though the data is successfully uploaded.
Regarding comments:
Newly created posts will not have any comments.
There is no permission to create a new comment on respective post.
To tackle this ,seperately no comments view is created.
