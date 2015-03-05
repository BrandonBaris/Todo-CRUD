$(function(){
var mouse_out = true;
$("li#todo_item").mouseenter(function(){
  mouse_out = false;
  $(this).find("p").slideDown(200);
  // console.log(mouse_out);
});
$("li#todo_item").mouseleave(function(){
  mouse_out = true;
    setTimeout(function(){
      if (mouse_out === true){
        $("p").slideUp(200);
      }
    }, 2000);
});

function countChecks() {
  var checked = 0;
  var totalItem = 0;
  var checkDifference = 0;
  checked = $("input#check_stat:checked").length;
  totalItem = $("input").length;
  checkDifference = totalItem - checked;
  // console.log('checked',checked);
  // console.log('totalItem',totalItem);
  // console.log('checkDifference',checkDifference);
  var buildCounter = document.getElementById('counter').innerHTML = "<span class='checked_num'>" + checked + "</span>COMPLETE <span class='diff_num'>" + checkDifference + "</span>INCOMPLETE ";
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
  countChecks();
  $("p").slideToggle(200);
});

}); //end closurex
