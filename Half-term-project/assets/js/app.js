const buyButtons = document.querySelectorAll('.product button');

buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.style.animation = 'addToCartAnimation 0.5s ease-in-out';

        setTimeout(() => {
            button.classList.add('active');
        }, 1500);

        setTimeout(() => {
            button.classList.remove('active');
            button.style.animation = '';
        }, 3000);
    });
});

let selectedCategory = '';

const categoriesList = document.querySelector('.categories ul');
const productsGrid = document.querySelector('.product-grid');

function showProductsByCategory(category) {
    let productsGridAllItems = productsGrid.querySelectorAll(`.product[data-category="${category}"]`);
    document.getElementById("error").style.display = 'none';
    if(category !== ''){
        productsGrid.querySelectorAll('.product').forEach(product => {
            product.style.display = 'none';
        });
        if(productsGridAllItems.length === 0){
            document.getElementById("error").style.display = 'block';
        }
    }else{
        productsGrid.querySelectorAll('.product').forEach(product => {
            product.style.display = 'block';
        });
    }

    productsGridAllItems.forEach(product => {
        product.style.display = 'block';
    });
}
if(categoriesList !== null){
    categoriesList.querySelectorAll('li a').forEach(link => {
        link.addEventListener('click', () => {
            selectedCategory = link.getAttribute('href').replaceAll('#', '').split('/').pop();

            showProductsByCategory(selectedCategory);
        });
    });
    showProductsByCategory(window.location.href.split('#')[1] ?? '');

    categoriesList.querySelectorAll('li a').forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();

            const category = this.getAttribute('href').replace('#', '');
            const targetElement = document.querySelector(`[data-category="${category}"]`);

            if (targetElement) {
                const offset = targetElement.offsetTop - document.body.scrollTop;
                window.scrollTo({
                    top: offset,
                    behavior: 'smooth'
                });
            }
        });
    });
}


const paginationList = document.querySelector('.pagination ul');

if(paginationList !== null) {

    paginationList.querySelectorAll('li a').forEach(page => {
        page.addEventListener('click', function (event) {
            event.preventDefault();
            paginationList.querySelectorAll('li a').forEach(page => {
                page.classList.remove('active-page');
            });
            if (!isNaN(this.text)) {
                this.classList.add('active-page');
            }
        });
    });


    categoriesList.querySelectorAll('li a').forEach(category => {
        category.addEventListener('click', function (event) {
            event.preventDefault();
            categoriesList.querySelectorAll('li a').forEach(category => {
                category.classList.remove('active-category');
                category.parentElement.classList.remove('category-border');
            });
            this.parentElement.classList.add('category-border');
            this.classList.add('active-category');
        });
    });
}

const form = document.getElementById('contactForm');

form.addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    let isValid = true;

    if (name === '') {
        document.getElementById('nameError').textContent = 'نام را وارد کنید';
        isValid = false;
    } else {
        document.getElementById('nameError').textContent = '';
    }

    if (email === '') {
        document.getElementById('emailError').textContent = 'ایمیل را وارد کنید';
        isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        document.getElementById('emailError').textContent = 'ایمیل نامعتبر است';
        isValid = false;
    } else {
        document.getElementById('emailError').textContent = '';
    }

    if (message === '') {
        document.getElementById('messageError').textContent = 'پیام را وارد کنید';
        isValid = false;
    } else {
        document.getElementById('messageError').textContent = '';
    }

    if (isValid) {
        alert('فرم شما با موفقیت ارسال شد!');
    }
});