/**************QUICKBAR ENTRY*********
javascript:
window.coords='529|494 528|498 491|471 529|496 533|496 500|470 531|496 498|485 499|483 498|480 497|482 499|488 503|463 499|479 506|496 507|492 503|492 504|498 504|499 506|467 509|458 506|457 506|466 507|466 508|464 509|465 509|464 510|458 506|458 505|489 504|491 504|490 502|491 505|495 505|485 503|507 502|511 499|508 502|506 516|464 517|463 514|470 515|467 506|469 508|466 505|473 504|472 502|471 507|457 506|459 507|465 510|462 515|452 511|462 507|477 510|469 509|477 505|484 508|475 489|482 488|484';
window.ram_spy_ratio= 7; //8 spies for each ram;
window.fakeLimit= 1; //1%
$.getScript("https://gistcdn.githack.com/filipemiguel97/0b885ae622e7901dd4a48666e732e517/raw/smart_fakes.js");
*************************************/


function getDist(coords){
    return Math.sqrt(Math.pow(parseInt(coords[0]) - game_data.village.x, 2) +  Math.pow(parseInt(coords[1]) - game_data.village.y, 2));
}
function noCoordsError(){
    UI.ErrorMessage("No coordinates have been set");
    throw("No coordinates have been set");

}

function main(){
    let coords = window.coords;
    let ram_spy_ratio = parseInt(window.ram_spy_ratio || 7);
    let fakeLimit = parseInt(window.fakeLimit || 1);
    if(!coords)
        noCoordsError();
    else if(coords.length <1)
        noCoordsError();

    let doc=document;
    if(window.frames.length>0 && window.main!=null)
            doc=window.main.document;
    let url=doc.URL;
    if(url.indexOf('screen=place')==-1)
        window.open('game.php?screen=place', '_self');

    let points = game_data.village.points;
    let min_pop = Math.floor((points*fakeLimit)/100);
    let i=1;
    let j=1;

    while (i*2 + j*8 < min_pop)
    {
        i+=1;
        if (i % ram_spy_ratio == 0 && min_pop - (i*2 + j*8)>= 8) {
            j+=1;
		}
    }

    coords=coords.split(' ');
    coords = $.map(coords, function(obj){return {coords: obj.split('|'), distance: getDist(obj.split('|'))};});
    coords = coords.sort((a, b)=> a.distance-b.distance);

    let index=0;
    let farmcookie=document.cookie.match('(^|;) ?farm=([^;]*)(;|$)');
    if(farmcookie!=null)
            index=parseInt(farmcookie[2]);
    if(index>=coords.length)
            index=0;

    coords=coords[index];
    index=index+1;
    let cookie_date=new Date(2031,3,27);
    document.cookie ='farm='+index+';expires='+cookie_date.toGMTString();doc.forms[0].x.value=coords.coords[0];doc.forms[0].y.value=coords.coords[1];

    $('#place_target').find('input').val(coords[0]+'|'+coords[1]);
    doc.forms[0].spy.value=i;
    doc.forms[0].catapult.value=j;
}


main();