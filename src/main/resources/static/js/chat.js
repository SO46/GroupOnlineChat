$(function(){
    let getMessageElement = function (message){
        let item = $('<div class="message-item"></div>');
        let header = $('<div className="message-header"></div>');
        header.append($('<div class="datetime">' + message.datetime + '</div>'));
        header.append($('<div class="username">' + message.username + '</div>'));
        let textElement = $('<div class="message-text"></div>');
        textElement.text(message.text);
        item.append(header, textElement);
        $('.messages-list').append(item);
    };
    let updateMessages = function (){
        $('.messages-list').html('<i>Сообщений нет</i>');
        $.get('/message', {}, function (response){
            if (response.length == 0){
             return;
            }
            $('.messages-list').html('');
            for(i in response){
                let element = getMessageElement(response[i]);
                $('.messages-list').append(element);
            }
      })
    };

    let updateUserList = function (){
        $('.users-list').html('');
        $.get('/user', {}, function (response){
            if (response.length == 0){
                return;
            }
            $('.users-list').html('');
            for(i in response){
                $('.users-list').append(response[i].name + '\n');
            }
        })
    };
    let initApplication = function (){
        $('.messages-and-users').css({display: 'flex'});
        $('.controls').css({display: 'flex'});

        $('.send-message').on('click', function (){
            let message = $('.new-message').val();
            $.post('/message', {message: message}, function (response){
                if (response.result){
                    $('.new-message').val('')
                } else {
                    alert('Error, try again later');
                }
            });
        });

        setInterval(updateMessages, 1000);
        setInterval(updateUserList, 1000);
    };
    let registerUser = function (name){
        $.post('/auth', {name: name}, function (response){
            if (response.result){
                initApplication();
            }
        });
    };

    $.get('/init',{},function (response){
       if(!response.result){
           let name = prompt('Введите имя:');
           registerUser(name)
           return;
       }
       initApplication();
    });
});