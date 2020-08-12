const solutions = JSON.stringify([{
    "key": "computador",
    "title": "Computador não liga",
    "tag": ["computador", "liga"],
    "body": "Verifique se todos os cabos estão conectados corretamente, principalmente o da alimentação da placa mãe e o do processador. Olhe com calma e procure algum capacitor estourado ou alguma trilha queimada. Outro problema pode ser na bateria, já que alguns modelos de placa mãe não dá boot sem ela está funcionado.",
    "more": "",
    "script": "script.bat"
}, {
    "key": "computador",
    "title": "Computador travando",
    "tag": ["computador", "travando"],
    "body": "Faça limpezas periódicas no computador, exclua arquivos e pastas inúteis e evite usar toda a capacidade do HD. Outra dica importante é utilizar bons programas antivírus para proteger o computador de ameaças virtuais que podem estragar o PC.",
    "more": "https://olhardigital.com.br/noticia/computador-travando-muito-veja-o-que-fazer/59041#:~:text=Fa%C3%A7a%20limpezas%20peri%C3%B3dicas%20no%20computador,pelo%20recurso%20Limpeza%20de%20Disco.",
    "script": "script.bat"
}, {
    "key": "impressora",
    "title": "Instalar uma impressora",
    "tag": ["impressora", "instala"],
    "body": `
        1 - Abra o "Windows Explorer" (ou Meu computador)<br>
        2 - Na barra de endereço do Windows Explorer digite o endereço de onde estão instaladas as impressoras e depois tecle "ENTER". Na Reitoria: \\\\10.1.0.12<br>
        3 - Encontre a impressora desejada, e clique com o botão direito.<br>
        4 - Clique em Conectar.<br>
        5 - Teste a impressora.<br>
    `,
    "script": "script.bat"
}])

const findInObject = (obj, query) => obj.filter(function(obj) {
    return Object.keys(query).every(function(param) {
        return obj[param].indexOf(query[param]) == 0;
    });
});

const getSolutions = (tagDesc) => findInObject(JSON.parse(solutions), { tag: tagDesc })

module.exports = {
    getSolutions
}