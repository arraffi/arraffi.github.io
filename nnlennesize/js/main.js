var dateNow = new Date();

var hstr = ["очень низкий", "низкий", "ниже среднего", "средний", "выше среднего", "высокий", "очень высокий"];

var heights=[heights_m,heights_g];


function loadDefaults()
{
    document.forms[0].elements["date"].max = dateNow.toISOString().substring(0,10);
    
    document.forms[0].elements["date"].value = localStorage.getItem('date');
    document.forms[0].elements["gender"].value = localStorage.getItem('gender');
    document.forms[0].elements["height"].value = localStorage.getItem('height');
}

function replaceButton()
{
    document.getElementById("button").value = "Узнать размер";
    document.getElementById("button").onclick = calcSize;        
    document.getElementById("data").style.display = 'block';
    document.getElementById("result").innerHTML = "";
}

function showError(str)
{
    document.getElementById("result").innerHTML = str;
}

function formatStringResult(type, res)
{
    var html = "";
    if((typeof res === "undefined")||(res=="")){
        html = "";
    }else{
        switch(type){
            case 0: html = "<p>Комбинезон (отвороты): " + res + "</p>"; break;
            case 1: html = "<p>Комбинезон: " + res + "</p>"; break;
            case 2: html = "<p>Комплект: " + res + "</p>"; break;
            case 3: html = "<p>Шлем: " + res + "</p>"; break;
            case 4: html = "<p>Краги: " + res + "</p>"; break;
            default: html = "";        
        }
    }
    return html;
}

function calcSize()
{
    var date = document.forms[0].elements["date"].value;
    var gender = document.forms[0].elements["gender"].value;
    var height = document.forms[0].elements["height"].value;

    localStorage.setItem('date', date);
    localStorage.setItem('gender', gender);
    localStorage.setItem('height', height);

    var dateOfBirth = new Date(date);
    var ageInDays = (dateNow - dateOfBirth)/(1000*60*60*24);
    var ageInMonth = Math.ceil(ageInDays/30);

    document.getElementById("error").innerHTML = "";
    if ((dateOfBirth>dateNow)||(dateOfBirth.getFullYear()<(dateNow.getFullYear()-16))) showError("Проверьте дату рождения!");
    if ((height<40)||(height>180)) showError("Проверьте рост (вводить нужно в сантиметрах)!");
    if ((gender!=0) && (gender!=1)) showError("Ошибка определения пола.");

    var minValue = 0;
    var minIndex = 0;
    minValue = Math.abs(heights[gender][0][ageInMonth] - height);
    for(var i=0;i<7; i++){
        absValue = Math.abs(heights[gender][i][ageInMonth] - height);
        if(absValue < minValue){
            minValue = absValue;
            minIndex = i;
        }
    }

    ageInMonth = ageInMonth + (11-dateNow.getMonth());    
    height = Math.ceil(heights[gender][minIndex][ageInMonth]); 

    var html = "<p>Рост: " + hstr[minIndex] + "</p>";
    html = html + "<p>Рост на 1 декабря: ~" + heights[gender][minIndex][ageInMonth] + " см</p>";
    html = html + formatStringResult(0,sizes[height][0]);
    html = html + formatStringResult(1,sizes[height][1]);
    html = html + formatStringResult(2,sizes[height][2]);
    html = html + formatStringResult(3,sizes[height][3]);
    html = html + formatStringResult(4,sizes[height][4][gender]);

    document.getElementById("data").style.display = 'none'
    document.getElementById("result").innerHTML = html;
    document.getElementById("button").value = "<< Вернуться";
    document.getElementById("button").onclick = replaceButton;

}

































