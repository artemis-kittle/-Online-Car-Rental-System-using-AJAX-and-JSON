$(document).ready(function() {
    var cartItems = []; // Array to store selected cars
  
    // Load cars data from cars.json
    $.ajax({
      url: 'cars.json',
      dataType: 'json',
      success: function(data) {
        $.each(data, function(index, car) {
          // Create HTML for each car
          var carHTML = '<div class="car">';
          carHTML += '<img src="' + car.image + '" alt="' + car.brand + ' ' + car.model + '">';
          carHTML += '<h2>' + car.brand + ' ' + car.model + '</h2>';
          carHTML += '<p><strong>Type:</strong> ' + car.type + '</p>';
          carHTML += '<p><strong>Availability:</strong> ' + car.availability + '</p>';
          carHTML += '<p><strong>Model Year:</strong> ' + car.model_year + '</p>';
          carHTML += '<p><strong>Mileage:</strong> ' + car.mileage + '</p>';
          carHTML += '<p><strong>Fuel Type:</strong> ' + car.fuel_type + '</p>';
          carHTML += '<p><strong>Seats:</strong> ' + car.seats + '</p>';
          carHTML += '<p><strong>Price per Day:</strong> $' + car.price_per_day + '</p>';
          carHTML += '<p><strong>Description:</strong> ' + car.description + '</p>';
          // carHTML += '<button class="add-to-cart" data-price="' + car.price_per_day + '" data-id="' + index + '" >Add to Cart</button>';
          // carHTML += '<button class="add-to-cart" data-price="' + car.price_per_day + '" data-id="' + index + '" id="addtocartButton_' + index + '" onclick="disable(' + index + ')"' + (car.availability === 'no' ? ' disabled' : '') + '>Add to Cart</button>';
          carHTML += '<button class="add-to-cart" data-price="' + car.price_per_day + '" data-id="' + index + '" ' + (car.availability === 'no' ? 'disabled' : '') + '>Add to Cart</button>';
          carHTML += '</div>';
  
          // Append the car HTML to the car-list container
          $('#car-list').append(carHTML);
        });

        function disable() {
          var myButton = document.getElementById("addtocartButton");
        
          if (car.availability.toLowerCase() === "no") {
            myButton.disabled = true;
          } else {
            myButton.disabled = false;
          }
        }
  
        // Add event listener to "Add to Cart" buttons
        $('.add-to-cart').on('click', function() {
          var carId = $(this).data('id');
          var price = parseFloat($(this).data('price'));
          var days = 1; // Default number of days for rent
  
          // Create cart item object
          var cartItem = {
            carId: carId,
            price: price,
            days: days
          };
  
          // Check if the car is already in the cart
          var existingCartItem = cartItems.find(function(item) {
            return item.carId === carId;
          });
  
          if (existingCartItem) {
            existingCartItem.days += days; // Increase the number of days if the car is already in the cart
          } else {
            cartItems.push(cartItem); // Add the car to the cart items array
            // car.availability = "no";// Update the availbility
          }
  
          updateCart(); // Update cart display
        });
  
        // Checkout button click event
        $('#checkout').on('click', function() {
          if (cartItems.length === 0) {
            alert('Cart is empty!');
          } else {
            var totalAmount = 200;
            var checkoutDetails = '';
  
            // Calculate total amount and build checkout details
            checkoutDetails += 'You have not booked a car in the past 3 months. A bond amount of $200 is applicable.'+'\n';
            checkoutDetails += 'Bond Amount = $200'
              checkoutDetails += '\n';
              checkoutDetails += '\n';
            $.each(cartItems, function(index, item) {
              var car = data[item.carId];
              var amount = item.price * item.days;
              totalAmount += amount;
              checkoutDetails += car.brand + ' ' + car.model + ' (' + item.days + ' days)' ;
              checkoutDetails += '\n' ;
              checkoutDetails += '$' + item.price.toFixed(2) + ' x ' + item.days + ' days = $' + amount.toFixed(2) + '\n';
              checkoutDetails += '\n' ;
              checkoutDetails += '\n' ;
            });
  
            // Display checkout modal
            $('#checkout-details').text(checkoutDetails);
            $('#total-amount-modal').text('Total Amount: $' + totalAmount.toFixed(2));
            $('#checkout-modal').show();
          }
        });
  
        // Confirm checkout button click event
        $('#confirm-checkout').on('click', function() {
          if (cartItems.length === 0) {
            alert('Cart is empty!');
          } else {
            var totalAmount = 0;
            var checkoutDetails = '';
  
            // Calculate total amount and build checkout details
            $.each(cartItems, function(index, item) {
              var car = data[item.carId];
              var amount = item.price * item.days;
              totalAmount += amount + 200;
              checkoutDetails += 'Bond Amount = $200';
              checkoutDetails += '\n';
              checkoutDetails += car.brand + ' ' + car.model + ' (' + item.days + ' days)' ;
              checkoutDetails += '$' + item.price.toFixed(2) + ' x ' + item.days + ' days = $' + amount.toFixed(2) + '\n';
            });
  
            // Display checkout details and total amount
            alert('Checkout Details:\n\n' + checkoutDetails + '\nTotal Amount: $' + totalAmount.toFixed(2));
  
            // Clear cart items
            cartItems = [];
            updateCart(); // Update cart display
  
            // Hide checkout modal
            $('#checkout-modal').hide();
          }
        });
  
        // Increase days button click event
        $('#cart-items').on('click', '.increase-days', function() {
          var carId = $(this).data('id');
          var cartItem = cartItems.find(function(item) {
            return item.carId === carId;
          });
  
          if (cartItem) {
            cartItem.days++;
            updateCart(); // Update cart display
          }
        });
  
        // Decrease days button click event
        $('#cart-items').on('click', '.decrease-days', function() {
          var carId = $(this).data('id');
          var cartItem = cartItems.find(function(item) {
            return item.carId === carId;
          });
  
          if (cartItem) {
            cartItem.days--;
            if (cartItem.days < 1) {
              cartItem.days = 1;
            }
            updateCart(); // Update cart display
          }
        });
  
        // Remove button click event
        $('#cart-items').on('click', '.remove-button', function() {
          var carId = $(this).data('id');
          cartItems = cartItems.filter(function(item) {
            return item.carId !== carId;
          });
          updateCart(); // Update cart display
        });
  
        // Function to update cart display
        function updateCart() {
          var totalAmount = 0;
  
          // Create HTML for each cart item
          var cartHTML = cartItems.map(function(item) {
            var car = data[item.carId];
            var amount = item.price * item.days;
            totalAmount += amount;
  
            var itemHTML = '<li class="cart-item">';
            itemHTML += '<img src="' + car.image + '" alt="' + car.brand + ' ' + car.model + '">';
            itemHTML += '<span>' + car.brand + ' ' + car.model + '</span>';
            itemHTML += '<button class="action-button decrease-days" data-id="' + item.carId + '">-</button>';
            itemHTML += '<input class="days-input" type="number" value="' + item.days + '" readonly>';
            itemHTML += '<button class="action-button increase-days" data-id="' + item.carId + '">+</button>';
            itemHTML += '</li>';
            itemHTML += '<li>';
            itemHTML += '<span>$' + amount.toFixed(2) + '</span>      ';
            itemHTML += '<button style= "background-color: #FF0000; color: white; border: none; padding: 4px 8px;text-align: center;text-decoration: none;display: inline-block;font-size: 12px; cursor: pointer;" class="remove-button" data-id="' + item.carId + '">Remove</button>';
            itemHTML += '</li>';
            itemHTML += '<br>';
  
            return itemHTML;
          }).join('');
  
          // Update cart items and total amount display
          $('#cart-items').html(cartHTML);
          $('#total-amount').text('Total Amount: $' + totalAmount.toFixed(2));
          $('#total-amount-modal').text('Total Amount: $' + totalAmount.toFixed(2));
        }
  
      },
      error: function() {
        alert('Error loading cars data.');
      }
    });
  });
  