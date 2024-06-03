document.addEventListener('DOMContentLoaded', function() {
    const otpElement = document.getElementById('otp');
    const timerElement = document.getElementById('timer');
    const verificationResultElement = document.getElementById('verification-result');
    const toggleThemeButton = document.getElementById('toggle-theme');

    let otp = generateOTP();
    otpElement.textContent = otp;
    startTimer(30, timerElement, otpElement);

    function generateOTP() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    function startTimer(duration, display, otpElement) {
        let timer = duration, seconds;
        
        // Set the initial value immediately
        seconds = parseInt(timer % 60, 10);
        display.textContent = seconds;

        // Start the interval immediately after setting the initial value
        const intervalId = setInterval(() => {
            seconds = parseInt(timer % 60, 10);
            display.textContent = seconds;

            if (--timer < 0) {
                clearInterval(intervalId);
                otpElement.textContent = 'Expired';
            }
        }, 1000);
    }

    window.verifyOTP = function() {
        const userOTP = document.getElementById('otp-1').value +
                        document.getElementById('otp-2').value +
                        document.getElementById('otp-3').value +
                        document.getElementById('otp-4').value;
        if (otpElement.textContent === 'Expired') {
            verificationResultElement.textContent = 'OTP has expired.';
        } else if (userOTP === otp.toString()) {
            verificationResultElement.textContent = 'OTP is correct!';
        } else {
            verificationResultElement.textContent = 'Invalid OTP.';
        }
    }

    window.moveToNext = function(current, nextFieldID) {
        if (current.value.length >= current.maxLength) {
            document.getElementById(nextFieldID).focus();
        }
    }

window.toggleTheme = function() {
    document.body.classList.toggle('dark');
    if (document.body.classList.contains('dark')) {
        toggleThemeButton.textContent = '☀️';
    } else {
        toggleThemeButton.textContent = '🌙';
    }
}
});