export const json = {
  "title": "Edit My Details",
  "description": "Update your account details.",
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
    },
    {
      "name": "page2",
      "description": "Enter bank account details where invoice will be paid into:",
      "elements": [
        {
          "type": "panel",
          "name": "bankDetails",
          "title": "Bank Details",
          "description": "Please enter your account details where the invoice will be paid into.",
          "elements": [
            {
              "type": "text",
              "name": "accountName",
              "title": "Account Name",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "sortCode",
              "startWithNewLine": false,
              "title": "Sort Code:",
              "isRequired": true
            },
            {
              "type": "text",
              "name": "accountNumber",
              "startWithNewLine": false,
              "title": "Account Number:",
              "isRequired": true,
              "validators": [
                {
                  "type": "expression"
                }
              ]
            },
            {
              "type": "text",
              "name": "bankName",
              "startWithNewLine": false,
              "title": "Bank Name:"
            }
          ]
        }
      ]
    }
  ],
  "headerView": "advanced"
}