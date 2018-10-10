
let marginLeft = 0;

setMargin = (diff) => {
  console.log("margin");
  marginLeft += diff;
  $("#shelf").css("left", marginLeft + "px");
}

$(document).ready(function() {
  setMargin(0);
});
