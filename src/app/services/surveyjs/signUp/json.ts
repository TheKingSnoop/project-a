export const json = {
  "title": "Sign Up",
  "description": "Please fill in details to create an account.",
  "completedHtml": "<h3>Thank you {name} for signing up!</h3>\\n<br>\\n<p>Your account has been created successfully. You will receive a confirmation email shortly.</p>",
  "completedBeforeHtml": "You have already created an account.",
  "loadingHtml": "Loading Sign Up...",
  "pages": [
    {
      "name": "page1",
      "description": "Account details",
      "elements": [
        {
          "type": "panel",
          "name": "panel1",
          "maxWidth": "1000px",
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
              "colCount": 4
            },
            {
              "type": "text",
              "name": "name",
              "title": "Name:",
              "isRequired": true,
              "autocomplete": "given-name"
            },
            {
              "type": "text",
              "name": "surname",
              "startWithNewLine": false,
              "title": "Surname:",
              "isRequired": true,
              "autocomplete": "family-name"
            },
            {
              "type": "text",
              "name": "email",
              "title": "Email:",
              "isRequired": true,
              "inputType": "email",
              "autocomplete": "email"
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
              "title": "Confirm Password:",
              "isRequired": true,
              "validators": [
                {
                  "type": "expression"
                }
              ],
              "inputType": "password"
            }
          ]
        }
      ]
    }
  ],
  "completeText": "Sign Up",
  "widthMode": "static",
  "headerView": "advanced"
}