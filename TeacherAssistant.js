// create angular app with dependencies
var app = angular.module('myApp', ["firebase"]);

 /*******************************************************  
    CONTROLLER FOR EMPLOYEES
  ******************************************************* */

app.controller('employeeCtrl', ["$scope","$rootScope", function ($scope,$rootScope) {

    // Assign back end to myData var on the Scope

    $scope.myData = new Firebase('https://glaring-heat-6775.firebaseio.com/Employees');

    $scope.employeeName = '';
    $scope.employeeAge = null;
    $scope.employees = {};

    // Persist Employee on click to Firebase
    $scope.saveEmployee = function () {

        // Set the key to path https://glaring-heat-6775.firebaseio.com/Employees/empName
        var empName = $scope.employeeName;

        $scope.myData.child(empName).set({
            employeeName: $scope.employeeName,
            employeeAge: $scope.employeeAge
        });


        $scope.employeeName = '';
        $scope.employeeAge = null;
    };

    // Delete Employee on click from Firebase
    $scope.deleteEmployee = function (employeeName) {

        console.log('Inside deleteEmployee()   ');
        console.log('employee.employeeName  ');
        console.log(employeeName);

        /*var currentEmployee = $scope.employees[employeeName];
        console.log('This is employee choosen by employeeName: ');
        console.log(currentEmployee);*/

        // Remove employee by the key at https://glaring-heat-6775.firebaseio.com/Employees/employeeName
        $scope.myData.child(employeeName).set(null);
        $scope.employeeName = '';
        $scope.employeeAge = null;
    };

    // Persist Employee on click to Firebase
    $scope.updateEmployee = function (employee) {
        
        console.log('Inside updateEmployee() ');
        console.log('This is choosen employee: ');
        console.log(employee);

        $scope.myData.child(employee.employeeName).update({
            employeeAge: employee.employeeAge
        });


        $scope.employeeName = '';
        $scope.employeeAge = null;
    };
    
    // Choose current employee
    $scope.chooseEmployee = function (employee) {
        
        console.log('Inside chooseEmployee() ');
        console.log('This is choosen employee: ');
        console.log(employee);
        
        $scope.employeeName = employee.employeeName;
        $scope.employeeAge = employee.employeeAge;

        $rootScope.employeeName = employee.employeeName;
        $rootScope.employeeAge = employee.employeeAge;
      
    };
    

    // Event listener for changes in Firebase data model
    $scope.myData.on('value', function (snapshot) {

        $scope.employees = snapshot.val();

        console.log('This is $scope.employees after trigger: ');
        console.log($scope.employees);


    });

}]);



/*******************************************************  
    CONTROLLER FOR MESSAGES
  ******************************************************* */




// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray",
  function($firebaseArray) {
   
    var ref = new Firebase('https://glaring-heat-6775.firebaseio.com/Messages/');

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);

app.controller("ChatCtrl", ["$scope","$rootScope", "chatMessages", 
  //  pass chatMessages factory into the controller
  function($scope, $rootScope, chatMessages) {
                       
    // we add chatMessages array to the scope to be used in our ng-repeat
    $scope.messages = chatMessages;

    // a method to create new messages; called by ng-submit
    $scope.addMessage = function() {
      // calling $add on a synchronized array is like Array.push(),
      // except that it saves the changes to our database!
        
      var date = new Date();
      var timestamp = date.toString();
        
      console.log('This is $scope.timestamp after new Date(): ');
        console.log($scope.timestamp);  
        
        
      $scope.messages.$add({
        from: $rootScope.employeeName,
        content: $scope.message,
        timestamp: timestamp 
      });

      // reset the message input
      $scope.message = "";
    };

    // if the messages are empty, add something for fun!
    $scope.messages.$loaded(function() {
      if ($scope.messages.length === 0) {
          
        var date = new Date();
        var timestamp = date.toString();  
          
        $scope.messages.$add({
          from: "Firebase Docs",
          content: "Hello world!",
          timestamp: timestamp
        });
      }
    });
  }
]);
