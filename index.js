const express = require("express");
const cors = require("cors");

const app = express();
const port = 5178;

const items = require("./modules/item_module");
const employees = require("./modules/employees_module");
const invoices = require("./modules/invoice_module");
const departments = require("./modules/department_module");
const replacements = require("./modules/replacement_module");
const payments = require("./modules/payment_module");
const users = require("./modules/user_module");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.status(200).send("Server connected!");
});

// DEVICES REQUESTS
app.get("/items", (req, res) => {
  items
    .getItems()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/new", (req, res) => {
  items
    .getNewItems(req.query.locId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/items", (req, res) => {
  items
    .addItem(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items", (req, res) => {
  items
    .updateItem(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/deactive/:id", (req, res) => {
  items
    .deactiveItemById(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/lastcode", (req, res) => {
  items
    .getLastItemCode(req.query.status)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/departments", (req, res) => {
  items
    .getItemsByDepartmentId(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/filter", (req, res) => {
  items
    .filterItems(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/search", (req, res) => {
  items
    .getItemsBySearch(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// REPLACEMENTS REQUESTS
app.get("/items/replacements", (req, res) => {
  replacements
    .getReplacements(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/items/replacements", (req, res) => {
  replacements
    .addReplacement(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/replacements", (req, res) => {
  replacements
    .putReplacement(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/items/replacements/:id", (req, res) => {
  replacements
    .deleteReplacement(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/replacements/filter", (req, res) => {
  replacements
    .getReplByDateRange(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/replacements/search", (req, res) => {
  replacements
    .getReplBySearch(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/replacements/item", (req, res) => {
  replacements
    .getReplByItemId(req.query.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// INVOICES REQUESTS
app.get("/items/invoices", (req, res) => {
  invoices
    .getInvoices()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/invoices", (req, res) => {
  invoices
    .updateInvoice(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/items/invoices", (req, res) => {
  invoices
    .addInvoice(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/items/invoices/:id", (req, res) => {
  invoices
    .deleteInvoice(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/invoices/codes", (req, res) => {
  invoices
    .getInvoiceDocCodes()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/invoices/search", (req, res) => {
  invoices
    .getInvoiceBySearch(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/invoices/filter", (req, res) => {
  invoices
    .getInvoiceByRange(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/invoices/payment", (req, res) => {
  invoices
    .getNonPaymentInvoices(req.query.status)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/invoices/item", (req, res) => {
  invoices
    .getInvoicesByItemId(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// TYPES REQUESTS
app.get("/items/types", (req, res) => {
  items
    .getItemTypes()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/items/types", (req, res) => {
  items
    .addItemType(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/types", (req, res) => {
  items
    .updateItemType(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// PAYMENTS REQUESTS
app.get("/items/payments", (req, res) => {
  payments
    .getPayments()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/search", (req, res) => {
  payments
    .getPaymentsBySearch(req.query.q)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/items/payments", (req, res) => {
  payments
    .addPayment(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/items/payments/bulk", (req, res) => {
  payments
    .addPaymentBulk(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/payments", (req, res) => {
  payments
    .updatePayment(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/payments/bulk", (req, res) => {
  payments
    .updatePaymentBulk(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/items/payments/:id", (req, res) => {
  payments
    .deletePayment(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/monthly/previous", (req, res) => {
  payments
    .getPreviousMonthPayments()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/filter", (req, res) => {
  payments
    .getPaymentsByDateRange(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/payments/lock", (req, res) => {
  payments
    .putPaymentLockStatus(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// FICHES REQUESTS

app.get("/items/payments/fiches", (req, res) => {
  payments
    .getFiches()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/items/payments/fiches", (req, res) => {
  payments
    .addFiche(req.body)
    .then((response) => {
      res.status(200).send(...response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/fiches/status", (req, res) => {
  payments
    .getFichesByStatus(req.query.q)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/items/payments/fiches/:id", (req, res) => {
  payments
    .removeFiche(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/fiches/search", (req, res) => {
  payments
    .getFichesBySearch(req.query.q)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/fiches/filter", (req, res) => {
  payments
    .getFichesByDateRange(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/payments/fiches/status", (req, res) => {
  payments
    .updateFicheStatus(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/fiches/amount", (req, res) => {
  payments
    .getTotalAmountByMonth(req.query)
    .then((response) => {
      res.status(200).send(...response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/fiches/code/last", (req, res) => {
  payments
    .getLastFicheCode()
    .then((response) => {
      res.status(200).send(...response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/fiches/monthly", (req, res) => {
  payments
    .getMonthlyFiches(req.query.locId)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/items/payments/fiches/lock", (req, res) => {
  payments
    .putFicheLockStatus(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/fiches/:id", (req, res) => {
  payments
    .getPaymentByFicheId(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/items/payments/:id", (req, res) => {
  payments
    .getPaymentById(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// DEPARTMENTS REQUESTS
app.get("/departments", (req, res) => {
  departments
    .getDepartments()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/regions", (req, res) => {
  departments
    .getRegions()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/departments", (req, res) => {
  departments
    .addDepartment(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/departments", (req, res) => {
  departments
    .updateDepartment(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// NUMBERS REQUESTS
app.get("/employees", (req, res) => {
  employees
    .getEmployees()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/employees/search", (req, res) => {
  employees
    .getEmployeeByValue(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/employees/numbers/:id", (req, res) => {
  employees
    .getNumberByEmployeeId(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.delete("/employees/:id", (req, res) => {
  employees
    .removeEmployee(req.params.id)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/employees", (req, res) => {
  employees
    .addEmployee(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/employees/numbers", (req, res) => {
  employees
    .addEmployeeNumber(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/employees", (req, res) => {
  employees
    .putEmployee(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/employees/numbers", (req, res) => {
  employees
    .putEmployeeNumber(req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

// USER
app.post("/login", (req, res) => {
  users
    .login(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/login/activity", (req, res) => {
  users
    .postLoginActivity(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.post("/logout/activity", (req, res) => {
  users
    .postLogoutActivity(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/users", (req, res) => {
  users
    .changePassword(req.query)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
