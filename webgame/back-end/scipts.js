document.addEventListener('DOMContentLoaded', () => {
    // Kiểm tra nếu người dùng đang ở trang đăng nhập
    if (document.getElementById('login-form')) {
        const loginForm = document.getElementById('login-form');
        const errorMessage = document.getElementById('error-message');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Kiểm tra thông tin đăng nhập (ở đây chỉ là ví dụ đơn giản)
            if (username === 'admin' && password === 'password') {
                localStorage.setItem('isLoggedIn', 'true');
                window.location.href = 'game.html'; // Đổi URL thành trang quản lý game
            } else {
                errorMessage.textContent = 'Tên người dùng hoặc mật khẩu không chính xác';
            }
        });
    }

    // Kiểm tra nếu người dùng đang ở trang quản lý game
    if (document.getElementById('add-game-btn')) {
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (!isLoggedIn) {
            window.location.href = 'login.html'; // Chuyển hướng về trang đăng nhập nếu chưa đăng nhập
        }

        const games = JSON.parse(localStorage.getItem('games')) || [];

        const gameList = document.getElementById('game-list');
        const addGameBtn = document.getElementById('add-game-btn');

        function renderGames() {
            gameList.innerHTML = '';
            games.forEach(game => {
                const gameItem = document.createElement('div');
                gameItem.className = 'game-item';

                const gameTitle = document.createElement('h2');
                gameTitle.textContent = game.name;

                const gameIframe = document.createElement('iframe');
                gameIframe.src = game.url;

                gameItem.appendChild(gameTitle);
                gameItem.appendChild(gameIframe);

                gameList.appendChild(gameItem);
            });
        }

        function addGame() {
            const gameName = prompt('Nhập tên game:');
            const gameUrl = prompt('Nhập URL game:');
            if (gameName && gameUrl) {
                games.push({ name: gameName, url: gameUrl });
                localStorage.setItem('games', JSON.stringify(games));
                renderGames();
            } else {
                alert('Vui lòng nhập đầy đủ thông tin!');
            }
        }

        addGameBtn.addEventListener('click', addGame);
        renderGames();
    }

    // Kiểm tra nếu người dùng đang ở trang menu
    if (document.getElementById('game-menu')) {
        const games = JSON.parse(localStorage.getItem('games')) || [];
        const playedGames = JSON.parse(localStorage.getItem('playedGames')) || [];
        const gameMenu = document.getElementById('game-menu');

        function renderGameMenu() {
            gameMenu.innerHTML = '';
            games.forEach(game => {
                const gameItem = document.createElement('div');
                gameItem.className = 'game-item';

                const gameTitle = document.createElement('h2');
                gameTitle.textContent = game.name;

                const playButton = document.createElement('button');
                playButton.textContent = 'Chơi';
                playButton.addEventListener('click', () => {
                    playedGames.push(game);
                    localStorage.setItem('playedGames', JSON.stringify(playedGames));
                    alert(`Bạn đã chọn chơi ${game.name}`);
                });

                gameItem.appendChild(gameTitle);
                gameItem.appendChild(playButton);

                gameMenu.appendChild(gameItem);
            });
        }

        renderGameMenu();
    }

    // Kiểm tra nếu người dùng đang ở trang các game đã chơi
    if (document.getElementById('played-games')) {
        const playedGames = JSON.parse(localStorage.getItem('playedGames')) || [];
        const playedGamesContainer = document.getElementById('played-games');

        function renderPlayedGames() {
            playedGamesContainer.innerHTML = '';
            playedGames.forEach(game => {
                const gameItem = document.createElement('div');
                gameItem.className = 'game-item';

                const gameTitle = document.createElement('h2');
                gameTitle.textContent = game.name;

                const gameIframe = document.createElement('iframe');
                gameIframe.src = game.url;

                gameItem.appendChild(gameTitle);
                gameItem.appendChild(gameIframe);

                playedGamesContainer.appendChild(gameItem);
            });
        }

        renderPlayedGames();
    }

    // Kiểm tra nếu người dùng đang ở trang chủ
    if (document.getElementById('game-container')) {
        const games = JSON.parse(localStorage.getItem('games')) || [];
        const gameContainer = document.getElementById('game-container');

        function renderGameContainer(filteredGames) {
            gameContainer.innerHTML = '';
            (filteredGames || games).forEach(game => {
                const gameItem = document.createElement('div');
                gameItem.className = 'game-item';

                const gameTitle = document.createElement('h2');
                gameTitle.textContent = game.name;

                const gameIframe = document.createElement('iframe');
                gameIframe.src = game.url;

                gameItem.appendChild(gameTitle);
                gameItem.appendChild(gameIframe);

                gameContainer.appendChild(gameItem);
            });
        }

        document.getElementById('search-btn').addEventListener('click', () => {
            const searchInput = document.getElementById('search-input').value.toLowerCase();
            const filteredGames = games.filter(game => game.name.toLowerCase().includes(searchInput));
            renderGameContainer(filteredGames);
        });

        renderGameContainer();
    }
});
