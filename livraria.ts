interface ILivraria {
    isbn: string;
    titulo: string;
    autor: string;
    editora: string;
    ano: number;
    quantidadeEstoque: number;
    valor: number;
    exibir(): void;
    estoqueAtualizado(quantidade: number): void;
}
class LivroFisico implements ILivraria {
    titulo: string;
    ano: number;
    isbn: string;
    autor: string;
    editora: string;
    quantidadeEstoque: number;
    valor: number;

    constructor(isbn: string, titulo: string, autor: string, editora: string, ano: number, quantidadeEstoque: number, valor: number){
        this.titulo = titulo;
        this.ano = ano;
        this.isbn = isbn;
        this.autor = autor;
        this.editora = editora;
        this.quantidadeEstoque = quantidadeEstoque;
        this.valor = valor;
    }
   estoqueAtualizado(quantidade: number): void {
        this.quantidadeEstoque += quantidade;
    }
    exibir(): void {
        console.log(`\nLivro físico:`);
        console.log(`ISBN: ${this.isbn}`);
        console.log(`Título: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Editora: ${this.editora}`);
        console.log(`Ano: ${this.ano}`);
        console.log(`Quantidade disponível: ${this.quantidadeEstoque}`);
        console.log(`Valor: R$ ${this.valor}`);
    }
}
class Ebook implements ILivraria {
    titulo: string;
    ano: number;
    isbn: string;
    autor: string;
    editora: string;
    quantidadeEstoque: number;
    valor: number;
    private arquivoTamanhoMb: number;
     constructor(isbn: string, titulo: string, autor: string, editora: string, ano: number, quantidadeEstoque: number, valor: number, arquivoTamanhoMb: number){
        this.titulo = titulo;
        this.ano = ano;
        this.isbn = isbn;
        this.autor = autor;
        this.editora = editora;
        this.quantidadeEstoque = quantidadeEstoque;
        this.valor = valor;
        this.arquivoTamanhoMb = arquivoTamanhoMb;
    }
    estoqueAtualizado(quantidade: number): void {
        this.quantidadeEstoque += quantidade;
    }
    exibir(): void {
        console.log(`\nE-books:`);
        console.log(`ISBN: ${this.isbn}`);
        console.log(`Título: ${this.titulo}`);
        console.log(`Autor: ${this.autor}`);
        console.log(`Editora: ${this.editora}`);
        console.log(`Ano: ${this.ano}`);
        console.log(`Quantidade disponível: ${this.quantidadeEstoque}`);
        console.log(`Valor: R$ ${this.valor}`);
        console.log(`Tamanho do e-book: ${this.arquivoTamanhoMb}mb`);
    }
}
class Livraria {
    private livros: ILivraria[] = []
    adicionarLivrosArray(livro:ILivraria){
        this.livros.push(livro)
    }
    excluir(isbn: string): void{
        this.livros = this.livros.filter(liv=> liv.isbn !== isbn);
        console.log(`\n${isbn} excluído!`);
    }
    vendaDeLivros(isbn: string): void {
        const liv = this.livros.find(liv => liv.isbn == isbn);
        if(liv && liv.quantidadeEstoque > 0){
            liv.estoqueAtualizado(-1);
            console.log(`\nVenda de ${liv.titulo} efetuada com sucesso!`);
        } else {
            console.log(`\n${liv?.titulo} não encontrado! Venda não efetuada.`);
        }
    }
    livrosDisponiveis(): void{
        console.log(`\nLivros no estoque:`);
        this.livros.forEach(liv => liv.exibir());
    }
}

const livraria = new Livraria();
const livro1 = new LivroFisico("1-1", "1984", "George Orwell", "Companhia das Letras", 1949, 20, 20);
const livro2 = new LivroFisico("2-2", "Quarto de Despejo", "Carolina Maria de Jesus", "Ática", 1960, 50, 30);
const ebook1 = new Ebook("3-3", "Casa Grande e Senzala", "Gilberto Freyre", "Grupo Editorial Global", 1933, 10, 12, 500);
const ebook2 = new Ebook("4-4", "Jogos Vorazes - Em Chamas", "Suzanne Collins", "Rocco", 2013, 60, 20, 400);
livraria.adicionarLivrosArray(livro1);
livraria.adicionarLivrosArray(livro2);
livraria.adicionarLivrosArray(ebook1);
livraria.adicionarLivrosArray(ebook2);
livraria.livrosDisponiveis();
livraria.excluir("4-4");
livraria.vendaDeLivros("5-5");
livraria.vendaDeLivros("1-1");
livraria.livrosDisponiveis();