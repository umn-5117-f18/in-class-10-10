
let marginLeft = 0;

setMargin = (diff) => {
  marginLeft += diff;
  $("#shelf").css("left", marginLeft + "px");
}

$(document).ready(function() {
  setMargin(0);
});
