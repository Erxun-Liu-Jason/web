const formReasonSeletion = document.getElementById("form-reason");
formReasonSeletion.addEventListener('change', (e) => {
    document.querySelectorAll(".advice").forEach((el) => {
        el.classList.remove("show")
    })
    const advice = document.querySelector(`#advice-${e.target.value}`)
    advice.classList.add("show")
})
function validatePid() {
    const value = document.getElementById("form-pid").value;
    if (/^[A-Z]{2}[0-9]+[A-Z]$/.test(value)) {
        const checkSum = !/^[A-Z]{2}([0-9]+)[A-Z]$/.exec(value)[0]
            .split('')
            .map(Number.parseInt)
            .reduce((p, c) => p + c, 0) % 26;
        const charCodeA = 'A'.charCodeAt(0);
        if (value.charCodeAt(value.length - 1) - charCodeA + 1 !== checkSum) return false;
    } else return false;
    return true;
}
function validateForm(e) {
    const formTimes = ["form-time-9amto12pm", "form-time-12pmto3pm", "form-time-3pmto6pm"];
    const formDate = document.getElementById("form-date").value;
    if (!validatePid()) {
        alert("Patient ID is not correct.");
        e.preventDefault();
        return;
    } else if (!formDate && new Date().getDate) {
        alert("Appointment date is required.");
        e.preventDefault();
        return;
    } else if (!formTimes.some((f) => document.getElementById(f).checked)) {
        alert("Appointment time is required.");
        e.preventDefault();
        return;
    } else if (document.getElementById("form-reason").value === '') {
        alert("Appointment reason is required.");
        e.preventDefault();
        return;
    }
    alert("Submit Success!");
    e.preventDefault();
}
function convert(e) {
    e.target.value = e.target.value.toUpperCase();
}

document.getElementById("submit").addEventListener("click", validateForm);
document.getElementById("form-pid").addEventListener("keyup", convert);
