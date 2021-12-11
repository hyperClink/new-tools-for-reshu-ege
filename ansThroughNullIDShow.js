var questionBodyIds = document.getElementsByClassName("test_inp");
var sols = document.getElementsByName('nosols');
var test_id = document.getElementsByName('test_id');
var stat_id = document.getElementsByName('stat_id');
if (stat_id[0] != undefined) {
  stat_id[0].remove();
};

test_id[0].remove();
if (sols[0] !== undefined) {
  sols[0].className = " ";
};

for (var i = 0; i < questionBodyIds.length; i++) {
  item = questionBodyIds[i];
  if (item.name.indexOf("answer") > -1) {
    if (item.name.indexOf("answer_1_") > -1)
      item.value = "это ответы, учителю ничего не направлено!"
    item.name = item.name.replace("c", "")
  }
}

$(document).ready(function () {
  submit_form();
});
 
