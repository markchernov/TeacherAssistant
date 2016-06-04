// create angular app with dependencies
var app = angular.module('myApp', ["firebase"]);

 /*******************************************************  
    CONTROLLER FOR Students
  ******************************************************* */

app.controller('employeeCtrl', ["$scope","$rootScope", function ($scope,$rootScope) {

    // Assign back end to myData var on the Scope

    $scope.myData = new Firebase('https://glaring-heat-6775.firebaseio.com/Students');

    $scope.studentName = '';
    $scope.studentEmail = null;
    $scope.students = {};

    // Persist student on click to Firebase
    $scope.saveStudent = function () {

        // Set the key to path https://glaring-heat-6775.firebaseio.com/Employees/studentName
        var studentName = $scope.studentName;

        $scope.myData.child(studentName).set({
            studentName: $scope.studentName,
            studentEmail: $scope.studentEmail
        });


        $scope.studentName = '';
        $scope.studentEmail = null;
    };

    // Delete student on click from Firebase
    $scope.deleteStudent = function (studentName) {

        console.log('Inside deleteStudent()   ');
        console.log('student.studentName  ');
        console.log(studentName);

        /*var currentEmployee = $scope.employees[employeeName];
        console.log('This is employee choosen by employeeName: ');
        console.log(currentEmployee);*/

        // Remove employee by the key at https://glaring-heat-6775.firebaseio.com/Employees/studentName
        $scope.myData.child(studentName).set(null);
        $scope.studentName = '';
        $scope.employeeAge = null;
    };

    // Persist student on click to Firebase
    $scope.updateStudent = function (student) {
        
        console.log('Inside updateStudent() ');
        console.log('This is choosen student: ');
        console.log(student);

        $scope.myData.child(student.studentName).update({
            studentEmail: student.studentEmail
        });


        $scope.studentName = '';
        $scope.studentAge = null;
    };
    
    // Choose current student 
    $scope.chooseStudent = function (student) {
        
        console.log('Inside chooseStudent() ');
        console.log('This is choosen student: ');
        console.log(student);
        
        $scope.studentName = student.studentName;
        $scope.studentEmail = student.studentEmail;

        $rootScope.studentName = student.studentName;
        $rootScope.studentEmail = student.studentEmail;
      
    };
    

    // Event listener for changes in Firebase data model
    $scope.myData.on('value', function (snapshot) {

        $scope.students = snapshot.val();

        console.log('This is $scope.students after trigger: ');
        console.log($scope.students);


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
        from: $rootScope.studentName,
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
