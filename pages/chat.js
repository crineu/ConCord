import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import React, { useState } from 'react';
import appConfig from '../config.json';

export default function ChatPage() {
  // Sua lógica vai aqui
  const [mensagem, setMensagem] = React.useState('');
  const [mensagens, setMensagens] = React.useState([]);


  function enviaNovaMensagem(novaMensagem) {
    if ('' == novaMensagem) {
      return;
    }

    const msg = {
      id: mensagens.length,
      autor: 'usuario_fixo',
      texto: novaMensagem,
    }
    setMensagens([
      msg,
      ...mensagens,
    ]);
    setMensagem('');
  }

  // ./Sua lógica vai aqui
  return (
    <Box
      styleSheet={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: appConfig.theme.colors.primary[500],
        backgroundImage: `url(back_blue.jpg)`,
        backgroundRepeat: 'no-repeat', backgroundSize: 'cover', backgroundBlendMode: 'multiply',
        color: appConfig.theme.colors.neutrals['000']
      }}
    >
      <Box
        styleSheet={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          boxShadow: '0 2px 10px 0 rgb(0 0 0 / 20%)',
          borderRadius: '5px',
          backgroundColor: appConfig.theme.colors.neutrals[700],
          height: '100%',
          maxWidth: '95%',
          maxHeight: '95vh',
          padding: '32px',
        }}
      >
        <Header />
        <Box
          styleSheet={{
            position: 'relative',
            display: 'flex',
            flex: 1,
            height: '80%',
            backgroundColor: appConfig.theme.colors.neutrals[600],
            flexDirection: 'column',
            borderRadius: '5px',
            padding: '16px',
          }}
        >

          <MessageList listaDeMensagens={mensagens} />


          <Box
            as="form"
            styleSheet={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <TextField
              placeholder="Insira sua mensagem aqui..."
              value={mensagem}
              onChange={(event) => {
                setMensagem(event.target.value);
              }}
              onKeyPress={(event) => {
                if ('Enter' == event.code) {
                  event.preventDefault();

                  enviaNovaMensagem(mensagem);
                }
              }}
              type="textarea"
              styleSheet={{
                width: '100%',
                border: '0',
                resize: 'none',
                borderRadius: '5px',
                padding: '6px 8px',
                backgroundColor: appConfig.theme.colors.neutrals[800],
                marginRight: '12px',
                color: appConfig.theme.colors.neutrals[200],
              }}
            />

            <Button
              type="button"
              variant='primary'
              colorVariant='neutral'
              label='Enviar'
              onClick={() => { enviaNovaMensagem(mensagem)}}
            />

          </Box>
        </Box>
      </Box>
    </Box>
  )
}

function Header() {
  return (
    <>
      <Box styleSheet={{ width: '100%', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
        <Text variant='heading5'>
          Chat
        </Text>
        <Button
          variant='tertiary'
          colorVariant='neutral'
          label='Logout'
          href="/"
        />
      </Box>
    </>
  )
}

function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: appConfig.theme.colors.neutrals["000"],
        marginBottom: '16px',
      }}
    >

      {props.listaDeMensagens.map((item) => {
        return <Message item={item} />
      })}
    </Box>
  )
}

function Message(props) {
  const item = props.item;
  return (
    <Text
      key={item.id}
      tag="li"
      styleSheet={{
        borderRadius: '5px',
        padding: '6px',
        marginBottom: '12px',
        hover: {
          backgroundColor: appConfig.theme.colors.neutrals[700],
        }
      }}
    >
      <Box
        styleSheet={{
          marginBottom: '8px',
        }}
      >
        <Image
          styleSheet={{
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            display: 'inline-block',
            marginRight: '8px',
          }}
          src='avatar_chat.png'
        />
        <Text tag="strong">
          {item.autor}
        </Text>
        <Text
          styleSheet={{
            fontSize: '10px',
            marginLeft: '8px',
            color: appConfig.theme.colors.neutrals[300],
          }}
          tag="span"
        >
          {(new Date().toLocaleDateString())}
        </Text>
        <Button
          styleSheet={{
            float: 'right'
          }}
          id={item.id}
          variant='tertiary'
          colorVariant='neutral'
          iconName='timesCircle'
          onClick={(event) => {
            // Não deu pra fazer a remoção, pois dependendo onde no botão você clica volta um target diferente...
            console.log('apagar', event.target.id)
          }}
        />
      </Box>
      {item.texto}
    </Text>
  )
}
