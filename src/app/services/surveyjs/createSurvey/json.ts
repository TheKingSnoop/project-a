export const json = {
  "title": "Create Invoice",
  "description": "Fill in details to create an invoice",
  "completedHtml": "Generating Invoice...\nPlease wait.",
  "completedBeforeHtml": "You have already made an invoice.",
  "completedHtmlOnCondition": [
    {}
  ],
  "loadingHtml": "Loading invoice creator...",
  "pages": [
    {
      "name": "page1",
      "description": "Enter invoice title:",
      "elements": [
        {
          "type": "panel",
          "name": "invoiceTitle",
          "title": "Invoice Title",
          "elements": [
            {
              "type": "text",
              "name": "titleOfInvoice",
              "title": "Title of Invoice:",
              "isRequired": true
            }
          ]
        }
      ]
    },
    {
      "name": "page2",
      "description": "Enter your details:",
      "elements": [
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
              "autocomplete": "street-address",
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
        }
      ]
    },
    {
      "name": "page3",
      "description": "Enter client details:",
      "elements": [
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
              "autocomplete": "street-address"
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
        }
      ]
    },
    {
      "name": "page4",
      "description": "Enter invoice details:",
      "elements": [
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
        }
      ]
    },
    {
      "name": "page5",
      "description": "Enter invoice calculation details:",
      "elements": [
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
              "name": "vat",
              "startWithNewLine": false,
              "title": "VAT",
              "expression": "{invoiceItems-total.amount} * {vatPercentage} / 100",
              "displayStyle": "currency",
              "currency": "GBP"
            },
            {
              "type": "expression",
              "name": "question13",
              "startWithNewLine": false,
              "title": "Final Total",
              "expression": "{invoiceItems-total.amount} + {vat}",
              "displayStyle": "currency",
              "currency": "GBP"
            }
          ]
        }
      ]
    },
    {
      "name": "page6",
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
              "name": "sortCode",
              "title": "Sort Code:",
              "inputType": "number"
            },
            {
              "type": "text",
              "name": "accountNumber",
              "startWithNewLine": false,
              "title": "Account Number:",
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
    },
    {
      "name": "page7",
      "description": "Summary of Invoice:",
      "elements": [
        {
          "type": "panel",
          "name": "summaryTitlePanel",
          "title": "Invoice Title:",
          "elements": [
            {
              "type": "expression",
              "name": "summaryTitle",
              "title": "Title:",
              "expression": "{titleOfInvoice}"
            }
          ]
        },
        {
          "type": "panel",
          "name": "summaryYourCompanyPanel",
          "title": "Your Details:",
          "elements": [
            {
              "type": "expression",
              "name": "summaryNameOfYourCompany",
              "title": "Name Of Your Company:",
              "expression": "{nameOfYourCompany}"
            },
            {
              "type": "expression",
              "name": "question2",
              "startWithNewLine": false,
              "title": "Your Name:",
              "expression": "{yourName}"
            },
            {
              "type": "expression",
              "name": "summaryYourSurname",
              "startWithNewLine": false,
              "title": "Your Surname:",
              "expression": "{yourSurname}"
            },
            {
              "type": "expression",
              "name": "summaryYourAddress",
              "title": "Your Address:",
              "expression": "{yourAddress}"
            },
            {
              "type": "expression",
              "name": "summaryYourPostCode",
              "startWithNewLine": false,
              "title": "Your Post Code:",
              "expression": "{yourPostCode}"
            },
            {
              "type": "expression",
              "name": "summaryYourCity",
              "startWithNewLine": false,
              "title": "Your City:",
              "expression": "{yourCity}"
            },
            {
              "type": "expression",
              "name": "summaryYourEmail",
              "title": "Your Email:",
              "expression": "{yourEmail}"
            },
            {
              "type": "expression",
              "name": "yourPhoneNumber",
              "startWithNewLine": false,
              "title": "Phone Number:",
              "expression": "{phoneNumber}"
            }
          ]
        },
        {
          "type": "panel",
          "name": "summaryBillToPanel",
          "title": "Bill To:",
          "elements": [
            {
              "type": "expression",
              "name": "summaryCompanyName",
              "title": "Company Name:",
              "expression": "{companyName}"
            },
            {
              "type": "expression",
              "name": "summaryClientName",
              "startWithNewLine": false,
              "title": "Client Name:",
              "expression": "{clientName}"
            },
            {
              "type": "expression",
              "name": "summaryClientAddress",
              "title": "Client Address:",
              "expression": "{clientAddress}"
            },
            {
              "type": "expression",
              "name": "summaryClientCity",
              "startWithNewLine": false,
              "title": "Client City:",
              "expression": "{clientCity}"
            },
            {
              "type": "expression",
              "name": "summaryClientPostCode",
              "startWithNewLine": false,
              "title": "Client Post Code:",
              "expression": "{clientPostCode}"
            },
            {
              "type": "expression",
              "name": "summaryClientEmail",
              "title": "Client Email:",
              "expression": "{clientEmail}"
            }
          ]
        },
        {
          "type": "panel",
          "name": "summaryInvoiceDetailsPanel",
          "title": "Invoice Details:",
          "elements": [
            {
              "type": "expression",
              "name": "summaryReferenceNumber",
              "title": "Reference Number:",
              "expression": "{referenceNumber}"
            },
            {
              "type": "expression",
              "name": "summaryIssueDate",
              "startWithNewLine": false,
              "title": "Issue Date:",
              "expression": "{issueDate}",
              "displayStyle": "date"
            },
            {
              "type": "expression",
              "name": "summaryDueDate",
              "startWithNewLine": false,
              "title": "Due Date:",
              "expression": "{DueDate}",
              "displayStyle": "date"
            }
          ]
        },
        {
          "type": "panel",
          "name": "summaryInvoiceDetails",
          "title": "Invoice Calculation",
          "elements": [
            {
              "type": "expression",
              "name": "summarytotal",
              "title": "Total:",
              "expression": "{invoiceItems-total.amount}",
              "displayStyle": "currency",
              "currency": "GBP"
            },
            {
              "type": "expression",
              "name": "question6",
              "startWithNewLine": false,
              "title": "Final Total",
              "expression": "{invoiceItems-total.amount} + {vat}",
              "displayStyle": "currency",
              "currency": "GBP"
            }
          ]
        },
        {
          "type": "panel",
          "name": "summaryBankDetailsPanel",
          "title": "Bank Details:",
          "elements": [
            {
              "type": "expression",
              "name": "summarySortCode",
              "title": "Sort Code:",
              "expression": "{sortCode}"
            },
            {
              "type": "expression",
              "name": "summaryAccountNumber",
              "startWithNewLine": false,
              "title": "Account Number:",
              "expression": "{accountNumber}"
            },
            {
              "type": "expression",
              "name": "summaryBankName",
              "startWithNewLine": false,
              "title": "Bank Name:",
              "expression": "{bankName}"
            }
          ]
        }
      ]
    }
  ],
  "showProgressBar": true,
  "textUpdateMode": "onTyping",
  "completeText": "Generate Invoice",
  "headerView": "advanced"
}