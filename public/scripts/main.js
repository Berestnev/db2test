$(document).ready(function () {
    //values

    var taskDigit = $('.todo-container__input .task-digit');


    // sort list
    var options = {
        valueNames: ['number', 'description'],
        item: '<div class="note"><p class="number"></p><p class="description"></p><button class="done-button" type="button">DONE</button></div>'
    };

    var sortNotes = new List('notes-list', options);

    if (localStorage.getItem('savedTasks') != undefined) {
        notesArray = JSON.parse(localStorage.getItem('savedTasks'));
        console.log(notesArray);

        for (var i = 0; i < notesArray.length; i ++) {
            sortNotes.add({
                number: notesArray[i].number,
                description: notesArray[i].description
            });
        }
        taskDigit.html(notesCount);
    } else {
        var notesArray = [];
    }

    var notesCount = notesArray.length + 1;
    taskDigit.html(notesCount);


    //function for del task

    function deleteTask() {

        $(document).on('click', '.done-button', function( event ) {
            var conf = confirm('Do you want to remove this note?');
            if (conf == true) {
                var target = $(event.target);

                notesCount--;
                taskDigit.html(notesCount);

                var deletedNote = target.siblings('p.number').text();


                notesArray.splice(deletedNote - 1, 1);
                for (var i = 0; i < notesArray.length; i ++) {
                    if ( i >= deletedNote - 1 ) {
                        notesArray[i].number =  notesArray[i].number - 1;
                    }
                }
                console.log(notesArray);
                localStorage.setItem('savedTasks', JSON.stringify(notesArray));

                //target.closest('div').hide().remove();
                target.closest('div').hide().remove();

                var notes = $('p.number');

                for(var i = 0; i < notes.length; i++) {
                    var noteNumber = $(notes[i]).text();

                    if (noteNumber > deletedNote) {
                        $(notes[i]).html(noteNumber - 1);
                    }
                }
                return false;
            } else {
                return false
            }

        });
    }


    //function for add task

    function addTask() {

        $('button.task-add').on('click', function() {
            var input = $('#task-description');

            var taskDescription = input.val();

            if (taskDescription == '') {

                input.animate({borderBottomWidth: "5px" }, 500, function () {
                    input.css('border-bottom-color', 'darkred');
                    $('.todo-container__input').addClass('empty');
                } );
                return false;
            } else {

                input.animate({borderBottomWidth: "1px" }, 200, function () {
                    input.css('border-bottom-color', 'white');
                    $('.todo-container__input').removeClass('empty');
                } );

                sortNotes.add({
                number: notesCount,
                description: taskDescription
                });

                var note = {};
                note.number = notesCount;
                note.description = taskDescription;

                notesArray[notesCount-1] = note;
                console.log(notesArray);
                localStorage.setItem('savedTasks', JSON.stringify(notesArray));



                notesCount++;
                taskDigit.html(notesCount);



                input.val('');
                return false;
            }

        });
    }


    //function for press by "Enter"

        $('#task-description').keydown(function(e) {
            if(e.which == 13) {
                $('button.task-add').click();
            }
        });
    deleteTask();
    addTask();


});