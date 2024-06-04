<?php
// Retrieve the units from the POST request
$units = isset($_POST['units']) ? floatval($_POST['units']) : 0;

// Calculate the total bill 
function calculateBill($units)
{
    $totalBill = 0;

    if ($units <= 50) {
        $totalBill = $units * 3.5;
    } else if ($units <= 150) {
        $totalBill = 50 * 3.5 + ($units - 50) * 4.0;
    } else if ($units <= 250) {
        $totalBill = 50 * 3.5 + 100 * 4.0 + ($units - 150) * 5.2;
    } else {
        $totalBill = 50 * 3.5 + 100 * 4.0 + 100 * 5.2 + ($units - 250) * 6.5;
    }

    return $totalBill;
}

// Calculate the total bill and echo the result as JSON
$totalBill = calculateBill($units);
echo json_encode($totalBill);
