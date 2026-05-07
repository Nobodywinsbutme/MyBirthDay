document.addEventListener("DOMContentLoaded", () => {
    const birthdayData = [
        { name: "Lâm Vũ", img: "", msg: "Chúc Lâm Vũ tuổi mới đẹp trai, học giỏi và luôn vui vẻ nhé! 🎂" },
        { name: "Thanh Ngọc", img: "", msg: "Chúc Thanh Ngọc luôn xinh đẹp và rạng rỡ như đóa hoa anh đào này! 🌸" },
        { name: "Đăng Nguyên", img: "", msg: "Chúc Đăng Nguyên vạn sự như ý, sinh nhật thật ấm áp! 🎈" },
        { name: "Ái Xiu", img: "", msg: "Chúc Ái Xiu luôn đáng yêu và gặp nhiều may mắn trong cuộc sống! ✨" },
        { name: "Kỳ Thư", img: "", msg: "Mừng sinh nhật Kỳ Thư, chúc bạn luôn hạnh phúc bên gia đình! ❤️" },
        { name: "Hoàng Trân", img: "", msg: "Chúc Hoàng Trân tuổi mới gặt hái được nhiều thành công mới! 🏆" },
        { name: "Đức Anh", img: "", msg: "Sinh nhật vui vẻ nhé Đức Anh, quẩy nhiệt tình lên nào! 🎸" },
        { name: "Tuấn Khanh", img: "", msg: "Chúc Tuấn Khanh luôn vững vàng và đạt được mọi ước mơ! 🌟" },
        { name: "Yến Nhi", img: "", msg: "Chúc Yến Nhi luôn vui vẻ, hạnh phúc và tràn đầy năng lượng! 💐" },
        { name: "Gia Hân", img: "", msg: "Chúc Gia Hân tuổi mới rực rỡ, tỏa sáng theo cách riêng! ✨" },
        { name: "Minh Khang", img: "", msg: "Chúc Minh Khang thật nhiều sức khỏe và gặp nhiều may mắn! 🎁" },
        { name: "Bảo Anh", img: "", msg: "Sinh nhật hạnh phúc nhé, luôn mỉm cười thật tươi! 👑" }
    ];

    const shuffledData = birthdayData.sort(() => Math.random() - 0.5);

    // 1. TẠO HOA ANH ĐÀO RƠI
    const sakuraContainer = document.getElementById('sakura-container');
    for (let i = 0; i < 70; i++) {
        const petal = document.createElement('div');
        petal.classList.add('sakura-petal');
        const size = Math.random() * 10 + 10;
        petal.style.width = `${size}px`;
        petal.style.height = `${size}px`;
        petal.style.left = `${Math.random() * 100}vw`;
        petal.style.animationDuration = `${Math.random() * 6 + 6}s`;
        petal.style.animationDelay = `${Math.random() * 6}s`;
        sakuraContainer.appendChild(petal);
    }

    // 2. RENDER THIỆP
    const cardsContainer = document.getElementById('cards-container');
    const overlay = document.getElementById('overlay');
    const patterns = [
        'linear-gradient(135deg, #ffd1dc 0%, #f9a8d4 100%)',
        'linear-gradient(120deg, #fbcfe8 0%, #f9a8d4 100%)',
        'radial-gradient(circle, #fff1f7 0%, #fbcfe8 100%)',
        'linear-gradient(to right, #ffe4ec 0%, #f8b4d9 100%)',
        'linear-gradient(135deg, #f7c5dd 0%, #f3a6c8 100%)'
    ];

    let activeCard = null;

    shuffledData.forEach((item) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('float-wrapper');
        wrapper.style.animationDelay = `${Math.random() * 2}s`;
        wrapper.style.setProperty('--float-x', `${Math.random() * 18 - 9}px`);
        wrapper.style.setProperty('--float-y', `${Math.random() * -18 - 6}px`);
        wrapper.style.setProperty('--float-rot', `${Math.random() * 6 - 3}deg`);
        wrapper.style.setProperty('--float-duration', `${Math.random() * 2 + 4}s`);

        const cardWrap = document.createElement('div');
        cardWrap.classList.add('card-wrapper');

        const inner = document.createElement('div');
        inner.classList.add('card-inner');

        const bg = patterns[Math.floor(Math.random() * patterns.length)];

        inner.innerHTML = `
            <div class="card-front" style="background: ${bg};">
                <h3>${item.name}</h3>
            </div>
            <div class="card-back">
                <button class="btn-close" aria-label="Đóng thiệp">🌸</button>
                <div class="image-box">
                    <img src="${item.img}" alt="Ảnh sinh nhật">
                </div>
                <div class="text-content">
                    <p>${item.msg}</p>
                </div>
            </div>
        `;

        cardWrap.appendChild(inner);
        wrapper.appendChild(cardWrap);
        cardsContainer.appendChild(wrapper);

        // Mở thiệp
        cardWrap.addEventListener('click', () => {
            if (wrapper.classList.contains('is-active')) return;
            openCard(wrapper, cardWrap, inner);
        });

        // Nút đóng bên trong thiệp
        const closeBtn = inner.querySelector('.btn-close');
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeCard();
        });
    });

    function openCard(wrapper, cardWrap, inner) {
        if (activeCard) closeCard();
        activeCard = { wrapper, cardWrap, inner };

        overlay.classList.add('show');
        document.body.classList.add('modal-open');
        document.querySelectorAll('.float-wrapper').forEach(w => w.style.animationPlayState = 'paused');
        wrapper.classList.add('is-active');
        cardWrap.classList.add('is-open');

        const rect = wrapper.getBoundingClientRect();
        const moveX = (window.innerWidth / 2) - (rect.left + rect.width / 2);
        const moveY = (window.innerHeight / 2) - (rect.top + rect.height / 2);

        const targetW = window.innerWidth < 600 ? window.innerWidth * 0.9 : 520;
        const scale = targetW / rect.width;

        cardWrap.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
        inner.classList.add('opened-flip');
    }

    function closeCard() {
        if (!activeCard) return;
        const { wrapper, cardWrap, inner } = activeCard;

        overlay.classList.remove('show');
        document.body.classList.remove('modal-open');
        inner.classList.remove('opened-flip');
        cardWrap.style.transform = `translate(0, 0) scale(1)`;
        cardWrap.classList.remove('is-open');

        setTimeout(() => {
            wrapper.classList.remove('is-active');
            document.querySelectorAll('.float-wrapper').forEach(w => w.style.animationPlayState = 'running');
            activeCard = null;
        }, 800);
    }

    // Bấm vào nền đen mờ mới đóng thiệp
    overlay.addEventListener('click', closeCard);
});
