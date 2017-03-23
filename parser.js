$(document).ready(function () {
    var json = {};
    var mail = $('#mail');
    var content;
    var pos;
    var days = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
    var price = '';
    var name = '';
    var date = [];

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


        while (content[i] !== ' '){
            name += content[i];
            i++;
        }

        //Find Price
        var transac = content.match('TOTAL');
        transac = content.indexOf('<td', transac.index);
        transac = content.indexOf('>', transac);
        i = transac + 2;
        while (content[i] !== ' '){
            price += content[i];
            i++;
        }
        var day;
        i = 0;
        var pos;
        while (i <= 6){
            day = content.match(days[i]);
            if (day){
                date.push({day: day[0], pos: day.index});
                pos = day.index;
                while (pos != -1){
                    pos = content.indexOf(days[i], pos + days[i].length);
                    if (pos >= 0){
                        date.push({day: days[i], pos: pos});
                    }
                }
            }
            i++;
        }
        var trips = [];
        for (var c = 0; c < date.length; c++){
            i = content.indexOf(date[c].day, date[c].pos);
            var fulldate = '';
            while (content[i] !== '<'){
                fulldate += content[i];
                i++;
            }
            i = content.indexOf('<td', date[c].pos);
            i = content.indexOf('>', i) + 1;
            var type = '';
            while (content[i] !== '<'){
                type += content[i];
                i++;
            }
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            var start = '';
            while (content[i] !== '<'){
                start += content[i];
                i++;
            }
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            var place_start = '';
            while (content[i] !== '<'){
                place_start += content[i];
                i++;
            }
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            var train = '';
            while (content[i] !== '<'){
                train += content[i];
                i++;
            }
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            var num = '';
            while (content[i] !== '<'){
                num += content[i];
                i++;
            }
            while (content.indexOf('Passager', i) !== -1){
                i = content.indexOf('<br>', i);
                i = content.indexOf('(', i);
                var passenger = '';
                while (content[i] !== '<'){
                    passenger += content[i];
                    i++;
                }
                i = content.indexOf('train.', i) + 6;
                var billet_type = '';
                while (i !== content.indexOf('ble', i)){
                    billet_type += content[i];
                    i++;
                }
            }
            trips.push({
                date: fulldate,
                type: type,
                trains: {
                    departureTime: start,
                    departureStation: place_start,
                    type: train,
                    number: num,
                    passenger: {
                        age: passenger,
                        type: billet_type
                    }
                }
            });
        }
        console.log(trips);
        //status
        if (mail.html.length){
            json.status = 'OK';
        }
        console.log(content);
    });
});