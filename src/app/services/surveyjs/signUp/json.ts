export const json = {
  "title": "Sign Up",
  "description": "Create an account",
  "completedHtml": "<h3>Thank you {firstName} for signing up!</h3>\n<br>\n<p>Your account has been created successfully. You will receive a confirmation email shortly.</p>",
  "completedBeforeHtml": "You have already signed up.",
  "loadingHtml": "Loading Sign Up form...",
  "pages": [
    {
      "name": "page1",
      "description": "Account Details:",
      "elements": [
        {
          "type": "panel",
          "name": "accountData",
          "title": "Account Details:",
          "elements": [
            {
              "type": "radiogroup",
              "name": "title",
              "title": "Title:",
              "isRequired": true,
              "choices": [
                {
                  "value": "mr",
                  "text": "Mr"
                },
                {
                  "value": "ms",
                  "text": "Ms"
                },
                {
                  "value": "mrs",
                  "text": "Mrs"
                },
                {
                  "value": "dr",
                  "text": "Dr"
                }
              ],
              "colCount": 5
            },
            {
              "type": "text",
              "name": "firstName",
              "title": "First Name:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "surname",
              "startWithNewLine": false,
              "title": "Surname:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "email",
              "title": "Email:",
              "isRequired": true,
              "inputType": "email"
            },
            {
              "type": "text",
              "name": "password",
              "title": "Password:",
              "isRequired": true,
              "inputType": "password"
            },
            {
              "type": "text",
              "name": "confirmPassword",
              "startWithNewLine": false,
              "title": "Confirm Password",
              "isRequired": true
            }
          ]
        }
      ]
    }
  ],
  "headerView": "advanced"
}