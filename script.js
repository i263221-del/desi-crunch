document.addEventListener("DOMContentLoaded", function() {
  var tables = document.querySelectorAll("table");

  tables.forEach(function(table) {
    var headerRow = table.querySelector("tr");
    if (headerRow) {
      var th = document.createElement("th");
      th.textContent = "Action";
      headerRow.appendChild(th);
    }

    var rows = table.querySelectorAll("tr");
    for (var i = 1; i < rows.length; i++) {
      var row = rows[i];
      var itemName = row.cells[0].textContent.trim();

      var button = document.createElement("button");
      button.textContent = "Confirm Your Order";
      button.onclick = (function(name) {
        return function() {
          console.log("Order confirmed: " + name);
          window.alert(name + " order has been confirmed!");
        };
      })(itemName);

      var td = document.createElement("td");
      td.appendChild(button);
      row.appendChild(td);
    }
  });
});