/*==========================================================
  SPIDER-VERSE MONTHSARY
  VERSION 2
==========================================================*/
/*==========================================================
  DOM ELEMENTS
==========================================================*/
const screens = document.querySelectorAll(".screen");
const loadingScreen = document.getElementById("loadingScreen");
const introScreen = document.getElementById("introScreen");
const lockScreen = document.getElementById("lockScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const monthsaryScreen = document.getElementById("monthsaryScreen");
const quizScreen = document.getElementById("quizScreen");
const motorcycleScreen = document.getElementById("motorcycleScreen");
const vaultScreen = document.getElementById("vaultScreen");
const letterScreen = document.getElementById("letterScreen");
const endingScreen = document.getElementById("endingScreen");
/* Loading */
const loadingProgress = document.getElementById("loadingProgress");
const loadingText = document.getElementById("loadingText");
const loadingPercent = document.getElementById("loadingPercent");
/* Intro */
const startGame = document.getElementById("startGame");
/* Music */
const bgMusic = document.getElementById("bgMusic");
const musicButton = document.getElementById("musicButton");
const vaultSpider = document.getElementById("vaultSpider");
/*==========================================================
  GAME STATE
==========================================================*/
const game = {
    currentScreen:"loading",
    musicPlaying:false,
};
/*==========================================================
  SCREEN MANAGER
==========================================================*/
function showScreen(id){
    screens.forEach(screen=>{
        screen.classList.remove("active");
    });
    const next = document.getElementById(id);
    if(next){
        next.classList.add("active");
        game.currentScreen=id;
    }
}
/*==========================================================
  LOADING SCREEN
==========================================================*/
const loadingMessages=[
"Initializing Spider-Verse...",
"Loading Memories...",
"Preparing Secret Files...",
"Connecting Hearts...",
"Almost Ready..."
];
let load=0;
function startLoading(){
    const timer=setInterval(()=>{
        load++;
        loadingProgress.style.width=load+"%";
        loadingPercent.textContent=load+"%";
        if(load<20){
            loadingText.textContent=loadingMessages[0];
        }
        else if(load<40){
            loadingText.textContent=loadingMessages[1];
        }
        else if(load<60){
            loadingText.textContent=loadingMessages[2];
        }
        else if(load<80){
            loadingText.textContent=loadingMessages[3];
        }
        else{
            loadingText.textContent=loadingMessages[4];
        }
        if(load>=100){
            clearInterval(timer);
            setTimeout(()=>{
                showScreen("introScreen");
            },500);
        }
    },30);
}
/*==========================================================
  MUSIC
==========================================================*/
function playMusic(){
    bgMusic.volume=.35;
    bgMusic.play()
    .then(()=>{
        game.musicPlaying=true;
        musicButton.textContent="🔊";
    })
    .catch(()=>{
        musicButton.textContent="🎵";
    });
}
function toggleMusic(){
    if(game.musicPlaying){
        bgMusic.pause();
        musicButton.textContent="🔇";
        game.musicPlaying=false;
    }
    else{
        playMusic();
    }
}
musicButton.addEventListener("click",toggleMusic);
/*==========================================================
  INTRO
==========================================================*/
startGame.addEventListener("click",()=>{
    showScreen("lockScreen");
});
/*==========================================================
  START WEBSITE
==========================================================*/
window.addEventListener("load",()=>{
    startLoading();
    playMusic();
});
/*==========================================================
  LOCK SYSTEM
==========================================================*/
/*
PASSCODES
111402 = Kyla's Birthday
122104 = His Birthday
010126 = Monthsary
*/
const PASSCODE_MAIN = "111402";
const PASSCODE_BIRTHDAY = "122104";
const PASSCODE_MONTHSARY = "010126";
/* DOM */
const dots = document.querySelectorAll(".passDot");
const keys = document.querySelectorAll(".key");
const deleteButton = document.getElementById("deleteButton");
const enterButton = document.getElementById("enterButton");
const lockMessage = document.getElementById("lockMessage");
const wrongPasswordPopup =
document.getElementById("wrongPasswordPopup");
const closeWrongPassword =
document.getElementById("closeWrongPassword");
const lockCard =
document.querySelector(".lockCard");
const lockBackButton =
document.getElementById("lockBackButton");
const backToLockButtons =
document.querySelectorAll(".backToLockButton");
//const continueLetter = document.getElementById("continueLetter");
/*==========================================================
STATE
==========================================================*/
let enteredCode = "";
/*==========================================================
UPDATE DOTS
==========================================================*/
function updateDots(){
    dots.forEach((dot,index)=>{
        if(index<enteredCode.length){
            dot.classList.add("active");
        }
        else{
            dot.classList.remove("active");
        }
    });
}
/*==========================================================
NUMBER BUTTONS
==========================================================*/
keys.forEach(button=>{
    button.addEventListener("click",()=>{
        if(enteredCode.length>=6) return;
        enteredCode += button.dataset.key;
        updateDots();
    });
});
/*==========================================================
DELETE
==========================================================*/
deleteButton.addEventListener("click",()=>{
    enteredCode = enteredCode.slice(0,-1);
    updateDots();
});
/*==========================================================
RESET
==========================================================*/
function resetPasscode(){
    enteredCode="";
    updateDots();
}
/*==========================================================
WRONG PASSWORD
==========================================================*/
function wrongPassword(){
    lockCard.classList.add("shake");
    lockMessage.textContent="Wrong passcode.";
    wrongPasswordPopup.classList.add("show");
    setTimeout(()=>{
        lockCard.classList.remove("shake");
    },450);
}
/*==========================================================
ENTER
==========================================================*/
enterButton.addEventListener("click",()=>{
    if(enteredCode.length<6){
        lockMessage.textContent="Please enter 6 digits.";
        return;
    }
    switch(enteredCode){
        case PASSCODE_MAIN:
            resetPasscode();
            showScreen("quizScreen");
            break;
        case PASSCODE_BIRTHDAY:
            resetPasscode();
            showScreen("birthdayScreen");
            break;
        case PASSCODE_MONTHSARY:
            resetPasscode();
            showScreen("monthsaryScreen");
            break;
        default:
            wrongPassword();
            resetPasscode();
    }
});
/*==========================================================
POPUP
==========================================================*/
closeWrongPassword.addEventListener("click",()=>{
    wrongPasswordPopup.classList.remove("show");
    lockMessage.textContent="Enter a 6-digit passcode";
});
/*==========================================================
BACK BUTTON
==========================================================*/
lockBackButton.addEventListener("click",()=>{
    showScreen("introScreen");
});
/*==========================================================
SECRET SCREENS
==========================================================*/
backToLockButtons.forEach(button=>{
    button.addEventListener("click",()=>{
        showScreen("lockScreen");
    });
});
/*==========================================================
  QUIZ ENGINE
==========================================================*/
const questionText = document.getElementById("questionText");
const answerContainer = document.getElementById("answerContainer");
const submitAnswer = document.getElementById("submitAnswer");
const quizProgress = document.getElementById("quizProgress");
const questionCounter = document.getElementById("questionCounter");
const correctPopup = document.getElementById("correctPopup");
const wrongPopup = document.getElementById("wrongPopup");
const quizBackButton = document.getElementById("quizBackButton");
/*==========================================================
QUESTIONS
==========================================================*/
const questions = [
{
type:"text",
question:"Where was our first date?",
answers:["benoks"],
correctPopup:{
    emoji:"🥰",
    title:"",
    message:""
},
wrongPopup:{
    emoji:"😡",
    title:"Tatamaan ka!",
    message:"Sinong kadate mo diyan?!"
}
},
{
type:"text",
question:"Where was our first kiss?",
answers:["baywalk","tanauan"],
correctPopup:{
    emoji:"🥰",
    title:"",
    message:""
},
wrongPopup:{
    emoji:"😡",
    title:"Tatamaan ka!",
    message:"Sinong kiniss kaya?!"
}
},
{
type:"text",
question:"Where did we first meet?",
answers:["results","resultscx","work"],
correctPopup:{
    emoji:"🥰",
    title:"",
    message:""
},
wrongPopup:{
    emoji:"😡",
    title:"Tatamaan ka!",
    message:"Ibang babae kinita mo diyan siguro."
}
},
{
type:"text",
question:"When is my birthdate? (MM-DD-YY)",
answers:["11-14-02"],
correctPopup:{
    emoji:"🥰",
    title:"",
    message:""
},
wrongPopup:{
    emoji:"🥲",
    title:"Awww..",
    message:"Hindi ko birthday 'yan :<"
}
},
{
type:"choice",
question:"What is my favorite color?",
choices:[
"Pink and Blue",
"Blue and Purple",
"Pink,Blue,and Purple",
"Purple and Pink"
],
answer:"Pink and Blue",
correctPopup:{
    emoji:"🥰",
    title:"",
    message:""
},
wrongPopup:{
    emoji:"😭",
    title:"Awww..",
    message:"Ayoko po sa purple :<"
}
},
{
type:"choice",
question:"What is my eye color?",
choices:[
"Brown",
"Black",
"Hazel",
"Green"
],
answer:"Brown",
correctPopup:{
    emoji:"🥰",
    title:"",
    message:""
},
wrongPopup:{
    emoji:"🙈",
    title:"Look closer!",
    message:"You're supposed to stare into my eyes, remember? Try again. 😆"
}
},
{
type:"choice",
question:"What is my favorite fast food?",
choices:[
"McDonald's",
"KFC",
"Jollibee",
"Chowking"
],
answer:"Jollibee",
correctPopup:{
    emoji:"🥰",
    title:"",
    message:""
},
wrongPopup:{
    emoji:"🍔",
    title:"Nope!",
    message:"Hehe... that's not my favorite po."
}
},
{
type:"choice",
question:"Do you think I'm pretty?",
choices:[
"Yes ❤️",
"No"
],
noRightWrong:true,
answer:"Yes ❤️",
correctPopup:{
    emoji:"🥹❤️",
    message:"Awww, thank you, love. Hearing that from you always makes me smile. But more than feeling pretty, I'm happiest knowing that I'm loved by you. ❤️"
},
wrongPopup:{
    emoji:"🥺",
    title:"Thank you for being honest.",
    message:"Beauty is different for everyone, and I respect your honesty. Even so, thank you for loving me for who I am, beyond appearances. That's what matters most to me. ❤️"
}
},
{
type:"choice",
question:"Mahal mo pa ba ako?",
choices:[
"Yes ❤️",
"No"
],
noRightWrong:true,
answer:"Yes ❤️",
correctPopup:{
    emoji:"❤️🥹",
    message:"Thank you for choosing to love me every single day. I love you so much too, and I'll continue choosing you every day as well. ❤️"
},
wrongPopup:{
    emoji:"🥺",
    title:"Thank you for being honest.",
    message:"If that's truly how you feel, thank you for answering honestly. Even if it's difficult to hear, I'd rather know the truth than be given an answer you don't genuinely mean. No matter what happens, thank you for taking the time to play this little adventure I made for you. ❤️"
}
},
{
type:"choice",
question:"Do you ever think of breaking up with me? You can be completely honest with me.",
choices:[
"Yes",
"No"
],
noRightWrong:true,
answer:"No",
correctPopup:{
    emoji:"💍❤️",
    title:"Thank you...",
    message:"That means more to me than you know. I hope we continue choosing each other through every challenge, and I can't wait to create even more memories with you."
},
wrongPopup:{
    emoji:"🥺",
    title:"Thank you for being honest.",
    message:"Relationships aren't always easy, and I appreciate your honesty. I hope we'll always choose to talk things through instead of giving up on each other. I love you. ❤️"
}
},
];
/*==========================================================
STATE
==========================================================*/
let currentQuestion = 0;
let selectedChoice = "";
/*==========================================================
  QUIZ ENGINE
  PART 3B - LOAD QUESTIONS
==========================================================*/
function loadQuestion(){
    const q = questions[currentQuestion];
    /* Progress */
    questionCounter.textContent =
    `Question ${currentQuestion + 1} / ${questions.length}`;
    quizProgress.style.width =
    `${((currentQuestion) / questions.length) * 100}%`;
    questionText.textContent = q.question;
    answerContainer.innerHTML = "";
    selectedChoice = "";
    /* TEXT QUESTION */
    if(q.type === "text"){
        const input = document.createElement("input");
        input.type = "text";
        input.className = "answerInput";
        input.placeholder = "Type your answer here...";
        input.autocomplete = "off";
        answerContainer.appendChild(input);
        // Press Enter to submit
        input.addEventListener("keydown",(event)=>{
            if(event.key === "Enter"){
                submitAnswer.click();
            }
        });
    }
    /* MULTIPLE CHOICE */
    else{
        const grid = document.createElement("div");
        grid.className = "choiceGrid";
        q.choices.forEach(choice=>{
            const button = document.createElement("button");
            button.type = "button";
            button.className = "choiceButton";
            button.textContent = choice;
            button.addEventListener("click",()=>{
                document
                .querySelectorAll(".choiceButton")
                .forEach(btn=>{
                    btn.classList.remove("selected");
                });
                button.classList.add("selected");
                selectedChoice = choice;
            });
            grid.appendChild(button);
        });
        answerContainer.appendChild(grid);
    }
}
/*==========================================================
START QUIZ
==========================================================*/
loadQuestion();
/*==========================================================
  QUIZ ENGINE
  PART 3C - ANSWER VALIDATION
==========================================================*/
/* Normalize text answers */
function normalizeAnswer(text){
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g," ");
}
/*==========================================================
SHOW POPUPS
==========================================================*/
function showCorrectPopup(data){
    correctPopup.querySelector(".popupIcon").textContent =
    data.emoji;
    correctPopup.querySelector("h2").textContent =
    data.title;
    correctPopup.querySelector("p").textContent =
    data.message;
    correctPopup.classList.add("show");
    setTimeout(()=>{
        correctPopup.classList.remove("show");
    },1600);
}
function showWrongPopup(data){
    wrongPopup.querySelector(".popupIcon").textContent =
    data.emoji;
    wrongPopup.querySelector("h2").textContent =
    data.title;
    wrongPopup.querySelector("p").textContent =
    data.message;
    wrongPopup.classList.add("show");
    setTimeout(()=>{
        wrongPopup.classList.remove("show");
    },1600);
}
/*==========================================================
CHECK ANSWER
==========================================================*/
submitAnswer.addEventListener("click",()=>{
    const q = questions[currentQuestion];
    let correct = false;
    /* ---------- TEXT QUESTIONS ---------- */
    if(q.type === "text"){
        const input = document.querySelector(".answerInput");
        if(!input){
            return;
        }
        const userAnswer = normalizeAnswer(input.value);
        correct = q.answers.some(answer =>
            normalizeAnswer(answer) === userAnswer
        );
    }
    /* ---------- MULTIPLE CHOICE ---------- */
    else{
        if(selectedChoice === ""){
        showWrongPopup(q.wrongPopup);
        return;
    }
    // Questions with no right or wrong answer
        if(q.noRightWrong){
        correct = true;
        }
        else{
         correct = selectedChoice === q.answer;
    }
}
    /* ---------- RESULT ---------- */
    if(correct){
    // For questions with no right or wrong answer
    if(q.noRightWrong){
        if(selectedChoice === q.answer){
            showCorrectPopup(q.correctPopup);
        }else{
            showWrongPopup(q.wrongPopup);
        }
    }else{
        showCorrectPopup(q.correctPopup);
    }
    currentQuestion++;
        /* Finished Quiz */
        if(currentQuestion >= questions.length){
            quizProgress.style.width = "100%";
            setTimeout(()=>{
                showScreen("motorcycleScreen");
            },1000);
            return;
        }
        /* Next Question */
        setTimeout(()=>{
            loadQuestion();
        },1000);
    }
    else{
        showWrongPopup(q.wrongPopup);
    }
});
/*==========================================================
BACK BUTTON
==========================================================*/
quizBackButton.addEventListener("click",()=>{
    if(confirm("Go back to the lock screen?\nYour quiz progress will restart.")){
        currentQuestion = 0;
        loadQuestion();
        showScreen("lockScreen");
    }
});
/*==========================================================
  MOTORCYCLE EASTER EGG
==========================================================*/
const motorcycleContainer =
document.getElementById("motorcycleContainer");
const seatHotspot =
document.getElementById("seatHotspot");
const motorHint =
document.getElementById("motorHint");
const motorBackButton =
document.getElementById("motorBackButton");
const secretPopup =
document.getElementById("secretPopup");
const closeSecretPopup =
document.getElementById("closeSecretPopup");
const openVault =
document.getElementById("openVault");
/*==========================================================
STATE
==========================================================*/
let wrongMotorClicks = 0;
/*==========================================================
WRONG CLICK
==========================================================*/
motorcycleContainer.addEventListener("click",(event)=>{
    // Ignore hotspot click (handled separately)
    if(event.target === seatHotspot){
        return;
    }
    wrongMotorClicks++;
    motorHint.textContent =
    "Nothing here... Keep looking. 🕷️";
    /* Give hint after 4 wrong clicks */
    if(wrongMotorClicks >= 4){
        wrongMotorClicks = 0;
        seatHotspot.classList.add("hint");
        motorHint.textContent =
        "Hmm... something feels different...";
        setTimeout(()=>{
            seatHotspot.classList.remove("hint");
            motorHint.textContent =
            "Try clicking somewhere on the motorcycle...";
        },2000);
    }
});
/*==========================================================
CORRECT CLICK
==========================================================*/
seatHotspot.addEventListener("click",(event)=>{
    event.stopPropagation();
    secretPopup.classList.add("show");
});
/*==========================================================
POPUP BUTTONS
==========================================================*/
closeSecretPopup.addEventListener("click",()=>{
    secretPopup.classList.remove("show");
});
openVault.addEventListener("click",()=>{
    secretPopup.classList.remove("show");
    showScreen("vaultScreen");
});
/*==========================================================
BACK BUTTON
==========================================================*/
motorBackButton.addEventListener("click",()=>{
    // Go back to the last question
    currentQuestion = questions.length - 1;
    loadQuestion();
    showScreen("quizScreen");
});
/*==========================================================
  MEMORY VAULT
==========================================================*/
const memoryPopup =
document.getElementById("memoryPopup");
const memoryTitle =
document.getElementById("memoryTitle");
const memoryContent =
document.getElementById("memoryContent");
const memoryCounter =
document.getElementById("memoryCounter");
const previousMemory =
document.getElementById("previousMemory");
const nextMemory =
document.getElementById("nextMemory");
const closeMemoryPopup =
document.getElementById("closeMemoryPopup");
const memoryJars =
document.querySelectorAll(".memoryJar");
const vaultBackButton =
document.getElementById("vaultBackButton");
/*==========================================================
MEMORY DATA
==========================================================*/
const vaultData = {
love:[
"Love, the biggest reason I love you is because you made me feel loved in ways I never imagined. You made me feel appreciated, valued, and accepted. You loved me through my flaws, my imperfections, my mood swings, and even the parts of myself that I still struggle to accept. You always remind me that I'm beautiful, especially on the days when I can't see it myself. Thank you for loving every version of me, not just the easy ones but even the difficult ones. Being loved by you has taught me what it truly feels like to be accepted for who I am.",
"Love, I love the way you make me feel secure. Thank you for always respecting me, even when I'm not around, and for showing me through both your words and your actions that I can trust you. I appreciate how you know your boundaries and how you always remind me that you would never betray my trust or treat another girl the way you treat me. Knowing that I'm the only girl you love gives me a kind of peace that I will never take for granted.",
"Love, I love how you make me feel like I truly belong in your life. Thank you for including me in your future and for proudly letting me be part of your world. Knowing that you're never ashamed to introduce me to your family and friends makes me feel so loved. I admit that there are times when my own overthinking makes me question or doubt your love for me. But every time you reassure me, my heart finds peace again. Thank you for never getting tired of reminding me that I'm the one you love and the one you want to spend your future with.",
"Love, I love how patient and understanding you are with me. No matter how difficult I become sometimes, you never leave me hanging after an argument. You notice whenever something is wrong, whenever I'm quiet, sad, or full of tampo, and you always do your best to understand me and make things better. I admire how you're willing to set your pride aside, apologize, and acknowledge mistakes, even when they aren't entirely yours, because our relationship has always mattered more to you than proving who is right. Your comforting words have brought me peace through so many moments, and I will always be grateful for that.",
"Love, I love how much effort you put into our relationship. Thank you for always keeping me updated about your day, for being honest with me, and for helping us grow by communicating the things we both need to improve. I know there were times when I got hurt because you forgot little things about me, like my eye color or my favorite fast food, and I won't deny that those moments affected me. But when I look at everything you've done for me, I realize those little things could never outweigh the countless ways you've shown your love. You continue to choose us, work through our differences, and put effort into making our relationship stronger every day. To me, those things will always matter so much more than remembering every small detail.",
`Love, I love everything about you. I love your smile, your scent, your laugh, your cute and funny side, your kindness, your intelligence, your wit, how hardworking you are, and how deeply you love your family. I even love the little things you're insecure about because they are part of the person I fell in love with. But more than anything, I love your heart. I love the way you love, the way you care, and the kind of person you choose to be every single day.
I know that we are both far from perfect. We both have flaws, differences, and parts of ourselves that still need to grow. There will always be things we need to improve, both individually and as partners. We won't always see things the same way, and there will be times when we misunderstand each other or make mistakes. But I don't think that's what defines our relationship. What matters to me is that we are willing to listen, learn, and grow together instead of letting those differences pull us apart.
Thank you for choosing to grow with me, even when loving me isn't always easy. Thank you for believing that our relationship is always worth working on. I hope you know that I feel the same way. I want to keep learning with you, improving with you, and becoming the best version of myself, not only for me but for us. I know we still have a long journey ahead of us, and that journey won't always be perfect, but I can't wait to experience every step of it with you.
You have given me countless reasons to love you, and those reasons continue to grow every single day. I don't just love who you are today. I also love the life we're building together and the future we dream about. If I had the chance to choose all over again, in every lifetime and in every version of my life, I would still choose you. Always.
`
],
sorry:[
"Love, I am truly sorry for the times I become moody, overly sensitive, too emotional, or easily triggered. I am sorry for giving you the silent treatment whenever I feel hurt, disappointed, sad, or full of tampo. I know it isn't fair to you, and I understand how much it can hurt you. You never deserved to carry the weight of my emotions, and I am deeply sorry for the times I let them affect the way I treated you.",
"Love, I am sorry for the times I have been inconsiderate of your feelings. I never intended to make you feel unimportant, unappreciated, or unloved because I have always valued your feelings just as much as my own. I am also sorry if my actions or words have ever made you feel like I don't love you enough. Please know that no matter how poorly I may have expressed it at times, my love for you has always been real and sincere.",
"Love, I am sorry if I have made you anxious or caused you to overthink because of my constant mood swings, my own overthinking, or even my recent actions. The last thing I would ever want is for me to become the reason you doubt yourself, our relationship, or my love for you. You deserve reassurance and peace, not uncertainty, and I am truly sorry for the times I failed to give you that.",
"Love, I am sorry for the times I wasn't open or vocal about what I was feeling and ended up making simple situations more complicated than they needed to be, leading to unnecessary arguments. I am also sorry for the jealousy I have shown at times. It was never because I didn't trust you. It was because I was scared of losing you. I am sorry for comparing our relationship to other relationships or to the things I see online instead of appreciating and protecting the beautiful relationship that we have together.",
"Love, I am sorry if there were times when I wasn't able to give you the love you needed or be there for you when you needed me the most. I am sorry if my efforts ever seemed lacking or if I wasn't able to express my love in the way that matched your love language. I am also sorry for the moments when I wasn't able to be the partner you deserved or fulfill my responsibilities as your girlfriend. You deserve to feel loved, appreciated, and supported every single day, and I am sorry for the times I fell short.",
`Love, I am sorry for every time I became a burden, ruined your mood because of my attitude, or hurt you through insensitive words or jokes without realizing it. I am sorry for every pain I have caused you, whether intentionally or unintentionally. Please always remember that I have never wanted to make you feel hurt, sad, disappointed, or unloved. I have always cared deeply about your feelings and emotions, even during the moments when I struggled to show it. Sometimes, saying "I'm sorry" is difficult for me because admitting that I was wrong, especially during our arguments, hurts more than I can explain, and I don't always have the courage to face that truth right away. But that doesn't mean I don't recognize my mistakes. I do, and I regret them more than you know. I promise to keep learning, growing, and becoming a better partner for you, because loving you is one of the most important things in my life, and I never want to stop choosing you.
`
],
memories:[
`January ❤️
The month where everything began. Our first kiss at Baywalk will always have a special place in my heart. I still laugh whenever I remember the time you brought me to a motel because we were supposed to watch a series, but we barely paid attention because cuddling each other was way more interesting. Our first month as an official couple was filled with so many sweet moments, especially at work. From our random kulitan, me always bringing tissues and bottled water for us, buying and refilling my alcohol because I wanted to share it with you, to scratching your head, hands, or back whenever they got itchy. Looking back, it was really the little things that made me fall in love with you even more.`,
`February ❤️
The first time I visited your home in Sto. Tomas will always be unforgettable. It was also the month where I officially lost my innocence... in a very funny way. 🤭 Let's just say someone got a little spoiled that day. HAHAHA. As embarrassing as it is to admit, it's one of those memories that still makes me laugh whenever I think about it. And of course, I'll never forget our first almost-breakup. As painful as it was, it reminded me just how much I loved you and how badly I wanted to keep choosing us.`,
`March ❤️
Our monthsary became even more memorable because we finally reached another milestone in our relationship. Let's just say my period wasn't enough to stop us. 😭😂 Aside from that, I'll never forget being by your side when you successfully aced your interview and assessment at TaskUs. I was so proud of you because I knew how much you wanted it. And of course, who could ever forget the mini heart attack we had when your motorcycle was almost towed by the HPG? Looking back now, it's one of those memories we'll probably laugh about forever.`,
`April ❤️
Our unplanned summer outing at Miralles Resort will always have a special place in my heart. It wasn't something we carefully planned, but that's exactly what made it so memorable. Spending that day with you, making spontaneous memories together, was more than enough to make me happy.`,
`May ❤️
One of my favorite memories was getting to accompany you to your knee check-up. It may have seemed like a simple day, but being there for you meant a lot to me. I'll also never forget the day we both cried because we were so close to losing each other again. It was one of our most painful moments, but it reminded me that no matter how difficult things became, we still chose each other.`,
`June ❤️
I'll never forget when you treated me to Burger King for our monthsary. Before that, I got tampo because I thought you didn't have any plans to celebrate with me. I'll also always remember your first day wfh. It breaks my heart knowing that I ruined your mood because of my silent treatment. The truth was, I wasn't silent because I was angry. I was silently crying because I felt guilty about my own attitude and didn't know how to express what I was feeling. Looking back, it's a memory that reminds me of how much I still want to grow and become a better partner for you.`
],
photos:[
"assets/images/sm-us1.jpg",
"assets/images/sm-us2.jpg",
"assets/images/sm-us3.jpg",
"assets/images/sm-us4.jpg",
"assets/images/sm-us5.jpg",
"assets/images/sm-us6.jpg"
]
};
/*==========================================================
STATE
==========================================================*/
let currentJar = "";
let currentMemory = 0;
const completedJars = {
love:false,
sorry:false,
memories:false,
photos:false
};
/*==========================================================
  MEMORY VAULT ENGINE
==========================================================*/
/*----------------------------------------------------------
OPEN JAR
----------------------------------------------------------*/
memoryJars.forEach(jar=>{
    jar.addEventListener("click",()=>{
        currentJar = jar.dataset.jar;
        currentMemory = 0;
        openMemory();
    });
});
/*----------------------------------------------------------
OPEN MEMORY
----------------------------------------------------------*/
function openMemory(){
    memoryPopup.classList.add("show");
    //continueLetter.classList.add("hidden");
    renderMemory();
}
/*----------------------------------------------------------
RENDER CURRENT MEMORY
----------------------------------------------------------*/
function renderMemory(){
    const list = vaultData[currentJar];
    memoryTitle.textContent =
    currentJar.charAt(0).toUpperCase() +
    currentJar.slice(1);
    memoryCounter.textContent =
    `${currentMemory + 1} / ${list.length}`;
    memoryContent.innerHTML = "";
    /* ---------- PHOTO ---------- */
    if(currentJar === "photos"){
        const image = document.createElement("img");
        image.src = list[currentMemory];
        image.alt = "Memory Photo";
        memoryContent.appendChild(image);
    }
    /* ---------- TEXT ---------- */
    else{
        const paragraph = document.createElement("p");
        paragraph.textContent =
        list[currentMemory];
        memoryContent.appendChild(paragraph);
    }
    previousMemory.disabled =
    currentMemory === 0;
    nextMemory.disabled = false;
    //currentMemory === list.length - 1;
}
/*----------------------------------------------------------
PREVIOUS
----------------------------------------------------------*/
previousMemory.addEventListener("click",()=>{
    if(currentMemory > 0){
        currentMemory--;
        renderMemory();
    }
});
nextMemory.addEventListener("click",()=>{
    const list = vaultData[currentJar];
    if(currentMemory < list.length - 2){
        currentMemory++;
        renderMemory();
    }
    else if(currentMemory === list.length - 2){
        // Move to the last page
        currentMemory++;
        renderMemory();
        // Mark complete immediately
        completeCurrentJar();
        checkVaultFinished();
    }
});
/*==========================================================
  MEMORY VAULT
  PART 5C
==========================================================*/
/*----------------------------------------------------------
MARK CURRENT JAR COMPLETE
----------------------------------------------------------*/
function completeCurrentJar(){
    if(completedJars[currentJar]){
        return;
    }
    completedJars[currentJar] = true;
    document
        .querySelector(`[data-jar="${currentJar}"]`)
        .classList.add("completed");
}
/*----------------------------------------------------------
CHECK ALL COMPLETE
----------------------------------------------------------*/
function checkVaultFinished(){
    const finished = Object.values(completedJars)
        .every(value => value);
    console.log("Finished:", finished);
    if(finished){
        console.log("Show spider");
        setTimeout(()=>{
            vaultSpider.classList.remove("hidden");
            vaultSpider.classList.add("show");
        },2000);
    }
}
vaultSpider.addEventListener("click",()=>{
    showScreen("letterScreen");
    startLetter();
});
// continueLetter.addEventListener("click",()=>{
//     memoryPopup.classList.remove("show");
//     continueLetter.classList.add("hidden");
//     showScreen("letterScreen");
//     startLetter();
// });
/*----------------------------------------------------------
CLOSE POPUP
----------------------------------------------------------*/
closeMemoryPopup.addEventListener("click",()=>{
    memoryPopup.classList.remove("show");
    const finished = Object.values(completedJars)
        .every(value => value);
    if(finished && vaultSpider.classList.contains("hidden")){
        setTimeout(()=>{
            vaultSpider.classList.remove("hidden");
            vaultSpider.classList.add("show");
        },2000);
    }
});
/*----------------------------------------------------------
BACK BUTTON
----------------------------------------------------------*/
vaultBackButton.addEventListener("click",()=>{
    showScreen("motorcycleScreen");
});
/*==========================================================
  LOVE LETTER
==========================================================*/
const letterContent =
document.getElementById("letterContent");
const skipTyping =
document.getElementById("skipTyping");
const finishLetter =
document.getElementById("finishLetter");
const letterBackButton =
document.getElementById("letterBackButton");
const playAgain =
document.getElementById("playAgain");
/*==========================================================
LETTER
==========================================================*/
const letter = `
Happy 6th Monthsary, Love. ❤️
Thank you for taking the time to play this little Spider-Verse adventure that I made just for you.
Every lock...
every question...
every memory...
was made because every moment we've shared means so much to me.
Thank you for loving me even on the days I'm difficult.
Thank you for staying.
Thank you for always making me smile.
I'm sorry for the times I became stubborn, emotional, or made things harder than they needed to be.
Please know that no matter what happens...
I will always choose you.
I know we aren't perfect.
But I truly hope we continue growing together, supporting one another, and creating even more memories in the future.
You're not only my favorite Spider-Man...
you're also my favorite person.
Happy 6th Monthsary.
I love you more than words can ever explain.
Forever yours,
❤️ Kyla
`;
let typingIndex = 0;
let typingTimer = null;
/*==========================================================
TYPEWRITER
==========================================================*/
function startLetter(){
    clearInterval(typingTimer);
    console.log("startLetter() called");
    typingIndex = 0;
    letterContent.textContent = "";
    finishLetter.style.display = "none";
    typingTimer = setInterval(()=>{
        if(typingIndex < letter.length){
            letterContent.textContent += letter.charAt(typingIndex);
            typingIndex++;
        }
        else{
            clearInterval(typingTimer);
            finishLetter.style.display = "inline-block";
        }
    },30);
}
/*==========================================================
SKIP
==========================================================*/
skipTyping.addEventListener("click",()=>{
    clearInterval(typingTimer);
    letterContent.textContent = letter;
    skipTyping.style.display = "none";
    finishLetter.style.display = "inline-block";
});
/*==========================================================
CONTINUE
==========================================================*/
finishLetter.addEventListener("click",()=>{
    showScreen("endingScreen");
    createHearts();
});
/*==========================================================
BACK
==========================================================*/
letterBackButton.addEventListener("click",()=>{
    showScreen("vaultScreen");
});
/*==========================================================
PLAY AGAIN
==========================================================*/
playAgain.addEventListener("click",()=>{
    location.reload();
});
/*==========================================================
FLOATING HEARTS
==========================================================*/
function createHearts(){
    for(let i=0;i<40;i++){
        setTimeout(()=>{
            const heart=document.createElement("div");
            heart.className="heart";
            heart.innerHTML="❤️";
            heart.style.left=Math.random()*100+"vw";
            heart.style.bottom="-30px";
            heart.style.fontSize=(18+Math.random()*22)+"px";
            document.body.appendChild(heart);
            setTimeout(()=>{
                heart.remove();
            },3000);
        },i*120);
    }
}
