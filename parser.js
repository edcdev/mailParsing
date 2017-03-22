$(document).ready(function () {
    var json = {};
    var mail = $('#mail');
    var content;
    var pos;

    mail.load("test.html", function () {
        content = mail.html();
        content = content.replace(/\\n+/g, '');
        content = content.replace(/\\r+/g, '');
        pos = content.substr(content.indexOf('<meta'), content.indexOf('>'));
        content = content.replace(pos, '');
        if (mail.html.length){
            json.status = 'OK';
        }
        console.log(content);
    });

    //console.log(json);

});