export const json = {
  "title": "Add a client",
  "description": "Add client details to save in your account",
  "completedHtml": "Details Updated!",
  "completedBeforeHtml": "",
  "loadingHtml": "Loading Edit My Details Page..",
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
              "name": "companyName",
              "title": "Company Name:"
            },
            {
              "type": "text",
              "name": "firstName",
              "title": "First Name:",
              "autocomplete": "given-name"
            },
            {
              "type": "text",
              "name": "surname",
              "startWithNewLine": false,
              "title": "Surname:",
              "autocomplete": "family-name"
            },
            {
              "type": "text",
              "name": "address",
              "title": "Address:",
              "autocomplete": "address-line1"
            },
            {
              "type": "text",
              "name": "city",
              "title": "City:"
            },
            {
              "type": "text",
              "name": "postCode",
              "startWithNewLine": false,
              "title": "Postcode:"
            },
            {
              "type": "text",
              "name": "email",
              "title": "Email:",
              "inputType": "email",
              "autocomplete": "email"
            }
          ]
        }
      ]
    }
  ],
  "headerView": "advanced"
}