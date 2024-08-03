document.addEventListener('DOMContentLoaded', function() {
    const drone = document.getElementById('drone');
    const presentBoxes = document.querySelectorAll('.present-box');
    
    const resultImages = ['./png/hawaii_tour.png', './png/macbook_air.png', './png/wineset2.png', './png/tawashi.png'];
    const resetButton = document.getElementById('resetButton');
    const step = 100;

    window.moveDrone = function(direction) {
        let posX = parseInt(drone.style.left, 10);
        let posY = parseInt(drone.style.top, 10);

        switch (direction) {
            case 'up': posY -= step; break;
            case 'down': posY += step; break;
            case 'left': posX -= step; break;
            case 'right': posX += step; break;
        }

        drone.style.left = `${posX}px`;
        drone.style.top = `${posY}px`;

        checkForDrop();
    };

    function checkForDrop() {
        const droneRect = drone.getBoundingClientRect();
        presentBoxes.forEach(box => {
            const boxRect = box.getBoundingClientRect();
            if (droneRect.left < boxRect.right && droneRect.right > boxRect.left &&
                droneRect.top < boxRect.bottom && droneRect.bottom > boxRect.top) {
                showRandomPrize();
            }
        });
    }

    function showRandomPrize() {
        const randomIndex = Math.floor(Math.random() * resultImages.length);
        const prizeImage = document.createElement('img');
        prizeImage.src = resultImages[randomIndex];
        prizeImage.className = 'prize-image';  // CSSクラスを適用
        prizeImage.style.position = 'absolute';
        prizeImage.style.left = '50%';
        prizeImage.style.top = '50%';
        prizeImage.style.transform = 'translate(-50%, -50%)';
        document.body.appendChild(prizeImage);

        // ドローンとプレゼントボックスを非表示にする
        drone.style.display = 'none';
        presentBoxes.forEach(box => box.style.display = 'none');
    }
    resetButton.addEventListener('click', resetGame); // リセットボタンのクリックイベントにリセット機能をバインド

    function resetGame() {
        // ドローンを初期位置に戻す
        drone.style.left = '150px';
        drone.style.top = '100px';
        drone.style.display = 'block'; // ドローンを表示


        // 全てのプレゼントボックスを表示
        presentBoxes.forEach(box => {
            box.style.display = 'block';
        });

        // 画面からすべての景品画像を削除
        document.querySelectorAll('img').forEach(img => {
            if (img !== drone && !presentBoxes.includes(img)) {
                img.remove();
                
            }
            
        });
    }

});