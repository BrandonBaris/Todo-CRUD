$(function(){

function countChecks() {
  var checked = 0;
  var totalItem = 0;
  var checkDifference = 0;
  checked = $("input#check_stat:checked").length;
  totalItem = $("input").length;
  checkDifference = totalItem - checked;
  console.log('checked',checked);
  console.log('totalItem',totalItem);
  console.log('checkDifference',checkDifference);
  var buildCounter = document.getElementById('counter').innerHTML = " CHECKED " + checked + " INCOMPLETE: " + checkDifference;
  return buildCounter;
}

$("input#check_stat").on("change", function (){
  var todoId = $(this).val();
  countChecks();

  if ($(this).prop('checked')){
    $.ajax({
      url: '/todos/' + todoId + '/complete',
      type : 'PUT'
    });
  } else {
    $.ajax({
      url: '/todos/' + todoId + '/incomplete',
      type : 'PUT'
    });
  }
});

$( window ).load(function() {
  countChecks(function() {
  });
});

}); //end closurex
