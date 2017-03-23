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

        //Find name
        var title = content.match('Madame');
        if (!title){
            title = content.match('Monsieur');
        }
        var i = title.index + title[0].length + 1;
        var name = '';

        while (content[i] !== ' '){
            name += content[i];
            i++;
        }

        //Find Price
        var transac = content.match('TOTAL');
        transac = content.indexOf('<td', transac.index);
        transac = content.indexOf('>', transac);
        i = transac + 2;
        var price = '';
        while (content[i] !== ' '){
            price += content[i];
            i++;
        }
        
        //status
        if (mail.html.length){
            json.status = 'OK';
        }
        console.log(content);
    });

    /*function remove(index, array, close){
        var pos = array.indexOf(index);
        var temp;
        temp = array.substr(array.indexOf(index) + index.length, array.indexOf(close) + close.length);
        console.log(temp);
        while (pos != -1) {

            array = array.replace(temp, '');
            pos = array.indexOf(index, pos);
        }
        return array;
    }*/
    //console.log(json);

});