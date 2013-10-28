/* address-book.js
    this is where you will add your JavaScript to complete Lab 5
*/


/* sortObjArray()
    sorts an array of objects by a given property name
    the property values are compared using standard 
    operators, so this will work for string, numeric,
    boolean, or date values

    objArray        array of objects to sort
    propName        property name to sort by

    returns undefined (array is sorted in place)
*/
function sortObjArray(objArray, propName) {
    if (!objArray.sort)
        throw new Error('The objArray parameter does not seem to be an array (no sort method)');

    //sort the array supplying a custom compare function
    objArray.sort(function(a,b) {
        
        //note: this compares only one property of the objects
        //see the optional step where you can add support for 
        //a secondary sort key (i.e., sort by another property)
        //if the first property values are equal
        if (a[propName] < b[propName])
            return -1;
        else if (a[propName] === b[propName])
            return 0;
        else
            return 1;
    });
} //sortObjArray()

/*Render employee entries
    entries     array of contacts
*/
function render(entries) {
    var template = $(".template");
    var addressbook = $(".address-book");
    //for fade in effect
    addressbook.hide();
    //for different sorts
    addressbook.empty();

    //for each person in the passed array of entries
    entries.forEach(function(person){
        var cloned = template.clone();
        addressbook.append(cloned);
        //for each property of the person
        //key = property
        $.each(person, function(key, value) {
            //special case for pic property
            if (key != "pic"){
                cloned.find($("."+key)).html(value);
            }else{
                cloned.find($(".pic")).attr("src", value);
            }
        });
        //reviels the contact on the page
        cloned.removeClass("template");
    });
    addressbook.fadeIn("slow");
}

//Sorting event handler
$(".sort-ui .btn").click(function() {
    //clicked button
    var sortBtn = $(this);
    var clicked = sortBtn.attr("data-sortby");
    sortObjArray(Employees.entries, clicked);
    //Renders contacts with new sort order
    render(Employees.entries);

    //assignes active sort satsus to corresponding button
    sortBtn.siblings(".active").removeClass("active");
    sortBtn.addClass("active");
});

//On load
$(function() {
    //initail sorted list
    sortObjArray(Employees.entries, "last");
    render(Employees.entries);

    //Popovers
    $('.sort-ui .btn').popover({
        content: 'Click to Resort',
        container: 'body',
        trigger: 'hover',
        placement: 'bottom'
    });
});