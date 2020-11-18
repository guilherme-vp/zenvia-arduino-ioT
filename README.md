# Zenvia ioT - Arduino - J5

## Como configurar o ambiente Zenvia:
1. Crie uma conta na plataforma **Zenvia** 
2. Após a criação, clique no menu superior, escolha a opção Produtos, na seção Desenvolvedores entre na opção **Sandbox**
3. Crie um novo ambiente sandbox
4. Escolha o canal Whatsapp
5. Aperte na opção próximo
6. Leia o QR Code fornecido ou envie a palavra-chave ao número informado com seu aplicativo do Whatsapp
7. Insira a palavra-chave na constante **sender** dentro do arquivo [zenvia](https://github.com/GuiVPW/zenvia-arduino-ioT/tree/main/src/config/zenvia.ts)
8. Feche a o modal e clique na aba **Tokens e Webhooks** no menu superior
9. Crie um novo Token na página aberta, inserindo o nome do Token
10. Copie o Token criado e insira dentro na constante [APIKey](https://github.com/GuiVPW/zenvia-arduino-ioT/tree/main/src/config/zenvia.ts)
----------
## Como configurar o ambiente Arduino:
1. Configure seu sketch como no exemplo abaixo: ![sketch](https://i.imgur.com/tuf9YsB.png)
2. Configure a porta [COM](https://github.com/GuiVPW/zenvia-arduino-ioT/tree/main/src/arduino/arduino.ts) onde seu Arduino está sendo executado
3. Execute o código **Firmata** disponível na pasta src/arduino no arquivo [app](https://github.com/GuiVPW/zenvia-arduino-ioT/tree/main/src/arduino/app.ino)
4. Configure a url do **socket.io** de acordo com a porta configurada, presentes em [arduino](https://github.com/GuiVPW/zenvia-arduino-ioT/tree/main/src/arduino/arduino.ts) e no arquivo público [html](https://github.com/GuiVPW/zenvia-arduino-ioT/tree/main/public) para poder receber a resposta
----------
## Como executar o projeto
1. Execute o comando `yarn` para instalar as dependências do projeto
2. Execute o comando `yarn start` em um terminal para iniciar o servidor
3. Execute o comando `yarn arduino` em outro terminal para executar o servidor do Johnny Five em seu Arduino após a execução do [app](https://github.com/GuiVPW/zenvia-arduino-ioT/tree/main/src/arduino/app.ino)
4. Seu Arduino executará o código e as mensagens de status serão exibidas no display lcd, caso haja erros, modifique a porta do socket e repita os passos descritos
5. Em seu navegador, abra a [página](http://localhost:4000) do servidor local, ou modifique a porta de acordo com suas necessidades
6. Pronto, envie uma mensagem pela página exibida e ela será exibida pelo seu display lcd
> Quaisquer dúvidas ou erros, envie um email para guivpw68@gmail.com
