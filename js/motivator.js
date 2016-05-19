(function() {

    var app = angular.module('motivator', []);

    var engine = Random.engines.mt19937();
    var seed = parseInt(moment().format('YYYYMMDDhhmmss'));
    engine.seed(seed);
    var nrandom = new Random(engine);

    var quote = {
        body: "I love you :-*",
        source: "Me"
    };

    var quotes = [this.quote];

    app.controller('MotivatorController', function($scope, $http) {

        $http.get('js/quotes.json')
            .then(function(res) {
                $scope.quotes=res.data;

                var index = nrandom.integer(0, $scope.quotes.length - 1);
                $scope.quote = $scope.quotes[index];

                var a;

            });

        this.getQuote = function() {
            return $scope.quote;
        };

        this.newQuote = function() {

          var index = nrandom.integer(0, $scope.quotes.length - 1);
          $scope.quote = $scope.quotes[index];

        };

    });


})();
