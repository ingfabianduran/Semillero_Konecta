import { Card, CardMedia, CardContent, Typography, Stack, Chip } from '@mui/material';

function CardPersonaje({ personaje }) {
  return (
    <Card
      sx={{ maxWidth: 345 }}>
      <CardMedia
        component='img'
        height='300'
        image={ personaje.img }
        alt='Personaje Breaking Bad'>
      </CardMedia>
      <CardContent>
        <Typography
          noWrap
          variant='h5'
          component='div'
          gutterBottom>
          { personaje.name }
          <Typography
            variant='caption'
            display='block'>
            { `${personaje.portrayed} - ${personaje.birthday}`  }
          </Typography>
        </Typography>
        <Stack
          spacing={1}
          direction='row'>
          {
            personaje.occupation.map((ocupacion, index) => (
              index < 1  &&
                <Chip
                  key={ocupacion}
                  label={ocupacion}
                  size='small'
                  color='primary' />
            ))
          }
        </Stack>
      </CardContent>
    </Card>
  )
}

export { CardPersonaje };