import { throttle } from "lodash";

const form = document.querySelector(".feedback-form");
const input = document.querySelector('input[name="email"]');
const message = document.querySelector('textarea[name="message"]');

const localStorageInfo = JSON.parse(localStorage.getItem("feedback-form-state"));
if(localStorageInfo !== null){
    input.value = localStorageInfo.email;
    message.value = localStorageInfo.message;
}


form.addEventListener("input", throttle(handleInput, 500));
function handleInput(event){
      if(event.target === event.currentTarget){
        return;
    }  

    const key = "feedback-form-state";
    const values = {
        email: input.value,
        message: message.value,
    };

    localStorage.setItem(key, JSON.stringify(values));
};

form.addEventListener("submit", handleSubmit);
function handleSubmit(event){
    event.preventDefault();
    console.log(JSON.parse(localStorage.getItem("feedback-form-state")));

    localStorage.removeItem("feedback-form-state");
    form.reset();
};


