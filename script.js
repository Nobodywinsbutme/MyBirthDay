document.addEventListener("DOMContentLoaded", () => {
    
    // --- CẤU HÌNH DỮ LIỆU THIỆP (BẠN SỬA Ở ĐÂY) ---
    // Link ảnh bạn có thể lấy trên mạng hoặc up lên các trang như imgbb.com rồi dán vào
    const birthdayData = [
        { name: "Lâm Vũ", img: "https://via.placeholder.com/300", msg: "Chúc Lâm Vũ tuổi mới đẹp trai, học giỏi và luôn vui vẻ nhé! 🎂" },
        { name: "Thanh Ngọc", img: "https://via.placeholder.com/300", msg: "Chúc Thanh Ngọc luôn xinh đẹp và rạng rỡ như đóa hoa anh đào này! 🌸" },
        { name: "Đăng Nguyên", img: "https://via.placeholder.com/300", msg: "Chúc Đăng Nguyên vạn sự như ý, sinh nhật thật ấm áp! 🎈" },
        { name: "Ái Xiu", img: "https://via.placeholder.com/300", msg: "Chúc Ái Xiu luôn đáng yêu và gặp nhiều may mắn trong cuộc sống! ✨" },
        { name: "Kỳ Thư", img: "https://via.placeholder.com/300", msg: "Mừng sinh nhật Kỳ Thư, chúc bạn luôn hạnh phúc bên gia đình! ❤️" },
        { name: "Hoàng Trân", img: "https://via.placeholder.com/300", msg: "Chúc Hoàng Trân tuổi mới gặt hái được nhiều thành công mới! 🏆" },
        { name: "Đức Anh", img: "https://via.placeholder.com/300", msg: "Sinh nhật vui vẻ nhé Đức Anh, quẩy nhiệt tình lên nào! 🎸" },
        { name: "Tuấn Khanh", img: "https://via.placeholder.com/300", msg: "Chúc Tuấn Khanh luôn vững vàng và đạt được mọi ước mơ! 🌟" },
        { name: "Em", img: "https://via.placeholder.com/300", msg: "Dành cho em những lời chúc ngọt ngào nhất thế gian này. Yêu em! 💖" },
        { name: "Em", img: "https://via.placeholder.com/300", msg: "Chúc em một ngày tràn ngập quà tặng và những nụ cười! 🎁" },
        { name: "Em", img: "https://via.placeholder.com/300", msg: "Dù thế nào đi nữa, hãy luôn tự tin và tỏa sáng em nhé! 💎" },
        { name: "Em", img: "https://via.placeholder.com/300", msg: "Sinh nhật hạnh phúc nhé công chúa của anh! 👑" }
    ];

    // Xáo trộn ngẫu nhiên dữ liệu
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
        petal.style.animationDuration = `${Math.random() * 5 + 5}s`;
        petal.style.animationDelay = `${Math.random() * 5}s`;
        sakuraContainer.appendChild(petal);
    }

    // 2. RENDER THIỆP
    const cardsContainer = document.getElementById('cards-container');
    const overlay = document.getElementById('overlay');
    const patterns = [
        'linear-gradient(135deg, #f6d365 0%, #fda085 100%)',
        'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
        'linear-gradient(to top, #e6e9f0 0%, #eef1f5 100%)',
        'radial-gradient(circle, #fff1eb 0%, #ace0f9 100%)',
        'linear-gradient(to right, #ffecd2 0%, #fcb69f 100%)'
    ];

    let activeCard = null;

    shuffledData.forEach((item) => {
        const wrapper = document.createElement('div');
        wrapper.classList.add('float-wrapper');
        wrapper.style.animationDelay = `${Math.random() * 2}s`;

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
                <button class="btn-close">🌸</button>
                <div class="image-box">
                    <img src="${item.img}" alt="Birthday Image">
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
        cardWrap.addEventListener('click', (e) => {
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
        document.querySelectorAll('.float-wrapper').forEach(w => w.style.animationPlayState = 'paused');
        wrapper.classList.add('is-active');

        const rect = wrapper.getBoundingClientRect();
        const moveX = (window.innerWidth / 2) - (rect.left + rect.width / 2);
        const moveY = (window.innerHeight / 2) - (rect.top + rect.height / 2);
        
        const targetW = window.innerWidth < 600 ? window.innerWidth * 0.9 : 450;
        const scale = targetW / rect.width;

        cardWrap.style.transform = `translate(${moveX}px, ${moveY}px) scale(${scale})`;
        inner.classList.add('opened-flip');
    }

    function closeCard() {
        if (!activeCard) return;
        const { wrapper, cardWrap, inner } = activeCard;

        overlay.classList.remove('show');
        inner.classList.remove('opened-flip');
        cardWrap.style.transform = `translate(0, 0) scale(1)`;

        setTimeout(() => {
            wrapper.classList.remove('is-active');
            document.querySelectorAll('.float-wrapper').forEach(w => w.style.animationPlayState = 'running');
            activeCard = null;
        }, 800);
    }

    // Bấm vào nền đen mờ mới đóng thiệp
    overlay.addEventListener('click', closeCard);
});