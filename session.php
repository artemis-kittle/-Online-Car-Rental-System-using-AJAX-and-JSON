<?php
// Start the session
session_start();

// Check if the cart items are stored in the session
if (isset($_SESSION['cartItems'])) {
  $cartItems = $_SESSION['cartItems'];
} else {
  $cartItems = [];
}

// Rest of your existing PHP code...
// ...

// Update the updateCart() function in PHP to store cart items in the session
function updateCart() {
  // Your existing code...

  // Store cart items in the session
  $_SESSION['cartItems'] = $cartItems;
}

// Other existing PHP code...
// ...
?>
