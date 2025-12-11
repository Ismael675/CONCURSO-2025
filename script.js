const data = [
    {
        place:'ALPES SUIZOS - SUIZA',
        title:'SAINT',
        title2:'ANTONIEN',
        description:'Saint-Antönien es una aldea alpina en el cantón de los Grisones, conocida por su paisaje montañoso bien conservado. Es un destino tranquilo ideal para senderismo y esquí de travesía..',
        image:'https://assets.codepen.io/3685267/timed-cards-1.jpg'
    },
    {
        place:'ALPES JAPONESES - JAPÓN',
        title:'NANGANO',
        title2:'PREFECTURE',
        description:'Nagano Prefecture es una región alpina de Japón situada en los Alpes Japoneses, famosa por sus montañas, estaciones de esquí y pueblos termales.',
        image:'https://assets.codepen.io/3685267/timed-cards-2.jpg'
    },
    {
        place:'DESIERTO DEL SAHARA - MARRUECOS',
        title:'Marruecos',
        title2:'MERZOUGA',
        description:'Merzouga es un pequeño pueblo del sureste de Marruecos, famoso por estar junto a las dunas de Erg Chebbi, uno de los paisajes más impresionantes del desierto del Sahara.',
        image:'https://assets.codepen.io/3685267/timed-cards-3.jpg'
    },
    {
        place:'SIERRA NEVADA - USA',
        title:'YOSEMITE',
        title2:'NATIONAL PARAK',
        description:'La Sierra Nevada es una gran cordillera montañosa del oeste de Estados Unidos, conocida por sus bosques, lagos alpinos y montañas emblemáticas, Dentro de ella se encuentra Yosemite National Park, famoso por sus enormes paredes de granito como El Capitan y Half Dome, sus cascadas espectaculares y sus valles glaciares.',
        image:'https://assets.codepen.io/3685267/timed-cards-4.jpg'
    },
    {
        place:'TARIFA - ESPAÑA',
        title:'PLAYA',
        title2:'DE LOS LANCES',
        description:'Tarifa, en el sur de España, es famosa por sus vientos y deportes acuáticos. La Playa de Los Lances es un amplio arenal ideal para kitesurf, windsurf y paseos frente al Atlántico.',
        image:'https://assets.codepen.io/3685267/timed-cards-5.jpg'
    },
    {
        place:'CAPADOCIA - TURQUÍA',
        title:'VALLE',
        title2:'DE GÖREME',
        description:'Capadocia, en el centro de Turquía, es famosa por sus paisajes de formaciones rocosas únicas y chimeneas de hadas. El Valle de Göreme es un destino destacado para excursiones, globos aerostáticos y explorar viviendas y iglesias excavadas en la roca.',
        image:'https://assets.codepen.io/3685267/timed-cards-6.jpg'
    },
]

const _ = (id)=>document.getElementById(id)
const cards = data.map((i, index)=>`<div class="card" id="card${index}" style="background-image:url(${i.image})"  ></div>`).join('')



const cardContents = data.map((i, index)=>`<div class="card-content" id="card-content-${index}">
<div class="content-start"></div>
<div class="content-place">${i.place}</div>
<div class="content-title-1">${i.title}</div>
<div class="content-title-2">${i.title2}</div>

</div>`).join('')


const sildeNumbers = data.map((_, index)=>`<div class="item" id="slide-item-${index}" >${index+1}</div>`).join('')
_('demo').innerHTML =  cards + cardContents
_('slide-numbers').innerHTML =  sildeNumbers


const range = (n) =>
  Array(n)
    .fill(0)
    .map((i, j) => i + j);
const set = gsap.set;

function getCard(index) {
  return `#card${index}`;
}
function getCardContent(index) {
  return `#card-content-${index}`;
}
function getSliderItem(index) {
  return `#slide-item-${index}`;
}

function animate(target, duration, properties) {
  return new Promise((resolve) => {
    gsap.to(target, {
      ...properties,
      duration: duration,
      onComplete: resolve,
    });
  });
}

let order = [0, 1, 2, 3, 4, 5];
let detailsEven = true;

let offsetTop = 200;
let offsetLeft = 700;
let cardWidth = 200;
let cardHeight = 300;
let gap = 40;
let numberSize = 50;
const ease = "sine.inOut";

function init() {
  const [active, ...rest] = order;
  const detailsActive = detailsEven ? "#details-even" : "#details-odd";
  const detailsInactive = detailsEven ? "#details-odd" : "#details-even";
  const { innerHeight: height, innerWidth: width } = window;
  offsetTop = height - 430;
  offsetLeft = width - 830;

  gsap.set("#pagination", {
    top: offsetTop + 330,
    left: offsetLeft,
    y: 200,
    opacity: 0,
    zIndex: 60,
  });
  gsap.set("nav", { y: -200, opacity: 0 });

  gsap.set(getCard(active), {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  gsap.set(getCardContent(active), { x: 0, y: 0, opacity: 0 });
  gsap.set(detailsActive, { opacity: 0, zIndex: 22, x: -200 });
  gsap.set(detailsInactive, { opacity: 0, zIndex: 12 });
  gsap.set(`${detailsInactive} .text`, { y: 100 });
  gsap.set(`${detailsInactive} .title-1`, { y: 100 });
  gsap.set(`${detailsInactive} .title-2`, { y: 100 });
  gsap.set(`${detailsInactive} .desc`, { y: 50 });
  gsap.set(`${detailsInactive} .cta`, { y: 60 });

  gsap.set(".progress-sub-foreground", {
    width: 500 * (1 / order.length) * (active + 1),
  });

  rest.forEach((i, index) => {
    gsap.set(getCard(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      y: offsetTop,
      width: cardWidth,
      height: cardHeight,
      zIndex: 30,
      borderRadius: 10,
    });
    gsap.set(getCardContent(i), {
      x: offsetLeft + 400 + index * (cardWidth + gap),
      zIndex: 40,
      y: offsetTop + cardHeight - 100,
    });
    gsap.set(getSliderItem(i), { x: (index + 1) * numberSize });
  });

  gsap.set(".indicator", { x: -window.innerWidth });

  const startDelay = 0.6;

  gsap.to(".cover", {
    x: width + 400,
    delay: 0.5,
    ease,
    onComplete: () => {
      setTimeout(() => {
        loop();
      }, 500);
    },
  });
  rest.forEach((i, index) => {
    gsap.to(getCard(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 30,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
    gsap.to(getCardContent(i), {
      x: offsetLeft + index * (cardWidth + gap),
      zIndex: 40,
      delay: 0.05 * index,
      ease,
      delay: startDelay,
    });
  });
  gsap.to("#pagination", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to("nav", { y: 0, opacity: 1, ease, delay: startDelay });
  gsap.to(detailsActive, { opacity: 1, x: 0, ease, delay: startDelay });
}

let clicks = 0;

function step() {
  return new Promise((resolve) => {
    order.push(order.shift());
    detailsEven = !detailsEven;

    const detailsActive = detailsEven ? "#details-even" : "#details-odd";
    const detailsInactive = detailsEven ? "#details-odd" : "#details-even";

    document.querySelector(`${detailsActive} .place-box .text`).textContent =
      data[order[0]].place;
    document.querySelector(`${detailsActive} .title-1`).textContent =
      data[order[0]].title;
    document.querySelector(`${detailsActive} .title-2`).textContent =
      data[order[0]].title2;
    document.querySelector(`${detailsActive} .desc`).textContent =
      data[order[0]].description;

    gsap.set(detailsActive, { zIndex: 22 });
    gsap.to(detailsActive, { opacity: 1, delay: 0.4, ease });
    gsap.to(`${detailsActive} .text`, {
      y: 0,
      delay: 0.1,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-1`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .title-2`, {
      y: 0,
      delay: 0.15,
      duration: 0.7,
      ease,
    });
    gsap.to(`${detailsActive} .desc`, {
      y: 0,
      delay: 0.3,
      duration: 0.4,
      ease,
    });
    gsap.to(`${detailsActive} .cta`, {
      y: 0,
      delay: 0.35,
      duration: 0.4,
      onComplete: resolve,
      ease,
    });
    gsap.set(detailsInactive, { zIndex: 12 });

    const [active, ...rest] = order;
    const prv = rest[rest.length - 1];

    gsap.set(getCard(prv), { zIndex: 10 });
    gsap.set(getCard(active), { zIndex: 20 });
    gsap.to(getCard(prv), { scale: 1.5, ease });

    gsap.to(getCardContent(active), {
      y: offsetTop + cardHeight - 10,
      opacity: 0,
      duration: 0.3,
      ease,
    });
    gsap.to(getSliderItem(active), { x: 0, ease });
    gsap.to(getSliderItem(prv), { x: -numberSize, ease });
    gsap.to(".progress-sub-foreground", {
      width: 500 * (1 / order.length) * (active + 1),
      ease,
    });

    gsap.to(getCard(active), {
      x: 0,
      y: 0,
      ease,
      width: window.innerWidth,
      height: window.innerHeight,
      borderRadius: 0,
      onComplete: () => {
        const xNew = offsetLeft + (rest.length - 1) * (cardWidth + gap);
        gsap.set(getCard(prv), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          zIndex: 30,
          borderRadius: 10,
          scale: 1,
        });

        gsap.set(getCardContent(prv), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
        });
        gsap.set(getSliderItem(prv), { x: rest.length * numberSize });

        gsap.set(detailsInactive, { opacity: 0 });
        gsap.set(`${detailsInactive} .text`, { y: 100 });
        gsap.set(`${detailsInactive} .title-1`, { y: 100 });
        gsap.set(`${detailsInactive} .title-2`, { y: 100 });
        gsap.set(`${detailsInactive} .desc`, { y: 50 });
        gsap.set(`${detailsInactive} .cta`, { y: 60 });
        clicks -= 1;
        if (clicks > 0) {
          step();
        }
      },
    });

    rest.forEach((i, index) => {
      if (i !== prv) {
        const xNew = offsetLeft + index * (cardWidth + gap);
        gsap.set(getCard(i), { zIndex: 30 });
        gsap.to(getCard(i), {
          x: xNew,
          y: offsetTop,
          width: cardWidth,
          height: cardHeight,
          ease,
          delay: 0.1 * (index + 1),
        });

        gsap.to(getCardContent(i), {
          x: xNew,
          y: offsetTop + cardHeight - 100,
          opacity: 1,
          zIndex: 40,
          ease,
          delay: 0.1 * (index + 1),
        });
        gsap.to(getSliderItem(i), { x: (index + 1) * numberSize, ease });
      }
    });
  });
}

async function loop() {
  await animate(".indicator", 2, { x: 0 });
  await animate(".indicator", 0.8, { x: window.innerWidth, delay: 0.3 });
  set(".indicator", { x: -window.innerWidth });
  await step();
loop();
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    let img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

async function loadImages() {
  const promises = data.map(({ image }) => loadImage(image));
  return Promise.all(promises);
}

async function start() {
  try {
    await loadImages();
    init();
  } catch (error) {
    console.error("One or more images failed to load", error);
  }
}

start()




// ===============================================
// LÓGICA DEL CARRITO (Guardar como script.js)
// ===============================================

// Función para obtener el carrito del localStorage
function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    // Devuelve el array de productos o un array vacío si no existe
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en el localStorage y actualizar el contador
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el contador de artículos en el icono del carrito
function updateCartCount() {
    const cart = getCart();
    const count = cart.length;
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = count;
        // Muestra el badge si hay artículos, lo oculta si está vacío.
        countElement.style.display = count > 0 ? 'block' : 'none';
    }
}

// Función para AÑADIR un producto al carrito
function addToCart(name, price, image, id) {
    // Convertir el precio a número de punto flotante
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
        console.error("Error: El precio proporcionado no es un número válido:", price);
        alert("No se pudo añadir el producto. El precio es inválido.");
        return; 
    }

    const cart = getCart();

    // Crear el objeto del nuevo producto
    const newProduct = {
        // Usar el ID proporcionado o un timestamp como ID único
        id: id || Date.now(), 
        name: name,
        price: numericPrice,
        image: image
    };

    cart.push(newProduct);
    saveCart(cart);
    
    // Alerta de confirmación visual
    alert(`"${name}" ha sido añadido a tu cesta.`);
}

// Función para eliminar un producto del carrito por su ID (Usada en cesta.html)
function removeFromCart(productId) {
    let cart = getCart();
    const initialLength = cart.length;
    
    // Filtrar el carrito: mantener solo los productos que NO coincidan con el ID
    // Convertir a string para una comparación segura
    cart = cart.filter(item => item.id.toString() !== productId.toString());
    
    if (cart.length < initialLength) {
        saveCart(cart);
        // Volver a renderizar si estamos en la página de la cesta
        if (document.getElementById('cart-items')) {
            renderCart(); 
        }
    }
}







// ===============================================
// LÓGICA DEL CARRITO (Guardar como script.js)
// ===============================================

// Función para obtener el carrito del localStorage
function getCart() {
    const cart = localStorage.getItem('shoppingCart');
    // Devuelve el array de productos o un array vacío si no existe
    return cart ? JSON.parse(cart) : [];
}

// Función para guardar el carrito en el localStorage y actualizar el contador
function saveCart(cart) {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
    updateCartCount();
}

// Función para actualizar el contador de artículos en el icono del carrito
function updateCartCount() {
    const cart = getCart();
    const count = cart.length;
    const countElement = document.getElementById('cart-count');
    if (countElement) {
        countElement.textContent = count;
        // Muestra el badge si hay artículos, lo oculta si está vacío.
        countElement.style.display = count > 0 ? 'block' : 'none';
    }
}

// Función para AÑADIR un producto al carrito
function addToCart(name, price, image, id) {
    // Convertir el precio a número de punto flotante
    const numericPrice = parseFloat(price);
    if (isNaN(numericPrice)) {
        console.error("Error: El precio proporcionado no es un número válido:", price);
        alert("No se pudo añadir el producto. El precio es inválido.");
        return; 
    }

    const cart = getCart();

    // Crear el objeto del nuevo producto
    const newProduct = {
        // Usar el ID proporcionado o un timestamp como ID único
        id: id || Date.now(), 
        name: name,
        price: numericPrice,
        image: image
    };

    cart.push(newProduct);
    saveCart(cart);
    
    // Alerta de confirmación visual
    alert(`"${name}" ha sido añadido a tu cesta.`);
}

// Función para eliminar un producto del carrito por su ID (Usada en cesta.html)
function removeFromCart(productId) {
    let cart = getCart();
    const initialLength = cart.length;
    
    // Filtrar el carrito: mantener solo los productos que NO coincidan con el ID
    cart = cart.filter(item => item.id.toString() !== productId.toString());
    
    if (cart.length < initialLength) {
        saveCart(cart);
        // Volver a renderizar si estamos en la página de la cesta
        if (document.getElementById('cart-items')) {
            renderCart(); 
        }
    }
}

// Función para renderizar el contenido del carrito (Usada en cesta.html)
function renderCart() {
    const cart = getCart();
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalElement = document.getElementById('cart-total');
    
    // Si no estamos en la página de la cesta, solo actualizamos el contador.
    if (!cartItemsContainer || !cartTotalElement) {
        updateCartCount();
        return; 
    }

    cartItemsContainer.innerHTML = ''; // Limpiar contenido

    if (cart.length === 0) {
        // Mensaje cuando está vacío
        cartItemsContainer.innerHTML = '<p class="empty-cart-message">Tu cesta está vacía. ¡Explora nuestras <a href="./ofertas.html">ofertas</a>!</p>';
        cartTotalElement.textContent = '0.00';
    } else {
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('article');
            itemElement.classList.add('cart-item');
            
            itemElement.innerHTML = `
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3 class="item-name">${item.name}</h3>
                </div>
                <div class="item-price">
                    <span class="price-value">€${item.price.toFixed(2)}</span>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')" title="Eliminar de la cesta">
                    &times;
                </button>
            `;
            
            cartItemsContainer.appendChild(itemElement);
            total += item.price;
        });
        cartTotalElement.textContent = total.toFixed(2);
    }
    
    updateCartCount(); 
}

// Ejecutar al cargar la página para inicializar el contador del carrito.
document.addEventListener('DOMContentLoaded', updateCartCount);