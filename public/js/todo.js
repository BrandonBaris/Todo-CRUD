$(function(){
  var checked = 0;
  var totalItem = 0;
  var checkDifference = 0;
function countChecks() {

  checked = $("input#check_stat:checked").length;
  totalItem = $("input").length;
  checkDifference = totalItem - checked;
  console.log('checked',checked);
  console.log('totalItem',totalItem);
  console.log('checkDifference',checkDifference);
  return checked,totalItem,checkDifference;
}

$("input#check_stat").on("change", function (){
  var todoId = $(this).val();
  // console.log($(this).prop('checked'));
  countChecks();

  if ($(this).prop('checked')){
    $.ajax(
      '/todos/' + todoId + '/complete',{
      
      type : 'PUT'
    });
    } else {
    $.ajax(
      '/todos/' + todoId + '/incomplete',{
      type : 'PUT'
    });
  }
  
  // var checked = 0; 
  // var totalCheckBox = 0;
  // $("input#check_stat").each(function() {
  //   if ($(this).is(':checked')){
  //     checked++;
  //   }
  //   console.log('checked',checked);
  //   return checked;
  // });
  // $("input#check_stat").each(function() {
  //     totalCheckBox++;
    
  //   console.log('total',totalCheckBox);
  //   return totalCheckBox;
  // });
  // var checkDifference = totalCheckBox - checked;
  // console.log('notchecked',checkDifference);
});

$( window ).load(function() {
  countChecks();
});


}); //end closurex
