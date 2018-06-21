function main(){

/*Initialize*/
initialize();

s1 = SlPhys.Body.Shape.Square.createNew(undefined,5,undefined,undefined);
s2 = SlPhys.Body.Shape.Square.createNew(undefined,undefined,20,undefined);
s3 = SlPhys.Body.Shape.Square.createNew(undefined,undefined,undefined,25);

console.log(s1.calcWidth());
console.log(s1.calcPerimeter());
console.log(s1.calcArea());
console.log(s2.calcWidth());
console.log(s2.calcPerimeter());
console.log(s2.calcArea());
console.log(s3.calcWidth());
console.log(s3.calcPerimeter());
console.log(s3.calcArea());

//s4 = SlPhys.Structure.PumpStation.createNew('17125 Camino Del Sur','H06N-D','1168-B5');


//dataToHtml(SlPhys);

/*jQuery UI*/
$(function() {
	$('.uiDraggable').draggable();
});

/*Event Handlers*/
var jBody = jQuery('body');
jBody.on('click','.e',function(e){
    e.stopPropagation();
    var jThis = jQuery(this);
    var eventCase = jThis.attr('class').split(' ')[1];
    switch(eventCase){
        case 'expandButton':
            var id = jThis.attr('id');
            var idAr = id.split('-');
            var idType = idAr[0];
            var dataRoot = 'SlPhys';
            var dataPath = idAr[1];
            if (dataPath===dataRoot){
                var pObject = SlPhys;
                pObjectName = 'SlPhys';
                var s = '<table id="table-'+ dataPath +'">';
                for (var prop in pObject){if (pObject.hasOwnProperty(prop) && pObject[prop] !== null){
                    propPath = dataPath +'_'+ prop;
                    s = s +'<tr>'+
                                '<td id="name-'+ propPath +'" class="ce">'+ prop +'</td>'+
                                '<td id="contents-'+ propPath +'" class="ta">'+
                                    '<table class="topButtons">'+
                                        '<tr>'+
                                            '<td id="properties-'+ propPath +'" class="e expandButton">+</td>'+
                                        '</tr>'+
                                    '</table>'+
                                '</td>'+
                            '</tr>';
                }}
                s = s +'</table>';
            }else{
                var dataPathAr = dataPath.split('_');
                console.log('dataPathAr: '+ dataPathAr);
                var pObject = dataRoot;
                for (var i = 1; i < dataPathAr.length; i++){
                    console.log('dataPathAr['+ i +']: '+ dataPathAr[i]);
                    pObject = pObject[dataPathAr];
                }
                
            }
            jThis.html('-');
            jThis.attr('class','e collapseButton');
            var targetId = '#contents-'+ dataPath;
            jQuery(targetId).append(s);
        break;
        case 'collapseButton':
            var id = jThis.attr('id');
            var idAr = id.split('-');
            var idType = idAr[0];
            var dataPath = idAr[1];
            jThis.html('+');
            jThis.attr('class','e expandButton');
            jQuery('#table-'+ dataPath).remove();
        break;
    }
});
jBody.on('keydown','.ev',function(e){
    a = $(this).attr('class').split(' ');
    eventFunction = a[1];
    switch(e.which.toString()){
        case '13'://Enter
            e.preventDefault();
            switch(eventFunction){
                case '':
                break;
            }
        break;
        case '9'://Tab
        break;
        case '16'://Shift
            shiftDown = true;
        break;
    }
});
jBody.on('keyup','.event',function(e){
    if (e.which === 16){shiftDown = false;}
});
}
function initialize(){

   var s =  '<table>'+
                '<tr>'+
                    '<td id="name-SlPhys" class="ce">SlPhys</td>'+
                    '<td id="contents-SlPhys" class="ta">'+
                        '<table class="topButtons">'+
                            '<tr>'+
                                '<td id="properties-SlPhys" class="e expandButton">+</td>'+
                            '</tr>'+
                        '</table>'+
                    '</td>'+                    
                '</tr>'+
            '</table>';
    $('body').append(s);
}
function dataToHtml(rObject){
    s = '<table>';
    for (var prop in rObject){
        if (rObject.hasOwnProperty(prop) && rObject[prop] !== null){
            s = s +'<tr><td class="ce">'+ prop +'</td>';
            s = dataToHtmlRec(rObject[prop], s);
            s = s +'</tr>';
        }
    }
    s = s +'</table>';
    $('body').append(s);
}
function dataToHtmlRec(rObject, s){
    s = s +'<td><table>'
    for (var prop in rObject){
        console.log(prop);
        if (rObject.hasOwnProperty(prop) && rObject[prop] !== null){
            s = s +'<tr><td class="ce">'+ prop +'</td>';
            s = dataToHtmlRec(rObject[prop], s);
            s = s +'</tr>';
        }
    }
    return s +'</td></table>';
}