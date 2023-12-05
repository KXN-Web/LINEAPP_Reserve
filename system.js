$(document).ready(function () {
    const liffId = "1661328491-NK747zok";
    initializeLiff(liffId);
})

liff.ready.then(() => {
  if (!liff.isLoggedIn()) {
    liff.login();
  }
    const idToken = liff.getDecodedIDToken();
    const userId = idToken.sub;
    getData(userId);
})        

function initializeLiff(liffId) {
    liff.init({
        liffId: liffId
    }).then(() => {
        initializeApp();
    }).catch((err) => {
        console.log('LIFF Initialization failed ', err);
    });
}

function sendText(text) {
    liff.sendMessages([{
        'type': 'text',
        'text': text
    }]).then(function () {
        liff.closeWindow();
    }).catch(function (error) {
        window.alert('Failed to send message ' + error);
    });
}

const params = (new URL(document.location)).searchParams;
const key = params.get('key');

$(function () {
    $('form').submit(function () {

// 日時未定取得
let mitei = "";
$('input[name=dateNone]:checked').each(function() {
    mitei = $(this).val();
});
            
// 曜日取得
let yobivalue= "";
$('input[name=dow]:checked').each(function() {
    if(yobivalue!=""){
        yobivalue = yobivalue + ",";
    }
    yobivalue = yobivalue + $(this).val();
});

// チェックしてアラートを出す
let arartText = "";
let arartMsg = "";
    
// アラートメッセージの初期化
$("#inputArrart").html(arartText);


// 日時未定が未チェックの場合
let kibobivalue = ""; 
if(mitei == ""){
    // 希望日のチェック
    if($('input[name="preDate"]').val()==""){
        arartMsg = "・希望日を入力してください<br>(Please enter the desired date)"
    }
    arartText = arartMsg;
    arartMsg = "";
        
    // 定期保育の場合曜日のチェック
    if($('input:radio[name="type"]:checked').val()=="定期保育" && yobivalue==""){
        if(arartText!=""){
            arartMsg = "<br>";
        }
        arartMsg = arartMsg+"・定期保育を選択した場合、希望する曜日を必ず選択してください<br>(If you choose regular childcare, please be sure to select the desired day of the week.)"
    }
    arartText = arartText+arartMsg;
    arartMsg = "";
    
    kibobivalue = $('input[name="preDate"]').val();
    
}else{
    kibobivalue = "未定";
}
        
// 言語でその他を選択した場合
if($('input:radio[name="lang"]:checked').val()=="その他" && $('input[name="langOther"]').val()==""){
    if(arartText!=""){
        arartMsg = "<br>";
    }
    arartMsg = arartMsg+"・希望言語でその他を選択した場合、その他の言語を記入してください<br>(If you have selected other in language, please enter another language)"
}
arartText = arartText+arartMsg;
arartMsg = "";

// ペットがいる場合
if($('input:radio[name="pet"]:checked').val()=="いる" && $('input[name="petKinds"]').val()==""){
    if(arartText!=""){
        arartMsg = "<br>";
    }
    arartMsg = arartMsg+"・ペットの有無でいるを選択した場合、ペットの種類を記入してください<br>(If you have a pet, be sure to enter the type of pet)"
}
arartText = arartText+arartMsg;
arartMsg = "";
        
// 誕生日のチェック
if($('input[name="birthday"]').val()==""){
    if(arartText!=""){
        arartMsg = "<br>";
    }
    arartMsg = arartMsg+"・保護者の誕生日を入力してください<br>(Please enter parent's date of birth)"
}

arartText = arartText + arartMsg;
arartMsg = "";

// 子供1誕生日のチェック
if($('input[name="child1birthday"]').val()==""){
    if(arartText!=""){
        arartMsg = "<br>";
    }
    arartMsg = arartMsg+"・1人目お子様の誕生日を入力してください<br>(Please enter the date of birth of your first child)"
}

arartText = arartText + arartMsg;
arartMsg = "";

// 子供2のチェック
if($('input[name="child2name"]').val()!=""||$('input[name="child2furigana"]').val()!=""||$('input[name="child2nickname"]').val()!=""||$('input[name="child2birthday"]').val()!=""){
    if($('input[name="child2name"]').val()==""||$('input[name="child2furigana"]').val()==""||$('input[name="child2nickname"]').val()==""||$('input[name="child2birthday"]').val()==""){
        if(arartText!=""){
            arartMsg = "<br>";
        }
        arartMsg = arartMsg+"・2人目お子様の情報を全て入力してください<br>(Please enter all information for the second child)"
    }
}
arartText = arartText + arartMsg;
arartMsg = "";

// 子供3のチェック
if($('input[name="child3name"]').val()!=""||$('input[name="child3furigana"]').val()!=""||$('input[name="child3nickname"]').val()!=""||$('input[name="child3birthday"]').val()!=""){
    if($('input[name="child3name"]').val()==""||$('input[name="child3furigana"]').val()==""||$('input[name="child3nickname"]').val()==""||$('input[name="child3birthday"]').val()==""){
        if(arartText!=""){
            arartMsg = "<br>";
        }
        arartMsg = arartMsg+"・3人目お子様の情報を全て入力してください<br>(Please enter all information for the third child)"
    }
}
arartText = arartText + arartMsg;
arartMsg = "";

if(arartText!=""){
    $("#inputArrart").html(arartText);
    document.getElementById('inputArrart').classList.add('inputArrartShow');
    return false;
}

const name    = $('input[name="name"]').val();
const furigana = $('input[name="furigana"]').val();
const type    = $('input:radio[name="type"]:checked').val();
const preDate = kibobivalue;
const sTime = $('[name=sTimeH]').val() + ":" + $('[name=sTimeM]').val();
const eTime = $('[name=eTimeH]').val() + ":" + $('[name=eTimeM]').val();
const yobi = yobivalue;
const lang = $('input:radio[name="lang"]:checked').val();
const langOther = $('input[name="langOther"]').val();
const pet = $('input:radio[name="pet"]:checked').val();
const petKinds = $('input[name="petKinds"]').val();
const biko = $('textarea[name="biko"]').val();
const birthday = $('input[name="birthday"]').val();
const phoneNo  = $('input[name="phoneNo"]').val();
const email  = $('input[name="email"]').val();
const address = $('input[name="address"]').val();
const station = $('input[name="station"]').val();
const time = $('input[name="time"]').val();
const child1name = $('input[name="child1name"]').val();
const child1furigana = $('input[name="child1furigana"]').val();
const child1nickname = $('input[name="child1nickname"]').val();
const child1birthday = $('input[name="child1birthday"]').val();
const child1sex = $('input:radio[name="child1sex"]:checked').val();
const child2name = $('input[name="child2name"]').val();
const child2furigana = $('input[name="child2furigana"]').val();
const child2nickname = $('input[name="child2nickname"]').val();
const child2birthday = $('input[name="child2birthday"]').val();
const child2sex = $('input:radio[name="child2sex"]:checked').val();
const child3name = $('input[name="child3name"]').val();
const child3furigana = $('input[name="child3furigana"]').val();
const child3nickname = $('input[name="child3nickname"]').val();
const child3birthday = $('input[name="child3birthday"]').val();
const child3sex = $('input:radio[name="child3sex"]:checked').val();
const coupon = $('input[name="coupon"]').val();
const dePlace = $('input[name="dePlace"]').val();

const msg = `【区分】ご予約\n【氏名】${name}\n【フリガナ】${furigana}\n【タイプ】${type}\n【希望日時】${preDate}\n【開始】${sTime}\n【終了】${eTime}\n【曜日】${yobi}\n【希望場所】${dePlace}\n【言語】${lang}\n【その他言語】${langOther}\n【ペット】${pet}\n【ペットの種類】${petKinds}\n【備考】${biko}\n【クーポンコード】${coupon}\n【生年月日】${birthday}\n【電話番号】${phoneNo}\n【メールアドレス】${email}\n【住所】${address}\n【最寄り駅】${station}\n【徒歩】${time}\n【1人目のお名前】${child1name}\n【フリガナ】${child1furigana}\n【呼び方】${child1nickname}\n【誕生日】${child1birthday}\n【性別】${child1sex}\n【2人目のお名前】${child2name}\n【フリガナ】${child2furigana}\n【呼び方】${child2nickname}\n【誕生日】${child2birthday}\n【性別】${child2sex}\n【3人目のお名前】${child3name}\n【フリガナ】${child3furigana}\n【呼び方】${child3nickname}\n【誕生日】${child3birthday}\n【性別】${child3sex}`;

//alert(msg);
sendText(msg);
return false;
    });
});


window.onload = function() {
    const spinner = document.getElementById('loading');
    
    setTimeout(function() {
        // Add .loaded to .loading
        spinner.classList.add('loaded');
    }, 3000);

}

function getData(userID) {
    const endpoint = "https://script.google.com/macros/s/AKfycbwsQYEEajE-pXvm_FVPR6Y9sCNAljuXQNEd3IUMDDfZz_0HSXJWlbQy5UHn7rMktyg/exec";
      
    //APIを使って非同期データを取得する
    fetch((urlOf(endpoint, { userID: userID })))
    .then(response => response.json())
    /*成功した処理*/
    .then(data => {
        //JSONから配列に変換
        const object = data;
        //inputタグそれぞれに取得したデータを設定
        $('input').each(function (index, element) {
            if (object[0][$(element).attr('name')]) {
                $(element).val([object[0][$(element).attr('name')]]);
            }
        });
    });
 }

function urlOf(url, params) {
    return `${url}?${Object.entries(params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join('&')}`;
}