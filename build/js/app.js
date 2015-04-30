var source   = $("#entry-template").html();
var template = Handlebars.compile(source);
$(function(){

  // console.log(newspapers.getNewsFromKimono());

  var newspapersObj = new Newspapers();
  // console.log(newspapersObj);
  newspapersObj.fetchNews('mingpao');
  newspapersObj.fetchNews('appledaily');


  // $.ajax({
  //   url:"https://www.kimonolabs.com/api/57ox9fbg?apikey=6jGc9bQkH66FYf0cU9IAKd4DRS0OwoYj",
  //   crossDomain: true,
  //   dataType: "jsonp",
  //   success: function (response) {
  //     console.log(response);
  //     var news = response.results.collection1[0];
  //     var context = {
  //       headlineImage: news.headlineImage.src,
  //       headlineTitle: news.headlineTitle.text,
  //       headlineLink: news.headlineLink,
  //       headlineExcerpt: news.headlineExcerpt.text
  //     };
  //     var html = template(context);
  //     $('#mingpao').html(html);
  //   },
  //   error: function (xhr, status) {
  //     //handle errors
  //   }
  // });


});