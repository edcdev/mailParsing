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
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            var arrival = '';
            while (content[i] !== '<'){
                arrival += content[i];
                i++;
            }
            i = content.indexOf('<td', i);
            i = content.indexOf('>', i) + 1;
            var arrival_place = '';
            while (content[i] !== '<'){
                arrival_place += content[i];
                i++;
            }
            var billet_type = '';
            var passenger = [];
            var age = '';
            while (content.indexOf('passager', i) !== -1){
                i = content.indexOf('<br>', i);
                i = content.indexOf('(', i);
                while (content[i] !== '<'){
                    age += content[i];
                    i++;
                }
                i = content.indexOf('train.', i) + 6;
                while (i !== content.indexOf('ble', i)){
                    billet_type += content[i];
                    i++;
                }
                if (billet_type.indexOf('Billet') === 1 && age.length > 5){
                    passenger.push({age: age.trim(), type: billet_type.trim()});
                }
                age = '';
                billet_type = '';
            }
            trips.push({
                type: type.trim(),
                date: fulldate.trim(),
                trains: {
                    departureTime: start.trim(),
                    departureStation: place_start.trim(),
                    arrivalTime: arrival.trim(),
                    arrivalStation: arrival_place.trim(),
                    type: train.trim(),
                    number: num.trim(),
                    passenger:
                        passenger

                }
            });
        }
        console.log(trips);
        if (mail.html.length){
            json.status = 'OK';
            json.result = {};
            json.result.trips = {};
            json.result.trips.code = 'UNKNOWN';
            json.result.trips.name = name;
            json.result.trips.details = {};
            json.result.trips.details.price = price;
            json.result.trips.details.roundtrips = trips;
        }
        //status
        $('body').html('<pre>'+JSON.stringify(json)+'</pre>');
        console.log(content);
    });
});