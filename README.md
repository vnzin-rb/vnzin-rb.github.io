# Portfólio — Vinícius Gabriel

Site estático em português, preparado para GitHub Pages. Não exige instalação de pacotes, servidor de aplicação ou etapa de build.

## Visualizar

Abra `index.html` no navegador. Para servir por HTTP, execute nesta pasta:

```powershell
python -m http.server 8765 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:8765`. Encerre com Ctrl+C.

## Conteúdo

- Apresentação com foto e rede de grafos animada em canvas.
- Sobre, Skills, trajetória, projetos e contato.
- Filtros da timeline: trajetória completa, experiência e formação.
- Menu para celular e indicação da seção atual.
- Controle de pausa da animação e respeito à preferência do sistema por movimento reduzido.
- Links para LinkedIn e projetos públicos do GitHub.
- Botão “Meu currículo” na apresentação e link “Currículo” no menu.
- Página própria para leitura do CV e download de uma versão profissional em PDF de uma página A4.
- Foto circular com halo ciano animado, respeitando o controle de pausa e a preferência por movimento reduzido.
- Timeline alternada no computador e linear no celular, preservando os filtros.
- Skills com explicações expansíveis e detalhes de cada projeto em uma janela acessível.
- E-mail profissional com link direto e botão flutuante para voltar ao início.

## Arquivos

- `index.html`: textos, datas e links.
- `styles.css`: identidade visual, tipografia e layout responsivo.
- `enhancements.css`: retrato circular, timeline alternada, detalhes de projetos e melhorias de contato.
- `script.js`: animação, menu, navegação e filtros.
- `curriculo.html` e `curriculo.css`: página do currículo, adaptada para computador e celular.
- `assets/cv-vinicius-gabriel.pdf`: currículo com texto selecionável e links clicáveis.
- `assets/curriculo.json`: fonte dos textos do currículo. A geração do HTML/PDF usa o script de trabalho `work/portfolio/build_cv.py`, fora do pacote público.
- `assets/vinicius-gabriel.png`: foto fornecida pelo usuário, preservada sem alteração.
- `assets/favicon.svg`: marca VG.
- `.nojekyll`: permite servir os arquivos estáticos diretamente no GitHub Pages.

## Publicação no GitHub Pages

O perfil confirmado é [vnzin-rb](https://github.com/vnzin-rb). Para usar o endereço pessoal `https://vnzin-rb.github.io/`:

1. Crie o repositório público `vnzin-rb.github.io` na conta `vnzin-rb`.
2. Coloque o conteúdo desta pasta na raiz da branch `main`, incluindo `.nojekyll`. O arquivo `index.html` precisa estar na raiz, sem outra pasta envolvendo o site.
3. Em **Settings → Pages → Build and deployment**, selecione **Deploy from a branch**, a branch `main` e a pasta `/ (root)`.
4. Salve e aguarde a publicação. O endereço só estará disponível depois que o GitHub concluir o deploy.

Também funciona em um repositório de projeto, pois os caminhos dos assets são relativos.

Referência: [documentação oficial do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site).

## Base dos textos e pendências

Datas de formação e experiência, nome, estilo e foto foram fornecidos pelo usuário. As competências e descrições também usam o contexto profissional persistente disponibilizado no workspace. Os links dos projetos foram identificados no [GitHub público](https://github.com/vnzin-rb).

O [LinkedIn informado](https://www.linkedin.com/in/gabrielvinicius8/) exigiu login durante a consulta, portanto seu conteúdo não foi apresentado como verificado. A instituição de docência, CETI Dermeval Lobão, foi confirmada pelo usuário. O e-mail público `viniciulaika98@gmail.com` foi fornecido pelo usuário para a seção Contato e incluído também no CV. Não foram incluídos telefone ou indicadores de proficiência inventados.

A referência [Gisele Ribeiro](https://giselesousar.github.io/) foi consultada no navegador para comparar apresentação, qualificações, skills, projetos, acesso ao currículo e contato. As melhorias preservam a identidade própria em preto e ciano e usam apenas informações do Vinícius.

Endereço configurado para publicação: https://vnzin-rb.github.io/

