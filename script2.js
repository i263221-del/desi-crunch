document.addEventListener("DOMContentLoaded", function() {
  
  if (document.getElementById("menu-page")) {
    
    var toggleBtn = document.getElementById("toggle-menu-btn");
    var menuContainer = document.getElementById("menu-items-container");
    
    if (toggleBtn && menuContainer) {
      toggleBtn.addEventListener("click", function() {
        if (menuContainer.style.display === "none") {
          menuContainer.style.display = "block";
          toggleBtn.textContent = "Hide Menu";
        } else {
          menuContainer.style.display = "none";
          toggleBtn.textContent = "Show Menu";
        }
      });
    }

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
        var itemPrice = parseInt(row.cells[1].textContent.replace(/\D/g, ''));

        var button = document.createElement("button");
        button.textContent = "Add to Order";
        
        button.onclick = (function(name, price) {
          return function() {
            var cart = JSON.parse(localStorage.getItem("cafeCart")) || [];
            cart.push({ name: name, price: price });
            localStorage.setItem("cafeCart", JSON.stringify(cart));
            
            window.alert(name + " has been added to your order!");
          };
        })(itemName, itemPrice);

        var td = document.createElement("td");
        td.appendChild(button);
        row.appendChild(td);
      }
    });
  }

  if (document.getElementById("billing-page")) {
    var container = document.getElementById("billing-container");
    var cart = JSON.parse(localStorage.getItem("cafeCart")) || [];

    if (cart.length === 0) {
      container.innerHTML = "<p style='font-size:18px; color:#3d2314;'>You haven't ordered anything yet.</p>";
      return;
    }

    var orderSummary = {};
    var totalAmount = 0;

    cart.forEach(function(item) {
      if (orderSummary[item.name]) {
        orderSummary[item.name].quantity += 1;
        orderSummary[item.name].subtotal += item.price;
      } else {
        orderSummary[item.name] = { 
          price: item.price, 
          quantity: 1, 
          subtotal: item.price 
        };
      }
      totalAmount += item.price;
    });

    var currentDate = new Date().toLocaleString();

    var receiptHTML = `
      <div style="background-color: #ffffff; width: 100%; max-width: 350px; margin: 0 auto; padding: 20px; border: 2px dashed #4a2c11; font-family: 'Courier New', Courier, monospace; text-align: left; color: #3d2314; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
        <h2 style="text-align: center; margin: 0; font-size: 24px;">CAFE MENU</h2>
        <p style="text-align: center; margin: 5px 0 20px 0; font-size: 14px;">Official Receipt</p>
        <p style="font-size: 12px; margin-bottom: 15px;">Date: ${currentDate}</p>
        <hr style="border: none; border-top: 1px dashed #4a2c11; margin-bottom: 15px;">
        
        <table style="width: 100%; border-collapse: collapse; background: none; margin: 0; font-family: 'Courier New', Courier, monospace;">
          <tr style="background: none;">
            <th style="text-align: left; border: none; padding: 0 0 10px 0; color: #3d2314; font-size: 14px; background: none;">Qty x Item</th>
            <th style="text-align: right; border: none; padding: 0 0 10px 0; color: #3d2314; font-size: 14px; background: none;">Amount</th>
          </tr>
    `;

    for (var itemName in orderSummary) {
      var item = orderSummary[itemName];
      receiptHTML += `
          <tr style="background: none;">
            <td style="border: none; padding: 5px 0; color: #3d2314; font-size: 14px;">${item.quantity} x ${itemName}</td>
            <td style="text-align: right; border: none; padding: 5px 0; color: #3d2314; font-size: 14px;">RS: ${item.subtotal}</td>
          </tr>
      `;
    }

    var serviceCharge = 0;
    var finalTotal = totalAmount + serviceCharge;

    receiptHTML += `
        </table>
        <hr style="border: none; border-top: 1px dashed #4a2c11; margin: 15px 0;">
        <div style="display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 5px;">
          <span>Subtotal:</span>
          <span>RS: ${totalAmount}</span>
        </div>
        <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; margin-top: 10px;">
          <span>TOTAL DUE:</span>
          <span>RS: ${finalTotal}</span>
        </div>
        <hr style="border: none; border-top: 1px dashed #4a2c11; margin: 15px 0;">
        <p style="text-align: center; font-size: 12px; margin: 0;">Thank you for your order!</p>
      </div>
    `;

    container.innerHTML = receiptHTML;

    var checkoutBtn = document.createElement("button");
    checkoutBtn.textContent = "Confirm & Pay";
    checkoutBtn.style.fontSize = "18px";
    checkoutBtn.style.padding = "10px 20px";
    checkoutBtn.style.marginTop = "25px";
    
    checkoutBtn.onclick = function() {
      // Displays the confirmation message along with the receipt without leaving the page
      var successMessage = `
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #4a2c11;">✅ Order Confirmed!</h1>
          <p style="font-size: 18px; color: #3d2314;">Thank you for your purchase. Here is a copy of your bill.</p>
        </div>
      `;
      
      var homeButton = `
        <div style="text-align: center; margin-top: 30px;">
          <button onclick="window.location.href='index.html'" style="background-color: #4a2c11; color: #ffffff; border: none; padding: 10px 20px; font-size: 16px; border-radius: 4px; cursor: pointer;">Return to Home</button>
        </div>
      `;
      
      // Overwrite the container with the success message, the bill, and a return button
      container.innerHTML = successMessage + receiptHTML + homeButton;
      
      // Clear the local storage so the cart is empty for the next visit
      localStorage.removeItem("cafeCart");
    };
    
    container.appendChild(checkoutBtn);
  }
});