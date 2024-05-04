function $(query) {
    return document.querySelector(query)
}
let questions = [
    {
        "text": "What is \\(1+2+3\\)?",
        "answer": 6
    },
    {
        "text": "Calculate \\(5\\cdot5\\cdot7\\).",
        "answer": 175
    },
]
function primes_lesseq_than(num) {
    let res = [];
    for (let i = 2; i <= num; i++) {
        let is_prime = true;
        res.forEach((prime) => {
            if (i%prime==0) {
                is_prime = false;
            }
        })
        if (is_prime) {
            res.push(i);
        }
    }
    return res;
}
function prime_factorize(num) {
    let res = [];
    let primes = primes_lesseq_than(num);
    let curr = num
    for (let i = 0; i < primes.length && primes[i]<=curr; i++) {
        if (curr%primes[i]==0) {
            res.push([primes[i],1])
            curr/=primes[i];
            while (curr%primes[i]==0) {
                curr /= primes[i];
                res[res.length-1][1]++;
            }
        }
    }
    return res;
}
function num_factors(num) {
    let factorization = prime_factorize(num);
    let res = 1;
    for (let i =0; i < factorization.length; i++) {
        res *= (factorization[i][1]+1);
    }
    return res;
}
function num_prime_factors(num) {
    return prime_factorize(num).length;
}
function length(num) {
    return num.toString().length;
}

let energy = 20;
function setEnergy(value) {
    energy = value;
    $("#energyDisplay").innerText = "Energy: "+value.toString()
}

let questionNumber = 1;
let startTime = new Date();
function askInformation(informationFunc,amount) {
    if (energy < amount) {
        alert("You do not have enough energy to do that. Solve problems to gain energy.");
        return;
    }
    setEnergy(energy-amount);
    alert(informationFunc(questions[questionNumber].answer));
} 

$("#problem").innerText=questions[questionNumber]["text"];
$("#answerForm").addEventListener("submit",(e) => {
    e.preventDefault();
    if ($("#answerBox").value == questions[questionNumber].answer.toString()) {
        // alert("You are CORRECT!");
        setEnergy(energy+Math.floor(100/(1+Math.pow(Math.E,(new Date() - startTime)/10000))+50));
    } else {
        // alert("Incorrect. -10 energy.")
        setEnergy(energy-10);
    }
})