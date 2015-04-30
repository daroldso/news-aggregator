(function(window, $) {

  var newspaperInfo = {
    "mingpao": {
      name: "明報",
      apiUrl: "8mvmdra2"
    },
    "appledaily": {
      name: "蘋果日報",
      apiUrl: "57ox9fbg"
    },
    "oriental": {
      name: "東方日報",
      apiUrl: "60jzfyds"
    },
    "thesun": {
      name: "太陽日報",
      apiUrl: "3vq84xeg"
    },
    "singtao": {
      name: "星島日報",
      apiUrl: "882fq78q"
    },
    "hket": {
      name: "香港經濟日報",
      apiUrl: "ce6wcxbu"
    },
    "hkej": {
      name: "信報財經新聞",
      apiUrl: "axf3l5da"
    },
    "wenweipo": {
      name: "文匯報",
      apiUrl: "21rlkzn6"
    },
    "takungpao": {
      name: "大公報",
      apiUrl: "7yhn8bog"
    }
  };
  
  var Newspapers = (function() {
    function Newspapers() {
      // this.newspaper = newspaper;
      // this.newspaperName = "";
    }
    Newspapers.prototype = {
      _fetchNewsFromKimono: function (newspaperName) {
        var dfd = $.Deferred();

        var url = "https://www.kimonolabs.com/api/"+newspaperInfo[newspaperName].apiUrl+"?apikey=6jGc9bQkH66FYf0cU9IAKd4DRS0OwoYj";

        $.ajax({
          url:url,
          crossDomain: true,
          dataType: "jsonp",
          success: dfd.resolve
        });

        return dfd.promise();
      },
      fetchNews: function (newspaperName) {
        this._fetchNewsFromKimono(newspaperName).done(this._displayResult);
        
      },
      _displayResult: function (response) {
        console.log(response);
        var news = response.results.collection1[0];
        var context = {
          newspaperName: newspaperInfo[response.name].name,
          headlineImage: news.headlineImage.src,
          headlineTitle: news.headlineTitle.text,
          headlineLink: news.headlineLink,
          headlineExcerpt: news.headlineExcerpt.text
        };
        var html = template(context);
        $('#'+response.name).html(html);
      }

    };
    return Newspapers;
  }());
  
  Newspapers.create = function(element, opts) {
    return new Newspapers(element, opts);
  };
  
  window.Newspapers = Newspapers;
  
}(window, jQuery));