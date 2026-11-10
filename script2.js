<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Cafe Menu - Menu</title>
    <link rel="stylesheet" href="style.css">
</head>
<body id="menu-page">
    <nav>
        <a href="index.html">Home</a>
        <a href="menu.html">Menu</a>
        <a href="billing.html">Billing</a>
        <a href="contact.html">Contact Us</a>
    </nav>

    <h1 style="text-align:center; color:#4a2c11;">OUR MENU</h1>

    <div style="text-align:center; margin-bottom: 30px;">
        <button id="toggle-menu-btn" style="font-size: 18px; padding: 12px 24px;">Show Menu</button>
    </div>

    <div id="menu-items-container" style="display: none;">
        <div class="menu-section">
            <img src="pic1.jpg" alt="Snacks" width="500" height="333">
            <table>
              <tr>
                <th>Snacks</th>
                <th>Price</th>
              </tr>
              <tr>
                <td>Samosa</td>
                <td>RS: 50</td>
              </tr>
              <tr>
                <td>Gol gappy</td>
                <td>RS: 150</td>
              </tr>
              <tr>
                <td>Chat</td>
                <td>RS: 100</td>
              </tr>
            </table>
        </div>

        <div class="menu-section">
            <img src="pic2.jpg" alt="Drinks" width="500" height="333">
            <table>
              <tr>
                <th>Drinks</th>
                <th>Price</th>
              </tr>
              <tr>
                <td>Tea</td>
                <td>RS: 50</td>
              </tr>
              <tr>
                <td>Juice</td>
                <td>RS: 100</td>
              </tr>
              <tr>
                <td>Shake</td>
                <td>RS: 150</td>
              </tr>
            </table>
        </div>
    </div>

    <script src="script.js"></script>
</body>
</html>