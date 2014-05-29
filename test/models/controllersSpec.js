/**
 * New node file
 */
describe('Testing a controller', function() {
    
    // chargement du module
    beforeEach(module("myApp"));

    var ctrl, scope;

    // injection du service $controller et du $rootScope, 
    // attention l'identification du service se fait sur son nom
    // il faut bien respecter $controller et pas écrire $controleur
    beforeEach(inject(function($controller, $rootScope) {
        // creation d'un nouveau scope
        scope = $rootScope.$new();
        // creation du controller avec le nouveau scope
        ctrl = $controller("listController", {
            $scope: scope
        });
    }));

    // test de la méthode addPatient()
    it('test add patient', function() {
        scope.patient = "test";
        scope.addPatient();
        // la chaine de caractère "test" est elle bien dans le dernier objet du tableau ?
        expect(scope.patients[scope.patients.length-1].name).toMatch("test");
    });

});

angular.module('myApp',[]).
    controller("listController", ["$scope", function($scope) {
        $scope.patients = [
            {name: "Jean Dupont"},
            {name: "Pierre Merti"},
            {name: "Jacques Egard"},
            {name: "Philippe Petit"},
            {name: "Albert Partin"}
        ];
        $scope.patient;
        $scope.addPatient = function() {
            $scope.patients.push({name: $scope.patient});
            $scope.patient = null;
        };
        $scope.removePatient = function(i) {
            $scope.patients.splice(i,1);
        };
    }]);

(function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 1000;

    var trivialReporter = new jasmine.TrivialReporter();
    jasmineEnv.addReporter(trivialReporter);

    jasmineEnv.specFilter = function(spec) {
        return trivialReporter.specFilter(spec);
    };

    $(function() {
        jasmineEnv.execute();
    });
})();