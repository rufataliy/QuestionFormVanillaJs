const wrapper = document.querySelector(".wrapper");
let totalScore = 0;
const questions = [{
        q: "What is the capital of South Korea?",
        type: "text"
    },
    {
        q: "There are more kangaroos in Australia than humans. True or false?",
        type: "tf"
    },
    {
        q: "10 + 10 x 10 - 10 = ?",
        type: "text"
    },
    {
        q: "The population of Istanbul is almost half of the population of Canada. True or False?",
        type: "tf"
    },
    {
        q: "What type of cheese is made backwards?",
        type: "text"
    }
]

const answers = {
    1: "seoul",
    2: true,
    3: 100,
    4: true,
    5: "edam"
}

window.addEventListener('DOMContentLoaded', () => {
    const question_box = document.querySelectorAll(".question-box");
    const form_group = document.querySelectorAll(".form-group");
    question_box.forEach(item => item.addEventListener("click", (e) => {
        if (e.target.className == "question") {
            form_group.forEach(item => item.classList.remove("open"))
            const formGroup = e.target.nextSibling
            formGroup.classList.add("open")
        }
    }));
    form_group.forEach(form => form.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log();

        let answer = e.target.firstElementChild.value || e.target.querySelector("input").checked
        let id = e.target.getAttribute("id")
        const message = document.createElement("span")
        message.className = "msg"
        const isAlreadyCorrect = e.target.nextSibling && e.target.nextSibling.classList.contains("correct");

        if (answer == answers[id] && !isAlreadyCorrect) {
            message.classList.remove("incorrect")
            document.querySelector(".msg") && document.querySelectorAll(".msg").forEach((item) => item.remove());
            document.querySelector(".msg") && console.log("msg");
            //document.querySelector(".msg").remove();
            message.textContent = "CORRECT"
            message.classList.add("correct")
            e.target.parentElement.classList.add("correct")
            totalScore++;
            document.querySelector(".totalScore").innerHTML = `Total Score ${totalScore}`;
        } else if (answer != answers[id]) {
            document.querySelector(".msg") && document.querySelectorAll(".msg").forEach((item) => item.remove());
            message.textContent = "INCORRECT"
            message.classList.remove("correct")
            message.classList.add("incorrect")
            e.target.parentElement.classList.remove("correct")
            e.target.parentElement.classList.add("incorrect")
        }

        if (e.target.getAttribute("id") == 3) {
            if (isNaN(Number(answer))) {
                message.innerHTML = "Please enter valid number"
                message.classList.add("incorrect")
            }
        }
        e.target.parentElement.appendChild(message)
    }))
});

const QuestionBox = ((question, type) => {
    let questionHtmlElement;
    let questionBoxHtml;
    let formHtml;
    let id = 1;
    createQuestion = (question, type) => {
        createQuestionBox()
        createForm(type)
        createButton()
        const questionElement = document.createElement("p");
        questionElement.innerHTML = question;
        questionElement.className = "question"
        questionBoxHtml.appendChild(questionElement);
        questionBoxHtml.appendChild(formHtml);
        return questionBoxHtml
    }
    createQuestionBox = () => {
        const box = document.createElement("div");
        box.className = "question-box";
        questionBoxHtml = box
    }
    appendQuestion = async(question) => {
        const questionBox = await createQuestionBox()
        questionBox.appendChild(createQuestion(question));
        return questionBox;
    }
    createForm = (type) => {
        const form = document.createElement("form");
        const input = document.createElement("input");
        const box = document.createElement("div")
        box.className = "checkbox-group"
        input.className = "form-input"
        form.className = "form-group"
        createCheckbox = () => {
            const labels = ["true", "false"]
            let checkboxes = [];
            labels.forEach(item => {
                const checkbox = document.createElement("input");
                checkbox.setAttribute("type", "radio")
                checkbox.className = "radio"
                checkbox.setAttribute("name", "answer")
                const label = document.createElement("label")
                label.innerHTML = item;
                labels[item] = label;
                box.appendChild(label)
                box.appendChild(checkbox)
            })
            form.appendChild(box)
        }
        if (type == "text") {
            input.setAttribute("placeholder", "Your Answer")
            input.setAttribute("type", "text")
            input.setAttribute("name", "answer")
            form.appendChild(input)
        } else if (type == "tf") {
            createCheckbox();
        }
        form.setAttribute("id", `${id}`)
        id++;
        questionBoxHtml.appendChild(form);
        formHtml = form
    }
    createButton = () => {
        const button = document.createElement("button")
        button.setAttribute("type", "submit");
        button.textContent = "Submit";
        formHtml.appendChild(button)
    }
    this.init = (question, type) => {
        return createQuestion(question, type)
    }
    return { init: this.init }
})();

const QuestionBuilder = async(question, type) => {
    const newQuestionBox = await QuestionBox.init(question, type)
    wrapper.appendChild(newQuestionBox);
}

questions.map(({ q, type }) => QuestionBuilder(q, type))