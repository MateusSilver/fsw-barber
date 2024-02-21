# Guia do desenvolvimento - Lições aprendidas

## inicio

Para iniciar o projeto voce pode usar

```bash
npx create-next-app@latest .
```

crie em uma pasta para o projeto e adicione a ela os seguintes artificios:

- typescript yes
- eslint yes
- tailwind yes
- sem src/ diretory
- com app router

rode o projeto primeiro de tudo com o comando:

```bash
npm run dev
```

## Banco de dados

Baixar o prisma usando o comando

```bash
npm install prisma --save-dev
```

```bash
npx prisma init --datasource-provider postgresql
```

o ultimo comando deve criar uma pasta `/prisma` na raiz do seu diretorio contendo o schema do banco de dados e o arquivo `.env` que deverá conter suas senhas e a `DATABASE_URL`, não as perca e nem dê commit nelas.

## Tipos de dados do schema

Uso de `Decimal` para float em banco de dados, se for usar preço nisso é bom usar o formato do banco de dados no seguinte modelo para base decimal e duas casas depois da virgula:

```prisma
price Decimal @db.Decimal(10,2)
```

Para adicionar formatação e relações corretamente corrigindo erros e ganhando tempo voce pode rodar no terminal o comando:

```prisma
npx prisma format
```

Para ver seu banco de dados rode o comando:

```prisma
npx prisma studio
```

depois de adicionar o seed para popular o banco de dados, adicione no package.json o seguinte codigo:

```json
"prisma": {
    "seed":"ts-node prisma/seed.ts"
},
```

para que voce consiga popular o banco rodando o comando de seed, usando o compilador do typescript para gerar o código de popular o banco, voce deve baixar o compilador typescript e rodar a atualização de banco com esse código em mente use o seguinte:

```bash
npm i -D ts-node
npx prisma db seed
```

usando o arquivo com os seguinte seed abaixo podemos adicionar coisas ao banco usando o typescript:

```typescript
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    const images = [
      "https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png",
      "https://utfs.io/f/45331760-899c-4b4b-910e-e00babb6ed81-16q.png",
      "https://utfs.io/f/5832df58-cfd7-4b3f-b102-42b7e150ced2-16r.png",
      "https://utfs.io/f/7e309eaa-d722-465b-b8b6-76217404a3d3-16s.png",
      "https://utfs.io/f/178da6b6-6f9a-424a-be9d-a2feb476eb36-16t.png",
      "https://utfs.io/f/2f9278ba-3975-4026-af46-64af78864494-16u.png",
      "https://utfs.io/f/988646ea-dcb6-4f47-8a03-8d4586b7bc21-16v.png",
      "https://utfs.io/f/60f24f5c-9ed3-40ba-8c92-0cd1dcd043f9-16w.png",
      "https://utfs.io/f/f64f1bd4-59ce-4ee3-972d-2399937eeafc-16x.png",
      "https://utfs.io/f/e995db6d-df96-4658-99f5-11132fd931e1-17j.png",
      "https://utfs.io/f/3bcf33fc-988a-462b-8b98-b811ee2bbd71-17k.png",
      "https://utfs.io/f/5788be0e-2307-4bb4-b603-d9dd237950a2-17l.png",
      "https://utfs.io/f/6b0888f8-b69f-4be7-a13b-52d1c0c9cab2-17m.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/ef45effa-415e-416d-8c4a-3221923cd10f-17n.png",
      "https://utfs.io/f/a55f0f39-31a0-4819-8796-538d68cc2a0f-17o.png",
      "https://utfs.io/f/5c89f046-80cd-4443-89df-211de62b7c2a-17p.png",
      "https://utfs.io/f/23d9c4f7-8bdb-40e1-99a5-f42271b7404a-17q.png",
      "https://utfs.io/f/9f0847c2-d0b8-4738-a673-34ac2b9506ec-17r.png",
      "https://utfs.io/f/07842cfb-7b30-4fdc-accc-719618dfa1f2-17s.png",
      "https://utfs.io/f/0522fdaf-0357-4213-8f52-1d83c3dcb6cd-18e.png",
    ];
    // Nomes criativos para as barbearias
    const creativeNames = [
      "Barbearia Vintage",
      "Corte & Estilo",
      "Barba & Navalha",
      "The Dapper Den",
      "Cabelo & Cia.",
      "Machado & Tesoura",
      "Barbearia Elegance",
      "Aparência Impecável",
      "Estilo Urbano",
      "Estilo Clássico",
    ];

    // Endereços fictícios para as barbearias
    const addresses = [
      "Rua da Barbearia, 123",
      "Avenida dos Cortes, 456",
      "Praça da Barba, 789",
      "Travessa da Navalha, 101",
      "Alameda dos Estilos, 202",
      "Estrada do Machado, 303",
      "Avenida Elegante, 404",
      "Praça da Aparência, 505",
      "Rua Urbana, 606",
      "Avenida Clássica, 707",
    ];

    const services = [
      {
        name: "Corte de Cabelo",
        description: "Estilo personalizado com as últimas tendências.",
        price: 60.0,
        imageURL:
          "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
      },
      {
        name: "Barba",
        description: "Modelagem completa para destacar sua masculinidade.",
        price: 40.0,
        imageURL:
          "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
      },
      {
        name: "Pézinho",
        description: "Acabamento perfeito para um visual renovado.",
        price: 35.0,
        imageURL:
          "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
      },
      {
        name: "Sobrancelha",
        description: "Expressão acentuada com modelagem precisa.",
        price: 20.0,
        imageURL:
          "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
      },
      {
        name: "Massagem",
        description: "Relaxe com uma massagem revigorante.",
        price: 50.0,
        imageURL:
          "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
      },
      {
        name: "Hidratação",
        description: "Hidratação profunda para cabelo e barba.",
        price: 25.0,
        imageURL: "Fios hidratados, macios e brilhantes.",
      },
    ];

    // Criar 10 barbearias com nomes e endereços fictícios
    const barbershops = [];
    for (let i = 0; i < 10; i++) {
      const name = creativeNames[i];
      const address = addresses[i];
      const imageURL = images[i];

      const barbershop = await prisma.barbershop.create({
        data: {
          name,
          address,
          imageURL: imageURL,
        },
      });

      for (const service of services) {
        await prisma.service.create({
          data: {
            name: service.name,
            description: service.description,
            price: service.price,
            barbershop: {
              connect: {
                id: barbershop.id,
              },
            },
          },
        });
      }

      barbershops.push(barbershop);
    }

    // Fechar a conexão com o banco de dados
    await prisma.$disconnect();
  } catch (error) {
    console.error("Erro ao criar as barbearias:", error);
  }
}

seedDatabase();
```

## Date-fns

Vamos usar a Date-fns para formatar e exibir datas de forma simples

```bash
npm i date-fns
```

Para usar ela é bem simples, dê uma olhada nos formatos e use da seguinte maneira:

- se preciso usar uma data de hoje uso `format(new Date(), <<fomato que eu quero>>)`
- para saber os formatos existentes acesse o [date-fns](https://date-fns.org/v3.3.1/docs/format)
- Voce pode ainda adicionar um terceiro atributo a `format` para expecificar a linguagem de onde está, usando um objeto com o seguinte atributo: `locale: ptBR` por exemplo

Usando dos atributos temos o seguinte exemplo:

```typescript
<p>{format(new Date(), "EEEE", { locale: ptBR })}</p>
```

onde voce exibirá o dia da semana em português do Brasil.

## Usando o prisma client global

Para não fazer o hot reload, e recarregar a pagina criando uma nova conexão no banco toda vez que recarregar a pagina vamos usar o seguinte codigo na pasta `lib`, criando o `prisma.ts`:

```typescript
import { PrismaClient } from "@prisma/client";

declare global {
  var cachedPrisma: PrismaClient;
}

let prisma: PrismaClient;
if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prisma = global.cachedPrisma;
}

export const db = prisma;
```

Com isso podemos fazer os seguintes códigos no projeto:

```typescript
const barbershops = await db.barbershop.findMany({});
```

e posteriormente usar no mesmo server-component da seguinte forma:

```tsx
{
  barbershops.map((barbershop) => (
    <BarbershopItem key={barbershop.id} barbershop={barbershop} />
  ));
}
```

Voce terá problemas usando as imagens do banco de dados se não declarar o dominio delas no arquivo `next.config.mjs`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "utfs.io",
      },
    ],
  },
};

export default nextConfig;
```

## Banco de dados de imagens

Para usar imagens em um projeto, nao guarde no seu proprio repositório, use um servidor de imagens e importe com o link as imagens no seu site, voce pode usar um banco de dados não relacional como [UploadThing](https://uploadthing.com/)

## Páginas dinâmicas

Para criar páginas de conteúdos dinamicas no next.js, como paginas de produtos e detalhes do banco, vamos utilizar uma momenclatura de pastas da seguinte maneira

```bash
app/{grupo}/[id]/page.tsx
```

onde `{grupo}` vai ser substituido pelo que voce quiser para agrupar, como `produtos` ou `servicos`, o importante é a momenclatura do `[id]` entre chaves.
Após fazer isso, use o params da página para buscar o id no banco de dados da entidade que voce precisa. Começamos definindo a interface com o mesmo nome do componente adicionando Props no final, com params para usar as informações de `id` da página:

```typescript
interface ProductDetailsPageProps {
  params?: string;
}

const ProductDetailsPage = () => {};
export default ProductDetailsPage;
```

Usamos esse params e como estamos em um server component usamos o prisma client para procurar o id que queremos, no caso o id do params.

```typescript
const product = await db.product.findUnique({
  where: {
    id: params.id,
  },
});
```

Lembrando de usar o async já que voce deve acessar o banco de dados com uma função assíncrona. logo a pagina do produto fica assim:

```tsx
import { db } from "@/app/_lib/prisma";

interface BarbershopDetailsPageProps {
  params: {
    id?: string;
  };
}

const BarbershopDetailsPage = async ({
  params,
}: BarbershopDetailsPageProps) => {
  const barbershop = await db.barbershop.findUnique({
    where: {
      id: params.id,
    },
  });
  return <h1>{params.id}</h1>;
};

export default BarbershopDetailsPage;
```

a momenclatura do `where` é definida pra realizar buscas no banco de dados como um json para a função `findUnique` que é mais rápida do que outras funções do prisma client.

## next router

Para fazer com que o clique gere o redirecionamento para a pagina do produto dinamica, voce deve usar o next router da seguinte maneira, no componente de item do produto que deve ter seu id:

```typescript
"use client";
import { useRouter } from "next/navigation";

const router = useRouter();
const handleclick = () => {
  router.push(`/products/${product.id}`);
};
```

voce ainda pode usar `router.back()` para retornar a página anterior.

## Left Join em tabelas

Uso de left join em tabelas com prisma pode ser usado com `include` adicionado às buscas do prisma client. Assim voce pode fazer por exemplo:

```typescript
const barbershop = await db.barbershop.findUnique({
  where: {
    id: params.id,
  },
  include: {
    Services: true,
  },
});
```

faça isso caso precise de dados da tabela para usar um `map()` de coisas relacionadas, principalmente se a modelagem orm do prisma tem atributos como `services[]`, um vetor de serviços do tipo (1,n).

## autenticação com o Next.Auth

O [next.auth](https://next-auth.js.org/) é um framework do next de adaptação que fornece o adapter do next.js para trabalharmos. Porém algumas configurações são necessárias para o banco receber as autenticação de usuário e sessão de usuário, são elas a serem adicionadas ao schema:

```prisma

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  shadowDatabaseUrl = env("SHADOW_DATABASE_URL") // Only needed when using a cloud provider that doesn't support the creation of new databases, like Heroku. Learn more: https://pris.ly/d/migrate-shadow
}

generator client {
  provider        = "prisma-client-js"

}

model Account {
  id                 String  @id @default(cuid())
  userId             String
  type               String
  provider           String
  providerAccountId  String
  refresh_token      String?  @db.Text
  access_token       String?  @db.Text
  expires_at         Int?
  token_type         String?
  scope              String?
  id_token           String?  @db.Text
  session_state      String?

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
  bookings      Booking[]
}

model VerificationToken {
  identifier String
  token      String   @unique
  expires    DateTime

  @@unique([identifier, token])
}

```

Não esqueça de fazer sua migration do schema para atualizar seu banco online:

```bash
npx prisma migrate dev --name add_user_tables
```

E não se esqueça de sempre que mudar o banco usar o comando:

```bash
npx prisma generate
```

Instale o Next.Auth com o seguinte comando:

```bash
npm i next-auth
```

O next.auth vai conectar os adapters aos provedores de autenticação do google, github, e vários outros. Precisamos criar uma rota de api para o next context api. Para isso crie um arquivo na pasta app do seguinte modo:

```bash
api/auth/[...nextauth]/route.tsx
```

com isso qualquer rota que o servidor fizer que seja do tipo `localhost:3000/auth/{qualquer rota}` vai cair nesta rota como get ou post.

### Autenticação com o google

No arquivo criado de `route.tsx` insira o seguinte código:

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
});

export { handler as GET, handler as POST };
```

com ele estamos dizendo que o provedor de autenticação é o google e o adaptador é para prisma orm. O proximo passo é instalar o adaptador para prisma e conseguir as chaves da api do google.

```bash
npm i @auth/prisma-adapter
```

Agora colocamos esse adapter no nosso arquivo de rotas também:

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: "",
      clientSecret: "",
    }),
  ],
});

export { handler as GET, handler as POST };
```

Não coloque as chaves api diretamente no `clientId` e `clietSecret`, coloque elas no seu arquivo `.env` onde ficam suas senhas, e importe de lá.

### Google developer console

Vamos até o [google developer console](https://console.cloud.google.com/), crie um novo projeto e vá até em api's e serviços > credentials do google cloud, lá clique em criar novas credenciais > ID do cliente OAuth, que é o serviço para logar com sua conta no google em outras aplicações de maneira fácil com um botão, muito utilizada em outros lugares.
Configure a tela de consentimento. O usuario que voce quer utilizar é externo. Salve e continue todas as duas telas, volte ao painel e clique em credentials de novo e criar nova credencial para OAuth client ID, selecione web application. Voce precisará colocar URIs javascript autorizadas e URIs de redirecionamento autorizadas para callback, utilize as seguintes para desenvolvimento e produção:

```bash
https://localhost:3000
https://localhost:3000/api/auth/callback/google
```

crie e copie as chaves api que voce criar para o seu `.env`, nas seguintes variaveis:

```.env
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
```

e adicione as variáveis no seu `route.tsx` assim:

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";

const handler = NextAuth({
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
});

export { handler as GET, handler as POST };
```

Volte para o `console.cloud` e vá em tela de permissão OAuth, e publique seu app, agora inclua o provider na pasta app, do seguinte modo:

```bash
app/_providers/auth.tsx
```

e adicione um componente que faça a autenticação

```typescript
"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
```

Agora voce pode envolver o auth provider ao redor de todo layout da aplicação para poder usar os dados e estado de login do usuário google na sua aplicação

```tsx
<html lang="pt-br">
  <body className={`${inter.className} dark`}>
    <AuthProvider>
      {children}
      <Footer />
    </AuthProvider>
  </body>
</html>
```

## Usando dados da sessão autenticada

Agora podemos coletar dados do usuário em sessão na nossa aplicação dentro de client components usando o `useSession()`, assim podemos exibir dados que o google guarda em nossas aplicações quando logados no sistema.

```typescript
"use client";
import { useSession } from "next-auth/react";

const Welcome = () => {
  const { data } = useSession();
  return <h1>Welcome {data?.user?.name}!</h1>;
};
export default Welcome;
```

O componente acima deve exibir seu nome se estiver logado, para isso voce precisará ativar uma função assincrona do Next-auth chamada `SignIn()` e para deslogar de uma sessão voce deve usar uma função assincrona `SignOut()`. Assim voce poderá usar a autenticação e todas as suas facilidades de maneira completa.

### autenticado e não autenticado

Além de `data` do useSession ainda podemos pegar dados de `status` que é um valor que pode ser `authenticated` ou `unauthenticated`

## Sessão no lado do servidor

Para pegar a sessão do lado do servidor precisamos usar outra função do next.auth, a função assincrona `getSeverSession()`, voce pode saber se um usuário está autenticado usando o seguinte:

```typescript
const session = await getServerSession();

{
  !!session?.user;
}
```

as duas esclamações retornam um booleano que indica se temos usuário na sessão. Porém para ter acesso a esses dados de sessão precisamos exportá-los das nossas rotas de servidor, logo vamos alterar um pouco o `route.tsx`:

```typescript
import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/app/_lib/prisma";
import { Adapter } from "next-auth/adapters";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
```

agora exportamos as opções de autenticação ao mesmo tempo do handler com a função do next auth que recebe essas opções. Agora eu posso passar esse `authOptions` para o meu `getServerSession()`

```typescript
const session = await getServerSession(authOptions);
```

## Calendar component

O componente de calendário do Shadcn-ui é feito com a biblioteca do [react-day-picker](https://react-day-picker.js.org/). Deste modo a estilização dele é personalizada e não pode ser feita no tailwind, então temos propriedades e estilos de classe proprios para esse componentes. observe:

```tsx
<Calendar
  mode="single"
  selected={date}
  onSelect={setDate}
  className=""
  locale={ptBR}
  styles={{
    head_cell: {
      width: "100%",
    },
    cell: {
      width: "100%",
    },
    button: {
      width: "100%",
    },
    nav_button_previous: {
      width: "32px",
      height: "32px",
    },
    nav_button_next: {
      width: "32px",
      height: "32px",
    },
    caption: {
      textTransform: "capitalize",
    },
  }}
/>
```

Ele utiliza o `useState()` do react, então não se esqueça de fazer uma declaração para que os resultados dos cliques em cada dia sejam renderizados e guardados.

### useMemo()

O useMemo é uma função do react que executa uma função apenas quando uma variavel dentro de uma lista de referencias é alterado, semelhante ao `useEffect()`, deste modo voce deve usar desse jeito:

```typescript
const timeList = useMemo(() => {
  return date ? generateDayTimeList(date) : [];
}, [date]);
```

## Server actions

Para enviar algo para o banco de dados ou mesmo usar qualquer ação de servidor em componentes do lado client no next, voce pode usar as server actions. Para fazer isso nós usaremos um arquivo diferente com a função que salva as ações de servidor com o comando `use server`. As funções de servidor vão ficar nesse arquivo:

```typescript
"use server";

import { db } from "@/app/_lib/prisma";

interface saveBookingParams {
  barbershopId: string;
  serviceId: string;
  userId: string;
  date: Date;
}

export const saveBooking = async (params: saveBookingParams) => {
  await db.booking.create({
    data: {
      userId: params.userId,
      serviceId: params.serviceId,
      date: params.date,
      barbershopId: params.barbershopId,
    },
  });
};
```

Com isso voce pode chamar a função de saveBooking em qualquer função assincrona do lado do client. Assim em algum botão voce pode passar os dados de params para o backend salvar em banco.

## Formulários

Para criar formulários podemos usar um componente do shadcn-ui chamado `Form` que usa zod por baixos dos panos para criar formularios. configure primeiro os dados do seu formulário.

```typescript
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "campo obrigatorio")
    .max(50, "nome muito grande"),
  active: z.boolean().default("false").optional(),
  sobrenome: z.string().min(1, { message: "campo obrigatorio" }).max(50),
});
```

voce ainda pode usar vários modificadores como `optional()` e etc. para criar o melhor dado dentro do seu formulário, depois use o react hook chamado `useForm()` com um generico para formSchema do seguinte modo:

```typescript
interface SearchProps {
  defaultValues: z.infer<typeof formSchema>;
}

const form = useForm<z.infer<typeof formSchema>>({
  resolver: zodResolver(formSchema),
  defaultValues,
});
```

Assim voce poderá usar useForm com o zodResolver, mandando valores default que são os valores padrão para envio dos formulários.
Já no frontend o formulário que voce deve utilizar com os componentes do shadcn-ui baixados é mais ou menos o seguinte:

```tsx
<div className="flex items-center gap-2">
  <Form {...form}>
    <form
      className="flex w-full gap-2"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FormField
        control={form.control}
        name="search"
        render={({ field }) => (
          <FormItem className="w-full">
            <FormControl>
              <Input placeholder="Busque por uma barbearia..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button variant="default" size="icon" type="submit">
        <SearchIcon size={18} />
      </Button>
    </form>
  </Form>
</div>
```

Existem muitos jeitos de fazer isso, mas `onSubmit()` voce fará o tratamento dos dados pegos para enviar para algum outro lugar. mais informações em (https://ui.shadcn.com/docs/components/form)[shadcn-ui]. o recebimento também é atraves de um generic:

```tsx
const handleSubmit = (data: z.infer<typeof formSchema>) => {
  router.push(`/barbershops?search=${data.search}`);
};
```

```

```
