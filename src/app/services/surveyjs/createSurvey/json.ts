export const json = {
  "title": "Create Invoice",
  "description": "Fill in details to create an invoice",
  "completedHtml": "Invoice created!",
  "completedBeforeHtml": "You have already made an invoice.",
  "completedHtmlOnCondition": [
    {}
  ],
  "loadingHtml": "Loading invoice creator...",
  "pages": [
    {
      "name": "page1",
      "title": "New Invoice",
      "description": "Enter invoice details:",
      "elements": [
        {
          "type": "text",
          "name": "titleOfInvoice",
          "title": "Title of Invoice:",
          "isRequired": true
        },
        {
          "type": "panel",
          "name": "yourCompany",
          "title": "Your Company:",
          "elements": [
            {
              "type": "text",
              "name": "nameOfYourCompany",
              "title": "Name of YOUR company:",
              "placeholder": "My company Ltd"
            },
            {
              "type": "text",
              "name": "yourName",
              "title": "Name",
              "isRequired": true,
              "autocomplete": "given-name"
            },
            {
              "type": "text",
              "name": "yourSurname",
              "startWithNewLine": false,
              "title": "Surname",
              "isRequired": true,
              "autocomplete": "family-name"
            },
            {
              "type": "text",
              "name": "yourAddress",
              "title": "Address:",
              "autocomplete": "address-line1",
              "placeholder": "10 Downing Street"
            },
            {
              "type": "text",
              "name": "yourCity",
              "startWithNewLine": false,
              "title": "City:"
            },
            {
              "type": "text",
              "name": "yourPostCode",
              "startWithNewLine": false,
              "title": "Post Code:",
              "autocomplete": "postal-code"
            },
            {
              "type": "text",
              "name": "yourEmail",
              "title": "Email:",
              "inputType": "email"
            },
            {
              "type": "text",
              "name": "phoneNumber",
              "startWithNewLine": false,
              "title": "Phone Number:",
              "inputType": "tel"
            }
          ]
        },
        {
          "type": "panel",
          "name": "billTo",
          "title": "Bill To:",
          "description": "Details of the invoice recipient.",
          "elements": [
            {
              "type": "text",
              "name": "companyName",
              "title": "Company Name:"
            },
            {
              "type": "text",
              "name": "clientName",
              "title": "Client Name:"
            },
            {
              "type": "text",
              "name": "clientAddress",
              "title": "Address:",
              "autocomplete": "address-line1"
            },
            {
              "type": "text",
              "name": "clientCity",
              "startWithNewLine": false,
              "title": "City:"
            },
            {
              "type": "text",
              "name": "clientPostCode",
              "startWithNewLine": false,
              "title": "Post Code:",
              "autocomplete": "postal-code"
            },
            {
              "type": "text",
              "name": "clientEmail",
              "title": "Email:",
              "inputType": "email",
              "autocomplete": "email"
            }
          ]
        },
        {
          "type": "panel",
          "name": "invoiceDetails",
          "title": "Invoice Details:",
          "description": "Invoice number and dates.",
          "elements": [
            {
              "type": "text",
              "name": "referenceNumber",
              "title": "Reference Number:",
              "isRequired": true,
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "issueDate",
              "startWithNewLine": false,
              "title": "Issue Date:",
              "isRequired": true,
              "inputType": "date"
            },
            {
              "type": "text",
              "name": "dueDate",
              "startWithNewLine": false,
              "title": "Due Date:",
              "inputType": "date"
            }
          ]
        },
        {
          "type": "panel",
          "name": "invoiceCalculation",
          "title": "Invoice Calculation",
          "description": "Please enter the the items included in the invoice to calculate a total.",
          "elements": [
            {
              "type": "matrixdynamic",
              "name": "invoiceItems",
              "title": "Invoice Items",
              "columns": [
                {
                  "name": "id",
                  "cellType": "expression",
                  "readOnly": true,
                  "visible": false,
                  "expression": "{rowIndex}"
                },
                {
                  "name": "description",
                  "title": "Description",
                  "cellType": "text"
                },
                {
                  "name": "price",
                  "title": "Price (in £)",
                  "cellType": "text",
                  "width": "100px",
                  "inputType": "number",
                  "min": 0
                },
                {
                  "name": "quantity",
                  "title": "Quantity",
                  "cellType": "text",
                  "width": "100px",
                  "inputType": "number",
                  "min": 1,
                  "step": 1
                },
                {
                  "name": "amount",
                  "title": "Amount (in £)",
                  "cellType": "expression",
                  "readOnly": true,
                  "width": "200px",
                  "totalType": "sum",
                  "totalFormat": "Total : {0}",
                  "totalDisplayStyle": "currency",
                  "totalCurrency": "GBP",
                  "expression": "{row.price} * {row.quantity}",
                  "displayStyle": "currency",
                  "currency": "GBP"
                }
              ],
              "choices": [
                1,
                2,
                3,
                4,
                5
              ],
              "cellType": "text",
              "rowCount": 1,
              "maxRowCount": 20
            },
            {
              "type": "text",
              "name": "vatPercentage",
              "title": "VAT (in %)",
              "defaultValue": 20,
              "inputType": "number",
              "textUpdateMode": "onTyping",
              "min": 0,
              "max": 40
            },
            {
              "type": "expression",
              "name": "vatTotal",
              "startWithNewLine": false,
              "title": "VAT",
              "expression": "{invoiceItems-total.amount} * {vatPercentage} / 100",
              "displayStyle": "currency",
              "currency": "GBP"
            },
            {
              "type": "expression",
              "name": "finalTotal",
              "startWithNewLine": false,
              "title": "Final Total",
              "expression": "{invoiceItems-total.amount} + {vatTotal}",
              "displayStyle": "currency",
              "currency": "GBP"
            }
          ]
        },
        {
          "type": "panel",
          "name": "bankDetails",
          "title": "Bank Details",
          "description": "Please enter your account details where the invoice will be paid into.",
          "elements": [
            {
              "type": "text",
              "name": "bankSortCode",
              "title": "Bank Sort Code:",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "bankAccountNumber",
              "startWithNewLine": false,
              "title": "Bank Account Number:",
              "inputType": "number"
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
  "textUpdateMode": "onTyping",
  "completeText": "Generate Invoice",
  "headerView": "advanced"
}