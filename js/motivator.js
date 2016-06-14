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

    app.filter('unsafe', function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    });

    app.controller('BackEndController', function() {

        this.show = false;

        this.changeBackend = function() {

            if (this.show === false) {
                this.show = true;
            } else if (this.show === true) {
                this.show = false;
            }

        };

    });

    app.controller('MotivatorController', function($scope, $http) {

        $http.get('assets/quotes.json')
            .then(function(res) {
                $scope.quotes = res.data;

                var index = nrandom.integer(0, $scope.quotes.length - 1);
                $scope.quote = $scope.quotes[index];

            });

        this.getQuote = function() {
            return $scope.quote;
        };

        this.newQuote = function() {

            var index = nrandom.integer(0, $scope.quotes.length - 1);
            $scope.quote = $scope.quotes[index];

        };

        this.wikiQuote = function() {

            WikiquoteApi.getRandomQuote("happiness",
                function(newQuote) {
                    $scope.quote.body = newQuote.quote;
                    $scope.quote.source = false;
                },
                function(msg) {
                    alert(msg);
                }
            );

        };

    });


})();
