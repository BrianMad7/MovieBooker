function generateToken(user) {
    const crypt = btoa(JSON.stringify(user));
    return crypt;
}

function verifyToken(token) {
    const decode = atob(token);
    // https://www.w3schools.com/jsref/met_win_atob.asp
    return JSON.parse(decode);
}


const test = {id: 1, name: "Brian", password: "Azerty", mail: "Brian@nest.fr"};
const token = generateToken(test);
console.log("Token:", token);
console.log("decode:", verifyToken(token))