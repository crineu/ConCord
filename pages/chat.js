import React, { useState } from 'react';
import { useRouter } from 'next/router'
import { Box, Text, TextField, Image, Button } from '@skynexui/components';
import { createClient } from '@supabase/supabase-js'
import appConfig from '../config.json';
import { ButtonSendSticker } from '../components/ButtonSendSticker.js'
import { MessageList } from '../components/MessageList.js'

const SUPABASE_URL = appConfig.db.url;
const SUPABASE_KEY = appConfig.db.anon_key;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY)

function escutaMensagensEmTempoReal(adicionaMensagem) {
  return supabaseClient
    .from('mensagens')
    .on('INSERT', (respostaLive) => {
      adicionaMensagem(respostaLive.new);
    })
    .subscribe();
}


export default function ChatPage() {
  const gitHubLogin = useRouter().query.user;
  const [mensagem, setMensagem] = React.useState('');
  const [mensagens, setMensagens] = React.useState([]);


  React.useEffect(() => {
    supabaseClient
    .from('mensagens')
    .select('*')
    .order('id', { ascending: false })
    .then(({ data }) => {
      setMensagens(data);
        setMensagens(data);
      });

    const subscription = escutaMensagensEmTempoReal((novaMensagem) => {
      // setListaDeMensagens([
      //     novaMensagem,
      //     ...listaDeMensagens
      // ])
      setMensagens((valorAtualDaLista) => {
        return [
          novaMensagem,
          ...valorAtualDaLista,
        ]
      });
    });

    return () => {
      subscription.unsubscribe();
    }
  }, []);

  function enviaNovaMensagem(textoDigitado) {
    if ('' == textoDigitado) {
      return;
    }

    const novaMensagem = {
      // id: mensagens.length,
      autor: gitHubLogin,
      texto: textoDigitado,
    }

    supabaseClient
      .from('mensagens')
      .insert([ novaMensagem ])
      .then((respostaInsercao) => {
        console.log('respostaInsercao', respostaInsercao);
      })

    setMensagem('');
  }

  function apagaMensagem(idDaMensagem) {
    supabaseClient
      .from('mensagens')
      .delete()
      .match({ id: idDaMensagem})
      .then((respostaRemocao) => {
        console.log(respostaRemocao);
      })
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

          <MessageList
            listaDeMensagens={mensagens}
            textColor={appConfig.theme.colors.neutrals["000"]}
            dateColor={appConfig.theme.colors.neutrals[300]}
            hoverColor={appConfig.theme.colors.neutrals[700]}
            borderColor={appConfig.theme.colors.neutrals[800]}
            onDeleteClick={(messageId) => {
              // console.log('chat.js apagou id ', messageId)
              apagaMensagem(messageId);
            }}
          />

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
            <ButtonSendSticker
              stickersList={appConfig.stickers}
              onStickerClick={(sticker) => {
                // console.log('chat.js clibou na parada', sticker)
                enviaNovaMensagem(`:sticker: ${sticker}`);
              }}
              boxBackground={appConfig.theme.colors.neutrals[800]}
              titleColor={appConfig.theme.colors.neutrals["100"]}
              focusColor={appConfig.theme.colors.neutrals[500]}
              buttonColor={appConfig.theme.colors.neutrals[300]}

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
