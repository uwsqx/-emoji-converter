// ひらがな→絵文字辞書
let dictionary = {
  "あ":"💦","い":"🐶","う":"🐮","え":"🖼","お":"👹",

  "か":"🦟","き":"🌳","く":"💭","け":"⚔️","こ":"🈁",

  "さ":"🈂️","し":"🦌","す":"🍣","せ":"💺","そ":"🛷",

  "た":"🐙","ち":"🩸","つ":"🌙","て":"✋","と":"🐯",

  "な":"🍐","に":"🥕","ぬ":"🧸","ね":"🐱","の":"🧠",

  "は":"🦷","ひ":"🔥","ふ":"🚢","へ":"🐍","ほ":"📕",

  "ま":"⭕️","み":"👂","む":"💜","め":"👀","も":"🍑",

  "や":"🗻","ゆ":"⛄️","よ":"🌃",

  "ら":"💕","り":"🐿","る":"🇷🇴","れ":"🍋","ろ":"🤖",

  "わ":"🐊","を":"🎶","ん":"🆖",

  "が":"🦟゛","ぎ":"🌳゛","ぐ":"💭゛","げ":"⚔️゛","ご":"🈁゛",

  "ざ":"🈂️゛","じ":"🦌゛","ず":"🍣゛","ぜ":"💺゛","ぞ":"🛷゛",

  "だ":"🐙゛","ぢ":"🩸゛","づ":"🌙゛","で":"✋゛","ど":"🐯゛",

  "ば":"🦷゛","び":"🔥゛","ぶ":"🚢゛","べ":"🐍゛","ぼ":"📕゛",

  "ぱ":"🦷ﾟ","ぴ":"🔥ﾟ","ぷ":"🚢ﾟ","ぺ":"🐍ﾟ","ぽ":"📕ﾟ",

  "ぁ":"💦","ぃ":"🐶","ぅ":"🐮","ぇ":"🖼","ぉ":"👹",

  "ゃ":"🗻","ゅ":"⛄️","ょ":"🌃",

  "っ":"🌙",
  "ー":"ー"
};

// 保存済み辞書を読み込む
const saved = localStorage.getItem("emojiDictionary");

if (saved) {
  dictionary = JSON.parse(saved);
}

// カタカナ→ひらがな
function katakanaToHiragana(str) {
  return str.replace(/[ァ-ヶ]/g, function(s) {
    return String.fromCharCode(s.charCodeAt(0) - 0x60);
  });
} 
// 変換
function convertText() {

  let text = document.getElementById("inputText").value;

  text = katakanaToHiragana(text);

  let result = "";

  for (let ch of text) {
    if (dictionary[ch]) {
      result += dictionary[ch];
    } else {
      result += ch;
    }
  }

  document.getElementById("output").innerText = result;
}

// コピー
function copyResult() {

  const text = document.getElementById("output").innerText;

  if (!text) {
    alert("コピーする内容がありません");
    return;
  }

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("コピーしました！");
      })
      .catch(() => {
        fallbackCopy(text);
      });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";

  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();

  document.execCommand("copy");

  document.body.removeChild(textarea);

  alert("コピーしました！");
}

// 辞書追加
function addDictionary() {

  const char = document.getElementById("newChar").value.trim();
  const emoji = document.getElementById("newEmoji").value.trim();

  if (char === "" || emoji === "") {
    alert("文字と絵文字を入力してください");
    return;
  }

  dictionary[char] = emoji;

  localStorage.setItem(
    "emojiDictionary",
    JSON.stringify(dictionary)
  );

  document.getElementById("newChar").value = "";
  document.getElementById("newEmoji").value = "";

  alert("追加しました！");
}
