export const json = {
  "title": "Log in",
  "description": "Fill in details to log into your account",
  "completedHtml": "Logging into your account",
  "completedBeforeHtml": "You are already logged in.",
  "loadingHtml": "Loading login..",
  "pages": [
    {
      "name": "page1",
      "elements": [
        {
          "type": "panel",
          "name": "panel",
          "elements": [
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
              "inputType": "password",
              "autocomplete": "current-password"
            }
          ]
        }
      ]
    }
  ],
  "completeText": "Log in",
  "headerView": "advanced"
}