(function(window, $) {

	var newspaperInfo = {
		"mingpao": {
			name: "明報",
			apiUrl: "5wds8c0c"
		},
		"appledaily": {
			name: "蘋果日報",
			apiUrl: "57ox9fbg"
		},
	};
	
	var Newspapers = (function() {
		function Newspapers() {
			// this.newspaper = newspaper;
			// this.newspaperName = "";
		}
		Newspapers.prototype = {
			_fetchNewsFromKimono: function (newspaperName) {
				// console.log(newspaperName);
				var url = "https://www.kimonolabs.com/api/"+newspaperInfo[newspaperName].apiUrl+"?apikey=6jGc9bQkH66FYf0cU9IAKd4DRS0OwoYj";
				// console.log(this._displayResult);
				// return
					$.ajax({
				    url:url,
				    crossDomain: true,
				    dataType: "jsonp",
				    success: this._displayResult
				  });
			},
			fetchNews: function (newspaperName) {
				this._fetchNewsFromKimono(newspaperName);
				// console.log(promise);
				// promise.done(this._displayResult);
			},
			_displayResult: function (response) {
				console.log(response);
	      var news = response.results.collection1[0];
	      // response.name = "news-aggregator-apple"
	      var context = {
	      	newspaperName: newspaperInfo[response.name].name,
	        headlineImage: news.headlineImage.src,
	        headlineTitle: news.headlineTitle,
	        headlineLink: news.headlineLink,
	        headlineExcerpt: news.headlineExcerpt
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