// script.js

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    preloader.style.opacity = '0';
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Sticky Header
window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Hamburger Menu
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Scroll Animations
const sections = document.querySelectorAll('section');

const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in', 'visible');
        }
    });
}, options);

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Calorie Calculator
const calcForm = document.getElementById('calc-form');
const calcResult = document.getElementById('calc-result');

calcForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(calcForm);
    const gender = formData.get('gender');
    const age = parseFloat(formData.get('age'));
    const weight = parseFloat(formData.get('weight'));
    const height = parseFloat(formData.get('height'));
    const activity = parseFloat(formData.get('activity'));
    const goal = formData.get('goal');

    let bmr;
    if (gender === 'male') {
        bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
        bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    const tdee = bmr * activity;
    let calories = tdee;
    if (goal === 'lose') calories -= 500; // Deficit
    if (goal === 'gain') calories += 500; // Surplus

    calcResult.innerHTML = `
        <p>BMR: ${bmr.toFixed(0)} ккал</p>
        <p>Суточная норма: ${tdee.toFixed(0)} ккал</p>
        <p>Для цели (${goal}): ${calories.toFixed(0)} ккал</p>
    `;
});

// Consultation Form (mock submit)
const consultForm = document.getElementById('consult-form');

consultForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Заявка отправлена!');
    console.log('Form data:', new FormData(consultForm));
    consultForm.reset();
});