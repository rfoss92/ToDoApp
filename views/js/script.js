// const apiKey = "zdZwEsvwpYnj4S1SXkcwrrePZLgjcsjv";

// $(document).ready(function(){
// 	$('#newForm').on('submit', function(e){
// 		e.preventDefault();		
		
// 		var title = $('#new').val();

// 		$.ajax({ 
// 			url: "https://api.mlab.com/api/1/databases/foss-todo/collections/todo?apiKey=" + apiKey,
// 		  	data: JSON.stringify({ 
// 		  		"title" : title
// 		  	}),
// 		  	type: "POST",
// 		  	contentType: "application/json",
// 		  	success: function(data){
// 		  		window.location.href="http://localhost:3000/"
// 		  	},
// 		  	error: function(xhr, status, err){
// 		  		console.log(err);
// 		  	} 
// 		});
// 	});

// 	$('#retrieveForm').on('submit', function(e){
// 		e.preventDefault();	

// 		var retrieve = $('#retrieve').val();
		
// 		// var id = sessionStorage.getItem('current')

// 		// $.ajax({ 
// 		// 	url: "https://api.mlab.com/api/1/databases/foss-todo/collections/todo?apiKey=" + apiKey,
// 		//   	data: JSON.stringify({ 
// 		//   		"title" : title
// 		//   	}),
// 		//   	type: "POST",
// 		//   	contentType: "application/json",
// 		//   	success: function(data){
// 		//   		window.location.href="http://localhost:3000/"
// 		//   	},
// 		//   	error: function(xhr, status, err){
// 		//   		console.log(err);
// 		//   	} 
// 		// });



// 	});

// 	$('#addForm').on('submit', function(e){
// 		e.preventDefault();		
// 		var add = $('#add').val();
// 	});

// 	$('#removeForm').on('submit', function(e){
// 		e.preventDefault();		
// 		var remove = $('#remove').val();
// 	});
// });





// //     Todo.find({title: req.body.retrieve}).then((todos) => {
// //       myTodo = {todos};
// //       retrievedList = myTodo.todos[0].title;
// //       res.render('index.hbs', {
// //         title: myTodo.todos[0].title,
// //         items: myTodo.todos[0].items
// //       });  
// //     }, (e) => {
// //       res.status(400).send(e);
// //     });


// // function getData(){

// // 	$.ajax({ 
// // 		url: "https://api.mlab.com/api/1/databases/foss-todo/collections/todo?apiKey=zdZwEsvwpYnj4S1SXkcwrrePZLgjcsjv",
// // 	}).done(function(data){
// // 		var output = '<div>';
// // 		$.each(data, function(key, data){
// // 			output += '<div class="well">';
// // 			output += '<h3>' + data.newList + '</h3>';
// // 			output += '<p>' + data.item + '</p>';
// // 			output += '</div>';			
// // 		});
// // 		output += '</div>';
// // 		$('#books').html(output);
// // 	});
// // }