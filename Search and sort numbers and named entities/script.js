// Function to sort integer arrays
function sortIntegerArray() {
    const arrayStr = $('#intArray').val();
    const array = arrayStr.split(',').map(Number);
    array.sort((a, b) => a - b);
    $('#intArrayResult').text(`Sorted Integer Array: ${array.join(', ')}`);
}

// Function to search an integer in the array
function searchIntegerArray() {
    const arrayStr = $('#intArray').val();
    const array = arrayStr.split(',').map(Number);
    const searchInt = parseInt($('#searchInt').val());
    const index = array.indexOf(searchInt);
    const result = index >= 0 ? `Integer ${searchInt} found at index ${index}` : `Integer ${searchInt} not found`;
    $('#intArrayResult').text(result);
}

// Function to sort named entities arrays
function sortNamedEntitiesArray() {
    const arrayStr = $('#namedEntitiesArray').val();
    const array = arrayStr.split(',');
    array.sort();
    $('#namedEntitiesArrayResult').text(`Sorted Named Entities Array: ${array.join(', ')}`);
}

// Function to search a name in the named entities array
function searchNamedEntitiesArray() {
    const arrayStr = $('#namedEntitiesArray').val();
    const array = arrayStr.split(',');
    const searchName = $('#searchName').val();
    const index = array.indexOf(searchName);
    const result = index >= 0 ? `Name ${searchName} found at index ${index}` : `Name ${searchName} not found`;
    $('#namedEntitiesArrayResult').text(result);
}

// Attach event listeners to buttons
$('#sortIntArray').click(sortIntegerArray);
$('#searchIntArray').click(searchIntegerArray);
$('#sortNamedEntitiesArray').click(sortNamedEntitiesArray);
$('#searchNamedEntitiesArray').click(searchNamedEntitiesArray);
