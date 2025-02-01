let receitas = [
    { nome: "Torta de Maçã", ingredientes: ["3 maçãs", "1 xícara de farinha", "1/2 xícara de açúcar", "1/4 xícara de manteiga", "1 ovo"] },
    { nome: "Bolo de Chocolate", ingredientes: ["2 xícaras de farinha", "1 xícara de açúcar", "1/2 xícara de chocolate em pó", "1 xícara de leite", "2 ovos"] },
    // Adicione mais receitas aqui...
];

function mostrarAba(idAba) {
    const abas = document.querySelectorAll(".aba");
    abas.forEach(aba => aba.classList.remove("ativa"));

    const abaSelecionada = document.getElementById(idAba);
    abaSelecionada.classList.add("ativa");

    if (idAba === "receitas-aleatorias") {
        exibirReceitasAleatorias();
    } else if (idAba === "escolher-receitas") {
        exibirListaEscolherReceitas();
    }
}

function exibirReceitasAleatorias() {
    const listaReceitas = document.getElementById("lista-receitas-aleatorias");
    listaReceitas.innerHTML = "";

    const receitasAleatorias = escolherReceitasAleatorias(10);

    receitasAleatorias.forEach(receita => {
        const divReceita = criarElementoReceita(receita);
        listaReceitas.appendChild(divReceita);
    });
}

function escolherReceitasAleatorias(quantidade) {
    const receitasAleatorias = [];
    const receitasDisponiveis = [...receitas];

    for (let i = 0; i < quantidade; i++) {
        const indiceAleatorio = Math.floor(Math.random() * receitasDisponiveis.length);
        const receitaEscolhida = receitasDisponiveis.splice(indiceAleatorio, 1)[0];
        receitasAleatorias.push(receitaEscolhida);
    }

    return receitasAleatorias;
}

function exibirListaEscolherReceitas() {
    const listaEscolherReceitas = document.getElementById("lista-escolher-receitas");
    listaEscolherReceitas.innerHTML = "";

    receitas.sort((a, b) => {
        const nomeA = a.nome.toUpperCase();
        const nomeB = b.nome.toUpperCase();
        if (nomeA < nomeB) {
            return -1;
        }
        if (nomeA > nomeB) {
            return 1;
        }
        return 0;
    });

    receitas.forEach(receita => {
        const divReceita = criarElementoReceita(receita);
        divReceita.addEventListener("click", () => adicionarReceitaAleatoria(receita));
        listaEscolherReceitas.appendChild(divReceita);
    });
}

function adicionarReceitaAleatoria(receita) {
    const listaReceitas = document.getElementById("lista-receitas-aleatorias");
    const divReceita = criarElementoReceita(receita);
    listaReceitas.appendChild(divReceita);
}

function criarElementoReceita(receita) {
    const divReceita = document.createElement("div");
    divReceita.classList.add("receita");

    const h2Nome = document.createElement("h2");
    h2Nome.textContent = receita.nome;
    divReceita.appendChild(h2Nome);

    const divIngredientes = document.createElement("div");
    divIngredientes.classList.add("ingredientes");
    divIngredientes.style.display = "none";

    const h3Ingredientes = document.createElement("h3");
    h3Ingredientes.textContent = "Ingredientes:";
    divIngredientes.appendChild(h3Ingredientes);

    const ulIngredientes = document.createElement("ul");
    receita.ingredientes.forEach(ingrediente => {
        const liIngrediente = document.createElement("li");
        liIngrediente.textContent = ingrediente;
        ulIngredientes.appendChild(liIngrediente);
    });
    divIngredientes.appendChild(ulIngredientes);

    divReceita.appendChild(divIngredientes);

    h2Nome.addEventListener("click", () => {
        if (divIngredientes.style.display === "none") {
            divIngredientes.style.display = "block";
        } else {
            divIngredientes.style.display = "none";
        }
    });

    return divReceita;
}

const botaoAdicionar = document.getElementById("adicionar-receita");
const formularioContainer = document.getElementById("formulario-container");

botaoAdicionar.addEventListener("click", () => {
    // Remove o formulário anterior, se existir
    const formularioExistente = document.querySelector("form");
    if (formularioExistente) {
        formularioExistente.remove();
    }

    // Exibe o container do formulário
    formularioContainer
