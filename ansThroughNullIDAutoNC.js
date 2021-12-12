async function postData(url = '', t) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *client
    body: t // body data type must match "Content-Type" header
  });
  return await response.text(); // parses JSON response into native JavaScript objects
}

var questionBodyIds = document.getElementsByClassName("test_inp");

var parser = document.createElement('a');
parser.href = window.location.toString();

var FD = new FormData;
FD.append("a", "check");
FD.append("stat_id", "0");
FD.append("test_id", "");
FD.append("is_cr", "1");

for (var i = 0; i < questionBodyIds.length; i++) {
  item = questionBodyIds[i];
  if (item.name.indexOf("answer") > -1) {
    //FD.append('stat_id', questionBodyIds[1].value);
    //FD.append('name', item.name.replace("c", ""));
    //FD.append('answer[]', item.value);
    FD.append(item.name.replace("c", ""), '');
    //await postData("https://" + parser.hostname + "/test?a=save_part&ajax=1", FD)
  }
}

postData("https://" + parser.hostname + "/test", FD).then((tt) => {
  var parser = new DOMParser();
  var htmlDoc = parser.parseFromString(tt, 'text/html');

  var answersParsed = [];
  var answers = htmlDoc.getElementsByClassName("res_row");
  for (var i = 0; i < answers.length; i++) {
    if (answers[i].cells[2].innerText.indexOf("C") == -1) {
      answersParsed.push(answers[i].cells[4].innerText);
    }
  };

  var z = 0;

  for (var i = 0; i < questionBodyIds.length; i++) {
    if (questionBodyIds[i].name.match(/answer/g) == "answer" && questionBodyIds[i].name.indexOf("c") == -1) {
      //console.log(answersParsed[z]);
      if ((questionBodyIds[i].name.match(/_/g) || []).length == 3) {

        if (questionBodyIds[i].name.endsWith("_1")) {
          var gridAns = answersParsed[z].split(" ")

          //console.log(questionBodyIds[i].name.split("_")[2]);
          var cellAnsName = questionBodyIds[i].name.split("_")[2];
          var ansCount = 0

          questionBodyIds.forEach(e => {
            if (cellAnsName == e.name.split("_")[2])
              ansCount++
          });

          if (ansCount != gridAns.length) {
            //console.log(ansCount + " " + gridAns.length);
            var half_length = Math.ceil(gridAns.length / 2);

            var leftSide = gridAns.splice(0, half_length);

            questionBodyIds[i].value = leftSide.join(" ");
            questionBodyIds[i + 1].value = gridAns.join(" ");
          } else {
            for (var zz = 0; zz < gridAns.length; zz++) {
              questionBodyIds[i + zz].value = gridAns[zz];
            }
          }

          i++;
          z++;
          //console.log(gridAns)


        }

      } else {
        questionBodyIds[i].value = answersParsed[z];
        z++;
      }
    };
  };

})