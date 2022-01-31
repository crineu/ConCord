import { Box, Text, TextField, Image, Button } from '@skynexui/components';

export function MessageList(props) {
  return (
    <Box
      tag="ul"
      styleSheet={{
        overflow: 'scroll',
        display: 'flex',
        flexDirection: 'column-reverse',
        flex: 1,
        color: props.textColor || 'white',
        marginBottom: '16px',
      }}
    >

      {props.listaDeMensagens.map((item) => {

        return (
          <Text
            key={item.id.toString()}
            id={item.id.toString()}
            tag="li"
            styleSheet={{
              borderRadius: '5px',
              padding: '4px',
              marginBottom: '6px',
              border: '1px solid',
              borderColor: props.borderColor || 'black',
              hover: {
                backgroundColor: props.hoverColor || 'darkgray',
              }
            }}
          >
            <Box>
              <Image
                styleSheet={{
                  width: '20px',
                  height: '20px',
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: '8px',
                }}
                src={`https://github.com/${item.autor}.png`}
              />
              <Text tag="strong">
                {item.autor}
              </Text>
              <Text
                styleSheet={{
                  fontSize: '10px',
                  marginLeft: '8px',
                  color: props.dateColor || 'white',
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
                onClick={() => {
                  if (Boolean(props.onDeleteClick)) {
                    props.onDeleteClick(item.id);
                  }
                }}
              />
            </Box>


            {item.texto.startsWith(':sticker:')
              ? (
                <Image
                  src={item.texto.replace(':sticker:', '')}
                  styleSheet={{
                    maxHeight: '140px',
                    maxWidth: '140px',
                  }}
                />
              )
              : (item.texto)
            }


          </Text>
        )

      })}
    </Box>
  )
}
