# 💈 Barbearia Premium

Uma aplicação moderna de agendamento de serviços de barbearia, desenvolvida para facilitar a conexão entre clientes e profissionais. O projeto foca em uma experiência de usuário fluida e gerenciamento de dados em tempo real.

## 🚀 Tecnologias Utilizadas

* **Framework:** [Next.js 14/15](https://nextjs.org/) (App Router)
* **Linguagem:** [TypeScript](https://www.typescript.org/)
* **Banco de Dados & Auth:** [Supabase](https://supabase.com/)
* **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
* **Componentes:** [Radix UI](https://www.radix-ui.com/) / [Shadcn/ui](https://ui.shadcn.com/)
* **ORM:** [Prisma](https://www.prisma.io/) (opcional, conforme estrutura de pastas)

## 🛠️ Funcionalidades

* **Agendamento de Serviços:** Interface intuitiva para escolher data e horário.
* **Gestão de Reservas:** Visualização e controle dos agendamentos realizados.
* **Server Actions:** Processamento de dados seguro no lado do servidor.
* **Design Responsivo:** Adaptado para dispositivos móveis e desktop.

## 📦 Como Instalar e Rodar

1. **Clone o repositório:**
   ```bash
   git clone [https://github.com/seu-usuario/barbearia-premium.git](https://github.com/seu-usuario/barbearia-premium.git)

2. Instale as dependências 

npm install
# ou
yarn install

3. Configure as Variáveis de Ambiente: Crie um arquivo .env.local na raiz do projeto e adicione suas credenciais:

NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anon_do_supabase
DATABASE_URL=sua_url_de_conexao_database

4. Inicie o servidor de desenvolvimento:

npm run dev

Acesse http://localhost:3000 no seu navegador.

📂 Estrutura de Pastas Relevante
/src/app: Rotas e páginas da aplicação.

/src/components/ui: Componentes de interface reutilizáveis.

/src/actions: Funções Server-side para manipulação de dados (ex: create-appointment.ts).

/src/lib: Configurações de clientes externos (Supabase, Prisma).

📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

Desenvolvido com ☕ e TypeScript por {Fabiano Santos}

