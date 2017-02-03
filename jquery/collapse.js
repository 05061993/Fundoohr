$(document).ready(function(){
    $(window).resize(function(){
      console.log("resizing...");
      eventLoading();
    });
    eventLoading();
});
function eventLoading() {
  if($( window ).width()<768)
  {
       $('.navMenu').attr("data-toggle","collapse");
       $('.navMenu').attr("data-target","#bs-example-navbar-collapse-1");
 }else {
       $('.navMenu').removeAttr("data-toggle");
       $('.navMenu').removeAttr("data-target");
 }
}
