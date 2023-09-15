

export function initChat() {


    let mic = document.getElementById("mic");
    let chatareamain = document.querySelector('.chatarea-main');
    let chatareaouter = document.querySelector('.chatarea-outer');

    let hello = ["Hello, I am Alex", "Hi, I am a Robo", "Hello, My name is Alex"];
    let FB = ["Always in the mood for food"];
    let CT = ["Saurav welcomes you to Fresh Bagel"];
    let help = ["How may i assist you?", "How can i help you?", "What i can do for you?"];
    let greetings = ["i am good you little piece of love", "i am fine, what about you", "don't want to talk", "i am good"];
    let hobbies = ["i love to talk with humans", "i like to make friends like you", "i like cooking"];
    let pizzas = ["which type of food item do you like?", "i can make a food item for you", "i would love to make a food item for you", "would you like food item?"];
    let thank = ["Most welcome", "Not an issue", "Its my pleasure", "Mention not"];
    let closing = ['Ok bye-bye', 'As you wish, bye take-care', 'Bye-bye, see you soon..']

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    function showusermsg(usermsg) {
        let output = '';
        output += `<div class="chatarea-inner user">${usermsg}</div>`;
        chatareaouter.innerHTML += output;
        return chatareaouter;
    }

    function showchatbotmsg(chatbotmsg) {
        let output = '';
        output += `<div class="chatarea-inner chatbot">${chatbotmsg}</div>`;
        chatareaouter.innerHTML += output;
        return chatareaouter;
    }

    function chatbotvoice(message) {
        const speech = new SpeechSynthesisUtterance();
        speech.text = "This is test message";
        if (message.includes('hello')) {
            let finalresult = hello[Math.floor(Math.random() * hello.length)];
            speech.text = finalresult;
        }
        if (message.includes('creators')) {
            let finalresult = CT[Math.floor(Math.random() * CT.length)];
            speech.text = finalresult;
        }
        if (message.includes('fresh Bagel')) {
            let finalresult = FB[Math.floor(Math.random() * FB.length)];
            speech.text = finalresult;
        }
        if (message.includes('fine')) {
            let finalresult = help[Math.floor(Math.random() * help.length)];
            speech.text = finalresult;
        }
        if (message.includes('how are you' || 'how are you doing today')) {
            let finalresult = greetings[Math.floor(Math.random() * greetings.length)];
            speech.text = finalresult;
        }
    
        if (message.includes('tell me something about you' || 'tell me something about your hobbies')) {
            let finalresult = hobbies[Math.floor(Math.random() * hobbies.length)];
            speech.text = finalresult;
        }

        if (message.includes('food items')) {
            let finalresult = pizzas[Math.floor(Math.random() * pizzas.length)];
            speech.text = finalresult;
        }
        if (message.includes('thank you' || 'thank you so much')) {
            let finalresult = thank[Math.floor(Math.random() * thank.length)];
            speech.text = finalresult;
        }
        if (message.includes('talk to you' || 'talk')) {
            let finalresult = closing[Math.floor(Math.random() * closing.length)];
            speech.text = finalresult;
        }
        window.speechSynthesis.speak(speech);
        chatareamain.appendChild(showchatbotmsg(speech.text));
    }

    recognition.onresult = function (e) {
        let resultIndex = e.resultIndex;
        let transcript = e.results[resultIndex][0].transcript;
        chatareamain.appendChild(showusermsg(transcript));
        chatbotvoice(transcript);
        console.log(transcript);
    }
    recognition.onend = function () {
        mic.style.background = "#ff3b3b";
    }
    mic.addEventListener("click", function () {
        mic.style.background = '#39c81f';
        recognition.start();
        console.log("Activated");
    })

}