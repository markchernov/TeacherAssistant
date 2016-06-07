// create angular app with dependencies
var app = angular.module('myApp', ["firebase"]);

 /*******************************************************  
    CONTROLLER FOR APP
  ******************************************************* */

app.controller('studentCtrl', ["$scope", "chatMessages",  function ($scope, chatMessages) {
    
    
    /*******************************************************  
    MENU METHODS
  ******************************************************* */ 
    
    
    
   /* MAIN Panel*/
    
    $scope.IsMainPanelVisible = true;
    
    $scope.IsStudentsPanelVisible = false;
    // Function to show or hide div
    $scope.ShowStudentsPanel = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsStudentsPanelVisible = $scope.IsStudentsMenuVisible ? false : true;
                 $scope.IsMainPanelVisible = false;
                 $scope.userTypeStudent = true;
                 $scope.userTypeTeacher = false;
        
        
            };
    
    
    $scope.IsTeachersPanelVisible = false;
    // Function to show or hide div
    $scope.ShowTeachersPanel = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsTeachersPanelVisible = $scope.IsStudentsMenuVisible ? false : true;
                $scope.IsMainPanelVisible = false;
                $scope.userTypeTeacher = true;
                $scope.userTypeStudent = false;
        
            };
    
    
    
    
    
    
    /* STUDENT OR TEACHER Panel*/
    
    
    
    
    $scope.IsStudentMenuVisible = false;
    // Function to show or hide div
    $scope.ShowHideStudents = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsStudentMenuVisible = $scope.IsStudentsMenuVisible ? false : true;
        
                $scope.IsStudentQuestionsMenuVisible = false;
        
                $scope.IsStudentMessagesMenuVisible = false;
        
            };
    
    
    $scope.IsTeacherMenuVisible = false;
    // Function to show or hide div
    $scope.ShowHideTeachers = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsTeacherMenuVisible = $scope.IsTeachersMenuVisible ? false : true;
        
                $scope.IsTeacherQuestionsMenuVisible = false;
        
                $scope.IsTeacherMessagesMenuVisible = false;
        
            };
    
    
    
    
    
    
    
    
    
    
    $scope.IsStudentQuestionsMenuVisible = false;
    // Function to show or hide div
    $scope.ShowHideStudentQuestions = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsStudentQuestionsMenuVisible = $scope.IsQuestionsMenuVisible ? false : true;
        
                $scope.IsStudentMenuVisible = false;
        
                $scope.IsStudentMessagesMenuVisible =  false;
        
            };
    
    
    
      $scope.IsTeacherQuestionsMenuVisible = false;
    // Function to show or hide div
    $scope.ShowHideTeacherQuestions = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsTeacherQuestionsMenuVisible = $scope.IsQuestionsMenuVisible ? false : true;
        
                $scope.IsTeacherMenuVisible = false;
        
                $scope.IsTeacherMessagesMenuVisible =  false;
        
            };
      
       $scope.IsStudentMessagesMenuVisible = false;
    // Function to show or hide div
    $scope.ShowHideStudentMessages = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsStudentMessagesMenuVisible = $scope.IsMessagesMenuVisible ? false : true;
        
                $scope.IsStudentMenuVisible =  false;
        
                $scope.IsStudentQuestionsMenuVisible = false;
        
            };
    
    
    
      
       $scope.IsTeacherMessagesMenuVisible = false;
    // Function to show or hide div
    $scope.ShowHideTeacherMessages = function () {
                //If DIV is visible it will be hidden and vice versa.
                $scope.IsTeacherMessagesMenuVisible = $scope.IsMessagesMenuVisible ? false : true;
        
                $scope.IsTeacherMenuVisible =  false;
        
                $scope.IsTeacherQuestionsMenuVisible = false;
        
            };
    
    
    
    
    
    
    
    
    
    
    
    
  
    // Log out user on click 
    $scope.LogOut = function () {

        $scope.studentId = null;
        $scope.studentName = null;
        $scope.studentEmail = null;
        
        
        $scope.teacherId = null;
        $scope.teacherName = null;
        $scope.teacherEmail = null;
        
        $scope.userTypeTeacher = false;
        $scope.userTypeStudent = false;
        
        
        window.location = "http://markche.com/TeacherAssistant/"; 
        
        
    };

    
    
    
    
    
    
    
    
    
    
    /*******************************************************  
    STUDENTS METHODS
  ******************************************************* */ 
    
    
    
    

    // Assign back end to myStudentData var on the Scope

    
    
    $scope.myStudentData = new Firebase('https://glaring-heat-6775.firebaseio.com/Students');  
        
           
    
    $scope.studentId = null;
    $scope.studentName = null;
    $scope.studentEmail = null;
    $scope.students = {};
      

    // Persist student on click to Firebase
    $scope.saveStudent = function () {

        // Set the key to path https://glaring-heat-6775.firebaseio.com/Students/studentId
        var studentId = $scope.studentId;

        $scope.myStudentData.child(studentId).set({
            studentId: $scope.studentId,
            studentName: $scope.studentName,
            studentEmail: $scope.studentEmail
        });

        $scope.studentId = null;
        $scope.studentName = null;
        $scope.studentEmail = null;
    };

    // Delete student on click from Firebase
    $scope.deleteStudent = function (studentId) {

        console.log('Inside deleteStudent()   ');
        console.log('student.studentName  ');
        console.log(studentId);

        // Remove student by the key at https://glaring-heat-6775.firebaseio.com/Students/studentId
        $scope.myStudentData.child(studentId).set(null);
        $scope.studentId = null;
        $scope.studentName = null;
        $scope.employeeAge = null;
    };

    // Persist student on click to Firebase
    $scope.updateStudent = function (student) {
        
        console.log('Inside updateStudent() ');
        console.log('This is choosen student: ');
        console.log(student);

        $scope.myStudentData.child(student.studentId).update({
            studentName: student.studentName,
            studentEmail: student.studentEmail
        });

        $scope.studentId = null;
        $scope.studentName = null;
        $scope.studentEmail = null;
    };
    
    // Choose current student 
    $scope.chooseStudent = function (student) {
        
        console.log('Inside chooseStudent() ');
        console.log('This is choosen student: ');
        console.log(student);
        
        $scope.studentId = student.studentId;
        $scope.studentName = student.studentName;
        $scope.studentEmail = student.studentEmail;

      
    };
    

    // Event listener for changes in Firebase data model
    $scope.myStudentData.on('value', function (snapshot) {

        $scope.students = snapshot.val();

        console.log('This is $scope.students after trigger: ');
        console.log($scope.students);


    });
    
    
  
    
    /*******************************************************  
    TEACHERS METHODS
  ******************************************************* */ 
    
    
    
    

    // Assign back end to myTeacherData var on the Scope

    $scope.myTeacherData = new Firebase('https://glaring-heat-6775.firebaseio.com/Teachers');

    
      
    
    $scope.teacherId = null;
    $scope.teacherName = null;
    $scope.teacherEmail = null;
    $scope.teachers = {};

    // Persist teacher on click to Firebase
    $scope.saveTeacher = function () {

        // Set the key to path https://glaring-heat-6775.firebaseio.com/Teachers/teacherId
        var teacherId = $scope.teacherId;

        $scope.myTeacherData.child(teacherId).set({
            teacherId: $scope.teacherId,
            teacherName: $scope.teacherName,
            teacherEmail: $scope.teacherEmail
        });

        $scope.teacherId = null;
        $scope.teacherName = null;
        $scope.teacherEmail = null;
    };

    // Delete teacher on click from Firebase
    $scope.deleteTeacher = function (teacherId) {

        console.log('Inside deleteTeacher()   ');
        console.log('teacher.teacherName  ');
        console.log(teacherId);

        // Remove teacher by the key at https://glaring-heat-6775.firebaseio.com/Teachers/teacherId
        $scope.myTeacherData.child(teacherId).set(null);
        $scope.teacherId = null;
        $scope.teacherName = null;
        $scope.teacherAge = null;
    };

    // Persist teacher on click to Firebase
    $scope.updateTeacher = function (student) {
        
        console.log('Inside updateTeacher() ');
        console.log('This is choosen teacher: ');
        console.log(teacher);

        $scope.myTeacherData.child(teacher.teacherId).update({
            teacherName: teacher.teacherName,
            teacherEmail: teacher.teacherEmail
        });

        $scope.teacherId = null;
        $scope.teacherName = null;
        $scope.teacherEmail = null;
    };
    
    // Choose current student 
    $scope.chooseTeacher = function (teacher) {
        
        console.log('Inside chooseTeacher() ');
        console.log('This is choosen teacher: ');
        console.log(teacher);
        
        $scope.teacherId = teacher.teacherId;
        $scope.teacherName = teacher.teacherName;
        $scope.teacherEmail = teacher.teacherEmail;

      
    };
    

    // Event listener for changes in Firebase data model
    $scope.myTeacherData.on('value', function (snapshot) {

        $scope.teachers = snapshot.val();

        console.log('This is $scope.teachers after trigger: ');
        console.log($scope.teachers);


    });
    
    
    
    
    
    
    
    
    /*******************************************************  
    QUESTIONS METHODS
  ******************************************************* */ 
    
    
     
    // Assign back end to myQuestionsData var on the Scope

    $scope.myQuestionData = new Firebase('https://glaring-heat-6775.firebaseio.com/Questions');
    
    $scope.questionNumber = null;
    $scope.questionDetails = null;
    $scope.questions = {};
   

    // Persist question on click to Firebase
    $scope.saveQuestion = function () {

        // Set the key to path https://glaring-heat-6775.firebaseio.com/Students/studentId
        var questionNumber = $scope.questionNumber;

        $scope.myQuestionData.child(questionNumber).set({
            questionNumber: $scope.questionNumber,
            questionDetails: $scope.questionDetails,
            
            
        });

        $scope.questionNumber = null;
        $scope.questionDetails = null;
    };

    // Delete question on click from Firebase
    $scope.deleteQuestion = function (questionNumber) {

        console.log('Inside deleteQuestion()   ');
        console.log('question.questionNumber  ');
        console.log(questionNumber);

        // Remove question by the key at https://glaring-heat-6775.firebaseio.com/Students/studentId
        $scope.myQuestionData.child(questionNumber).set(null);
        $scope.questionNumber = null;
        $scope.questionDetails = null;
        
    };

    // Persist question on click to Firebase
    $scope.updateQuestion = function (question) {
        
        console.log('Inside updateQuestion() ');
        console.log('This is choosen question: ');
        console.log(question);

        $scope.myQuestionData.child(question.questionNumber).update({
            questionNumber: question.questionNumber,
            questionDetails: question.questionDetails
        });

        $scope.questionNumber = null;
        $scope.questionDetails = null;
       
    };
    
    // Choose current question 
    $scope.chooseQuestion = function (question) {
        
        console.log('Inside chooseQuestion() ');
        console.log('This is choosen question: ');
        console.log(question);
        
        $scope.choosenQuestion = question;
        $scope.questionNumber = question.questionNumber;
        $scope.questionDetails = question.questionDetails;
        $scope.studentsAnswers = question.studentsAnswers;

      
    };
    

    // Event listener for changes in Firebase data model
    $scope.myQuestionData.on('value', function (snapshot) {

        $scope.questions = snapshot.val();

        console.log('This is $scope.questions after trigger: ');
        console.log($scope.questions);


    });
    
    
    
    /*******************************************************  
    ANSWERS METHODS
  ******************************************************* */ 
    
    
     
    // Assign back end to myQuestionsData var on the Scope

    $scope.myAnswerData = new Firebase('https://glaring-heat-6775.firebaseio.com/Answers');
    
    $scope.myStudentAnswerData = new Firebase('https://glaring-heat-6775.firebaseio.com/StudentAnswer');
 
 
        
    $scope.answerNumber = null;
    $scope.answerDetails = null;    
    $scope.answers = {};

    // Persist question on click to Firebase
    $scope.saveAnswer = function () {

        // Set the key to path https://glaring-heat-6775.firebaseio.com/Students/studentId
        var answerNumber = $scope.answerNumber;

        $scope.myAnswerData.child(answerNumber).set({
            questionNumber: $scope.questionNumber,
            answerNumber: $scope.answerNumber,
            answerDetails: $scope.answerDetails,
            
        });

        $scope.answerNumber = null;
        $scope.answerDetails = null;
    };

    // Delete question on click from Firebase
    $scope.deleteQuestion = function (answerNumber) {

        console.log('Inside deleteAnswer()   ');
        console.log('answer.answerNumber  ');
        console.log(answerNumber);

        // Remove question by the key at https://glaring-heat-6775.firebaseio.com/Students/studentId
        $scope.myAnswerData.child(answerNumber).set(null);
        $scope.answerNumber = null;
        $scope.answerDetails = null;
        
    };

    // Persist question on click to Firebase
    $scope.updateAnswer = function (answer) {
        
        console.log('Inside updateAnswer() ');
        console.log('This is choosen answer: ');
        console.log(answer);

        $scope.myAnswerData.child(question.answerNumber).update({
            answerNumber: answer.questionNumber,
            answerDetails: answer.questionDetails
        });

        $scope.answerNumber = null;
        $scope.answerDetails = null;
       
    };
    
    // Choose current question 
    $scope.chooseAnswer = function (answer) {
        
        console.log('Inside chooseAnswer() ');
        console.log('This is choosen answer: ');
        console.log(answer);
        
        $scope.answerNumber = answer.answerNumber;
        $scope.answerDetails = answer.answerDetails;
        $scope.choosenAnswer = answer;

      
    };
    

    // save choosen answer 
    $scope.saveChoosenAnswer = function (choosenAnswer) {
        
        console.log('Inside saveChoosenAnswer() ');
        console.log('This is choosen answer to save: ');
        console.log(choosenAnswer);
        
        /*$scope.answerNumber = answer.answerNumber;
        $scope.answerDetails = answer.answerDetails;*/
        
        $scope.choosenAnswer.studentId = $scope.studentId;
        $scope.choosenAnswer.studentName = $scope.studentName;
        $scope.choosenAnswer.timeStamp = new Date().toString();
        
        console.log('This is answersObject: ');
        console.log($scope.choosenAnswer);
        
         
        $scope.myStudentAnswerData.push($scope.choosenAnswer);
        
          
        $scope.questionNumber = null;
        $scope.questionDetails = null;
        $scope.answerNumber = null;
        $scope.answerDetails = null;
        
        
        
    };
    
    
    // Display statistics based on students answers 
    $scope.displayResults = function (questionId) {
        
        console.log('Inside displayAnswers() ');
        console.log('This is questionId to display: ');
        console.log(questionId);
        
   
       // TODO:   Calculate sttistics based on students answers
        
        
        
    };
    
    
    
    
    
    
    
    // Event listener for changes in Firebase data model
    $scope.myAnswerData.on('value', function (snapshot) {

        $scope.answers = snapshot.val();

        console.log('This is $scope.answers after trigger: ');
        console.log($scope.answers);


    });
    
    
       // Event listener for changes in Firebase data model
    $scope.myStudentAnswerData.on('value', function (snapshot) {

        $scope.studentAnswers = snapshot.val();

        console.log('This is $scope.studentAnswers after trigger: ');
        console.log($scope.studentAnswers);


    });
    
    
    
    
    
    
    
    
    
    

/*******************************************************  
    MESSAGESS METHODS
  ******************************************************* */ 
    


                       
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
        from:  $scope.studentName || $scope.teacherName,
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
      
 
        
      
  
    }]);

// this factory returns a synchronized array of chat messages
app.factory("chatMessages", ["$firebaseArray",
  function($firebaseArray) {
   
    var ref = new Firebase('https://glaring-heat-6775.firebaseio.com/Messages/');

    // this uses AngularFire to create the synchronized array
    return $firebaseArray(ref);
  }
]);
