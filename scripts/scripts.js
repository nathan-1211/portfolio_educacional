// SCRIPT PARA ANIMAÇÃO DA REDE NEURAL
const neuralNetwork = document.getElementById('neuralNetwork');

// Função para gerar um número aleatório entre min e max
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Criação das bolinhas (nós)
const nodes = [];
const numNodes = 20; // Número de bolinhas
for (let i = 0; i < numNodes; i++) {
    const node = document.createElement('div');
    node.classList.add('neural-node');
    node.style.top = `${random(10, 90)}%`;
    node.style.left = `${random(10, 90)}%`;
    neuralNetwork.appendChild(node);
    nodes.push({
        element: node,
        x: parseFloat(node.style.left),
        y: parseFloat(node.style.top),
        dx: random(-0.2, 0.2), // Velocidade horizontal reduzida
        dy: random(-0.2, 0.2), // Velocidade vertical reduzida
    });
}

// Criação das linhas (conexões)
const lines = [];
nodes.forEach((nodeA, indexA) => {
    nodes.slice(indexA + 1).forEach((nodeB, indexB) => {
        if (Math.random() > 0.7) { // Probabilidade de conexão
            const line = document.createElement('div');
            line.classList.add('neural-line');
            neuralNetwork.appendChild(line);
            lines.push({ line, nodeA, nodeB });
        }
    });
});

// Função para atualizar as posições das bolinhas e linhas
function updateNetwork() {
    nodes.forEach(node => {
        // Atualiza a posição da bolinha
        node.x += node.dx;
        node.y += node.dy;

        // Mantém as bolinhas dentro da tela
        if (node.x < 0 || node.x > 100) node.dx *= -1;
        if (node.y < 0 || node.y > 100) node.dy *= -1;

        // Aplica a nova posição
        node.element.style.left = `${node.x}%`;
        node.element.style.top = `${node.y}%`;
    });

    // Atualiza as linhas
    lines.forEach(({ line, nodeA, nodeB }) => {
        const x1 = nodeA.x;
        const y1 = nodeA.y;
        const x2 = nodeB.x;
        const y2 = nodeB.y;

        const dx = x2 - x1;
        const dy = y2 - y1;
        const length = Math.sqrt(dx * dx + dy * dy);
        const angle = Math.atan2(dy, dx) * (180 / Math.PI);

        line.style.width = `${length}%`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.left = `${x1}%`;
        line.style.top = `${y1}%`;
    });

    // Repete a animação
    requestAnimationFrame(updateNetwork);
}

// Inicia a animação
updateNetwork();

// SCRIPT PARA O OLHO QUE SEGUE O CURSOR
document.addEventListener('mousemove', (e) => {
    const eye = document.querySelector('.eye');
    const pupil = document.querySelector('.pupil');
    const eyeRect = eye.getBoundingClientRect();

    // Posição do centro do olho
    const eyeCenterX = eyeRect.left + eyeRect.width / 2;
    const eyeCenterY = eyeRect.top + eyeRect.height / 2;

    // Posição do cursor
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Diferença entre a posição do cursor e o centro do olho
    const deltaX = mouseX - eyeCenterX;
    const deltaY = mouseY - eyeCenterY;

    // Limitar o movimento da pupila para dentro do olho
    const angle = Math.atan2(deltaY, deltaX);
    const distance = Math.min(Math.hypot(deltaX, deltaY), eyeRect.width / 2 - pupil.offsetWidth / 2);

    const pupilX = Math.cos(angle) * distance;
    const pupilY = Math.sin(angle) * distance;

    // Aplicar a transformação à pupila
    pupil.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
});

document.addEventListener("DOMContentLoaded", function () {
    // Seleciona a seção de projetos
    const projectsSection = document.getElementById("projects");

    // Seleciona todos os cards de projeto
    const projectCards = document.querySelectorAll(".project-card");

    // Configurações do Intersection Observer
    const observerOptions = {
        root: null, // Observa a viewport
        rootMargin: "0px",
        threshold: 0.5, // Aciona a animação quando 50% da seção estiver visível
    };

    // Callback do Intersection Observer
    const observerCallback = (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                // Adiciona a classe .animate a cada card com um atraso
                projectCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add("animate");
                    }, index * 200); // Atraso de 200ms entre cada card
                });

                // Para de observar após a animação ser acionada
                observer.unobserve(entry.target);
            }
        });
    };

    // Cria o Intersection Observer
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observa a seção de projetos
    observer.observe(projectsSection);
});