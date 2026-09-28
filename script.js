let isDrawing = false;

async function drawFortune() {
    if (isDrawing) return;

    const container = document.getElementById('cookieContainer') || document.getElementById('cookieStage');
    const resultText = document.getElementById('resultText');
    const detailText = document.getElementById('detailText');
    const luckyBox = document.getElementById('luckyBox');
    const drawBtn = document.getElementById('drawBtn');
    const copyBtn = document.getElementById('copyBtn');

    isDrawing = true;
    drawBtn.disabled = true;

    if (container) {
        container.classList.remove('open');
        container.classList.add('shake');
    }
    if (luckyBox) luckyBox.style.display = "none";
    if (copyBtn) copyBtn.style.display = "none";

    try {
        const response = await fetch('/api/fortune');
        const data = await response.json();

        setTimeout(() => {
            if (container) {
                container.classList.remove('shake');
                container.classList.add('open');
            }

            resultText.innerText = data.result;
            detailText.innerText = data.detail;

            // 행운의 데이터 바인딩 (undefined 방지 기본값 세팅)
            if (document.getElementById('luckyColor')) {
                document.getElementById('luckyColor').innerText = data.lucky_color || '초록색';
            }
            if (document.getElementById('luckyNumber')) {
                document.getElementById('luckyNumber').innerText = data.lucky_number || '7';
            }
            if (document.getElementById('luckyMenu')) {
                document.getElementById('luckyMenu').innerText = data.lucky_menu || '돈까스';
            }
            
            setTimeout(() => {
                if (luckyBox) luckyBox.style.display = "flex";
                if (copyBtn) copyBtn.style.display = "block";
                drawBtn.innerText = "🥠 다시 뽑기!";
                drawBtn.disabled = false;
                isDrawing = false;
            }, 400);

        }, 600);

    } catch (error) {
        if (container) container.classList.remove('shake');
        resultText.innerText = "❌ 운세를 불러오지 못했습니다.";
        drawBtn.disabled = false;
        isDrawing = false;
    }
}

function copyResult() {
    const result = document.getElementById('resultText').innerText;
    const detail = document.getElementById('detailText').innerText;
    const color = document.getElementById('luckyColor')?.innerText || '-';
    const number = document.getElementById('luckyNumber')?.innerText || '-';
    const menu = document.getElementById('luckyMenu')?.innerText || '-';

    const textToCopy = `[오늘의 운세]\n${result}\n${detail}\n\n🎨 행운의 색: ${color}\n🔢 행운의 숫자: ${number}\n🍕 추천 메뉴: ${menu}`;

    navigator.clipboard.writeText(textToCopy).then(() => {
        alert("운세 결과가 클립보드에 복사되었습니다!");
    });
}