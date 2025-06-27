"use strict";

function switchDiv(targetId) { // this function switches the divs in the items section by adding and removing the "hidden" class and "visible" class
    const divs = ['div1', 'div2', 'div3'];
    divs.forEach(id => {
        const thing = document.getElementById(id);
        if (id === targetId) {
            thing.classList.remove('hidden');
            thing.classList.add('visible');
        } else {
            thing.classList.remove('visible');
            thing.classList.add('hidden');
        }
    });
}

function switchMode() { // similar to switchDiv, this function toggles the current display mode by taking every element with either a light mode or dark mode class and swapping it
    const modes = [
        ['lmodetxt', 'dmodetxt'],
        ['lmodebg', 'dmodebg'],
        ['bg', 'dbg'],
        ['lmodebdr', 'dmodebdr']
    ];
    modes.forEach(([light, dark]) => {
        const things = document.querySelectorAll(`.${light}, .${dark}`);
        things.forEach(i => {
            i.classList.toggle(light);
            i.classList.toggle(dark);
        });
    });
}

function req() { // this function changes the "required" visual between phone and email depending on which radio button is clicked
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    const phoner = document.getElementById("phoner");
    const emailr = document.getElementById("emailr");
    if (phone.checked) {
        phoner.innerHTML = "*";
        emailr.innerHTML = " ";
    } else if (email.checked) {
        emailr.innerHTML = "*";
        phoner.innerHTML = " ";
    }
}

function submitter(e) { // this function verifies each of the inputs in the form, returning an error if something is missing, or storing the inputs into an element and relaying it to the user
	e.preventDefault();
    // establishing variables
    let name = document.getElementById("name");
    let contactMethod = document.querySelector('input[name="contact"]:checked').value;
    let phone = document.getElementById("phoneNum");
    let email = document.getElementById("emailAdd");
    let comments = document.getElementById("comments");
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,5}$/;
    let nameSpan = name.previousElementSibling;
    let phoneSpan = phone.previousElementSibling;
    let emailSpan = email.previousElementSibling;
    let commentSpan = comments.previousElementSibling;
    let result = document.getElementById("result");
    let hasError = false;
    // clearing spans
    nameSpan.innerHTML = "";
    phoneSpan.innerHTML = "";
    emailSpan.innerHTML = "";
    commentSpan.innerHTML = "";
    result.innerHTML = "";
    // testing name
    if (name.value.trim().length < 1) {
        nameSpan.innerHTML = "Please enter a valid name.";
        hasError = true;
    }
    // testing phone, if required
    if (contactMethod === "Phone") {
        if (!phoneRegex.test(phone.value.trim())) {
            phoneSpan.innerHTML = "Please enter a valid phone number.";
            hasError = true;
        }
    }
    // testing email, if required
    if (contactMethod === "Email") {
        if (!emailRegex.test(email.value.trim())) {
            emailSpan.innerHTML = "Please enter a valid email address.";
            hasError = true;
        }
    }
    // testing comment
    if (comments.value.trim().length < 1) {
        commentSpan.innerHTML = "Please enter a comment.";
        hasError = true;
    }
    // if an error was found, returns
    if (hasError) return;
    // loads inputs into customer
    const customer = {
        name: name.value.trim(),
        contactMethod,
        phone: phone.value.trim() || "None",
        email: email.value.trim() || "None",
        comments: comments.value.trim()
    };
    // displays customer inputs to user
    result.innerHTML = `Submission recorded:<br>
    Name: ${customer.name}<br>
    Preferred Contact: ${customer.contactMethod}<br>
    Phone: ${customer.phone}<br>
    Email: ${customer.email}<br>
    Comments: ${customer.comments}`;
    // resets inputs
    document.getElementById("reset").reset();
}

function rando(min, max) { // this function is based on the random number generator from the module 6 coding activity
   return Math.floor(Math.random() * (max - min + 1)) + min;
}

function game() { // this function takes in the number input, compares it to the randomly generated number, and outputs wether the player won or not
    let out1 = document.getElementById("playeroutput");
    let out2 = document.getElementById("randomoutput");
    let result = document.getElementById("gameresult");
    let error = document.getElementById("gameerror");
    let input = document.getElementById("number").value;
    let rand = rando(1, 10);
    out1.innerHTML = "";
    out2.innerHTML = "";
    result.innerHTML = "";
    error.innerHTML = "";
    let hasError = false;

    if (input < 1 || input > 10) { // checking for a valid number
        error.innerHTML = "Please enter a number between 1 and 10."
        hasError = true;
    }

    if (hasError) return; // returns error

    out1.innerHTML = "Your guess: " + input;
    out2.innerHTML = "Our number: " + rand;

    if (parseInt(input) === rand) { // comparing input to random
        result.innerHTML = "Congratulations! You've won a free coupon!"
    } else {
        result.innerHTML = "Too bad!"
    }

}

document.querySelector("form").addEventListener("submit", submitter);