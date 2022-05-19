import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
:root{
    --red: #E62E4D;
    --blue: #5429CC;
    --green: #33CC95;

    --blue-light: #6933ff;

    --text-title: #363f5f;
    --text-body: #969cb3;

    --background: #f0f2f5;
    --shape: #FFFFFF;
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

//font-size: 16px (Desktop)

html{
    @media(max-width: 1800px){
        font-size: 93.75%; //15px
    }

    @media(max-width: 720px){
        font-size: 87.5%; //14px
    }
}

//REM - 1rem = font-size

body{
    background: var(--background);
    -webkit-font-smoothing: antialiased;
}

//não coloquei só no body, pois os outros não seguem o padrão do body, então é preciso definir em todos
body, input, textarea, button{
    font-family: 'Poppins', sans-serif;
    font-weight: 400;
}

h1, h2, h3, h4, h5, h6, strong{
    font-weight: 600;
}

button{
    cursor: pointer;
}

[disabled]{
    opacity: 0.6;
    cursor: not-allowed;
}

.react-modal-overlay{
    //Fundo preto com opacidade
    background: rgba(0, 0, 0, 0.5);

    // Quero que ocupe a tela toda
    // fixed para ficar por cima da tela
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;

    display: flex;
    align-items: center;
    justify-content: center;
}

.react-modal-content{
    width: 100%;
    // Se eu tiver mais que 576px, ele para por aí
    // Com menos de 576, ele deixa 100% da tela
    max-width: 576px;
    background: var(--background);
    padding: 3rem;
    position: relative;
    border-radius: 0.25rem;
}

.react-modal-close{
    position: absolute;
    right: 1.5rem;
    top: 1.5rem;
    border: 0;
    background: transparent;

    transition: filter 0.2s;

    &:hover{
        filter: brightness(0.8);
    }
}

`;
