let chart; // 전역 변수로 chart 선언

        // 콜라츠 함수 정의
        function collatzSequence(n) {
            let sequence = [n]; // 초기값 = n
            while (n !== 1) { // n이 1이 될 때까지
                if (n % 2 === 0) { 
                    n = n / 2;
                } // n이 짝수이면 2로 나누기
                else {
                    n = 3 * n + 1;
                } // n이 짝수가 아니면(홀수이면) 3곱하고 1더하기
                sequence.push(n); // 수열에 새로운 n 값 추가
            }
            return sequence; // 수열 반환
        }

        // 입력된 숫자로 콜라츠 수열 생성 함수
        function generateCollatz() {
            const inputNumber = document.getElementById('inputNumber').value; // 입력된 값 가져오기
            if (inputNumber <= 0 || isNaN(inputNumber)) { 
                alert('자연수를 입력하세요.');
                return;
            } // 만약 0 이하거나 숫자가 아니면 경고 메시지 표시 후 반환

            const sequence = collatzSequence(Number(inputNumber)); // 콜라츠 수열 생성
            plotCollatz(sequence); // 콜라츠 수열 그래프 그리기
        }

        // 콜라츠 수열 그래프 그리기 함수 정의
        function plotCollatz(sequence) {
            const ctx = document.getElementById('collatzChart').getContext('2d'); // context 가져오기
            const labels = sequence.map((_, index) => index + 1); // 레이블 생성 및 인덱스 1부터 시작

            if (chart) {
                chart.destroy(); // 기존 차트가 있을 경우 파괴
            }

            chart = new Chart(ctx, {
                type: 'line', // line chart 사용
                data: {
                    labels: labels, // x축 레이블 설정
                    datasets: [{
                        label: '콜라츠 수열', // 레이블 정의
                        data: sequence, // 수열 데이터 사용
                        borderColor: 'skyblue', // 선 색깔
                        fill: false, // 선 아래 비우기
                        borderWidth: 2, // 선 굵기
                        pointRadius: 3, // 점 크기
                        pointBackgroundColor: 'skyblue' // 점 색깔
                    }]
                },
                options: {
                    responsive: true, // 반응형으로 설정
                    scales: {
                        x: {
                            title: {
                                display: true, // x축 제목 표시
                                text: '횟수' // x축 제목 정의
                            }
                        },
                        y: {
                            title: {
                                display: true, // y축 제목 표시
                                text: '값' // y축 제목 정의
                            },
                            beginAtZero: true // y축 0부터 시작
                        }
                    }
                }
            });
        }

        // 엔터키로 버튼 누르기 함수
        function handleKeyPress(event) { // 엔터키 함수 정의
            if (event.key === 'Enter') { // Enter키를 눌렀을 때
                document.getElementById('generateButton').click(); // generateButton 누르기
            }
        }